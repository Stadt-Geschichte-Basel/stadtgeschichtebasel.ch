<script>
	import { base } from '$app/paths';
	// import { localStorageStore } from '@skeletonlabs/skeleton';
	import Container from '$lib/components/Container.svelte';
	import * as config from '$lib/config';
	import { Paginator } from '@skeletonlabs/skeleton';

	/** @type {import('./$types').PageData} */
	export let data;

	let paginationSettings = {
		page: 0,
		limit: 5,
		size: data.posts.length,
		amounts: [5, 10]
	};

	// const paginationSettings = localStorageStore('paginationSettings', {
	// 	page: 0,
	// 	limit: 5,
	// 	size: data.posts.length,
	// 	amounts: [5, 10]
	// });

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

	<p>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer blandit egestas lorem, sit amet interdum purus finibus eget. 
	</p>

	{#each paginatedPosts as post}
		<article>
			<h2>
				<a href="{base}/blog/{post.slug}" class="font-bold no-underline hover:underline" title={post.slug}
					>{post.title}</a
				>
			</h2>
			{#if post.featuredImage}
				<img
					src={post.featuredImage}
					alt={post.title}
					class="mx-auto aspect-video h-auto w-full object-cover"
				/>
			{/if}
			<p class="description">
				{post.excerpt} <a href="{base}/blog/{post.slug}" title={post.slug}>weiterlesen</a>
			</p>
		</article>
	{/each}
	<nav aria-label="Blognavigation" >
		<Paginator bind:settings={paginationSettings} showNumerals amountText="Einträge" buttonClasses="btn btn-xl" active="variant-filled-secondary"/>
	</nav>
</Container>
