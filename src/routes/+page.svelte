<script>
	import Container from '$lib/components/Container.svelte';
	import * as config from '$lib/config';
	import { Paginator } from '@skeletonlabs/skeleton';

	/** @type {import('./$types').PageData} */
	export let data;
	
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
	
	// /* @vite-ignore */
	// async function loadImages(posts) {
	// 	for (const post of posts) {
	// 		if (post.featuredImage) {
	// 			try {
	// 				// const module = await import(`../posts/${post.featuredImage}/* @vite-ignore */`);
	// 				const path = `../posts/${post.featuredImage}`;
	// 				const module = await import(path);
	// 				post.imageSrc = module.default;
	// 			} catch (error) {
	// 				console.error(error);
	// 			}
	// 		}
	// 	}
	// }

	// $: loadImages(paginatedPosts);
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<Container>
	<h1>Blog</h1>

	{#each paginatedPosts as post}
		<article>
			<h2>
				<a href="/blog/{post.slug}" class="font-bold no-underline hover:underline" title={post.slug}
					>{post.title}</a
				>
			</h2>
			{#if post.featuredImage}
				<a href="/blog/{post.slug}" title={post.slug}>
					<img src="/{post.featuredImage}" alt={post.title} class="mx-auto h-auto w-full md:max-w-md" />
				</a>
			{/if}
			<p class="description">
				{post.excerpt} <a href="/blog/{post.slug}" title={post.slug}>weiterlesen</a>
			</p>
		</article>
	{/each}
	<nav aria-label="Blognavigation">
		<Paginator bind:settings={paginationSettings} showNumerals amountText="Einträge" />
	</nav>
</Container>
