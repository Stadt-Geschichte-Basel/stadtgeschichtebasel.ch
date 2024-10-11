import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	try {
		const page = await import(`../../pages/${params.slug}.md`);

		return {
			content: page.default,
			meta: page.metadata
		};
	} catch (e) {
		console.error(e);
		error(404, `Could not find ${params.slug}`);
	}
}
