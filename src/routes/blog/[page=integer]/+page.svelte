<script>
	import Container from '$lib/components/Container.svelte';
	import Head from '$lib/components/Head.svelte';
	import Post from '$lib/components/Post.svelte';
	import PostNav from '$lib/components/PostNav.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	/**
	 * The limit of posts per page
	 * @type {number}
	 */
	const limit = 5;
	/**
	 * The last page
	 * @type {number}
	 */
	const lastPage = Math.ceil(data.posts.length / limit);
	/**
	 * The current page
	 * @type {number}
	 */
	let page = 1;
	$: page = parseInt(data.page) <= lastPage ? parseInt(data.page) : 1;
	/**
	 * The start index of the posts
	 * @type {number}
	 */
	let start;
	$: start = (page - 1) * limit;
	/**
	 * The end index of the posts
	 * @type {number}
	 */
	let end;
	$: end = start + limit;
	$: paginatedPosts = data.posts.slice(start, end);
</script>

<Head title="Blog | Spannendes aus der Basler Geschichte" />

<Container>
	<h1>Blog</h1>
	{#each paginatedPosts as post}
		<Post {post} />
	{/each}
	<PostNav {page} {lastPage} />
</Container>
