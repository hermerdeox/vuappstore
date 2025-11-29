<script lang="ts">
	import { validatePassphrase } from '$lib/auth/crypto';
	import { Eye, EyeOff, Shield, ShieldAlert, ShieldCheck, Sparkles } from 'lucide-svelte';

	export let value = '';
	export let placeholder = 'Enter your passphrase';
	export let showStrength = false;
	export let showGenerator = false;
	export let disabled = false;

	let showPassword = false;
	let focused = false;

	$: validation = showStrength ? validatePassphrase(value) : null;
	$: strengthColor = validation
		? validation.score >= 80
			? 'text-green-400'
			: validation.score >= 50
				? 'text-yellow-400'
				: 'text-red-400'
		: '';

	$: strengthIcon = validation
		? validation.score >= 80
			? ShieldCheck
			: validation.score >= 50
				? Shield
				: ShieldAlert
		: Shield;

	// Character sets for passphrase generation
	const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
	const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const NUMBERS = '0123456789';
	const SPECIAL = '!@#$%^&*()-_=+[]{}|;:,.<>?';

	/**
	 * Generate a cryptographically strong random passphrase
	 */
	function generateStrongPassphrase(length: number = 20): string {
		const allChars = LOWERCASE + UPPERCASE + NUMBERS + SPECIAL;
		const cryptoArray = new Uint32Array(length);
		crypto.getRandomValues(cryptoArray);

		// Ensure at least one of each required character type
		const guaranteed = [
			LOWERCASE[Math.floor(Math.random() * LOWERCASE.length)],
			UPPERCASE[Math.floor(Math.random() * UPPERCASE.length)],
			NUMBERS[Math.floor(Math.random() * NUMBERS.length)],
			SPECIAL[Math.floor(Math.random() * SPECIAL.length)]
		];

		// Fill the rest randomly
		const remaining: string[] = [];
		for (let i = 0; i < length - 4; i++) {
			remaining.push(allChars[cryptoArray[i] % allChars.length]);
		}

		// Combine and shuffle
		const combined = [...guaranteed, ...remaining];
		for (let i = combined.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[combined[i], combined[j]] = [combined[j], combined[i]];
		}

		return combined.join('');
	}

	function handleGenerate() {
		value = generateStrongPassphrase(20);
		showPassword = true; // Show the generated passphrase so user can see it
	}
</script>

<div class="passphrase-input" class:focused>
	<div class="input-wrapper">
		<input
			type={showPassword ? 'text' : 'password'}
			bind:value
			{placeholder}
			{disabled}
			on:focus={() => (focused = true)}
			on:blur={() => (focused = false)}
			on:keydown
			class="w-full bg-transparent border-none outline-none text-white placeholder:text-white/40 font-mono"
		/>

		{#if showGenerator}
			<button
				type="button"
				class="generate-btn"
				on:click={handleGenerate}
				tabindex="-1"
				title="Generate strong passphrase"
			>
				<Sparkles size={18} />
			</button>
		{/if}

		<button
			type="button"
			class="toggle-visibility"
			on:click={() => (showPassword = !showPassword)}
			tabindex="-1"
		>
			{#if showPassword}
				<EyeOff size={20} />
			{:else}
				<Eye size={20} />
			{/if}
		</button>
	</div>

	{#if showStrength && value.length > 0}
		<div class="strength-indicator mt-3">
			<div class="flex items-center justify-between mb-2">
				<span class="text-xs text-white/60">Passphrase Strength</span>
				<span class="text-xs font-semibold {strengthColor}">
					{validation?.score ?? 0}%
				</span>
			</div>

			<div class="strength-bar h-1 bg-white/10 rounded-full overflow-hidden">
				<div
					class="h-full transition-all duration-300 rounded-full"
					class:bg-red-500={validation && validation.score < 50}
					class:bg-yellow-500={validation && validation.score >= 50 && validation.score < 80}
					class:bg-green-500={validation && validation.score >= 80}
					style="width: {validation?.score ?? 0}%"
				/>
			</div>

			{#if validation && validation.errors.length > 0}
				<ul class="mt-2 space-y-1">
					{#each validation.errors as error}
						<li class="text-xs text-red-400 flex items-center gap-1">
							<span>•</span>
							{error}
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/if}
</div>

<style>
	.passphrase-input {
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		padding: 1rem;
		transition: all 0.2s ease;
	}

	.passphrase-input.focused {
		border-color: rgb(0, 212, 255);
		box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1);
	}

	.input-wrapper {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.toggle-visibility {
		background: none;
		border: none;
		color: rgba(255, 255, 255, 0.5);
		cursor: pointer;
		padding: 0.25rem;
		transition: color 0.2s;
	}

	.toggle-visibility:hover {
		color: white;
	}

	.generate-btn {
		background: rgba(0, 212, 255, 0.1);
		border: 1px solid rgba(0, 212, 255, 0.3);
		border-radius: 6px;
		color: rgb(0, 212, 255);
		cursor: pointer;
		padding: 0.35rem;
		transition: all 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.generate-btn:hover {
		background: rgba(0, 212, 255, 0.2);
		border-color: rgba(0, 212, 255, 0.5);
		transform: scale(1.05);
	}

	.generate-btn:active {
		transform: scale(0.95);
	}

	input {
		font-size: 1rem;
		letter-spacing: 0.05em;
	}
</style>
