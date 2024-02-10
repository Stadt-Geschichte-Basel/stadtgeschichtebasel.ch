<script>
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import * as config from '$lib/config';

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
	const currentURL = $page.url.pathname;
	const mailtoBody = encodeURI(
		`Ich habe ein Problem auf der Seite entdeckt: ${currentURL}\n` +
			`Art des Problems: [Bitte angeben: Technischer Fehler, Inhaltlicher Fehler, Tippfehler, Sonstiges]\n` +
			`Beschreibung des Problems: [Bitte beschreiben Sie das Problem so genau wie möglich.]\n` +
			`Weitere Anmerkungen: [Optional]\n` +
			`Kontaktinformationen: [Optional, falls Rückmeldung erwünscht]\n`
	);

	$: isActive = (path) => {
		if (path === '/blog' && $page.url.pathname.startsWith(base + path)) {
			return true;
		}
		return $page.url.pathname === base + path;
	};
</script>

<nav
	class="list-nav flex h-full flex-col justify-between p-4 text-xl"
	aria-label="Hauptmenü"
	data-sveltekit-preload-data
>
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

	<a
		class="variant-ghost btn btn-sm mt-4"
		href="mailto:{config.email}?subject=Fehler%20auf%20{currentURL}&body={mailtoBody}"
		>Fehler melden</a
	>
</nav>
