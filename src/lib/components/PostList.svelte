<script>
	import { base } from '$app/paths';
	import { Paginator } from '@skeletonlabs/skeleton';

	export let posts;

	let paginationSettings = {
		page: 0,
		limit: 5,
		size: posts.length,
		amounts: [5, 10]
	};

	$: paginatedPosts = posts.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);
</script>

{#each paginatedPosts as post}
    <div class="card card-hover overflow-hidden">
	<!-- <a
		class="card card-hover overflow-hidden no-underline hover:underline"
		href="{base}/blog/{post.slug}"
		title={post.slug}
	> -->
		<header>
			<img
				src={post.featuredImage}
				class="aspect-[21/9] w-full bg-black/50 object-cover"
				alt={post.title}
			/>
		</header>
		<div>
			<!-- <div class="space-y-4 p-4"> -->
			<!-- <h6 class="h6" data-toc-ignore>Announcements</h6> -->
			<h2 class="h2">{post.title}</h2>
			<article>
				<p>
					{post.excerpt} <a href="{base}/blog/{post.slug}" title={post.slug}>weiterlesen</a>
				</p>
			</article>
		</div>

		<footer class="flex items-center justify-start space-x-4 p-4">
			<!-- <Avatar src={data.posts[0].featuredImage} width="w-8" /> -->
			<div class="flex flex-auto items-center justify-between">
				<!-- <h6 class="font-bold" data-toc-ignore>By Alex</h6> -->
				{#each post.categories as category}
					<a class="variant-filled badge" href="{base}/blog/kategorie/{category}">&num;{category}</a
					>
				{/each}
				<small>
					{#if post.modified}
						{new Date(post.modified).toLocaleDateString('de-CH')}
					{:else}
						{new Date(post.date).toLocaleDateString('de-CH')}
					{/if}
				</small>
			</div>
		</footer>
	<!-- </a> -->
</div>
	<hr class="opacity-50" />
	<!-- <article>
    <h2>
        <a
            href="{base}/blog/{post.slug}"
            class="font-bold no-underline hover:underline"
            title={post.slug}>{post.title}</a
        >
    </h2>

    {#if post.featuredImage}
        <img
            src={post.featuredImage}
            alt={post.title}
            class="mx-auto aspect-video h-auto w-full object-cover"
        />
    {/if}
    <p>
        {post.excerpt} <a href="{base}/blog/{post.slug}" title={post.slug}>weiterlesen</a>
    </p>
</article>
<hr /> -->
{/each}
<nav aria-label="Blognavigation">
	<Paginator
		bind:settings={paginationSettings}
		showNumerals
		amountText="Einträge"
		buttonClasses="btn btn-xl"
		active="variant-filled-secondary"
		select="hidden"
	/>
</nav>
