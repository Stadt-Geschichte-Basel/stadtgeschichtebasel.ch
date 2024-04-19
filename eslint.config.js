import eslintPluginSvelte from 'eslint-plugin-svelte';
export default [
	// add more generic rule sets here, such as:
	// js.configs.recommended,
	...eslintPluginSvelte.configs['flat/recommended'],
	{
		ignores: [
			'.DS_Store',
			'node_modules',
			'/build',
			'/.svelte-kit',
			'/package',
			'.env',
			'.env.*',
			'!.env.example',
			'pnpm-lock.yaml',
			'package-lock.json',
			'yarn.lock'
		],
		rules: {
			// override/add rules settings here, such as:
			// 'svelte/rule-name': 'error'
		}
	}
];
