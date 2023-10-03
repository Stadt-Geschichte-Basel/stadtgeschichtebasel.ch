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
		Wir freuen uns, Sie auf unserer neuen Online-Präsenz begrüssen zu dürfen. Unsere Webseite ist
		umgezogen und hat einen frischen Look erhalten, um Ihnen ein noch besseres Erlebnis zu bieten.
	</p>
	<p>
		Hier finden Sie alle Informationen, Ressourcen und Dienstleistungen, und wir werden regelmässig
		Updates und Neuigkeiten veröffentlichen, damit Sie stets auf dem Laufenden bleiben.
	</p>
	<p>
		Vielen Dank für Ihr Interesse an der neuen Stadtgeschichte. Wir hoffen,
		dass Sie unsere neue Webseite genauso schätzen wie wir, und stehen Ihnen gerne für Fragen und
		Anliegen zur Verfügung.
	</p>
	<p>
		Eine archivierte Version dieser Seite finden Sie <a
			href="https://web.archive.org/web/https://www.stadtgeschichtebasel.ch/index/{data.url}"
			>hier</a
		>.
	</p>
</Container>

<iframe
	src="https://web.archive.org/web/https://www.stadtgeschichtebasel.ch/index/{data.url}"
	class="h-96 w-full"
	frameborder="0"
	title="Archive.org"
></iframe>
