<script>
	import { base } from '$app/paths';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Container from '$lib/components/Container.svelte';
	/** @type {import('./$types').PageData} */
	export let data;
	const date = new Date(data.meta.date).toLocaleDateString('de-CH').toString();
	const modified = new Date(data.meta.modified).toLocaleDateString('de-CH').toString();
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
		<hgroup>
			<h1 class="not-prose h2 font-bold">{data.meta.title}</h1>
			<span class="text-sm"
				>Veröffentlicht am {date}{#if modified !== date}, zuletzt geändert am {modified}{/if}</span
			>
			{#each data.meta.categories as category}
				<a class="variant-filled badge" href="{base}/blog/kategorie/{category}">&num;{category}</a>
			{/each}
		</hgroup>
		<svelte:component this={data.content} />
	</article>
</Container>
