import * as cheerio from 'cheerio';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import TurndownService from 'turndown';

const turndownService = new TurndownService();

/**
 * The base URL of the website.
 * @type {string}
 */
const baseURL = 'https://sgb.hypotheses.org/';

/**
 * The endpoint of the WordPress JSON API.
 * @type {string}
 */
const apiEndpoint = '/wp-json/wp/v2';

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
 * Get the asset URL from an element.
 * @param {CheerioElement} elem - The element.
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
 * Download an asset from a URL.
 * @param {string} url - The URL of the asset.
 * @param {string} outputDir - The output directory.
 * @returns {Promise<void>}
 */
const downloadAsset = async (url, outputDir) => {
	const urlPath = new URL(url).pathname;
	const extension = path.extname(urlPath);
	if (!allowedExtensions.includes(extension.toLowerCase())) {
		return;
	}

	const response = await fetch(url);
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
 * Process HTML content and download assets.
 * @param {string} html - The HTML content.
 * @param {string} outputDir - The output directory.
 * @returns {Promise<string>} The processed content.
 */
const processContent = async (html, outputDir) => {
	const $ = cheerio.load(html);
	const assetPromises = [];
	$('img, a').each((i, elem) => {
		const url = getAssetUrl(elem, $);
		if (url && url.startsWith(baseURL)) {
			const relativeUrl = path.join('.', url.replace(baseURL, ''));
			if ($(elem).attr('href')) $(elem).attr('href', relativeUrl);
			if ($(elem).attr('src')) $(elem).attr('src', relativeUrl);
			assetPromises.push(downloadAsset(url, outputDir));
		}
	});
	await Promise.all(assetPromises);
	return turndownService.turndown($.html());
};

/**
 * Fetch the featured image from its media ID.
 * @param {number} mediaId - The media ID.
 * @returns {Promise<string|null>} The URL of the featured image, or null if not available.
 */
const fetchFeaturedImage = async (mediaId) => {
	const response = await fetch(`${baseURL}${apiEndpoint}/media/${mediaId}`);
	const data = await response.json();
	return data.source_url;
};

/**
 * Fetch and process content of a specific type.
 * @param {string} type - The type of content.
 * @returns {Promise<void>}
 */
const fetchAndProcessType = async (type) => {
	const outputDir = path.join(process.cwd(), 'src', 'lib', 'data', type); // Output directory for markdown files

	// Make sure output directories exist
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	let page = 1;
	let fetched;
	do {
		const response = await fetch(
			`${baseURL}${apiEndpoint}/${type}?per_page=${perPage}&page=${page}${
				categories.length > 0 ? `&categories=${categories.join(',')}` : ''
			}&_fields=id,content.rendered,title.rendered,date,modified,slug,author,excerpt.rendered,featured_media`
		);
		const data = await response.json();
		fetched = data.length;
		for (const item of data) {
			const content = await processContent(item.content.rendered, outputDir);
			const excerpt = await processContent(item.excerpt.rendered, outputDir);
			const featuredImageUrl = item.featured_media
				? await fetchFeaturedImage(item.featured_media)
				: null;
			if (featuredImageUrl) {
				const relativeUrl = path.join('.', featuredImageUrl.replace(baseURL, ''));
				await downloadAsset(featuredImageUrl, outputDir);
			}
			const frontMatter = {
				id: item.id,
				title: item.title.rendered,
				date: item.date,
				lastUpdate: item.modified,
				slug: item.slug,
				excerpt: excerpt,
				featuredImage: featuredImageUrl
					? path.join('.', featuredImageUrl.replace(baseURL, ''))
					: null
			};
			const yamlFrontMatter = yaml.dump(frontMatter);
			const markdownContent = `---\n${yamlFrontMatter}---\n\n${content}`;
			fs.writeFileSync(path.join(outputDir, `${item.slug}.md`), markdownContent); // Write to file
		}
		page++;
	} while (fetched === perPage);
};

Promise.all(types.map(fetchAndProcessType))
	.then(() => console.log('Finished processing all content.'))
	.catch((error) => console.error('An error occurred:', error));
