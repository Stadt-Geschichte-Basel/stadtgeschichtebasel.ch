import { json } from '@sveltejs/kit';

/**
 * Indicates whether prerendering is enabled.
 * @type {boolean}
 */
export const prerender = true;

/**
 * Represents the metadata for a post.
 * @typedef {Object} PostMetadata
 * @property {string} slug - The unique slug derived from the file name.
 * @property {string} title - The title of the post.
 * @property {string} date - The publication date of the post.
 * @property {string} excerpt - A short excerpt from the post.
 * @property {string[]} tags - An array of tags related to the post.
 */

/**
 * Fetches posts and their metadata from markdown files.
 * @returns {Promise<PostMetadata[]>} A promise that resolves to an array of posts with metadata.
 */
async function getPosts() {
	let posts = [];

	// Get all markdown files in the /src/posts directory
	const paths = import.meta.glob('/src/posts/*.md', { eager: true });

	// Loop through each file and extract its metadata
	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').pop()?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata;
			const post = { ...metadata, slug };
			posts.push(post);
		}
	}

	// Sort posts by date (newest first)
	posts.sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime());

	return posts;
}

/**
 * Request handler for the GET method.
 * @type {import('./$types').RequestHandler}
 */
export async function GET() {
	const posts = await getPosts();
	return json(posts);
}
