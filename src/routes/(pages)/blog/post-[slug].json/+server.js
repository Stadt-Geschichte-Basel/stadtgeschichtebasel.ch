export const prerender = true;

import { json } from '@sveltejs/kit';
import fs from 'fs/promises';
import path from 'path';
import { assets } from '$app/paths';

// 2. Extract all assets (images) from posts and replace the URLs with the local path to the assets folder
function extractAssets(content) {
	const regex = /<img.*?src="(https:\/\/sgb\.hypotheses\.org\/)(.*?)"/g;
	const originalURLs = [];
	const replacedPost = content.replace(regex, (match, url, path) => {
		originalURLs.push(url + path);
		return match.replace(url, '').replace(path, `${assets}/${path}`);
	});
	saveAssets(originalURLs, 'static/');
	return replacedPost;
}

// 3. Save all assets to ./src/static/ while retaining the folder structure and the original file names
async function saveAssets(assets, folder) {
	for await (const url of assets) {
		const { dir, name, ext } = path.parse(url.replace('https://sgb.hypotheses.org/', ''));
		const destination = path.join(folder, dir, `${name}${ext}`);
		const data = await (await fetch(url)).arrayBuffer();
		await fs.mkdir(path.dirname(destination), { recursive: true });
		await fs.writeFile(destination, Buffer.from(data));
	}
}

/** Create a new route handler that fetches the post from the Hypotheses API and returns it as JSON.
 * the slug is passed as a parameter to the route handler.
 * The slug is used, because SearchParams are not allowed when preredendering.
 * @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	const post = (
		await fetch(
			`https://sgb.hypotheses.org/wp-json/wp/v2/posts?_fields=title,content&slug=${params.slug}`
		).then((res) => res.json())
	)[0];
	post.content.rendered = extractAssets(post.content.rendered);

	return json(post);
}
