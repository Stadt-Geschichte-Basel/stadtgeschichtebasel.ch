import * as config from '$lib/config';
import data from '$lib/data/archive.json';
import { error } from '@sveltejs/kit';

export const prerender = true;

const { siteUrl } = config.url;

const render = (pages, posts, archive) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
	xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
	xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:pagemap="http://www.google.com/schemas/sitemap-pagemap/1.0"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
	>

	${pages
		.map(
			(element) => `
	<url>
	  <loc>${element}</loc>
		<lastmod>${`${process.env.VITE_BUILD_TIME}`}</lastmod>
	</url>`
		)
		.join('\n')}

	${posts
		.map((element) => {
			const { lastUpdated, slug } = element;
			return `
	<url>
	  <loc>${siteUrl}/${slug}</loc>
		<lastmod>${`${new Date(lastUpdated).toISOString()}`}</lastmod>
	</url>
	`;
		})
		.join('')}
    ${archive
			.map((element) => {
				const { lastUpdated, slug } = element;
				return `
            <url>
                <loc>${siteUrl}/archive/${slug}</loc>
                <lastmod>${`${new Date(lastUpdated).toISOString()}`}</lastmod>
            </url>
            `;
			})
			.join('')}

</urlset>`;

/** @type {import('./$types').RequestHandler} */
export async function GET({ setHeaders }) {
	try {
		// const mdModules = import.meta.glob('../../content/blog/**/index.md');
		// const posts = await Promise.all(
		// 	Object.keys(mdModules).map(async (path) => {
		// 		const slug = path.split('/').at(-2);
		// 		const { metadata } = await mdModules[path]();
		// 		const { lastUpdated } = metadata;
		// 		return { lastUpdated, slug };
		// 	}),
		// );

		// const pagePaths = ['', '/contact'];
		// const pages = pagePaths.map((element) => `${siteUrl}${element}`);

		setHeaders({
			'Cache-Control': 'max-age=0, s-max-age=600',
			'Content-Type': 'application/xml'
		});
		const posts = fetch('posts.json').then((r) => r.json());
		const pages = fetch('pages.json').then((r) => r.json());
		return new Response(render(pages, posts, data));
	} catch (err) {
		console.error(`Error in sitemap.xml: ${err}`);
		throw error(500, err);
	}
}
