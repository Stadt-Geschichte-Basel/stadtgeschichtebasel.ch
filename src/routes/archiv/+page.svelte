<script>
	import Container from '$lib/components/Container.svelte';
	import pages from '$lib/data/archive.json';
</script>

<Container>
	<h1>Archiv</h1>
	<p>Hier finden Sie alle Beiträge, die bisher auf dieser Seite erschienen sind.</p>
	<ul class="posts">
		{#each pages as { url }}
			<li class="post">
				<a href={url} class="title">{url.replace('/index/', '')}</a>
			</li>
		{/each}
	</ul>
</Container>
