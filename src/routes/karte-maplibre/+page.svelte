<script>
	import maplibregl from 'maplibre-gl';
	import { onMount, onDestroy } from 'svelte';

	let map;

	onMount(() => {
		map = new maplibregl.Map({
			container: 'map',
			bounds: [5.94, 45.81, 10.51, 47.81],
			style: 'https://vectortiles.geo.admin.ch/styles/ch.swisstopo.leichte-basiskarte.vt/style.json'
			// 'https://api.maptiler.com/maps/streets/style.json?key=yaXJCgx2SbG9gkZmAXQ2', // stylesheet location
			// https://vectortiles.geo.admin.ch/styles/ch.swisstopo.leichte-basiskarte-imagery.vt/style.json
			// https://vectortiles.geo.admin.ch/styles/ch.swisstopo.leichte-basiskarte.vt/style.json
			// TODO https://observablehq.com/@rkaravia/swisstopo-light-base-map-mapbox-terrain
			// center: [47.55073, 7.59282], // starting position [lng, lat]
			// zoom: 18 // starting zoom
		});
		new maplibregl.Marker().setLngLat([47.55073, 7.59282]).addTo(map);
	});

	onDestroy(() => {
		if (map) {
			map.remove();
		}
	});
</script>

<div id="map" style="width: 400px; height: 300px;" />

<style>
	@import 'maplibre-gl/dist/maplibre-gl.css';
</style>
