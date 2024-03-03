<script>
	import Container from '$lib/components/Container.svelte';
	import Post from '$lib/components/Post.svelte';
	import PostNav from '$lib/components/PostNav.svelte';

	import Head from '$lib/components/Head.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	const limit = 5;
	const page = 1;
	const lastPage = Math.ceil(data.posts.length / limit);
	const start = 0;
	const paginatedPosts = data.posts.slice(start, limit);
</script>

<Head title="Blog | Spannendes aus der Basler Geschichte" />

<Container>
	<h1>Blog</h1>
	<p>
		Unser Blog bietet Ihnen spannende Einblicke in die Welt der Basler Geschichte sowie
		Veranstaltungshinweise.
	</p>
	<div class="space-y-4">
		{#each paginatedPosts as post}
			<Post {post} />
		{/each}
	</div>
	<PostNav {page} {lastPage} />
</Container>
