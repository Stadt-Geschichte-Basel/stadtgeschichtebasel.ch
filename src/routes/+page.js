// uncomment for PWA
// export const csr = false;

import posts from '$lib/data/posts.json';

export function load() {
	// Filter out posts with category 14 (Forschung)
	const filteredPosts = posts.filter((post) => !post.categories.includes(14));
	return { posts: filteredPosts };
}
