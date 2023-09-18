<script>
	import Container from '$lib/components/Container.svelte';
	/** @type {import('./$types').PageData} */
	export let data;
	console.log(data);
</script>

<Container>
	<section>
		<h1>Archiv</h1>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer blandit egestas lorem, sit amet interdum purus finibus eget. 
		</p>
		<ul class="posts">
			{#each data.urls as url}
				<li class="post">
					<a href="index/{url}" class="title">{url}</a>
				</li>
			{/each}
		</ul>
	</section></Container
>
