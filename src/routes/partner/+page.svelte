<script>

	import { onMount } from 'svelte';
	import maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import * as config from '$lib/config';
	import Head from '$lib/components/Head.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	let map;
	let features = data.features.map((feature) => ({
		properties: feature.properties,
		geometry: feature.geometry,
		label: feature.properties.label,
		name: feature.properties.name
	}));

	function flyToFeature(feature, zoomLevel = 18) {
		map.flyTo({
			center: feature.geometry.coordinates,
			zoom: zoomLevel,
			speed: 0.5
		});
	}

	function handleSelectChange(event) {
		const selectedFeature = features.find((f) => f.label === event.target.value);
		if (selectedFeature) {
			flyToFeature(selectedFeature);
		}
	}

	let maxLength = 0; // default maxLength


	class SelectInputControl {
		constructor(features, map) {
			this._map = map;
			this._features = features;

			// Erstelle das Control-Element
			this._container = document.createElement('div');
			this._container.className = 'maplibregl-ctrl rounded bg-white p-2 text-xl shadow-md';
			//this._container.className = 'rounded bg-white p-2 text-xl shadow-md';
			const select = document.createElement('select');
			select.id = 'featureSelector';
			select.className = 'bg-white';
			select.innerHTML = '<option value="">Springe zu ...</option>';

			// Füge Optionen für jedes Feature hinzu
			features.forEach((feature, index) => {
			const option = document.createElement('option');
			option.value = index;
			option.textContent = feature.properties.name;
			select.appendChild(option);
			});

			// Füge einen Event-Handler zum Zoomen hinzu, wenn ein Feature ausgewählt wird
			select.addEventListener('change', () => this.zoomToSelectedFeature());

			this._container.appendChild(select);
		}

		zoomToSelectedFeature() {
			const select = this._container.querySelector('#featureSelector');
			const selectedIndex = select.value;
			if (selectedIndex !== '') {
			const selectedFeature = this._features[selectedIndex];
			this._map.flyTo({
				center: selectedFeature.geometry.coordinates,
				zoom: 18,
				speed: 0.5
			});
			}
		}

		onAdd(map) {
			this._map = map;
			return this._container;
		}

		onRemove() {
			this._container.parentNode.removeChild(this._container);
			this._map = undefined;
		}
	}


	onMount(() => {
		if (window.innerWidth <= 360) {
			maxLength = 15;
		} else if (window.innerWidth <= 640) {
			maxLength = 20;
		} else if (window.innerWidth <= 768) {
			maxLength = 25;
		} else {
			maxLength = 99;
		}

		map = new maplibregl.Map({
			container: 'map',
			style: "https://vectortiles.geo.admin.ch/styles/ch.swisstopo.leichte-basiskarte.vt/style.json",//'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
			center: [7.59249, 47.55654], // starting position
			zoom: 14, // starting zoom;
			maxBounds: [ 
				[5.94, 45.81],
				[10.51, 47.81]
				],
			minZoom: 12,
			maxZoom: 20,
			scrollZoom: true,
			attributionControl: true,
				});

			// Adding scale bar to the map
			let scale = new maplibregl.ScaleControl({
			maxWidth: 200,
			unit: 'metric',
		});
		map.addControl(scale, 'bottom-left');

		// Adding zoom and rotation controls to the map
		map.addControl(new maplibregl.NavigationControl());

		const selectInputControl = new SelectInputControl(features, map);
		map.addControl(selectInputControl, 'top-left');


		map.on('load', async () => {
			map.on('error', function (e) {
				console.error('Maplibre GL Error:', e.error);
			});

			const image = await map.loadImage('./src/lib/data/pin-48.png')
			map.addImage('custom-marker', image.data);

			map.addSource('collaborators', {
				type: 'geojson',
				data: data,
				cluster: true,
				clusterMaxZoom: 15, // Max zoom to cluster points on
				clusterRadius: 60// Radius of each cluster when clustering points (defaults to 50)
			});

			map.addLayer({
				id: 'clusters',
				type: 'circle',
				source: 'collaborators',
				filter: ['has', 'point_count'],
				paint: {
					// Use step expressions (https://maplibre.org/maplibre-style-spec/#expressions-step)
					// with three steps to implement three types of circles:
					//   * Blue, 20px circles when point count is less than 100
					//   * Yellow, 30px circles when point count is between 100 and 750
					//   * Pink, 40px circles when point count is greater than or equal to 750
					'circle-color': '#70416C',
					'circle-radius': [
						'step',
						['get', 'point_count'],
						20,
						3,
						30,
						5,
						40
					]
				}
			});

			map.addLayer({
				id: 'cluster-count',
				type: 'symbol',
				source: 'collaborators',
				filter: ['has', 'point_count'],
				layout: {
					'text-field': '{point_count_abbreviated}',
					'text-font': ['Frutiger Neue Bold'],
					'text-size': 20,
					'text-offset': [0, 0.15],
				},
				paint:{
					'text-color': '#FFFFFF'
				}
			});



			// Add a symbol layer
			map.addLayer({
				'id': 'collaborators',
				'type': 'symbol',
				'source': 'collaborators',
				'filter': ['!', ['has', 'point_count']],
				'layout': {
					'icon-image': 'custom-marker',
					'icon-overlap': 'always',
					'icon-size': 1,
					'text-field': ['get', 'label'],
					'text-font': ['Frutiger Neue Bold'],
					'text-variable-anchor': ['left', 'bottom', 'top', 'right'],
					'text-radial-offset': 0.8,
					'text-justify': 'auto',
					'text-size': 19,
				},
				paint:{
					'text-color': '#70416C',
					'text-halo-width': 4,
					'text-halo-color': 'white'
				}
			});




			// inspect a cluster on click
			map.on('click', 'clusters', async (e) => {
            	const features = map.queryRenderedFeatures(e.point, {
                	layers: ['clusters']
				});
				const clusterId = features[0].properties.cluster_id;
				const zoom = await map.getSource('collaborators').getClusterExpansionZoom(clusterId);
				map.easeTo({
					center: features[0].geometry.coordinates,
					zoom
				});
			});

			// When a click event occurs on a feature in the places layer, open a popup at the
			// location of the feature, with description HTML from its properties.
			map.on('click', 'collaborators', (e) => {
				const coordinates = e.features[0].geometry.coordinates.slice();
				const name = e.features[0].properties.name;
				const description = e.features[0].properties.description;
				const address = e.features[0].properties.address;
				const website = e.features[0].properties.website;

				// Ensure that if the map is zoomed out such that multiple
				// copies of the feature are visible, the popup appears
				// over the copy being pointed to.
				while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
					coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
				}

				new maplibregl.Popup()
					.setLngLat(coordinates)
					.setHTML(`<h3 class="text-lg font-bold">${name}</h3>
							<p class="text-sm">${description}</p>
							<p class="text-sm">${address}</p>
							<p class="text-sm">
							<a href=${website} target="_blank" rel="nofollow" class="underline">Zur Webseite</a
							</p>`)
					.addTo(map);
			});

			// Change the cursor to a pointer when the mouse is over the places layer.
			map.on('mouseenter', 'collaborators', () => {
				map.getCanvas().style.cursor = 'pointer';
			});

			// Change it back to a pointer when it leaves.
			map.on('mouseleave', 'collaborators', () => {
				map.getCanvas().style.cursor = '';
			});

			map.on('mouseenter', 'clusters', () => {
				map.getCanvas().style.cursor = 'pointer';
			});
			map.on('mouseleave', 'clusters', () => {
				map.getCanvas().style.cursor = '';
			});
		});
		
	});

	function truncateString(str) {
		if (str.length > maxLength) {
			return str.slice(0, maxLength) + '...';
		} else {
			return str;
		}
	}
</script>

<Head title="Partner | Alle Kooperationspartner*innen von {config.title}" />

<section class="h-full w-full">
	<div class="h-full w-full" id='map' ></div>	
</section>

<style>
	main {
  overflow-y: hidden;
}

:global(body) {
  overflow: hidden;
}

</style>
