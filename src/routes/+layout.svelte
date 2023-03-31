<script>
	import '../app.css';
	import MenuItems from '../components/MenuItems.svelte';
</script>

<div class="drawer">
	<input id="sgb-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
		<!-- Navbar -->
		<div class="navbar w-full bg-base-300">
			<div class="flex-none lg:hidden">
				<label for="sgb-drawer" class="btn-ghost btn-square btn">
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
				</label>
			</div>
			<div class="mx-2 flex-1 px-2">
				<a href="/" class="cursor-pointer"> <img src="images/logo.svg" alt="" class="h-8" /></a>
			</div>
			<div class="mx-2 flex-1 px-2">Suchfeld</div>
			<div class="hidden flex-none lg:block">
				<ul class="menu menu-horizontal">
					<MenuItems />
				</ul>
			</div>
		</div>
		<main class="md:container md:mx-auto">
			<slot />
		</main>
		<footer class="footer bg-base-300 p-10 text-base-content">
			<div>
				<span class="footer-title">Services</span>
				<a class="link-hover link">Branding</a>
				<a class="link-hover link">Design</a>
				<a class="link-hover link">Marketing</a>
				<a class="link-hover link">Advertisement</a>
			</div>
			<div>
				<span class="footer-title">Über uns</span>
				<a class="link-hover link">About us</a>
				<a class="link-hover link">Contact</a>
				<a class="link-hover link">Jobs</a>
				<a class="link-hover link">Press kit</a>
			</div>
			<div>
				<span class="footer-title">Social</span>
				<div class="grid grid-flow-col gap-4">
					<a
						><svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							class="fill-current"
							><path
								d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
							/></svg
						></a
					>
					<a
						><svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							class="fill-current"
							><path
								d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
							/></svg
						></a
					>
					<a
						><svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							class="fill-current"
							><path
								d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
							/></svg
						></a
					>
				</div>
			</div>
		</footer>
		<!-- <footer>
				<p>Newsletter anmelden</p>
				<p>Impressum,Presse alles aus über uns</p>
				<p>© 2023 Stiftung Stadt.Geschichte.Basel</p>
				<p>WCAG 2.1 compliant</p>
			</footer> -->
	</div>
	<div class="drawer-side">
		<label for="sgb-drawer" class="drawer-overlay" />
		<ul class="menu w-80 bg-base-100 p-4">
			<MenuItems />
		</ul>
	</div>
</div>
