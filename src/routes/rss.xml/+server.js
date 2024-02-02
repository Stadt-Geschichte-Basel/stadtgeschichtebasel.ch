import * as config from '$lib/config';

/**
 * Indicates whether prerendering is enabled.
 * @type {boolean}
 */
export const prerender = true;

/** @type {import('./$types').RequestHandler} */
export async function GET({ fetch }) {
	const posts = await fetch('/posts.json').then((res) => res.json());
	const pages = await fetch('/pages.json').then((res) => res.json());
	const staticPages = ['agenda', 'archiv', 'blog', 'credits', 'partner'];

	let rss = '<?xml version="1.0" encoding="UTF-8"?>';
	rss += '<rss version="2.0">';
	rss += '<channel>';
	rss += `<title>${config.title}</title>`;
	rss += `<link>${config.url}</link>`;
	rss += `<description>${config.description}</description>`;
	rss += `<language>${config.lang}</language>`;

	posts.forEach((post) => {
		rss += `<item>`;
		rss += `<title>${post.title}</title>`;
		rss += `<link>${config.url}/blog/${post.slug}</link>`;
		rss += `<guid>${config.url}/blog/${post.slug}</guid>`;
		rss += `<pubDate>${new Date(post.date).toISOString()}</pubDate>`;
		rss += `<lastBuildDate>${new Date(post.modified).toISOString()}</lastBuildDate>`;
		rss += `<description>${post.excerpt}</description>`;
		rss += `</item>`;
	});

	pages.forEach((page) => {
		rss += `<item>`;
		rss += `<title>${page.title}</title>`;
		rss += `<link>${config.url}/${page.slug}</link>`;
		rss += `<guid>${config.url}/${page.slug}</guid>`;
		rss += `<pubDate>${new Date(page.date).toISOString()}</pubDate>`;
		rss += `<lastBuildDate>${new Date(page.modified).toISOString()}</lastBuildDate>`;
		rss += `<description>${page.excerpt}</description>`;
		rss += `</item>`;
	});

	staticPages.forEach((page) => {
		rss += `<item>`;
		rss += `<title>${page}</title>`;
		rss += `<link>${config.url}/${page}</link>`;
		rss += `<guid>${config.url}/${page}</guid>`;
		rss += `<pubDate>${new Date().toISOString()}</pubDate>`;
		rss += `<lastBuildDate>${new Date().toISOString()}</lastBuildDate>`;
		rss += `<description>${page}</description>`;
		rss += `</item>`;
	});

	rss += `</channel>`;
	rss += `</rss>`;

	return new Response(rss, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8'
		}
	});
}
