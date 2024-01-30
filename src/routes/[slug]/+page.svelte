<script>
	import Container from '$lib/components/Container.svelte';
	import Head from '$lib/components/Head.svelte';
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<Head
	title={data.meta.title}
	date={data.meta.date}
	modified={data.meta.modified}
	excerpt={data.meta.excerpt}
	jsonLdDataType="Article"
/>

<Container>
	<h1>{data.meta.title}</h1>

	<svelte:component this={data.content} />
</Container>
