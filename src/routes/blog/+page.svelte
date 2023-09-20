<script>
	import Container from '$lib/components/Container.svelte';
	import * as config from '$lib/config';
	import PostList from '$lib/components/PostList.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<Container>
	<h1>Blog</h1>

	<p>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer blandit egestas lorem, sit amet
		interdum purus finibus eget.
	</p>

	<PostList posts={data.posts} />
</Container>
