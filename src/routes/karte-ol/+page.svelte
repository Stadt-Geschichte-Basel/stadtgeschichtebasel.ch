<script>
	import Map from 'ol/Map.js';
	import OSM from 'ol/source/OSM.js';
	import TileLayer from 'ol/layer/Tile.js';
	import View from 'ol/View.js';
	import { onMount } from 'svelte';

	let map;

	onMount(() => {
		map = new Map({
			target: 'map',
			layers: [
				new TileLayer({
					source: new OSM()
				})
			],
			view: new View({
				center: [47.55073, 7.59282],
				zoom: 18
			})
		});
	});

	function zoomOut() {
		const view = map.getView();
		const zoom = view.getZoom();
		view.setZoom(zoom - 1);
	}

	function zoomIn() {
		const view = map.getView();
		const zoom = view.getZoom();
		view.setZoom(zoom + 1);
	}
</script>
<h1>Karte</h1>
<div id="map" class="w-100 h-[80vh]"/>
<button on:click={zoomOut}>Zoom Out</button>
<button on:click={zoomIn}>Zoom In</button>
