import * as cheerio from 'cheerio';
import createDOMPurify from 'dompurify';
import fs from 'fs';
import yaml from 'js-yaml';
import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';
import path from 'path';
import TurndownService from 'turndown';
import DownloadManager from './downloadManager.mjs';

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
 * The directory where assets will be downloaded.
 * @type {string}
 */
const staticDir = 'static';

/**
 * The download queue.
 * @type {DownloadManager}
 */
const downloadManager = new DownloadManager();

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

	try {
		const response = await fetch(`${baseURL}${apiEndpoint}/categories/${id}`);

		if (!response.ok) {
			console.error(`Failed to fetch category ${id}: ${response.status}`);
			return `Category ${id}`;
		}

		const data = await response.json();
		const name = data.name || `Category ${id}`;
		categoryCache[id] = name;
		return name;
	} catch (error) {
		console.error(`Error fetching category ${id}:`, error);
		categoryCache[id] = `Category ${id}`;
		return `Category ${id}`;
	}
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
 * Cleans up escaped asterisks between word characters.
 * @param {string} text
 * @returns {string}
 */
function cleanEscapedAsterisks(text) {
	return text.replace(/\\\*/gm, '*');
}

/**
 * Process and sanitize HTML content.
 * @param {string} html - HTML content to process.
 * @param {string} outputDir - Output directory for markdown files.
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
				$(elem).attr('href', path.join('/', relativeUrl));
				if (path.extname(relativeUrl)) {
					downloadManager.enqueueDownload(url, staticDir);
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
			downloadManager.enqueueDownload(url, staticDir);
		}

		// Handle srcset
		const srcset = $(elem).attr('srcset');
		if (srcset) {
			const newSrcset = srcset
				.split(',')
				.map((src) => {
					let [url, size] = src.trim().split(' ');
					downloadManager.enqueueDownload(url, staticDir);
					if (url.startsWith(baseURL)) {
						url = path.join('/', url.replace(baseURL, ''));
					}
					return `${url} ${size}`;
				})
				.join(', ');
			$(elem).attr('srcset', newSrcset);
		}
	});

	return turndownService.turndown($.html());
}

/**
 * Fetch the featured image URL for a given media ID.
 * @param {number} mediaId - Media ID.
 * @returns {Promise<string|null>} - URL of the featured image.
 */
const fetchFeaturedImage = async (mediaId) => {
	try {
		const response = await fetch(`${baseURL}${apiEndpoint}/media/${mediaId}`);

		if (!response.ok) {
			console.error(`Failed to fetch media ${mediaId}: ${response.status}`);
			return null;
		}

		const data = await response.json();
		return data.source_url || null;
	} catch (error) {
		console.error(`Error fetching media ${mediaId}:`, error);
		return null;
	}
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
		try {
			console.log(`Fetching ${type} data, page ${page}`);
			const response = await fetch(
				`${baseURL}${apiEndpoint}/${type}?per_page=${perPage}&page=${page}&_fields=id,content.rendered,title.rendered,link,date,modified,slug,author,excerpt.rendered,featured_media,categories`
			);

			if (!response.ok) {
				console.error(`HTTP error! status: ${response.status}`);
				break;
			}

			const data = await response.json();

			// Check if data is an array to prevent "not iterable" error
			if (!Array.isArray(data)) {
				console.log(`Finished fetching ${type}. Page ${page} returned non-array data:`, data);
				break;
			}

			// Check for empty array to avoid unnecessary processing
			if (data.length === 0) {
				console.log(`No more ${type} items found on page ${page}`);
				break;
			}

			for (const item of data) {
				const categoryIds = item.categories || [];
				if (type === 'posts' && categoryIds.some((id) => excludedCategories.includes(id))) {
					continue;
				}
				const title = cleanEscapedAsterisks(turndownService.turndown(item.title.rendered));
				const content = await processContent(
					item.content.rendered,
					outputDir,
					item.link,
					item.slug
				);
				const tagsToRemove = ['span', 'a'];
				const excerpt = cleanEscapedAsterisks(
					await processContent(item.excerpt.rendered, outputDir, item.link, item.slug, tagsToRemove)
				);
				const featuredImageUrl = item.featured_media
					? await fetchFeaturedImage(item.featured_media)
					: null;
				if (featuredImageUrl) {
					downloadManager.enqueueDownload(featuredImageUrl, staticDir);
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
					featuredImage: featuredImageUrl
						? path.join('/', featuredImageUrl.replace(baseURL, ''))
						: ''
				};
				const yamlFrontMatter = yaml.dump(frontMatter);
				const markdownContent = `---\n${yamlFrontMatter}---\n\n${content}`;

				fs.writeFileSync(path.join(outputDir, `${item.slug}.md`), markdownContent);
			}

			fetched = data.length;
			page++;
			console.log(`Fetched ${fetched} items from ${type}, page ${page}`);
		} catch (error) {
			console.error(`Error fetching ${type} on page ${page}:`, error);
			break;
		}
	} while (fetched === perPage);
}

/**
 * Main function.
 */
(async () => {
	for (const type of types) {
		await fetchAndProcessType(type);
	}

	// Wait for all downloads to complete
	console.log('Waiting for all downloads to complete...');
	await downloadManager.waitForCompletion();
	console.log('All downloads completed!');
})();
