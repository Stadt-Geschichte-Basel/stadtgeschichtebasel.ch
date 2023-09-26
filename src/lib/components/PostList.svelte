<script>
	import { base } from '$app/paths';
	import { Paginator } from '@skeletonlabs/skeleton';

	export let posts;
	export let limit = 5;
	export let showControls = true;

	let paginationSettings = {
		page: 0,
		limit: limit,
		size: posts.length,
		amounts: [5, 10]
	};

	$: paginatedPosts = posts.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);
</script>

{#if showControls}
	<nav aria-label="Blognavigation">
		<Paginator
			bind:settings={paginationSettings}
			showNumerals
			amountText="Einträge"
			buttonClasses="btn btn-xl"
			active="variant-filled-secondary"
			select="hidden"
			labelFirst="Erste Seite"
			labelLast="Letzte Seite"
			labelNext="Nächste Seite"
			labelPrevious="Vorherige Seite"
		/>
	</nav>
{/if}

{#each paginatedPosts as post}
	<div class="card overflow-hidden mt-4">
		<header>
			<img
				src={post.featuredImage}
				class="aspect-[21/9] w-full bg-black/50 object-cover"
				alt={post.title}
			/>
		</header>
		<div>
			<h2>
				<a
					href="{base}/blog/{post.slug}"
					class="font-bold no-underline hover:underline"
					title={post.slug}>{post.title}</a
				>
			</h2>
			<article>
				<p>
					{post.excerpt} <a href="{base}/blog/{post.slug}" title={post.slug}>weiterlesen</a>
				</p>
			</article>
		</div>

		<footer class="flex items-center justify-start space-x-4 p-4">
			<div class="flex flex-auto items-center justify-between">
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
{/each}
{#if showControls}
	<nav aria-label="Blognavigation" class="mt-4">
		<Paginator
			bind:settings={paginationSettings}
			showNumerals
			amountText="Einträge"
			buttonClasses="btn btn-xl"
			active="variant-filled-secondary"
			select="hidden"
			labelFirst="Erste Seite"
			labelLast="Letzte Seite"
			labelNext="Nächste Seite"
			labelPrevious="Vorherige Seite"
		/>
	</nav>
{/if}