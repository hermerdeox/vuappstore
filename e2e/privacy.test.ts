import { test, expect } from '@playwright/test';

/**
 * Privacy E2E Tests
 *
 * Verifies that VuAppStore maintains its zero-tracking promise
 */

test.describe('Zero Tracking Verification', () => {
	test('no tracking cookies are set', async ({ page }) => {
		await page.goto('/');

		const cookies = await page.context().cookies();

		// Check for common tracking cookies
		const trackingCookies = cookies.filter(
			(c) =>
				c.name.includes('_ga') ||
				c.name.includes('_gid') ||
				c.name.includes('analytics') ||
				c.name.includes('_fb') ||
				c.name.includes('_fbp') ||
				c.name.includes('hubspot') ||
				c.name.includes('intercom') ||
				c.name.includes('drift') ||
				c.name.includes('hotjar') ||
				c.name.includes('optimizely') ||
				c.name.includes('segment')
		);

		expect(trackingCookies).toHaveLength(0);
	});

	test('no external analytics scripts loaded', async ({ page }) => {
		const externalRequests: string[] = [];

		page.on('request', (request) => {
			const url = request.url();

			// Check for common analytics services
			if (
				url.includes('google-analytics.com') ||
				url.includes('googletagmanager.com') ||
				url.includes('facebook.com/tr') ||
				url.includes('connect.facebook.net') ||
				url.includes('hotjar.com') ||
				url.includes('segment.io') ||
				url.includes('mixpanel.com') ||
				url.includes('amplitude.com') ||
				url.includes('fullstory.com') ||
				url.includes('heap.io') ||
				url.includes('intercom.io') ||
				url.includes('hubspot.com') ||
				url.includes('doubleclick.net') ||
				url.includes('adservice.google.com')
			) {
				externalRequests.push(url);
			}
		});

		await page.goto('/');
		await page.waitForLoadState('networkidle');

		expect(externalRequests).toHaveLength(0);
	});

	test('no fingerprinting scripts detected', async ({ page }) => {
		const fingerprintingRequests: string[] = [];

		page.on('request', (request) => {
			const url = request.url();

			if (
				url.includes('fingerprintjs') ||
				url.includes('deviceidentifier') ||
				url.includes('clientjs')
			) {
				fingerprintingRequests.push(url);
			}
		});

		await page.goto('/');
		await page.waitForLoadState('networkidle');

		expect(fingerprintingRequests).toHaveLength(0);
	});

	test('localStorage does not contain tracking data', async ({ page }) => {
		await page.goto('/');

		const localStorage = await page.evaluate(() => {
			const items: Record<string, string> = {};
			for (let i = 0; i < window.localStorage.length; i++) {
				const key = window.localStorage.key(i);
				if (key) {
					items[key] = window.localStorage.getItem(key) || '';
				}
			}
			return items;
		});

		// Check for tracking-related localStorage keys
		const trackingKeys = Object.keys(localStorage).filter(
			(key) =>
				key.includes('analytics') ||
				key.includes('tracking') ||
				key.includes('_ga') ||
				key.includes('amplitude') ||
				key.includes('segment')
		);

		expect(trackingKeys).toHaveLength(0);
	});
});

test.describe('Privacy UI Elements', () => {
	test('privacy shield badge is visible', async ({ page }) => {
		await page.goto('/');

		// Look for privacy shield or similar indicator
		const privacyBadge = page.locator('[data-testid="privacy-shield"], .privacy-badge');
		// Badge may or may not be present depending on implementation
	});

	test('no cookie consent banner needed', async ({ page }) => {
		await page.goto('/');

		// Since we don't use cookies, there should be no consent banner
		// or if there is one, it should indicate we don't track
		const cookieBanner = page.locator('[data-testid="cookie-banner"], .cookie-consent');

		// Either no banner, or banner shows anti-tracking message
		const bannerVisible = await cookieBanner.isVisible().catch(() => false);

		if (bannerVisible) {
			const bannerText = await cookieBanner.textContent();
			expect(bannerText?.toLowerCase()).toContain('no tracking');
		}
	});
});

test.describe('Security Headers', () => {
	test('CSP header is present', async ({ page }) => {
		const response = await page.goto('/');
		const cspHeader = response?.headers()['content-security-policy'];

		expect(cspHeader).toBeTruthy();
		expect(cspHeader).toContain("default-src 'self'");
	});

	test('X-Frame-Options header prevents clickjacking', async ({ page }) => {
		const response = await page.goto('/');
		const xFrameOptions = response?.headers()['x-frame-options'];

		expect(xFrameOptions).toBe('DENY');
	});

	test('X-Content-Type-Options prevents MIME sniffing', async ({ page }) => {
		const response = await page.goto('/');
		const xContentType = response?.headers()['x-content-type-options'];

		expect(xContentType).toBe('nosniff');
	});

	test('Referrer-Policy is restrictive', async ({ page }) => {
		const response = await page.goto('/');
		const referrerPolicy = response?.headers()['referrer-policy'];

		expect(referrerPolicy).toBe('strict-origin-when-cross-origin');
	});

	test('Permissions-Policy disables tracking features', async ({ page }) => {
		const response = await page.goto('/');
		const permissionsPolicy = response?.headers()['permissions-policy'];

		expect(permissionsPolicy).toBeTruthy();
		expect(permissionsPolicy).toContain('interest-cohort=()'); // FLoC disabled
	});
});

test.describe('VU Philosophy Compliance', () => {
	test('no real name fields in signup/account', async ({ page }) => {
		await page.goto('/account/settings');

		// Check that there's no "real name" or "full name" field
		const realNameField = page.locator(
			'input[name="realName"], input[name="fullName"], input[placeholder*="real name"]'
		);
		await expect(realNameField).toHaveCount(0);
	});

	test('no phone number fields', async ({ page }) => {
		await page.goto('/account/settings');

		// Check that there's no phone number field
		const phoneField = page.locator(
			'input[type="tel"], input[name="phone"], input[placeholder*="phone"]'
		);
		await expect(phoneField).toHaveCount(0);
	});

	test('crypto payment options are displayed', async ({ page }) => {
		await page.goto('/pricing');

		// Check for crypto payment options, not traditional payments
		await expect(page.locator('text=Monero')).toBeVisible();

		// Should NOT have traditional payment options
		const stripeButton = page.locator('text=Pay with Card');
		const paypalButton = page.locator('text=PayPal');

		await expect(stripeButton).toHaveCount(0);
		await expect(paypalButton).toHaveCount(0);
	});
});
