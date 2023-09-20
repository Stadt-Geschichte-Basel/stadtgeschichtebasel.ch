<script>
    import { base } from '$app/paths';
	import Container from '$lib/components/Container.svelte';
	/** @type {import('./$types').PageData} */
	export let data;
    import PostList from '$lib/components/PostList.svelte';
</script>

<Container>
	<h1>Wir schreiben Basler Geschichten</h1>
    <p>
        Tbd
    </p>
    <h2>Was Sie auf unserem Portal finden</h2>
    <p>
        Tbd
    </p>
    <h2>Unsere neusten Beiträge</h2>
    <PostList posts={data.posts} limit={1} showControls={false}/>
</Container>
