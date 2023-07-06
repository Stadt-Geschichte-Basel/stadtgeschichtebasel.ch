import skeleton from '@skeletonlabs/skeleton/tailwind/skeleton.cjs';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { join } from 'path';

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {}
	},
	plugins: [forms, typography, ...skeleton()]
};
