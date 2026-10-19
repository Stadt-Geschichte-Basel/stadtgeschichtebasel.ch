import fs from 'fs';
import fetch from 'node-fetch';
import os from 'os';
import path from 'path';
import sharp from 'sharp';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import DownloadManager from './downloadManager.mjs';

vi.mock('node-fetch', () => ({ default: vi.fn() }));

const fetchMock = /** @type {import('vitest').Mock} */ (/** @type {unknown} */ (fetch));

/** @type {string} */
let staticDir;

beforeEach(async () => {
	staticDir = fs.mkdtempSync(path.join(os.tmpdir(), 'download-manager-'));
	const png = await sharp({
		create: { width: 4, height: 2, channels: 3, background: '#3a1e3e' }
	})
		.png()
		.toBuffer();
	fetchMock.mockReset();
	fetchMock.mockImplementation(async () => new Response(new Uint8Array(png), { status: 200 }));
	vi.spyOn(console, 'log').mockImplementation(() => {});
	vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
	fs.rmSync(staticDir, { recursive: true, force: true });
	vi.restoreAllMocks();
});

describe('DownloadManager', () => {
	it('downloads each image once and publishes it as WebP', async () => {
		const manager = new DownloadManager(staticDir);
		expect(manager.enqueueDownload('https://sgb.hypotheses.org/files/2023/08/a-300x200.png')).toBe(
			'/files/2023/08/a.webp'
		);
		// The same image while its download is in flight
		expect(manager.enqueueDownload('https://sgb.hypotheses.org/files/2023/08/a.png')).toBe(
			'/files/2023/08/a.webp'
		);
		await manager.waitForCompletion();

		expect(fetchMock).toHaveBeenCalledTimes(1);
		expect(fetchMock.mock.calls[0][0]).toBe('https://sgb.hypotheses.org/files/2023/08/a.png');
		const meta = await sharp(path.join(staticDir, 'files/2023/08/a.webp')).metadata();
		expect(meta.format).toBe('webp');
		expect(manager.failedDownloads).toBe(0);
	});

	it('does not download a second file with the same public path', async () => {
		const manager = new DownloadManager(staticDir);
		expect(manager.enqueueDownload('https://sgb.hypotheses.org/files/2023/08/a.jpg')).toBe(
			'/files/2023/08/a.webp'
		);
		expect(manager.enqueueDownload('https://sgb.hypotheses.org/files/2023/08/a.png')).toBeNull();
		expect(manager.enqueueDownload('https://sgb.hypotheses.org/files/2023/08/a.png')).toBeNull();
		await manager.waitForCompletion();

		expect(fetchMock).toHaveBeenCalledTimes(1);
		expect(manager.failedDownloads).toBe(1);
	});
});
