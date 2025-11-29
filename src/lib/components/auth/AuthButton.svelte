<script lang="ts">
	import { onMount } from 'svelte';
	import {
		auth,
		isAuthenticated,
		fingerprint,
		isLocked,
		handle,
		hasStoredIdentity
	} from '$lib/stores/auth';
	import { loadIdentity } from '$lib/auth/storage';
	import { User, Key, LogOut, Settings, ChevronDown, Shield } from 'lucide-svelte';
	import CreateIdentityModal from './CreateIdentityModal.svelte';
	import UnlockIdentityModal from './UnlockIdentityModal.svelte';

	let showCreateModal = false;
	let showUnlockModal = false;
	let showDropdown = false;
	let storedFingerprint = '';

	// Load stored fingerprint for unlock modal
	$: if ($isLocked) {
		loadIdentity().then((stored) => {
			if (stored) storedFingerprint = stored.fingerprint;
		});
	}

	function handleAuthClick() {
		if ($isAuthenticated) {
			showDropdown = !showDropdown;
		} else if ($isLocked || $hasStoredIdentity) {
			showUnlockModal = true;
		} else {
			showCreateModal = true;
		}
	}

	function signOut() {
		auth.signOut();
		showDropdown = false;
	}

	function closeDropdown(e: MouseEvent) {
		// Close dropdown when clicking outside
		showDropdown = false;
	}
</script>

<svelte:window on:click={closeDropdown} />

<div class="relative">
	<button
		class="auth-button flex items-center gap-2 px-3 py-2 rounded-xl transition-all"
		class:authenticated={$isAuthenticated}
		class:locked={$isLocked || ($hasStoredIdentity && !$isAuthenticated)}
		on:click|stopPropagation={handleAuthClick}
	>
		{#if $isAuthenticated}
			<div class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-cyan-400/20 flex items-center justify-center">
				<User class="text-cyan-400 w-4 h-4 sm:w-[18px] sm:h-[18px]" />
			</div>
			<div class="text-left hidden md:block">
				<p class="text-sm font-medium text-white">
					{$handle || 'Anonymous'}
				</p>
				<p class="text-xs text-white/40 font-mono">{$fingerprint}</p>
			</div>
			<ChevronDown size={16} class="text-white/60 hidden md:block" />
		{:else if $isLocked || ($hasStoredIdentity && !$isAuthenticated)}
			<Key class="text-yellow-500 w-5 h-5" />
			<span class="text-sm font-medium text-yellow-500 hidden sm:inline">Unlock</span>
		{:else}
			<Key class="text-cyan-400 w-5 h-5" />
			<span class="text-sm font-medium text-cyan-400 hidden sm:inline">Create Identity</span>
		{/if}
	</button>

	<!-- Dropdown Menu -->
	{#if showDropdown && $isAuthenticated}
		<div
			class="absolute right-0 top-full mt-2 w-64 bg-black/95 border border-white/10 rounded-xl shadow-xl overflow-hidden z-50"
			on:click|stopPropagation
		>
			<div class="p-4 border-b border-white/10">
				<div class="flex items-center gap-3">
					<div class="w-10 h-10 rounded-lg bg-cyan-400/20 flex items-center justify-center">
						<Shield class="text-cyan-400" size={20} />
					</div>
					<div class="flex-1 min-w-0">
						<p class="text-sm font-medium text-white truncate">{$handle || 'Anonymous'}</p>
						<p class="text-xs text-white/40 font-mono truncate">{$fingerprint}</p>
					</div>
				</div>
			</div>

			<div class="p-2">
				<a
					href="/account"
					class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-colors"
					on:click={() => (showDropdown = false)}
				>
					<Settings size={18} />
					<span class="text-sm">Account Settings</span>
				</a>

				<button
					class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-red-400 transition-colors"
					on:click={signOut}
				>
					<LogOut size={18} />
					<span class="text-sm">Lock & Sign Out</span>
				</button>
			</div>
		</div>
	{/if}
</div>

<CreateIdentityModal bind:isOpen={showCreateModal} on:close={() => (showCreateModal = false)} />

<UnlockIdentityModal
	bind:isOpen={showUnlockModal}
	fingerprint={storedFingerprint}
	on:close={() => (showUnlockModal = false)}
	on:createNew={() => (showCreateModal = true)}
/>

<style>
	.auth-button {
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.auth-button:hover {
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(255, 255, 255, 0.15);
	}

	.auth-button.authenticated {
		border-color: rgba(0, 212, 255, 0.2);
	}

	.auth-button.locked {
		border-color: rgba(234, 179, 8, 0.3);
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.7;
		}
	}
</style>
