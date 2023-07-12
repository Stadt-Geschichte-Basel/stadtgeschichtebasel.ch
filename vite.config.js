import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { imagetools } from 'vite-imagetools';
import lightningcss from 'vite-plugin-lightningcss';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		imagetools(),
		sveltekit(),
		// lightningcss({
		// 	minify: true,
		// 	browserslist: 'last 2 versions, >= 0.25%, not dead',
		// 	drafts: {
		// 		customMedia: true,
		// 		nesting: true
		// 	}
		// }),
		SvelteKitPWA({
			strategies: 'generateSW',
			srcDir: './src',
			manifest: {
				name: 'Stadt.Geschichte.Basel',
				short_name: 'Stadt.Geschichte.Basel',
				description: 'Wir schreiben Basler Geschichten.',
				theme_color: '#fff',
				background_color: '#fff',
				start_url: '/',
				scope: '/',
				display: 'fullscreen',
				icons: [
					{
						src: 'android-chrome-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: 'android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				]
			},
			injectManifest: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
			},
			workbox: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
			},
			devOptions: {
				enabled: true,
				type: 'module'
			}
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
