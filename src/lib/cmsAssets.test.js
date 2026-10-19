import { describe, expect, it } from 'vitest';
import { canonicalUrl, cmsAssetUrl, publicPath } from './cmsAssets.mjs';

describe('cmsAssetUrl', () => {
	it('keeps CMS upload URLs', () => {
		expect(cmsAssetUrl('https://sgb.hypotheses.org/files/2023/08/a.jpg')).toBe(
			'https://sgb.hypotheses.org/files/2023/08/a.jpg'
		);
	});

	it('maps uploads on the new website back to the CMS', () => {
		expect(cmsAssetUrl('https://stadtgeschichtebasel.ch/files/2023/08/a.pdf?x=1#p2')).toBe(
			'https://sgb.hypotheses.org/files/2023/08/a.pdf'
		);
	});

	it('returns null for external URLs and CMS pages', () => {
		expect(cmsAssetUrl('https://upload.wikimedia.org/files/a.jpg')).toBeNull();
		expect(cmsAssetUrl('https://sgb.hypotheses.org/2023/08/post')).toBeNull();
	});
});

describe('canonicalUrl', () => {
	it('removes WordPress size suffixes', () => {
		expect(canonicalUrl('https://sgb.hypotheses.org/files/2023/08/a-300x200.jpg')).toBe(
			'https://sgb.hypotheses.org/files/2023/08/a.jpg'
		);
		expect(canonicalUrl('https://sgb.hypotheses.org/files/2023/08/a-scaled.jpeg')).toBe(
			'https://sgb.hypotheses.org/files/2023/08/a.jpeg'
		);
		expect(canonicalUrl('https://sgb.hypotheses.org/files/2024/02/a-rotated.jpg')).toBe(
			'https://sgb.hypotheses.org/files/2024/02/a.jpg'
		);
	});

	it('keeps other suffixes', () => {
		expect(canonicalUrl('https://sgb.hypotheses.org/files/2023/08/a_4-1.jpg')).toBe(
			'https://sgb.hypotheses.org/files/2023/08/a_4-1.jpg'
		);
		expect(
			canonicalUrl('https://sgb.hypotheses.org/files/2023/08/a-e1691234567890-300x200.png')
		).toBe('https://sgb.hypotheses.org/files/2023/08/a-e1691234567890.png');
	});
});

describe('publicPath', () => {
	it('publishes raster images as WebP', () => {
		expect(publicPath('https://sgb.hypotheses.org/files/2023/08/a.jpg')).toBe(
			'/files/2023/08/a.webp'
		);
		expect(publicPath('https://sgb.hypotheses.org/files/2023/08/a.PNG')).toBe(
			'/files/2023/08/a.webp'
		);
	});

	it('publishes documents, SVG and GIF unchanged', () => {
		expect(publicPath('https://sgb.hypotheses.org/files/2023/08/a.pdf')).toBe(
			'/files/2023/08/a.pdf'
		);
		expect(publicPath('https://sgb.hypotheses.org/files/2023/08/a.svg')).toBe(
			'/files/2023/08/a.svg'
		);
		expect(publicPath('https://sgb.hypotheses.org/files/2023/08/a.gif')).toBe(
			'/files/2023/08/a.gif'
		);
	});
});
