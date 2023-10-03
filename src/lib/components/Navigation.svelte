<script>
	import { page } from '$app/stores';
	import { base } from '$app/paths';
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
				class="cursor-pointer {$page.url.pathname === base + '/' ? 'font-bold' : 'font-normal'}"
				href="{base}/"
				on:click={drawerClose}>Startseite</a
			>
		</li>
		<li aria-current={$page.url.pathname === base + '/blog' ? 'page' : undefined}>
			<a
				class="cursor-pointer {$page.url.pathname === base + '/blog' ||
				new String($page.url.pathname).startsWith(base + '/blog')
					? 'font-bold'
					: 'font-normal'}"
				href="{base}/blog"
				on:click={drawerClose}>Blog</a
			>
		</li>
		<li aria-current={$page.url.pathname === base + '/meilensteine' ? 'page' : undefined}>
			<a
				class="cursor-pointer {$page.url.pathname === base + '/meilensteine'
					? 'font-bold'
					: 'font-normal'}"
				href="{base}/meilensteine"
				on:click={drawerClose}>Meilensteine</a
			>
		</li>
		<li aria-current={$page.url.pathname === base + '/agenda' ? 'page' : undefined}>
			<a
				class="cursor-pointer {$page.url.pathname === base + '/agenda'
					? 'font-bold'
					: 'font-normal'}"
				href="{base}/agenda"
				on:click={drawerClose}>Agenda</a
			>
		</li>
		<li aria-current={$page.url.pathname === base + '/orte' ? 'page' : undefined}>
			<a
				class="cursor-pointer {$page.url.pathname === base + '/orte'
					? 'font-bold'
					: 'font-normal'}"
				href="{base}/orte"
				on:click={drawerClose}>Orte</a
			>
		</li>
		<li aria-current={$page.url.pathname === base + '/forschung' ? 'page' : undefined}>
			<a
				class="cursor-pointer {$page.url.pathname === base + '/forschung' ? 'font-bold' : 'font-normal'}"
				href="{base}/forschung">Forschung</a
			>
		</li>
		<li aria-current={$page.url.pathname === base + '/ueber-uns' ? 'page' : undefined}>
			<a
				class="cursor-pointer {$page.url.pathname === base + '/ueber-uns'
					? 'font-bold'
					: 'font-normal'}"
				href="{base}/ueber-uns"
				on:click={drawerClose}>Über uns</a
			>
		</li>
	</ul>
</nav>
