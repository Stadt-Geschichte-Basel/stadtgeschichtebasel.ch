// uncomment for PWA
// export const csr = false;

/** @type {import('./$types').PageLoad} */
export async function load(event) {
	// Filter out posts with category 1 (Allgemein)
	const filteredPosts = await event.fetch('/blog/posts-1.json').then((res) => res.json());
	return { posts: filteredPosts };
}
