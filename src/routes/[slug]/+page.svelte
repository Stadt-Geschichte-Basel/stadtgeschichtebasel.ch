<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article class="container space-y-4 p-10 prose">
		<h1>{data.meta.title}</h1>

		<svelte:component this={data.content} />
</article>
