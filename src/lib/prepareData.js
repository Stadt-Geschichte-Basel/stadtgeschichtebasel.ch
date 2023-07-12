import * as cheerio from 'cheerio';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import TurndownService from 'turndown';

const turndownService = new TurndownService();

const baseURL = 'https://sgb.hypotheses.org/';
const apiEndpoint = '/wp-json/wp/v2'; // Wordpress JSON API endpoint
const types = ['posts', 'pages']; // Types of content to fetch
const perPage = 100; // Number of items to fetch per page
const categories = [1]; // IDs of categories to fetch
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
]; // Add more extensions if needed

const getAssetUrl = (elem, $) => {
	let url = $(elem).attr('href') || $(elem).attr('src');
	if ($(elem).is('img') && $(elem).attr('src')) {
		const src = $(elem).attr('src');
		const highResSrc = src.replace(/-\d+x\d+\./, '.');
		url = highResSrc;
	}
	return url;
};

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
			`${baseURL}${apiEndpoint}/${type}?per_page=${perPage}&page=${page}${categories.length > 0 ? `&categories=${categories.join(',')}` : ''}&_fields=content.rendered,title.rendered,date,modified,slug,author`
		);
		const data = await response.json();
		fetched = data.length;
		for (const item of data) {
			const content = await processContent(item.content.rendered, outputDir);
			const frontMatter = {
				title: item.title.rendered,
				date: item.date,
				lastUpdate: item.modified,
				slug: item.slug
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
