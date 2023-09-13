<script>
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();
	function drawerClose() {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4 text-xl" aria-label="Hauptmenü" data-sveltekit-preload-data>
	<ul>
		<li aria-current={$page.url.pathname === base + '/' ? 'page' : undefined}>
			<a
				class="cursor-pointer {$page.url.pathname === base + '/' ||
				new String($page.url.pathname).startsWith(base +'/blog')
					? 'font-bold'
					: 'font-normal'}"
				href="{base}/blog"
				on:click={drawerClose}>Blog</a
			>
		</li>
		<li aria-current={$page.url.pathname === base + '/geschichte' ? 'page' : undefined}>
			<a
				class="cursor-pointer {$page.url.pathname === base + '/geschichte' ? 'font-bold' : 'font-normal'}"
				href="{base}/geschichte"
				on:click={drawerClose}>Geschichte</a
			>
		</li>
		<!-- <li aria-current={$page.url.pathname === base + '/forschung' ? 'page' : undefined}>
			<a
				class="cursor-pointer {$page.url.pathname === base + '/forschung' ? 'font-bold' : 'font-normal'}"
				href="https://forschung.stadtgeschichtebasel.ch/">Forschung</a
			>
		</li> -->
		<li aria-current={$page.url.pathname === base + '/agenda' ? 'page' : undefined}>
			<a
				class="cursor-pointer {$page.url.pathname === base + '/agenda' ? 'font-bold' : 'font-normal'}"
				href="{base}/agenda"
				on:click={drawerClose}>Agenda</a
			>
		</li>
		<li aria-current={$page.url.pathname === base + '/karte' ? 'page' : undefined}>
			<a
				class="cursor-pointer {$page.url.pathname === base + '/karte' ? 'font-bold' : 'font-normal'}"
				href="{base}/karte"
				on:click={drawerClose}>Karte</a
			>
		</li>
		<li aria-current={$page.url.pathname === base + '/ueber-uns' ? 'page' : undefined}>
			<a
				class="cursor-pointer {$page.url.pathname === base + '/ueber-uns' ? 'font-bold' : 'font-normal'}"
				href="{base}/ueber-uns"
				on:click={drawerClose}>Über uns</a
			>
		</li>
	</ul>
</nav>
