<script>
	import maplibregl from 'maplibre-gl';
	import { onMount, onDestroy } from 'svelte';

	onMount(() => {
		let map = new maplibregl.Map({
			container: 'map',
			maxBounds: [5.94, 45.81, 10.51, 47.81],
			style:
				'https://vectortiles.geo.admin.ch/styles/ch.swisstopo.leichte-basiskarte.vt/style.json',
			center: [7.59274, 47.55094],
			zoom: 12
		});
		map.addControl(new maplibregl.NavigationControl());
		map.addControl(new maplibregl.FullscreenControl());
		map.addControl(new maplibregl.ScaleControl());

		map.addControl(
			new maplibregl.AttributionControl({
				compact: true
			})
		);

		new maplibregl.Marker({
			color: '#000'
		})
			.setLngLat([7.59274, 47.55094])
			.setPopup(
				new maplibregl.Popup({
					offset: 25
				}).setHTML(
					'<h1 class="text-xl">Stadt.Geschichte.Basel</h1><p>Wir schreiben Basler Geschichten.</p>'
				)
			)
			.addTo(map);
	});

	onDestroy(() => {
		if (map) {
			map.remove();
		}
	});
</script>

<section>
	<div id="map" class="w-100 h-[75vh]" />
</section>

<style>
	@import 'maplibre-gl/dist/maplibre-gl.css';
</style>
