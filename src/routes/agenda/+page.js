/** @type {import('./$types').PageLoad} */
export async function load(event) {
	const data = await event.fetch('/agenda.json').then((res) => res.json());
	return {
		...data
	};
}
