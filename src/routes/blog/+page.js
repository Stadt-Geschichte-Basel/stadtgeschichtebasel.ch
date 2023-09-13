/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const response = await fetch('posts.json');
	const posts = await response.json();
	return { posts };
}
