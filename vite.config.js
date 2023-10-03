import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';

export default defineConfig({
	plugins: [
		sveltekit(),
		purgeCss({
			safelist: {
				// FIXME: This is a workaround for svelte-maplibre css
				greedy: [/^maplibregl-ctrl/]
			}
		})
	],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
