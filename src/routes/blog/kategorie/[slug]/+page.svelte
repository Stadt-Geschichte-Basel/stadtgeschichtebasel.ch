<script>
	import Container from '$lib/components/Container.svelte';
	import Post from '$lib/components/Post.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>Kategorie: {data.slug}</title>
</svelte:head>

<Container>
	<h1>Kategorie: {data.slug}</h1>

	{#each data.posts as post}
		<Post {post} />
	{/each}
</Container>
