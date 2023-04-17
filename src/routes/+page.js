// uncomment for PWA
// export const csr = false;

/** @type {import('./$types').PageLoad} */
export async function load(event) {
	// Filter out posts with category 14 (Forschung)
	const filteredPosts = await event.fetch('/blog/posts-14.json').then((res) => res.json());
	return { posts: filteredPosts };
}
