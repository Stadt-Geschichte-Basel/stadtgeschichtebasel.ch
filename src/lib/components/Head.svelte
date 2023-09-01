<script>
	import * as config from '$lib/config';
	import { pwaInfo } from 'virtual:pwa-info'; 

  	$: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '' 
</script>

<svelte:head>
	<title>{config.title} {config.subtitle}</title>
	<!-- General meta tags -->
	<meta name="generator" content="gh:{config.githubHandle}/{config.githubRepo}" />
	<meta name="keywords" content={config.keywords} />
	<meta name="description" content={config.description} />
	<meta name="author" content={config.author} />
	<meta name="theme-color" content={config.themeColor} />

	<!-- Canonical link -->
	<link rel="canonical" href={config.url} />

	<!-- Manifest link -->
	{@html webManifestLink}

	<!-- Twitter tags -->
	<meta name="twitter:title" content={config.title} />
	<meta name="twitter:description" content={config.description} />
	<meta name="twitter:site" content={config.twitterHandle} />
	<meta name="twitter:creator" content={config.twitterHandle} />
	<meta property="twitter:image" content="/android-chrome-512x512.png" />
	<meta property="twitter:image:width" content="512" />
	<meta property="twitter:image:height" content="512" />

	<!-- Open Graph / Facebook tags-->
	<meta name="og:title" content={config.title} />
	<meta name="og:description" content={config.description} />
	<meta property="og:url" content={config.url} />
	<meta property="og:site_name" content={config.title} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="/android-chrome-512x512.png" />
	<meta property="og:image:width" content="512" />
	<meta property="og:image:height" content="512" />
</svelte:head>
