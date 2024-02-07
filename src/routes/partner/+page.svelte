<script>
	import { onMount } from 'svelte';
	import maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import * as config from '$lib/config';
	import Head from '$lib/components/Head.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	let map;
	let mapProperties = {
		style:
			'https://vectortiles.geo.admin.ch/styles/ch.swisstopo.leichte-basiskarte.vt/style.json',
		center: [7.59249, 47.55654],
		zoom: 14,
		maxBounds: [
				[5.94, 45.81],
				[10.51, 47.81]
			],
		minZoom: 12,
		maxZoom: 20,
		scrollZoom: true,
		attributionControl: true
	};
	let features = data.features.map((feature) => ({
		properties: feature.properties,
		geometry: feature.geometry,
		label: feature.properties.label,
		name: feature.properties.name
	}));

	let maxLength = 0; // default maxLength

	class SelectInputControl {
		constructor(features, map) {
			this._map = map;
			this._features = features;
			this._container = this.createContainer();
			this._select = this.createSelect();
			this.addOptionsToSelect();

			this._select.addEventListener('change', () => this.zoomToSelectedFeature());
			this._container.appendChild(this._select);
		}

		createContainer() {
			const container = document.createElement('div');
			container.className = 'maplibregl-ctrl rounded bg-white p-2 text-xl shadow-md';
			return container;
		}

		createSelect() {
			const select = document.createElement('select');
			select.id = 'featureSelector';
			select.className = 'bg-white';
			select.innerHTML = '<option value="">Springe zu ...</option>';
			return select;
		}

		addOptionsToSelect() {
			this._features.forEach((feature, index) => {
			const option = document.createElement('option');
			option.value = index;
			option.textContent = feature.properties.name;
			this._select.appendChild(option);
			});
		}

		zoomToSelectedFeature() {
			const selectedIndex = this._select.value;
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

	class MapController {
		constructor(map, data) {
			this._map = map;
			this._data = data;
		}

		async initializeMap() {
			try {
			await this.loadCustomMarkerImage();
			this.addCollaboratorsSource();
			this.addClustersLayer();
			this.addClusterCountLayer();
			this.addCollaboratorsLayer();
			this.setupClusterClickHandler();
			this.setupCollaboratorClickHandler();
			this.setupMouseEnterLeaveHandlers();
			} catch (error) {
			console.error('Error initializing map:', error);
			}
		}

		async loadCustomMarkerImage() {
			try {
			const image = await this._map.loadImage('./src/lib/images/pin-48.png');
			this._map.addImage('custom-marker', image.data);
			} catch (error) {
			console.error('Error loading custom marker image:', error);
			throw error; // Rethrow the error to stop further execution
			}
		}

		addCollaboratorsSource() {
			this._map.addSource('collaborators', {
			type: 'geojson',
			data: this._data,
			cluster: true,
			clusterMaxZoom: 15,
			clusterRadius: 60
			});
		}

		addClustersLayer() {
			this._map.addLayer({
			id: 'clusters',
			type: 'circle',
			source: 'collaborators',
			filter: ['has', 'point_count'],
			paint: {
				'circle-color': '#70416C',
				'circle-radius': ['step', ['get', 'point_count'], 20, 3, 30, 5, 40]
			}
			});
		}

		addClusterCountLayer() {
			this._map.addLayer({
			id: 'cluster-count',
			type: 'symbol',
			source: 'collaborators',
			filter: ['has', 'point_count'],
			layout: {
				'text-field': '{point_count_abbreviated}',
				'text-font': ['Frutiger Neue Bold'],
				'text-size': 20,
				'text-offset': [0, 0.15]
			},
			paint: {
				'text-color': '#FFFFFF'
			}
			});
		}

		addCollaboratorsLayer() {
			this._map.addLayer({
			id: 'collaborators',
			type: 'symbol',
			source: 'collaborators',
			filter: ['!', ['has', 'point_count']],
			layout: {
				'icon-image': 'custom-marker',
				'icon-overlap': 'always',
				'icon-size': 1,
				'text-field': ['get', 'label'],
				'text-font': ['Frutiger Neue Bold'],
				'text-variable-anchor': ['left', 'bottom', 'top', 'right'],
				'text-radial-offset': 0.8,
				'text-justify': 'auto',
				'text-size': 19
			},
			paint: {
				'text-color': '#70416C',
				'text-halo-width': 4,
				'text-halo-color': 'white'
			}
			});
		}

		setupClusterClickHandler() {
			this._map.on('click', 'clusters', async (e) => {
			try {
				const features = this._map.queryRenderedFeatures(e.point, {
				layers: ['clusters']
				});
				const clusterId = features[0].properties.cluster_id;
				const zoom = await this._map.getSource('collaborators').getClusterExpansionZoom(clusterId);
				this._map.easeTo({
				center: features[0].geometry.coordinates,
				zoom
				});
			} catch (error) {
				console.error('Error handling cluster click:', error);
			}
			});
		}

		setupCollaboratorClickHandler() {
			this._map.on('click', 'collaborators', (e) => {
			try {
				const coordinates = e.features[0].geometry.coordinates.slice();
				const name = e.features[0].properties.name;
				const description = e.features[0].properties.description;
				const address = e.features[0].properties.address;
				const website = e.features[0].properties.website;

				while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
				coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
				}

				new maplibregl.Popup()
				.setLngLat(coordinates)
				.setHTML(
					`<h3 class="text-lg font-bold">${name}</h3>
					<p class="text-sm">${description}</p>
					<p class="text-sm">${address}</p>
					<p class="text-sm">
					<a href=${website} target="_blank" rel="nofollow" class="underline">Zur Webseite</a>
					</p>`
				)
				.addTo(this._map);
			} catch (error) {
				console.error('Error handling collaborator click:', error);
			}
			});
		}

		setupMouseEnterLeaveHandlers() {
			this._map.on('mouseenter', 'collaborators', () => {
			this._map.getCanvas().style.cursor = 'pointer';
			});

			this._map.on('mouseleave', 'collaborators', () => {
			this._map.getCanvas().style.cursor = '';
			});

			this._map.on('mouseenter', 'clusters', () => {
			this._map.getCanvas().style.cursor = 'pointer';
			});

			this._map.on('mouseleave', 'clusters', () => {
			this._map.getCanvas().style.cursor = '';
			});
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
			style: mapProperties.style,
			center: mapProperties.center,
			zoom: mapProperties.zoom,
			maxBounds: mapProperties.maxBounds,
			minZoom: mapProperties.minZoom,
			maxZoom: mapProperties.maxZoom,
			scrollZoom: mapProperties.scrollZoom,
			attributionControl: mapProperties.attributionControl
		});

		// add scale bar to the map
		let scale = new maplibregl.ScaleControl({
			maxWidth: 200,
			unit: 'metric'
		});
		map.addControl(scale, 'bottom-left');

		// add zoom and rotation controls to the map
		map.addControl(new maplibregl.NavigationControl());

		const selectInputControl = new SelectInputControl(features, map);
		map.addControl(selectInputControl, 'top-left');

		const mapController = new MapController(map, data);
		map.on('load', () => mapController.initializeMap());

	});
</script>

<Head title="Partner | Alle Kooperationspartner*innen von {config.title}" />

<div class="h-full w-full" id="map"></div>

