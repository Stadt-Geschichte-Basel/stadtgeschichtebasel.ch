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
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								class="inline-block h-6 w-6 stroke-current"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 6h16M4 12h16M4 18h16"
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
							><svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								fill="currentColor"
								class="bi bi-instagram"
								viewBox="0 0 16 16"
							>
								<path
									d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
								/>
							</svg></a
						>
					</li>
					<li>
						<a href="https://twitter.com/basel_stadt" aria-label="Twitter" rel="noopener noreferrer"
							><svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								fill="currentColor"
								class="bi bi-twitter"
								viewBox="0 0 16 16"
							>
								<path
									d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"
								/>
							</svg></a
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
		<div class="p-4 prose prose-sm">
			<!-- <hr class="my-4" /> -->
			<div class="grid gap-4 md:grid-cols-2">
				
				<!-- Column 1 -->
				<section>
					<div class="h5">Mehr</div>
					<ul >
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
						<a class="anchor" href="mailto:info@stadtgeschichtebasel.ch">info@stadtgeschichtebasel.ch</a>
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
