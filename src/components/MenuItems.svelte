<script>
	import { page } from '$app/stores';
</script>

<li aria-current={$page.url.pathname === '/geschichte' ? 'page' : undefined}>
	<a
		class="cursor-pointer {$page.url.pathname === '/geschichte' ? 'font-bold' : 'font-normal'}"
		href="/geschichte">Geschichte</a
	>
	<ul class="bg-base-300 p-2">
		<li aria-current={$page.url.pathname === '/geschichte/zeitgeschichte' ? 'page' : undefined}>
			<a
				class="cursor-pointer {$page.url.pathname === '/geschichte/zeitgeschichte'
					? 'font-bold'
					: 'font-normal'}"
				href="/geschichte/zeitgeschichte">Zeitgeschichte</a
			>
		</li>
		<li aria-current={$page.url.pathname === '/geschichte/neuzeig' ? 'page' : undefined}>
			<a
				class="cursor-pointer {$page.url.pathname === '/geschichte/neuzeit'
					? 'font-bold'
					: 'font-normal'}"
				href="/geschichte/neuzeit">Neuzeit</a
			>
		</li>
		<li aria-current={$page.url.pathname === '/geschichte/mittelalter' ? 'page' : undefined}>
			<a
				class="cursor-pointer {$page.url.pathname === '/geschichte/mittelalter'
					? 'font-bold'
					: 'font-normal'}"
				href="/geschichte/mittelalter">Mittelalter</a
			>
		</li>
		<li aria-current={$page.url.pathname === '/geschichte/antike' ? 'page' : undefined}>
			<a
				class="cursor-pointer {$page.url.pathname === '/geschichte/antike'
					? 'font-bold'
					: 'font-normal'}"
				href="/geschichte/antike">Antike</a
			>
		</li>
		<li aria-current={$page.url.pathname === '/geschichte/fruehgeschichte' ? 'page' : undefined}>
			<a
				class="cursor-pointer {$page.url.pathname === '/geschichte/fruehgeschichte'
					? 'font-bold'
					: 'font-normal'}"
				href="/geschichte/fruehgeschichte">Frühgeschichte</a
			>
		</li>
	</ul>
</li>
<li aria-current={$page.url.pathname === '/blog' ? 'page' : undefined}>
	<a
		class="cursor-pointer {$page.url.pathname === '/blog' ? 'font-bold' : 'font-normal'}"
		href="/blog">Blog</a
	>
</li>
<li aria-current={$page.url.pathname === '/forschung' ? 'page' : undefined}>
	<a
		class="cursor-pointer {$page.url.pathname === '/forschung' ? 'font-bold' : 'font-normal'}"
		href="https://forschung.stadtgeschichtebasel.ch/">Forschung</a
	>
</li>
<li aria-current={$page.url.pathname === '/agenda' ? 'page' : undefined}>
	<a
		class="cursor-pointer {$page.url.pathname === '/agenda' ? 'font-bold' : 'font-normal'}"
		href="/agenda">Agenda</a
	>
</li>
<li aria-current={$page.url.pathname === '/karte' ? 'page' : undefined}>
	<a
		class="cursor-pointer {$page.url.pathname === '/karte' ? 'font-bold' : 'font-normal'}"
		href="/karte">Karte</a
	>
</li>
<li aria-current={$page.url.pathname === '/ueber-uns' ? 'page' : undefined}>
	<a
		class="cursor-pointer {$page.url.pathname === '/ueber-uns' ? 'font-bold' : 'font-normal'}"
		href="/ueber-uns">Über uns</a
	>
</li>
