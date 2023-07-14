import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
import lightningcss from 'vite-plugin-lightningcss';

export default defineConfig({
	plugins: [
		imagetools({
			formats: ['webp', 'avif']
		}),
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
			registerType: 'autoUpdate',
			srcDir: 'src',
			manifest: {
				name: 'Stadt.Geschicht.Basel',
				short_name: 'Stadt.Geschicht.Basel',
				lang: 'de',
				description:
					'Entdecken Sie die faszinierende Geschichte Basels. Tauchen Sie ein in die Kultur und Geschichte der Stadt am Rheinknie.',
				id: 'http://localhost:5173/',
				start_url: '/',
				scope: '/',
				display: 'standalone',
				orientation: 'portrait',
				background_color: '#ffffff',
				theme_color: '#ffffff',
				icons: [
					{
						src: 'http://localhost:5173/android-chrome-192x192.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'any'
					},
					{
						src: 'http://localhost:5173/android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any'
					},
					{
						src: 'http://localhost:5173/icon.svg',
						sizes: '48x48 72x72 96x96 128x128 150x150 256x256 512x512 1024x1024',
						type: 'image/svg+xml',
						purpose: 'any'
					},
					{
						src: 'http://localhost:5173/android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable'
					}
				]
			},
			devOptions: {
				enabled: true
			}
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
