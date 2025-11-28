<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { auth } from '$lib/stores/auth';
	import { validatePassphrase } from '$lib/auth/crypto';
	import PassphraseInput from './PassphraseInput.svelte';
	import { X, Shield, AlertTriangle, Key, Download, CheckCircle2, Loader2 } from 'lucide-svelte';

	export let isOpen = false;

	const dispatch = createEventDispatcher<{
		close: void;
		success: { fingerprint: string };
	}>();

	let step: 'create' | 'confirm' | 'backup' | 'complete' = 'create';
	let passphrase = '';
	let confirmPassphrase = '';
	let handle = '';
	let privacyLevel: 0 | 1 | 2 | 3 | 4 = 0;
	let understood = false;
	let isCreating = false;
	let error = '';
	let createdFingerprint = '';
	let backupData = '';

	$: validation = validatePassphrase(passphrase);
	$: canProceed = validation.valid && understood;
	$: passphrasesMatch = passphrase === confirmPassphrase;

	function close() {
		resetForm();
		dispatch('close');
	}

	function resetForm() {
		step = 'create';
		passphrase = '';
		confirmPassphrase = '';
		handle = '';
		privacyLevel = 0;
		understood = false;
		error = '';
		createdFingerprint = '';
		backupData = '';
	}

	async function handleCreate() {
		if (!canProceed) return;
		step = 'confirm';
	}

	async function confirmAndCreate() {
		if (!passphrasesMatch) {
			error = 'Passphrases do not match';
			return;
		}

		isCreating = true;
		error = '';

		try {
			const identity = await auth.create(passphrase, {
				handle: handle || undefined,
				privacyLevel
			});

			createdFingerprint = identity.fingerprint;
			backupData = (await auth.exportBackup()) || '';
			step = 'backup';
		} catch (e) {
			error = e instanceof Error ? e.message : 'Failed to create identity';
		} finally {
			isCreating = false;
		}
	}

	function downloadBackup() {
		if (!backupData) return;

		const blob = new Blob([backupData], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `vu-identity-backup-${createdFingerprint}.vu`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}

	function complete() {
		dispatch('success', { fingerprint: createdFingerprint });
		close();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			close();
		}
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			close();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
	<div
		class="modal-backdrop"
		style="position: fixed; inset: 0; z-index: 9999; background: rgba(0,0,0,0.85); backdrop-filter: blur(8px); display: flex; justify-content: center; align-items: flex-start; padding: 40px 20px; overflow-y: auto;"
		transition:fade={{ duration: 200 }}
		on:click={handleBackdropClick}
		on:keydown={(e) => e.key === 'Escape' && close()}
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
		tabindex="-1"
	>
		<div class="modal-content" style="width: 100%; max-width: 480px; background: #0a0a0a; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; box-shadow: 0 25px 80px rgba(0,0,0,0.6); flex-shrink: 0;" transition:fly={{ y: -50, duration: 300 }}>
			<!-- Header -->
			<div class="modal-header" style="display: flex; align-items: center; justify-content: space-between; padding: 24px; border-bottom: 1px solid rgba(255,255,255,0.1); background: #0a0a0a;">
				<div class="header-content">
					<div class="header-icon">
						<Key class="text-cyan-400" size={20} />
					</div>
					<div>
						<h2 id="modal-title" class="modal-title">
							{#if step === 'create'}
								Create Sovereign Identity
							{:else if step === 'confirm'}
								Confirm Passphrase
							{:else if step === 'backup'}
								Save Your Backup
							{:else}
								Identity Created
							{/if}
						</h2>
						<p class="modal-subtitle">
							{#if step === 'create'}
								Your key to the VU ecosystem
							{:else if step === 'confirm'}
								Enter your passphrase again
							{:else if step === 'backup'}
								This is your only recovery option
							{:else}
								Welcome to true privacy
							{/if}
						</p>
					</div>
				</div>

				<button class="close-button" on:click={close}>
					<X size={20} />
				</button>
			</div>

			<!-- Body -->
			<div class="modal-body" style="padding: 24px; display: flex; flex-direction: column; gap: 20px; background: #0a0a0a;">
				{#if step === 'create'}
					<!-- Warning -->
					<div class="warning-box">
						<AlertTriangle class="text-yellow-500 flex-shrink-0 mt-0.5" size={20} />
						<div class="warning-content">
							<p class="warning-title">No Recovery Possible</p>
							<p class="warning-text">
								Your passphrase cannot be reset or recovered. If you forget it, your identity is
								lost forever. This is by design—it means we can never access your data either.
							</p>
						</div>
					</div>

					<!-- Passphrase Input -->
					<div class="form-group">
						<label class="form-label">Create Your Passphrase</label>
						<PassphraseInput
							bind:value={passphrase}
							placeholder="Enter a strong passphrase (min 16 characters)"
							showStrength
							showGenerator
						/>
					</div>

					<!-- Handle (optional) -->
					<div class="form-group">
						<label class="form-label">Display Name (Optional)</label>
						<input
							type="text"
							bind:value={handle}
							placeholder="How should we address you?"
							class="form-input"
						/>
						<p class="form-hint">
							This is just for display. It's not unique or verified.
						</p>
					</div>

					<!-- Privacy Level -->
					<div class="form-group">
						<label class="form-label">Default Privacy Level</label>
						<select bind:value={privacyLevel} class="form-select">
							<option value={0}>Level 0 - Zero-Knowledge (Maximum)</option>
							<option value={1}>Level 1 - Local-First</option>
							<option value={2}>Level 2 - Privacy First</option>
							<option value={3}>Level 3 - Enhanced</option>
							<option value={4}>Level 4 - Basic</option>
						</select>
					</div>

					<!-- Understanding Checkbox -->
					<label class="checkbox-label">
						<input
							type="checkbox"
							bind:checked={understood}
							class="checkbox-input"
						/>
						<span class="checkbox-text">
							I understand that my passphrase cannot be recovered. I will save a backup of my
							identity.
						</span>
					</label>
				{:else if step === 'confirm'}
					<div class="form-group">
						<label class="form-label">Confirm Your Passphrase</label>
						<PassphraseInput bind:value={confirmPassphrase} placeholder="Re-enter your passphrase" />

						{#if confirmPassphrase && !passphrasesMatch}
							<p class="error-text">Passphrases do not match</p>
						{/if}
					</div>
				{:else if step === 'backup'}
					<div class="success-content">
						<div class="success-icon">
							<CheckCircle2 class="text-green-500" size={32} />
						</div>

						<div class="success-text-group">
							<p class="success-title">Identity Created!</p>
							<p class="success-subtitle">
								Your fingerprint: <code class="fingerprint-code">{createdFingerprint}</code>
							</p>
						</div>

						<div class="backup-warning">
							<p class="backup-warning-title">Important: Save Your Backup</p>
							<p class="backup-warning-text">
								Download this backup file and store it securely. It's encrypted with your passphrase
								and is the only way to recover your identity on a new device.
							</p>
						</div>

						<button class="download-button" on:click={downloadBackup}>
							<Download size={20} />
							Download Backup File
						</button>
					</div>
				{:else}
					<div class="success-content">
						<div class="success-icon shield">
							<Shield class="text-green-500" size={32} />
						</div>

						<div class="success-text-group">
							<p class="welcome-title">Welcome to VU</p>
							<p class="welcome-text">
								Your sovereign identity is ready. You now have cryptographic control over your
								digital presence.
							</p>
						</div>
					</div>
				{/if}

				{#if error}
					<div class="error-box">
						{error}
					</div>
				{/if}
			</div>

			<!-- Footer -->
			<div class="modal-footer" style="display: flex; justify-content: flex-end; gap: 12px; padding: 20px 24px; border-top: 1px solid rgba(255,255,255,0.1); background: #0a0a0a;">
				{#if step === 'create'}
					<button class="btn-secondary" on:click={close}>
						Cancel
					</button>
					<button
						class="btn-primary"
						disabled={!canProceed}
						on:click={handleCreate}
					>
						Continue
					</button>
				{:else if step === 'confirm'}
					<button class="btn-secondary" on:click={() => (step = 'create')}>
						Back
					</button>
					<button
						class="btn-primary"
						disabled={!passphrasesMatch || isCreating}
						on:click={confirmAndCreate}
					>
						{#if isCreating}
							<Loader2 size={18} class="animate-spin" />
							Creating...
						{:else}
							Create Identity
						{/if}
					</button>
				{:else if step === 'backup'}
					<button class="btn-ghost" on:click={() => (step = 'complete')}>
						I've Saved My Backup
					</button>
				{:else}
					<button class="btn-primary" on:click={complete}>
						Get Started
					</button>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9999;
		background: rgba(0, 0, 0, 0.85);
		backdrop-filter: blur(8px);
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20px;
	}

	.modal-content {
		width: 100%;
		max-width: 480px;
		max-height: calc(100vh - 40px);
		overflow-y: auto;
		background: #0a0a0a;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 16px;
		box-shadow: 0 25px 80px rgba(0, 0, 0, 0.6);
	}

	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		background: #0a0a0a;
	}

	.header-content {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.header-icon {
		width: 40px;
		height: 40px;
		border-radius: 12px;
		background: rgba(0, 212, 255, 0.15);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.modal-title {
		font-size: 18px;
		font-weight: 600;
		color: var(--color-text-primary, #ffffff);
		margin: 0;
	}

	.modal-subtitle {
		font-size: 14px;
		color: var(--color-text-secondary, rgba(255, 255, 255, 0.6));
		margin: 4px 0 0 0;
	}

	.close-button {
		padding: 8px;
		border-radius: 8px;
		background: transparent;
		border: none;
		color: var(--color-text-secondary, rgba(255, 255, 255, 0.6));
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.close-button:hover {
		background: var(--color-glass, rgba(255, 255, 255, 0.05));
		color: var(--color-text-primary, #ffffff);
	}

	.modal-body {
		padding: 24px;
		display: flex;
		flex-direction: column;
		gap: 20px;
		background: #0a0a0a;
	}

	.warning-box {
		display: flex;
		gap: 12px;
		padding: 16px;
		border-radius: 12px;
		background: rgba(234, 179, 8, 0.1);
		border: 1px solid rgba(234, 179, 8, 0.2);
	}

	.warning-content {
		font-size: 14px;
	}

	.warning-title {
		font-weight: 600;
		color: #eab308;
		margin: 0 0 4px 0;
	}

	.warning-text {
		color: var(--color-text-secondary, rgba(255, 255, 255, 0.6));
		margin: 0;
		line-height: 1.5;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.form-label {
		font-size: 14px;
		font-weight: 500;
		color: var(--color-text-secondary, rgba(255, 255, 255, 0.6));
	}

	.form-input,
	.form-select {
		width: 100%;
		padding: 12px 16px;
		background: var(--color-glass, rgba(255, 255, 255, 0.05));
		border: 1px solid var(--color-border, rgba(255, 255, 255, 0.1));
		border-radius: 12px;
		color: var(--color-text-primary, #ffffff);
		font-size: 16px;
		outline: none;
		transition: all 0.2s ease;
	}

	.form-input::placeholder {
		color: var(--color-text-tertiary, rgba(255, 255, 255, 0.4));
	}

	.form-input:focus,
	.form-select:focus {
		border-color: var(--color-primary, #00d4ff);
		box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.15);
	}

	.form-select {
		appearance: none;
		cursor: pointer;
	}

	.form-select option {
		background: #111;
		color: white;
	}

	.form-hint {
		font-size: 12px;
		color: var(--color-text-tertiary, rgba(255, 255, 255, 0.4));
		margin: 0;
	}

	.checkbox-label {
		display: flex;
		align-items: flex-start;
		gap: 12px;
		cursor: pointer;
	}

	.checkbox-input {
		margin-top: 2px;
		width: 18px;
		height: 18px;
		border-radius: 4px;
		border: 1px solid var(--color-border, rgba(255, 255, 255, 0.2));
		background: var(--color-glass, rgba(255, 255, 255, 0.05));
		accent-color: var(--color-primary, #00d4ff);
		flex-shrink: 0;
	}

	.checkbox-text {
		font-size: 14px;
		color: var(--color-text-secondary, rgba(255, 255, 255, 0.6));
		line-height: 1.5;
	}

	.error-text {
		font-size: 14px;
		color: #f87171;
		margin: 8px 0 0 0;
	}

	.error-box {
		padding: 12px;
		border-radius: 8px;
		background: rgba(248, 113, 113, 0.1);
		border: 1px solid rgba(248, 113, 113, 0.2);
		color: #f87171;
		font-size: 14px;
	}

	.success-content {
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 16px;
		align-items: center;
	}

	.success-icon {
		width: 64px;
		height: 64px;
		border-radius: 16px;
		background: rgba(34, 197, 94, 0.15);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.success-text-group {
		text-align: center;
	}

	.success-title {
		font-size: 18px;
		font-weight: 600;
		color: var(--color-text-primary, #ffffff);
		margin: 0;
	}

	.success-subtitle {
		font-size: 14px;
		color: var(--color-text-secondary, rgba(255, 255, 255, 0.6));
		margin: 4px 0 0 0;
	}

	.fingerprint-code {
		color: var(--color-primary, #00d4ff);
		font-family: monospace;
	}

	.backup-warning {
		padding: 16px;
		border-radius: 12px;
		background: rgba(234, 179, 8, 0.1);
		border: 1px solid rgba(234, 179, 8, 0.2);
		text-align: left;
		width: 100%;
	}

	.backup-warning-title {
		font-size: 14px;
		font-weight: 600;
		color: #eab308;
		margin: 0 0 8px 0;
	}

	.backup-warning-text {
		font-size: 14px;
		color: var(--color-text-secondary, rgba(255, 255, 255, 0.6));
		margin: 0;
		line-height: 1.5;
	}

	.download-button {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 14px 24px;
		background: var(--color-primary, #00d4ff);
		color: #000;
		font-weight: 600;
		font-size: 16px;
		border: none;
		border-radius: 12px;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.download-button:hover {
		background: #00b8d9;
		transform: translateY(-1px);
	}

	.welcome-title {
		font-size: 24px;
		font-weight: 600;
		color: var(--color-text-primary, #ffffff);
		margin: 0;
	}

	.welcome-text {
		font-size: 16px;
		color: var(--color-text-secondary, rgba(255, 255, 255, 0.6));
		margin: 8px 0 0 0;
		line-height: 1.6;
	}

	.modal-footer {
		display: flex;
		justify-content: flex-end;
		gap: 12px;
		padding: 20px 24px;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		background: #0a0a0a;
	}

	.btn-primary {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 20px;
		background: var(--color-primary, #00d4ff);
		color: #000;
		font-weight: 600;
		font-size: 14px;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.btn-primary:hover:not(:disabled) {
		background: #00b8d9;
	}

	.btn-primary:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.btn-secondary {
		padding: 10px 16px;
		background: transparent;
		color: var(--color-text-secondary, rgba(255, 255, 255, 0.6));
		font-weight: 500;
		font-size: 14px;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.btn-secondary:hover {
		color: var(--color-text-primary, #ffffff);
	}

	.btn-ghost {
		padding: 10px 20px;
		background: var(--color-glass, rgba(255, 255, 255, 0.1));
		color: var(--color-text-primary, #ffffff);
		font-weight: 600;
		font-size: 14px;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.btn-ghost:hover {
		background: rgba(255, 255, 255, 0.15);
	}

	@media (max-width: 640px) {
		.modal-backdrop {
			padding: 16px;
		}

		.modal-header,
		.modal-body,
		.modal-footer {
			padding: 16px;
		}

		.modal-footer {
			flex-direction: column;
		}

		.btn-primary,
		.btn-secondary,
		.btn-ghost {
			width: 100%;
			justify-content: center;
		}
	}
</style>
