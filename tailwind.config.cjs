/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	daisyui: {
		themes: [
			{
				'stadt-geschichte-basel': {
					primary: '#0077BB',
					secondary: '#EE7733',
					accent: '#CCBB44',
					neutral: '#333333',
					'base-100': '#FFFFFF',
					info: '#009988',
					success: '#0077BB',
					warning: '#EE7733',
					error: '#CC3311'
				}
			}
		]
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms'), require('daisyui')],
	theme: {
		fontFamily: {
			sans: ['Euclid Circular B', 'sans-serif']
		}
	}
};
