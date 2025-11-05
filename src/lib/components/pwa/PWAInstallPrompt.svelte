<script lang="ts">
	import { onMount } from 'svelte';
	import { Download, X, Smartphone, Monitor, Shield } from 'lucide-svelte';

	export let show = false;
	
	let deferredPrompt: any = null;
	let isInstallable = false;
	let isInstalled = false;
	let platform = 'unknown';

	onMount(() => {
		// Detect platform
		const userAgent = navigator.userAgent.toLowerCase();
		if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
			platform = 'ios';
		} else if (userAgent.includes('android')) {
			platform = 'android';
		} else {
			platform = 'desktop';
		}

		// Check if already installed
		if (window.matchMedia('(display-mode: standalone)').matches) {
			isInstalled = true;
			return;
		}

		// Listen for install prompt
		window.addEventListener('beforeinstallprompt', (e) => {
			console.log('[PWA Install] Install prompt available');
			e.preventDefault();
			deferredPrompt = e;
			isInstallable = true;
			show = true;
		});

		// Listen for successful installation
		window.addEventListener('appinstalled', () => {
			console.log('[PWA Install] App installed successfully');
			isInstalled = true;
			show = false;
			deferredPrompt = null;
		});
	});

	async function installPWA() {
		if (!deferredPrompt) {
			console.log('[PWA Install] No install prompt available');
			return;
		}

		try {
			console.log('[PWA Install] Showing install prompt');
			deferredPrompt.prompt();
			
			const { outcome } = await deferredPrompt.userChoice;
			console.log('[PWA Install] User choice:', outcome);
			
			if (outcome === 'accepted') {
				console.log('[PWA Install] User accepted installation');
			} else {
				console.log('[PWA Install] User dismissed installation');
			}
			
			deferredPrompt = null;
			show = false;
		} catch (error) {
			console.error('[PWA Install] Installation failed:', error);
		}
	}

	function dismissPrompt() {
		show = false;
		// Remember user dismissed (could use localStorage)
		localStorage.setItem('pwa-install-dismissed', Date.now().toString());
	}

	// Platform-specific install instructions
	$: installInstructions = {
		ios: {
			icon: Smartphone,
			title: 'Install VuAppStore',
			steps: [
				'Tap the Share button in Safari',
				'Scroll down and tap "Add to Home Screen"',
				'Tap "Add" to install VuAppStore'
			]
		},
		android: {
			icon: Smartphone,
			title: 'Install VuAppStore',
			steps: [
				'Tap "Add to Home Screen" when prompted',
				'Or use the menu → "Install app"',
				'VuAppStore will appear in your app drawer'
			]
		},
		desktop: {
			icon: Monitor,
			title: 'Install VuAppStore',
			steps: [
				'Click the install icon in the address bar',
				'Or use Chrome menu → "Install VuAppStore"',
				'Access from your desktop or taskbar'
			]
		}
	};

	$: currentInstructions = installInstructions[platform as keyof typeof installInstructions] || installInstructions.desktop;
</script>

{#if show && !isInstalled}
	<div class="pwa-install-prompt">
		<div class="prompt-backdrop" on:click={dismissPrompt}></div>
		<div class="prompt-content glass-card">
			<div class="prompt-header">
				<div class="prompt-icon">
					<Shield class="w-8 h-8 text-primary" />
				</div>
				<div class="prompt-title">
					<h3>Install VuAppStore</h3>
					<p>Get the full privacy-first experience</p>
				</div>
				<button class="prompt-close" on:click={dismissPrompt} aria-label="Close">
					<X class="w-5 h-5" />
				</button>
			</div>

			<div class="prompt-benefits">
				<div class="benefit">
					<Download class="w-5 h-5 text-success" />
					<span>Offline app browsing</span>
				</div>
				<div class="benefit">
					<Shield class="w-5 h-5 text-primary" />
					<span>Enhanced privacy protection</span>
				</div>
				<div class="benefit">
					<svelte:component this={currentInstructions.icon} class="w-5 h-5 text-info" />
					<span>Native app experience</span>
				</div>
			</div>

			{#if isInstallable && platform !== 'ios'}
				<!-- Chrome/Android automatic install -->
				<div class="prompt-actions">
					<button class="btn btn-primary" on:click={installPWA}>
						<Download class="w-5 h-5" />
						Install App
					</button>
					<button class="btn btn-secondary" on:click={dismissPrompt}>
						Maybe Later
					</button>
				</div>
			{:else}
				<!-- Manual install instructions -->
				<div class="install-instructions">
					<h4>How to Install:</h4>
					<ol>
						{#each currentInstructions.steps as step}
							<li>{step}</li>
						{/each}
					</ol>
				</div>
				<div class="prompt-actions">
					<button class="btn btn-secondary" on:click={dismissPrompt}>
						Got it!
					</button>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.pwa-install-prompt {
		position: fixed;
		inset: 0;
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}

	.prompt-backdrop {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(8px);
	}

	.prompt-content {
		position: relative;
		z-index: 1001;
		background: var(--color-background);
		border: 1px solid var(--color-border);
		border-radius: 16px;
		padding: 24px;
		max-width: 400px;
		width: 100%;
		max-height: 80vh;
		overflow-y: auto;
	}

	.prompt-header {
		display: flex;
		align-items: flex-start;
		gap: 16px;
		margin-bottom: 20px;
	}

	.prompt-icon {
		flex-shrink: 0;
		width: 48px;
		height: 48px;
		background: var(--color-primary-20);
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.prompt-title {
		flex: 1;
		min-width: 0;
	}

	.prompt-title h3 {
		font-size: 18px;
		font-weight: 700;
		color: var(--color-text-primary);
		margin-bottom: 4px;
	}

	.prompt-title p {
		font-size: 14px;
		color: var(--color-text-secondary);
		margin: 0;
	}

	.prompt-close {
		flex-shrink: 0;
		background: transparent;
		border: none;
		color: var(--color-text-secondary);
		cursor: pointer;
		padding: 4px;
		border-radius: 4px;
		transition: all 0.2s ease;
	}

	.prompt-close:hover {
		background: var(--color-glass);
		color: var(--color-text-primary);
	}

	.prompt-benefits {
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin-bottom: 24px;
	}

	.benefit {
		display: flex;
		align-items: center;
		gap: 12px;
		font-size: 14px;
		color: var(--color-text-secondary);
	}

	.install-instructions {
		margin-bottom: 20px;
	}

	.install-instructions h4 {
		font-size: 16px;
		font-weight: 600;
		color: var(--color-text-primary);
		margin-bottom: 12px;
	}

	.install-instructions ol {
		padding-left: 20px;
		color: var(--color-text-secondary);
		font-size: 14px;
		line-height: 1.5;
	}

	.install-instructions li {
		margin-bottom: 8px;
	}

	.prompt-actions {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
	}

	.prompt-actions .btn {
		flex: 1;
		justify-content: center;
		min-width: 120px;
	}

	/* Mobile responsive */
	@media (max-width: 480px) {
		.prompt-content {
			margin: 16px;
			padding: 20px;
		}

		.prompt-header {
			gap: 12px;
		}

		.prompt-icon {
			width: 40px;
			height: 40px;
		}

		.prompt-actions {
			flex-direction: column;
		}

		.prompt-actions .btn {
			width: 100%;
		}
	}
</style>
