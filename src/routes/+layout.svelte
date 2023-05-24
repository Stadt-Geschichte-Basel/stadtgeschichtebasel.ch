<script>
	import { page } from '$app/stores';
	import Navigation from '$lib/Navigation.svelte';
	import Newsletter from '$lib/Newsletter.svelte';
	import Logo from '$lib/images/logo.svg';

	import { AppBar, AppShell, Drawer, drawerStore } from '@skeletonlabs/skeleton';
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	// import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

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
	<title>Stadt.Geschichte.Basel</title>
	<meta name="keywords" content="Basel, Geschichte, Stadtgeschichte, Kultur" />
	<meta
		name="description"
		content="Entdecken Sie die faszinierende Geschichte Basels. Tauchen Sie ein in die Kultur und Geschichte der Stadt am Rheinknie."
	/>
	<meta name="author" content="Stiftung Stadt.Geschichte.Basel" />

	<!-- Twitter tags -->
	<meta name="twitter:title" content="Stadt.Geschichte.Basel" />
	<meta
		name="twitter:description"
		content="Entdecken Sie die faszinierende Geschichte Basels. Tauchen Sie ein in die Kultur und Geschichte der Stadt am Rheinknie."
	/>
	<meta name="twitter:site" content="@basel_stadt" />
	<meta name="twitter:creator" content="@basel_stadt" />
	<meta
		property="twitter:image"
		content="https://beta.stadtgeschichtebasel.ch/android-chrome-512x512.png"
	/>
	<meta property="twitter:image:width" content="512" />
	<meta property="twitter:image:height" content="512" />

	<!-- Open Graph / Facebook tags-->
	<meta name="og:title" content="Stadt.Geschichte.Basel" />
	<meta
		name="og:description"
		content="Entdecken Sie die faszinierende Geschichte Basels. Tauchen Sie ein in die Kultur und Geschichte der Stadt am Rheinknie."
	/>
	<meta property="og:url" content="https://stadtgeschichtebasel.ch/" />
	<meta property="og:site_name" content="Stadt.Geschichte.Basel" />
	<meta property="og:type" content="website" />
	<meta
		property="og:image"
		content="https://beta.stadtgeschichtebasel.ch/android-chrome-512x512.png"
	/>
	<meta property="og:image:width" content="512" />
	<meta property="og:image:height" content="512" />
</svelte:head>

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
					<button class="btn btn-sm mr-4 lg:hidden" on:click={drawerOpen}>
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
							<!-- <svg viewBox="0 0 100 80" class="h-4 w-4 fill-token">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg> -->
						</span>
					</button>
					<a href="/" class="cursor-pointer"> <img src={Logo} alt="" class="h-12" /></a>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<ul class="grid grid-flow-col gap-4">
					<li>
						<a href="https://www.instagram.com/sta.ge.ba/"
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
						<a href="https://www.facebook.com/Stadt.Geschichte.Basel"
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
						<a href="https://twitter.com/basel_stadt"
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
						<a href="https://vimeo.com/user31064894"
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
						<a href="https://github.com/stadt-geschichte-basel">
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
				<!-- <a
					class="btn btn-sm variant-ghost-surface"
					href="https://discord.gg/EXqV7W8MtY"
					target="_blank"
					rel="noreferrer"
				>
					Discord
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://twitter.com/SkeletonUI"
					target="_blank"
					rel="noreferrer"
				>
					Twitter
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/skeletonlabs/skeleton"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a> -->
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>
	<slot />
	<svelte:fragment slot="pageFooter">
		<!-- <div>
			<span class="footer-title">Über uns</span>
			<ul class="leading-relaxed">
				<li class="link-hover link">
					<a href="/ueber-uns#social-media">Social Media</a>
				</li>
				<li class="link-hover link">
					<a href="/ueber-uns#medien">Presse</a>
				</li>
				<li class="link-hover link">
					<a href="/ueber-uns#lehrmittel">Lehrmittel</a>
				</li>
				<li class="link-hover link">
					<a href="/ueber-uns#impressum">Impressum</a>
				</li>
				<li class="link-hover link">
					<a href="/ueber-uns#datenschutz">Datenschutz</a>
				</li>
			</ul>
		</div>
		<div>
			<span class="footer-title">Newsletter</span>
			<div class="group">
				<div
					class="tooltip-open tooltip tooltip-top hidden group-hover:block"
					data-tip="Ihre E-Mail-Adresse wird nur dazu genutzt, Ihnen unseren Newsletter und Informationen über
			unsere Tätigkeiten zu senden. Ihnen steht jederzeit der Abmeldelink zur Verfügung, den wir
			in jede gesendete E-Mail einfügen."
				/>
				<Newsletter />
			</div>
		</div> -->

		<div class="page-footer {cBase}">
			<div class="mx-auto w-full max-w-7xl space-y-10 p-4 py-16 md:py-24">
				<!-- Row 1 -->
				<section class={cRowOne}>
					<div
						class="grid grid-cols-1 place-content-center place-items-center gap-2 md:place-items-start"
					>
						<p class="!text-sm opacity-80">UI Toolkit for Svelte + Tailwind.</p>
						<!-- Current Version -->
						<span class="badge variant-soft" />
					</div>
					<div class="hidden grid-cols-3 gap-8 md:grid">
						<div class="space-y-6">
							<h6 class="h6">Explore</h6>
							<ul class="space-y-3">
								<li><a class="anchor" href="/blog">Introduction</a></li>
								<li><a class="anchor" href="/blog">Get Started</a></li>
								<li><a class="anchor" href="/blog">Blog</a></li>
							</ul>
						</div>
						<div class="space-y-6">
							<h6 class="h6">Features</h6>
							<ul class="space-y-3">
								<li><a class="anchor" href="/blog">Tailwind</a></li>
								<li><a class="anchor" href="/blog">Svelte</a></li>
								<li><a class="anchor" href="/blog">Utilities</a></li>
							</ul>
						</div>
						<div class="space-y-6">
							<h6 class="h6">Project</h6>
							<ul class="space-y-3">
								<li>
									<a
										class="anchor"
										href="https://github.com/skeletonlabs"
										target="_blank"
										rel="noreferrer">Github Organization</a
									>
								</li>
								<li>
									<a
										class="anchor"
										href="https://www.npmjs.com/org/skeletonlabs"
										target="_blank"
										rel="noreferrer">NPM Organization</a
									>
								</li>
								<li>
									<a
										class="anchor"
										href="https://www.npmjs.com/package/@skeletonlabs/skeleton"
										target="_blank"
										rel="noreferrer">NPM Package</a
									>
								</li>
							</ul>
						</div>
					</div>
				</section>

				<hr class="opacity-20" />

				<!-- Row 2 -->
				<section class={cRowTwo}>
					<p>
						<a
							class="anchor"
							href="https://github.com/skeletonlabs/skeleton/blob/master/LICENSE"
							target="_blank"
							rel="noreferrer"
						>
							MIT License
						</a>
						<span class="mx-2 opacity-10">|</span>
						<a class="anchor" href="https://skeletonlabs.co/" target="_blank" rel="noreferrer"
							>Skeleton Labs
						</a>
					</p>
					<div class="flex space-x-4">
						<a
							class="btn variant-soft"
							href="https://github.com/skeletonlabs/skeleton"
							target="_blank"
							rel="noreferrer"
						>
							<i class="fa-brands fa-github" />
							<span class="ml-2 hidden md:inline-block">Github</span>
						</a>
						<a
							class="btn variant-soft"
							href="https://discord.gg/EXqV7W8MtY"
							target="_blank"
							rel="noreferrer"
						>
							<i class="fa-brands fa-discord" />
							<span class="ml-2 hidden md:inline-block">Discord</span>
						</a>
						<a
							class="btn variant-soft"
							href="https://twitter.com/SkeletonUI"
							target="_blank"
							rel="noreferrer"
						>
							<i class="fa-brands fa-twitter" />
							<span class="ml-2 hidden md:inline-block">Twitter</span>
						</a>
						<a
							class="btn variant-soft"
							href="https://www.youtube.com/@skeletonlabs"
							target="_blank"
							rel="noreferrer"
						>
							<i class="fa-brands fa-youtube" />
							<span class="ml-2 hidden md:inline-block">YouTube</span>
						</a>
					</div>
				</section>
			</div>
		</div>
	</svelte:fragment>
</AppShell>
