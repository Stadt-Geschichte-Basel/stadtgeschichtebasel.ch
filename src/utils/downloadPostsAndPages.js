import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import TurndownService from 'turndown';

async function fetchPosts(url) {
	let allPosts = [];
	let totalPages = 1;
	let currentPage = 1;
	const perPage = 100;

	while (currentPage <= totalPages) {
		const response = await fetch(`${url}&_page=${currentPage}&_per_page=${perPage}`);
		const posts = await response.json();
		allPosts = allPosts.concat(posts);
		totalPages = parseInt(response.headers.get('X-WP-TotalPages'), 10);
		currentPage++;
	}

	return allPosts;
}

async function downloadFile(url, dest) {
	const response = await fetch(url);
	const buffer = await response.arrayBuffer();
	const folder = path.dirname(dest);
	await fs.promises.mkdir(folder, { recursive: true });
	await fs.promises.writeFile(dest, Buffer.from(buffer));
}

async function downloadAssets(mdFilePath) {
	let markdown = await fs.promises.readFile(mdFilePath, 'utf-8');
	const outputDirPath = path.dirname(mdFilePath);

	const regex = /(?:!\[(.*?)\]\((.*?)\))|(?:<([^>]+)>)/g;
	const matches = markdown.matchAll(regex);
	for (const match of matches) {
		const url = match[2] || match[4];
		const extension = path.extname(url);
		const filename = `${match[1] || match[3]}${extension}`;
		const dest = path.join(outputDirPath, filename);
		console.log(`Downloading ${url} to ${dest}`);
		await downloadFile(url, dest);

		const localPath = `./${filename}`;
		markdown = markdown.replace(url, localPath);
	}
	await fs.promises.writeFile(mdFilePath, markdown);
}

function formatPost(post, type) {
	const turndownService = new TurndownService({ headingStyle: 'atx' });
	const frontMatter = [
		'---',
		`id: ${post.id}`,
		`date: ${post.date}`,
		`date_gmt: ${post.date_gmt}`,
		`modified: ${post.modified}`,
		`modified_gmt: ${post.modified_gmt}`,
		`slug: ${post.slug}`,
		`type: ${type}`,
		`link: ${post.link}`,
		`title: ${post.title.rendered}`,
		`excerpt: |`,
		`${turndownService
			.turndown(post.excerpt.rendered)
			.split('\n')
			.map((line) => `  ${line}`)
			.join('\n')}`,
		`author_id: ${post.author}`,
		`author_name: ${post._embedded.author[0].name}`,
		`author_url: ${post._embedded.author[0].url}`,
		`author_description: ${post._embedded.author[0].description}`,
		post.categories
			? `categories: [${post.categories.map((cat) => cat.name).join(', ')}]`
			: 'categories:',
		post.tags ? `tags: [${post.tags.map((tag) => tag.name).join(', ')}]` : 'tags:',
		`---`,
		``
	].join('\n');
	const content = turndownService.turndown(post.content.rendered);
	return `${frontMatter}${content}\n`;
}

async function downloadPostsOrPages(downloadPath, url, type) {
	const postsOrPages = await fetchPosts(url);

	const subFolderPath = path.join(downloadPath, type);
	await fs.promises.mkdir(subFolderPath, { recursive: true });

	for (const postOrPage of postsOrPages) {
		const filename = `index.md`;
		const fileFolder = path.join(subFolderPath, postOrPage.slug);
		await fs.promises.mkdir(fileFolder, { recursive: true });
		const filePath = path.join(fileFolder, filename);
		const content = formatPost(postOrPage, type);
		await fs.promises.writeFile(filePath, content);
		console.log(`Saved ${type} to ${filePath}`);
		await downloadAssets(filePath);
	}
}

// Example usage:
downloadPostsOrPages('./src/data', 'https://sgb.hypotheses.org/wp-json/wp/v2/posts?_embed', 'post');
downloadPostsOrPages('./src/data', 'https://sgb.hypotheses.org/wp-json/wp/v2/pages?_embed', 'page');
