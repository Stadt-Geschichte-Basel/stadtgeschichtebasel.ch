import data from '$lib/data/archive.json';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad}*/
export async function load({ params }) {
	if (data.urls.includes(params.path)) {
		return { url: params.path };
	} else {
		throw error(404, `Could not find ${params.path}`);
	}
}
