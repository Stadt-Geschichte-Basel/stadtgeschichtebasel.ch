<script>
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Container from '$lib/components/Container.svelte';
	/** @type {import('./$types').PageData} */
	export let data;
	const date = new Date(data.meta.date).toLocaleDateString('de-CH');
	const modified = new Date(data.meta.modified).toLocaleDateString('de-CH');
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<Breadcrumbs />

<Container>
<article>
	<!-- Title -->
	<hgroup>
		<h1 class="h2 not-prose font-bold">{data.meta.title}</h1>
		<span>Veröffentlicht am {date}{#if data.meta.modified}{#if data.meta.modified !== data.meta.date}, zuletzt geändert am {modified}{/if}{/if}</span>
	</hgroup>

	<!-- Tags -->
	<!-- <div class="tags">
		{#each data.meta.categories as category}
			<span class="surface-4">&num;{category}</span>
		{/each}
	</div> -->

	<!-- Post -->
	
		<svelte:component this={data.content} />
	
</article>
</Container>