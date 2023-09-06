import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vitest/config';
import { imagetools } from 'vite-imagetools';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';

const supportedExtensions = ['png', 'jpg', 'jpeg'];

export default defineConfig({
	plugins: [
		// imagetools({
		// 	defaultDirectives: (url) => {
		// 		const extension = url.pathname.substring(
		// 			url.pathname.lastIndexOf('.') + 1
		// 		);
		// 		if (supportedExtensions.includes(extension)) {
		// 			return new URLSearchParams({
		// 				width: '640;768;1024;1280;1536',
		// 				format: 'avif;webp;' + extension,
		// 				// picture: true
		// 				srcset: true
		// 			});
		// 		}
		// 		return new URLSearchParams();
		// 	}
		// 	// defaultDirectives: (url) => {
		// 	// 	return new URLSearchParams(
		// 	// 		'w=640;768&format=jpg'
		// 	// 		// 'w=640;768;1024;1280;1536&format=avif;webp;jpg&as=picture'
		// 	// 	)
		// 	// }
		// }),
		sveltekit(),
		purgeCss(),
		SvelteKitPWA({
			srcDir: './src',
			mode: 'development',
			registerType: 'autoUpdate',
			manifest: false,
			manifestFile: 'manifest.webmanifest',
			scope: '/',
			base: '/',
			injectManifest: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
			},
			workbox: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
			},
			// workbox: {
			// 	globPatterns: ['pages.json', 'posts.json', '**/*.{js,css,html,svg,ico,png,webp,avif}'],
			// 	globIgnores: ['**/sw*', '**/workbox-*']
			// }
		})
	],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
