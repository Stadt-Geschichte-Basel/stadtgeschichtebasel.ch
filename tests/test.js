import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(
		page.getByRole('heading', { name: 'Wir schreiben Basler Geschichte.' })
	).toBeVisible();
});

test('ueber-uns page has expected h1', async ({ page }) => {
	await page.goto('/ueber-uns');
	await expect(page.getByRole('heading', { name: 'Über uns' })).toBeVisible();
});

test('agenda page has h3 elements', async ({ page }) => {
	await page.goto('/agenda');
	await expect(page.getByRole('heading', { level: 3 })).toBeVisible();
});

test('orte has select element', async ({ page }) => {
	await page.goto('/orte');
	await expect(page.getByRole('combobox')).toBeVisible();
});

test('datenschutzerklaerung has Datenschutzbeauftragte', async ({ page }) => {
	await page.goto('/datenschutzerklaerung');
	await expect(
		page.getByRole('heading', {
			name: 'Datenschutzbeauftragte der Stiftung Stadt.Geschichte.Basel'
		})
	).toBeVisible();
});
