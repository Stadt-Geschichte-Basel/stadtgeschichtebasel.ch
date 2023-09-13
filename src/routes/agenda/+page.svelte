<script>
	import Container from '$lib/components/Container.svelte';
	/** @type {import('./$types').PageData} */
	export let data;
	const events = data.events.filter(({ startDate }) => new Date(startDate) > new Date());
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
		limit: 5,
		size: events.length,
		amounts: [5, 10]
	};

	$: paginatedEvents = events.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);
</script>

<Container>
	<h1>Agenda</h1>
	<section>
		<h2>Veranstaltungen</h2>

		{#each paginatedEvents as event}
			<article class="card">
				<h3 class="card-header">{event.owner}: {event.title}</h3>

					<p class="card-footer">
						<time datetime={event.startDate}>{event.startDate}</time>
						{#if event.startTime}
							(<time>{event.startTime}</time>
							{#if event.endTime}- <time>{event.endTime}</time>{/if})
						{/if}
						{event.shortDescription} <a href={event.originUrl}>Mehr Infos</a>
					</p>
	
			</article>
		{/each}
		<nav aria-label="Veranstaltungsnavigation">
			<Paginator bind:settings={paginationSettings} showNumerals amountText="Veranstaltungen" />
		</nav>
	</section>
	<section>
		<h2>Dauerausstellungen</h2>

		{#each exhibitions as exhibition}
		<article class="card">
			<h3 class="card-header">{exhibition.owner}: {exhibition.title}</h3>
				<p class="card-footer">
					{#if exhibition.longDescription}
						{exhibition.longDescription}
					{:else if exhibition.shortDescription}
						{exhibition.shortDescription}
					{/if}
					<a href={exhibition.originUrl}>Mehr Infos</a>
				</p>
			</article>
		{/each}
	</section>
	<section>
		<h2>Agendabasel.ch</h2>
		<p>
			Alle Daten auf dieser Seite stammen von <a href="https://agendabasel.ch">agendabasel.ch</a>
			und werden der Stiftung Stadt.Geschichte.Basel im Rahmen einer Kooperation kostenlos zur Verfügung
			gestellt. Falls Sie eine Veranstaltung oder Ausstellung auf Stadt.Geschichte.Basel publizieren
			möchten, wenden Sie sich bitte direkt an agendabasel.ch oder an
			<a href="mailto:vermittlung@stadtgeschichtebasel.ch">vermittlung@stadtgeschichtebasel.ch</a>.
			Die Stiftung Stadt.Geschichte.Basel übernimmt keine Verantwortung für die Richtigkeit der
			Daten.
		</p>
	</section>
</Container>
