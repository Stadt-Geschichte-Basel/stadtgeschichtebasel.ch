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
turndownService.keep([
	'aside',
	'audio',
	'blockquote',
	'button',
	'code',
	'embed',
	'figure',
	'figcaption',
	'img',
	'iframe',
	'table',
	'video'
]);

/**
 * The base URL of the website.
 * @type {string}
 */
const baseURL = 'https://sgb.hypotheses.org/';

/**
 * The new URL of the website.
 * @type {string}
 */
const newURL = 'https://stadtgeschichtebasel.ch/';

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
 * An array of tasks to be executed in order.
 * @type {Array<Promise>}
 */
let downloadTasks = [];

const MAX_RETRIES = 5; // Maximum number of retries for each request
const TIMEOUT = 1000; // 5 seconds timeout for each request

/**
 * Perform a fetch request with retry logic.
 * @param {string} url - URL to fetch.
 * @param {Object} [options={}] - Fetch options.
 * @param {number} [retries=MAX_RETRIES] - Number of retries.
 * @returns {Promise<Response>} - Fetch response.
 */
async function queuedFetch(url, options = {}, retries = MAX_RETRIES) {
	let retryCount = 0;
	while (retryCount <= retries) {
		try {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);
			const response = await fetch(url, { ...options, signal: controller.signal });
			clearTimeout(timeoutId);

			if (response.ok) {
				return response;
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
	throw new Error(`Failed to fetch ${url} after ${retries + 1} attempts`);
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
 * @param {CheerioElement} elem - Element to extract URL from.
 * @param {CheerioStatic} $ - Cheerio instance.
 * @returns {string} - Asset URL.
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
 * Download an asset from a given URL to the static directory.
 * @param {string} url - URL of the asset.
 * @returns {Promise<void>} - Promise representing the completion of the download.
 */
async function downloadAsset(url) {
	const extension = path.extname(new URL(url).pathname).toLowerCase();
	if (!allowedExtensions.includes(extension)) {
		console.log(`Skipping download of unsupported file type: ${url}`);
		return; // Skip unsupported file types
	}

	const response = await queuedFetch(url);
	if (!response.ok) {
		console.log(`Failed to download asset from ${url}`);
		throw new Error(`Failed to download asset from ${url}`);
	}

	const urlPath = new URL(url).pathname;
	const fullDir = path.join(staticDir, path.dirname(urlPath));
	if (!fs.existsSync(fullDir)) {
		fs.mkdirSync(fullDir, { recursive: true });
	}

	const filePath = path.join(staticDir, urlPath);

	return new Promise((resolve, reject) => {
		const fileStream = fs.createWriteStream(filePath);
		response.body.pipe(fileStream);
		fileStream.on('finish', () => {
			resolve();
		});
		fileStream.on('error', (error) => {
			console.log(`Error writing file: ${error}`);
			reject(error);
		});
	});
}

/**
 * Process and sanitize HTML content.
 * @param {string} html - HTML content to process.
 * @param {string} outputDir - Output directory for assets.
 * @param {string} link - Original link of the content.
 * @param {string} slug - Slug for the content.
 * @param {Array<string>} [tagsToRemove=[]] - Tags to remove during processing.
 * @returns {Promise<string>} - Processed content in Markdown format.
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
		let relativeUrl;

		if (url) {
			if (url === link) {
				relativeUrl = path.join('.', url.replace(baseURL, ''), slug);
			} else if (url.startsWith(newURL)) {
				relativeUrl = path.join('.', url.replace(newURL, ''));
			} else if (url.startsWith(baseURL)) {
				relativeUrl = path.join('.', url.replace(baseURL, ''));
			}

			if (relativeUrl) {
				$(elem).attr('href', relativeUrl);
				if (allowedExtensions.includes(path.extname(relativeUrl).toLowerCase())) {
					assetUrls.push(url);
				}
			}
		}
	});

	$('figure, figcaption, img').removeAttr('class');

	$('figure').each(function () {
		$(this).addClass('flex flex-col items-center justify-center w-full');
		$('img', this).addClass('mx-auto mb-2'); // Centers the image and adds margin at the bottom
		$('figcaption', this).addClass('text-center'); // Centers the caption text
	});

	$('img').each((i, elem) => {
		const url = getAssetUrl(elem, $);
		if (url && url.startsWith(baseURL)) {
			const relativeUrl = path.join('/', url.replace(baseURL, ''));
			$(elem).attr('src', relativeUrl);
			assetUrls.push(url);
		}

		// Handle srcset
		const srcset = $(elem).attr('srcset');
		if (srcset) {
			const newSrcset = srcset
				.split(',')
				.map((src) => {
					let [url, size] = src.trim().split(' ');
					assetUrls.push(url);
					if (url.startsWith(baseURL)) {
						url = path.join('/', url.replace(baseURL, ''));
					}
					return `${url} ${size}`;
				})
				.join(', ');
			$(elem).attr('srcset', newSrcset);
		}
	});

	assetUrls.forEach((url) => {
		downloadTasks.push(downloadAsset(url));
	});

	return turndownService.turndown($.html());
}

/**
 * Fetch the featured image URL for a given media ID.
 * @param {number} mediaId - Media ID.
 * @returns {Promise<string|null>} - URL of the featured image.
 */
const fetchFeaturedImage = async (mediaId) => {
	const response = await queuedFetch(`${baseURL}${apiEndpoint}/media/${mediaId}`);
	const data = await response.json();
	return data.source_url;
};

/**
 * Fetch and process content of a specific type from the API.
 * @param {string} type - Content type (e.g., 'posts', 'pages').
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

			await fs.promises.writeFile(path.join(outputDir, `${item.slug}.md`), markdownContent);
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
		fetchAndProcessType(type);
		await Promise.all(downloadTasks);
	}
	console.log('All downloads completed.');
})();
