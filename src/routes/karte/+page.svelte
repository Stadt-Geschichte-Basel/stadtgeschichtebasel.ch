<script>
	import maplibregl from 'maplibre-gl';
	import { onMount, onDestroy } from 'svelte';

	let map;

	onMount(() => {
		map = new maplibregl.Map({
			container: 'map',
			maxBounds: [5.94, 45.81, 10.51, 47.81],
			style:
				'https://vectortiles.geo.admin.ch/styles/ch.swisstopo.leichte-basiskarte.vt/style.json',
				// 'https://vectortiles.geo.admin.ch/styles/ch.swisstopo.leichte-basiskarte-imagery.vt/style.json',
			// 'https://api.maptiler.com/maps/streets/style.json?key=yaXJCgx2SbG9gkZmAXQ2', // stylesheet location
			// https://vectortiles.geo.admin.ch/styles/ch.swisstopo.leichte-basiskarte-imagery.vt/style.json
			// https://vectortiles.geo.admin.ch/styles/ch.swisstopo.leichte-basiskarte.vt/style.json
			// TODO https://observablehq.com/@rkaravia/swisstopo-light-base-map-mapbox-terrain
			center: [47.55073, 7.59282], // starting position [lng, lat]
			zoom: 8 // starting zoom
		});
		new maplibregl.Marker().setLngLat([47.55073, 7.59282]).addTo(map);
		map.addControl(new maplibregl.NavigationControl());
		map.addControl(new maplibregl.FullscreenControl());
		map.addControl(new maplibregl.ScaleControl(
			{
				unit: 'metric'
			}
		));

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
