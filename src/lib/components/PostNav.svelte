<script>
	/**
	 * The current page
	 * @type {number}
	 */
	export let page = 1;

	/**
	 * The last page
	 * @type {number}
	 */
	export let lastPage = 1;
</script>

<nav
	aria-label="Blogpost-Navigation, zeigt Seite {page} aus {lastPage}"
	class="variant-ringed-primary btn-group mt-4 grid grid-cols-3 justify-items-stretch text-center ring-2"
	data-sveltekit-preload-data
>
	<div class="group hover:bg-primary-500 hover:text-white">
		{#if page > 1}
			<a
				href="/blog/{page - 1}"
				class="btn btn-xl"
				rel="prev"
				aria-label="Springe zur vorherigen Seite"
			>
				<span class="sm:block md:hidden">Zurück</span>
				<span class="hidden md:block">Vorherige Seite</span></a
			>
		{/if}
	</div>
	<div>
		<span class="disabled btn sm:block md:hidden" aria-current="page">{page} / {lastPage}</span>
		<span class="disabled btn hidden md:block" aria-current="page">Seite {page} von {lastPage}</span
		>
	</div>
	<div class="group hover:bg-primary-500 hover:text-white">
		{#if page < lastPage}
			<a
				href="/blog/{page + 1}"
				class="btn btn-xl"
				rel="next"
				aria-label="Springe zur nächsten Seite"
			>
				<span class="sm:block md:hidden">Vor</span>
				<span class="hidden md:block">Nächste Seite</span>
			</a>
		{/if}
	</div>
</nav>
