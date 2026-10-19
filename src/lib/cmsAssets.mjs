import path from 'path';

/**
 * The base URL of the website.
 * @type {string}
 */
export const baseURL = 'https://sgb.hypotheses.org/';

/**
 * The new URL of the website.
 * @type {string}
 */
export const newURL = 'https://stadtgeschichtebasel.ch/';

/**
 * The path under which the CMS publishes uploaded files. The website publishes them under the same path.
 * @type {string}
 */
const filesPath = 'files/';

/**
 * Extensions of raster images that are converted to one WebP file each.
 * @type {Array<string>}
 */
const rasterExtensions = ['jpeg', 'jpg', 'png', 'webp'];

/**
 * Public paths of raster images that are published unchanged, e.g. originals needed for zoom or download.
 * SVG, GIF (possibly animated) and documents are always published unchanged.
 * @type {Set<string>}
 */
export const keepOriginal = new Set([]);

/**
 * The maximum width in pixels of the converted images.
 * @type {number}
 */
export const imageMaxWidth = Number(process.env.CMS_IMAGE_MAX_WIDTH) || 1600;

/**
 * The WebP quality (1–100) of the converted images.
 * @type {number}
 */
export const imageQuality = Number(process.env.CMS_IMAGE_QUALITY) || 80;

/**
 * Returns the CMS URL of an uploaded file, or null if the URL does not point to an uploaded file.
 * Links to uploaded files on the new website are mapped back to the CMS.
 * @param {string} url
 * @returns {string|null}
 */
export function cmsAssetUrl(url) {
	for (const prefix of [baseURL, newURL]) {
		if (url.startsWith(prefix + filesPath)) {
			return baseURL + url.slice(prefix.length).split(/[?#]/)[0];
		}
	}
	return null;
}

/**
 * Removes the WordPress size suffixes (e.g. -300x200, -scaled, -rotated) from the URL of an uploaded image.
 * @param {string} url
 * @returns {string}
 */
export function canonicalUrl(url) {
	return url.replace(/(?:-\d+x\d+|-scaled|-rotated)+(\.[a-z0-9]+)$/i, '$1');
}

/**
 * Checks if the uploaded file is converted to WebP.
 * @param {string} url - CMS URL of the file.
 * @returns {boolean}
 */
export function isConverted(url) {
	const extension = path.extname(url).substring(1).toLowerCase();
	return rasterExtensions.includes(extension) && !keepOriginal.has(originalPath(url));
}

/**
 * Returns the path of the uploaded file on the CMS, which is also its path on the website.
 * @param {string} url - CMS URL of the file.
 * @returns {string}
 */
function originalPath(url) {
	return new URL(url).pathname;
}

/**
 * Returns the path under which the website publishes the uploaded file.
 * @param {string} url - CMS URL of the file.
 * @returns {string}
 */
export function publicPath(url) {
	const pathname = originalPath(url);
	if (!isConverted(url)) {
		return pathname;
	}
	return pathname.slice(0, -path.extname(pathname).length) + '.webp';
}
