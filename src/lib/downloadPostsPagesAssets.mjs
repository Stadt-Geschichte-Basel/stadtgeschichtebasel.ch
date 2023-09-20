import * as cheerio from 'cheerio';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import TurndownService from 'turndown';
import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';
import fetch from 'node-fetch';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

/**
 * Turndown service instance for converting HTML to Markdown.
 * @type {TurndownService}
 */
let turndownService = new TurndownService();
turndownService.keep(['iframe', 'audio', 'video']);
const figureToMarkdownRule = {
	filter: (node) =>
		node.nodeName === 'FIGURE' && node.querySelector('img') && node.querySelector('figcaption'),
	replacement: (content, node) => {
		const imgElement = node.querySelector('img');
		const figcaptionElement = node.querySelector('figcaption');
		const imageUrl = imgElement.getAttribute('src') || '';
		const altText = imgElement.getAttribute('alt').replace(/"/g, "'") || '';
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
 * IDs of categories to exclude
 * @type {Array<number>}
 */
const excludedCategories = [14];

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
 * The directory where assets will be downloaded.
 * @type {string}
 */
const staticDir = 'static';

/**
 * A class representing a queue of tasks to be executed in order.
 */
class Queue {
	/**
	 * Creates a new Queue instance.
	 */
	constructor() {
		this.queue = [];
	}

	/**
	 * Adds a new task to the end of the queue.
	 * @param {Function} task - The task to add to the queue.
	 */
	enqueue(task) {
		this.queue.push(task);
		if (this.queue.length === 1) {
			this.dequeue();
		}
	}

	/**
	 * Removes the first task from the queue and executes it.
	 * If the queue is empty, does nothing.
	 */
	async dequeue() {
		if (this.queue.length === 0) return;
		const task = this.queue.shift();
		await task();
		this.dequeue();
	}
}

/**
 * Creates a new instance of Queue and assigns it to downloadQueue variable.
 * @type {Queue}
 */
const downloadQueue = new Queue();

const MAX_RETRIES = 3; // Maximum number of retries for each request
const TIMEOUT = 1000; // 5 seconds timeout for each request


/**
 * Fetches a URL using the native fetch API and enqueues the request to a download queue.
 * @param {string} url - The URL to fetch.
 * @param {Object} [options={}] - Additional options to pass to the fetch function.
 * @returns {Promise<Response>} - A promise that resolves with the response from the fetch request.
 */
/**
 * Queues a fetch request using the native fetch API.
 * @param {string} url - The URL to fetch.
 * @param {Object} options - The options to pass to the fetch request.
 * @returns {Promise<Response>} - A promise that resolves with the response from the fetch request.
 */
/**
 * Fetches a resource from the given URL using the native fetch API and enqueues the request to a download queue.
 * @param {string} url - The URL of the resource to fetch.
 * @param {object} [options={}] - An optional object containing any custom settings that you want to apply to the request.
 * @returns {Promise<Response>} - A Promise that resolves with the Response object representing the fetched resource.
 */
async function queuedFetch(url, options = {}, retries = MAX_RETRIES) {
  return new Promise((resolve, reject) => {
    downloadQueue.enqueue(async () => {
      let retryCount = 0;
      while (retryCount <= retries) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);
          const response = await fetch(url, { ...options, signal: controller.signal });
          clearTimeout(timeoutId);

          if (response.ok) {
            resolve(response);
            return;
          } else {
            console.log(`Failed request to ${url}, status code: ${response.status}`);
          }
        } catch (error) {
          console.log(`Error fetching ${url}: ${error.message}`);
          if (error.name === 'AbortError') {
            console.log(`Request to ${url} timed out`);
          }
        }

        retryCount++;
        if (retryCount <= retries) {
          console.log(`Retrying request to ${url} (${retryCount}/${retries})`);
        }
      }

      reject(new Error(`Failed to fetch ${url} after ${retries + 1} attempts`));
    });
  });
}


/**
 * Cache object for categories.
 * @type {Object}
 */
const categoryCache = {};

/**
 * Fetches the name of a category by its ID.
 * @param {number} id - The ID of the category to fetch.
 * @returns {Promise<string>} - A promise that resolves with the name of the category.
 */
async function fetchCategoryNameById(id) {
	if (categoryCache[id]) return categoryCache[id];

	const response = await queuedFetch(`${baseURL}${apiEndpoint}/categories/${id}`);
	const data = await response.json();
	const name = data.name;
	categoryCache[id] = name;
	return name;
}

/**
 * Extract asset URL from an HTML element.
 * @param {CheerioElement} elem
 * @param {CheerioStatic} $
 * @returns {string}
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

/**
 * Download an asset.
 * @param {string} url
 * @param {string} outputDir
 */
async function downloadAsset(url, outputDir = staticDir) {
	downloadQueue.enqueue(async () => {
		console.log(`Downloading asset from ${url}`);
		const extension = path.extname(new URL(url).pathname).toLowerCase();
		if (!allowedExtensions.includes(extension)) return;

		const response = await queuedFetch(url);

		if (!response.ok) {
			console.log(`Failed to download asset from ${url}`);
			return;
		}

		const urlPath = new URL(url).pathname;
		const fullDir = path.join(outputDir, path.dirname(urlPath));
		if (!fs.existsSync(fullDir)) {
			fs.mkdirSync(fullDir, { recursive: true });
		}

		const filePath = path.join(outputDir, urlPath);

		const fileStream = fs.createWriteStream(filePath);
		response.body.pipe(fileStream);

		fileStream.on('finish', () => {
			console.log(`Downloaded asset to ${filePath}`);
		});

		fileStream.on('error', (error) => {
			console.log(`Error writing file: ${error}`);
		});
	});
}

/**
 * Process HTML content.
 * @param {string} html
 * @param {string} outputDir
 * @param {string} link
 * @param {string} slug
 * @param {Array<string>} tagsToRemove
 * @returns {Promise<string>}
 */
async function processContent(html, outputDir, link, slug, tagsToRemove = []) {
	const sanitizedHtml = DOMPurify.sanitize(html, {
		ADD_TAGS: ['iframe'],
		ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling']
	});
	const $ = cheerio.load(sanitizedHtml);
	const assetUrls = [];

	tagsToRemove.forEach((tag) => {
		$(tag).remove();
	});

	$('figure:has(iframe)').each(function () {
		const innerContent = $(this).html();
		$(this).replaceWith(innerContent);
	});

	$('iframe').each(function () {
		$(this).removeAttr('width').removeAttr('height').addClass('w-full aspect-video');
	});

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

	$('img').each((i, elem) => {
		const url = getAssetUrl(elem, $);
		if (url && url.startsWith(baseURL)) {
			const relativeUrl = path.join('/', url.replace(baseURL, ''));
			if ($(elem).attr('src')) $(elem).attr('src', relativeUrl);
			assetUrls.push(url);
		}
	});

	assetUrls.forEach((url) => {
		downloadAsset(url);
	});

	return turndownService.turndown($.html());
}

/**
 * Fetch the featured image URL.
 * @param {number} mediaId
 * @returns {Promise<string|null>}
 */
const fetchFeaturedImage = async (mediaId) => {
	console.log(`Fetching featured image with ID: ${mediaId}`);
	const response = await queuedFetch(`${baseURL}${apiEndpoint}/media/${mediaId}`);
	const data = await response.json();
	console.log(`Fetched featured image URL: ${data.source_url}`);
	return data.source_url;
};

/**
 * Fetch and process a content type.
 * @param {string} type
 */
async function fetchAndProcessType(type) {
	const outputDir = path.join('src', type);
	fs.mkdirSync(outputDir, { recursive: true });

	let page = 1,
		fetched;

	do {
		console.log(`Fetching ${type} data, page ${page}`);
		const response = await queuedFetch(
			`${baseURL}${apiEndpoint}/${type}?per_page=${perPage}&page=${page}&_fields=id,content.rendered,title.rendered,link,date,modified,slug,author,excerpt.rendered,featured_media,categories`
		);
		const data = await response.json();

		for (const item of data) {
			const categoryIds = item.categories || [];
			if (type === 'posts' && categoryIds.some((id) => excludedCategories.includes(id))) {
				continue;
			}
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
				await downloadAsset(featuredImageUrl);
			}
			const categoryNames = await Promise.all(categoryIds.map(fetchCategoryNameById));
			const frontMatter = {
				id: item.id,
				title: title,
				date: item.date,
				modified: item.modified,
				slug: item.slug,
				author: item.author,
				excerpt: excerpt,
				...(type === 'posts' && { categories: categoryNames }),
				featuredImage: featuredImageUrl ? path.join('/', featuredImageUrl.replace(baseURL, '')) : ''
			};
			const yamlFrontMatter = yaml.dump(frontMatter);
			const markdownContent = `---\n${yamlFrontMatter}---\n\n${content}`;

			fs.writeFileSync(path.join(outputDir, `${item.slug}.md`), markdownContent);
		}

		fetched = data.length;
		page++;
		console.log(`Fetched ${fetched} items from ${type}, page ${page}`);
	} while (fetched === perPage);
}

/**
 * Main function.
 */
(async () => {
	for (const type of types) {
		await fetchAndProcessType(type);
	}
})();
