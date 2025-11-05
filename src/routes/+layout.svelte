<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import AntiCookieBanner from '$lib/components/privacy/AntiCookieBanner.svelte';
	import PrivacyInspector from '$lib/components/privacy/PrivacyInspector.svelte';
	import PrivacyShieldBadge from '$lib/components/privacy/PrivacyShieldBadge.svelte';
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
	<meta name="description" content="Discover 30+ privacy-focused apps that respect your data. No tracking, no surveillance, just powerful software that works for you." />
	<!-- Custom VU Privacy Headers (for documentation) -->
	<meta name="vu-privacy" content="No-Cookies-Ever" />
	<meta name="vu-tracking" content="Absolutely-None" />
	<meta name="vu-analytics" content="Zero" />
	<meta name="vu-data-collection" content="Nope" />
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
		0%, 100% { transform: translate(0, 0) scale(1); }
		33% { transform: translate(100px, 50px) scale(1.1); }
		66% { transform: translate(-50px, 100px) scale(0.9); }
	}
</style>
