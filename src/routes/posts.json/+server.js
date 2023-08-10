import { json } from '@sveltejs/kit';

/**
 * Fetches posts and their metadata.
 * @returns {Promise<Array>} An array of posts with metadata.
 */
async function getPosts() {
	let posts = [];

	// Get all markdown files in the /src/posts directory
	const paths = import.meta.glob('/src/posts/*.md', { eager: true });
	console.log(paths);

	// Loop through each file and extract its metadata
	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').pop()?.replace('.md', '');

		// if (file && typeof file === 'object' && 'metadata' in file && slug) {
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
