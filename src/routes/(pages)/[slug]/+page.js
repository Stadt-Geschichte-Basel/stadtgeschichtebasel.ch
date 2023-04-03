import { error, redirect } from '@sveltejs/kit';
import pages from '$lib/data/pages.json';
import posts from '$lib/data/posts.json';

export async function load({ params }) {
	// if params can be converted to a number, it's an id of a post
	if (Number.isInteger(parseInt(params.slug))) {
		const post = posts.find((post) => post.id.toString() === params.slug);
		if (!post) throw error(404);
		throw redirect(307, `/blog/${post.slug}`);
	}

	// else it's a slug of a page
	const page = pages.find((page) => page.slug === params.slug);

	if (!page) throw error(404);
	return page;
}
