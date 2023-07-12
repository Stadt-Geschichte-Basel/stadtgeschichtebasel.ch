import * as cheerio from 'cheerio';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import TurndownService from 'turndown';

const turndownService = new TurndownService();

const baseURL = 'https://sgb.hypotheses.org/';
const apiEndpoint = '/wp-json/wp/v2'; // Wordpress JSON API endpoint
const types = ['posts', 'pages']; // Types of content to fetch
const outputDir = path.join(process.cwd(), 'src', 'lib', 'data'); // Output directory for markdown files
const assetsDir = path.join(process.cwd(), 'src', 'lib', 'data'); // Output directory for assets
const perPage = 10; // Number of items to fetch per page

// Make sure output and assets directories exist
if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true });
}
if (!fs.existsSync(assetsDir)) {
	fs.mkdirSync(assetsDir, { recursive: true });
}

const downloadAsset = async (elem, $) => {
	let url = $(elem).attr('href') || $(elem).attr('src');
	if ($(elem).is('img') && $(elem).attr('src')) {
		const src = $(elem).attr('src');
		const highResSrc = src.replace(/-\d+x\d+\./, '.');
		url = highResSrc;
	}
	if (url && url.startsWith(baseURL)) {
		const urlPath = new URL(url).pathname;
		const extension = path.extname(urlPath);
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

		if (!allowedExtensions.includes(extension.toLowerCase())) {
			return;
		}

		const response = await fetch(url);
		const filePath = path.join(assetsDir, urlPath);
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

		const relativeUrl = path.join('.', url.replace(baseURL, ''));
		if ($(elem).attr('href')) $(elem).attr('href', relativeUrl);
		if ($(elem).attr('src')) $(elem).attr('src', relativeUrl);
	}
};

const processContent = async (html) => {
	const $ = cheerio.load(html);
	const assetPromises = [];
	$('img, a').each((i, elem) => {
		assetPromises.push(downloadAsset(elem, $));
	});
	await Promise.all(assetPromises);
	return turndownService.turndown($.html());
};

const fetchAuthorName = async (authorId) => {
	const response = await fetch(`${baseURL}${apiEndpoint}/users/${authorId}`);
	const data = await response.json();
	return data.name;
};

const fetchAndProcessType = async (type) => {
	let page = 1;
	let fetched;
	do {
		const response = await fetch(
			`${baseURL}${apiEndpoint}/${type}?per_page=${perPage}&page=${page}`
		);
		const data = await response.json();
		fetched = data.length;
		for (const item of data) {
			const content = await processContent(item.content.rendered);
			const authorName = await fetchAuthorName(item.author);
			const frontMatter = {
				title: item.title.rendered,
				date: item.date,
				lastUpdate: item.modified,
				author: authorName,
				slug: item.slug,
				type: type
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
