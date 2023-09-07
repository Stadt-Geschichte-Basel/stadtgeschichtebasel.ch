<script>
	import { CircleLayer, GeoJSON, MapLibre, MarkerLayer, Popup, Control, ControlGroup, ControlButton } from 'svelte-maplibre';

	/** @type {import('./$types').PageData} */
	export let data;

	let map;
	let featuresWithLabels = data.features.map((feature) => ({
		properties: feature.properties,
		geometry: feature.geometry,
		label: feature.properties.label
	}));

	function flyToFeature(feature, zoomLevel = 18) {
		map.flyTo({
			center: feature.geometry.coordinates,
			zoom: zoomLevel,
			speed: 0.5
		});
	}

	function handleSelectChange(event) {
		const selectedFeature = featuresWithLabels.find((f) => f.label === event.target.value);
		if (selectedFeature) {
			flyToFeature(selectedFeature);
		}
	}
</script>

<section class="h-[94vh] w-full overflow-hidden">
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
		standardControls
		bind:map
	>
	<div class="absolute top-4 right-4 z-50">
		<select class="rounded bg-white p-2 shadow-md text-xl" on:change={handleSelectChange}>
			<option value="">Springe zu</option>
			{#each featuresWithLabels as feature}
				<option value={feature.label}>{feature.label}</option>
			{/each}
		</select>
	</div>
		<GeoJSON
			id="data"
			{data}
			cluster={{
				radius: 1000,
				maxZoom: 15,
				properties: {
					// Sum the `mag` property from all the points in each cluster.
					total_mag: ['+', ['get', 'geometry.coordinates[0]']]
				}
			}}
		>
			<CircleLayer
				applyToClusters
				id="clusters"
				hoverCursor="pointer"
				paint={{
					// Use step expressions (https://maplibre.org/maplibre-gl-js-docs/style-spec/#expressions-step)
					// with three steps to implement three types of circles:
					//   * Blue, 20px circles when point count is less than 100
					//   * Yellow, 30px circles when point count is between 100 and 750
					//   * Pink, 40px circles when point count is greater than or equal to 750
					'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 3, '#f1f075', 5, '#f28cb1'],
					'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
					'circle-stroke-color': '#f00',
					'circle-stroke-width': 1
				}}
				on:click={(e) => {
					map.flyTo({
						center: e.detail.features[0].geometry.coordinates,
						zoom: map.getZoom() + 2,
						speed: 0.5
					});
				}}
				><!-- 
					<Popup openOn="hover" closeOnClickInside let:features>
						<ClusterPopup feature={features?.[0]} />
					</Popup>-->
			</CircleLayer>

			<!-- TODO: Funktioniert noch nicht. Soll die Anzahl Punkte pro Cluster anzeigen
				<SymbolLayer
					applyToClusters
					paint={{}}
					layout={{
						'text-field': [
							'format',
							['get', 'point_count_abbreviated'],
							{},
							'\n',
							{},
							[
								'number-format',
								['/', ['get', 'total_mag'], ['get', 'point_count']],
								{
									'max-fraction-digits': 2
								}
							],
							{ 'font-scale': 0.8 }
						],
						'text-size': 12,
						'text-offset': [0, -0.1]
					}}
				/>-->

			<MarkerLayer applyToClusters={false} interactive let:feature>
				<div
					class="rounded-full bg-red-300 p-3 text-sm font-bold shadow-2xl focus:outline-2 focus:outline-black"
				>
					{feature.properties.label}
				</div>

				<Popup openOn="click" offset={[0, -10]} maxWidth={'30%'}>
					<h3 class="text-lg font-bold">{feature.properties.name}</h3>
					<p class="text-sm">{feature.properties.address}</p>
					<p class="text-sm">
						<a href={feature.properties.website} target="_blank">{feature.properties.website}</a>
					</p></Popup
				>
			</MarkerLayer>
		</GeoJSON>
	</MapLibre>
</section>
