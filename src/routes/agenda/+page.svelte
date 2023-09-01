<script>
	/** @type {import('./$types').PageData} */
	export let data;
	const activities = data.activities;
</script>

<article class="container space-y-4 p-10 prose">
	<h1>Agenda</h1>
	<!-- <h2>Ausstellungen</h2>
	<ul>
		<li>
			<h3>Veranstaltung 1: Ausstellung</h3>
			<p>Datum: <time datetime="2023-06-10">10. Juni 2023</time></p>
			<p>Ort: Kunstmuseum</p>
			<p>Beschreibung: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
		</li>
		<li>
			<h3>Veranstaltung 2: Ausstellung</h3>
			<p>Datum: <time datetime="2023-06-15">15. Juni 2023</time></p>
			<p>Ort: Historisches Museum</p>
			<p>Beschreibung: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
		</li>
	</ul>
	<h2>Veranstaltungen</h2>
	<ul>
		<li>
			<h3>Veranstaltung 1: Vernissage</h3>
			<p>Datum: <time datetime="2023-06-10">10. Juni 2023</time></p>
			<p>Ort: Kunstmuseum</p>
			<p>Beschreibung: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
		</li>
		<li>
			<h3>Veranstaltung 2: Konzert</h3>
			<p>Datum: <time datetime="2023-06-15">15. Juni 2023</time></p>
			<p>Ort: Konzerthalle</p>
			<p>Beschreibung: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
		</li>
	</ul> -->
	<!-- <ul>
		{#each activities as { owner, dauerausstellung, title, shortDescription, originUrl, dates }}
			<li>
				<a href={originUrl}><b>{title}</b> {shortDescription}</a>
			</li>
		{/each}
	</ul> -->
	<ul>
		{#each activities as activity (activity.title)}
			<li class="">
				<p>
					{activity.title}@{activity.owner}: {activity.shortDescription}
					<a href={activity.originUrl}>Mehr Infos</a>
					<br />
					{#each activity.dates as date (date.startDate)}
						{#if date.endDate}
							{date.startDate} - {date.endDate}
						{:else}
							{date.startDate}
						{/if}
						{#if date.startTime}
							{#if date.endTime}
								{date.startTime} - {date.endTime}
							{:else}
								{date.startTime}
							{/if}
						{/if}
						{#if date.endTime}
							{date.endTime}
						{/if}
					{/each}
				</p>
			</li>
		{/each}
	</ul>
</article>
