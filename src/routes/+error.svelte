<script>
	import { page } from '$app/stores';
</script>

{#if $page.error}
	<h1>{$page.status} {$page.error.message}</h1>
{:else}
	<h1>{$page.status}</h1>
{/if}

<p>Bitte überprüfen Sie die URL oder navigieren Sie zurück zur <a href="/">Startseite</a>.</p>
