import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

/**
 * Audits the published build: reports its size and checks its local references.
 * Usage: node src/lib/auditBuild.mjs [--strict] [buildDir]
 * With --strict, the script fails if a CMS image is published as more than one raster file,
 * if a reference to a CMS file is broken or if the build is larger than the GitHub Pages limit.
 */

/**
 * The URL of the published website.
 * @type {string}
 */
const siteURL = 'https://stadtgeschichtebasel.ch';

/**
 * The maximum size of a published GitHub Pages site, in bytes.
 * @type {number}
 * @see {@link https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits}
 */
const pagesLimitBytes = 1_000_000_000;

/**
 * Extensions of raster images.
 * @type {Array<string>}
 */
const rasterExtensions = ['avif', 'gif', 'jpeg', 'jpg', 'png', 'webp'];

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const buildDir = args.find((arg) => !arg.startsWith('--')) ?? 'build';

/**
 * Formats a number of bytes.
 * @param {number} bytes
 * @returns {string}
 */
function formatBytes(bytes) {
	const units = ['B', 'KB', 'MB', 'GB'];
	let i = 0;
	while (bytes >= 1024 && i < units.length - 1) {
		bytes /= 1024;
		i++;
	}
	return `${bytes.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

/**
 * Lists all files in a directory recursively.
 * @param {string} dir
 * @returns {Array<{file: string, size: number}>} Paths relative to the build directory.
 */
function listFiles(dir) {
	return fs
		.readdirSync(dir, { recursive: true, withFileTypes: true })
		.filter((entry) => entry.isFile())
		.map((entry) => {
			const absolute = path.join(entry.parentPath, entry.name);
			return { file: path.relative(buildDir, absolute), size: fs.statSync(absolute).size };
		});
}

/**
 * Returns the extension of a file without the dot, in lower case.
 * @param {string} file
 * @returns {string}
 */
function extension(file) {
	return path.extname(file).substring(1).toLowerCase();
}

/**
 * Returns the image a file is a variant of: without extension and without
 * WordPress (-300x200, -scaled, -rotated) and Jampack (@1100w) size suffixes.
 * @param {string} file
 * @returns {string}
 */
function canonicalImage(file) {
	return file
		.slice(0, -path.extname(file).length)
		.replace(/(?:-\d+x\d+|-scaled|-rotated|@\d+w)+$/, '');
}

/**
 * Checks if a local URL resolves to a file in the build.
 * @param {string} url - URL path, e.g. /blog/post or /files/2023/08/a.webp.
 * @returns {boolean}
 */
function exists(url) {
	const candidates = [url, decodeURI(url)].flatMap((p) => {
		const file = path.join(buildDir, p);
		return [file, `${file}.html`, path.join(file, 'index.html')];
	});
	return candidates.some((file) => fs.existsSync(file) && fs.statSync(file).isFile());
}

/**
 * Converts a reference to a local URL path, or returns null for external references.
 * @param {string} reference
 * @param {string} htmlFile - The file that contains the reference, relative to the build directory.
 * @returns {string|null}
 */
function localPath(reference, htmlFile) {
	let url = reference.trim();
	if (url.startsWith(siteURL)) url = url.slice(siteURL.length) || '/';
	if (!url || /^[a-z][a-z0-9+.-]*:|^\/\/|^#/i.test(url)) return null;
	url = url.split(/[?#]/)[0];
	return url.startsWith('/') ? url : path.posix.join('/', path.dirname(htmlFile), url);
}

const files = listFiles(buildDir);
const totalBytes = files.reduce((sum, { size }) => sum + size, 0);

// Size by extension
/** @type {Map<string, {count: number, bytes: number}>} */
const byExtension = new Map();
for (const { file, size } of files) {
	const entry = byExtension.get(extension(file)) ?? { count: 0, bytes: 0 };
	entry.count++;
	entry.bytes += size;
	byExtension.set(extension(file), entry);
}

// Raster files grouped by CMS image
const cmsImages = files.filter(
	({ file }) => file.startsWith(`files${path.sep}`) && rasterExtensions.includes(extension(file))
);
/** @type {Map<string, {files: Array<string>, bytes: number}>} */
const byImage = new Map();
for (const { file, size } of cmsImages) {
	const key = canonicalImage(file);
	const entry = byImage.get(key) ?? { files: [], bytes: 0 };
	entry.files.push(file);
	entry.bytes += size;
	byImage.set(key, entry);
}
const imagesWithVariants = [...byImage.entries()].filter(([, { files }]) => files.length > 1);

// Reference check
const kinds = ['img src', 'img srcset', 'meta image', 'CMS file link', 'page link'];
/** @type {Map<string, {checked: number, missing: Set<string>}>} */
const references = new Map(kinds.map((kind) => [kind, { checked: 0, missing: new Set() }]));
/**
 * Records a reference and whether it resolves.
 * @param {string} kind
 * @param {string|undefined} reference
 * @param {string} htmlFile
 */
function check(kind, reference, htmlFile) {
	const url = reference && localPath(reference, htmlFile);
	if (!url) return;
	const entry = references.get(kind);
	if (!entry) return;
	entry.checked++;
	if (!exists(url)) entry.missing.add(url);
}
for (const { file } of files.filter(({ file }) => extension(file) === 'html')) {
	const $ = cheerio.load(fs.readFileSync(path.join(buildDir, file), 'utf8'));
	$('img[src]').each((i, elem) => check('img src', $(elem).attr('src'), file));
	$('img[srcset], source[srcset]').each((i, elem) => {
		for (const candidate of ($(elem).attr('srcset') ?? '').split(',')) {
			check('img srcset', candidate.trim().split(/\s+/)[0], file);
		}
	});
	$('meta[property="og:image"], meta[property="twitter:image"], meta[name="twitter:image"]').each(
		(i, elem) => check('meta image', $(elem).attr('content'), file)
	);
	$('a[href]').each((i, elem) => {
		const href = $(elem).attr('href');
		const url = href && localPath(href, file);
		check(url?.startsWith('/files/') ? 'CMS file link' : 'page link', href, file);
	});
}
const missingCmsFiles = [...references.values()].flatMap(({ missing }) =>
	[...missing].filter((url) => url.startsWith('/files/'))
);

// Report
const rows = (/** @type {Array<Array<string|number>>} */ table) =>
	table.map((row) => `| ${row.join(' | ')} |`).join('\n');
const report = [
	`## Build audit of \`${buildDir}/\``,
	'',
	rows([
		['Metric', 'Value'],
		['---', '---:'],
		['Total size', formatBytes(totalBytes)],
		[
			'Share of the GitHub Pages limit (1 GB)',
			`${((totalBytes / pagesLimitBytes) * 100).toFixed(1)} %`
		],
		['Files', files.length],
		[
			'Size of `files/`',
			formatBytes(
				files
					.filter(({ file }) => file.startsWith(`files${path.sep}`))
					.reduce((s, f) => s + f.size, 0)
			)
		],
		['Raster files in `files/`', cmsImages.length],
		['CMS images', byImage.size],
		['CMS images with more than one raster file', imagesWithVariants.length]
	]),
	'',
	'### Files by type',
	'',
	rows([
		['Extension', 'Files', 'Size'],
		['---', '---:', '---:'],
		...[...byExtension.entries()]
			.sort(([, a], [, b]) => b.bytes - a.bytes)
			.map(([ext, { count, bytes }]) => [ext || '(none)', count, formatBytes(bytes)])
	]),
	'',
	'### Largest files',
	'',
	rows([
		['File', 'Size'],
		['---', '---:'],
		...[...files]
			.sort((a, b) => b.size - a.size)
			.slice(0, 15)
			.map(({ file, size }) => [`\`${file}\``, formatBytes(size)])
	]),
	'',
	'### Largest CMS images (all raster files of one image)',
	'',
	rows([
		['Image', 'Files', 'Size'],
		['---', '---:', '---:'],
		...[...byImage.entries()]
			.sort(([, a], [, b]) => b.bytes - a.bytes)
			.slice(0, 15)
			.map(([key, { files, bytes }]) => [`\`${key}\``, files.length, formatBytes(bytes)])
	]),
	'',
	'### References',
	'',
	rows([
		['Reference', 'Checked', 'Missing'],
		['---', '---:', '---:'],
		...[...references.entries()].map(([kind, { checked, missing }]) => [
			kind,
			checked,
			missing.size
		])
	]),
	''
];
if (missingCmsFiles.length > 0) {
	report.push('### Missing CMS files', '', ...missingCmsFiles.map((url) => `- \`${url}\``), '');
}
console.log(report.join('\n'));

const overPagesLimit = totalBytes > pagesLimitBytes;
if (strict && (imagesWithVariants.length > 0 || missingCmsFiles.length > 0 || overPagesLimit)) {
	console.error(
		`Audit failed: ${imagesWithVariants.length} CMS images with more than one raster file, ${missingCmsFiles.length} missing CMS files, build ${overPagesLimit ? 'above' : 'within'} the GitHub Pages limit.`
	);
	process.exitCode = 1;
}
