<script>
	import {
		CircleLayer,
		GeoJSON,
		MapLibre,
		Popup,
		Control,
		NavigationControl,
		ScaleControl,
		SymbolLayer
	} from 'svelte-maplibre';
	import { onMount } from 'svelte';
	import * as config from '$lib/config';
	import Head from '$lib/components/Head.svelte';
	import svg from '$lib/images/location-dot-solid.svg';

	/** @type {import('./$types').PageData} */
	export let data;

	let map;
	let features = data.features.map((feature) => ({
		properties: feature.properties,
		geometry: feature.geometry,
		label: feature.properties.label,
		name: feature.properties.name
	}));
	// eslint-disable-next-line no-unused-vars
	let selectedFeature = null;

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
		let img = new Image(33, 33);
		img.onload = () => map.addImage('marker', img);
		img.onerror = () => console.error('Failed to load map marker image.');
		img.src = svg;
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

<section class="h-screen w-full">
	<MapLibre
		style="https://vectortiles.geo.admin.ch/styles/ch.swisstopo.leichte-basiskarte.vt/style.json"
		class="h-full w-full"
		images={[{ id: 'marker', url: 'src/lib/images/pin-48.png' }]}
		zoom={14}
		maxZoom={20}
		center={[7.59274, 47.55094]}
		maxBounds={[
			[5.94, 45.81],
			[10.51, 47.81]
		]}
		bind:map
	>
		<Control position="top-left">
			<select class="rounded bg-white p-2 text-xl shadow-md" on:change={handleSelectChange}>
				<option value="">Springe zu ...</option>
				{#each features as feature}
					<option value={feature.label}>{truncateString(feature.name)}</option>
				{/each}
			</select>
		</Control>
		<NavigationControl position="top-right" />
		<ScaleControl position="top-right" />
		<GeoJSON
			id="data"
			{data}
			cluster={{
				radius: 700,
				maxZoom: 15
			}}
		>
			<CircleLayer
				applyToClusters
				id="clusters"
				hoverCursor="pointer"
				paint={{
					'circle-color': '#3A1E3E',
					'circle-radius': ['step', ['get', 'point_count'], 20, 3, 30, 6, 40],
					'circle-stroke-color': '#FFFFFF',
					'circle-stroke-width': 1
				}}
				on:click={(e) => {
					map.flyTo({
						center: e.detail.features[0].geometry.coordinates,
						zoom: map.getZoom() + 3,
						speed: 0.5
					});
				}}
			/>
			<SymbolLayer
				id="cluster_labels"
				interactive={false}
				applyToClusters
				layout={{
					'text-field': ['get', 'point_count'],
					'text-font': ['Frutiger Neue Bold'],
					'text-size': 20,
					'text-offset': [0, 0.15],
					'text-allow-overlap': true
				}}
				paint={{
					'text-color': '#FFFFFF'
				}}
			/>
			<SymbolLayer
				id="collaborations"
				interactive
				applyToClusters={false}
				hoverCursor="pointer"
				layout={{
					'icon-image': 'marker',
					'icon-allow-overlap': true,
					'icon-overlap': 'always',
					'text-field': ['get', 'label'],
					'text-font': ['Frutiger Neue Bold'],
					'text-size': 19,
					'text-justify': 'auto',
					'text-variable-anchor': ['left', 'right', 'bottom', 'top'],
					'text-radial-offset': 0.8,
					'text-allow-overlap': true
				}}
				paint={{
					'text-color': '#3A1E3E',
					'text-halo-color': '#FFFFFF',
					'text-halo-width': 2
				}}
				on:click={(e) => (selectedFeature = e.detail.features?.[0]?.properties)}
			>
				<Popup openOn="click" offset={[0, -10]} let:features closeOnClickInside>
					{@const props = features?.[0]?.properties}
					<h3 class="text-lg font-bold">{props.name}</h3>
					<p class="text-sm">{props.address}</p>
					<p class="text-sm">
						<a href={props.website} target="_blank" rel="noopener nofollow" class="anchor"
							>Zur Webseite</a
						>
					</p>
				</Popup>
			</SymbolLayer>
		</GeoJSON>
	</MapLibre>
</section>
