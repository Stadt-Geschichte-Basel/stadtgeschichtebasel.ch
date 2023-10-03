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
		Unser Blog bietet Ihnen spannende Einblicke in die Welt der Basler Geschichte sowie
		Veranstaltungshinweise.
	</p>

	<PostList posts={data.posts} />
</Container>
