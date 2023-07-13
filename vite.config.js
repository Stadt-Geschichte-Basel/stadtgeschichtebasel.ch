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
			srcDir: './src',
			mode: 'development',
			// you don't need to do this if you're using generateSW strategy in your app
			// strategies: generateSW ? 'generateSW' : 'injectManifest',
			strategies: 'generateSW',
			// you don't need to do this if you're using generateSW strategy in your app
			// filename: generateSW ? undefined : 'prompt-sw.js',
			scope: '/',
			base: '/',
			selfDestroying: process.env.SELF_DESTROYING_SW === 'true',
			manifest: {
				short_name: 'Stadt.Geschichte.Basel',
				name: 'Stadt.Geschichte.Basel',
				description: 'Wir schreiben Basler Geschichten.',
				start_url: '/',
				scope: '/',
				display: 'standalone',
				theme_color: '#ffffff',
				background_color: '#ffffff',
				icons: [
					{
						src: '/android-chrome-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: '/android-chrome-512x512.png',
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
				suppressWarnings: process.env.SUPPRESS_WARNING === 'true',
				type: 'module',
				navigateFallback: '/'
			},
			// if you have shared info in svelte config file put in a separate module and use it also here
			kit: {}
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
