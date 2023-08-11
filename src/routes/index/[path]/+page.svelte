<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<!-- SEO -->
<svelte:head>
	<title>Wir sind umgezogen</title>
	<meta property="og:type" content="article" />
	<!-- <meta property="og:title" content={data.meta.title} /> -->
</svelte:head>

<!-- TODO if you change [path] to [...path] it cannot be prerendered anymore -->

<article class="container space-y-4 p-10">
	<h1>Wir sind umgezogen</h1>
	<p>
		Eine archivierte Version dieser Seite finden Sie <a
			href="https://web.archive.org/https://www.stadtgeschichtebasel.ch/{data.url}"
			>hier</a
		>.
	</p>
</article>

<iframe
	src="https://web.archive.org/https://www.stadtgeschichtebasel.ch/{data.url}"
	class="w-full h-96"
	frameborder="0"
	title="Archive.org"
></iframe>
