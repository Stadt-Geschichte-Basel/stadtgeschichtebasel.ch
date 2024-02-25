import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { pipeline } from 'stream';

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

class DownloadManager {
	constructor() {
		this.activeDownloads = 0;
		this.downloadQueue = [];
		this.downloadedUrls = new Set();
	}

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

	nextDownload() {
		this.activeDownloads--;
		if (this.downloadQueue.length > 0) {
			const [url, staticDir] = this.downloadQueue.shift();
			this.enqueueDownload(url, staticDir);
		}
	}

	async download(url, staticDir, retries = MAX_RETRIES) {
		try {
			const { fileName, outputPath } = this.getFileNameAndPath(url, staticDir);
			await fs.promises.mkdir(outputPath, { recursive: true });
			const response = await fetch(url, { timeout: TIMEOUT });
			if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
			await pipelineAsync(response.body, fs.createWriteStream(path.join(outputPath, fileName)));
			console.log(`Downloaded ${url} to ${path.join(outputPath, fileName)}`);
		} catch (error) {
			if (retries > 0) {
				console.log(`Retrying download for ${url}. Retries left: ${retries - 1}`);
				await this.download(url, staticDir, retries - 1);
			} else {
				throw new Error(`Download failed for ${url} after ${MAX_RETRIES} retries`);
			}
		}
	}

	getFileNameAndPath(url, staticDir) {
		const parsedUrl = new URL(url);
		const fileName = path.basename(parsedUrl.pathname);
		const outputPath = path.join(staticDir, path.dirname(parsedUrl.pathname));
		if (!this.isAllowedExtension(fileName)) {
			throw new Error(`Unsupported file type for ${url}`);
		}
		return { fileName, outputPath };
	}

	isAllowedExtension(fileName) {
		const extension = path.extname(fileName).substring(1); // Remove the dot from extension
		return allowedExtensions.includes(extension);
	}
}

export default DownloadManager;
