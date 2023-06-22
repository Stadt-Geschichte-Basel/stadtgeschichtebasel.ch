import { assets } from '$app/paths';
import fs from 'fs/promises';
import path from 'path';

/**
 * Retrieves all posts from a WordPress REST API endpoint.
 * @param {string} baseUrl - The base URL of the WordPress REST API endpoint to retrieve posts from.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of post objects.
 */
export async function getAllPosts(baseUrl) {
	const response = await fetch(baseUrl);
	const data = await response.json();
	const totalPages = parseInt(response?.headers.get('x-wp-totalpages') ?? '1', 10);
	const promises = Array.from({ length: totalPages - 1 }, (_, i) =>
		fetch(`${baseUrl}&page=${i + 2}`).then((res) => res.json())
	);
	const allPosts = await Promise.allSettled([data, ...promises]);
	return allPosts
		.filter(({ status }) => status === 'fulfilled')
		.map(({ value }) => value)
		.flat();
}

/**
 * Saves all assets from an array of URLs to a specified folder.
 * @param {Array<string>} assets - An array of asset URLs to save.
 * @param {string} folder - The folder to save the assets to.
 * @returns {Promise<void>} A promise that resolves when all assets have been saved.
 */
async function saveAssets(assets, folder) {
	const downloads = assets.map(async (url) => {
		const { dir, name, ext } = path.parse(url.replace('https://sgb.hypotheses.org/', ''));
		const destination = path.join(folder, dir, `${name}${ext}`);
		const data = await (await fetch(url)).arrayBuffer();
		await fs.mkdir(path.dirname(destination), { recursive: true });
		await fs.writeFile(destination, Buffer.from(data));
	});
	await Promise.all(downloads);
}

/**
 * Replaces all asset URLs in a given content string with their corresponding paths relative to the 'assets' folder.
 * @param {string} content - The content string to extract assets from and replace URLs in.
 * @returns {string} The modified content string with URLs replaced.
 */
export function extractAssets(content) {
	const regex = /<img.*?src="(https:\/\/sgb\.hypotheses\.org\/)(.*?)"/g;
	const urls = [];
	const modifiedContent = content.replace(regex, (match, url, path) => {
		urls.push(url + path);
		return match.replace(url, '').replace(path, `${assets}/${path}`);
	});
	saveAssets(urls, 'static/');
	return modifiedContent;
}
