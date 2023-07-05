export const prerender = true;

import { json } from '@sveltejs/kit';
import { extractAssets } from '$lib/utils';

/** Create a new route handler that fetches the post from the Hypotheses API and returns it as JSON.
 * the slug is passed as a parameter to the route handler.
 * The slug is used, because SearchParams are not allowed when preredendering.
 * @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	const post = (
		await fetch(
			`https://sgb.hypotheses.org/wp-json/wp/v2/pages?_fields=title,content&slug=${params.slug}`
		).then((res) => res.json())
	)[0];
	post.content.rendered = await extractAssets(post.content.rendered);

	return json(post);
}
