import { json } from '@sveltejs/kit';

/**
 * @typedef {Object} Post
 * @property {number} id
 * @property {string} title
 * @property {string} date
 * @property {string} lastUpdate
 * @property {string} slug
 * @property {string} excerpt
 */

/**
 * Get posts
 * @returns {Promise<Post[]>}
 */
async function getPosts() {
	let posts = [];

	const paths = import.meta.glob('/src/lib/data/posts/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').pop()?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata;
			const post = { ...metadata, slug };
			posts.push(post);
		}
	}

	posts = posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	return posts;
}

/**
 * GET function
 * @returns {Promise<import('@sveltejs/kit').Response>}
 */
async function GET() {
	const posts = await getPosts();
	return json(posts);
}

export { GET };
