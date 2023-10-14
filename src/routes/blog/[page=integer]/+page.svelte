<script>
	import Container from '$lib/components/Container.svelte';
	import * as config from '$lib/config';
	import Post from '$lib/components/Post.svelte';
	import PostNav from '$lib/components/PostNav.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	const limit = 5;
	const lastPage = Math.ceil(data.posts.length / limit);
	const page = parseInt(data.page) <= lastPage ? parseInt(data.page) : 1;
	let start;
	$: start = (page - 1) * limit;
	let end;
	$: end = start + limit;
	$: paginatedPosts = data.posts.slice(start, end);
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<Container>
	<h1>Blog</h1>
	{#each paginatedPosts as post}
		<Post {post} />
	{/each}
	<PostNav {page} {lastPage} />
</Container>
