<script>
	import { page } from '$app/stores';
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();
	function drawerClose() {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4">
	<ul>
		<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
			<a
				class="cursor-pointer {$page.url.pathname === '/' ||
				new String($page.url.pathname).startsWith('/blog/')
					? 'font-bold'
					: 'font-normal'}"
				href="/"
				on:click={drawerClose}>Blog</a
			>
		</li>
		<li aria-current={$page.url.pathname === '/geschichte' ? 'page' : undefined}>
			<a
				class="cursor-pointer {$page.url.pathname === '/geschichte' ? 'font-bold' : 'font-normal'}"
				href="/geschichte"
				on:click={drawerClose}>Geschichte</a
			>
			<!-- <ul class="bg-base-300 p-2">
				<li aria-current={$page.url.pathname === '/zeitgeschichte' ? 'page' : undefined}>
					<a
						class="cursor-pointer {$page.url.pathname === '/zeitgeschichte'
							? 'font-bold'
							: 'font-normal'}"
						href="/zeitgeschichte"
						on:click={drawerClose}>Zeitgeschichte</a
					>
				</li>
				<li aria-current={$page.url.pathname === '/neuzeig' ? 'page' : undefined}>
					<a
						class="cursor-pointer {$page.url.pathname === '/neuzeit' ? 'font-bold' : 'font-normal'}"
						href="/neuzeit"
						on:click={drawerClose}>Neuzeit</a
					>
				</li>
				<li aria-current={$page.url.pathname === '/mittelalter' ? 'page' : undefined}>
					<a
						class="cursor-pointer {$page.url.pathname === '/mittelalter'
							? 'font-bold'
							: 'font-normal'}"
						href="/mittelalter"
						on:click={drawerClose}>Mittelalter</a
					>
				</li>
				<li aria-current={$page.url.pathname === '/antike' ? 'page' : undefined}>
					<a
						class="cursor-pointer {$page.url.pathname === '/antike' ? 'font-bold' : 'font-normal'}"
						href="/antike"
						on:click={drawerClose}>Antike</a
					>
				</li>
				<li aria-current={$page.url.pathname === '/fruehgeschichte' ? 'page' : undefined}>
					<a
						class="cursor-pointer {$page.url.pathname === '/fruehgeschichte'
							? 'font-bold'
							: 'font-normal'}"
						href="/fruehgeschichte"
						on:click={drawerClose}>Frühgeschichte</a
					>
				</li>
			</ul> -->
		</li>
		<!-- <li aria-current={$page.url.pathname === '/forschung' ? 'page' : undefined}>
			<a
				class="cursor-pointer {$page.url.pathname === '/forschung' ? 'font-bold' : 'font-normal'}"
				href="https://forschung.stadtgeschichtebasel.ch/">Forschung</a
			>
		</li> -->
		<li aria-current={$page.url.pathname === '/agenda' ? 'page' : undefined}>
			<a
				class="cursor-pointer {$page.url.pathname === '/agenda' ? 'font-bold' : 'font-normal'}"
				href="/agenda"
				on:click={drawerClose}>Agenda</a
			>
		</li>
		<li aria-current={$page.url.pathname === '/karte' ? 'page' : undefined}>
			<a
				class="cursor-pointer {$page.url.pathname === '/karte' ? 'font-bold' : 'font-normal'}"
				href="/karte"
				on:click={drawerClose}>Karte</a
			>
		</li>
		<li aria-current={$page.url.pathname === '/ueber-uns' ? 'page' : undefined}>
			<a
				class="cursor-pointer {$page.url.pathname === '/ueber-uns' ? 'font-bold' : 'font-normal'}"
				href="/ueber-uns"
				on:click={drawerClose}>Über uns</a
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
                    aria-current={$page.url.pathname === '/datenschutzerklaerung'
                        ? 'page'
                        : undefined}
                >
                    <a href="/datenschutzerklaerung">Datenschutz</a>
                </li>
            </ul> -->
		</li>
	</ul>
</nav>
