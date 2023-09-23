<script>
	import { base } from '$app/paths';
	import Container from '$lib/components/Container.svelte';
	import { Paginator, Modal, RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
  
	/** @type {import('./$types').PageData} */
	export let data;
	const events = data.events.filter(({ startDate }) => new Date(startDate) > new Date());
	events.forEach((date) => {
	  const startDate = new Date(date.startDate);
	  const endDate = new Date(date.endDate);
	  date.startDate = startDate.toLocaleDateString('de-CH');
	  date.endDate = endDate.toLocaleDateString('de-CH');
	});
	const eventsToday = events.filter(({ startDate }) => {
	  const eventDate = new Date(startDate);
	  const today = new Date();
	  return eventDate.toDateString() === today.toDateString();
	});
	const eventsThisMonth = events.filter(({ startDate }) => {
	  const eventDate = new Date(startDate);
	  const today = new Date();
	  return eventDate.getMonth() === today.getMonth() && eventDate.getFullYear() === today.getFullYear();
	});
	const eventsThisYear = events.filter(({ startDate }) => {
	  const eventDate = new Date(startDate);
	  const today = new Date();
	  return eventDate.getFullYear() === today.getFullYear();
	});
	const exhibitions = data.exhibitions;
  
	let paginationSettings = {
		page: 0,
		limit: 5,
		size: events.length,
		amounts: [5, 10]
	};

	let agenda = "events";
	let filter = 3;
  

  $: filteredEvents = { 0: eventsToday, 1: eventsThisMonth, 2: eventsThisYear, 3: events }[filter];

	$: paginatedEvents = filteredEvents.slice(
	  paginationSettings.page * paginationSettings.limit,
	  (paginationSettings.page * paginationSettings.limit) + paginationSettings.limit
	);
  </script>

<Container>
	<h1>Agenda</h1>
	<p>
	  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer blandit egestas lorem, sit amet interdum purus finibus eget. 
	</p>
	<div class="btn-group">
	  <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
		<RadioItem bind:group={agenda} name="justify" value={"events"}>Veranstaltungen ({events.length})</RadioItem>
		<RadioItem bind:group={agenda} name="justify" value={"exhibitions"}
		>Dauerausstellungen ({exhibitions.length})</RadioItem>
		<RadioItem bind:group={agenda} name="justify" value={"info"}>ⓘ</RadioItem>
	  </RadioGroup>
	</div>
	{#if agenda === "events"}
	  <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
		<RadioItem bind:group={filter} name="justify" value={0}>Heute ({eventsToday.length})</RadioItem>
		<RadioItem bind:group={filter} name="justify" value={1}>Diesen Monat ({eventsThisMonth.length})</RadioItem>
		<RadioItem bind:group={filter} name="justify" value={2}>Dieses Jahr ({eventsThisYear.length})</RadioItem>
		<RadioItem bind:group={filter} name="justify" value={3}>Alle ({events.length})</RadioItem>
	  </RadioGroup>
	  {#if paginatedEvents.length > 0}
	  <nav aria-label="Veranstaltungsnavigation">
		<Paginator bind:settings={paginationSettings} showNumerals amountText="Veranstaltungen" select="hidden"/>
	  </nav>
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
		<Paginator bind:settings={paginationSettings} showNumerals amountText="Veranstaltungen" select="hidden"/>
	  </nav>
	  {:else}
	  	<p>Keine Veranstaltungen gefunden.</p>
	  {/if}
	{/if}
	{#if agenda === "exhibitions"}
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
	{#if agenda === "info"}
	  <p>
		
			Alle Daten auf dieser Seite stammen von <a href="https://agendabasel.ch">agendabasel.ch</a>
			und werden der Stiftung <a href="{base}/ueber-uns">Stadt.Geschichte.Basel</a> im Rahmen einer Kooperation kostenlos zur Verfügung
			gestellt. Falls Sie eine Veranstaltung oder Ausstellung auf Stadt.Geschichte.Basel publizieren
			möchten, wenden Sie sich bitte direkt an agendabasel.ch oder an
			<a href="mailto:vermittlung@stadtgeschichtebasel.ch">vermittlung@stadtgeschichtebasel.ch</a>.
			Die Stiftung Stadt.Geschichte.Basel übernimmt keine Verantwortung für die Richtigkeit der
			Daten.
		</p>
	{/if}
  </Container>
