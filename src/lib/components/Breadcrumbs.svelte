<script>
	import { page } from '$app/stores';
</script>

<nav class="text-token flex justify-center p-4 " aria-label="Breadcrumbs">
	<ol class="breadcrumb">
		<li class="crumb"><a class="anchor" href="/">Blog</a></li>
		<li class="crumb-separator" aria-hidden="true">/</li>
		<li>
			<a class="anchor" href={$page.url.pathname} aria-current="page" title={$page.data.meta.title}>Aktueller Eintrag</a>
		</li>
	</ol>
</nav>

