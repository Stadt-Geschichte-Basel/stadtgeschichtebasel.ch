<script>
	export let data;
	// FIXME hack to replace numbers with slugs
	const regex = /https:\/\/sgb\.hypotheses\.org\/\d+/g;
	data.posts.forEach((post) => {
		post.excerpt.rendered = post.excerpt.rendered.replace(regex, `/blog/${post.slug}`);
	});
</script>

<div class="container space-y-4 p-10">
	<!-- <div class="container prose mx-auto p-2 xl:prose-xl lg:p-4"> -->
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
