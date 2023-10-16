/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	const posts = await fetch('/posts.json').then((r) => r.json());
	return { posts, page: params.page };
}
