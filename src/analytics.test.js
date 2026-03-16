import { readFileSync } from 'fs';
import { describe, expect, it } from 'vitest';

describe('analytics integration', () => {
	it('uses the Umami Cloud tracking snippet in app.html', () => {
		const appTemplate = readFileSync(new URL('./app.html', import.meta.url), 'utf8');

		expect(appTemplate).toContain('https://cloud.umami.is/script.js');
		expect(appTemplate).toContain('data-website-id="60182ad0-8e13-4fd9-b35e-899347695893"');
		expect(appTemplate).not.toContain('plausible.io');
	});

	it('does not keep the Plausible queue shim in the error page', () => {
		const errorPage = readFileSync(new URL('./routes/+error.svelte', import.meta.url), 'utf8');

		expect(errorPage).not.toContain('window.plausible');
	});
});
