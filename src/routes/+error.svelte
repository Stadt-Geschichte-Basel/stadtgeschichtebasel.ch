<script>
	import Container from '$lib/components/Container.svelte';
	import { page } from '$app/stores';

	import Head from '$lib/components/Head.svelte';
	import * as config from '$lib/config';
</script>

<Head title="Seite nicht gefunden" />

<svelte:head>
	<script>
		window.plausible =
			window.plausible ||
			function () {
				(window.plausible.q = window.plausible.q || []).push(arguments);
			};
	</script>
</svelte:head>

{#if $page.error}
	<h1>{$page.status} {$page.error.message}</h1>
{:else}
	<h1>{$page.status}</h1>
{/if}

<Container>
	{#if $page.error}
		{#if $page.status === 404}
			<h1>Leider konnten wir die Seite nicht finden</h1>
		{:else}
			<h1>{$page.status} {$page.error.message}</h1>
		{/if}
	{:else}
		<h1>{$page.status}</h1>
	{/if}

	<p>
		Bitte melden Sie uns den Fehler per E-Mail an
		<a href="mailto:{config.email}">{config.email}</a>.
	</p>
	<h2>Können wir Ihnen weiterhelfen?</h2>
	<ul>
		<li>
			Unter <a href="/projekt">Projekt</a> erfahren Sie mehr über {config.title}.
		</li>
		<li>
			Die <a href="/">Startseite</a> bietet einen Überblick über diese Webseite.
		</li>
		<li>In der <a href="/agenda">Agenda</a> finden Sie alle Veranstaltungen.</li>
		<li>Im <a href="/blog">Blog</a> finden Sie Beiträge zur Geschichte Basels.</li>
	</ul>
</Container>
