<script>
	import * as config from '$lib/config';
	import { Paginator } from '@skeletonlabs/skeleton';

	export let data;

	// PaginatorSettings
	let page = {
		offset: 0,
		limit: 10,
		size: data.posts.length,
		amounts: [10, 100]
	};

	$: paginatedPosts = data.posts.slice(
		page.offset * page.limit, // start
		page.offset * page.limit + page.limit // end
	);
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<div class="container space-y-4 p-10">
	<h1>Blog</h1>

	{#each paginatedPosts as post}
		<article>
			<h2>
				<a href={`/blog/${post.slug}`}>{@html post.title}</a>
			</h2>
			<p class="date">{post.date}</p>
			<p class="description">{@html post.excerpt}</p>
		</article>
	{/each}

	<Paginator bind:settings={page} showNumerals />
</div>

<!-- Posts -->
<!-- <section>
	<ul class="posts">
		{#each data.posts as post}
			<li class="post">
				<a href=/blog/{post.slug} class="title">{@html post.title}</a>
				<p class="date">{post.date}</p>
				<p class="description">{@html post.excerpt}</p>
			</li>
		{/each}
	</ul>
</section> -->
