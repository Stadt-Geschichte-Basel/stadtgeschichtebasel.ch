<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<section class="container space-y-4 p-10">
	<h1>Archiv</h1>
	<ul class="posts">
		{#each data.urls as url}
			<li class="post">
				<a href=".{url}" class="title">{url}</a>
			</li>
		{/each}
	</ul>
</section>