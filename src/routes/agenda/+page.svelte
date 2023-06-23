<script>
	export let data;
	const activities = data.filteredActivities;
	// console.log(activities);
</script>

<article class="container space-y-4 p-10">
	<h1>Agenda</h1>
	<h2>Ausstellungen</h2>
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
		<!-- Fügen Sie weitere Veranstaltungen nach Bedarf hinzu -->
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
		<!-- Fügen Sie weitere Veranstaltungen nach Bedarf hinzu -->
	</ul>
	<h2>Activities</h2>
	<ul>
		{#each activities as { owner, dauerausstellung, title, shortDescription, originUrl, dates }}
			<li>
				<a href={originUrl}><b>{title}</b> {shortDescription}</a>
			</li>
		{/each}
	</ul>
</article>
