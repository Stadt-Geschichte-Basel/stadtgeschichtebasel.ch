import { error, redirect } from '@sveltejs/kit';
// import pages from '$lib/data/pages.json';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	// if params can be converted to a number, it's an id of a post
	if (Number.isInteger(parseInt(params.slug))) {
		const post = await fetch(
			`https://sgb.hypotheses.org/wp-json/wp/v2/posts/${params.slug}?_fields=slug`
		).then((res) => res.json());
		if (!post?.slug) throw error(404);
		throw redirect(307, `/blog/${post.slug}`);
	}

	// else it's a slug of a page
	const page = await fetch(`/page-${params.slug}.json`).then((res) => res.json());

	if (!page) throw error(404);
	return page;
}
