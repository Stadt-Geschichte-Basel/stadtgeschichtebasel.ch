import data from '$lib/data/datastories.json';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad}*/
export async function load({ params }) {
	const foundUrl = data.find((entry) => entry.url === params.path);

	if (foundUrl) {
		return { url: foundUrl.url };
	}

	const foundSlug = data.find((entry) => entry.slug === params.path);

	if (foundSlug) {
		return { url: foundSlug.url };
	}

	error(404, `Could not find ${params.path}`);
}
