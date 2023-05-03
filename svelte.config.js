import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-cloudflare';
import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';
// import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	preprocess: [
		mdsvex(mdsvexConfig),
		// vitePreprocess(),
		preprocess({
			postcss: {
				plugins: [tailwind, autoprefixer]
			}
		})
	],
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			// csp: {
			// 	directives: {
			// 		'script-src': ['self']
			// 	},
			// 	reportOnly: {
			// 		'script-src': ['self']
			// 	}
			// },
			// precompress: true
		})
	}
};

export default config;
