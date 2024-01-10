<script>
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();
	const drawerClose = () => drawerStore.close();
	const navItems = [
		{ label: 'Startseite', path: '/' },
		{ label: 'Agenda', path: '/agenda' },
		{ label: 'Bände', path: '/baende' },
		{ label: 'Blog', path: '/blog' },
		{ label: 'Partner', path: '/partner' },
		{ label: 'Projekt', path: '/projekt' },
		{ label: 'Über uns', path: '/ueber-uns' }
	];

	$: isActive = (path) => {
		if (path === '/blog' && $page.url.pathname.startsWith(base + path)) {
			return true;
		}
		return $page.url.pathname === base + path;
	};
</script>

<nav class="list-nav p-4 text-xl" aria-label="Hauptmenü" data-sveltekit-preload-data>
	<ul>
		{#each navItems as { label, path }}
			<li aria-current={isActive(path) ? 'page' : undefined}>
				<a
					class="cursor-pointer {isActive(path) ? 'font-bold' : 'font-normal'}"
					href="{base}{path}"
					on:click={drawerClose}>{label}</a
				>
			</li>
		{/each}
	</ul>
</nav>
