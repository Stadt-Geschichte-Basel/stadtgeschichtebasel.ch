<script>
	import { base } from '$app/paths';
	import Container from '$lib/components/Container.svelte';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

	/** @type {import('./$types').PageData} */
	export let data;
	const today = new Date();
	const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
	const afterwards = new Date(today.getFullYear(), today.getMonth() + 2, 1);
	const monthNames = [
		'Januar',
		'Februar',
		'März',
		'April',
		'Mai',
		'Juni',
		'Juli',
		'August',
		'September',
		'Oktober',
		'November',
		'Dezember'
	];
	const thisMonthName = monthNames[today.getMonth()];
	const nextMonthName = monthNames[nextMonth.getMonth()];
	const afterwardsMonthName = monthNames[(nextMonth.getMonth() + 1) % 12];
	const events = data.events.filter(({ startDate }) => new Date(startDate) > today);
	const filterEventsByMonth = (events, month, year) =>
		events.filter(({ startDate }) => {
			const eventDate = new Date(startDate);
			return eventDate.getMonth() === month && eventDate.getFullYear() === year;
		});

	const processedEvents = events.map((event) => ({
		...event,
		startDate: new Date(event.startDate),
		endDate: new Date(event.endDate),
		localizedStartDate: new Date(event.startDate).toLocaleDateString('de-CH'),
		localizedEndDate: new Date(event.endDate).toLocaleDateString('de-CH')
	}));

	$: thisMonthEvents = filterEventsByMonth(processedEvents, today.getMonth(), today.getFullYear());
	$: nextMonthEvents = filterEventsByMonth(
		processedEvents,
		nextMonth.getMonth(),
		nextMonth.getFullYear()
	);
	$: afterwardsEvents = processedEvents.filter(({ startDate }) => new Date(startDate) > afterwards);
	$: filteredEvents = [thisMonthEvents, nextMonthEvents, afterwardsEvents][filter];
	const exhibitions = data.exhibitions;
	let agenda = 'events';
	$: filter = 0;
</script>

<Container>
	<h1>Agenda</h1>
	<p>
		In Zusammenarbeit mit unseren Ko&shy;ope&shy;rations&shy;partnern präsentieren wir Ihnen eine
		vielfältige Auswahl an Veranstaltungen, die im Raum Basel stattfinden.
	</p>
	<RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
		<RadioItem bind:group={agenda} name="justify" value={'events'}
			>Ver&shy;anstal&shy;tungen ({events.length})</RadioItem
		>
		<RadioItem bind:group={agenda} name="justify" value={'exhibitions'}
			>Dauer&shy;aus&shy;stellungen ({exhibitions.length})</RadioItem
		>
		<RadioItem bind:group={agenda} name="justify" value={'info'}>ⓘ</RadioItem>
	</RadioGroup>
	{#if agenda === 'events'}
		<RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
			<RadioItem bind:group={filter} name="justify" value={0}
				>{thisMonthName} ({thisMonthEvents.length})</RadioItem
			>
			<RadioItem bind:group={filter} name="justify" value={1}
				>{nextMonthName} ({nextMonthEvents.length})</RadioItem
			>
			<RadioItem bind:group={filter} name="justify" value={2}
				>{afterwardsMonthName} und später ({afterwardsEvents.length})</RadioItem
			>
		</RadioGroup>
		{#if filteredEvents.length > 0}
			{#each filteredEvents as event}
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
					<footer>
						{event.shortDescription} <a href={event.originUrl}>Mehr Infos</a>
					</footer>
				</article>
			{/each}
		{:else}
			<p>Keine Veranstaltungen gefunden.</p>
		{/if}
	{/if}
	{#if agenda === 'exhibitions'}
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
	{/if}
	{#if agenda === 'info'}
		<h2>Info</h2>
		<p>
			Alle Daten auf dieser Seite stammen von <a href="https://agendabasel.ch">agendabasel.ch</a>
			und werden der Stiftung <a href="{base}/ueber-uns">Stadt.Geschichte.Basel</a> im Rahmen einer
			Kooperation kostenlos zur Verfügung gestellt. Falls Sie eine Veranstaltung oder Ausstellung
			auf Stadt.Geschichte.Basel publizieren möchten, wenden Sie sich bitte direkt an agendabasel.ch
			oder an
			<a href="mailto:vermittlung@stadtgeschichtebasel.ch">vermittlung@stadtgeschichtebasel.ch</a>.
			Die Stiftung Stadt.Geschichte.Basel übernimmt keine Verantwortung für die Richtigkeit der
			Daten.
		</p>
	{/if}
</Container>
