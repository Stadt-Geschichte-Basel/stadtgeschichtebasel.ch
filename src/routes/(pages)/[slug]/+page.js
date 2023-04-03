import { error } from '@sveltejs/kit';
import pages from '$lib/data/pages.json';

export function load({ params }) {
	const page = pages.find((page) => page.slug === params.slug);

	if (!page) throw error(404);
	return page;
}
