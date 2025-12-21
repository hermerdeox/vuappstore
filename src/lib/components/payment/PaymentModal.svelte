<script lang="ts">
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { licenseStore } from '$lib/stores/license';
	import { X, Shield, Zap, Crown, Copy, Check, Loader2, ExternalLink } from 'lucide-svelte';
	import QRCode from 'qrcode';

	export let app: string;
	export let appName: string;
	export let isOpen = false;

	const dispatch = createEventDispatcher();

	type Tier = 'monthly' | 'yearly' | 'lifetime';

	let selectedTier: Tier = 'yearly';
	let paymentAddress = '';
	let paymentId = '';
	let amount = 0;
	let amountUSD = 0;
	let qrCodeUrl = '';
	let txId = '';
	let step: 'select' | 'pay' | 'verify' | 'complete' | 'error' = 'select';
	let error = '';
	let checking = false;
	let copied = false;

	const tiers: Record<Tier, { label: string; price: string; xmr: string; calc: string; icon: typeof Shield }> = {
		monthly: { 
			label: 'Monthly', 
			price: '$5.12', 
			xmr: '~0.03 XMR', 
			calc: '512 × $0.01',
			icon: Zap
		},
		yearly: { 
			label: 'Yearly', 
			price: '$51.20', 
			xmr: '~0.30 XMR', 
			calc: '512 × $0.10',
			icon: Shield
		},
		lifetime: { 
			label: 'Lifetime', 
			price: '$256', 
			xmr: '~1.50 XMR', 
			calc: '256-bit legacy',
			icon: Crown
		}
	};

	async function generatePaymentAddress() {
		step = 'pay';
		error = '';

		try {
			const response = await fetch('/api/payment/address', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ app, tier: selectedTier })
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Failed to generate address');
			}

			const data = await response.json();
			paymentAddress = data.address;
			paymentId = data.paymentId;
			amount = data.amount;
			amountUSD = data.amountUSD;

			// Generate QR code
			qrCodeUrl = await QRCode.toDataURL(data.qrData, {
				width: 200,
				margin: 2,
				color: { dark: '#000000', light: '#ffffff' }
			});
		} catch (e) {
			error = e instanceof Error ? e.message : 'Unknown error';
			step = 'error';
		}
	}

	async function verifyPayment() {
		if (!txId.trim()) {
			error = 'Please enter your transaction ID';
			return;
		}

		step = 'verify';
		checking = true;
		error = '';

		try {
			const license = await licenseStore.purchaseLicense(app, selectedTier, txId);
			if (license) {
				step = 'complete';
			}
		} catch (e) {
			error = e instanceof Error ? e.message : 'Payment verification failed';
			step = 'pay';
		} finally {
			checking = false;
		}
	}

	function close() {
		dispatch('close');
	}

	function reset() {
		step = 'select';
		error = '';
		txId = '';
		paymentAddress = '';
		copied = false;
	}

	async function copyAddress() {
		await navigator.clipboard.writeText(paymentAddress);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') close();
	}

	onDestroy(() => {
		// Cleanup
	});
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
	<div class="modal-backdrop" on:click={close} on:keydown={(e) => e.key === 'Escape' && close()} role="presentation">
		<div class="modal" on:click|stopPropagation role="dialog" aria-modal="true" aria-labelledby="modal-title">
			<button class="close-btn" on:click={close} aria-label="Close">
				<X class="w-5 h-5" />
			</button>

			{#if step === 'select'}
				<div class="modal-header">
					<h2 id="modal-title">Purchase {appName}</h2>
					<p>Select your license tier</p>
				</div>

				<div class="tier-grid">
					{#each Object.entries(tiers) as [key, tier]}
						<button
							class="tier-card"
							class:selected={selectedTier === key}
							on:click={() => (selectedTier = key as Tier)}
						>
							{#if key === 'yearly'}
								<span class="badge">BEST VALUE</span>
							{/if}
							<svelte:component this={tier.icon} class="tier-icon" />
							<h3>{tier.label}</h3>
							<div class="price">{tier.price}</div>
							<div class="calc">{tier.calc}</div>
							<div class="xmr">{tier.xmr}</div>
						</button>
					{/each}
				</div>

				<div class="privacy-note">
					<Shield class="w-5 h-5 text-primary" />
					<p>Anonymous payment via Monero. We will never know who you are.</p>
				</div>

				<button class="btn-primary full" on:click={generatePaymentAddress}>
					Continue to Payment
				</button>

			{:else if step === 'pay'}
				<div class="modal-header">
					<h2 id="modal-title">Send Monero Payment</h2>
					<p>Scan or copy the address below</p>
				</div>

				<div class="payment-details">
					<div class="qr-container">
						{#if qrCodeUrl}
							<img src={qrCodeUrl} alt="Payment QR Code" />
						{:else}
							<div class="qr-placeholder">
								<Loader2 class="w-8 h-8 animate-spin" />
							</div>
						{/if}
					</div>

					<div class="amount-display">
						<span class="label">Amount</span>
						<span class="value">{amount} XMR</span>
						<span class="usd">(${amountUSD} USD)</span>
					</div>

					<div class="address-container">
						<label for="address">Payment Address</label>
						<div class="address">
							<code id="address">{paymentAddress}</code>
							<button class="copy-btn" on:click={copyAddress} aria-label="Copy address">
								{#if copied}
									<Check class="w-4 h-4" />
								{:else}
									<Copy class="w-4 h-4" />
								{/if}
							</button>
						</div>
					</div>

					<div class="tx-input">
						<label for="txId">After sending, paste your Transaction ID:</label>
						<input
							id="txId"
							type="text"
							bind:value={txId}
							placeholder="Enter Monero transaction ID"
						/>
					</div>

					{#if error}
						<div class="error">{error}</div>
					{/if}
				</div>

				<div class="button-row">
					<button class="btn-secondary" on:click={reset}>Back</button>
					<button class="btn-primary" on:click={verifyPayment} disabled={!txId.trim()}>
						Verify Payment
					</button>
				</div>

			{:else if step === 'verify'}
				<div class="modal-header">
					<h2 id="modal-title">Verifying Payment</h2>
					<p>Please wait while we verify your transaction</p>
				</div>

				<div class="loading">
					<Loader2 class="spinner" />
					<p>Checking Monero blockchain...</p>
					<p class="note">This may take a few minutes for confirmation</p>
				</div>

			{:else if step === 'complete'}
				<div class="modal-header success">
					<div class="success-icon">
						<Check class="w-8 h-8" />
					</div>
					<h2 id="modal-title">License Activated!</h2>
					<p>Your {appName} license is now active</p>
				</div>

				<div class="success-details">
					<div class="detail-row">
						<span>App</span>
						<span>{appName}</span>
					</div>
					<div class="detail-row">
						<span>Tier</span>
						<span>{tiers[selectedTier].label}</span>
					</div>
					<div class="detail-row">
						<span>Identity Known</span>
						<span class="highlight">None</span>
					</div>
				</div>

				<div class="privacy-reminder">
					<p>
						Your license has been stored locally on your device. We have no record of this
						transaction being linked to you.
					</p>
				</div>

				<button class="btn-primary full" on:click={close}>
					Start Using {appName}
				</button>

			{:else if step === 'error'}
				<div class="modal-header error">
					<div class="error-icon">!</div>
					<h2 id="modal-title">Something Went Wrong</h2>
					<p>{error}</p>
				</div>

				<button class="btn-primary full" on:click={reset}> Try Again </button>
			{/if}

			<div class="modal-footer">
				<a href="/how-licensing-works" class="learn-more" target="_blank">
					How anonymous licensing works <ExternalLink class="w-3 h-3" />
				</a>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.9);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 24px;
		z-index: 1000;
		backdrop-filter: blur(10px);
	}

	.modal {
		background: var(--color-surface, #0a0a0a);
		border: 1px solid rgba(255, 255, 255, 0.1);
		max-width: 480px;
		width: 100%;
		max-height: 90vh;
		overflow-y: auto;
		position: relative;
		padding: 32px;
	}

	.close-btn {
		position: absolute;
		top: 16px;
		right: 16px;
		width: 32px;
		height: 32px;
		background: transparent;
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: var(--color-text-primary, #fff);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s;
	}

	.close-btn:hover {
		border-color: rgba(255, 255, 255, 0.3);
		background: rgba(255, 255, 255, 0.05);
	}

	.modal-header {
		text-align: center;
		margin-bottom: 32px;
	}

	.modal-header h2 {
		font-size: 24px;
		font-weight: 700;
		margin-bottom: 8px;
	}

	.modal-header p {
		color: var(--color-text-secondary, rgba(255, 255, 255, 0.6));
	}

	.modal-header.success h2 {
		color: #22c55e;
	}

	.modal-header.error h2 {
		color: #ef4444;
	}

	.success-icon,
	.error-icon {
		width: 64px;
		height: 64px;
		margin: 0 auto 16px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32px;
	}

	.success-icon {
		background: rgba(34, 197, 94, 0.1);
		border: 2px solid #22c55e;
		color: #22c55e;
	}

	.error-icon {
		background: rgba(239, 68, 68, 0.1);
		border: 2px solid #ef4444;
		color: #ef4444;
	}

	.tier-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 12px;
		margin-bottom: 24px;
	}

	.tier-card {
		padding: 20px 12px;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.1);
		cursor: pointer;
		text-align: center;
		position: relative;
		transition: all 0.2s;
	}

	.tier-card:hover {
		border-color: rgba(255, 255, 255, 0.2);
	}

	.tier-card.selected {
		border-color: var(--color-primary, #00d4ff);
		background: rgba(0, 212, 255, 0.05);
	}

	.tier-card .badge {
		position: absolute;
		top: -10px;
		left: 50%;
		transform: translateX(-50%);
		padding: 2px 8px;
		background: var(--color-primary, #00d4ff);
		color: #000;
		font-size: 8px;
		font-weight: 700;
		letter-spacing: 0.1em;
	}

	.tier-card :global(.tier-icon) {
		width: 24px;
		height: 24px;
		margin: 0 auto 8px;
		color: var(--color-text-secondary, rgba(255, 255, 255, 0.6));
	}

	.tier-card.selected :global(.tier-icon) {
		color: var(--color-primary, #00d4ff);
	}

	.tier-card h3 {
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: 8px;
	}

	.tier-card .price {
		font-size: 24px;
		font-weight: 700;
		margin-bottom: 4px;
	}

	.tier-card .calc {
		font-size: 10px;
		color: var(--color-text-tertiary, rgba(255, 255, 255, 0.5));
		font-family: monospace;
		margin-bottom: 8px;
	}

	.tier-card .xmr {
		font-size: 11px;
		color: var(--color-primary, #00d4ff);
	}

	.privacy-note {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 16px;
		background: rgba(0, 212, 255, 0.05);
		border: 1px solid rgba(0, 212, 255, 0.2);
		margin-bottom: 24px;
	}

	.privacy-note p {
		font-size: 13px;
		color: var(--color-text-secondary, rgba(255, 255, 255, 0.8));
		margin: 0;
	}

	.payment-details {
		margin-bottom: 24px;
	}

	.qr-container {
		text-align: center;
		margin-bottom: 24px;
		padding: 16px;
		background: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 200px;
	}

	.qr-container img {
		display: block;
	}

	.qr-placeholder {
		color: #000;
	}

	.amount-display {
		text-align: center;
		margin-bottom: 24px;
	}

	.amount-display .label {
		display: block;
		font-size: 12px;
		color: var(--color-text-tertiary, rgba(255, 255, 255, 0.5));
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: 4px;
	}

	.amount-display .value {
		display: block;
		font-size: 32px;
		font-weight: 700;
		color: var(--color-primary, #00d4ff);
	}

	.amount-display .usd {
		font-size: 14px;
		color: var(--color-text-secondary, rgba(255, 255, 255, 0.5));
	}

	.address-container {
		margin-bottom: 24px;
	}

	.address-container label {
		display: block;
		font-size: 12px;
		color: var(--color-text-tertiary, rgba(255, 255, 255, 0.5));
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: 8px;
	}

	.address {
		display: flex;
		gap: 8px;
	}

	.address code {
		flex: 1;
		padding: 12px;
		background: rgba(0, 0, 0, 0.5);
		border: 1px solid rgba(255, 255, 255, 0.1);
		font-family: monospace;
		font-size: 11px;
		word-break: break-all;
		color: var(--color-primary, #00d4ff);
	}

	.copy-btn {
		padding: 12px 16px;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		color: var(--color-text-primary, #fff);
		cursor: pointer;
		transition: all 0.2s;
	}

	.copy-btn:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	.tx-input {
		margin-bottom: 16px;
	}

	.tx-input label {
		display: block;
		font-size: 13px;
		margin-bottom: 8px;
	}

	.tx-input input {
		width: 100%;
		padding: 14px 16px;
		background: transparent;
		border: 1px solid rgba(255, 255, 255, 0.2);
		color: var(--color-text-primary, #fff);
		font-size: 14px;
	}

	.tx-input input:focus {
		outline: none;
		border-color: var(--color-primary, #00d4ff);
	}

	.error {
		padding: 12px;
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.3);
		color: #ef4444;
		font-size: 13px;
		margin-bottom: 16px;
	}

	.button-row {
		display: flex;
		gap: 12px;
	}

	.btn-primary {
		flex: 1;
		padding: 16px 24px;
		background: var(--color-primary, #00d4ff);
		color: #000;
		border: none;
		font-weight: 600;
		cursor: pointer;
		font-size: 14px;
		transition: all 0.2s;
	}

	.btn-primary:hover:not(:disabled) {
		background: #fff;
	}

	.btn-primary:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.btn-primary.full {
		width: 100%;
	}

	.btn-secondary {
		padding: 16px 24px;
		background: transparent;
		color: var(--color-text-primary, #fff);
		border: 1px solid rgba(255, 255, 255, 0.2);
		cursor: pointer;
		font-size: 14px;
		transition: all 0.2s;
	}

	.btn-secondary:hover {
		border-color: rgba(255, 255, 255, 0.4);
	}

	.loading {
		text-align: center;
		padding: 48px 0;
	}

	.loading :global(.spinner) {
		width: 48px;
		height: 48px;
		color: var(--color-primary, #00d4ff);
		margin: 0 auto 24px;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.loading .note {
		font-size: 13px;
		color: var(--color-text-tertiary, rgba(255, 255, 255, 0.5));
		margin-top: 8px;
	}

	.success-details {
		padding: 24px;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.1);
		margin-bottom: 24px;
	}

	.detail-row {
		display: flex;
		justify-content: space-between;
		padding: 12px 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
	}

	.detail-row:last-child {
		border-bottom: none;
	}

	.detail-row .highlight {
		color: #22c55e;
		font-weight: 600;
	}

	.privacy-reminder {
		padding: 16px;
		background: rgba(34, 197, 94, 0.05);
		border: 1px solid rgba(34, 197, 94, 0.2);
		margin-bottom: 24px;
	}

	.privacy-reminder p {
		font-size: 13px;
		color: var(--color-text-secondary, rgba(255, 255, 255, 0.8));
		margin: 0;
		line-height: 1.5;
	}

	.modal-footer {
		margin-top: 24px;
		text-align: center;
		padding-top: 24px;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	.learn-more {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-size: 12px;
		color: var(--color-text-tertiary, rgba(255, 255, 255, 0.5));
		text-decoration: none;
		transition: color 0.2s;
	}

	.learn-more:hover {
		color: var(--color-primary, #00d4ff);
	}
</style>

