/**
 * Indicates whether prerendering is enabled.
 * @type {boolean}
 */
export const prerender = true;

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, fetch }) {
	const posts = await fetch('/posts.json').then((res) => res.json());
	const categories = [...new Set(posts.flatMap((post) => post.categories))];
	const pages = await fetch('/pages.json').then((res) => res.json());
	const staticPages = ['agenda', 'archiv', 'blog', 'credits', 'partner'];
	let xml = '<?xml version="1.0" encoding="UTF-8"?>';
	xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

	pages.forEach((page) => {
		xml += `<url>`;
		xml += `<loc>${url.origin}/${page.slug}</loc>`;
		xml += `<lastmod>${page.modified}</lastmod>`;
		xml += `<changefreq>weekly</changefreq>`;
		xml += `<priority>1</priority>`;
		xml += `</url>`;
	});
	staticPages.forEach((page) => {
		xml += `<url>`;
		xml += `<loc>${url.origin}/${page}</loc>`;
		xml += `<changefreq>weekly</changefreq>`;
		xml += `<priority>1</priority>`;
		xml += `</url>`;
	});
	posts.forEach((post) => {
		xml += `<url>`;
		xml += `<loc>${url.origin}/blog/${post.slug}</loc>`;
		xml += `<lastmod>${post.modified}</lastmod>`;
		xml += `<changefreq>weekly</changefreq>`;
		xml += `<priority>0.8</priority>`;
		xml += `</url>`;
	});
	categories.forEach((category) => {
		xml += `<url>`;
		xml += `<loc>${url.origin}/blog/kategorie/${category}</loc>`;
		xml += `<changefreq>weekly</changefreq>`;
		xml += `<priority>0.5</priority>`;
		xml += `</url>`;
	});

	xml += `</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
