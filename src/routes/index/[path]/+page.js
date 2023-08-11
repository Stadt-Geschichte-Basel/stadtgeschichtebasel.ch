import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad}*/
export async function load({ fetch, params }) {
	const res = await fetch(`/archive.json`);
	const urls = await res.json();
	if (urls.includes(params.path)) {
		return { url: params.path };
	} else {
		throw error(404, `Could not find ${params.path}`);
	}
}
