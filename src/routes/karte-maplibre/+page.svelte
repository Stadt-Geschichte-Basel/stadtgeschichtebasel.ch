<script>
	import maplibregl from 'maplibre-gl';
	import { onMount, onDestroy } from 'svelte';

	let map;

	onMount(() => {
		map = new maplibregl.Map({
			container: 'map',
			style: 'https://api.maptiler.com/maps/streets/style.json?key=yaXJCgx2SbG9gkZmAXQ2', // stylesheet location
			center: [47.55073, 7.59282], // starting position [lng, lat]
			zoom: 18 // starting zoom
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
