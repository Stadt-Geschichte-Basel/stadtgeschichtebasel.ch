<script>
	import Container from '$lib/components/Container.svelte';
	import Head from '$lib/components/Head.svelte';
	import pages from '$lib/data/archive.json';
</script>

<Head
	title="Archiv | Hier finden Sie alle Beiträge, die auf der alten Website veröffentlicht wurden."
	jsonLdDataType="Article"
	date="2023-09-01"
	modified="2023-09-01"
	excerpt="Archiv der alten Website der Basler Geschichte. Hier finden Sie alle Beiträge, die auf der alten Website veröffentlicht wurden."
/>

<Container>
	<h1>Archiv</h1>
	<p>Hier finden Sie alle Beiträge, die auf der alten Website veröffentlicht wurden.</p>
	<ul class="posts">
		{#each pages as { url }}
			<li class="post">
				<a href={url} class="title">{url.replace('/index/', '')}</a>
			</li>
		{/each}
	</ul>
</Container>
