import { join } from 'path';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';

const sgb = {
	name: 'sgb',
	properties: {
		// Theme Properties
		'--theme-font-family-base': "'Euclid Circular B', sans-serif",
		'--theme-font-family-heading': "'Euclid Circular B', sans-serif",
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '4px',
		'--theme-rounded-container': '8px',
		'--theme-border-base': '2px',
		// Theme On-X Colors
		'--on-primary': '255 255 255',
		'--on-secondary': '0 0 0',
		'--on-tertiary': '0 0 0',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '255 255 255',
		'--on-surface': '255 255 255',
		// Theme Colors
		// primary
		'--color-primary-50': '227 227 227',
		'--color-primary-100': '218 218 218',
		'--color-primary-200': '208 208 208',
		'--color-primary-300': '180 180 180',
		'--color-primary-400': '124 124 124',
		'--color-primary-500': '68 68 68',
		'--color-primary-600': '61 61 61',
		'--color-primary-700': '51 51 51',
		'--color-primary-800': '41 41 41',
		'--color-primary-900': '33 33 33',
		// secondary
		'--color-secondary-50': '240 240 240',
		'--color-secondary-100': '235 235 235',
		'--color-secondary-200': '230 230 230',
		'--color-secondary-300': '214 214 214',
		'--color-secondary-400': '184 184 184',
		'--color-secondary-500': '153 153 153',
		'--color-secondary-600': '138 138 138',
		'--color-secondary-700': '115 115 115',
		'--color-secondary-800': '92 92 92',
		'--color-secondary-900': '75 75 75',
		// tertiary
		'--color-tertiary-50': '250 250 250',
		'--color-tertiary-100': '248 248 248',
		'--color-tertiary-200': '247 247 247',
		'--color-tertiary-300': '241 241 241',
		'--color-tertiary-400': '231 231 231',
		'--color-tertiary-500': '221 221 221',
		'--color-tertiary-600': '199 199 199',
		'--color-tertiary-700': '166 166 166',
		'--color-tertiary-800': '133 133 133',
		'--color-tertiary-900': '108 108 108',
		// success
		'--color-success-50': '237 247 220',
		'--color-success-100': '230 245 208',
		'--color-success-200': '224 242 197',
		'--color-success-300': '206 235 162',
		'--color-success-400': '169 219 92',
		'--color-success-500': '132 204 22',
		'--color-success-600': '119 184 20',
		'--color-success-700': '99 153 17',
		'--color-success-800': '79 122 13',
		'--color-success-900': '65 100 11',
		// warning
		'--color-warning-50': '252 244 218',
		'--color-warning-100': '251 240 206',
		'--color-warning-200': '250 236 193',
		'--color-warning-300': '247 225 156',
		'--color-warning-400': '240 202 82',
		'--color-warning-500': '234 179 8',
		'--color-warning-600': '211 161 7',
		'--color-warning-700': '176 134 6',
		'--color-warning-800': '140 107 5',
		'--color-warning-900': '115 88 4',
		// error
		'--color-error-50': '249 221 234',
		'--color-error-100': '246 209 228',
		'--color-error-200': '244 198 221',
		'--color-error-300': '238 163 200',
		'--color-error-400': '225 94 159',
		'--color-error-500': '212 25 118',
		'--color-error-600': '191 23 106',
		'--color-error-700': '159 19 89',
		'--color-error-800': '127 15 71',
		'--color-error-900': '104 12 58',
		// surface
		'--color-surface-50': '232 232 232',
		'--color-surface-100': '224 224 224',
		'--color-surface-200': '217 217 217',
		'--color-surface-300': '194 194 194',
		'--color-surface-400': '148 148 148',
		'--color-surface-500': '102 102 102',
		'--color-surface-600': '92 92 92',
		'--color-surface-700': '77 77 77',
		'--color-surface-800': '61 61 61',
		'--color-surface-900': '50 50 50'
	}
};

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {}
	},
	plugins: [
		typography,
		skeleton({
			themes: [sgb]
		})
	]
};
