import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		sveltekit(),

		SvelteKitPWA({
			registerType: 'autoUpdate',
			manifest: false,
			manifestFile: 'manifest.webmanifest',
			scope: '/',
			workbox: {
				globPatterns: ['pages.json', 'posts.json', '**/*.{js,css,html,svg,ico,png,webp,avif}'],
				globIgnores: ['**/sw*', '**/workbox-*']
			}
		})
	],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
