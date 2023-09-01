import * as cheerio from 'cheerio';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import TurndownService from 'turndown';
import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';
import { exit } from 'process';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

/**
 * Turndown service instance for converting HTML to Markdown.
 * @type {TurndownService}
 */
let turndownService = new TurndownService();
turndownService.keep(['iframe', 'audio', 'video']);
const figureToMarkdownRule = {
	filter: function (node) {
		return (
			node.nodeName === 'FIGURE' && node.querySelector('img') && node.querySelector('figcaption')
		);
	},
	replacement: function (content, node) {
		const imgElement = node.querySelector('img');
		const figcaptionElement = node.querySelector('figcaption');

		const imageUrl = imgElement.getAttribute('src') || '';
		// FIXME Escape double quotes in alt text
		const altText = imgElement.getAttribute('alt').replace('"', "'") || '';
		const captionText = figcaptionElement.textContent || '';

		return `![${altText}](${imageUrl})\nFigure: ${captionText}\n\n`;
	}
};
turndownService.addRule('figureToMarkdown', figureToMarkdownRule);

/**
 * The base URL of the website.
 * @type {string}
 */
const baseURL = 'https://sgb.hypotheses.org/';

/**
 * The endpoint of the WordPress JSON API.
 * @type {string}
 */
const apiEndpoint = 'wp-json/wp/v2';

/**
 * The types of content to fetch.
 * @type {Array<string>}
 */
const types = ['posts', 'pages'];

/**
 * The number of items to fetch per page.
 * @type {number}
 */
const perPage = 100;

/**
 * The IDs of categories to fetch.
 * @type {Array<number>}
 */
const categories = [1];

/**
 * The allowed file extensions for asset downloads.
 * @type {Array<string>}
 */
const allowedExtensions = [
	'.avif',
	'.doc',
	'.docx',
	'.gif',
	'.jpeg',
	'.jpg',
	'.pdf',
	'.png',
	'.ppt',
	'.pptx',
	'.svg',
	'.txt',
	'.webp',
	'.xls',
	'.xlsx',
	'.zip'
];
/**
 * Timeout duration for fetch operations.
 * @type {number}
 */
const fetchTimeout = 10000; // 10 seconds

/**
 * Number of retries for asset downloads.
 * @type {number}
 */
const retryDownloads = 3;

/**
 * Delay between asset downloads in milliseconds.
 * @type {number}
 */
const delayBetweenDownloads = 500;

/**
 * Concurrency limit for asset downloads.
 * @type {number}
 */
const concurrentDownloads = 1;

class Queue {
	constructor(concurrency = 1, delay = 0) {
		this.queue = [];
		this.concurrency = concurrency;
		this.delay = delay;
		this.active = 0;
	}
	enqueue(task) {
		this.queue.push(task);
		this.next();
	}
	async run(task) {
		this.active++;
		await task();
		this.active--;
		this.next();
	}
	next() {
		if (this.queue.length === 0 || this.active >= this.concurrency) return;
		const task = this.queue.shift();
		setTimeout(() => this.run(task), this.delay);
	}
}

async function fetchWithRetry(url) {
	for (let i = 0; i < retryDownloads; i++) {
		try {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

			const response = await fetch(url, { signal: controller.signal });
			clearTimeout(timeoutId); // Clear the timeout if the request was successful
			if (!response.ok) {
				console.error(`HTTP Error: ${response.status}`);
				console.error(`URL: ${url}`);
				exit(1);
			}
			if (response.ok) return response;
		} catch (error) {
			if (error.name === 'AbortError') {
				console.warn(`Request aborted for URL: ${url}. Retrying...`);
			} else {
				console.warn(`Error occurred for URL: ${url}. Retrying...`);
			}
			await new Promise((resolve) => setTimeout(resolve, delayBetweenDownloads));
		}
	}
	throw new Error(`Failed to fetch URL after ${retryDownloads} attempts: ${url}`);
}

/**
 * Extracts asset URL from an HTML element.
 * @param {CheerioElement} elem - The HTML element.
 * @param {CheerioStatic} $ - The Cheerio instance.
 * @returns {string} The asset URL.
 */
const getAssetUrl = (elem, $) => {
	let url = $(elem).attr('href') || $(elem).attr('src');
	if ($(elem).is('img') && $(elem).attr('src')) {
		const src = $(elem).attr('src');
		const highResSrc = src.replace(/-\d+x\d+\./, '.');
		url = highResSrc;
	}
	return url;
};

async function downloadAsset(url, outputDir) {
	const extension = path.extname(new URL(url).pathname).toLowerCase();
	if (!allowedExtensions.includes(extension)) return;

	const response = await fetchWithRetry(url);

	// Collecting chunks into an array
	const chunks = [];
	for await (const chunk of response.body) {
		chunks.push(chunk);
	}

	// Convert to buffer
	const buffer = Buffer.concat(chunks);

	// Parse the URL to get the path
	const urlPath = new URL(url).pathname;

	// Create the corresponding directory structure
	const fullDir = path.join(outputDir, path.dirname(urlPath));
	if (!fs.existsSync(fullDir)) {
		fs.mkdirSync(fullDir, { recursive: true });
	}

	// Save the asset in the corresponding directory
	const filePath = path.join(outputDir, urlPath);
	fs.writeFileSync(filePath, buffer);
}

async function processContent(html, outputDir, link, slug, tagsToRemove = []) {
	const sanitizedHtml = DOMPurify.sanitize(html, {
		ADD_TAGS: ['iframe'],
		ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling']
	});
	const $ = cheerio.load(sanitizedHtml);
	const assetUrls = [];
	// Remove tags and their contents
	tagsToRemove.forEach((tag) => {
		$(tag).remove();
	});

	// Handle <iframe> tags
	$('figure:has(iframe)').each(function () {
		const innerContent = $(this).html();
		$(this).replaceWith(innerContent);
	});

	// Modify <iframe> tags
	$('iframe').each(function () {
		$(this).removeAttr('width').removeAttr('height').addClass('w-full aspect-video');
	});

	// Handle <a> tags
	$('a').each((i, elem) => {
		const url = $(elem).attr('href');
		if (url === link) {
			const relativeUrl = path.join('.', url.replace(baseURL, ''), slug);
			$(elem).attr('href', relativeUrl);
		}
		if (url && url.startsWith(baseURL)) {
			const relativeUrl = path.join('.', url.replace(baseURL, ''));
			$(elem).attr('href', relativeUrl);
		}
	});

	// Handle <img> tags
	$('img').each((i, elem) => {
		const url = getAssetUrl(elem, $);
		if (url && url.startsWith(baseURL)) {
			const relativeUrl = path.join('.', url.replace(baseURL, ''));
			if ($(elem).attr('src')) $(elem).attr('src', relativeUrl);
			assetUrls.push(url);
		}
	});
	const markdown = turndownService.turndown($.html());

	//   const assetUrls = $('img').map((_, elem) => $(elem).attr('src')).get();
	const downloadQueue = new Queue(concurrentDownloads, delayBetweenDownloads);

	assetUrls.forEach((url) => {
		downloadQueue.enqueue(() => downloadAsset(url, outputDir));
	});

	return markdown;
}

/**
 * Fetches the featured image URL using its media ID.
 * @param {number} mediaId - The media ID.
 * @returns {Promise<string|null>} The URL of the featured image, or null if not available.
 */
const fetchFeaturedImage = async (mediaId) => {
	const response = await fetchWithRetry(`${baseURL}${apiEndpoint}/media/${mediaId}`);
	const data = await response.json();
	return data.source_url;
};

async function fetchAndProcessType(type) {
	const outputDir = path.join('src', type);
	fs.mkdirSync(outputDir, { recursive: true });

	let page = 1,
		fetched;

	do {
		const response = await fetchWithRetry(
			`${baseURL}${apiEndpoint}/${type}?per_page=${perPage}&page=${page}${
				categories.length > 0 ? `&categories=${categories.join(',')}` : ''
			}&_fields=id,content.rendered,title.rendered,link,date,modified,slug,author,excerpt.rendered,featured_media`
		);
		const data = await response.json();

		for (const item of data) {
			const title = turndownService.turndown(item.title.rendered);
			const content = await processContent(item.content.rendered, outputDir, item.link, item.slug);
			const tagsToRemove = ['span', 'a'];
			const excerpt = await processContent(
				item.excerpt.rendered,
				outputDir,
				item.link,
				item.slug,
				tagsToRemove
			);
			const featuredImageUrl = item.featured_media
				? await fetchFeaturedImage(item.featured_media)
				: null;
			if (featuredImageUrl) {
				await downloadAsset(featuredImageUrl, outputDir);
			}
			const frontMatter = {
				id: item.id,
				title: title,
				date: item.date,
				modified: item.modified,
				slug: item.slug,
				author: item.author,
				excerpt: excerpt,
				featuredImage: featuredImageUrl ? path.join('.', featuredImageUrl.replace(baseURL, '')) : ''
			};
			const yamlFrontMatter = yaml.dump(frontMatter);
			const markdownContent = `---\n${yamlFrontMatter}---\n\n${content}`;

			fs.writeFileSync(path.join(outputDir, `${item.slug}.md`), markdownContent);
		}

		fetched = data.length;
		page++;
	} while (fetched === perPage);
}

(async () => {
	for (const type of types) {
		await fetchAndProcessType(type);
	}
	console.log('Finished processing all content.');
})();
