/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	daisyui: {
		themes: [
			{
				'stadt-geschichte-basel': {
					primary: '#004488',
					secondary: '#EECC66',
					accent: '#EE99AA',
					neutral: '#000000',
					'base-100': '#F0F0F0',
					info: '#6699CC',
					success: '#EE99AA',
					warning: '#997700',
					error: '#994455'
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
