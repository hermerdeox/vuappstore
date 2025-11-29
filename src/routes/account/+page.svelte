<script lang="ts">
	import {
		auth,
		isAuthenticated,
		fingerprint,
		handle,
		privacyLevel,
		isLocked,
		hasStoredIdentity,
		isLoading
	} from '$lib/stores/auth';
	import {
		User,
		CreditCard,
		Download,
		Settings,
		LogOut,
		Shield,
		Key,
		AlertTriangle,
		CheckCircle2,
		Loader2,
		RefreshCw,
		Trash2,
		Upload
	} from 'lucide-svelte';
	import CreateIdentityModal from '$lib/components/auth/CreateIdentityModal.svelte';
	import UnlockIdentityModal from '$lib/components/auth/UnlockIdentityModal.svelte';

	let showCreateModal = false;
	let showUnlockModal = false;
	let storedFingerprint = '';

	let isExporting = false;
	let isImporting = false;
	let showDestroyConfirm = false;
	let showChangePassphrase = false;
	let message: { type: 'success' | 'error'; text: string } | null = null;

	// Passphrase change form
	let oldPassphrase = '';
	let newPassphrase = '';
	let confirmNewPassphrase = '';
	let isChangingPassphrase = false;

	// Import form
	let backupFile: File | null = null;
	let importPassphrase = '';

	// Load stored fingerprint
	$: if ($hasStoredIdentity && !$isAuthenticated) {
		import('$lib/auth/storage').then(({ loadIdentity }) => {
			loadIdentity().then((stored) => {
				if (stored) storedFingerprint = stored.fingerprint;
			});
		});
	}

	function showMessage(type: 'success' | 'error', text: string) {
		message = { type, text };
		setTimeout(() => {
			message = null;
		}, 5000);
	}

	async function exportBackup() {
		isExporting = true;
		try {
			const backup = await auth.exportBackup();
			if (backup) {
				const blob = new Blob([backup], { type: 'text/plain' });
				const url = URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = `vu-identity-backup-${$fingerprint}.vu`;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
				URL.revokeObjectURL(url);
				showMessage('success', 'Backup downloaded successfully');
			}
		} catch (e) {
			showMessage('error', 'Failed to export backup');
		} finally {
			isExporting = false;
		}
	}

	async function handleFileSelect(e: Event) {
		const input = e.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			backupFile = input.files[0];
		}
	}

	async function importBackup() {
		if (!backupFile) return;

		isImporting = true;
		try {
			const text = await backupFile.text();
			await auth.importBackup(text);
			showMessage('success', 'Identity imported successfully. Please unlock it.');
			backupFile = null;
			showUnlockModal = true;
		} catch (e) {
			showMessage('error', e instanceof Error ? e.message : 'Failed to import backup');
		} finally {
			isImporting = false;
		}
	}

	async function changePassphrase() {
		if (newPassphrase !== confirmNewPassphrase) {
			showMessage('error', 'New passphrases do not match');
			return;
		}

		isChangingPassphrase = true;
		try {
			await auth.changePassphrase(oldPassphrase, newPassphrase);
			showMessage('success', 'Passphrase changed successfully');
			showChangePassphrase = false;
			oldPassphrase = '';
			newPassphrase = '';
			confirmNewPassphrase = '';
		} catch (e) {
			showMessage('error', e instanceof Error ? e.message : 'Failed to change passphrase');
		} finally {
			isChangingPassphrase = false;
		}
	}

	async function destroyIdentity() {
		await auth.destroy();
		showDestroyConfirm = false;
		showMessage('success', 'Identity destroyed successfully');
	}

	function signOut() {
		auth.signOut();
	}
</script>

<svelte:head>
	<title>My Account - VuStore</title>
	<meta
		name="description"
		content="Manage your VuStore sovereign identity, subscriptions, and downloads."
	/>
</svelte:head>

<div class="account-page container py-16 max-w-6xl relative z-10">
	<!-- Hero Section -->
	<section class="hero mb-12">
		<h1 class="text-4xl md:text-5xl font-black mb-4 text-gradient">My Account</h1>
		<p class="text-lg text-white/60">
			{#if $isAuthenticated}
				Manage your sovereign identity and account settings.
			{:else}
				Create or unlock your sovereign identity to continue.
			{/if}
		</p>
	</section>

	{#if $isLoading}
		<!-- Loading State -->
		<div class="flex items-center justify-center py-20">
			<Loader2 class="w-8 h-8 text-cyan-400 animate-spin" />
		</div>
	{:else if !$isAuthenticated}
		<!-- Not Authenticated State -->
		<div class="max-w-lg mx-auto">
			<div class="glass-card p-8 text-center">
				<div
					class="w-20 h-20 mx-auto rounded-2xl bg-cyan-400/20 flex items-center justify-center mb-6"
				>
					<Key class="text-cyan-400 w-10 h-10" />
				</div>

				{#if $hasStoredIdentity}
					<h2 class="text-2xl font-bold text-white mb-3">Identity Locked</h2>
					<p class="text-white/60 mb-2 font-mono text-sm">{storedFingerprint}</p>
					<p class="text-white/60 mb-6">Enter your passphrase to unlock your account.</p>

					<button
						class="btn btn-primary w-full flex items-center justify-center gap-2"
						on:click={() => (showUnlockModal = true)}
					>
						<Key class="w-5 h-5" />
						Unlock Identity
					</button>

					<div class="mt-6 pt-6 border-t border-white/10">
						<p class="text-sm text-white/40 mb-4">Or import a different identity:</p>
						<label
							class="btn btn-secondary w-full flex items-center justify-center gap-2 cursor-pointer"
						>
							<Upload class="w-5 h-5" />
							Import Backup
							<input type="file" accept=".vu,.txt" class="hidden" on:change={handleFileSelect} />
						</label>
					</div>
				{:else}
					<h2 class="text-2xl font-bold text-white mb-3">No Identity Found</h2>
					<p class="text-white/60 mb-6">
						Create a new sovereign identity or import an existing backup.
					</p>

					<div class="space-y-3">
						<button
							class="btn btn-primary w-full flex items-center justify-center gap-2"
							on:click={() => (showCreateModal = true)}
						>
							<Key class="w-5 h-5" />
							Create New Identity
						</button>

						<label
							class="btn btn-secondary w-full flex items-center justify-center gap-2 cursor-pointer"
						>
							<Upload class="w-5 h-5" />
							Import from Backup
							<input type="file" accept=".vu,.txt" class="hidden" on:change={handleFileSelect} />
						</label>
					</div>
				{/if}

				{#if backupFile}
					<div class="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
						<p class="text-sm text-white/60 mb-3">
							Selected: <span class="text-white">{backupFile.name}</span>
						</p>
						<button
							class="btn btn-primary w-full flex items-center justify-center gap-2"
							on:click={importBackup}
							disabled={isImporting}
						>
							{#if isImporting}
								<Loader2 class="w-5 h-5 animate-spin" />
								Importing...
							{:else}
								<Upload class="w-5 h-5" />
								Import Identity
							{/if}
						</button>
					</div>
				{/if}
			</div>

			<!-- Privacy Notice -->
			<div class="mt-6 p-4 rounded-xl bg-cyan-400/5 border border-cyan-400/20">
				<div class="flex items-start gap-3">
					<Shield class="text-cyan-400 flex-shrink-0 mt-0.5" size={20} />
					<div class="text-sm">
						<p class="font-semibold text-cyan-400 mb-1">Your Privacy, Your Control</p>
						<p class="text-white/60">
							VU uses cryptographic identity. Your passphrase never leaves your device, and we
							cannot recover it. This is by design—it means true privacy.
						</p>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<!-- Authenticated State -->
		<div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
			<!-- Sidebar -->
			<aside class="lg:col-span-1">
				<div class="glass-card p-6">
					<div class="user-info mb-6">
						<div
							class="w-20 h-20 bg-cyan-400/20 rounded-full flex items-center justify-center mb-4"
						>
							<User class="w-10 h-10 text-cyan-400" />
						</div>
						<h2 class="text-xl font-semibold mb-1 text-white">{$handle || 'Anonymous'}</h2>
						<p class="text-sm text-white/60 mb-2 font-mono">{$fingerprint}</p>
						<div class="flex gap-2 mb-2">
							<div
								class="badge inline-block px-3 py-1 bg-cyan-400/20 text-cyan-400 text-xs font-bold rounded-full"
							>
								Sovereign
							</div>
							<div
								class="badge inline-block px-3 py-1 bg-green-500/20 text-green-500 text-xs font-bold rounded-full"
							>
								Level {$privacyLevel}
							</div>
						</div>
					</div>

					<nav class="space-y-2">
						<a
							href="/account"
							class="nav-item flex items-center gap-3 p-3 rounded-lg bg-white/10 text-cyan-400"
						>
							<User class="w-5 h-5" />
							<span>Overview</span>
						</a>
						<a
							href="/account/subscriptions"
							class="nav-item flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-white/60 hover:text-white"
						>
							<CreditCard class="w-5 h-5" />
							<span>Subscription</span>
						</a>
						<a
							href="/account/downloads"
							class="nav-item flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-white/60 hover:text-white"
						>
							<Download class="w-5 h-5" />
							<span>Downloads</span>
						</a>
						<a
							href="/account/settings"
							class="nav-item flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-white/60 hover:text-white"
						>
							<Settings class="w-5 h-5" />
							<span>Settings</span>
						</a>
						<button
							class="nav-item flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors w-full text-left text-red-400 hover:text-red-300"
							on:click={signOut}
						>
							<LogOut class="w-5 h-5" />
							<span>Lock & Sign Out</span>
						</button>
					</nav>
				</div>
			</aside>

			<!-- Main Content -->
			<div class="lg:col-span-3 space-y-6">
				<!-- Identity Card -->
				<div class="glass-card p-8">
					<div class="flex items-center gap-3 mb-6">
						<Shield class="w-6 h-6 text-cyan-400" />
						<h2 class="text-2xl font-bold text-white">Sovereign Identity</h2>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<p class="text-sm text-white/60 mb-1">Fingerprint</p>
							<p class="text-lg font-mono text-white">{$fingerprint}</p>
						</div>
						<div>
							<p class="text-sm text-white/60 mb-1">Display Name</p>
							<p class="text-lg text-white">{$handle || 'Anonymous'}</p>
						</div>
						<div>
							<p class="text-sm text-white/60 mb-1">Privacy Level</p>
							<p class="text-lg text-white">
								Level {$privacyLevel} - {$privacyLevel === 0
									? 'Zero-Knowledge'
									: $privacyLevel === 1
										? 'Local-First'
										: $privacyLevel === 2
											? 'Privacy First'
											: $privacyLevel === 3
												? 'Enhanced'
												: 'Basic'}
							</p>
						</div>
						<div>
							<p class="text-sm text-white/60 mb-1">Authentication</p>
							<p class="text-lg text-green-400 flex items-center gap-2">
								<CheckCircle2 class="w-5 h-5" />
								Cryptographically Verified
							</p>
						</div>
					</div>
				</div>

				<!-- Security Section -->
				<div class="glass-card p-8">
					<div class="flex items-center gap-3 mb-6">
						<Key class="w-6 h-6 text-cyan-400" />
						<h2 class="text-2xl font-bold text-white">Security</h2>
					</div>

					<div class="space-y-4">
						<button
							class="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
							on:click={exportBackup}
							disabled={isExporting}
						>
							<div class="flex items-center gap-3">
								<Download class="text-white/60 w-5 h-5" />
								<div class="text-left">
									<p class="font-medium text-white">Export Backup</p>
									<p class="text-sm text-white/60">Download encrypted identity backup</p>
								</div>
							</div>
							{#if isExporting}
								<Loader2 class="w-5 h-5 text-white/60 animate-spin" />
							{/if}
						</button>

						<button
							class="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
							on:click={() => (showChangePassphrase = !showChangePassphrase)}
						>
							<div class="flex items-center gap-3">
								<RefreshCw class="text-white/60 w-5 h-5" />
								<div class="text-left">
									<p class="font-medium text-white">Change Passphrase</p>
									<p class="text-sm text-white/60">Update your encryption passphrase</p>
								</div>
							</div>
						</button>

						{#if showChangePassphrase}
							<div class="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
								<input
									type="password"
									bind:value={oldPassphrase}
									placeholder="Current passphrase"
									class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none"
								/>
								<input
									type="password"
									bind:value={newPassphrase}
									placeholder="New passphrase (min 16 characters)"
									class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none"
								/>
								<input
									type="password"
									bind:value={confirmNewPassphrase}
									placeholder="Confirm new passphrase"
									class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none"
								/>
								<div class="flex gap-3">
									<button
										class="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
										on:click={() => (showChangePassphrase = false)}
									>
										Cancel
									</button>
									<button
										class="flex-1 px-4 py-2 bg-cyan-400 text-black font-semibold rounded-lg hover:bg-cyan-300 transition-colors disabled:opacity-50"
										on:click={changePassphrase}
										disabled={isChangingPassphrase ||
											!oldPassphrase ||
											!newPassphrase ||
											!confirmNewPassphrase}
									>
										{#if isChangingPassphrase}
											<Loader2 class="w-5 h-5 animate-spin inline" />
										{:else}
											Change Passphrase
										{/if}
									</button>
								</div>
							</div>
						{/if}
					</div>
				</div>

				<!-- Quick Stats -->
				<div class="glass-card p-8">
					<h2 class="text-2xl font-bold mb-6 text-white">Your VU Suite</h2>
					<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div class="stat-card text-center p-4 bg-white/5 rounded-xl">
							<div class="text-3xl font-bold text-cyan-400 mb-2">30</div>
							<p class="text-sm text-white/60">Apps Available</p>
						</div>
						<div class="stat-card text-center p-4 bg-white/5 rounded-xl">
							<div class="text-3xl font-bold text-cyan-400 mb-2">12</div>
							<p class="text-sm text-white/60">Apps Downloaded</p>
						</div>
						<div class="stat-card text-center p-4 bg-white/5 rounded-xl">
							<div class="text-3xl font-bold text-cyan-400 mb-2">100%</div>
							<p class="text-sm text-white/60">Privacy Protected</p>
						</div>
					</div>
				</div>

				<!-- Danger Zone -->
				<div class="glass-card p-8 border-red-500/30">
					<div class="flex items-center gap-3 mb-6">
						<AlertTriangle class="w-6 h-6 text-red-500" />
						<h2 class="text-2xl font-bold text-red-500">Danger Zone</h2>
					</div>

					{#if !showDestroyConfirm}
						<button
							class="w-full flex items-center justify-between p-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 transition-colors border border-red-500/20"
							on:click={() => (showDestroyConfirm = true)}
						>
							<div class="flex items-center gap-3">
								<Trash2 class="text-red-500 w-5 h-5" />
								<div class="text-left">
									<p class="font-medium text-red-500">Destroy Identity</p>
									<p class="text-sm text-white/60">
										Permanently delete your identity from this device
									</p>
								</div>
							</div>
						</button>
					{:else}
						<div class="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
							<p class="text-sm text-white mb-4">
								This action is <strong class="text-red-400">irreversible</strong>. Your identity
								will be permanently deleted. If you have no backup, you will lose access to all your
								data and subscriptions.
							</p>
							<div class="flex gap-3">
								<button
									class="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
									on:click={() => (showDestroyConfirm = false)}
								>
									Cancel
								</button>
								<button
									class="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
									on:click={destroyIdentity}
								>
									Yes, Destroy My Identity
								</button>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	{/if}

	<!-- Message Toast -->
	{#if message}
		<div
			class="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg z-50"
			class:bg-green-500={message.type === 'success'}
			class:bg-red-500={message.type === 'error'}
		>
			{#if message.type === 'success'}
				<CheckCircle2 size={20} class="text-white" />
			{:else}
				<AlertTriangle size={20} class="text-white" />
			{/if}
			<span class="text-white">{message.text}</span>
		</div>
	{/if}
</div>

<!-- Modals -->
<CreateIdentityModal bind:isOpen={showCreateModal} on:close={() => (showCreateModal = false)} />

<UnlockIdentityModal
	bind:isOpen={showUnlockModal}
	fingerprint={storedFingerprint}
	on:close={() => (showUnlockModal = false)}
	on:createNew={() => (showCreateModal = true)}
/>
