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

	<h2>Mitwirkende</h2>

	<p>
		Die folgenden Personen haben zum Quellcode von {config.title} beigetragen:
	</p>
	<ul class="grid grid-cols-2 gap-4">
		{#each data.contributors as contributor}
			<li class="flex items-center space-x-2">
				<div class="mask mask-hexagon w-16">
					<img src={contributor.avatar_url} alt="Avatar of {contributor.login}" />
				</div>
				<div class="text-lg font-extrabold">
					<a href={contributor.html_url}>{contributor.login}</a>
				</div>
			</li>
		{/each}
	</ul>
	<p>
		Diese <a href="https://github.com/{config.githubHandle}/{config.githubRepo}/graphs/contributors"
			>Liste</a
		> wurde automatisch generiert. Co-authored Commits sind nicht berücksichtigt.
	</p>

	<h2>Technische Details</h2>

	<p>
		{config.title} wurde mit <a href="https://kit.svelte.dev/">SvelteKit</a>,
		<a href="https://www.skeleton.dev/">Skeleton</a>
		und vielen
		<a href="https://github.com/{config.githubHandle}/{config.githubRepo}/blob/main/package.json"
			>anderen Libraries</a
		>
		erstellt. Das Projekt ist Open Source (<a
			href="https://github.com/{config.githubHandle}/{config.githubRepo}/blob/main/LICENSE.md"
			>AGPL-3.0-Lizenz</a
		>) und der Quellcode ist auf
		<a href="https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch">GitHub</a>
		verfügbar.
	</p>
</Container>
