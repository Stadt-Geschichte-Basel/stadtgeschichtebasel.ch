/**
 * @typedef {Object} Post
 * @property {number} id
 * @property {string} title
 * @property {string} date
 * @property {string} lastUpdate
 * @property {string} slug
 * @property {string} excerpt
 */

/**
 * Get posts
 * @returns {Promise<Post[]>}
 */

/**
 * Get posts
 * @returns {Promise<Post[]>}
 */

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const response = await fetch('blog-alt/posts');
	const posts = await response.json();
	return { posts };
}
