<script>
	import * as config from '$lib/config';
	import { base } from '$app/paths';
	import Container from '$lib/components/Container.svelte';
	import Post from '$lib/components/Post.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	/**
	 * Represents a post.
	 * @typedef {Object} Post
	 * @property {string} title - The title of the post.
	 * @property {string} slug - The slug of the post.
	 * @property {string} excerpt - The excerpt of the post.
	 * @property {string} featuredImage - The featured image of the post.
	 * @property {string[]} categories - The categories of the post.
	 * @property {string} date - The date of the post.
	 * @property {string} content - The content of the post.
	 */

	/**
	 * The first two posts from the page data.
	 * @type {Post[]}
	 */
	const posts = data.posts.slice(0, 2);

	/**
	 * Today's date, used for filtering events.
	 * @type {Date}
	 */
	const today = new Date();

	/**
	 * Represents an event with date and time details.
	 * @typedef {Object} Event
	 * @property {string} owner - The owner of the event.
	 * @property {string} title - The title of the event.
	 * @property {string} shortDescription - The short description of the event.
	 * @property {string} longDescription - The long description of the event.
	 * @property {string} originUrl - The origin URL of the event.
	 * @property {string} startDate - The start date of the event.
	 * @property {string} endDate - The end date of the event.
	 * @property {string} startTime - The start time of the event.
	 * @property {string} endTime - The end time of the event.
	 * @property {string} ticketURL - The ticket URL of the event.
	 */

	/**
	 * Represents an event with date and time details, and additional localized date strings.
	 * @typedef {Object} ProcessedEvent
	 * @property {string} owner - The owner of the event.
	 * @property {string} title - The title of the event.
	 * @property {string} shortDescription - The short description of the event.
	 * @property {string} longDescription - The long description of the event.
	 * @property {string} originUrl - The origin URL of the event.
	 * @property {Date} startDate - The start date of the event.
	 * @property {Date} endDate - The end date of the event.
	 * @property {string} startTime - The start time of the event.
	 * @property {string} endTime - The end time of the event.
	 * @property {string} ticketURL - The ticket URL of the event.
	 * @property {string} localizedStartDate - The localized start date of the event.
	 * @property {string} localizedEndDate - The localized end date of the event.
	 */

	/**
	 * Processes an event to add localized date strings.
	 * @param {Event} event - The event object to process.
	 * @return {ProcessedEvent} The event object with added localized date strings.
	 */
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

	/**
	 * The upcoming events, limited to three, processed for display.
	 * @type {ProcessedEvent[]}
	 */
	const events = data.events
		.filter(({ startDate }) => new Date(startDate).getTime() > today.getTime())
		.slice(0, 3)
		.map(processEvent);
</script>

<Container>
	<h1>{config.subtitle}</h1>
	<p>
		Die Webseite "Stadt.Geschichte.Basel" bietet einen tiefen Einblick in die facettenreiche
		Geschichte von Basel durch <a href="{base}/baende">neun Einzelbände und einen Überblicksband</a
		>. Was sie besonders macht, ist der öffentliche Zugang zu
		<a href="{base}/#forschung">Forschungsdaten</a>, präsentiert als
		<a href="{base}/#data-stories">Data Stories</a>. Plattform und
		<a href="{base}/#vermittlung">Vermittlungsangebote</a> sprechen ein breites Publikum an, von Geschichtsbegeisterten
		über Studierende bis Forschende, und laden dazu ein, Basels Geschichte auf innovative, datengetriebene
		Weise zu erkunden.
	</p>

	<h2>Neuste Beiträge</h2>
	{#each posts as post}
		<Post {post} />
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

	<h2 id="data-stories">Data Stories</h2>

	<p>
		Data Storytelling ist eine innovative Methode, bei der erzählerische Elemente und Daten
		miteinander kombiniert werden, um komplexe Informationen und Forschungsergebnisse in einer
		zugänglichen und ansprechenden digitalen Form zu präsentieren. Im Kontext von
		Stadt.Geschichte.Basel nutzen Autor:innen und Autoren-Kollektive diese Technik, um Geschichten
		und Forschungsdaten aus dem Projekt aufzubereiten und so die faszinierende Historie von Basel
		auf neue und spannende Weise zu vermitteln.
	</p>

	<ul>
		<li>
			<a href="https://storymaps.arcgis.com/stories/6be823309a7b4254aa27b5486703b68b"
				>Das Kontrollbüro und die Wundermaschine: Wie Basel-Stadt in den 1960er Jahren das
				Einwohnermeldewesen digitalisierte</a
			>
		</li>
	</ul>

	<p>
		Das Beste daran ist, dass immer neue Stories hinzukommen, sodass die Erkundung der Basler
		Geschichte nie endet.
	</p>

	<h2 id="forschung">Forschungsdaten</h2>

	<p>
		Das Team Forschungsdatenmanagement entwickelt derzeit eine öffentlich zugängliche Plattform zur
		Bereitstellung von Quellen und historischen Forschungsdaten.
	</p>

	<p>
		Auf dieser Forschungsdatenplattform werden Sie demnächst eine Sammlung an Ressourcen zur
		Geschichte der Stadt Basel finden können. Die Plattform bietet direkten Zugang zu nachnutzbaren
		Quellen und Daten aus den Bänden. Die Aufbereitung der Objekte ermöglicht es, bandübergreifend
		Themen aus der Basler Geschichte aus verschiedenen Blickwinkeln auf einer Karte, entlang einer
		Zeitachse oder nach Inhalten verschlagwortet zu entdecken. Weiterhin werden wissenschaftliche
		Publikationen im Zusammenhang mit dem Forschungsprojekt sowie die Bibliographie mit sämtlicher
		in den Bänden zitierter Literatur gesammelt zugänglich sein.
	</p>

	<h2 id="vermittlung">Vermittlung</h2>

	<p>
		Für die Vermittlung der neuen Stadtgeschichte arbeitet Stadt.Geschichte.Basel mit verschiedenen
		Kooperationspartner:innen zusammen. Die Veranstaltungen finden Sie unter <a href="{base}/agenda"
			>Agenda</a
		>, die Kooperationspartner:innen unter <a href="{base}/partner">Orte</a>.
	</p>
</Container>
