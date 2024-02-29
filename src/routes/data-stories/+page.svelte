<script>
	import Container from '$lib/components/Container.svelte';
	import Head from '$lib/components/Head.svelte';
	import data from '$lib/data/datastories.json';
</script>

<Head title="Data Stories | Hier finden Sie alle Data Stories" jsonLdDataType="Article" />

<Container>
	<h1>Data Stories</h1>
	<p>Hier finden Sie alle Data Stories.</p>
	<ul class="posts">
		{#each data as { title, slug }}
			<li class="post">
				<a href="/data-stories/{slug}" class="title">{title}</a>
			</li>
		{/each}
	</ul>
</Container>
