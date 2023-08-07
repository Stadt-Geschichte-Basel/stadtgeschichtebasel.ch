<script>
	import { MapLibre, Marker, Popup } from 'svelte-maplibre';

	let clickedName = '';

	const markers = [
		{
			lngLat: [7.59274, 47.55094],
			label: 'SGB',
			name: 'Stadt.Geschichte.Basel',
			description: 'Wir schreiben Basler Geschichten.'
		},
		{
			label: 'HMB',
			lngLat: [7.590339127047049, 47.55468576396681],
			name: 'Historisches Museum Basel',
			description: 'TBD'
		},
		{
			label: 'Kunstmuseum',
			lngLat: [7.593909367834212, 47.5542525919389],
			name: 'Kunstmuseum Basel',
			description: 'TBD'
		}
	];
</script>

<MapLibre
	style="https://vectortiles.geo.admin.ch/styles/ch.swisstopo.leichte-basiskarte.vt/style.json"
	class="relative aspect-[9/16] h-[90vh] max-h-[90vh] w-full sm:aspect-video sm:max-h-full"
	standardControls
	zoom={14}
	center={[7.59274, 47.55094]}
	maxBounds={[
		[5.94, 45.81],
		[10.51, 47.81]
	]}
>
	{#each markers as { lngLat, label, name, description } (label)}
		<Marker
			lngLat={[lngLat[0], lngLat[1]]}
			on:click={() => (clickedName = name)}
			class="grid h-8 w-8 place-items-center rounded-full border border-gray-200 bg-red-300 text-black shadow-2xl focus:outline-2 focus:outline-black"
		>
			<span>
				{label}
			</span>

			<!-- <Popup openOn="click" offset={[0, -10]} maxWidth={'30%'}> -->
			<Popup openOn="click" offset={[0, -10]}>
				<h3 class="font-bold md:text-lg">{name}</h3>
				<p class="text-sm">{description}</p>
			</Popup>
		</Marker>
	{/each}
</MapLibre>
