import { sveltekit } from '@sveltejs/kit/vite';
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
		purgeCss()
	],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
