import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import { rehypeMdsvexImageAutoimport } from 'rehype-mdsvex-image-autoimport';
import rehypeExternalLinks from 'rehype-external-links';
import remarkCaptions from 'remark-captions';
import remarkUnwrapImages from 'remark-unwrap-images';

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [
		remarkCaptions,
		remarkUnwrapImages
	],
	rehypePlugins: [
		rehypeExternalLinks, // Adds 'target' and 'rel' to external links
		rehypeSlug, // Adds 'id' attributes to Headings (h1,h2,etc)
		rehypeAutolinkHeadings,
		rehypeMdsvexImageAutoimport
	]
});

export default config;
