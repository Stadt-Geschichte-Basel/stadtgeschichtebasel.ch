<script>
	import Container from '$lib/components/Container.svelte';
	/** @type {import('./$types').PageData} */
	export let data;
	const activities = data.activities;
	// Filter all activities that have a dauerausstellung property with the value 1
	const exhibitions = data.activities.filter((activity) => activity['dauerausstellung'] === '1');
	// Sort all exhibitions by owner
	exhibitions.sort((a, b) => a.owner.localeCompare(b.owner));
	// Filter all activities that have a dauerausstellung property with the value 0
	const events = data.activities.filter((activity) => activity['dauerausstellung'] === '0');
	console.log(events[0].dates);
	// Flatten the dates array, add all dates and properties (owner, title, shortDescription, originUrl) to a new array and sort them by startDate
	const dates = events.flatMap((activity) => activity.dates.map((date) => ({ ...date, owner: activity.owner, title: activity.title, shortDescription: activity.shortDescription, originUrl: activity.originUrl }))).sort((a, b) => a.startDate.localeCompare(b.startDate));
	// Filter out all dates that are in the past
	const futureDates = dates.filter((date) => new Date(date.startDate) > new Date());
	// convert all dates to de-CH format
	futureDates.forEach((date) => {
		const startDate = new Date(date.startDate);
		const endDate = new Date(date.endDate);
		date.startDate = startDate.toLocaleDateString('de-CH');
		date.endDate = endDate.toLocaleDateString('de-CH');
		date.startTime = startDate.toLocaleTimeString('de-CH');
		date.endTime = endDate.toLocaleTimeString('de-CH');
	});
	console.log(futureDates);
</script>

<Container>
	<h1>Agenda</h1>
	<h2>Veranstaltungen</h2>
	<ul>
		{#each futureDates as { owner, title, shortDescription, originUrl, startDate, startTime, endDate, endTime}}
		<li>
			<hgroup>
			  <h3>{owner}: {title}</h3>
			  <p>{startDate} ({startTime}) {#if endTime}- ({endTime}){/if}</p>
			</hgroup>
			<p>{shortDescription} <a href={originUrl}>Mehr Infos</a></p>
			</li>
		{/each}

		</ul>
	<h2>Dauerausstellungen</h2>
	<ul>
		{#each exhibitions as { owner, title, shortDescription, longDescription, originUrl }}
			<li>
				<h3>{owner}: {title}</h3>
				<p>{#if longDescription}
					{longDescription}
				{:else}
					{#if shortDescription}
						{shortDescription}
					{:else}
						
					{/if}
				{/if}
				<a href={originUrl}>Mehr Infos</a></p>
			</li>
		{/each}
	</ul>
</Container>
