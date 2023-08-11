/** @type {import('./$types').PageLoad}*/
export async function load({ fetch, params }) {
	const res = await fetch(`/archive.json`);
	const urls = await res.json();
	return {
		urls
	};
}
