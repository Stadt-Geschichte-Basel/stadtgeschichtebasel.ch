// scripts/script.js
import { fileURLToPath } from 'url';
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import TurndownService from 'turndown';

// const baseUrl = 'https://sgb.hypotheses.org/wp-json/wp/v2/posts?_embed';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(path.dirname(__filename));
const ASSETS_URL = 'https://sgb.hypotheses.org/';

// 1. Get all posts including paginated pages
async function getAllPosts(baseUrl) {
	const { headers, data } = await axios.get(baseUrl);
	const totalPages = parseInt(headers['x-wp-totalpages'], 10);
	const promises = Array.from({ length: totalPages - 1 }, (_, i) =>
		axios.get(`${baseUrl}&page=${i + 2}`).then((res) => res.data)
	);
	const allPosts = await Promise.all([data, ...promises]);
	return allPosts.flat();
}

// 2. Extract all assets (images and documents) from posts
function extractAssets(posts) {
	const regex = /<img.*?src="(.*?)"/g;
	const assets = posts.reduce((acc, post) => {
		const content = post.content.rendered;
		let match;
		while ((match = regex.exec(content))) {
			if (match[1].startsWith(ASSETS_URL)) {
				acc.push(match[1]);
			}
		}
		return acc;
	}, []);
	return assets;
}

// 3. Save all assets to ./src/static/assets while retaining the folder structure and the original file names
async function saveAssets(assets, root) {
	await Promise.all(
		assets.map(async (url) => {
			const filename = path.basename(url);
			const directory = path.dirname(url).replace(ASSETS_URL, '');
			const destination = path.join(root, directory, filename);
			const { data } = await axios.get(url, { responseType: 'arraybuffer' });
			await fs.mkdir(path.dirname(destination), { recursive: true });
			await fs.writeFile(destination, data);
		})
	);
}

// 4. Replace all references in the posts with the local files saved in ./src/static/assets
function replaceAssetReferences(posts) {
	const regex = /src="(https:\/\/sgb\.hypotheses\.org\/wp-content\/uploads.*?)"/g;
	posts.forEach((post) => {
		const content = post.content.rendered;
		const newContent = content.replace(regex, (match, url) => {
			const filename = path.basename(url);
			const directory = path
				.dirname(url)
				.replace(/^https:\/\/sgb\.hypotheses\.org\/wp-content\/uploads/, '');
			return `src="/assets${directory}/${filename}"`;
		});
		post.content.rendered = newContent;
	});
}

// 5. Convert the field excerpt of the posts from HTML to Markdown with Turndown as excerpt_md and content of the posts from HTML to Markdown with Turndown as content_md Set atx headings.
function convertHtmlToMarkdown(posts) {
	const turndownService = new TurndownService({ headingStyle: 'atx' });
	posts.forEach((post) => {
		post.excerpt_md = turndownService.turndown(post.excerpt.rendered);
		post.content_md = turndownService.turndown(post.content.rendered);
	});
}

// 6. Save the posts to ./src/lib/data/posts.json (create the file if it does not exist)
async function savePosts(posts, filePath) {
	// const filePath = path.join(__dirname, 'src', 'lib', 'data', 'posts.json');
	const json = JSON.stringify(posts);
	await fs.mkdir(path.dirname(filePath), { recursive: true });
	await fs.writeFile(filePath, json, { flag: 'w' });
}

(async () => {
	const allPosts = await getAllPosts('https://sgb.hypotheses.org/wp-json/wp/v2/posts?_embed');
	const allPostsAssets = extractAssets(allPosts);
	await saveAssets(allPostsAssets, 'src/static/assets/');
	replaceAssetReferences(allPosts);
	convertHtmlToMarkdown(allPosts);
	await savePosts(allPosts, 'src/lib/data/posts.json');

	const allPages = await getAllPosts('https://sgb.hypotheses.org/wp-json/wp/v2/pages?_embed');
	const allPagesAssets = extractAssets(allPages);
	await saveAssets(allPagesAssets, 'src/static/assets/');
	replaceAssetReferences(allPages);
	convertHtmlToMarkdown(allPages);
	await savePosts(allPages, 'src/lib/data/pages.json');
})();
