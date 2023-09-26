/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const posts = await fetch('/posts.json').then((res) => res.json());
	const data = await fetch('/agenda.json').then((res) => res.json());
	return { posts, ...data };
}
