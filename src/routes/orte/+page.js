import data from '$lib/data/map.json';

/** @type {import('./$types').PageLoad} */
export async function load() {
	return {
		...data
	};
}
