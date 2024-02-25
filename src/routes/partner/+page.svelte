<script>
	import {
		CircleLayer,
		GeoJSON,
		MapLibre,
		MarkerLayer,
		Popup,
		Control,
		NavigationControl,
		ScaleControl
	} from 'svelte-maplibre';
	import { onMount } from 'svelte';
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
				radius: 1000,
				maxZoom: 15
			}}
		>
			<CircleLayer
				applyToClusters
				id="clusters"
				hoverCursor="pointer"
				paint={{
					'circle-color': '#3a1e3e',
					'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
					'circle-stroke-color': '#ffffff',
					'circle-stroke-width': 2
				}}
				on:click={(e) => {
					map.flyTo({
						center: e.detail.features[0].geometry.coordinates,
						zoom: map.getZoom() + 2,
						speed: 0.5
					});
				}}
			/>
			<MarkerLayer applyToClusters={false} interactive let:feature>
				<div
					class="rounded-full bg-[#3a1e3e] p-3 text-sm font-bold text-[#ffffff] shadow-2xl focus:outline-2 focus:outline-black"
				>
					{feature.properties.label}
				</div>
				<Popup openOn="click" offset={[0, -10]}>
					<h3 class="text-lg font-bold">{feature.properties.name}</h3>
					<p class="text-sm">{feature.properties.address}</p>
					<p class="text-sm">
						<a href={feature.properties.website} target="_blank" rel="nofollow" class="underline"
							>Zur Webseite</a
						>
					</p></Popup
				>
			</MarkerLayer>
		</GeoJSON>
	</MapLibre>
</section>
