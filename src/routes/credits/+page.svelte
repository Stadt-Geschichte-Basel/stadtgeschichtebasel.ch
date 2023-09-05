<script>
	import Container from '$lib/components/Container.svelte';
	/** @type {import('./$types').PageData} */
	export let data;

	import * as config from '$lib/config';
</script>

<Container>
	<h1>Credits</h1>

	<h2>Mitwirkende</h2>

	<p>
		Die folgenden Personen haben zum Quellcode von {config.title} beigetragen:
	</p>
	<ul class="grid grid-cols-2 gap-4">
		{#each data.contributors as contributor}
			<div class="flex items-center space-x-2">
				<div class="mask mask-hexagon w-16">
					<img src={contributor.avatar_url} alt="Avatar of {contributor.login}" />
				</div>
				<div class="text-lg font-extrabold">
					<a href={contributor.html_url}>{contributor.login}</a>
				</div>
			</div>
		{/each}
	</ul>
	<p>
		Diese <a href="https://github.com/{config.githubHandle}/{config.githubRepo}/graphs/contributors"
			>Liste</a
		> wurde automatisch generiert.
	</p>

	<h2>Technische Details</h2>

	<p>
		{config.title} wurde mit <a href="https://kit.svelte.dev/">SvelteKit</a>,
		<a href="https://skeleton.skeletonlabs.com/">Skeleton-UI</a>
		und vielen
		<a href="https://github.com/{config.githubHandle}/{config.githubRepo}/blob/main/package.json"
			>anderen Libraries</a
		>
		erstellt. Das Projekt ist Open Source (<a
			href="https://github.com/{config.githubHandle}/{config.githubRepo}/blob/main/LICENSE"
			>AGPL-3.0-Lizenz</a
		>) und der Quellcode ist auf
		<a href="https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch">GitHub</a>
		verfügbar.
	</p>
</Container>
