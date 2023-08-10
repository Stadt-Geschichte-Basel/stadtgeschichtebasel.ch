import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			registerType: 'autoUpdate',
			// srcDir: 'src',
			// manifest: false,
			// manifestFile: 'manifest.webmanifest',
			manifest: {
				name: 'Stadt.Geschicht.Basel',
				short_name: 'Stadt.Geschicht.Basel',
				start_url: '/',
				display: 'standalone',
				background_color: '#ffffff',
				lang: 'de',
				scope: '/',
				description:
					'Entdecken Sie die faszinierende Geschichte Basels. Tauchen Sie ein in die Kultur und Geschichte der Stadt am Rheinknie.',
				id: 'https://beta.stadtgeschichtebasel.ch/',
				orientation: 'portrait',
				theme_color: '#ffffff',
				icons: [
					{
						src: 'https://beta.stadtgeschichtebasel.ch/android-chrome-192x192.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'any'
					},
					{
						src: 'https://beta.stadtgeschichtebasel.ch/android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any'
					},
					{
						src: 'https://beta.stadtgeschichtebasel.ch/icon.svg',
						sizes: '48x48 72x72 96x96 128x128 150x150 256x256 512x512 1024x1024',
						type: 'image/svg+xml',
						purpose: 'any'
					},
					{
						src: 'https://beta.stadtgeschichtebasel.ch/android-chrome-512x512.png',
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
