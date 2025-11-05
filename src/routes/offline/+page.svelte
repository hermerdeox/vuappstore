<script lang="ts">
	import { WifiOff, RefreshCw, Home, Shield } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let isOnline = true;
	let retryCount = 0;

	onMount(() => {
		// Check initial online status
		isOnline = navigator.onLine;

		// Listen for online/offline events
		window.addEventListener('online', () => {
			console.log('[PWA] Back online');
			isOnline = true;
			retryCount = 0;
		});

		window.addEventListener('offline', () => {
			console.log('[PWA] Gone offline');
			isOnline = false;
		});
	});

	async function retryConnection() {
		retryCount++;
		console.log(`[PWA] Retry attempt ${retryCount}`);
		
		try {
			// Try to fetch a small resource to test connectivity
			const response = await fetch('/manifest.json', { 
				cache: 'no-cache',
				mode: 'no-cors'
			});
			
			if (response.ok || response.type === 'opaque') {
				// Connection restored
				window.location.reload();
			}
		} catch (error) {
			console.log('[PWA] Still offline');
		}
	}

	function goHome() {
		window.location.href = '/';
	}
</script>

<svelte:head>
	<title>Offline - VuAppStore</title>
	<meta name="description" content="VuAppStore is currently offline. Your privacy-first apps are still protected." />
</svelte:head>

<div class="offline-page">
	<div class="container py-20">
		<div class="offline-content max-w-2xl mx-auto text-center">
			<!-- Offline Icon -->
			<div class="offline-icon mb-8">
				<div class="icon-wrapper">
					<WifiOff class="w-20 h-20 text-text-secondary" />
					<div class="icon-accent">
						<Shield class="w-8 h-8 text-primary" />
					</div>
				</div>
			</div>

			<!-- Status Message -->
			<div class="status-message mb-8">
				{#if isOnline}
					<h1 class="text-4xl font-black mb-4 text-success">Connection Restored!</h1>
					<p class="text-lg text-text-secondary">
						Your connection is back. Redirecting you to VuAppStore...
					</p>
				{:else}
					<h1 class="text-4xl font-black mb-4">You're Offline</h1>
					<p class="text-lg text-text-secondary mb-6">
						No worries! Your privacy is still protected. VuAppStore works offline 
						with cached content, and your data never leaves your device.
					</p>
				{/if}
			</div>

			<!-- Offline Features -->
			{#if !isOnline}
				<div class="offline-features glass-card p-8 mb-8">
					<h2 class="text-2xl font-bold mb-6">What Still Works Offline</h2>
					<div class="features-grid grid grid-cols-1 md:grid-cols-2 gap-6">
						<div class="feature">
							<Shield class="w-6 h-6 text-success mb-2" />
							<h3 class="font-semibold mb-2">Privacy Protection</h3>
							<p class="text-sm text-text-secondary">Your data stays secure on your device</p>
						</div>
						<div class="feature">
							<Home class="w-6 h-6 text-primary mb-2" />
							<h3 class="font-semibold mb-2">Cached Pages</h3>
							<p class="text-sm text-text-secondary">Browse previously visited pages</p>
						</div>
						<div class="feature">
							<WifiOff class="w-6 h-6 text-info mb-2" />
							<h3 class="font-semibold mb-2">No Tracking</h3>
							<p class="text-sm text-text-secondary">Zero data collection, even offline</p>
						</div>
						<div class="feature">
							<RefreshCw class="w-6 h-6 text-warning mb-2" />
							<h3 class="font-semibold mb-2">Auto-Sync</h3>
							<p class="text-sm text-text-secondary">Syncs when connection returns</p>
						</div>
					</div>
				</div>
			{/if}

			<!-- Actions -->
			<div class="offline-actions flex gap-4 justify-center flex-wrap">
				{#if isOnline}
					<button class="btn btn-primary" on:click={() => window.location.reload()}>
						<RefreshCw class="w-5 h-5" />
						Continue to VuAppStore
					</button>
				{:else}
					<button class="btn btn-primary" on:click={retryConnection} disabled={retryCount > 5}>
						<RefreshCw class="w-5 h-5" />
						{retryCount > 0 ? `Retry (${retryCount})` : 'Check Connection'}
					</button>
					<button class="btn btn-secondary" on:click={goHome}>
						<Home class="w-5 h-5" />
						Go Home
					</button>
				{/if}
			</div>

			<!-- Privacy Message -->
			<div class="privacy-message mt-12 p-6 bg-primary/10 border border-primary/30 rounded-lg">
				<Shield class="w-6 h-6 text-primary mx-auto mb-3" />
				<p class="text-sm text-text-secondary">
					<strong class="text-primary">Privacy Note:</strong> Even offline, VuAppStore maintains zero tracking. 
					Your browsing data, preferences, and activity remain completely private and never leave your device.
				</p>
			</div>
		</div>
	</div>
</div>

<style>
	.offline-page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-background);
		position: relative;
	}

	.offline-icon {
		position: relative;
		display: inline-block;
	}

	.icon-wrapper {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 120px;
		height: 120px;
		background: var(--color-glass);
		border: 2px solid var(--color-border);
		border-radius: 50%;
	}

	.icon-accent {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 40px;
		height: 40px;
		background: var(--color-background);
		border: 2px solid var(--color-primary);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.features-grid {
		text-align: left;
	}

	.feature {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.offline-actions .btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.privacy-message {
		text-align: center;
	}

	/* Animation for retry button */
	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	.btn:disabled .lucide-refresh-cw {
		animation: spin 1s linear infinite;
	}
</style>
