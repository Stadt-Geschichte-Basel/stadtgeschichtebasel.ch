<script>
	import { base } from '$app/paths';

	/**
	 * Represents a post.
	 * @typedef {Object} Post
	 * @property {string} title - The title of the post.
	 * @property {string} slug - The slug of the post.
	 * @property {string} excerpt - The excerpt of the post.
	 * @property {string} featuredImage - The featured image of the post.
	 * @property {string[]} categories - The categories of the post.
	 * @property {string} date - The date of the post.
	 * @property {string} content - The content of the post.
	 */

	/**
	 * The post to display.
	 * @type {Post}
	 */
	export let post;
</script>

<div class="card variant-ringed-primary mt-4 overflow-hidden" aria-label={post.title}>
	<header>
		<img src="{base}{post.featuredImage}" class="max-h-96 w-full object-contain" alt="" />
	</header>
	<div class="px-4">
		<h2 class="m-0">
			<a
				href="{base}/blog/{post.slug}"
				class="font-bold no-underline hover:underline"
				title={post.slug}
				aria-hidden="true"
				tabindex="-1">{post.title}</a
			>
		</h2>
		<article>
			<p>
				{post.excerpt}
				<a href="{base}/blog/{post.slug}" title={post.slug}>weiterlesen</a>
			</p>
		</article>
	</div>
	<footer class="flex items-center justify-start space-x-4 p-4">
		<div class="flex flex-auto items-center justify-between">
			{#each post.categories as category}
				<a
					class="variant-ghost badge bg-white text-primary-500 hover:bg-primary-500 hover:text-white"
					href="{base}/blog/kategorie/{category}">&num;{category}</a
				>
			{/each}
			<small>
				{new Date(post.date).toLocaleDateString('de-CH')}
			</small>
		</div>
	</footer>
</div>
