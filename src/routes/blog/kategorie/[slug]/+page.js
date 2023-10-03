import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	try {
		const response = await fetch('/posts.json');
		const posts = await response.json();
		const filteredPosts = posts.filter((post) => post.categories.includes(params.slug));
		if (filteredPosts.length === 0) {
			throw new Error(`Could not find ${params.slug}`);
		}
		return {
			slug: params.slug,
			posts: filteredPosts
		};
	} catch (e) {
		throw error(404, `Could not find ${params.slug}`);
	}
}
