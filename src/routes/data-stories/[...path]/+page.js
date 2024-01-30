import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad}*/
export async function load({ params }) {
	const datastories = ['https://storymaps.arcgis.com/stories/6be823309a7b4254aa27b5486703b68b'];

	if (datastories.includes(params.path)) {
		return { url: params.path };
	}

	error(404, `Could not find ${params.path}`);
}
