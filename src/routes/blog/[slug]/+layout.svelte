<script>
	import { page } from '$app/stores';
</script>

<div class="text-token flex justify-center p-4">
	<ol class="breadcrumb">
		<li class="crumb"><a class="anchor" href="/">Blog</a></li>
		<li class="crumb-separator" aria-hidden>/</li>
		<li>
			<a class="anchor" href={$page.url.pathname}>{$page.data.meta.title}</a>
		</li>
	</ol>
</div>

<article class="container space-y-4 p-10">
	<slot />
</article>
