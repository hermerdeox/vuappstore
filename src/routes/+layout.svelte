<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import AntiCookieBanner from '$lib/components/privacy/AntiCookieBanner.svelte';
	import PrivacyInspector from '$lib/components/privacy/PrivacyInspector.svelte';
	import PrivacyShieldBadge from '$lib/components/privacy/PrivacyShieldBadge.svelte';
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
