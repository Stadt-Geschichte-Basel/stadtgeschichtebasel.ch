import { expect, test } from '@playwright/test';
import * as cheerio from 'cheerio';

// A blog post with a known DOI (see issue #231)
const slug =
	'radioserie-studierende-berichten-ueber-die-umnutzung-und-den-wandel-der-basler-kaserne';
const doi = '10.58079/15ee5';

test('Blog post exposes its DOI in the prerendered HTML', async ({ request }) => {
	// Fetch the raw HTML without a browser, so no JavaScript runs
	const response = await request.get(`/blog/${slug}`);
	expect(response.ok()).toBeTruthy();
	const $ = cheerio.load(await response.text());

	expect($('meta[name="citation_doi"]').attr('content')).toBe(doi);

	const graph = $('script[type="application/ld+json"]')
		.toArray()
		.flatMap((script) => JSON.parse($(script).text())['@graph'] ?? []);
	const blogPosting = graph.find((node) => node['@type'] === 'BlogPosting');
	expect(blogPosting?.identifier).toEqual({
		'@type': 'PropertyValue',
		propertyID: 'DOI',
		value: doi
	});
	expect(blogPosting?.sameAs).toBe(`https://doi.org/${doi}`);

	const doiLink = $(`article > footer a[href="https://doi.org/${doi}"]`);
	expect(doiLink.text()).toBe(doi);
	expect($('article hgroup').text()).not.toContain(doi);
});
