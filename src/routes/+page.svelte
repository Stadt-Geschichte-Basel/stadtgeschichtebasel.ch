<script lang="ts">
	import * as config from '$lib/config';

	export let data;
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

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


<div class="container space-y-4 p-10">
	<h1>Blog</h1>

	{#each data.posts as post}
		<article>
			<h2>
				<a href={`/blog/${post.slug}`}>{@html post.title}</a>
			</h2>
			<p class="date">{post.date}</p>
			<p class="description">{@html post.excerpt}</p>
		</article>
	{/each}
</div>
