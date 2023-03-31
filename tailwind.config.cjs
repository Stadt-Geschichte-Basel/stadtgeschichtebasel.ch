/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	daisyui: {
		themes: ['cmyk']
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms'), require('daisyui')],
	theme: {
		fontFamily: {
			sans: ['Euclid Circular B', 'sans-serif'],
			serif: ['Practice', 'serif']
		},
		container: {
			padding: '2rem'
		}
	}
};
