<script>
	import Container from '$lib/components/Container.svelte';
	import PostList from '$lib/components/PostList.svelte';


	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>Kategorie: {data.slug}</title>
</svelte:head>

<Container>
	<h1>Kategorie: {data.slug}</h1>

	<PostList posts={data.posts} />
</Container>
