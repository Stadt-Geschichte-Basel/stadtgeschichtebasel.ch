<script>
	import { base } from '$app/paths';
    export let page
    export let lastPage
</script>
<nav aria-label="Blognavigation" class="mt-4 btn-group variant-filled flex justify-between">
    {#if page > 1}
        <a href="{base}/blog/{page - 1}" class="btn btn-xl" rel="prev" data-sveltekit-reload>Vorherige Seite</a>
    {/if}
    <div>
        <span class="btn disabled">Seite {page} von {lastPage}</span>
    </div> <!-- Empty div to maintain space between -->
    {#if page < lastPage}
        <a href="{base}/blog/{page + 1}" class="btn btn-xl" rel="next" data-sveltekit-reload>Nächste Seite</a>
    {/if}
</nav>