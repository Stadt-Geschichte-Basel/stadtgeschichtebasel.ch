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
	}

	async enqueueDownload(url, staticDir) {
		if (this.activeDownloads < MAX_CONCURRENT_DOWNLOADS) {
			this.activeDownloads++;
			this.download(url, staticDir).then(() => this.nextDownload());
		} else {
			this.downloadQueue.push([url, staticDir]);
		}
	}

	nextDownload() {
		this.activeDownloads--;
		if (this.downloadQueue.length > 0) {
			const [nextUrl, nextStaticDir] = this.downloadQueue.shift();
			this.enqueueDownload(nextUrl, nextStaticDir);
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
			console.error(`Error downloading ${url}: ${error}`);
			if (retries > 0) {
				console.log(`Retrying download for ${url}`);
				await this.download(url, staticDir, retries - 1);
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
		const extension = path.extname(fileName).substring(1);
		return allowedExtensions.includes(extension);
	}
}

export default DownloadManager;
