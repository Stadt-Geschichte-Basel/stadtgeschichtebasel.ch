import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
// import { imagetools } from 'vite-imagetools';
// import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
	plugins: [
		//imagetools(),
		sveltekit()
		// SvelteKitPWA({
		// 	registerType: 'autoUpdate',
		// 	includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
		// 	manifest: {
		// 		name: 'Stadt.Geschichte.Basel',
		// 		short_name: 'Stadt.Geschichte.Basel',
		// 		description: 'Wir schreiben Basler Geschichten',
		// 		start_url: '/',
		// 		scope: '/',
		// 		display: 'standalone',
		// 		theme_color: '#ffffff',
		// 		background_color: '#ffffff',
		// 		icons: [
		// 			{ src: 'android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
		// 			{ src: 'android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
		// 			{
		// 				src: 'android-chrome-512x512.png',
		// 				sizes: '512x512',
		// 				type: 'image/png',
		// 				purpose: 'any maskable'
		// 			}
		// 		]
		// 	},
		// 	injectManifest: {
		// 		globPatterns: ['client/**/*.{js,css,ico,png,jpg,jpeg,svg,webp,avif,woff,woff2}']
		// 	},
		// 	workbox: {
		// 		globPatterns: ['client/**/*.{js,css,ico,png,jpg,jpeg,svg,webp,avif,woff,woff2}']
		// 	}
		// })
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
