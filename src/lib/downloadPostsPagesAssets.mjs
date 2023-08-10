import * as cheerio from 'cheerio';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import TurndownService from 'turndown';
import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

/**
 * Turndown service instance for converting HTML to Markdown.
 * @type {TurndownService}
 */
let turndownService = new TurndownService();
turndownService.keep(['iframe', 'audio', 'video']);

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
 * Fetches a URL with a timeout.
 * @param {string} url - The URL to fetch.
 * @param {Object} [options={}] - Fetch options.
 * @returns {Promise<Response>} The fetch response.
 * @throws {Error} Throws an error if the fetch operation times out.
 */
async function fetchWithTimeout(url, options = {}) {
	const controller = new AbortController();
	const timeout = setTimeout(() => {
		controller.abort();
	}, fetchTimeout);
	try {
		const response = await fetch(url, { ...options, signal: controller.signal });
		return response;
	} finally {
		clearTimeout(timeout);
	}
}

/**
 * Fetches a URL with retries in case of failure.
 * @param {string} url - The URL to fetch.
 * @param {number} [retries=3] - Number of retries.
 * @param {number} [delay=5000] - Delay between retries in milliseconds.
 * @returns {Promise<Response>} The fetch response.
 * @throws {Error} Throws an error after all retries fail.
 */
async function fetchWithRetry(url, retries = 3, delay = 5000) {
	for (let i = 0; i < retries; i++) {
		if (i === retries - 1) {
			console.error(`Failed to fetch URL after ${retries} attempts: ${url}`, error);
			process.exit(1); // Exit the script with a failure status code
		}
		try {
			const response = await fetchWithTimeout(url);
			if (response.ok) return response;
		} catch (error) {
			if (error.name === 'AbortError') {
				console.warn(`Request aborted due to timeout for URL: ${url}. Retrying...`);
			} else {
				console.warn(`Attempt ${i + 1} failed for URL: ${url}. Retrying in ${delay}ms...`);
			}

			if (i === retries - 1) {
				console.error(`Failed to fetch URL after ${retries} attempts: ${url}`, error);
				throw error;
			}

			await new Promise((resolve) => setTimeout(resolve, delay));
		}
	}
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

/**
 * Downloads an asset from a given URL.
 * @param {string} url - The URL of the asset.
 * @param {string} outputDir - The directory to save the downloaded asset.
 * @returns {Promise<void>}
 * @throws {Error} Throws an error if the asset download fails.
 */
const downloadAsset = async (url, outputDir) => {
	const urlPath = new URL(url).pathname;
	const extension = path.extname(urlPath);
	if (!allowedExtensions.includes(extension.toLowerCase())) {
		return;
	}

	const response = await fetchWithRetry(url);
	if (!response.ok) {
		console.error(`Failed to download asset from URL: ${url}`);
		process.exit(1); // Exit the script with a failure status code
	}

	const filePath = path.join(outputDir, urlPath);
	const dirPath = path.dirname(filePath);
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath, { recursive: true });
	}
	const writer = fs.createWriteStream(filePath);
	const arrayBuffer = await response.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);
	writer.write(buffer);
	writer.end();
	await new Promise((resolve, reject) => {
		writer.on('finish', resolve);
		writer.on('error', reject);
	});
};

/**
 * Downloads multiple assets concurrently with a limit.
 * @param {Array<string>} urls - The URLs of the assets.
 * @param {string} outputDir - The directory to save the downloaded assets.
 * @param {number} [limit=5] - The concurrency limit.
 * @returns {Promise<void>}
 */
const downloadAssetsConcurrently = async (urls, outputDir, limit = 5) => {
	const downloadQueue = [...urls];
	const activeDownloads = new Set();

	const downloadNext = async () => {
		if (!downloadQueue.length) return;
		const url = downloadQueue.shift();
		activeDownloads.add(url);
		try {
			await downloadAsset(url, outputDir);
		} catch (error) {
			console.error(`Failed to download asset from URL: ${url}`, error);
		}
		activeDownloads.delete(url);
		downloadNext();
	};

	const initialDownloads = Math.min(limit, downloadQueue.length);
	for (let i = 0; i < initialDownloads; i++) {
		downloadNext();
	}

	// Wait for all downloads to complete
	await new Promise((resolve) => {
		const checkDownloads = setInterval(() => {
			if (!activeDownloads.size) {
				clearInterval(checkDownloads);
				resolve();
			}
		}, 1000);
	});
};

/**
 * Processes the HTML content, downloads assets, and converts the content to Markdown.
 * @param {string} html - The HTML content.
 * @param {string} outputDir - The directory to save the downloaded assets.
 * @returns {Promise<string>} The processed content in Markdown format.
 */
const processContent = async (html, outputDir) => {
	const sanitizedHtml = DOMPurify.sanitize(html, {
		ADD_TAGS: ['iframe'],
		ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling']
	});
	const $ = cheerio.load(sanitizedHtml);
	const assetUrls = [];

	// Handle <iframe> tags
	$('figure:has(iframe)').each(function () {
		const innerContent = $(this).html();
		$(this).replaceWith(innerContent);
	});

	// Handle <figure> and <figcaption> tags
	$('figure').each((i, figureElem) => {
		const imgElem = $(figureElem).find('img').first();
		const figcaptionElem = $(figureElem).find('figcaption').first();
		if (imgElem && figcaptionElem) {
			const imageUrl = imgElem.attr('src');
			const imageAlt = imgElem.attr('alt');
			const captionText = figcaptionElem.text();
			const imgWithAlt = `<img src="${imageUrl}" alt="${imageAlt}" title="${captionText}">`;
			$(figureElem).replaceWith(imgWithAlt);
		}
	});

	$('img, a').each((i, elem) => {
		const url = getAssetUrl(elem, $);
		if (url && url.startsWith(baseURL)) {
			const relativeUrl = path.join('.', url.replace(baseURL, ''));
			if ($(elem).attr('href')) $(elem).attr('href', relativeUrl);
			if ($(elem).attr('src')) $(elem).attr('src', relativeUrl);
			assetUrls.push(url);
		}
	});

	await downloadAssetsConcurrently(assetUrls, outputDir);

	return turndownService.turndown($.html());
};

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

/**
 * Fetches and processes content of a specific type.
 * @param {string} type - The type of content (e.g., "posts" or "pages").
 * @returns {Promise<void>}
 */
const fetchAndProcessType = async (type) => {
	const outputDir = path.join(process.cwd(), 'src', type);

	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	let page = 1;
	let fetched;
	do {
		try {
			const response = await fetchWithRetry(
				`${baseURL}${apiEndpoint}/${type}?per_page=${perPage}&page=${page}${
					categories.length > 0 ? `&categories=${categories.join(',')}` : ''
				}&_fields=id,content.rendered,title.rendered,date,modified,slug,author,excerpt.rendered,featured_media`
			);

			if (!response.ok) {
				throw new Error(`Failed to fetch data for page ${page}. Status: ${response.status}`);
			}

			const data = await response.json();
			for (const item of data) {
				const title = turndownService.turndown(item.title.rendered);
				const content = await processContent(item.content.rendered, outputDir);
				const excerpt = await processContent(item.excerpt.rendered, outputDir);
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
					featuredImage: featuredImageUrl
						? path.join('.', featuredImageUrl.replace(baseURL, ''))
						: ''
				};
				const yamlFrontMatter = yaml.dump(frontMatter);
				const markdownContent = `---\n${yamlFrontMatter}---\n\n${content}`;
				fs.writeFileSync(path.join(outputDir, `${item.slug}.md`), markdownContent);
			}
			fetched = data.length;
		} catch (error) {
			console.error(`Error processing page ${page} of type ${type}:`, error.message);
			process.exit(1); // Exit the script with a failure status code
		}
		page++;
	} while (fetched === perPage);
};

// Sequentially process each type
for (const type of types) {
	await fetchAndProcessType(type);
}

console.log('Finished processing all content.');
