<script>
	import { page } from '$app/stores';
</script>

<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
	<a class="cursor-pointer {$page.url.pathname === '/' ? 'font-bold' : 'font-normal'}" href="/"
		>Blog</a
	>
</li>
<li aria-current={$page.url.pathname === '/geschichte' ? 'page' : undefined}>
	<a
		class="cursor-pointer {$page.url.pathname === '/geschichte' ? 'font-bold' : 'font-normal'}"
		href="/geschichte">Geschichte</a
	>
	<ul class="bg-base-300 p-2">
		<li aria-current={$page.url.pathname === '/zeitgeschichte' ? 'page' : undefined}>
			<a
				class="cursor-pointer {$page.url.pathname === '/zeitgeschichte'
					? 'font-bold'
					: 'font-normal'}"
				href="/zeitgeschichte">Zeitgeschichte</a
			>
		</li>
		<li aria-current={$page.url.pathname === '/neuzeig' ? 'page' : undefined}>
			<a
				class="cursor-pointer {$page.url.pathname === '/neuzeit' ? 'font-bold' : 'font-normal'}"
				href="/neuzeit">Neuzeit</a
			>
		</li>
		<li aria-current={$page.url.pathname === '/mittelalter' ? 'page' : undefined}>
			<a
				class="cursor-pointer {$page.url.pathname === '/mittelalter' ? 'font-bold' : 'font-normal'}"
				href="/mittelalter">Mittelalter</a
			>
		</li>
		<li aria-current={$page.url.pathname === '/antike' ? 'page' : undefined}>
			<a
				class="cursor-pointer {$page.url.pathname === '/antike' ? 'font-bold' : 'font-normal'}"
				href="/antike">Antike</a
			>
		</li>
		<li aria-current={$page.url.pathname === '/fruehgeschichte' ? 'page' : undefined}>
			<a
				class="cursor-pointer {$page.url.pathname === '/fruehgeschichte'
					? 'font-bold'
					: 'font-normal'}"
				href="/fruehgeschichte">Frühgeschichte</a
			>
		</li>
	</ul>
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
	<!-- <ul class="bg-base-300 p-2">
		<li aria-current={$page.url.pathname === '/ueber-uns#social-media' ? 'page' : undefined}>
			<a href="/ueber-uns#social-media">Social Media</a>
		</li>
		<li aria-current={$page.url.pathname === '/ueber-uns#medien' ? 'page' : undefined}>
			<a href="/ueber-uns#medien">Medien</a>
		</li>
		<li aria-current={$page.url.pathname === '/ueber-uns#lehrmittel' ? 'page' : undefined}>
			<a href="/ueber-uns#lehrmittel">Lehrmittel</a>
		</li>
		<li aria-current={$page.url.pathname === '/ueber-uns#impressum' ? 'page' : undefined}>
			<a href="/ueber-uns#impressum">Impressum</a>
		</li>
		<li
			aria-current={$page.url.pathname === '/datenschutzerklaerung-der-stadt-geschichte-basel'
				? 'page'
				: undefined}
		>
			<a href="/datenschutzerklaerung-der-stadt-geschichte-basel">Datenschutz</a>
		</li>
	</ul> -->
</li>
