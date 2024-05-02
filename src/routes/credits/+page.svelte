<script>
	import Container from '$lib/components/Container.svelte';
	import Head from '$lib/components/Head.svelte';
	/** @type {import('./$types').PageData} */
	export let data;

	import * as config from '$lib/config';
</script>

<Head title="Credits | Der Quellcode von stadtgeschichtebasel.ch ist Open Source" />

<Container>
	<h1>Credits</h1>

	<h2>Gestaltung</h2>

	<p>
		<a href="/">{config.domain}</a> wurde vom Team für Research Data Management und Public History entwickelt
		und gestaltet. Namentlich von
	</p>
	<ul>
		<li>Cristina Wildisen-Münch</li>
		<li>Moritz Mähr</li>
		<li>Moritz Twente</li>
		<li>Nico Görlich</li>
		<li>Noëlle Schnegg</li>
	</ul>

	<h2>Data Stories</h2>

	<p>
		Die folgenden Personen haben zu den auf {config.title} präsentierten
		<a href="/data-stories">Data Stories</a> beigetragen:
	</p>

	<ul>
		<li>
			<a href="/data-stories/das-kontrollbuero-und-die-wundermaschine"
				>Das Kontrollbüro und die Wundermaschine</a
			>: Cristina Wildisen-Münch, Nico Görlich, Moritz Mähr
		</li>
		<li>
			<a href="/data-stories/mit-bioarchaeologie-geschichte-schreiben"
				>Mit Biorarchäologie Geschichte schreiben</a
			>: Margaux L. C. Depaermentier
		</li>
		<li>
			<a href="/data-stories/das-juedische-basel-1850-1914">Das jüdische Basel 1850–1914</a>: Beni
			Pfister,
			<a href="https://kleiolab.ch/" rel="noopener nofollow" target="_blank">Jonas Schneider</a>,
			<a href="https://kleiolab.ch/" rel="noopener nofollow" target="_blank">David Knecht</a>
		</li>
	</ul>

	<h2>Code</h2>

	<p>
		Die folgenden Personen haben zum <a
			href="https://github.com/{config.githubHandle}/{config.githubRepo}/"
			rel="noopener nofollow"
			target="_blank">Quellcode</a
		>
		von {config.title} beigetragen:
	</p>
	<ul class="grid grid-cols-2 gap-4">
		{#each data.contributors as contributor}
			<li class="flex items-center space-x-2">
				<div class="mask mask-hexagon w-16">
					<img src={contributor.avatar_url} alt="Avatar of {contributor.login}" />
				</div>
				<div class="text-lg font-extrabold">
					<a href={contributor.html_url} rel="noopener nofollow" target="_blank"
						>{contributor.login}</a
					>
				</div>
			</li>
		{/each}
	</ul>
	<p>
		Diese <a
			href="https://github.com/{config.githubHandle}/{config.githubRepo}/graphs/contributors"
			rel="noopener nofollow"
			target="_blank">Liste</a
		> wurde automatisch generiert. Co-authored Commits sind nicht berücksichtigt.
	</p>

	<h2>Technische Details</h2>

	<p>
		{config.title} wurde mit <a href="https://kit.svelte.dev/">SvelteKit</a>,
		<a href="https://www.skeleton.dev/" rel="noopener nofollow" target="_blank">Skeleton</a>
		und vielen
		<a
			href="https://github.com/{config.githubHandle}/{config.githubRepo}/blob/main/package.json"
			rel="noopener nofollow"
			target="_blank">anderen Libraries</a
		>
		erstellt. Das Projekt ist Open Source (<a
			href="https://github.com/{config.githubHandle}/{config.githubRepo}/blob/main/LICENSE.md"
			rel="noopener nofollow"
			target="_blank">AGPL-3.0-Lizenz</a
		>) und der Quellcode ist auf
		<a
			href="https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch"
			rel="noopener nofollow"
			target="_blank">GitHub</a
		>
		verfügbar.
	</p>

	<p>
		Die Webseite wird über <a
			href="https://pages.cloudflare.com/"
			rel="noopener nofollow"
			target="_blank">Cloudflare Pages</a
		>
		ausgeliefert, die Inhalte unter
		<a href="https://sgb.hypotheses.org/" rel="noopener nofollow" target="_blank"
			>sgb.hypotheses.org</a
		>
		verwaltet und von
		<a href="https://hypotheses.org/" rel="noopener nofollow" target="_blank">Hypotheses</a> langzeitarchiviert.
	</p>
</Container>
