<script>
	import { page } from '$app/stores';
</script>

<ol class="breadcrumb">
	<li class="crumb"><a href="/">Blog</a></li>
	<li class="crumb-separator" aria-hidden>/</li>
	<li>
		<a href={$page.url.pathname}>{$page.url.pathname}</a>
		<!-- <a href={$page.url.pathname}>{$page.data.title}</a> -->
	</li>
</ol>
<!-- <article class="container prose mx-auto p-2 xl:prose-xl lg:p-4"> -->
<article class="container space-y-4 p-10">
	<slot />
</article>
