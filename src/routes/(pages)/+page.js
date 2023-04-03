import posts from '$lib/data/posts.json';

export function load({ params }) {
	// Filter out posts with category 14 (Forschung)
	const filteredPosts = posts.filter(post => !post.categories.includes(14));
	return { posts: filteredPosts };
}
