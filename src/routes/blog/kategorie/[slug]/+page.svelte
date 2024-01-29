<script>
	import Container from '$lib/components/Container.svelte';
	import Head from '$lib/components/Head.svelte';
	import Post from '$lib/components/Post.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<Head title={`Kategorie: ${data.slug}`} />

<Container>
	<h1>Kategorie: {data.slug}</h1>

	{#each data.posts as post}
		<Post {post} />
	{/each}
</Container>
