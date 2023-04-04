<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let mapElement;
	let map;

	onMount(async () => {
		if (browser) {
			const leaflet = await import('leaflet');

			map = leaflet.map(mapElement).setView([47.55073, 7.59282], 18);

			leaflet
				.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution:
						'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				})
				.addTo(map);

			leaflet
				.marker([47.55073, 7.59282])
				.addTo(map)
				.bindPopup('Stadt.Geschichte.Basel<br>Hier passiert die Magie ;)')
				.openPopup();
		}
	});

	onDestroy(async () => {
		if (map) {
			console.log('Unloading Leaflet map.');
			map.remove();
		}
	});
</script>

<article>
	<h1>Karte</h1>

	<div bind:this={mapElement} class="w-100 h-[80vh]" />
</article>

<style>
	@import 'leaflet/dist/leaflet.css';
</style>
