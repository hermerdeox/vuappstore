<script lang="ts">
	import { currentTheme, toggleTheme } from '$lib/stores/theme';
	import { Palette } from 'lucide-svelte';

	export let variant: 'footer' | 'header' = 'header';
	export let showLabel: boolean = true;

	function handleToggle() {
		toggleTheme();
	}
</script>

{#if variant === 'footer'}
	<!-- Footer variant - larger, more prominent -->
	<button on:click={handleToggle} class="theme-toggle-footer" aria-label="Toggle theme">
		<Palette class="w-5 h-5" />
		{#if showLabel}
			<span class="theme-label">
				{$currentTheme === 'modern' ? 'Modern' : 'Brutalist'}
			</span>
		{/if}
	</button>
{:else}
	<!-- Header variant - compact toggle -->
	<div class="theme-toggle-header">
		<button
			class="theme-btn"
			class:active={$currentTheme === 'modern'}
			on:click={() => $currentTheme === 'brutalist' && handleToggle()}
			aria-label="Switch to Modern theme"
		>
			Modern
		</button>
		<button
			class="theme-btn"
			class:active={$currentTheme === 'brutalist'}
			on:click={() => $currentTheme === 'modern' && handleToggle()}
			aria-label="Switch to Brutalist theme"
		>
			Brutal
		</button>
	</div>
{/if}

<style>
	/* Footer Variant */
	.theme-toggle-footer {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px 16px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		color: var(--color-text-secondary, #888888);
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		transition: all 200ms ease;
	}

	.theme-toggle-footer:hover {
		background: rgba(255, 255, 255, 0.1);
		color: var(--color-text-primary, #ffffff);
		border-color: rgba(255, 255, 255, 0.2);
	}

	.theme-label {
		font-size: 13px;
		text-transform: capitalize;
	}

	/* Header Variant - Dual Button */
	.theme-toggle-header {
		display: flex;
		gap: 0;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		overflow: hidden;
	}

	.theme-btn {
		padding: 8px 16px;
		background: transparent;
		color: var(--color-text-secondary, #888888);
		border: none;
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
		transition: all 200ms ease;
		position: relative;
	}

	.theme-btn.active {
		background: var(--color-primary, #00d4ff);
		color: var(--color-background, #000000);
	}

	.theme-btn:not(.active):hover {
		background: rgba(255, 255, 255, 0.05);
		color: var(--color-text-primary, #ffffff);
	}

	/* Brutalist Theme Overrides */
	:global(body.theme-brutalist) .theme-toggle-footer {
		background: #ffffff;
		border: 3px solid #000000;
		border-radius: 0px;
		color: #000000;
		transition: none;
	}

	:global(body.theme-brutalist) .theme-toggle-footer:hover {
		background: #000000;
		color: #ffffff;
		box-shadow: 4px 4px 0 0 #000000;
	}

	:global(body.theme-brutalist) .theme-toggle-header {
		background: #ffffff;
		border: 3px solid #000000;
		border-radius: 0px;
		overflow: hidden;
	}

	:global(body.theme-brutalist) .theme-btn {
		color: #000000;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		transition: none;
	}

	:global(body.theme-brutalist) .theme-btn.active {
		background: #000000;
		color: #ffffff;
	}

	:global(body.theme-brutalist) .theme-btn:not(.active):hover {
		background: rgba(0, 0, 0, 0.05);
	}
</style>
