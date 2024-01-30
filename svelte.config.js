import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import mdsvexConfig from './mdsvex.config.js';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],

	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [mdsvex(mdsvexConfig), vitePreprocess()],

	vitePlugin: {
		inspector: true
	},

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		csp: {
			mode: 'hash',
			directives: {
				'default-src': ['self'],
				'img-src': ['self', 'https:'],
				'script-src': ['self', 'https://plausible.io'],
				'style-src': ['self'],
				'object-src': ['none'],
				'connect-src': ['self', 'https://plausible.io']
			}
		},
		// do not abort on build errors
		prerender: {
			handleHttpError: 'warn',
			handleMissingId: 'warn'
		}
	}
};
export default config;
