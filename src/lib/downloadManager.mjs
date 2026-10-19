import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import sharp from 'sharp';
import {
	canonicalUrl,
	imageMaxWidth,
	imageQuality,
	isConverted,
	keepOriginal,
	publicPath
} from './cmsAssets.mjs';

const MAX_CONCURRENT_DOWNLOADS = 3;
const TIMEOUT = 60000; // 60 seconds
const MAX_RETRIES = 10;
const MAX_FAILED_DOWNLOADS = 3;
const allowedExtensions = [
	'avif',
	'doc',
	'docx',
	'gif',
	'jpeg',
	'jpg',
	'pdf',
	'png',
	'ppt',
	'pptx',
	'svg',
	'txt',
	'webp',
	'xls',
	'xlsx',
	'zip'
];

/**
 * Manages the downloading of CMS files with concurrency control.
 * Raster images are converted to one WebP file each; all other files are saved unchanged.
 */
class DownloadManager {
	/**
	 * Initializes a new instance of the DownloadManager.
	 * @param {string} staticDir - The directory where the files are saved.
	 */
	constructor(staticDir) {
		this.staticDir = staticDir;
		this.activeDownloads = 0;
		/** @type {Array<() => void>} */
		this.waitingDownloads = [];
		/** @type {Map<string, Promise<void>>} Downloads by canonical CMS URL. */
		this.downloads = new Map();
		/** @type {Map<string, string>} Canonical CMS URLs by public path. */
		this.publicPaths = new Map();
		this.convertedImages = 0;
		/** @type {Array<string>} */
		this.unchangedFiles = [];
		this.failedDownloads = 0;
	}

	/**
	 * Returns a promise that resolves when all downloads are complete.
	 * @returns {Promise<void>}
	 * @throws {Error} Throws an error if more than MAX_FAILED_DOWNLOADS downloads have failed.
	 */
	async waitForCompletion() {
		let count;
		do {
			count = this.downloads.size;
			await Promise.all(this.downloads.values());
		} while (count !== this.downloads.size);

		console.log(`Converted ${this.convertedImages} images to WebP.`);
		console.log(`Saved ${this.unchangedFiles.length} files unchanged:`);
		this.unchangedFiles.sort().forEach((file) => console.log(`  ${file}`));
		if (this.failedDownloads > MAX_FAILED_DOWNLOADS) {
			throw new Error(
				`Build failed: ${this.failedDownloads} resources could not be downloaded (threshold: ${MAX_FAILED_DOWNLOADS})`
			);
		}
	}

	/**
	 * Enqueues the download of a CMS file and returns the path under which the website publishes it.
	 * Each canonical URL is downloaded only once, also while it is queued or in flight.
	 * @param {string} url - The CMS URL of the file, possibly of a WordPress size variant.
	 * @returns {string|null} The public path, or null if the file type is unsupported.
	 */
	enqueueDownload(url) {
		if (!this.isAllowedExtension(url)) {
			console.error(`Unsupported file type for ${url}`);
			return null;
		}
		const source = canonicalUrl(url);
		const target = publicPath(source);
		if (!this.downloads.has(source)) {
			const otherSource = this.publicPaths.get(target);
			if (otherSource) {
				this.failedDownloads++;
				console.error(`Both ${otherSource} and ${source} are published as ${target}`);
			}
			this.publicPaths.set(target, source);
			this.downloads.set(
				source,
				this.limitConcurrency(() => this.download(source, url, target))
			);
		}
		return target;
	}

	/**
	 * Runs a task when fewer than MAX_CONCURRENT_DOWNLOADS tasks are active.
	 * @param {() => Promise<void>} task
	 * @returns {Promise<void>}
	 */
	async limitConcurrency(task) {
		if (this.activeDownloads < MAX_CONCURRENT_DOWNLOADS) {
			this.activeDownloads++;
		} else {
			await new Promise((resolve) => this.waitingDownloads.push(resolve));
		}
		try {
			await task();
		} finally {
			// Hand the slot to the next waiting task
			const next = this.waitingDownloads.shift();
			if (next) {
				next();
			} else {
				this.activeDownloads--;
			}
		}
	}

	/**
	 * Downloads a CMS file and saves it, converted to WebP if it is a raster image.
	 * If the canonical URL does not exist, the URL as referenced in the content is downloaded.
	 * @param {string} source - The canonical CMS URL.
	 * @param {string} referenced - The CMS URL as referenced in the content.
	 * @param {string} target - The public path.
	 */
	async download(source, referenced, target) {
		try {
			let response = await this.fetchWithRetries(source);
			if (response.status === 404 && referenced !== source) {
				console.log(`Falling back to ${referenced}`);
				response = await this.fetchWithRetries(referenced);
			}
			if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

			const data = Buffer.from(await response.arrayBuffer());
			const outputFile = path.join(this.staticDir, target);
			await fs.promises.mkdir(path.dirname(outputFile), { recursive: true });
			if (isConverted(source)) {
				await sharp(data)
					.rotate() // Apply the EXIF orientation, because the WebP file has no metadata
					// WebP supports at most 16383 pixels in each dimension
					.resize({
						width: imageMaxWidth,
						height: 16383,
						fit: 'inside',
						withoutEnlargement: true
					})
					.webp({ quality: imageQuality })
					.toFile(outputFile);
				this.convertedImages++;
			} else {
				await fs.promises.writeFile(outputFile, data);
				this.unchangedFiles.push(keepOriginal.has(target) ? `${target} (keepOriginal)` : target);
			}
			console.log(`Downloaded ${source} to ${outputFile}`);
		} catch (e) {
			this.failedDownloads++;
			console.error(
				`Download failed for ${source}: ${e.message} (${this.failedDownloads} total failures)`
			);
		}
	}

	/**
	 * Fetches a URL. Network errors and server errors are retried.
	 * @param {string} url - The URL to fetch.
	 * @param {number} [retries=MAX_RETRIES] - The number of retries.
	 * @returns {Promise<import('node-fetch').Response>}
	 */
	async fetchWithRetries(url, retries = MAX_RETRIES) {
		try {
			// node-fetch v3 has no timeout option, so abort with a signal
			const response = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) });
			if (response.status >= 500) throw new Error(`${response.status} ${response.statusText}`);
			return response;
		} catch (e) {
			if (retries <= 0) throw e;
			console.error(`Error: ${e.message}`);
			console.log(`Retrying download for ${url}. Retries left: ${retries - 1}`);
			return this.fetchWithRetries(url, retries - 1);
		}
	}

	/**
	 * Checks if the file extension is allowed.
	 * @param {string} url - The URL of the file.
	 * @returns {boolean} True if the extension is allowed, false otherwise.
	 */
	isAllowedExtension(url) {
		const extension = path.extname(new URL(url).pathname).substring(1).toLowerCase(); // Remove the dot from extension
		return allowedExtensions.includes(extension);
	}
}

export default DownloadManager;
