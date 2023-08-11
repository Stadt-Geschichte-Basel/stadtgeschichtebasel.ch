import * as config from '$lib/config';

/**
 * Indicates whether prerendering is enabled.
 * @type {boolean}
 */
export const prerender = true;

export const trailingSlash = 'never';
export const GET = () =>
	new Response(
		JSON.stringify(
			{
				name: config.title,
				short_name: config.title,
				lang: config.lang,
				description: config.description,
				id: config.url + '/',
				start_url: '/',
				scope: '/',
				display: 'standalone',
				orientation: 'portrait',
				background_color: config.themeColor,
				theme_color: config.themeColor,
				icons: [
					...Object.values(config.icons)
						.filter((icon) => icon.sizes !== '180x180')
						.map((icon) => ({ ...icon, purpose: 'any' })),
					...Object.values(config.maskableicon).map((icon) => ({ ...icon, purpose: 'maskable' }))
				]
			},
			null,
			2
		),
		{
			headers: {
				'Content-Type': 'application/manifest+json; charset=utf-8'
			}
		}
	);
