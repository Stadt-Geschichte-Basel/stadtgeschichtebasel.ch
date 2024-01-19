import { expect, test } from '@playwright/test';
import { readdirSync } from 'fs';

const pages = readdirSync('src/pages').filter(
	(file) => file.endsWith('.md') && file !== 'startseite.md'
);

pages.forEach((page) => {
	const pageName = page.replace('.md', '');
	test(`Check ${pageName}`, async ({ page }) => {
		await page.goto(`/${pageName}`);
	});
});

test('Check navigation menu items', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('nav >> text=Startseite')).toBeVisible();
	await expect(page.locator('nav >> text=Agenda')).toBeVisible();
	await expect(page.locator('nav >> text=Bände')).toBeVisible();
	await expect(page.locator('nav >> text=Blog')).toBeVisible();
	await expect(page.locator('nav >> text=Partner')).toBeVisible();
	await expect(page.locator('nav >> text=Projekt')).toBeVisible();
	await expect(page.locator('nav >> text=Über uns')).toBeVisible();
});
