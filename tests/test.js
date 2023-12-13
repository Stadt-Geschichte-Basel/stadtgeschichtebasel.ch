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

test('agenda page has expected h1', async ({ page }) => {
	await page.goto('/agenda');
	await expect(page.getByRole('heading', { name: 'Agenda' })).toBeVisible();
});


test('Check if page loads correctly', async ({ page }) => {
	// Check if the title is correct
	await page.goto('/orte');
	await expect(page).toHaveTitle(/Orte/);
});

test('Check navigation menu items', async ({ page }) => {
	// Check if navigation menu items are present
	await page.goto('/');
	await expect(page.locator('nav >> text=Startseite')).toBeVisible();
	await expect(page.locator('nav >> text=Blog')).toBeVisible();
	// Add more checks for each menu item
});

test('datenschutzerklaerung has Datenschutzbeauftragte', async ({ page }) => {
	await page.goto('/datenschutzerklaerung');
	await expect(
		page.getByRole('heading', {
			name: 'Datenschutzbeauftragte der Stiftung Stadt.Geschichte.Basel'
		})
	).toBeVisible();
});
