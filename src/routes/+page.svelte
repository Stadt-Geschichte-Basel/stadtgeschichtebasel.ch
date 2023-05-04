<script>
	export let data;
</script>

<div class="container prose mx-auto p-2 xl:prose-xl lg:p-4">
	<h1>Blog</h1>

	{#each data.posts as post}
		<article>
			<h2>
				<a href={`/blog/${post.slug}`}>{post.title.rendered}</a>
			</h2>
			{@html post.excerpt.rendered}
		</article>
	{/each}
</div>
