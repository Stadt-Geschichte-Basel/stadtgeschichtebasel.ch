<script>
	export let data;
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article class="container space-y-4 p-10">
	<!-- Title -->
		<h1>{data.meta.title}</h1>


	<!-- Tags -->
	<!-- <div class="tags">
		{#each data.meta.categories as category}
			<span class="surface-4">&num;{category}</span>
		{/each}
	</div> -->

	<!-- Post -->
	<div class="prose">
		<svelte:component this={data.content} />
	</div>
</article>
