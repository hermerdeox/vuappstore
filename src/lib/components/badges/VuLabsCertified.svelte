<script lang="ts">
	import { ShieldCheck } from 'lucide-svelte';
	
	export let size: 'xs' | 'sm' | 'md' | 'lg' = 'md';
	export let showIcon: boolean = true;
	export let variant: 'badge' | 'banner' = 'badge';
</script>

{#if variant === 'badge'}
	<!-- Compact Badge Version -->
	<div class="vulabs-badge vulabs-badge-{size}">
		{#if showIcon}
			<ShieldCheck class="badge-icon" />
		{/if}
		<span class="badge-text">VuApps Certified</span>
	</div>
{:else}
	<!-- Banner Version (for prominent display) -->
	<div class="vulabs-banner">
		<div class="banner-content">
			<ShieldCheck class="banner-icon" />
			<div class="banner-text">
				<span class="banner-title">VuApps Certified</span>
				<span class="banner-subtitle">Premium authenticity verified by VU Company</span>
			</div>
		</div>
	</div>
{/if}

<style>
	/* Badge Variant */
	.vulabs-badge {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		background: linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(34, 197, 94, 0.15));
		border: 1px solid rgba(0, 212, 255, 0.3);
		border-radius: 6px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.03em;
		white-space: nowrap;
		transition: all 0.2s ease;
	}

	.vulabs-badge:hover {
		background: linear-gradient(135deg, rgba(0, 212, 255, 0.25), rgba(34, 197, 94, 0.25));
		border-color: rgba(0, 212, 255, 0.5);
		transform: translateY(-1px);
	}

	/* Size Variants */
	.vulabs-badge-xs {
		padding: 1px 3px;
		font-size: 6px;
	}

	.vulabs-badge-xs :global(.badge-icon) {
		width: 6px;
		height: 6px;
	}

	.vulabs-badge-sm {
		padding: 1.6px 4.8px;
		font-size: 7.2px;
	}

	.vulabs-badge-sm :global(.badge-icon) {
		width: 8px;
		height: 8px;
	}

	.vulabs-badge-md {
		padding: 2.4px 6.4px;
		font-size: 8px;
	}

	.vulabs-badge-md :global(.badge-icon) {
		width: 9.6px;
		height: 9.6px;
	}

	.vulabs-badge-lg {
		padding: 3.2px 8px;
		font-size: 8.8px;
	}

	.vulabs-badge-lg :global(.badge-icon) {
		width: 11.2px;
		height: 11.2px;
	}

	:global(.badge-icon) {
		color: var(--color-primary, #00d4ff);
		flex-shrink: 0;
	}

	.badge-text {
		background: linear-gradient(135deg, #00d4ff, #22c55e);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	/* Banner Variant */
	.vulabs-banner {
		background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(34, 197, 94, 0.1));
		border: 2px solid rgba(0, 212, 255, 0.3);
		border-radius: 12px;
		padding: 12px 16px;
		transition: all 0.2s ease;
	}

	.vulabs-banner:hover {
		border-color: rgba(0, 212, 255, 0.5);
		box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
	}

	.banner-content {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.banner-icon {
		width: 24px;
		height: 24px;
		color: var(--color-primary, #00d4ff);
		flex-shrink: 0;
	}

	.banner-text {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.banner-title {
		font-size: 14px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		background: linear-gradient(135deg, #00d4ff, #22c55e);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.banner-subtitle {
		font-size: 11px;
		color: var(--color-text-secondary, #888888);
	}

	/* Brutalist Theme Overrides */
	:global(body.theme-brutalist) .vulabs-badge {
		background: #FFFFFF;
		border: 2px solid #000000;
		border-radius: 0px;
		box-shadow: 2px 2px 0 0 #000000;
	}

	:global(body.theme-brutalist) .vulabs-badge:hover {
		box-shadow: 3px 3px 0 0 #000000;
		transform: translate(-1px, -1px);
	}

	:global(body.theme-brutalist) .badge-text {
		background: none;
		-webkit-text-fill-color: #000000;
		color: #000000;
	}

	:global(body.theme-brutalist) .badge-icon {
		color: #000000;
	}

	:global(body.theme-brutalist) .vulabs-banner {
		background: #FFFFFF;
		border: 3px solid #000000;
		border-radius: 0px;
		box-shadow: 6px 6px 0 0 #000000;
	}

	:global(body.theme-brutalist) .vulabs-banner:hover {
		box-shadow: 8px 8px 0 0 #000000;
		transform: translate(-2px, -2px);
	}

	:global(body.theme-brutalist) .banner-title {
		background: none;
		-webkit-text-fill-color: #000000;
		color: #000000;
	}

	:global(body.theme-brutalist) .banner-subtitle {
		color: #4a4a4a;
	}

	:global(body.theme-brutalist) .banner-icon {
		color: #000000;
	}
</style>

