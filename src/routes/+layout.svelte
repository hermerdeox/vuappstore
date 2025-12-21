<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import AntiCookieBanner from '$lib/components/privacy/AntiCookieBanner.svelte';
	import PrivacyInspector from '$lib/components/privacy/PrivacyInspector.svelte';
	import PrivacyShieldBadge from '$lib/components/privacy/PrivacyShieldBadge.svelte';
	import VuLevelBadge from '$lib/components/privacy/VuLevelBadge.svelte';
	import PWAInstallPrompt from '$lib/components/pwa/PWAInstallPrompt.svelte';

	let showPWAPrompt = false;

	// PWA Service Worker Registration
	onMount(async () => {
		if ('serviceWorker' in navigator) {
			try {
				console.log('[PWA] Registering service worker...');
				const registration = await navigator.serviceWorker.register('/sw.js', {
					scope: '/'
				});

				console.log('[PWA] Service worker registered successfully:', registration.scope);

				// Handle service worker updates
				registration.addEventListener('updatefound', () => {
					const newWorker = registration.installing;
					if (newWorker) {
						newWorker.addEventListener('statechange', () => {
							if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
								console.log('[PWA] New service worker available');
								// Could show update notification here
							}
						});
					}
				});

				// Listen for service worker messages
				navigator.serviceWorker.addEventListener('message', (event) => {
					console.log('[PWA] Message from service worker:', event.data);
				});
			} catch (error) {
				console.error('[PWA] Service worker registration failed:', error);
			}
		} else {
			console.log('[PWA] Service workers not supported');
		}

		// PWA Install Prompt Handling
		let deferredPrompt: any;

		window.addEventListener('beforeinstallprompt', (e) => {
			console.log('[PWA] Install prompt available');
			e.preventDefault();
			deferredPrompt = e;

			// Could show custom install button here
			showInstallPromotion();
		});

		window.addEventListener('appinstalled', () => {
			console.log('[PWA] App installed successfully');
			deferredPrompt = null;
			hideInstallPromotion();
		});

		function showInstallPromotion() {
			// Show custom install banner
			console.log('[PWA] Showing install promotion');
			showPWAPrompt = true;
		}

		function hideInstallPromotion() {
			// Hide custom install banner
			console.log('[PWA] Hiding install promotion');
			showPWAPrompt = false;
		}
	});
</script>

<svelte:head>
	<title>VuAppStore - Privacy-First App Marketplace</title>
	<meta
		name="description"
		content="Discover 30+ privacy-focused apps that respect your data. No tracking, no surveillance, just powerful software that works for you."
	/>

	<!-- ============================================ -->
	<!-- VU PRIVACY DECLARATION HEADERS -->
	<!-- These meta tags declare our privacy stance -->
	<!-- ============================================ -->
	<meta name="vu-privacy" content="Zero-Cookies-Ever" />
	<meta name="vu-tracking" content="Absolutely-None" />
	<meta name="vu-analytics" content="Zero" />
	<meta name="vu-data-collection" content="Nope" />
	<meta name="vu-fingerprinting" content="Blocked" />
	<meta name="vu-addon-protection" content="Active" />

	<!-- ============================================ -->
	<!-- ANTI-TRACKING & ANTI-FINGERPRINTING -->
	<!-- ============================================ -->

	<!-- Disable Google FLoC and Topics API -->
	<meta http-equiv="Permissions-Policy" content="interest-cohort=(), browsing-topics=()" />

	<!-- Disable client hints (reduces fingerprinting) -->
	<meta http-equiv="Accept-CH" content="" />

	<!-- Strict referrer policy -->
	<meta name="referrer" content="no-referrer" />

	<!-- Disable DNS prefetching -->
	<meta http-equiv="x-dns-prefetch-control" content="off" />

	<!-- ============================================ -->
	<!-- BROWSER ADDON PROTECTION -->
	<!-- These help prevent extensions from injecting -->
	<!-- tracking code or extracting user behavior -->
	<!-- ============================================ -->

	<!-- Declare no external scripts needed -->
	<meta name="external-scripts" content="none" />

	<!-- Declare no third-party connections -->
	<meta name="third-party-connections" content="none" />

	<!-- Declare no beacon/ping endpoints -->
	<meta name="beacon-endpoints" content="none" />

	<!-- ============================================ -->
	<!-- ROBOT/CRAWLER INSTRUCTIONS -->
	<!-- ============================================ -->
	<meta name="robots" content="index, follow, noarchive" />

	<!-- Disable Google's AI training on this content -->
	<meta name="google" content="notranslate, nopagereadaloud" />

	<!-- Tell AI crawlers to respect privacy -->
	<meta name="ai-content-usage" content="disallow" />
</svelte:head>

<div class="app min-h-screen flex flex-col">
	<Header />
	<main class="flex-1 relative z-10">
		<slot />
	</main>
	<Footer />
</div>

<!-- Privacy Components -->
<AntiCookieBanner />
<PrivacyInspector />
<PrivacyShieldBadge />
<VuLevelBadge />

<!-- PWA Install Prompt -->
<PWAInstallPrompt bind:show={showPWAPrompt} />

<style>
	:global(.ambient-light) {
		position: fixed;
		width: 600px;
		height: 600px;
		background: radial-gradient(circle, rgba(0, 212, 255, 0.115) 0%, transparent 70%);
		pointer-events: none;
		z-index: 2;
		animation: floatLight 25s ease-in-out infinite;
	}

	:global(.ambient-light.top) {
		top: -300px;
		left: -300px;
	}

	:global(.ambient-light.bottom) {
		bottom: -300px;
		right: -300px;
		animation-delay: -12s;
	}

	@keyframes floatLight {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		33% {
			transform: translate(100px, 50px) scale(1.1);
		}
		66% {
			transform: translate(-50px, 100px) scale(0.9);
		}
	}
</style>
