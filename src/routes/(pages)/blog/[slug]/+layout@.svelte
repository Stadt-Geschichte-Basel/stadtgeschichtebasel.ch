<script>
	import { page } from '$app/stores';
</script>

<ol class="breadcrumb">
	<li class="crumb"><a href="/">Blog</a></li>
	<li class="crumb-separator" aria-hidden>/</li>
	<li>
		<a href={$page.url.pathname}>{$page.data.title.rendered}</a>
	</li>
</ol>

<article class="container space-y-4 p-10">
	<slot />
</article>
