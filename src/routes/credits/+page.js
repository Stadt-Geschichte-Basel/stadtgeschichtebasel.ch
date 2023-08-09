/** @type {import('./$types').PageLoad} */
export async function load(event) {
	const data = await event.fetch('/credits.json').then((res) => res.json());
	return {
		...data
	};
}
