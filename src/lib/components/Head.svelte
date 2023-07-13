<script>
	import * as config from '$lib/config';
</script>

<svelte:head>
	<title>{config.title}</title>
	<meta name="keywords" content={config.keywords} />
	<meta name="description" content={config.description} />
	<meta name="author" content={config.author} />

	<!-- Twitter tags -->
	<meta name="twitter:title" content={config.title} />
	<meta name="twitter:description" content={config.description} />
	<meta name="twitter:site" content={config.twitter} />
	<meta name="twitter:creator" content={config.twitter} />
	<meta property="twitter:image" content={config.image512} />
	<meta property="twitter:image:width" content="512" />
	<meta property="twitter:image:height" content="512" />

	<!-- Open Graph / Facebook tags-->
	<meta name="og:title" content={config.title} />
	<meta name="og:description" content={config.description} />
	<meta property="og:url" content={config.url} />
	<meta property="og:site_name" content={config.title} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={config.image512} />
	<meta property="og:image:width" content="512" />
	<meta property="og:image:height" content="512" />
</svelte:head>
