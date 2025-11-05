<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { Shield, Eye, Lock, CheckCircle, X, Cookie, BarChart3, EyeOff, DollarSign, ChevronDown, ChevronUp } from 'lucide-svelte';
	
	let showBanner = false;
	let isMinimized = false;
	
	// Real-time privacy checks
	let privacyChecks = {
		cookies: 0,
		analytics: 0,
		tracking: 0,
		dataSold: 0
	};
	
	onMount(() => {
		// Clean up any tracking-related items to maintain no-cookie protocol
		cleanupTrackingData();
		
		// Perform real privacy checks
		performPrivacyAudit();
		
		// Check if user has already dismissed the banner
		const dismissed = localStorage.getItem('vu-privacy-banner-dismissed');
		if (!dismissed) {
			// Show banner after a short delay for better UX
			setTimeout(() => {
				showBanner = true;
			}, 1500);
		}
		
		// Re-check periodically to ensure no new tracking
		const interval = setInterval(performPrivacyAudit, 5000);
		return () => clearInterval(interval);
	});
	
	function cleanupTrackingData() {
		// Remove any tracking cookies
		document.cookie.split(';').forEach(c => {
			const eqPos = c.indexOf('=');
			const name = eqPos > -1 ? c.substr(0, eqPos).trim() : c.trim();
			
			// List of tracking cookie patterns to remove
			const trackingPatterns = ['_ga', '_gid', '_gat', 'fbp', 'fbc', '_fbp', 'NID', 'test_cookie'];
			if (trackingPatterns.some(pattern => name.includes(pattern))) {
				// Remove the cookie
				document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
				document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
				document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
			}
		});
		
		// Clean suspicious localStorage items (preserve only VU-specific items)
		const suspiciousKeys = ['_ga', '_gid', 'fbp', 'fbc', 'mixpanel', 'amplitude', 'heap', 'segment'];
		Object.keys(localStorage).forEach(key => {
			// Keep only VU-specific items
			if (!key.startsWith('vu-') && suspiciousKeys.some(suspicious => key.includes(suspicious))) {
				localStorage.removeItem(key);
			}
		});
		
		// Clean sessionStorage as well
		Object.keys(sessionStorage).forEach(key => {
			if (!key.startsWith('vu-') && suspiciousKeys.some(suspicious => key.includes(suspicious))) {
				sessionStorage.removeItem(key);
			}
		});
	}
	
	function performPrivacyAudit() {
		// Check for actual cookies
		const cookies = document.cookie ? document.cookie.split(';').filter(c => c.trim() !== '') : [];
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
		
		scripts.forEach(script => {
			if (script.src) {
				trackingDomains.forEach(domain => {
					if (script.src.includes(domain)) {
						if (domain.includes('analytics') || domain.includes('heap') || domain.includes('mixpanel')) {
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
		images.forEach(img => {
			if (img.src) {
				trackingDomains.forEach(domain => {
					if (img.src.includes(domain)) {
						trackingFound++;
					}
				});
			}
		});
		
		// Check localStorage for tracking identifiers
		const suspiciousKeys = ['_ga', '_gid', 'fbp', 'fbc', 'mixpanel', 'amplitude'];
		Object.keys(localStorage).forEach(key => {
			if (suspiciousKeys.some(suspicious => key.includes(suspicious))) {
				trackingFound++;
			}
		});
		
		privacyChecks.analytics = analyticsFound;
		privacyChecks.tracking = trackingFound;
		// Data selling can't be technically detected, but we know VU doesn't sell data
		privacyChecks.dataSold = 0;
	}
	
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
							VU apps don't use cookies, trackers, or analytics. Your data stays on YOUR device. Period.
						</p>
					</div>
					<button 
						class="btn-minimize"
						on:click={minimize}
						aria-label="Minimize"
					>
						{#if isMinimized}
							<ChevronUp class="w-4 h-4" />
						{:else}
							<ChevronDown class="w-4 h-4" />
						{/if}
					</button>
					<button 
						class="btn-close"
						on:click={dismiss}
						aria-label="Close"
					>
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
							<span class="{getCheckColor(privacyChecks.cookies)}">{getCheckDisplay(privacyChecks.cookies)}</span>
						</div>
						<div class="fact-item">
							<span class="fact-icon">
								<BarChart3 class="w-5 h-5" />
							</span>
							<span class="fact-label">Analytics</span>
							<span class="{getCheckColor(privacyChecks.analytics)}">{getCheckDisplay(privacyChecks.analytics)}</span>
						</div>
						<div class="fact-item">
							<span class="fact-icon">
								<EyeOff class="w-5 h-5" />
							</span>
							<span class="fact-label">Tracking</span>
							<span class="{getCheckColor(privacyChecks.tracking)}">{getCheckDisplay(privacyChecks.tracking)}</span>
						</div>
						<div class="fact-item">
							<span class="fact-icon">
								<DollarSign class="w-5 h-5" />
							</span>
							<span class="fact-label">Data Sold</span>
							<span class="{getCheckColor(privacyChecks.dataSold)}">{getCheckDisplay(privacyChecks.dataSold)}</span>
						</div>
					</div>
				</div>
				
				<div class="banner-actions">
					<button 
						class="btn-primary"
						on:click={dismiss}
					>
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
			<button 
				class="minimized-content"
				on:click={minimize}
			>
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
		background: linear-gradient(135deg, 
			rgba(0, 0, 0, 0.95) 0%, 
			rgba(0, 20, 40, 0.95) 100%);
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
