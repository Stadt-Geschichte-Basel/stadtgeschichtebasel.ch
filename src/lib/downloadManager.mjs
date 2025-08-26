import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pipelineAsync = promisify(pipeline);

const MAX_CONCURRENT_DOWNLOADS = 3;
const TIMEOUT = 1500; // 1.5 seconds
const MAX_RETRIES = 10;
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
 * Manages the downloading of files with concurrency control.
 */
class DownloadManager {
	/**
	 * Initializes a new instance of the DownloadManager.
	 */
	constructor() {
		this.activeDownloads = 0;
		this.downloadQueue = [];
		this.downloadedUrls = new Set();
	}

	/**
	 * Returns a promise that resolves when all downloads are complete
	 * @returns {Promise<void>}
	 */
	async waitForCompletion() {
		return new Promise((resolve) => {
			const checkCompletion = () => {
				if (this.activeDownloads === 0 && this.downloadQueue.length === 0) {
					resolve();
				} else {
					setTimeout(checkCompletion, 100);
				}
			};
			checkCompletion();
		});
	}

	/**
	 * Enqueues a download task.
	 * @param {string} url - The URL to download.
	 * @param {string} staticDir - The directory where the file should be saved.
	 */
	enqueueDownload(url, staticDir) {
		if (this.downloadedUrls.has(url)) {
			console.log(`Skipping already downloaded URL: ${url}`);
			return;
		}

		if (this.activeDownloads < MAX_CONCURRENT_DOWNLOADS) {
			this.activeDownloads++;
			this.download(url, staticDir)
				.then(() => this.downloadedUrls.add(url))
				.catch((error) => {
					console.error(`Download failed: ${error}`);
				})
				.finally(() => this.nextDownload());
		} else {
			if (!this.downloadQueue.some((item) => item[0] === url)) {
				this.downloadQueue.push([url, staticDir]);
			}
		}
	}

	/**
	 * Processes the next download in the queue.
	 */
	nextDownload() {
		this.activeDownloads--;
		if (this.downloadQueue.length > 0) {
			const [url, staticDir] = this.downloadQueue.shift();
			this.enqueueDownload(url, staticDir);
		}
	}

	/**
	 * Downloads a file from the given URL.
	 * @param {string} url - The URL of the file to download.
	 * @param {string} staticDir - The directory to save the file.
	 * @param {number} [retries=MAX_RETRIES] - The number of retries for the download.
	 * @throws {Error} Throws an error if the download fails after the maximum retries.
	 */
	async download(url, staticDir, retries = MAX_RETRIES) {
		try {
			const { fileName, outputPath } = this.getFileNameAndPath(url, staticDir);
			await fs.promises.mkdir(outputPath, { recursive: true });
			const response = await fetch(url, { timeout: TIMEOUT });
			if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
			await pipelineAsync(response.body, fs.createWriteStream(path.join(outputPath, fileName)));
			console.log(`Downloaded ${url} to ${path.join(outputPath, fileName)}`);
		} catch (e) {
			if (retries > 0) {
				console.error(`Error: ${e.message}`);
				console.log(`Retrying download for ${url}. Retries left: ${retries - 1}`);
				await this.download(url, staticDir, retries - 1);
			} else {
				throw new Error(`Download failed for ${url} after ${MAX_RETRIES} retries`);
			}
		}
	}

	/**
	 * Parses the URL to get the filename and output path.
	 * @param {string} url - The URL to parse.
	 * @param {string} staticDir - The base directory for the output path.
	 * @returns {{fileName: string, outputPath: string}} An object with the filename and outputPath.
	 * @throws {Error} Throws an error if the file type is unsupported.
	 */
	getFileNameAndPath(url, staticDir) {
		const parsedUrl = new URL(url);
		const fileName = path.basename(parsedUrl.pathname);
		const outputPath = path.join(staticDir, path.dirname(parsedUrl.pathname));
		if (!this.isAllowedExtension(fileName)) {
			throw new Error(`Unsupported file type for ${url}`);
		}
		return { fileName, outputPath };
	}

	/**
	 * Checks if the file extension is allowed.
	 * @param {string} fileName - The name of the file.
	 * @returns {boolean} True if the extension is allowed, false otherwise.
	 */
	isAllowedExtension(fileName) {
		const extension = path.extname(fileName).substring(1); // Remove the dot from extension
		return allowedExtensions.includes(extension);
	}
}

export default DownloadManager;
