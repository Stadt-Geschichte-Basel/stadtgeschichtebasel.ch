<script>
	import * as config from '$lib/config';
	import Head from '$lib/components/Head.svelte';
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<Head />

<iframe src={data.url} class="h-full w-full" frameborder="0" title={config.title}></iframe>
