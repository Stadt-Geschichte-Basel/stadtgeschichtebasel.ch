import { skeleton } from '@skeletonlabs/tw-plugin';
import typography from '@tailwindcss/typography';
import { join } from 'path';

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {}
	},
	plugins: [typography, skeleton()]
};
