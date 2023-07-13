export const prerender = true;

import { getAllPosts } from '$lib/utils/utils';
import { json } from '@sveltejs/kit';

/** Create a new route handler that fetches all posts with given categories from the Hypotheses API and returns it as JSON.
 * the slug is passed as a parameter to the route handler.
 * The slug is used, because SearchParams are not allowed when preredendering.
 * @type {import('./$types').RequestHandler} */
export async function GET() {
	// We are only requesting the neccessary fields (title,excerpt,slug) to reduce the size of the response.
	const posts = await getAllPosts(
		`https://sgb.hypotheses.org/wp-json/wp/v2/pages?_fields=title,excerpt,slug&per_page=100`
	);

	return json(posts);
}
