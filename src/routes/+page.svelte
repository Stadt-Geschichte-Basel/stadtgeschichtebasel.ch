<script>
    import * as config from '$lib/config';
	import Container from '$lib/components/Container.svelte';
	/** @type {import('./$types').PageData} */
	export let data;
    import PostList from '$lib/components/PostList.svelte';
    const today = new Date();
    const events = data.events.filter(({ startDate }) => new Date(startDate) > today).slice(0, 3);
	events.forEach((event) => {
		event.startDate = new Date(event.startDate);
		event.endDate = new Date(event.endDate);
		event.localizedStartDate = event.startDate.toLocaleDateString('de-CH');
		event.localizedEndDate = event.endDate.toLocaleDateString('de-CH');
	});
</script>

<Container>
	<h1>{config.subtitle}</h1>
    <p>
        Tbd
    </p>
    <h2>Was Sie auf unserem Portal finden</h2>
    <p>
        Tbd
    </p>
    <h2>Neuste Beiträge</h2>
    <PostList posts={data.posts} limit={2} showControls={false}/>
    <p>Für weitere Beiträge siehe <a href="/blog">
        Blog</a>.</p>
    <h2>Veranstaltungen</h2>
{#each events as event}
<article class="card mt-4">
    <hgroup class="card-header">
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
<p>Für weitere Veranstaltungen siehe <a href="/agenda">
    Agenda</a>.</p>
</Container>
