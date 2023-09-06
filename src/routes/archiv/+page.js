import data from '$lib/data/archive.json';

/** @type {import('./$types').PageLoad} */
export async function load() {
	return {
		...data
	};
}
