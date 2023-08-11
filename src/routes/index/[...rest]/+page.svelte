<script>
	import { page } from '$app/stores';
</script>

<!-- SEO -->
<svelte:head>
	<title>Wir sind umgezogen</title>
	<meta property="og:type" content="article" />
	<!-- <meta property="og:title" content={data.meta.title} /> -->
</svelte:head>

<article class="container space-y-4 p-10">
	<h1>Wir sind umgezogen</h1>
	<p>
		Falls die Seite archiviert wurde, finden Sie sie <a
			href="https://web.archive.org/https://www.stadtgeschichtebasel.ch/{$page.url.pathname}"
			>hier</a
		>.
	</p>
</article>

<iframe
	src="https://web.archive.org/https://www.stadtgeschichtebasel.ch/{$page.url.pathname}"
	class="w-full h-96"
	frameborder="0"
    title="Archive.org"
></iframe>
