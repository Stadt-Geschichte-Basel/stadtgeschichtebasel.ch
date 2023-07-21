<script>
	import { formatDate } from '$lib/utils/utilsNew.js';
	export let data;
</script>

<!-- Posts -->
<section>
	<ul class="posts">
		{#each data.posts as post}
			<li class="post">
				<a href={post.slug} class="title">{post.title}</a>
				<p class="date">{formatDate(post.date)}</p>
				<p class="excerpt">{post.excerpt}</p>
			</li>
		{/each}
	</ul>
</section>

<!-- TODO https://joyofcode.xyz/sveltekit-markdown-blog -->
<!-- TODO https://github.com/JonasKruckenberg/imagetools/blob/main/packages/vite/README.md#defaultdirectives -->
<!-- TODO https://github.com/n1kk/rehype-mdsvex-image-autoimport -->
