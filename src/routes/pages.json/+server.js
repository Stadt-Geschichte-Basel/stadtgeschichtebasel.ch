import { json } from '@sveltejs/kit';

/**
 * Indicates whether prerendering is enabled.
 * @type {boolean}
 */
export const prerender = true;

/**
 * Fetches pages and their metadata.
 * @returns {Promise<Array>} An array of pages with metadata.
 */
async function getPages() {
	let pages = [];

	// Get all markdown files in the /src/pages directory
	const paths = import.meta.glob('/src/pages/*.md', { eager: true });

	// Loop through each file and extract its metadata
	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').pop()?.replace('.md', '');

		// if (file && typeof file === 'object' && 'metadata' in file && slug) {
		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata;
			const page = { ...metadata, slug };
			pages.push(page);
		}
	}

	return pages;
}

/**
 * Request handler for the GET method.
 * @type {import('./$types').RequestHandler}
 */
export async function GET() {
	const pages = await getPages();
	return json(pages);
}
