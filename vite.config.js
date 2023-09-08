import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
// import { imagetools } from 'vite-imagetools';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';

// const supportedExtensions = ['png', 'jpg', 'jpeg'];

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
		// }),
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
