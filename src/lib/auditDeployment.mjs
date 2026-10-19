import { randomUUID } from 'crypto';
import fs from 'fs';

/**
 * Audits a deployed website: checks that critical, sitemap and legacy URLs respond as expected.
 * Usage: node src/lib/auditDeployment.mjs [baseURL]
 * The base URL can have a path, for example the default GitHub Pages URL of the repository.
 * The script uses Node.js built-ins only, so it runs without `pnpm install`.
 * It fails if a check fails.
 */

/**
 * The URL of the published website.
 * @type {string}
 */
const siteURL = 'https://stadtgeschichtebasel.ch';

/**
 * Paths that must return 200 in addition to the URLs in the sitemap.
 * @type {Array<string>}
 */
const criticalPaths = [
	'/',
	'/robots.txt',
	'/sitemap.xml',
	'/rss.xml',
	'/posts.json',
	'/pages.json',
	'/agenda.json',
	'/manifest.webmanifest'
];

/**
 * The maximum number of parallel requests.
 * @type {number}
 */
const concurrency = 8;

/**
 * The timeout of one request, in milliseconds.
 * @type {number}
 */
const timeout = 30_000;

const args = process.argv.slice(2);
const baseURL = (args.find((arg) => !arg.startsWith('--')) ?? siteURL).replace(/\/+$/, '');

/** @type {Array<{id: number|null, url: string, slug: string|null}>} */
const archive = JSON.parse(
	fs.readFileSync(new URL('./data/archive.json', import.meta.url), { encoding: 'utf8' })
);

/**
 * Converts a path or a URL of the published website to a URL on the audited deployment.
 * @param {string} pathOrURL - e.g. /blog or https://stadtgeschichtebasel.ch/blog.
 * @returns {string}
 */
function toURL(pathOrURL) {
	const p = (pathOrURL.startsWith(siteURL) ? pathOrURL.slice(siteURL.length) : pathOrURL) || '/';
	return baseURL + (p.startsWith('/') ? p : `/${p}`);
}

/**
 * Fetches a URL and follows redirects. Tries again once after a network error.
 * @param {string} url
 * @param {boolean} [withBody] - Read the response body.
 * @returns {Promise<{status: number, headers: Headers, body: string}>} Status 0 for a network error.
 */
async function get(url, withBody = false) {
	for (let attempt = 1; ; attempt++) {
		try {
			const res = await fetch(url, { signal: AbortSignal.timeout(timeout) });
			const body = withBody ? await res.text() : '';
			if (!withBody) await res.body?.cancel();
			return { status: res.status, headers: res.headers, body };
		} catch (e) {
			if (attempt >= 2) return { status: 0, headers: new Headers(), body: String(e) };
		}
	}
}

/**
 * Runs tasks with at most `concurrency` tasks in parallel.
 * @param {Array<() => Promise<void>>} tasks
 * @returns {Promise<void>}
 */
async function runAll(tasks) {
	let next = 0;
	const worker = async () => {
		while (next < tasks.length) await tasks[next++]();
	};
	await Promise.all(Array.from({ length: concurrency }, worker));
}

/**
 * Returns the host that served a response.
 * @param {Headers} headers
 * @returns {string}
 */
function origin(headers) {
	if (headers.has('x-github-request-id')) return 'GitHub Pages';
	if (headers.get('server') === 'cloudflare') return 'Cloudflare';
	return headers.get('server') ?? 'unknown';
}

/**
 * Returns the target of a meta refresh redirect, or null.
 * @param {string} html
 * @returns {string|null}
 */
function metaRefreshTarget(html) {
	const match = html.match(
		/<meta[^>]+http-equiv=["']?refresh["']?[^>]+content=["']?\d+\s*;\s*url=([^"'>\s]+)/i
	);
	return match ? decodeURI(match[1].replaceAll('&amp;', '&')) : null;
}

// Checks
const kinds = [
	'Critical URL',
	'Sitemap URL',
	'Legacy URL',
	'Legacy redirect',
	'Legacy redirect target',
	'Unknown URL returns 404'
];
/** @type {Map<string, {checked: number, failed: Array<string>}>} */
const results = new Map(kinds.map((kind) => [kind, { checked: 0, failed: [] }]));
/**
 * Records the result of a check.
 * @param {string} kind
 * @param {boolean} ok
 * @param {string} failure - The description of a failed check.
 */
function record(kind, ok, failure) {
	const entry = results.get(kind);
	if (!entry) return;
	entry.checked++;
	if (!ok) entry.failed.push(failure);
}

/** @type {Headers} */
let homeHeaders = new Headers();
let sitemap = '';
await runAll(
	criticalPaths.map((p) => async () => {
		const url = toURL(p);
		const res = await get(url, p === '/sitemap.xml');
		if (p === '/') homeHeaders = res.headers;
		if (p === '/sitemap.xml') sitemap = res.body;
		record('Critical URL', res.status === 200, `\`${url}\`: ${res.status}`);
	})
);

const sitemapURLs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) =>
	toURL(loc.trim().replaceAll('&amp;', '&'))
);
const redirectTargets = new Set();
await runAll([
	...sitemapURLs.map((url) => async () => {
		const res = await get(url);
		record('Sitemap URL', res.status === 200, `\`${url}\`: ${res.status}`);
	}),
	...archive.map((entry) => async () => {
		const url = toURL(entry.url);
		const res = await get(url, Boolean(entry.slug));
		record('Legacy URL', res.status === 200, `\`${url}\`: ${res.status}`);
		if (!entry.slug || res.status !== 200) return;
		const target = metaRefreshTarget(res.body);
		record(
			'Legacy redirect',
			target === entry.slug,
			`\`${url}\`: redirects to \`${target}\`, expected \`${entry.slug}\``
		);
		redirectTargets.add(entry.slug);
	}),
	async () => {
		const url = toURL(`/audit-${randomUUID()}`);
		const res = await get(url);
		record('Unknown URL returns 404', res.status === 404, `\`${url}\`: ${res.status}`);
	}
]);
await runAll(
	[...redirectTargets].map((slug) => async () => {
		const url = toURL(slug);
		const res = await get(url);
		record('Legacy redirect target', res.status === 200, `\`${url}\`: ${res.status}`);
	})
);

// Report
const rows = (/** @type {Array<Array<string|number>>} */ table) =>
	table.map((row) => `| ${row.join(' | ')} |`).join('\n');
const failures = [...results.values()].flatMap(({ failed }) => failed);
const report = [
	`## Deployment audit of \`${baseURL}\``,
	'',
	`Served by: ${origin(homeHeaders)}`,
	'',
	rows([
		['Check', 'Checked', 'Failed'],
		['---', '---:', '---:'],
		...[...results.entries()].map(([kind, { checked, failed }]) => [kind, checked, failed.length])
	]),
	''
];
if (failures.length > 0) {
	report.push('### Failures', '', ...failures.map((failure) => `- ${failure}`), '');
}
console.log(report.join('\n'));

if (failures.length > 0) {
	console.error(`Audit failed: ${failures.length} failed checks.`);
	process.exitCode = 1;
}
