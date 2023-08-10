import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import { rehypeMdsvexImageAutoimport } from 'rehype-mdsvex-image-autoimport';
import rehypeExternalLinks from 'rehype-external-links';

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [],
	rehypePlugins: [
		rehypeExternalLinks, // Adds 'target' and 'rel' to external links
		rehypeSlug, // Adds 'id' attributes to Headings (h1,h2,etc)
		[
			rehypeAutolinkHeadings,
			{
				// Adds hyperlinks to the headings, requires rehypeSlug
				behavior: 'prepend',
				properties: { className: ['heading-link'], title: 'Permalink', ariaHidden: 'true' },
				content: {
					type: 'element',
					tagName: 'span',
					properties: {},
					children: [{ type: 'text', value: '#' }]
				}
			}
		],
		rehypeMdsvexImageAutoimport]
});

export default config;