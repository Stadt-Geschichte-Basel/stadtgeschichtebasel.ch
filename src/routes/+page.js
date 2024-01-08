import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	try {
		const page = await import(`../pages/startseite.md`);

		return {
			content: page.default,
			meta: page.metadata
		};
	} catch (e) {
		error(404, `Could not find startseite.md`);
	}
}
