import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
	const post = await fetch(`/blog/post-${params.slug}.json`).then((res) => res.json());

	if (!post) throw error(404);
	return post;
}
