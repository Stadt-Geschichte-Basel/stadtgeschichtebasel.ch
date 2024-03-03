<script>
	import { base } from '$app/paths';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Container from '$lib/components/Container.svelte';
	import Head from '$lib/components/Head.svelte';
	import ShareButtons from '$lib/components/ShareButtons.svelte';
	/** @type {import('./$types').PageData} */
	export let data;
	const date = new Date(data.meta.date).toLocaleDateString('de-CH').toString();
	const modified = new Date(data.meta.modified).toLocaleDateString('de-CH').toString();

	const url = 'blog/' + data.meta.slug;
</script>

<Head
	title={data.meta.title}
	date={data.meta.date}
	modified={data.meta.modified}
	excerpt={data.meta.excerpt}
	jsonLdDataType="BlogPosting"
	image={data.meta.featuredImage}
/>

<Breadcrumbs />

<Container>
	<article>
		<hgroup>
			<h1 class="not-prose h2 font-bold">{data.meta.title}</h1>
			<div
				class="flex flex-col flex-wrap items-start gap-1 space-y-1 md:flex-row md:place-items-center"
			>
				<span class="text-sm"
					>Veröffentlicht am {date}{#if modified !== date}, zuletzt geändert am {modified}{/if}</span
				>
				{#each data.meta.categories as category}
					<a
						class="variant-ringed badge text-primary-500 hover:bg-primary-500 hover:text-white"
						href="{base}/blog/kategorie/{category}">&num;{category}</a
					>
				{/each}
				<ShareButtons slug={url} title={data.meta.title} />
			</div>
		</hgroup>
		<svelte:component this={data.content} />
	</article>
</Container>
