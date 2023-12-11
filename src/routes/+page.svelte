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
		Geschichte von Basel durch <a href="{base}/meilensteine#bände" data-sveltekit-reload
			>neun Einzelbände und einen Überblicksband</a
		>. Was sie besonders macht, ist der öffentliche Zugang zu
		<a href="{base}/meilensteine#forschungsdaten" data-sveltekit-reload>Forschungsdaten</a>,
		präsentiert als
		<a href="{base}/meilensteine#data-stories" data-sveltekit-reload>Data Stories</a>. Plattform und
		<a href="{base}/meilensteine#vermittlung" data-sveltekit-reload>Vermittlungsangebote</a> sprechen
		ein breites Publikum an, von Geschichtsbegeisterten über Studierende bis Forschende, und laden dazu
		ein, Basels Geschichte auf innovative, datengetriebene Weise zu erkunden.
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
</Container>
