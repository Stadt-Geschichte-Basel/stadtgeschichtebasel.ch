import { error } from '@sveltejs/kit';
import data from '$lib/data/datastories.json';

/** @type {import('./$types').PageLoad}*/
export async function load({ params }) {
	const foundEntry = data.find((entry) => entry.url === params.path);

	if (foundEntry) {
		return { url: params.path };
	}

	error(404, `Could not find ${params.path}`);
}
