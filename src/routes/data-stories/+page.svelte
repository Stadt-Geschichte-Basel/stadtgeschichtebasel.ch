<script>
	import Container from '$lib/components/Container.svelte';
	import Head from '$lib/components/Head.svelte';
	import data from '$lib/data/datastories.json';

	const whatIsADataStory =
		'Data Storytelling ist eine innovative Methode, bei der erzählerische Elemente und Daten  miteinander kombiniert werden, um komplexe Informationen und Forschungsergebnisse in einer  zugänglichen und ansprechenden digitalen Form zu präsentieren. Im Kontext von  Stadt.Geschichte.Basel nutzen Autor*innen und Autoren-Kollektive diese Technik, um Geschichten  und Forschungsdaten aus dem Projekt aufzubereiten und so die faszinierende Historie von Basel  auf neue und spannende Weise zu vermitteln.';

	function toLocaleDateString(date) {
		return new Date(date).toLocaleDateString('de-CH');
	}
</script>

<Head
	title="Data Stories | Hier finden Sie alle Data Stories"
	description={whatIsADataStory}
	jsonLdDataType="Article"
/>

<Container>
	<h1>Data Stories</h1>
	<p>Wir bieten Ihnen folgende Data Stories:</p>
	<ul class="posts">
		{#each data as { title, slug, description, created }}
			<li class="post">
				<p>
					<a href="/data-stories/{slug}" class="title">{title}</a>
					{description} (erstellt am {toLocaleDateString(created)})
				</p>
			</li>
		{/each}
		<h2>Was ist eine Datastory?</h2>
		<p>
			{whatIsADataStory}
		</p>
	</ul></Container
>
