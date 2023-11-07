<script>
	import * as config from '$lib/config';
	import { base } from '$app/paths';
	import Container from '$lib/components/Container.svelte';
	import Post from '$lib/components/Post.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	const posts = data.posts.slice(0, 2)

	const today = new Date();

	function processEvent(event) {
		const startDate = new Date(event.startDate);
		const endDate = new Date(event.endDate);
		return {
			...event,
			startDate,
			endDate,
			localizedStartDate: startDate.toLocaleDateString('de-CH'),
			localizedEndDate: endDate.toLocaleDateString('de-CH')
		};
	}

	const events = data.events
		.filter(({ startDate }) => new Date(startDate) > today)
		.slice(0, 3)
		.map(processEvent);
</script>

<Container>
	<h1>{config.subtitle}</h1>
	<p>
		Die Webseite "Stadt.Geschichte.Basel" bietet einen tiefen Einblick in die facettenreiche
		Geschichte von Basel durch <a href="{base}/meilensteine#bände" data-sveltekit-reload
			>neun Einzelbände und einen Überblicksband</a
		>. Was sie besonders macht, ist der öffentliche Zugang zu
		<a href="{base}/meilensteine#forschungsdaten" data-sveltekit-reload>Forschungsdaten</a>, präsentiert als
		<a href="{base}/meilensteine#data-stories" data-sveltekit-reload>Data Stories</a>. Plattform und <a href="{base}/meilensteine#vermittlung" data-sveltekit-reload>Vermittlungsangebote</a> sprechen ein breites
		Publikum an, von Geschichtsbegeisterten über Studierende bis Forschende, und laden dazu ein,
		Basels Geschichte auf innovative, datengetriebene Weise zu erkunden.
	</p>
	<h2>Neuste Beiträge</h2>
	{#each posts as post}
		<Post post={post} />
	{/each}
	<p>Für weitere Beiträge siehe <a href="{base}/blog">Blog</a>.</p>
	<h2>Veranstaltungen</h2>
	{#each events as event}
		<article class="card mt-4 px-4">
			<hgroup class="m-0">
				<h3>{event.title} ({event.owner})</h3>
				<h4>
					📅 <time datetime={event.localizedEndDate}>{event.localizedStartDate}</time>
					{#if event.startTime}
						🕒 <time>{event.startTime}</time>
						{#if event.endTime}- <time>{event.endTime}</time>{/if}
					{/if}
				</h4>
			</hgroup>
			<p class="card-footer">
				{event.shortDescription} <a href={event.originUrl}>Mehr Infos</a>
			</p>
		</article>
	{/each}
	<p>Für weitere Veranstaltungen siehe <a href="{base}/agenda"> Agenda</a>.</p>
</Container>
