<script>
	import Container from '$lib/components/Container.svelte';
	import * as config from '$lib/config';
	import { Paginator } from '@skeletonlabs/skeleton';

	/** @type {import('./$types').PageData} */
	export let data;

	// PaginatorSettings
	let paginationSettings = {
		page: 0,
		limit: 10,
		size: data.posts.length,
		amounts: [10, 25, 50, 100]
	};

	$: paginatedPosts = data.posts.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<Container>
	<h1>Blog</h1>

	{#each paginatedPosts as post}
		<article>
			<h2>{post.title}
				<!-- <a href={`/blog/${post.slug}`}>{post.title}</a> -->
			</h2>
			<p class="description">{post.excerpt} <a href="/blog/{post.slug}">weiterlesen</a></p>
		</article>
	{/each}

	<Paginator bind:settings={paginationSettings} showNumerals amountText="Einträge"/>
</Container>
