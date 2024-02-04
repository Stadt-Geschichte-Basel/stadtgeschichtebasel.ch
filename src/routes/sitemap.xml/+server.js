import * as config from '$lib/config';

/**
 * Indicates whether prerendering is enabled.
 * @type {boolean}
 */
export const prerender = true;

/** @type {import('./$types').RequestHandler} */
export async function GET({ fetch }) {
	const posts = await fetch('/posts.json').then((res) => res.json());
	const categories = [...new Set(posts.flatMap((post) => post.categories))];
	const pages = await fetch('/pages.json').then((res) => res.json());
	const staticPages = ['agenda', 'archiv', 'blog', 'credits', 'partner'];
	let xml = '<?xml version="1.0" encoding="UTF-8"?>';
	xml +=
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">';
	xml += `<url>`;
	xml += `<loc>${config.url}</loc>`;
	xml += `<lastmod>${new Date().toISOString()}</lastmod>`;
	xml += `<changefreq>daily</changefreq>`;
	xml += `<priority>1.0</priority>`;
	xml += `</url>`;
	pages.forEach((page) => {
		xml += `<url>`;
		xml += `<loc>${config.url}/${page.slug}</loc>`;
		xml += `<lastmod>${new Date(page.modified).toISOString()}</lastmod>`;
		xml += `<changefreq>weekly</changefreq>`;
		xml += `<priority>0.80</priority>`;
		xml += `</url>`;
	});
	staticPages.forEach((page) => {
		xml += `<url>`;
		xml += `<loc>${config.url}/${page}</loc>`;
		xml += `<lastmod>${new Date().toISOString()}</lastmod>`;
		xml += `<changefreq>weekly</changefreq>`;
		xml += `<priority>0.8</priority>`;
		xml += `</url>`;
	});
	posts.forEach((post) => {
		xml += `<url>`;
		xml += `<loc>${config.url}/blog/${post.slug}</loc>`;
		xml += `<lastmod>${new Date(post.modified).toISOString()}</lastmod>`;
		xml += `<changefreq>weekly</changefreq>`;
		xml += `<priority>0.64</priority>`;
		xml += `</url>`;
	});
	categories.forEach((category) => {
		xml += `<url>`;
		xml += `<loc>${config.url}/blog/kategorie/${encodeURI(category)}</loc>`;
		xml += `<lastmod>${new Date().toISOString()}</lastmod>`;
		xml += `<changefreq>weekly</changefreq>`;
		xml += `<priority>0.21</priority>`;
		xml += `</url>`;
	});

	xml += `</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8'
		}
	});
}
