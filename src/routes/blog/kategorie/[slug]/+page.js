import { dev } from '$app/environment';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	try {
		const posts = await fetch('/posts.json').then((r) => r.json());
		const filteredPosts = posts.filter((post) => post.categories.includes(params.slug));
		if (filteredPosts.length === 0) {
			throw new Error(`Could not find ${params.slug}`);
		}
		return {
			slug: params.slug,
			posts: filteredPosts
		};
	} catch (e) {
		if (dev) {
			console.error(e);
		}
		error(404, `Could not find ${params.slug}`);
	}
}
