<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import {
		Shield,
		Eye,
		Lock,
		CheckCircle,
		X,
		Cookie,
		BarChart3,
		EyeOff,
		DollarSign,
		ChevronDown,
		ChevronUp,
		AlertTriangle
	} from 'lucide-svelte';

	let showBanner = false;
	let isMinimized = false;
	let addonDetected = false;
	let cookieCleanupCount = 0;

	// Real-time privacy checks
	let privacyChecks = {
		cookies: 0,
		analytics: 0,
		tracking: 0,
		dataSold: 0,
		addonsBlocked: 0
	};

	// Cleanup interval references
	let cookieWatcherInterval: ReturnType<typeof setInterval> | null = null;
	let auditInterval: ReturnType<typeof setInterval> | null = null;
	let addonCheckInterval: ReturnType<typeof setInterval> | null = null;

	// ============================================
	// AGGRESSIVE COOKIE REMOVAL
	// ============================================

	/**
	 * Remove ALL cookies - no exceptions
	 * Runs continuously to catch any cookies set by extensions or scripts
	 */
	function nukeAllCookies(): number {
		if (typeof document === 'undefined') return 0;

		let removedCount = 0;
		const cookies = document.cookie.split(';');

		for (const cookie of cookies) {
			const eqPos = cookie.indexOf('=');
			const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();

			if (!name) continue;

			// Remove from all possible paths and domains
			const paths = ['/', '/app', '/api', '/account', '/legal'];
			const domains = [
				'',
				window.location.hostname,
				'.' + window.location.hostname,
				window.location.hostname.split('.').slice(-2).join('.')
			];

			for (const path of paths) {
				for (const domain of domains) {
					const domainPart = domain ? `; domain=${domain}` : '';
					document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}${domainPart}`;
					document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}${domainPart}; secure`;
					document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}${domainPart}; samesite=strict`;
				}
			}

			removedCount++;
		}

		return removedCount;
	}

	/**
	 * Continuous cookie watcher - runs every 100ms
	 */
	function startCookieWatcher() {
		// Initial nuke
		const initialRemoved = nukeAllCookies();
		if (initialRemoved > 0) {
			cookieCleanupCount += initialRemoved;
			console.log(`🍪 [VU PRIVACY] Removed ${initialRemoved} initial cookies`);
		}

		// Continuous monitoring
		cookieWatcherInterval = setInterval(() => {
			const cookiesBefore = document.cookie.split(';').filter((c) => c.trim()).length;

			if (cookiesBefore > 0) {
				const removed = nukeAllCookies();
				cookieCleanupCount += removed;
				console.warn(`🚨 [VU PRIVACY] Intercepted & removed ${removed} cookie(s)!`);
			}
		}, 100);
	}

	// ============================================
	// BROWSER ADDON/EXTENSION PROTECTION
	// ============================================

	/**
	 * Detect and neutralize common tracking extensions
	 */
	function detectAndBlockAddons(): { detected: boolean; blocked: number } {
		if (typeof window === 'undefined') return { detected: false, blocked: 0 };

		let detectedCount = 0;
		let blockedCount = 0;

		// Common extension injection patterns to detect
		const suspiciousPatterns = [
			// Analytics injections
			'__ga',
			'_gaq',
			'_gat',
			'ga.',
			'gtag',
			'dataLayer',
			'_fbq',
			'fbq',
			'__fb',
			'_hjSettings',
			'_hjid',
			'mixpanel',
			'amplitude',
			'heap',
			'segment',
			'_satellite',
			'optimizely',
			'_clck',
			'_clsk',
			'clarity',
			// Extension-specific globals
			'__REACT_DEVTOOLS_GLOBAL_HOOK__',
			'__VUE_DEVTOOLS_GLOBAL_HOOK__',
			'__GRAMMARLY_EXTENSION__',
			'__HONEY_EXTENSION__',
			'__RAKUTEN__',
			'__UBLOCK__',
			// Generic tracking
			'_trackEvent',
			'_trackPageview',
			'sendBeacon'
		];

		// Check for suspicious global variables
		for (const pattern of suspiciousPatterns) {
			if (pattern in window) {
				detectedCount++;

				// Attempt to neutralize (make it a no-op)
				try {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					const win = window as any;
					if (typeof win[pattern] === 'function') {
						win[pattern] = () => {
							console.log(`🛡️ [VU PRIVACY] Blocked call to ${pattern}`);
						};
						blockedCount++;
					} else if (typeof win[pattern] === 'object' && win[pattern] !== null) {
						// Freeze tracking objects to prevent them from working
						Object.freeze(win[pattern]);
						blockedCount++;
					}
				} catch {
					// Some properties are read-only, that's fine
				}
			}
		}

		// Block common analytics functions
		try {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const win = window as any;

			// Google Analytics
			win.ga = () => console.log('🛡️ [VU PRIVACY] Blocked ga()');
			win.gtag = () => console.log('🛡️ [VU PRIVACY] Blocked gtag()');

			// Facebook
			win.fbq = () => console.log('🛡️ [VU PRIVACY] Blocked fbq()');

			// Generic
			win._trackEvent = () => console.log('🛡️ [VU PRIVACY] Blocked _trackEvent()');
			win._trackPageview = () => console.log('🛡️ [VU PRIVACY] Blocked _trackPageview()');
		} catch {
			// Silently fail
		}

		// Detect extension content scripts via DOM elements
		const suspiciousDOMElements = document.querySelectorAll(
			'[data-extension], [data-grammarly], [data-honey], [data-rakuten], [data-gtm], [data-ga]'
		);
		if (suspiciousDOMElements.length > 0) {
			detectedCount += suspiciousDOMElements.length;

			// Remove suspicious elements
			suspiciousDOMElements.forEach((el) => {
				el.remove();
				blockedCount++;
			});
		}

		// Monitor for injected scripts from extensions
		const scripts = document.querySelectorAll('script:not([src^="/"]):not([src^="http"])');
		scripts.forEach((script) => {
			const src = script.getAttribute('src');
			if (
				src &&
				(src.includes('chrome-extension://') ||
					src.includes('moz-extension://') ||
					src.includes('safari-extension://'))
			) {
				detectedCount++;
				script.remove();
				blockedCount++;
				console.warn(`🛡️ [VU PRIVACY] Removed extension script: ${src}`);
			}
		});

		return { detected: detectedCount > 0, blocked: blockedCount };
	}

	/**
	 * Override navigator properties to prevent fingerprinting
	 */
	function protectNavigator() {
		if (typeof window === 'undefined') return;

		try {
			// Override properties that can be used for fingerprinting
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const nav = navigator as any;

			// Prevent battery API fingerprinting
			if ('getBattery' in navigator) {
				Object.defineProperty(navigator, 'getBattery', {
					value: () =>
						Promise.resolve({
							charging: true,
							chargingTime: Infinity,
							dischargingTime: Infinity,
							level: 1
						})
				});
			}

			// Prevent device memory fingerprinting
			if ('deviceMemory' in navigator) {
				Object.defineProperty(navigator, 'deviceMemory', {
					value: 8, // Generic value
					writable: false
				});
			}

			// Prevent hardware concurrency fingerprinting
			Object.defineProperty(navigator, 'hardwareConcurrency', {
				value: 4, // Generic value
				writable: false
			});

			// Prevent webdriver detection
			Object.defineProperty(navigator, 'webdriver', {
				value: false,
				writable: false
			});

			// Block sendBeacon for tracking
			const originalSendBeacon = navigator.sendBeacon;
			Object.defineProperty(navigator, 'sendBeacon', {
				value: (url: string, data: unknown) => {
					// Only allow sendBeacon to our own domain
					if (url.startsWith('/') || url.includes(window.location.hostname)) {
						return originalSendBeacon.call(navigator, url, data);
					}
					console.log(`🛡️ [VU PRIVACY] Blocked sendBeacon to: ${url}`);
					return false;
				}
			});
		} catch {
			// Some browsers may not allow these modifications
		}
	}

	/**
	 * Clean up localStorage and sessionStorage from tracking data
	 */
	function cleanupStorage() {
		const trackingKeys = [
			// Analytics
			'_ga',
			'_gid',
			'_gat',
			'__ga',
			'amp_',
			'_fbp',
			'_fbc',
			'fbp',
			'fbc',
			// Marketing
			'mixpanel',
			'amplitude',
			'heap',
			'segment',
			'rudder',
			// Session recording
			'_hjid',
			'_hjSession',
			'_hjAbsoluteSession',
			'_clarity',
			'_clck',
			'_clsk',
			// A/B testing
			'optimizely',
			'vwo_',
			'_vis_opt',
			// Generic tracking
			'mp_',
			'intercom',
			'drift',
			'hubspot',
			'_uc',
			'__anon'
		];

		// Clean localStorage
		for (const key of Object.keys(localStorage)) {
			if (
				!key.startsWith('vu-') &&
				!key.startsWith('VuSovereign') &&
				trackingKeys.some((pattern) => key.toLowerCase().includes(pattern.toLowerCase()))
			) {
				localStorage.removeItem(key);
				console.log(`🧹 [VU PRIVACY] Removed localStorage key: ${key}`);
			}
		}

		// Clean sessionStorage
		for (const key of Object.keys(sessionStorage)) {
			if (
				!key.startsWith('vu-') &&
				!key.startsWith('VuSovereign') &&
				trackingKeys.some((pattern) => key.toLowerCase().includes(pattern.toLowerCase()))
			) {
				sessionStorage.removeItem(key);
				console.log(`🧹 [VU PRIVACY] Removed sessionStorage key: ${key}`);
			}
		}
	}

	/**
	 * Block tracking requests via fetch/XHR interception
	 */
	function interceptNetworkRequests() {
		if (typeof window === 'undefined') return;

		const blockedDomains = [
			'google-analytics.com',
			'googletagmanager.com',
			'doubleclick.net',
			'facebook.com',
			'facebook.net',
			'fbcdn.net',
			'analytics.google.com',
			'hotjar.com',
			'mixpanel.com',
			'segment.com',
			'segment.io',
			'amplitude.com',
			'heap.io',
			'heapanalytics.com',
			'fullstory.com',
			'clarity.ms',
			'bing.com/bat',
			'bat.bing.com',
			'connect.facebook.net',
			'pixel.facebook.com',
			'analytics.tiktok.com',
			'ads.linkedin.com',
			'snap.licdn.com',
			'tr.snapchat.com'
		];

		// Intercept fetch
		const originalFetch = window.fetch;
		window.fetch = async (input, init) => {
			const url = typeof input === 'string' ? input : input instanceof Request ? input.url : '';

			if (blockedDomains.some((domain) => url.includes(domain))) {
				console.log(`🛡️ [VU PRIVACY] Blocked fetch to: ${url}`);
				return new Response(null, { status: 204 });
			}

			return originalFetch(input, init);
		};

		// Intercept XMLHttpRequest
		const originalOpen = XMLHttpRequest.prototype.open;
		XMLHttpRequest.prototype.open = function (method: string, url: string, ...rest: unknown[]) {
			if (blockedDomains.some((domain) => url.includes(domain))) {
				console.log(`🛡️ [VU PRIVACY] Blocked XHR to: ${url}`);
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				return originalOpen.call(this, method, 'about:blank', ...(rest as any));
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			return originalOpen.call(this, method, url, ...(rest as any));
		};
	}

	// ============================================
	// PRIVACY AUDIT
	// ============================================

	function performPrivacyAudit() {
		// Check for actual cookies
		const cookies = document.cookie
			? document.cookie.split(';').filter((c) => c.trim() !== '')
			: [];
		privacyChecks.cookies = cookies.length;

		// Check for common analytics/tracking scripts
		const scripts = Array.from(document.getElementsByTagName('script'));
		const trackingDomains = [
			'google-analytics.com',
			'googletagmanager.com',
			'facebook.com',
			'doubleclick.net',
			'hotjar.com',
			'mixpanel.com',
			'segment.com',
			'amplitude.com',
			'heap.io',
			'fullstory.com',
			'clarity.ms',
			'analytics.google.com'
		];

		let analyticsFound = 0;
		let trackingFound = 0;

		scripts.forEach((script) => {
			if (script.src) {
				trackingDomains.forEach((domain) => {
					if (script.src.includes(domain)) {
						if (
							domain.includes('analytics') ||
							domain.includes('heap') ||
							domain.includes('mixpanel')
						) {
							analyticsFound++;
						} else {
							trackingFound++;
						}
					}
				});
			}
		});

		// Check for tracking pixels (images from tracking domains)
		const images = Array.from(document.getElementsByTagName('img'));
		images.forEach((img) => {
			if (img.src) {
				trackingDomains.forEach((domain) => {
					if (img.src.includes(domain)) {
						trackingFound++;
					}
				});
			}
		});

		// Run addon detection
		const addonResult = detectAndBlockAddons();
		addonDetected = addonResult.detected;
		privacyChecks.addonsBlocked = addonResult.blocked;

		privacyChecks.analytics = analyticsFound;
		privacyChecks.tracking = trackingFound;
		// Data selling can't be technically detected, but we know VU doesn't sell data
		privacyChecks.dataSold = 0;
	}

	// ============================================
	// LIFECYCLE
	// ============================================

	onMount(() => {
		// 1. Start aggressive cookie watcher
		startCookieWatcher();

		// 2. Protect navigator APIs from fingerprinting
		protectNavigator();

		// 3. Intercept network requests to tracking domains
		interceptNetworkRequests();

		// 4. Clean up storage
		cleanupStorage();

		// 5. Initial privacy audit
		performPrivacyAudit();

		// 6. Re-check periodically
		auditInterval = setInterval(performPrivacyAudit, 5000);

		// 7. Check for addons more frequently
		addonCheckInterval = setInterval(() => {
			detectAndBlockAddons();
			cleanupStorage();
		}, 2000);

		// 8. Show banner
		const dismissed = localStorage.getItem('vu-privacy-banner-dismissed');
		if (!dismissed) {
			setTimeout(() => {
				showBanner = true;
			}, 1500);
		}

		console.log('🛡️ [VU PRIVACY] Zero-cookie protection ACTIVE');
		console.log('🛡️ [VU PRIVACY] Browser addon protection ACTIVE');
		console.log('🛡️ [VU PRIVACY] Tracking request interception ACTIVE');
		console.log('🛡️ [VU PRIVACY] Fingerprint protection ACTIVE');
	});

	onDestroy(() => {
		if (cookieWatcherInterval) clearInterval(cookieWatcherInterval);
		if (auditInterval) clearInterval(auditInterval);
		if (addonCheckInterval) clearInterval(addonCheckInterval);
	});

	function dismiss() {
		showBanner = false;
		localStorage.setItem('vu-privacy-banner-dismissed', 'true');
	}

	function minimize() {
		isMinimized = !isMinimized;
	}

	// Helper function to display check value
	function getCheckDisplay(value: number): string {
		return value === 0 ? 'ZERO' : value.toString();
	}

	// Helper function to get color based on value
	function getCheckColor(value: number): string {
		return value === 0 ? 'fact-value' : 'fact-value-warning';
	}
</script>

{#if showBanner}
	<div
		class="anti-cookie-banner {isMinimized ? 'minimized' : ''}"
		in:fly={{ y: 50, duration: 500 }}
		out:fade={{ duration: 300 }}
	>
		{#if !isMinimized}
			<div class="banner-content">
				<div class="banner-header">
					<div class="banner-icon">
						<Shield class="w-8 h-8 text-success" />
					</div>
					<div class="banner-text">
						<h3 class="text-lg font-bold text-text-primary flex items-center gap-2">
							<Shield class="w-5 h-5" /> No Cookies Here!
							<span class="badge-zero">ZERO TRACKING</span>
						</h3>
						<p class="text-sm text-text-secondary mt-1">
							VU apps don't use cookies, trackers, or analytics. Your data stays on YOUR device.
							Period.
						</p>
						{#if addonDetected}
							<p class="text-xs text-amber-400 mt-1 flex items-center gap-1">
								<AlertTriangle class="w-3 h-3" />
								Browser addon tracking blocked ({privacyChecks.addonsBlocked} neutralized)
							</p>
						{/if}
						{#if cookieCleanupCount > 0}
							<p class="text-xs text-green-400 mt-1">
								🧹 Cleaned {cookieCleanupCount} cookies set by external sources
							</p>
						{/if}
					</div>
					<button class="btn-minimize" on:click={minimize} aria-label="Minimize">
						{#if isMinimized}
							<ChevronUp class="w-4 h-4" />
						{:else}
							<ChevronDown class="w-4 h-4" />
						{/if}
					</button>
					<button class="btn-close" on:click={dismiss} aria-label="Close">
						<X class="w-4 h-4" />
					</button>
				</div>

				<div class="privacy-facts">
					<div class="fact-grid">
						<div class="fact-item">
							<span class="fact-icon">
								<Cookie class="w-5 h-5" />
							</span>
							<span class="fact-label">Cookies</span>
							<span class={getCheckColor(privacyChecks.cookies)}
								>{getCheckDisplay(privacyChecks.cookies)}</span
							>
						</div>
						<div class="fact-item">
							<span class="fact-icon">
								<BarChart3 class="w-5 h-5" />
							</span>
							<span class="fact-label">Analytics</span>
							<span class={getCheckColor(privacyChecks.analytics)}
								>{getCheckDisplay(privacyChecks.analytics)}</span
							>
						</div>
						<div class="fact-item">
							<span class="fact-icon">
								<EyeOff class="w-5 h-5" />
							</span>
							<span class="fact-label">Tracking</span>
							<span class={getCheckColor(privacyChecks.tracking)}
								>{getCheckDisplay(privacyChecks.tracking)}</span
							>
						</div>
						<div class="fact-item">
							<span class="fact-icon">
								<DollarSign class="w-5 h-5" />
							</span>
							<span class="fact-label">Data Sold</span>
							<span class={getCheckColor(privacyChecks.dataSold)}
								>{getCheckDisplay(privacyChecks.dataSold)}</span
							>
						</div>
					</div>
				</div>

				<div class="banner-actions">
					<button class="btn-primary" on:click={dismiss}>
						<CheckCircle class="w-4 h-4" />
						Nice! Show me the apps →
					</button>
					<button
						class="btn-secondary"
						on:click={() => window.dispatchEvent(new CustomEvent('openPrivacyInspector'))}
					>
						<Eye class="w-4 h-4" />
						Verify Yourself
					</button>
				</div>
			</div>
		{:else}
			<button class="minimized-content" on:click={minimize}>
				<Shield class="w-5 h-5 text-success" />
				<span>Zero Cookies Active</span>
				<svg class="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
				</svg>
			</button>
		{/if}
	</div>
{/if}

<style>
	.anti-cookie-banner {
		position: fixed;
		bottom: 20px;
		right: 20px;
		max-width: 480px;
		background: linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 20, 40, 0.95) 100%);
		border: 1px solid rgba(0, 212, 255, 0.3);
		border-radius: 16px;
		box-shadow:
			0 20px 40px rgba(0, 0, 0, 0.5),
			0 0 80px rgba(0, 212, 255, 0.1),
			inset 0 0 20px rgba(0, 212, 255, 0.05);
		z-index: 1000;
		backdrop-filter: blur(20px);
		overflow: hidden;
		transition: all 0.3s ease;
	}

	.anti-cookie-banner.minimized {
		max-width: 200px;
	}

	.banner-content {
		padding: 20px;
	}

	.banner-header {
		display: flex;
		align-items: flex-start;
		gap: 12px;
		margin-bottom: 16px;
		position: relative;
	}

	.banner-icon {
		flex-shrink: 0;
		width: 40px;
		height: 40px;
		background: rgba(34, 197, 94, 0.1);
		border: 1px solid rgba(34, 197, 94, 0.3);
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.banner-text {
		flex: 1;
		padding-right: 60px;
	}

	.badge-zero {
		display: inline-flex;
		padding: 2px 8px;
		background: rgba(34, 197, 94, 0.2);
		border: 1px solid rgba(34, 197, 94, 0.3);
		border-radius: 4px;
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.5px;
		color: #22c55e;
	}

	.btn-minimize,
	.btn-close {
		position: absolute;
		top: 0;
		width: 24px;
		height: 24px;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 6px;
		color: #888;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.btn-minimize {
		right: 32px;
	}

	.btn-close {
		right: 0;
	}

	.btn-minimize:hover,
	.btn-close:hover {
		background: rgba(255, 255, 255, 0.2);
		color: #fff;
		border-color: rgba(255, 255, 255, 0.2);
	}

	.privacy-facts {
		background: rgba(0, 0, 0, 0.5);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 12px;
		padding: 12px;
		margin-bottom: 16px;
	}

	.fact-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 8px;
	}

	.fact-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 8px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 8px;
		transition: all 0.2s ease;
	}

	.fact-item:hover {
		background: rgba(0, 212, 255, 0.05);
		border-color: rgba(0, 212, 255, 0.2);
	}

	.fact-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 4px;
		color: #888;
	}

	:global(.fact-icon svg) {
		color: #00d4ff;
	}

	.fact-label {
		font-size: 10px;
		color: #888;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.fact-value {
		font-size: 12px;
		font-weight: 700;
		color: #22c55e;
		margin-top: 2px;
	}

	.fact-value-warning {
		font-size: 12px;
		font-weight: 700;
		color: #ef4444;
		margin-top: 2px;
	}

	.banner-actions {
		display: flex;
		gap: 8px;
	}

	.btn-primary,
	.btn-secondary {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 10px 16px;
		border-radius: 8px;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
		border: none;
	}

	.btn-primary {
		background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
		color: #000;
	}

	.btn-primary:hover {
		transform: translateY(-1px);
		box-shadow: 0 4px 20px rgba(0, 212, 255, 0.3);
	}

	.btn-secondary {
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: #fff;
	}

	.btn-secondary:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.2);
	}

	.minimized-content {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 16px;
		width: 100%;
		background: transparent;
		border: none;
		color: #888;
		font-size: 12px;
		cursor: pointer;
		transition: color 0.2s ease;
	}

	.minimized-content:hover {
		color: #fff;
	}

	@media (max-width: 540px) {
		.anti-cookie-banner {
			bottom: 10px;
			left: 10px;
			right: 10px;
			max-width: none;
		}

		.fact-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.banner-actions {
			flex-direction: column;
		}
	}
</style>
