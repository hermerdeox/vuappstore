<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import {
		Shield,
		Activity,
		Database,
		Globe,
		Lock,
		CheckCircle,
		X,
		AlertTriangle,
		Eye,
		Fingerprint,
		Zap,
		Cookie,
		Check
	} from 'lucide-svelte';

	export let isOpen = false;

	let networkRequests: any[] = [];
	let localStorageItems: any[] = [];
	let cookies: string[] = [];
	let sessionStorageItems: any[] = [];
	let activeTab = 'overview';
	let performanceObserver: PerformanceObserver | null = null;

	// Real privacy detection results
	let detectedTrackers: { name: string; url: string; category: string }[] = [];
	let detectedAnalytics: { name: string; url: string }[] = [];
	let detectedAds: { name: string; url: string }[] = [];
	let detectedFingerprinting: { type: string; detected: boolean }[] = [];
	let tlsInfo = { secure: false, protocol: 'Unknown' };
	let externalRequests: any[] = [];

	// Known tracker domains database
	const TRACKER_DOMAINS = [
		// Google trackers
		{ domain: 'google-analytics.com', name: 'Google Analytics', category: 'analytics' },
		{ domain: 'googletagmanager.com', name: 'Google Tag Manager', category: 'analytics' },
		{ domain: 'doubleclick.net', name: 'DoubleClick', category: 'ads' },
		{ domain: 'googlesyndication.com', name: 'Google Ads', category: 'ads' },
		{ domain: 'googleadservices.com', name: 'Google Ad Services', category: 'ads' },
		// Facebook
		{ domain: 'facebook.com/tr', name: 'Facebook Pixel', category: 'tracker' },
		{ domain: 'connect.facebook.net', name: 'Facebook SDK', category: 'tracker' },
		{ domain: 'facebook.net', name: 'Facebook', category: 'tracker' },
		// Analytics platforms
		{ domain: 'mixpanel.com', name: 'Mixpanel', category: 'analytics' },
		{ domain: 'segment.com', name: 'Segment', category: 'analytics' },
		{ domain: 'segment.io', name: 'Segment', category: 'analytics' },
		{ domain: 'amplitude.com', name: 'Amplitude', category: 'analytics' },
		{ domain: 'hotjar.com', name: 'Hotjar', category: 'analytics' },
		{ domain: 'heapanalytics.com', name: 'Heap', category: 'analytics' },
		{ domain: 'fullstory.com', name: 'FullStory', category: 'analytics' },
		{ domain: 'mouseflow.com', name: 'Mouseflow', category: 'analytics' },
		{ domain: 'clarity.ms', name: 'Microsoft Clarity', category: 'analytics' },
		// Ad networks
		{ domain: 'amazon-adsystem.com', name: 'Amazon Ads', category: 'ads' },
		{ domain: 'criteo.com', name: 'Criteo', category: 'ads' },
		{ domain: 'adnxs.com', name: 'AppNexus', category: 'ads' },
		{ domain: 'taboola.com', name: 'Taboola', category: 'ads' },
		{ domain: 'outbrain.com', name: 'Outbrain', category: 'ads' },
		{ domain: 'pubmatic.com', name: 'PubMatic', category: 'ads' },
		{ domain: 'rubiconproject.com', name: 'Rubicon', category: 'ads' },
		// Other trackers
		{ domain: 'twitter.com/i/jot', name: 'Twitter Analytics', category: 'tracker' },
		{ domain: 'linkedin.com/px', name: 'LinkedIn Insight', category: 'tracker' },
		{ domain: 'snap.licdn.com', name: 'LinkedIn', category: 'tracker' },
		{ domain: 'tiktok.com', name: 'TikTok Pixel', category: 'tracker' },
		{ domain: 'pinterest.com', name: 'Pinterest Tag', category: 'tracker' },
		{ domain: 'intercom.io', name: 'Intercom', category: 'tracker' },
		{ domain: 'sentry.io', name: 'Sentry', category: 'analytics' },
		{ domain: 'newrelic.com', name: 'New Relic', category: 'analytics' },
		{ domain: 'nr-data.net', name: 'New Relic', category: 'analytics' },
		{ domain: 'sumologic.com', name: 'Sumo Logic', category: 'analytics' }
	];

	// Privacy score calculation based on REAL data
	$: privacyScore = calculatePrivacyScore();

	function calculatePrivacyScore(): number {
		let score = 100;
		let deductions: { reason: string; points: number }[] = [];

		// Deduct for cookies (5 points each, max 30)
		if (cookies.length > 0) {
			const cookieDeduction = Math.min(cookies.length * 5, 30);
			score -= cookieDeduction;
			deductions.push({ reason: `${cookies.length} cookie(s)`, points: cookieDeduction });
		}

		// Deduct for detected trackers (15 points each, max 45)
		if (detectedTrackers.length > 0) {
			const trackerDeduction = Math.min(detectedTrackers.length * 15, 45);
			score -= trackerDeduction;
			deductions.push({
				reason: `${detectedTrackers.length} tracker(s)`,
				points: trackerDeduction
			});
		}

		// Deduct for detected analytics (10 points each, max 30)
		if (detectedAnalytics.length > 0) {
			const analyticsDeduction = Math.min(detectedAnalytics.length * 10, 30);
			score -= analyticsDeduction;
			deductions.push({
				reason: `${detectedAnalytics.length} analytics`,
				points: analyticsDeduction
			});
		}

		// Deduct for detected ads (15 points each, max 45)
		if (detectedAds.length > 0) {
			const adsDeduction = Math.min(detectedAds.length * 15, 45);
			score -= adsDeduction;
			deductions.push({ reason: `${detectedAds.length} ad network(s)`, points: adsDeduction });
		}

		// Deduct for external requests (1 point per 5 requests, max 10)
		if (externalRequests.length > 0) {
			const externalDeduction = Math.min(Math.floor(externalRequests.length / 5), 10);
			if (externalDeduction > 0) {
				score -= externalDeduction;
				deductions.push({
					reason: `${externalRequests.length} external requests`,
					points: externalDeduction
				});
			}
		}

		// Deduct for fingerprinting attempts (10 points each)
		const fingerprintingFound = detectedFingerprinting.filter((f) => f.detected);
		if (fingerprintingFound.length > 0) {
			const fpDeduction = Math.min(fingerprintingFound.length * 10, 20);
			score -= fpDeduction;
			deductions.push({ reason: 'Fingerprinting detected', points: fpDeduction });
		}

		// Bonus for HTTPS
		if (!tlsInfo.secure) {
			score -= 15;
			deductions.push({ reason: 'Not using HTTPS', points: 15 });
		}

		return Math.max(0, Math.min(100, score));
	}

	function detectTrackers(requests: any[]) {
		detectedTrackers = [];
		detectedAnalytics = [];
		detectedAds = [];

		requests.forEach((request) => {
			const url = request.url.toLowerCase();

			TRACKER_DOMAINS.forEach((tracker) => {
				if (url.includes(tracker.domain)) {
					const entry = { name: tracker.name, url: request.url };

					if (tracker.category === 'tracker') {
						if (!detectedTrackers.some((t) => t.name === tracker.name)) {
							detectedTrackers.push({ ...entry, category: 'tracker' });
						}
					} else if (tracker.category === 'analytics') {
						if (!detectedAnalytics.some((a) => a.name === tracker.name)) {
							detectedAnalytics.push(entry);
						}
					} else if (tracker.category === 'ads') {
						if (!detectedAds.some((a) => a.name === tracker.name)) {
							detectedAds.push(entry);
						}
					}
				}
			});
		});

		// Update arrays to trigger reactivity
		detectedTrackers = [...detectedTrackers];
		detectedAnalytics = [...detectedAnalytics];
		detectedAds = [...detectedAds];
	}

	function detectFingerprinting() {
		detectedFingerprinting = [];

		// Check for canvas fingerprinting
		const canvasDetected = checkCanvasFingerprinting();
		detectedFingerprinting.push({ type: 'Canvas Fingerprinting', detected: canvasDetected });

		// Check for WebGL fingerprinting
		const webglDetected = checkWebGLFingerprinting();
		detectedFingerprinting.push({ type: 'WebGL Fingerprinting', detected: webglDetected });

		// Check for audio fingerprinting
		const audioDetected = checkAudioFingerprinting();
		detectedFingerprinting.push({ type: 'Audio Fingerprinting', detected: audioDetected });

		// Check for font fingerprinting
		const fontDetected = checkFontFingerprinting();
		detectedFingerprinting.push({ type: 'Font Fingerprinting', detected: fontDetected });

		detectedFingerprinting = [...detectedFingerprinting];
	}

	function checkCanvasFingerprinting(): boolean {
		// Check if any scripts are reading canvas data
		// This is a heuristic - in real implementation, would need Content Security Policy monitoring
		const scripts = document.querySelectorAll('script');
		let detected = false;
		scripts.forEach((script) => {
			const content = script.textContent || '';
			if (content.includes('toDataURL') && content.includes('canvas')) {
				detected = true;
			}
		});
		return detected;
	}

	function checkWebGLFingerprinting(): boolean {
		const scripts = document.querySelectorAll('script');
		let detected = false;
		scripts.forEach((script) => {
			const content = script.textContent || '';
			if (
				content.includes('WEBGL_debug_renderer_info') ||
				(content.includes('getParameter') && content.includes('RENDERER'))
			) {
				detected = true;
			}
		});
		return detected;
	}

	function checkAudioFingerprinting(): boolean {
		const scripts = document.querySelectorAll('script');
		let detected = false;
		scripts.forEach((script) => {
			const content = script.textContent || '';
			if (content.includes('AudioContext') && content.includes('createOscillator')) {
				detected = true;
			}
		});
		return detected;
	}

	function checkFontFingerprinting(): boolean {
		const scripts = document.querySelectorAll('script');
		let detected = false;
		scripts.forEach((script) => {
			const content = script.textContent || '';
			if (content.includes('measureText') && content.includes('fonts')) {
				detected = true;
			}
		});
		return detected;
	}

	function checkTLS() {
		tlsInfo = {
			secure: window.location.protocol === 'https:',
			protocol: window.location.protocol === 'https:' ? 'TLS (HTTPS)' : 'Insecure (HTTP)'
		};
	}

	function categorizeExternalRequests(requests: any[]) {
		const origin = typeof window !== 'undefined' ? window.location.origin : '';
		externalRequests = requests.filter((r) => {
			try {
				const url = new URL(r.url);
				return url.origin !== origin;
			} catch {
				return false;
			}
		});
	}

	onMount(() => {
		// Listen for open event
		const handleOpen = () => {
			isOpen = true;
			scanPrivacy();
		};
		window.addEventListener('openPrivacyInspector', handleOpen);

		// Monitor network requests
		if (typeof PerformanceObserver !== 'undefined') {
			performanceObserver = new PerformanceObserver((list) => {
				const entries = list.getEntries();
				entries.forEach((entry) => {
					if (entry.entryType === 'resource') {
						const resourceEntry = entry as PerformanceResourceTiming;
						const newRequest = {
							url: resourceEntry.name,
							type: resourceEntry.initiatorType,
							size: resourceEntry.transferSize || 0,
							duration: resourceEntry.duration,
							timestamp: new Date().toLocaleTimeString()
						};
						networkRequests = [...networkRequests, newRequest];

						// Re-analyze on new requests
						detectTrackers(networkRequests);
						categorizeExternalRequests(networkRequests);
					}
				});
			});

			try {
				performanceObserver.observe({ entryTypes: ['resource'] });
			} catch (e) {
				// Performance observer not supported
			}
		}

		return () => {
			window.removeEventListener('openPrivacyInspector', handleOpen);
			if (performanceObserver) {
				performanceObserver.disconnect();
			}
		};
	});

	function scanPrivacy() {
		// Scan cookies
		cookies = document.cookie
			? document.cookie
					.split(';')
					.map((c) => c.trim())
					.filter((c) => c.length > 0)
			: [];

		// Scan localStorage
		localStorageItems = Object.keys(localStorage).map((key) => ({
			key,
			value: localStorage.getItem(key)?.substring(0, 50) + '...',
			size: new Blob([localStorage.getItem(key) || '']).size
		}));

		// Scan sessionStorage
		sessionStorageItems = Object.keys(sessionStorage).map((key) => ({
			key,
			value: sessionStorage.getItem(key)?.substring(0, 50) + '...',
			size: new Blob([sessionStorage.getItem(key) || '']).size
		}));

		// Get existing network requests from performance API
		if (typeof performance !== 'undefined' && performance.getEntriesByType) {
			const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
			networkRequests = resources.map((r) => ({
				url: r.name,
				type: r.initiatorType,
				size: r.transferSize || 0,
				duration: r.duration,
				timestamp: 'Initial load'
			}));
		}

		// Run all privacy checks
		detectTrackers(networkRequests);
		categorizeExternalRequests(networkRequests);
		detectFingerprinting();
		checkTLS();
	}

	function closeInspector() {
		isOpen = false;
	}

	function clearAllData() {
		if (confirm('This will clear all local data. Are you sure?')) {
			localStorage.clear();
			sessionStorage.clear();
			document.cookie.split(';').forEach((c) => {
				document.cookie = c
					.replace(/^ +/, '')
					.replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
			});
			scanPrivacy();
		}
	}

	// Helper to get score class
	function getScoreClass(score: number): string {
		if (score >= 90) return 'perfect';
		if (score >= 70) return 'good';
		if (score >= 50) return 'warning';
		return 'poor';
	}
</script>

{#if isOpen}
	<div
		class="privacy-inspector-overlay"
		on:click={closeInspector}
		on:keydown={(e) => e.key === 'Escape' && closeInspector()}
		transition:fade={{ duration: 200 }}
		role="button"
		tabindex="-1"
	></div>

	<div class="privacy-inspector" transition:slide={{ duration: 300 }}>
		<div class="inspector-header">
			<div class="header-title">
				<Shield class="w-6 h-6 text-primary" />
				<h2 class="text-xl font-bold">Privacy Inspector</h2>
				<span class="privacy-score {getScoreClass(privacyScore)}">
					Score: {privacyScore}%
				</span>
			</div>
			<button class="btn-close" on:click={closeInspector} aria-label="Close">
				<X class="w-5 h-5" />
			</button>
		</div>

		<div class="inspector-tabs">
			<button
				class="tab"
				class:active={activeTab === 'overview'}
				on:click={() => (activeTab = 'overview')}
			>
				Overview
			</button>
			<button
				class="tab"
				class:active={activeTab === 'network'}
				on:click={() => (activeTab = 'network')}
			>
				<Globe class="w-4 h-4" />
				Network ({networkRequests.length})
			</button>
			<button
				class="tab"
				class:active={activeTab === 'storage'}
				on:click={() => (activeTab = 'storage')}
			>
				<Database class="w-4 h-4" />
				Storage
			</button>
			<button
				class="tab"
				class:active={activeTab === 'cookies'}
				on:click={() => (activeTab = 'cookies')}
			>
				<Cookie class="w-4 h-4" /> Cookies ({cookies.length})
			</button>
		</div>

		<div class="inspector-content">
			{#if activeTab === 'overview'}
				<div class="overview-content">
					<!-- VERIFIED PRIVACY FACTS - All values are REAL and detected -->
					<div class="privacy-manifest">
						<h3 class="manifest-title">
							<span class="verified-badge flex items-center gap-1"
								><Check class="w-3 h-3" /> VERIFIED</span
							>
							PRIVACY SCAN RESULTS
						</h3>

						<!-- Client-side verifiable metrics -->
						<div class="manifest-section">
							<h4 class="section-label">CLIENT-SIDE DETECTION</h4>
							<div class="manifest-grid">
								<div class="manifest-item">
									<span class="item-label">Cookies:</span>
									<span
										class="item-value"
										class:zero={cookies.length === 0}
										class:warning={cookies.length > 0}
									>
										{cookies.length === 0 ? 'ZERO' : cookies.length}
									</span>
								</div>
								<div class="manifest-item">
									<span class="item-label">External Requests:</span>
									<span
										class="item-value"
										class:zero={externalRequests.length === 0}
										class:neutral={externalRequests.length > 0}
									>
										{externalRequests.length === 0 ? 'ZERO' : externalRequests.length}
									</span>
								</div>
								<div class="manifest-item">
									<span class="item-label">Trackers Detected:</span>
									<span
										class="item-value"
										class:zero={detectedTrackers.length === 0}
										class:danger={detectedTrackers.length > 0}
									>
										{detectedTrackers.length === 0 ? 'ZERO' : detectedTrackers.length}
									</span>
								</div>
								<div class="manifest-item">
									<span class="item-label">Analytics:</span>
									<span
										class="item-value"
										class:zero={detectedAnalytics.length === 0}
										class:warning={detectedAnalytics.length > 0}
									>
										{detectedAnalytics.length === 0 ? 'ZERO' : detectedAnalytics.length}
									</span>
								</div>
								<div class="manifest-item">
									<span class="item-label">Ad Networks:</span>
									<span
										class="item-value"
										class:zero={detectedAds.length === 0}
										class:danger={detectedAds.length > 0}
									>
										{detectedAds.length === 0 ? 'ZERO' : detectedAds.length}
									</span>
								</div>
								<div class="manifest-item">
									<span class="item-label">Connection:</span>
									<span
										class="item-value"
										class:success={tlsInfo.secure}
										class:danger={!tlsInfo.secure}
									>
										{tlsInfo.secure ? 'HTTPS SECURE' : 'HTTP WARNING'}
									</span>
								</div>
							</div>
						</div>

						<!-- Fingerprinting detection -->
						<div class="manifest-section">
							<h4 class="section-label">FINGERPRINTING SCAN</h4>
							<div class="fingerprint-grid">
								{#each detectedFingerprinting as fp}
									<div class="fingerprint-item">
										<Fingerprint class="w-4 h-4" />
										<span class="fp-type">{fp.type}:</span>
										<span class="fp-status" class:safe={!fp.detected} class:danger={fp.detected}>
											{fp.detected ? 'DETECTED' : 'Not Found'}
										</span>
									</div>
								{/each}
							</div>
						</div>

						<!-- Server-side claims - clearly labeled as unverifiable -->
						<div class="manifest-section server-claims">
							<h4 class="section-label">
								<Eye class="w-4 h-4" />
								VU SERVER COMMITMENTS
								<span class="unverifiable-label">(Cannot verify client-side)</span>
							</h4>
							<div class="manifest-grid claims-grid">
								<div class="manifest-item claim">
									<span class="item-label">Data Shared:</span>
									<span class="item-value claim-value">ZERO (claimed)</span>
								</div>
								<div class="manifest-item claim">
									<span class="item-label">Data Sold:</span>
									<span class="item-value claim-value">ZERO (claimed)</span>
								</div>
								<div class="manifest-item claim">
									<span class="item-label">Server Logs:</span>
									<span class="item-value claim-value">None (claimed)</span>
								</div>
								<div class="manifest-item claim">
									<span class="item-label">Encryption:</span>
									<span class="item-value claim-value">E2E (claimed)</span>
								</div>
							</div>
							<p class="claims-note">
								<AlertTriangle class="w-3 h-3" />
								These are VU's commitments. Server-side practices cannot be verified from your browser.
								<a href="/legal/privacy" class="privacy-link">Read our Privacy Policy →</a>
							</p>
						</div>
					</div>

					<!-- Detailed findings if any threats detected -->
					{#if detectedTrackers.length > 0 || detectedAnalytics.length > 0 || detectedAds.length > 0}
						<div class="threats-detected">
							<h3 class="threats-title">
								<AlertTriangle class="w-5 h-5" />
								Privacy Concerns Detected
							</h3>

							{#if detectedTrackers.length > 0}
								<div class="threat-section">
									<h4>Trackers ({detectedTrackers.length})</h4>
									{#each detectedTrackers as tracker}
										<div class="threat-item">
											<span class="threat-name">{tracker.name}</span>
											<span class="threat-url">{tracker.url.substring(0, 50)}...</span>
										</div>
									{/each}
								</div>
							{/if}

							{#if detectedAnalytics.length > 0}
								<div class="threat-section">
									<h4>Analytics ({detectedAnalytics.length})</h4>
									{#each detectedAnalytics as analytics}
										<div class="threat-item">
											<span class="threat-name">{analytics.name}</span>
											<span class="threat-url">{analytics.url.substring(0, 50)}...</span>
										</div>
									{/each}
								</div>
							{/if}

							{#if detectedAds.length > 0}
								<div class="threat-section">
									<h4>Ad Networks ({detectedAds.length})</h4>
									{#each detectedAds as ad}
										<div class="threat-item">
											<span class="threat-name">{ad.name}</span>
											<span class="threat-url">{ad.url.substring(0, 50)}...</span>
										</div>
									{/each}
								</div>
							{/if}
						</div>
					{/if}

					<div class="quick-actions">
						<button class="action-btn" on:click={() => (activeTab = 'network')}>
							<Activity class="w-4 h-4" />
							Monitor Network
						</button>
						<button class="action-btn" on:click={scanPrivacy}>
							<Shield class="w-4 h-4" />
							Rescan Privacy
						</button>
						<button class="action-btn danger" on:click={clearAllData}>
							<AlertTriangle class="w-4 h-4" />
							Clear All Data
						</button>
					</div>
				</div>
			{/if}

			{#if activeTab === 'network'}
				<div class="network-content">
					<div class="network-header">
						<h3>Live Network Monitor</h3>
						<span class="status-badge">
							{#if networkRequests.length === 0}
								<CheckCircle class="w-4 h-4 text-success" />
								No external requests
							{:else}
								<Activity class="w-4 h-4 text-primary" />
								{networkRequests.length} requests
							{/if}
						</span>
					</div>

					{#if networkRequests.length === 0}
						<div class="empty-state">
							<CheckCircle class="w-12 h-12 text-success mb-3" />
							<p>No network requests detected!</p>
							<small>This app runs entirely on your device.</small>
						</div>
					{:else}
						<div class="request-list">
							{#each networkRequests as request}
								<div class="request-item">
									<div class="request-url">{request.url.substring(0, 50)}...</div>
									<div class="request-meta">
										<span class="request-type">{request.type}</span>
										<span class="request-size">{(request.size / 1024).toFixed(1)} KB</span>
										<span class="request-time">{request.timestamp}</span>
									</div>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/if}

			{#if activeTab === 'storage'}
				<div class="storage-content">
					<div class="storage-section">
						<h4>Local Storage ({localStorageItems.length} items)</h4>
						{#if localStorageItems.length === 0}
							<p class="empty-message">No local storage data</p>
						{:else}
							<div class="storage-list">
								{#each localStorageItems as item}
									<div class="storage-item">
										<span class="storage-key">{item.key}</span>
										<span class="storage-size">{(item.size / 1024).toFixed(1)} KB</span>
									</div>
								{/each}
							</div>
						{/if}
					</div>

					<div class="storage-section">
						<h4>Session Storage ({sessionStorageItems.length} items)</h4>
						{#if sessionStorageItems.length === 0}
							<p class="empty-message">No session storage data</p>
						{:else}
							<div class="storage-list">
								{#each sessionStorageItems as item}
									<div class="storage-item">
										<span class="storage-key">{item.key}</span>
										<span class="storage-size">{(item.size / 1024).toFixed(1)} KB</span>
									</div>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			{/if}

			{#if activeTab === 'cookies'}
				<div class="cookies-content">
					{#if cookies.length === 0}
						<div class="empty-state">
							<div class="cookie-monster">
								<div class="cookie-icon">
									<svg
										width="64"
										height="64"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<circle cx="12" cy="12" r="10"></circle>
										<circle cx="9" cy="9" r="1"></circle>
										<circle cx="15" cy="9" r="1"></circle>
										<circle cx="9" cy="15" r="1"></circle>
										<circle cx="15" cy="15" r="1"></circle>
										<circle cx="12" cy="12" r="1"></circle>
									</svg>
									<svg
										class="ban-icon"
										width="64"
										height="64"
										viewBox="0 0 24 24"
										fill="none"
										stroke="#ef4444"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<circle cx="12" cy="12" r="10"></circle>
										<line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
									</svg>
								</div>
							</div>
							<h3>Zero Cookies!</h3>
							<p>As promised, this site doesn't use any cookies.</p>
							<small>Not for tracking, not for analytics, not for anything.</small>
						</div>
					{:else}
						<div class="cookie-list">
							<AlertTriangle class="w-5 h-5 text-warning" />
							<p>Found {cookies.length} cookie(s):</p>
							{#each cookies as cookie}
								<div class="cookie-item">{cookie}</div>
							{/each}
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.privacy-inspector-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(4px);
		z-index: 2000;
	}

	.privacy-inspector {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 90%;
		max-width: 800px;
		max-height: 80vh;
		background: linear-gradient(135deg, rgba(0, 0, 0, 0.98) 0%, rgba(0, 20, 40, 0.98) 100%);
		border: 1px solid rgba(0, 212, 255, 0.3);
		border-radius: 20px;
		box-shadow:
			0 25px 50px rgba(0, 0, 0, 0.7),
			0 0 100px rgba(0, 212, 255, 0.1),
			inset 0 0 30px rgba(0, 212, 255, 0.05);
		z-index: 2001;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.inspector-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(0, 0, 0, 0.5);
	}

	.header-title {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.privacy-score {
		padding: 4px 12px;
		border-radius: 20px;
		font-size: 14px;
		font-weight: 600;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.privacy-score.perfect {
		background: rgba(34, 197, 94, 0.2);
		border-color: rgba(34, 197, 94, 0.3);
		color: #22c55e;
	}

	.privacy-score.good {
		background: rgba(255, 184, 0, 0.2);
		border-color: rgba(255, 184, 0, 0.3);
		color: #ffb800;
	}

	.privacy-score.warning {
		background: rgba(255, 184, 0, 0.2);
		border-color: rgba(255, 184, 0, 0.3);
		color: #ffb800;
	}

	.privacy-score.poor {
		background: rgba(239, 68, 68, 0.2);
		border-color: rgba(239, 68, 68, 0.3);
		color: #ef4444;
	}

	.btn-close {
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		color: #888;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.btn-close:hover {
		background: rgba(255, 255, 255, 0.2);
		color: #fff;
	}

	.inspector-tabs {
		display: flex;
		gap: 2px;
		padding: 0 20px;
		background: rgba(0, 0, 0, 0.3);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.tab {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 12px 20px;
		background: transparent;
		border: none;
		color: #888;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		border-bottom: 2px solid transparent;
		margin-bottom: -1px;
	}

	.tab:hover {
		color: #fff;
		background: rgba(255, 255, 255, 0.05);
	}

	.tab.active {
		color: #00d4ff;
		border-bottom-color: #00d4ff;
		background: rgba(0, 212, 255, 0.05);
	}

	.inspector-content {
		flex: 1;
		overflow-y: auto;
		padding: 20px;
	}

	/* Overview Tab */
	.overview-content {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.privacy-manifest {
		background: rgba(0, 0, 0, 0.5);
		border: 2px solid rgba(0, 212, 255, 0.2);
		border-radius: 12px;
		padding: 20px;
	}

	.manifest-title {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		font-size: 16px;
		font-weight: 700;
		color: #00d4ff;
		margin-bottom: 20px;
		letter-spacing: 1px;
	}

	.verified-badge {
		background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
		color: #000;
		padding: 2px 8px;
		border-radius: 4px;
		font-size: 10px;
		font-weight: 800;
		letter-spacing: 0.5px;
	}

	.manifest-section {
		margin-bottom: 16px;
		padding-bottom: 16px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.manifest-section:last-child {
		margin-bottom: 0;
		padding-bottom: 0;
		border-bottom: none;
	}

	.section-label {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 11px;
		font-weight: 600;
		color: #888;
		margin-bottom: 10px;
		letter-spacing: 1px;
		text-transform: uppercase;
	}

	.unverifiable-label {
		font-size: 9px;
		font-weight: 400;
		color: #666;
		font-style: italic;
		letter-spacing: 0;
		text-transform: none;
	}

	.manifest-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 12px;
		padding-bottom: 12px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.manifest-footer {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 12px;
		padding-top: 12px;
	}

	.manifest-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px 12px;
		background: rgba(255, 255, 255, 0.03);
		border-radius: 6px;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.item-label {
		color: #888;
		font-size: 13px;
	}

	.item-value {
		font-weight: 700;
		font-size: 14px;
		color: #fff;
	}

	.item-value.zero {
		color: #22c55e;
	}

	.item-value.success {
		color: #00d4ff;
	}

	.item-value.warning {
		color: #ffb800;
	}

	.item-value.danger {
		color: #ef4444;
	}

	.item-value.neutral {
		color: #888;
	}

	/* Server claims section */
	.server-claims {
		background: rgba(255, 184, 0, 0.05);
		border: 1px dashed rgba(255, 184, 0, 0.3);
		border-radius: 8px;
		padding: 12px;
		margin-top: 4px;
	}

	.claims-grid .manifest-item.claim {
		background: rgba(0, 0, 0, 0.3);
		border: 1px dashed rgba(255, 255, 255, 0.1);
	}

	.claim-value {
		color: #888 !important;
		font-style: italic;
		font-size: 12px !important;
	}

	.claims-note {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 10px;
		color: #666;
		margin-top: 10px;
		padding-top: 10px;
		border-top: 1px solid rgba(255, 255, 255, 0.05);
	}

	.privacy-link {
		color: #00d4ff;
		text-decoration: none;
		margin-left: auto;
	}

	.privacy-link:hover {
		text-decoration: underline;
	}

	/* Fingerprinting section */
	.fingerprint-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 8px;
	}

	.fingerprint-item {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px 10px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 6px;
		font-size: 12px;
	}

	.fp-type {
		color: #888;
	}

	.fp-status {
		margin-left: auto;
		font-weight: 600;
		font-size: 10px;
		padding: 2px 6px;
		border-radius: 4px;
	}

	.fp-status.safe {
		background: rgba(34, 197, 94, 0.2);
		color: #22c55e;
	}

	.fp-status.danger {
		background: rgba(239, 68, 68, 0.2);
		color: #ef4444;
	}

	/* Threats detected section */
	.threats-detected {
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.3);
		border-radius: 12px;
		padding: 16px;
		margin-top: 16px;
	}

	.threats-title {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 14px;
		font-weight: 700;
		color: #ef4444;
		margin-bottom: 12px;
	}

	.threat-section {
		margin-bottom: 12px;
	}

	.threat-section:last-child {
		margin-bottom: 0;
	}

	.threat-section h4 {
		font-size: 12px;
		font-weight: 600;
		color: #ffb800;
		margin-bottom: 8px;
	}

	.threat-item {
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding: 8px;
		background: rgba(0, 0, 0, 0.3);
		border-radius: 4px;
		margin-bottom: 4px;
	}

	.threat-name {
		font-weight: 600;
		font-size: 12px;
		color: #fff;
	}

	.threat-url {
		font-size: 10px;
		font-family: 'IBM Plex Mono', monospace;
		color: #666;
	}

	.quick-actions {
		display: flex;
		gap: 10px;
	}

	.action-btn {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 12px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		color: #fff;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.action-btn:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.2);
	}

	.action-btn.danger {
		background: rgba(239, 68, 68, 0.1);
		border-color: rgba(239, 68, 68, 0.3);
		color: #ef4444;
	}

	.action-btn.danger:hover {
		background: rgba(239, 68, 68, 0.2);
		border-color: rgba(239, 68, 68, 0.4);
	}

	/* Network Tab */
	.network-content {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.network-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 12px;
	}

	.network-header h3 {
		font-size: 16px;
		font-weight: 600;
	}

	.status-badge {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 6px 12px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 20px;
		font-size: 13px;
	}

	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 40px;
		text-align: center;
	}

	.empty-state p {
		font-size: 16px;
		font-weight: 500;
		margin-bottom: 8px;
	}

	.empty-state small {
		color: #888;
		font-size: 13px;
	}

	.request-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.request-item {
		padding: 12px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 8px;
	}

	.request-url {
		font-size: 13px;
		font-family: 'IBM Plex Mono', monospace;
		color: #00d4ff;
		margin-bottom: 6px;
	}

	.request-meta {
		display: flex;
		gap: 12px;
		font-size: 11px;
		color: #888;
	}

	.request-type {
		padding: 2px 6px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 4px;
	}

	/* Storage Tab */
	.storage-content {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.storage-section h4 {
		font-size: 14px;
		font-weight: 600;
		margin-bottom: 12px;
		color: #00d4ff;
	}

	.empty-message {
		color: #888;
		font-size: 13px;
		font-style: italic;
	}

	.storage-list {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.storage-item {
		display: flex;
		justify-content: space-between;
		padding: 8px 12px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 6px;
		font-size: 13px;
	}

	.storage-key {
		color: #fff;
		font-family: 'IBM Plex Mono', monospace;
	}

	.storage-size {
		color: #888;
		font-size: 12px;
	}

	/* Cookies Tab */
	.cookies-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 300px;
		text-align: center;
	}

	.cookie-monster {
		margin-bottom: 20px;
		animation: bounce 2s ease-in-out infinite;
	}

	.cookie-icon {
		position: relative;
		width: 64px;
		height: 64px;
		margin: 0 auto;
	}

	.cookie-icon svg {
		position: absolute;
		top: 0;
		left: 0;
		color: #00d4ff;
	}

	.cookie-icon .ban-icon {
		animation: rotate 3s linear infinite;
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.cookies-content h3 {
		font-size: 24px;
		font-weight: 700;
		color: #22c55e;
		margin-bottom: 12px;
	}

	.cookies-content p {
		font-size: 16px;
		color: #fff;
		margin-bottom: 8px;
	}

	.cookie-list {
		background: rgba(255, 184, 0, 0.1);
		border: 1px solid rgba(255, 184, 0, 0.3);
		border-radius: 8px;
		padding: 16px;
		text-align: left;
	}

	.cookie-item {
		padding: 4px 8px;
		background: rgba(0, 0, 0, 0.3);
		border-radius: 4px;
		margin-top: 8px;
		font-family: 'IBM Plex Mono', monospace;
		font-size: 12px;
		color: #ffb800;
	}

	@keyframes bounce {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	@media (max-width: 768px) {
		.privacy-inspector {
			width: 95%;
			max-height: 90vh;
		}

		.manifest-grid,
		.fingerprint-grid {
			grid-template-columns: 1fr;
		}

		.quick-actions {
			flex-direction: column;
		}

		.manifest-title {
			flex-direction: column;
			font-size: 14px;
		}

		.fingerprint-item {
			flex-wrap: wrap;
		}

		.claims-note {
			flex-direction: column;
			text-align: center;
		}

		.privacy-link {
			margin-left: 0;
			margin-top: 8px;
		}
	}
</style>
