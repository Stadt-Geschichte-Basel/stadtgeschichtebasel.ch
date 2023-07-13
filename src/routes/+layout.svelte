<script>
	import { page } from '$app/stores';
	import Head from '$lib/Head.svelte';
	import Navigation from '$lib/Navigation.svelte';
	import Logo from '$lib/images/logo.svg';

	import { AppBar, AppShell, Drawer, drawerStore } from '@skeletonlabs/skeleton';
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	// import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import { pwaInfo } from 'virtual:pwa-info';
	import '../app.postcss';

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';

	$: classesPageFooter = $page.url.pathname === '/karte' ? 'hidden' : '';

	// Base Classes
	const cBase = 'border-t border-surface-500/10 text-xs md:text-base';
	const cRowOne =
		'flex flex-col md:flex-row justify-between items-center md:items-start space-y-5 md:space-y-0';
	const cRowTwo =
		'flex flex-col md:flex-row justify-between items-center md:items-start space-y-4 md:space-y-0';

	function drawerOpen() {
		drawerStore.open({});
	}
</script>

<svelte:head>
	{@html webManifest}
</svelte:head>

<Head />

<Drawer>
	<Navigation />
</Drawer>

<!-- App Shell -->
<AppShell
	slotSidebarLeft="bg-surface-50 dark:bg-surface-900 border-t border-surface-500/10 w-0 lg:w-64"
	slotPageFooter="bg-white {classesPageFooter}"
	slotPageContent="bg-white dark:bg-surface-900 border-t border-surface-500/10"
>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex items-center">
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
					<a href="/" class="cursor-pointer" aria-label="Home"
						><img src={Logo} alt="" class="h-12 w-auto" /></a
					>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<ul class="grid grid-flow-col gap-4">
					<li>
						<a href="https://www.instagram.com/sta.ge.ba/" aria-label="Instagram"
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
						<a href="https://www.facebook.com/Stadt.Geschichte.Basel" aria-label="Facebook"
							><svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								fill="currentColor"
								class="bi bi-facebook"
								viewBox="0 0 16 16"
							>
								<path
									d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
								/>
							</svg></a
						>
					</li>
					<li>
						<a href="https://twitter.com/basel_stadt" aria-label="Twitter"
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
					<li>
						<a href="https://vimeo.com/user31064894" aria-label="Vimeo"
							><svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								fill="currentColor"
								class="bi bi-vimeo"
								viewBox="0 0 16 16"
							>
								<path
									d="M15.992 4.204c-.071 1.556-1.158 3.687-3.262 6.393-2.175 2.829-4.016 4.243-5.522 4.243-.933 0-1.722-.861-2.367-2.583L3.55 7.523C3.07 5.8 2.556 4.94 2.007 4.94c-.118 0-.537.253-1.254.754L0 4.724a209.56 209.56 0 0 0 2.334-2.081c1.054-.91 1.845-1.388 2.373-1.437 1.243-.123 2.01.728 2.298 2.553.31 1.968.526 3.19.646 3.666.36 1.631.756 2.446 1.186 2.445.334 0 .836-.53 1.508-1.587.671-1.058 1.03-1.863 1.077-2.415.096-.913-.263-1.37-1.077-1.37a3.022 3.022 0 0 0-1.185.261c.789-2.573 2.291-3.825 4.508-3.756 1.644.05 2.419 1.117 2.324 3.2z"
								/>
							</svg></a
						>
					</li>
					<li>
						<a href="https://github.com/stadt-geschichte-basel" aria-label="Github">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								fill="currentColor"
								class="bi bi-github"
								viewBox="0 0 16 16"
							>
								<path
									d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
								/>
							</svg>
						</a>
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
		<div class="page-footer {cBase}">
			<div class="mx-auto w-full max-w-7xl space-y-10 p-4 py-16 md:py-24">
				<!-- Row 1 -->
				<section class={cRowOne}>
					<div
						class="grid grid-cols-1 place-content-center place-items-center gap-2 md:place-items-start"
					>
						<p class="!text-sm opacity-80">Wir schreiben Basler Geschichten.</p>
						<!-- Current Version -->
						<!-- <span class="badge variant-soft" /> -->
					</div>
					<div class="hidden grid-cols-3 gap-8 md:grid">
						<div class="space-y-6">
							<div class="h6">Mehr</div>
							<ul class="space-y-3">
								<li><a class="anchor" href="/ueber-uns#medien">Presse</a></li>
								<li><a class="anchor" href="/ueber-uns#lehrmittel">Lehrmittel</a></li>
								<!-- <li>
									<a
										class="anchor"
										href="https://forschung.stadtgeschichtebasel.ch"
										target="_blank"
										rel="noreferrer"
									>
										Forschung
									</a>
								</li> -->
							</ul>
						</div>
						<div class="space-y-6">
							<div class="h6">Impressum</div>
							<p class="text-sm">
								Stiftung Stadt.Geschichte.Basel<br />Hirschgässlein 21<br />4051 Basel<br />
								<a href="mailto:info@stadtgeschichtebasel.ch">info@stadtgeschichtebasel.ch</a>
							</p>
						</div>
					</div>
				</section>

				<hr class="opacity-20" />

				<!-- Row 2 -->
				<section class={cRowTwo}>
					<p>
						<!-- <a
							class="anchor"
							href="https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/blob/main/LICENSE.md"
							target="_blank"
							rel="noreferrer"
						> -->
						© 2023 Stadt.Geschichte.Basel
						<!-- </a> -->
						<span class="mx-2 opacity-10">|</span>
						<a class="anchor" href="/datenschutzerklaerung-der-stadt-geschichte-basel"
							>Datenschutz
						</a>
					</p>
				</section>
			</div>
		</div>
	</svelte:fragment>
</AppShell>
