<script>
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import Navigation from '$lib/components/Navigation.svelte';
	import * as config from '$lib/config';
	import { assets } from '$app/paths';
	import {
		AppShell,
		AppBar,
		Drawer,
		getDrawerStore,
		initializeStores
	} from '@skeletonlabs/skeleton';
	import '../app.postcss';
	initializeStores();
	const drawerStore = getDrawerStore();
	function drawerOpen() {
		const /** @type {import('@skeletonlabs/skeleton').DrawerSettings} */ drawerSettings = {
				id: 'sidebar'
			};
		drawerStore.open(drawerSettings);
	}
	$: classesPageContentPartner = $page.url.pathname === '/partner' ? 'overflow-hidden' : '';
	$: classesPageFooterPartner = $page.url.pathname === '/partner' ? 'hidden' : '';
	$: classesPageFooterDataStories = $page.url.pathname.startsWith('/data-stories') ? 'hidden' : '';
	afterNavigate((params) => {
		const isNewPage =
			params.from && params.to && params.from.url.pathname !== params.to.url.pathname;
		const elemPage = document.querySelector('#page');
		if (isNewPage && elemPage !== null) {
			elemPage.scrollTop = 0;
		}
	});
</script>

<Drawer width="w-64">
	<Navigation />
</Drawer>

<AppShell
	slotSidebarLeft="bg-surface-50 dark:bg-surface-900 border-t border-surface-500/10 w-0 lg:w-64"
	slotPageFooter="bg-white {classesPageFooterPartner} {classesPageFooterDataStories}"
	slotPageContent="bg-white dark:bg-surface-900 border-t border-surface-500/10 {classesPageContentPartner}"
	scrollbarGutter="auto"
>
	<svelte:fragment slot="header">
		<div class="flex justify-center">
			<a
				class="bg-secondary variant-filled-secondary btn absolute m-4 -translate-y-16 transition focus:translate-y-0"
				href="#page-content">zum Seiteninhalt springen</a
			>
		</div>
		<AppBar background="bg-primary-500">
			<svelte:fragment slot="lead">
				<div class="flex">
					<button
						class="btn btn-sm mr-4 lg:hidden"
						on:click={drawerOpen}
						aria-label="Navigationsleiste öffnen"
					>
						<span>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="h-8 fill-white"
								><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
									d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
								/></svg
							>
						</span>
					</button>
					<div class="h-12">
						<a href="/" class="cursor-pointer" aria-label="Startseite">
							<img
								src="{assets}/favicon.svg"
								class="h-full"
								alt="Logo der {config.title}"
							/>
						</a>
					</div>
				</div></svelte:fragment
			>
			<svelte:fragment slot="trail">
				<ul class="grid grid-flow-col gap-4">
					<li>
						<a
							href="https://twitter.com/{config.twitterHandle}/"
							aria-label="Twitter"
							rel="noopener noreferrer"
							target="_blank"
						>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-8 fill-white"
								><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
									d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
								/></svg
							></a
						>
					</li>
					<li>
						<a
							href="https://www.instagram.com/{config.instagramHandle}/"
							aria-label="Instagram"
							rel="noopener noreferrer"
							target="_blank"
							><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="h-8 fill-white"
								><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
									d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
								/></svg
							></a
						>
					</li>
				</ul>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>
	<slot />
	<svelte:fragment slot="pageFooter">
		<div class="prose prose-sm p-4">
			<section>
				<div class="h5">Impressum</div>
				<p>
					{config.author}<br />
					Hirschgässlein 21<br />
					4051 Basel<br />
					<a class="anchor" href="mailto:{config.email}">{config.email}</a>
				</p>
			</section>

			<section>
				<p>
					© 2024
					<span class="mx-2 opacity-10" aria-hidden="true">|</span>
					<a class="anchor" href="/datenschutzerklaerung">Datenschutz</a>
					<span class="mx-2 opacity-10" aria-hidden="true">|</span>
					<a class="anchor" href="/barrierefreiheitserklaerung">Barrierefreiheit</a>
					<span class="mx-2 opacity-10" aria-hidden="true">|</span>
					<a class="anchor" href="/credits">Credits</a>
				</p>
			</section>
		</div>
	</svelte:fragment>
</AppShell>
