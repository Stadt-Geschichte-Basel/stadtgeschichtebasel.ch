<!-- <script>
	export let data;
	let {
		html,
		meta: { date, title, readingTime }
	} = data;
</script>

<article class="flex flex-col flex-grow">
	<h1 class="font-bold mb-5 text-5xl">{title}</h1>
	<div class="">
		<p>{new Date(date).toDateString()}</p>
		<p class="mb-16">{readingTime.text}</p>
		<article class="all-prose">
			{@html html}
		</article>
	</div>
</article> -->

<script>
	export let data;
</script>

<h1>Posts</h1>
{#each data.posts as post (post.slug)}
	<h2>
		<a href={`/posts/${post.slug}`}>{post.title}</a>
	</h2>
{/each}
