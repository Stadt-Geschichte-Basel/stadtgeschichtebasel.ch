<script>
	import Container from '$lib/components/Container.svelte';
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>Wir sind umgezogen</title>
	<meta property="og:type" content="article" />
</svelte:head>

<Container>
	<h1>Wir sind umgezogen</h1>
	<p>
		Eine archivierte Version dieser Seite finden Sie <a
			href="https://web.archive.org/web/https://www.stadtgeschichtebasel.ch/index/{data.url}"
			>hier</a
		>.
	</p>
</Container>

<iframe
	src="https://web.archive.org/web/https://www.stadtgeschichtebasel.ch/index/{data.url}"
	class="w-full h-96"
	frameborder="0"
	title="Archive.org"
></iframe>
