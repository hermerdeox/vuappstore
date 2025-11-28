<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { auth } from '$lib/stores/auth';
	import PassphraseInput from './PassphraseInput.svelte';
	import { X, Unlock, Loader2, AlertCircle, Trash2 } from 'lucide-svelte';

	export let isOpen = false;
	export let fingerprint = '';

	const dispatch = createEventDispatcher<{
		close: void;
		success: void;
		createNew: void;
	}>();

	let passphrase = '';
	let isUnlocking = false;
	let error = '';
	let showDestroyConfirm = false;

	function close() {
		passphrase = '';
		error = '';
		showDestroyConfirm = false;
		dispatch('close');
	}

	async function handleUnlock() {
		if (!passphrase) return;

		isUnlocking = true;
		error = '';

		try {
			await auth.unlock(passphrase);
			dispatch('success');
			close();
		} catch (e) {
			error = e instanceof Error ? e.message : 'Failed to unlock';
		} finally {
			isUnlocking = false;
		}
	}

	async function handleDestroy() {
		await auth.destroy();
		dispatch('createNew');
		close();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && passphrase && !isUnlocking) {
			handleUnlock();
		}
		if (e.key === 'Escape') {
			close();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
	<div
		class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
		transition:fade={{ duration: 200 }}
		on:click={close}
		on:keydown={(e) => e.key === 'Escape' && close()}
		role="button"
		tabindex="-1"
	/>

	<div class="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
		<div
			class="modal-content w-full max-w-md bg-black/95 border border-white/10 rounded-2xl shadow-2xl pointer-events-auto"
			transition:fly={{ y: 50, duration: 300 }}
			role="dialog"
			aria-modal="true"
		>
			<div class="flex items-center justify-between p-6 border-b border-white/10">
				<div class="flex items-center gap-3">
					<div
						class="w-10 h-10 rounded-xl bg-cyan-400/20 flex items-center justify-center"
					>
						<Unlock class="text-cyan-400" size={20} />
					</div>
					<div>
						<h2 class="text-lg font-semibold text-white">Unlock Identity</h2>
						<p class="text-sm text-white/60 font-mono">{fingerprint}</p>
					</div>
				</div>

				<button
					class="p-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-colors"
					on:click={close}
				>
					<X size={20} />
				</button>
			</div>

			<div class="p-6 space-y-6">
				{#if !showDestroyConfirm}
					<div>
						<label class="block text-sm font-medium text-white/60 mb-2">
							Enter Your Passphrase
						</label>
						<PassphraseInput
							bind:value={passphrase}
							placeholder="Your secret passphrase"
							on:keydown={(e) => e.detail?.key === 'Enter' && handleUnlock()}
						/>
					</div>

					{#if error}
						<div
							class="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
						>
							<AlertCircle size={16} />
							{error}
						</div>
					{/if}

					<button
						class="w-full flex items-center justify-center gap-2 px-6 py-3 bg-cyan-400 text-black font-semibold rounded-xl hover:bg-cyan-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						disabled={!passphrase || isUnlocking}
						on:click={handleUnlock}
					>
						{#if isUnlocking}
							<Loader2 size={20} class="animate-spin" />
							Unlocking...
						{:else}
							<Unlock size={20} />
							Unlock
						{/if}
					</button>

					<div class="pt-4 border-t border-white/10">
						<button
							class="w-full flex items-center justify-center gap-2 px-4 py-2 text-white/40 hover:text-red-400 text-sm transition-colors"
							on:click={() => (showDestroyConfirm = true)}
						>
							<Trash2 size={16} />
							Forgot passphrase? Destroy identity
						</button>
					</div>
				{:else}
					<div class="text-center space-y-4">
						<div
							class="w-16 h-16 mx-auto rounded-2xl bg-red-500/20 flex items-center justify-center"
						>
							<AlertCircle class="text-red-500" size={32} />
						</div>

						<div>
							<p class="text-lg text-white font-semibold">Destroy Identity?</p>
							<p class="text-sm text-white/60 mt-2">
								This will permanently delete your identity from this device. If you have no backup,
								it cannot be recovered.
							</p>
						</div>

						<div class="flex gap-3">
							<button
								class="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
								on:click={() => (showDestroyConfirm = false)}
							>
								Cancel
							</button>
							<button
								class="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
								on:click={handleDestroy}
							>
								Destroy
							</button>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-content {
		max-height: 90vh;
		overflow-y: auto;
	}
</style>

