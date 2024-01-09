import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import rehypeExternalLinks from 'rehype-external-links';
import remarkCaptions from 'remark-captions';

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [remarkCaptions],
	rehypePlugins: [rehypeSlug, [rehypeExternalLinks, { target: '_blank' }], rehypeAutolinkHeadings]
});

export default config;
