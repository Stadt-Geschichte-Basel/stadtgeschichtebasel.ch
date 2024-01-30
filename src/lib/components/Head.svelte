<script>
	import * as config from '$lib/config';
	import { base } from '$app/paths';
	import { page } from '$app/stores';

	export let title = config.title + ' ' + config.subtitle;
	export let keywords = config.keywords;
	export let description = config.description;
	export let author = config.author;
	export let canonical = config.url + $page.url.pathname;
	export let image = config.url + '/android-chrome-512x512.png';
	export let imageWidth = '512';
	export let imageHeight = '512';
	export let jsonLdDataType = 'WebSite';
	export let jsonLdData = {};
	export let date = '';
	export let modified = '';
	export let excerpt = '';

	function generateStructuredData(type) {
		const websiteData = {
			'@type': 'WebSite',
			name: config.title,
			url: config.url,
			logo: config.url + '/android-chrome-512x512.png',
			sameAs: [
				'https://www.instagram.com/' + config.instagramHandle,
				'https://twitter.com/' + config.twitterHandle,
				'https://github.com/' + config.githubHandle
			]
		};

		if (type === 'WebSite') {
			return {
				'@context': 'https://schema.org',
				...websiteData
			};
		}

		let pageSpecificData = {};

		switch (type) {
			case 'Article':
				pageSpecificData = {
					'@type': 'Article',
					headline: title,
					datePublished: new Date(date).toUTCString(),
					dateModified: new Date(modified).toUTCString(),
					publisher: {
						'@type': 'Organization',
						name: config.title,
						logo: config.url + '/android-chrome-512x512.png'
					},
					description: excerpt,
					mainEntityOfPage: {
						'@type': 'WebPage',
						'@id': config.url + $page.url.pathname
					}
				};
				break;
			case 'BlogPosting':
				pageSpecificData = {
					'@type': 'BlogPosting',
					headline: title,
					datePublished: new Date(date).toUTCString(),
					dateModified: new Date(modified).toUTCString(),
					publisher: {
						'@type': 'Organization',
						name: config.title,
						logo: config.url + '/android-chrome-512x512.png'
					},
					description: excerpt,
					mainEntityOfPage: {
						'@type': 'WebPage',
						'@id': config.url + $page.url.pathname
					},
					image: {
						'@type': 'ImageObject',
						url: config.url + image,
						width: imageWidth,
						height: imageHeight
					}
				};
				break;
			case 'map':
				pageSpecificData = {
					'@type': 'Map'
					// FIXME: Add map specific data
				};
				break;
			case 'event':
				pageSpecificData = {
					'@type': 'Event'
					// FIXME: Add event specific data
				};
				break;

			default:
				pageSpecificData = {};
		}

		return {
			'@context': 'https://schema.org',
			'@graph': [websiteData, pageSpecificData, jsonLdData]
		};
	}

	let structuredData = generateStructuredData(jsonLdDataType);
	let jsonLdString = JSON.stringify(structuredData);
</script>

<svelte:head>
	<title>{title}</title>

	<!-- General meta tags -->
	<meta name="generator" content="gh:{config.githubHandle}/{config.githubRepo}" />
	<meta name="keywords" content={keywords} />
	<meta name="description" content={description} />
	<meta name="author" content={author} />
	<meta name="theme-color" content={config.themeColor} />

	<!-- Canonical link -->
	<link rel="canonical" href={canonical} />

	<!-- Manifest link -->
	<link rel="manifest" href="{base}/manifest.webmanifest" />

	<!-- RSS feed -->
	<link rel="alternate" type="application/rss+xml" href="{base}/rss.xml" />

	<!-- Sitemap link -->
	<link rel="sitemap" type="application/xml" href="{base}/sitemap.xml" />

	<!-- Twitter tags -->
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:site" content={config.twitterHandle} />
	<meta name="twitter:creator" content={config.twitterHandle} />
	<meta property="twitter:image" content={config.url + image} />
	<meta property="twitter:image:width" content={imageWidth} />
	<meta property="twitter:image:height" content={imageHeight} />

	<!-- Open Graph / Facebook tags-->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={config.url} />
	<meta property="og:site_name" content={config.title} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={config.url + image} />
	<meta property="og:image:width" content={imageWidth} />
	<meta property="og:image:height" content={imageHeight} />

	<!-- JSON-LD -->
	<svelte:element this="script" type="application/ld+json">
		{jsonLdString}
	</svelte:element>
</svelte:head>
