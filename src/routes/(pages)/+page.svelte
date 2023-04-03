<script>
	export let data;
</script>

<h1>Blog</h1>
{#each data.posts as post}
	<h2>
		<a href={`/blog/${post.slug}`}>{post.title.rendered}</a>
	</h2>
	{@html post.excerpt.rendered}
{/each}
