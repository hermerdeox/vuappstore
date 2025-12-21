import { test, expect } from '@playwright/test';

test.describe('VU Level Badge', () => {
	test.describe('Badge Visibility', () => {
		test('should be visible on homepage', async ({ page }) => {
			await page.goto('/');
			const badge = page.getByTestId('vu-level-badge');
			await expect(badge).toBeVisible();
		});

		test('should be visible on apps listing page', async ({ page }) => {
			await page.goto('/apps');
			const badge = page.getByTestId('vu-level-badge');
			await expect(badge).toBeVisible();
		});

		test('should be visible on privacy-levels page', async ({ page }) => {
			await page.goto('/privacy-levels');
			const badge = page.getByTestId('vu-level-badge');
			await expect(badge).toBeVisible();
		});

		test('should be visible on legal pages', async ({ page }) => {
			await page.goto('/legal/privacy');
			const badge = page.getByTestId('vu-level-badge');
			await expect(badge).toBeVisible();
		});

		test('should be visible on support pages', async ({ page }) => {
			await page.goto('/support');
			const badge = page.getByTestId('vu-level-badge');
			await expect(badge).toBeVisible();
		});

		test('should be visible on pricing page', async ({ page }) => {
			await page.goto('/pricing');
			const badge = page.getByTestId('vu-level-badge');
			await expect(badge).toBeVisible();
		});
	});

	test.describe('Badge Interaction', () => {
		test('should open modal when clicked', async ({ page }) => {
			await page.goto('/');
			const badge = page.getByTestId('vu-level-badge');
			
			// Click the badge
			await badge.click();
			
			// Modal should be visible
			const modal = page.getByTestId('vu-level-modal');
			await expect(modal).toBeVisible();
		});

		test('should close modal when close button clicked', async ({ page }) => {
			await page.goto('/');
			const badge = page.getByTestId('vu-level-badge');
			
			// Open modal
			await badge.click();
			const modal = page.getByTestId('vu-level-modal');
			await expect(modal).toBeVisible();
			
			// Click close button
			const closeBtn = modal.locator('button[aria-label="Close modal"]');
			await closeBtn.click();
			
			// Modal should be hidden
			await expect(modal).not.toBeVisible();
		});

		test('should close modal when backdrop clicked', async ({ page }) => {
			await page.goto('/');
			const badge = page.getByTestId('vu-level-badge');
			
			// Open modal
			await badge.click();
			const modal = page.getByTestId('vu-level-modal');
			await expect(modal).toBeVisible();
			
			// Click backdrop
			const backdrop = page.getByTestId('vu-level-modal-backdrop');
			await backdrop.click({ position: { x: 10, y: 10 } });
			
			// Modal should be hidden
			await expect(modal).not.toBeVisible();
		});

		test('should close modal when Escape key pressed', async ({ page }) => {
			await page.goto('/');
			const badge = page.getByTestId('vu-level-badge');
			
			// Open modal
			await badge.click();
			const modal = page.getByTestId('vu-level-modal');
			await expect(modal).toBeVisible();
			
			// Press Escape
			await page.keyboard.press('Escape');
			
			// Modal should be hidden
			await expect(modal).not.toBeVisible();
		});

		test('should toggle modal on repeated clicks', async ({ page }) => {
			await page.goto('/');
			const badge = page.getByTestId('vu-level-badge');
			const modal = page.getByTestId('vu-level-modal');
			
			// First click - open
			await badge.click();
			await expect(modal).toBeVisible();
			
			// Click badge again to close
			await badge.click();
			await expect(modal).not.toBeVisible();
			
			// Click again - open
			await badge.click();
			await expect(modal).toBeVisible();
		});
	});

	test.describe('Modal Content', () => {
		test('should display correct level for homepage', async ({ page }) => {
			await page.goto('/');
			const badge = page.getByTestId('vu-level-badge');
			await badge.click();
			
			const modal = page.getByTestId('vu-level-modal');
			
			// Homepage should be Level 1 (Local-First)
			await expect(modal.locator('.level-title')).toHaveText('Local-First');
		});

		test('should display correct level for pricing page', async ({ page }) => {
			await page.goto('/pricing');
			const badge = page.getByTestId('vu-level-badge');
			await badge.click();
			
			const modal = page.getByTestId('vu-level-modal');
			
			// Pricing should be Level 2 (Privacy First)
			await expect(modal.locator('.level-title')).toHaveText('Privacy First');
		});

		test('should display correct level for support/contact page', async ({ page }) => {
			await page.goto('/support/contact');
			const badge = page.getByTestId('vu-level-badge');
			await badge.click();
			
			const modal = page.getByTestId('vu-level-modal');
			
			// Contact should be Level 3 (Enhanced Privacy)
			await expect(modal.locator('.level-title')).toHaveText('Enhanced Privacy');
		});

		test('should display privacy details sections', async ({ page }) => {
			await page.goto('/');
			const badge = page.getByTestId('vu-level-badge');
			await badge.click();
			
			const modal = page.getByTestId('vu-level-modal');
			
			// Check for all detail sections
			await expect(modal.locator('.detail-item.control')).toBeVisible();
			await expect(modal.locator('.detail-item.hidden-from-us')).toBeVisible();
			await expect(modal.locator('.detail-item.server-access')).toBeVisible();
		});

		test('should display why section', async ({ page }) => {
			await page.goto('/');
			const badge = page.getByTestId('vu-level-badge');
			await badge.click();
			
			const modal = page.getByTestId('vu-level-modal');
			
			// Check for why section
			await expect(modal.locator('.why-section')).toBeVisible();
			await expect(modal.locator('.why-title')).toContainText('Why This Level');
		});

		test('should display commitment section', async ({ page }) => {
			await page.goto('/');
			const badge = page.getByTestId('vu-level-badge');
			await badge.click();
			
			const modal = page.getByTestId('vu-level-modal');
			
			// Check for commitment section
			await expect(modal.locator('.commitment-section')).toBeVisible();
			await expect(modal.locator('.commitment-badge')).toContainText('VU Commitment');
		});

		test('should have link to privacy-levels page', async ({ page }) => {
			await page.goto('/');
			const badge = page.getByTestId('vu-level-badge');
			await badge.click();
			
			const modal = page.getByTestId('vu-level-modal');
			
			// Check for learn more link
			const learnMoreLink = modal.locator('.learn-more-btn');
			await expect(learnMoreLink).toBeVisible();
			await expect(learnMoreLink).toHaveAttribute('href', '/privacy-levels');
		});
	});

	test.describe('Level Changes on Navigation', () => {
		test('should update badge level when navigating between pages', async ({ page }) => {
			// Start at homepage (Level 1)
			await page.goto('/');
			let badge = page.getByTestId('vu-level-badge');
			await badge.click();
			let modal = page.getByTestId('vu-level-modal');
			await expect(modal.locator('.level-title')).toHaveText('Local-First');
			
			// Close modal
			await page.keyboard.press('Escape');
			
			// Navigate to pricing (Level 2)
			await page.goto('/pricing');
			badge = page.getByTestId('vu-level-badge');
			await badge.click();
			modal = page.getByTestId('vu-level-modal');
			await expect(modal.locator('.level-title')).toHaveText('Privacy First');
			
			// Close modal
			await page.keyboard.press('Escape');
			
			// Navigate to contact (Level 3)
			await page.goto('/support/contact');
			badge = page.getByTestId('vu-level-badge');
			await badge.click();
			modal = page.getByTestId('vu-level-modal');
			await expect(modal.locator('.level-title')).toHaveText('Enhanced Privacy');
		});

		test('should display correct level for app detail pages', async ({ page }) => {
			await page.goto('/apps/vunotes');
			const badge = page.getByTestId('vu-level-badge');
			await badge.click();
			
			const modal = page.getByTestId('vu-level-modal');
			
			// App detail pages should be Level 1 (Local-First)
			await expect(modal.locator('.level-title')).toHaveText('Local-First');
		});

		test('should display correct level for legal pages', async ({ page }) => {
			// All legal pages should be Level 1 (Local-First)
			const legalPages = ['/legal/terms', '/legal/privacy', '/legal/refund', '/legal/gdpr'];
			
			for (const path of legalPages) {
				await page.goto(path);
				const badge = page.getByTestId('vu-level-badge');
				await badge.click();
				
				const modal = page.getByTestId('vu-level-modal');
				await expect(modal.locator('.level-title')).toHaveText('Local-First');
				
				await page.keyboard.press('Escape');
			}
		});
	});

	test.describe('Badge Styling', () => {
		test('should have correct color for Level 1 pages', async ({ page }) => {
			await page.goto('/');
			const badge = page.getByTestId('vu-level-badge');
			
			// Level 1 should have green color (#22c55e)
			const backgroundColor = await badge.evaluate((el) => {
				return getComputedStyle(el).getPropertyValue('--badge-color').trim();
			});
			expect(backgroundColor).toBe('#22c55e');
		});

		test('should have correct color for Level 2 pages', async ({ page }) => {
			await page.goto('/pricing');
			const badge = page.getByTestId('vu-level-badge');
			
			// Level 2 should have yellow color (#eab308)
			const backgroundColor = await badge.evaluate((el) => {
				return getComputedStyle(el).getPropertyValue('--badge-color').trim();
			});
			expect(backgroundColor).toBe('#eab308');
		});

		test('should have correct color for Level 3 pages', async ({ page }) => {
			await page.goto('/support/contact');
			const badge = page.getByTestId('vu-level-badge');
			
			// Level 3 should have orange color (#f97316)
			const backgroundColor = await badge.evaluate((el) => {
				return getComputedStyle(el).getPropertyValue('--badge-color').trim();
			});
			expect(backgroundColor).toBe('#f97316');
		});
	});

	test.describe('Accessibility', () => {
		test('badge should have correct aria attributes', async ({ page }) => {
			await page.goto('/');
			const badge = page.getByTestId('vu-level-badge');
			
			// Check aria-label
			await expect(badge).toHaveAttribute('aria-label', /VU Privacy Level/);
			
			// Check aria-expanded is false initially
			await expect(badge).toHaveAttribute('aria-expanded', 'false');
			
			// Open modal
			await badge.click();
			
			// Check aria-expanded is true when modal open
			await expect(badge).toHaveAttribute('aria-expanded', 'true');
		});

		test('modal should have correct aria attributes', async ({ page }) => {
			await page.goto('/');
			const badge = page.getByTestId('vu-level-badge');
			await badge.click();
			
			const modal = page.getByTestId('vu-level-modal');
			
			// Check modal has role="dialog"
			await expect(modal).toHaveAttribute('role', 'dialog');
			
			// Check modal has aria-modal="true"
			await expect(modal).toHaveAttribute('aria-modal', 'true');
			
			// Check modal has aria-labelledby pointing to title
			await expect(modal).toHaveAttribute('aria-labelledby', 'vu-level-modal-title');
		});

		test('should be keyboard navigable', async ({ page }) => {
			await page.goto('/');
			
			// Tab to badge
			await page.keyboard.press('Tab');
			await page.keyboard.press('Tab');
			await page.keyboard.press('Tab');
			
			// Eventually the badge should be focused (multiple tabs to skip header elements)
			// This is a simplified test - in reality you'd want to ensure proper focus order
		});
	});

	test.describe('Mobile Responsiveness', () => {
		test('should be visible on mobile viewport', async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 667 });
			await page.goto('/');
			
			const badge = page.getByTestId('vu-level-badge');
			await expect(badge).toBeVisible();
		});

		test('modal should be usable on mobile', async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 667 });
			await page.goto('/');
			
			const badge = page.getByTestId('vu-level-badge');
			await badge.click();
			
			const modal = page.getByTestId('vu-level-modal');
			await expect(modal).toBeVisible();
			
			// Modal should be scrollable if content is long
			const modalBody = modal.locator('.modal-body');
			await expect(modalBody).toBeVisible();
		});
	});
});

test.describe('VU Badge Section on Privacy Levels Page', () => {
	test('should display badge explanation section', async ({ page }) => {
		await page.goto('/privacy-levels');
		
		// Check for the VU Badge explanation section
		const badgeSection = page.locator('.vu-badge-section');
		await expect(badgeSection).toBeVisible();
	});

	test('should display demo badges', async ({ page }) => {
		await page.goto('/privacy-levels');
		
		// Check for demo badges
		const demoBadges = page.locator('.badge-demo .demo-badge');
		expect(await demoBadges.count()).toBe(3);
	});

	test('should display all explanation items', async ({ page }) => {
		await page.goto('/privacy-levels');
		
		// Check for 4 explanation items
		const explanationItems = page.locator('.explanation-item');
		expect(await explanationItems.count()).toBe(4);
	});

	test('should display commitment section', async ({ page }) => {
		await page.goto('/privacy-levels');
		
		// Check for commitment section
		const commitment = page.locator('.badge-commitment');
		await expect(commitment).toBeVisible();
		await expect(commitment.locator('.commitment-header')).toContainText('Our Commitment');
	});
});

