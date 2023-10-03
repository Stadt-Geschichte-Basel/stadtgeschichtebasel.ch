<script>
	import { base } from '$app/paths';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import Head from '$lib/components/Head.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import * as config from '$lib/config';
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
		const drawerSettings = { id: 'sidebar' };
		drawerStore.open(drawerSettings);
	}
	$: classesPageFooter = $page.url.pathname === '/orte' ? 'hidden' : '';

	afterNavigate(function (params) {
		var isNewPage = params.from && params.to && params.from.route.id !== params.to.route.id;
		var elemPage = document.querySelector('#page');
		if (isNewPage && elemPage !== null) {
			elemPage.scrollTop = 0;
		}
	});
</script>

<Head />

<Drawer width="w-64">
	<Navigation />
</Drawer>

<AppShell
	slotSidebarLeft="bg-surface-50 dark:bg-surface-900 border-t border-surface-500/10 w-0 lg:w-64"
	slotPageFooter="bg-white {classesPageFooter}"
	slotPageContent="bg-white dark:bg-surface-900 border-t border-surface-500/10"
>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex">
					<button
						class="btn btn-sm mr-4 lg:hidden"
						on:click={drawerOpen}
						aria-label="Open navigation menu"
					>
						<span>
							<svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 448 512"
								><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
									d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
								/></svg
							>
						</span>
					</button>
					<div class="h-12">
						<a href="{base}/" class="cursor-pointer" aria-label="Home">
							<svg class="h-full" viewBox="0 0 512 223.96" xmlns="http://www.w3.org/2000/svg"
								><path
									d="m0 49.6c4.52 6.39 12.22 10.05 21.17 10.05 12.54 0 21.69-7.43 21.77-17.67.07-8.06-4.53-13.82-13.67-17.11l-4.71-1.47c-6.31-2.27-9.87-3.72-9.87-7.05 0-3.12 3.96-4.76 7.88-4.76 4.11 0 8.33 1.83 10.85 4.68l8.09-8.55c-4.89-5.12-11.27-7.72-18.99-7.72-12.21 0-20.42 7.1-20.42 17.66 0 7.6 5.01 13.32 14.49 16.54l4.23 1.39c6.59 2.23 9.4 4.41 9.4 7.29s-3.7 5.17-8.43 5.17-9.54-2.65-12.27-6.5z"
								/><path d="m61.37 58.66h12.5v-45.83h15.03v-11.84h-42.4v11.84h14.87z" /><path
									d="m216.97 58.66h12.5v-45.83h15.03v-11.84h-42.4v11.84h14.87z"
								/><path
									d="m67.99 140.81h37.54v-11.83h-25.13v-11.08h20.2v-11.84h-20.2v-11.08h25.13v-11.83h-37.54z"
								/><path
									d="m259.25 140.81h12.41v-57.66h-12.41v22.83h-24.14v-22.83h-12.41v57.66h12.41v-23.08h24.14z"
								/><path d="m285.45 83.15h12.41v57.67h-12.41z" /><path
									d="m406.51 140.81h12.41v-57.66h-12.41v22.83h-24.14v-22.83h-12.41v57.66h12.41v-23.08h24.14z"
								/><path d="m440.37 140.81h12.49v-45.83h15.03v-11.83h-42.39v11.83h14.87z" /><path
									d="m474.46 140.81h37.54v-11.83h-25.13v-11.08h20.2v-11.84h-20.2v-11.08h25.13v-11.83h-37.54z"
								/><path
									d="m164.35 222.97h37.54v-11.83h-25.13v-11.09h20.2v-11.84h-20.2v-11.07h25.13v-11.84h-37.54z"
								/><path d="m214.13 222.97h36.56v-11.83h-24.15v-45.84h-12.41z" /><path
									d="m190.31 82.16c-16.45 0-29.82 13.38-29.82 29.82s13.38 29.82 29.82 29.82c9.29 0 17.83-3.83 23.47-10.53l-9.3-8.36c-3.55 4.57-8.32 6.89-14.17 6.89-9.56 0-17.33-8-17.33-17.82s7.78-17.82 17.33-17.82c5.98 0 10.82 2.41 14.38 7.15l9.3-8.36c-5.64-6.86-14.26-10.79-23.68-10.79"
								/><path
									d="m336.98 82.16c-16.45 0-29.82 13.38-29.82 29.82s13.38 29.82 29.82 29.82c9.29 0 17.83-3.83 23.48-10.53l-9.31-8.36c-3.55 4.57-8.32 6.89-14.17 6.89-9.56 0-17.32-8-17.32-17.82s7.77-17.82 17.32-17.82c5.98 0 10.82 2.41 14.38 7.15l9.3-8.36c-5.65-6.86-14.26-10.79-23.69-10.79"
								/><path
									d="m31.27 82.16c-17.33 0-30.4 12.82-30.4 29.82s13.49 29.82 31.38 29.82c10.02 0 18.82-3.14 23.58-8.42v-26.01h-23.5v11.59h11.42v7.88l-.12.09c-2.31 1.85-6.41 2.87-11.54 2.87-11.2 0-18.72-7.16-18.72-17.82s7.7-17.82 17.9-17.82c5.46 0 10.15 1.8 13.92 5.35l9.09-8.17c-5.87-6.09-13.61-9.17-23.02-9.17"
								/><path
									d="m112.64 131.82c4.52 6.39 12.22 10.05 21.17 10.05 12.54 0 21.69-7.43 21.77-17.67.07-8.06-4.53-13.82-13.67-17.11l-4.71-1.47c-6.31-2.27-9.87-3.72-9.87-7.05 0-3.12 3.96-4.76 7.88-4.76 4.11 0 8.33 1.83 10.85 4.68l8.09-8.55c-4.88-5.12-11.26-7.73-18.98-7.73-12.21 0-20.42 7.1-20.42 17.66 0 7.6 5.01 13.32 14.49 16.54l4.23 1.39c6.59 2.23 9.4 4.41 9.4 7.29s-3.7 5.17-8.43 5.17-9.54-2.65-12.27-6.5l-9.52 8.04z"
								/><path
									d="m111.33 213.91c4.52 6.39 12.22 10.05 21.17 10.05 12.54 0 21.69-7.43 21.77-17.67.07-8.06-4.53-13.82-13.67-17.11l-4.71-1.47c-6.31-2.27-9.87-3.72-9.87-7.05 0-3.12 3.96-4.76 7.88-4.76 4.11 0 8.33 1.83 10.85 4.68l8.09-8.55c-4.88-5.12-11.26-7.73-18.98-7.73-12.21 0-20.42 7.1-20.42 17.66 0 7.6 5.01 13.32 14.49 16.54l4.23 1.39c6.59 2.23 9.4 4.41 9.4 7.29s-3.7 5.17-8.43 5.17-9.54-2.65-12.27-6.5l-9.52 8.04z"
								/><path
									d="m120.24.99h-11.77l-24.69 57.67h12.93l5.17-12.32h24.95l.08.2 5.1 12.12h12.93zm-14.2 34.88 8.32-19.5 8.31 19.5z"
								/><path
									d="m39.29 192.61-.4-.21.32-.31c2.64-2.55 4.09-6.03 4.09-9.79 0-9.38-7.62-17.01-17.01-17.01h-21.72v57.67h25.42c9.77 0 17.42-7.39 17.42-16.84 0-5.84-3.03-10.88-8.12-13.51m-22.16-16.27h7.69c3.71 0 6.62 2.83 6.62 6.46s-2.9 6.29-6.62 6.29h-7.69zm11.8 35.5h-11.8v-12.75h11.72c3.75 0 6.69 2.8 6.69 6.38s-2.9 6.37-6.62 6.37"
								/><path
									d="m85.61 165.3h-11.77l-24.7 57.67h12.94l5.17-12.32h24.95l.08.2 5.1 12.12h12.93zm-14.2 34.88 8.32-19.5 8.31 19.5z"
								/><path
									d="m169.57.99h-19.55v57.67h19.55c16.21 0 29.41-12.94 29.41-28.84s-13.19-28.83-29.41-28.83m0 46.33h-7.14v-34.99h7.14c9.6 0 16.83 7.52 16.83 17.49s-7.24 17.5-16.83 17.5"
								/></svg
							>
						</a>
					</div>
				</div></svelte:fragment
			>
			<svelte:fragment slot="trail">
				<ul class="grid grid-flow-col gap-4">
					<li>
						<a
							href="https://www.instagram.com/sta.ge.ba/"
							aria-label="Instagram"
							rel="noopener noreferrer"
							><svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 448 512"
								><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
									d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
								/></svg
							></a
						>
					</li>
					<li>
						<a
							href="https://twitter.com/basel_stadt"
							aria-label="Twitter"
							rel="noopener noreferrer"
						>
							<svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512"
								><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
									d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
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
			<!-- <hr class="my-4" /> -->
			<div class="grid gap-4 md:grid-cols-2">
				<!-- Column 1 -->
				<section>
					<div class="h5">Mehr</div>
					<ul>
						<li><a class="anchor" href="{base}/ueber-uns#medien-und-pressekit">Presse</a></li>
						<li><a class="anchor" href="{base}/ueber-uns#lehrmittel">Lehrmittel</a></li>
					</ul>
				</section>

				<!-- Column 2 -->
				<section>
					<div class="h5">Impressum</div>
					<p>
						{config.author}<br />
						Hirschgässlein 21<br />
						4051 Basel<br />
						<a class="anchor" href="mailto:info@stadtgeschichtebasel.ch"
							>info@stadtgeschichtebasel.ch</a
						>
					</p>
				</section>
			</div>

			<!-- <hr class="my-4" /> -->

			<section>
				<p>
					© 2023 {config.author}
					<span class="mx-2 opacity-10">|</span>
					<a class="anchor" href="{base}/datenschutzerklaerung">Datenschutz</a>
					<span class="mx-2 opacity-10">|</span>
					<a class="anchor" href="{base}/credits">Credits</a>
				</p>
			</section>
		</div>
	</svelte:fragment>
</AppShell>
