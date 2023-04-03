// scripts/script.js
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

const URL = 'https://sgb.hypotheses.org/';

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
			if (match[1].startsWith(URL)) {
				acc.push(match[1]);
			}
		}
		return acc;
	}, []);
	return assets;
}

// 3. Save all assets to ./src/static/ while retaining the folder structure and the original file names
async function saveAssets(assets, folder) {
	await Promise.all(
		assets.map(async (url) => {
			const filename = path.basename(url);
			const directory = path.dirname(url).replace(URL, '');
			const destination = path.join(folder, directory, filename);
			const { data } = await axios.get(url, { responseType: 'arraybuffer' });
			await fs.mkdir(path.dirname(destination), { recursive: true });
			await fs.writeFile(destination, data);
		})
	);
}

// 4. Replace all references of https://sgb.hypotheses.org/ with an empty string
function replaceAssetReferences(posts) {
	const replacedPosts = posts.map((post) => {
		const content = post.content.rendered;
		const replacedContent = content.replace(new RegExp('https://sgb.hypotheses.org', 'g'), '');
		const excerpt = post.excerpt.rendered;
		const replacedExcerpt = excerpt.replace(new RegExp('https://sgb.hypotheses.org', 'g'), '');
		post.excerpt.rendered = replacedExcerpt;
		return {
			...post,
			content: {
				...post.content,
				rendered: replacedContent
			},
			excerpt: {
				...post.excerpt,
				rendered: replacedExcerpt
			}
		};
	});
	return replacedPosts;
}

// 5. Save the posts to ./src/lib/data/posts.json (create the file if it does not exist)
async function savePosts(posts, filePath) {
	const json = JSON.stringify(posts);
	await fs.mkdir(path.dirname(filePath), { recursive: true });
	await fs.writeFile(filePath, json, { flag: 'w' });
}

(async () => {
	let allPosts = await getAllPosts(URL + 'wp-json/wp/v2/posts?_embed');
	const allPostsAssets = extractAssets(allPosts);
	await saveAssets(allPostsAssets, 'static/');
	allPosts = replaceAssetReferences(allPosts);
	await savePosts(allPosts, 'src/lib/data/posts.json');

	let allPages = await getAllPosts(URL + 'wp-json/wp/v2/pages?_embed');
	const allPagesAssets = extractAssets(allPages);
	await saveAssets(allPagesAssets, 'static/');
	allPages = replaceAssetReferences(allPages);
	await savePosts(allPages, 'src/lib/data/pages.json');
})();
