<script>
	import { base } from '$app/paths';
	export let page;
	export let lastPage;
</script>

<nav
	aria-label="Blogpost-Navigation, zeigt Seite {page} aus {lastPage}"
	class="variant-ghost btn-group mt-4 grid grid-cols-3 justify-items-stretch gap-4 text-center"
    data-sveltekit-preload-data
>
	<div>
		{#if page > 1}
			<a
				href="{base}/blog/{page - 1}"
				class="btn btn-xl"
				rel="prev"
				aria-label="Springe zur vorherigen Seite"
				data-sveltekit-reload>Vorherige Seite</a
			>
		{/if}
	</div>
	<div>
		<span class="disabled btn" aria-current="page">Seite {page} von {lastPage}</span>
	</div>
	<div>
		{#if page < lastPage}
			<a
				href="{base}/blog/{page + 1}"
				class="btn btn-xl"
				rel="next"
				aria-label="Springe zur nächsten Seite"
				data-sveltekit-reload>Nächste Seite</a
			>
		{/if}
	</div>
</nav>
