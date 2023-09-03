<script>
	import Container from '$lib/components/Container.svelte';
	/** @type {import('./$types').PageData} */
	export let data;
	const events = data.events.filter(({ startDate }) => new Date(startDate) > new Date())
	events.forEach((date) => {
		const startDate = new Date(date.startDate);
		const endDate = new Date(date.endDate);
		date.startDate = startDate.toLocaleDateString('de-CH');
		date.endDate = endDate.toLocaleDateString('de-CH');
	});
	const exhibitions = data.exhibitions;
	import { Paginator } from '@skeletonlabs/skeleton';
	let paginationSettings = {
		page: 0,
		limit: 10,
		size: events.length,
		amounts: [10, 25, 50, 100]
	};

	$: paginatedEvents = events.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);
</script>

<Container>
	<h1>Agenda</h1>
	<h2>Veranstaltungen</h2>
	<ul>
		{#each paginatedEvents as { owner, title, shortDescription, originUrl, startDate, startTime, endTime }}
			<li>
				<hgroup>
					<h3>{owner}: {title}</h3>
					<p>
						{startDate} {#if startTime}
							({startTime} {#if endTime}- {endTime}{/if}){/if}
					</p>
				</hgroup>
				<p>{shortDescription} <a href={originUrl}>Mehr Infos</a></p>
			</li>
		{/each}
		<Paginator bind:settings={paginationSettings} showNumerals amountText="Veranstaltungen" />
	</ul>
	<h2>Dauerausstellungen</h2>
	<ul>
		{#each exhibitions as { owner, title, shortDescription, longDescription, originUrl }}
			<li>
				<h3>{owner}: {title}</h3>
				<p>
					{#if longDescription}
						{longDescription}
					{:else}
						{#if shortDescription}
							{shortDescription}
						{/if}
					{/if}
					<a href={originUrl}>Mehr Infos</a>
				</p>
			</li>
		{/each}
	</ul>
</Container>
