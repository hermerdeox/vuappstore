import { test, expect } from '@playwright/test';

/**
 * Navigation E2E Tests
 *
 * Tests that all routes are accessible and load correctly
 */

test.describe('Core Navigation', () => {
	test('homepage loads correctly', async ({ page }) => {
		await page.goto('/');
		await expect(page).toHaveTitle(/VU/);
		// Check for main content
		await expect(page.locator('body')).toBeVisible();
	});

	test('apps catalog page loads', async ({ page }) => {
		await page.goto('/apps');
		await expect(page).toHaveURL(/.*apps/);
	});

	test('pricing page loads with crypto options', async ({ page }) => {
		await page.goto('/pricing');
		// Check for crypto payment options
		await expect(page.locator('text=Monero')).toBeVisible();
		await expect(page.locator('text=Lightning')).toBeVisible();
	});

	test('privacy levels page loads', async ({ page }) => {
		await page.goto('/privacy-levels');
		await expect(page).toHaveURL(/.*privacy-levels/);
	});
});

test.describe('Account Routes', () => {
	test('account page loads', async ({ page }) => {
		await page.goto('/account');
		await expect(page).toHaveURL(/.*account/);
	});

	test('downloads page loads', async ({ page }) => {
		await page.goto('/account/downloads');
		await expect(page).toHaveURL(/.*downloads/);
	});

	test('subscriptions page loads', async ({ page }) => {
		await page.goto('/account/subscriptions');
		await expect(page).toHaveURL(/.*subscriptions/);
	});

	test('settings page loads', async ({ page }) => {
		await page.goto('/account/settings');
		await expect(page).toHaveURL(/.*settings/);
	});
});

test.describe('Legal Routes', () => {
	test('terms page loads', async ({ page }) => {
		await page.goto('/legal/terms');
		await expect(page).toHaveURL(/.*terms/);
	});

	test('privacy policy page loads', async ({ page }) => {
		await page.goto('/legal/privacy');
		await expect(page).toHaveURL(/.*privacy/);
	});

	test('refund policy page loads', async ({ page }) => {
		await page.goto('/legal/refund');
		await expect(page).toHaveURL(/.*refund/);
	});

	test('GDPR page loads', async ({ page }) => {
		await page.goto('/legal/gdpr');
		await expect(page).toHaveURL(/.*gdpr/);
	});

	test('CCPA page loads', async ({ page }) => {
		await page.goto('/legal/ccpa');
		await expect(page).toHaveURL(/.*ccpa/);
	});
});

test.describe('Support Routes', () => {
	test('support page loads', async ({ page }) => {
		await page.goto('/support');
		await expect(page).toHaveURL(/.*support/);
	});

	test('FAQ page loads', async ({ page }) => {
		await page.goto('/support/faq');
		await expect(page).toHaveURL(/.*faq/);
	});

	test('contact page loads', async ({ page }) => {
		await page.goto('/support/contact');
		await expect(page).toHaveURL(/.*contact/);
	});
});

test.describe('About Routes', () => {
	test('about page loads', async ({ page }) => {
		await page.goto('/about');
		await expect(page).toHaveURL(/.*about/);
	});

	test('mission page loads', async ({ page }) => {
		await page.goto('/about/mission');
		await expect(page).toHaveURL(/.*mission/);
	});

	test('team page loads', async ({ page }) => {
		await page.goto('/about/team');
		await expect(page).toHaveURL(/.*team/);
	});
});

test.describe('Developer Routes', () => {
	test('developers portal loads', async ({ page }) => {
		await page.goto('/developers');
		await expect(page).toHaveURL(/.*developers/);
	});

	test('API docs page loads', async ({ page }) => {
		await page.goto('/developers/api');
		await expect(page).toHaveURL(/.*api/);
	});

	test('bug bounty page loads', async ({ page }) => {
		await page.goto('/developers/bug-bounty');
		await expect(page).toHaveURL(/.*bug-bounty/);
	});
});
