<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';
	import {
		Shield,
		ChevronDown,
		ChevronUp,
		X,
		Check,
		Eye,
		EyeOff,
		Server,
		AlertTriangle,
		Info,
		ExternalLink
	} from 'lucide-svelte';
	import {
		currentPrivacyConfig,
		isPrivacyModalOpen,
		updatePrivacyConfigForPath,
		togglePrivacyModal,
		closePrivacyModal,
		LEVEL_COLORS,
		LEVEL_NAMES,
		type VuPrivacyLevel
	} from '$lib/stores/privacyLevel';

	// Subscribe to page changes
	let unsubscribePage: () => void;
	let config = $currentPrivacyConfig;
	let isModalOpen = false;

	// Subscribe to stores
	const unsubConfig = currentPrivacyConfig.subscribe((v) => (config = v));
	const unsubModal = isPrivacyModalOpen.subscribe((v) => (isModalOpen = v));

	onMount(() => {
		// Initial update
		updatePrivacyConfigForPath($page.url.pathname);

		// Subscribe to page changes
		unsubscribePage = page.subscribe((p) => {
			updatePrivacyConfigForPath(p.url.pathname);
		});
	});

	onDestroy(() => {
		if (unsubscribePage) unsubscribePage();
		unsubConfig();
		unsubModal();
	});

	function handleBadgeClick() {
		togglePrivacyModal();
	}

	function handleClose() {
		closePrivacyModal();
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			handleClose();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && isModalOpen) {
			handleClose();
		}
	}

	// Get the display level number/text
	function getLevelDisplay(level: VuPrivacyLevel): string {
		if (level === 'subzero') return '∅';
		return level.toString();
	}

	// Check if level is SubZero
	function isSubZero(level: VuPrivacyLevel): boolean {
		return level === 'subzero';
	}

	// Get level quality label
	function getLevelQuality(level: VuPrivacyLevel): { label: string; class: string } {
		if (level === 'subzero') return { label: 'Beyond Zero-Knowledge', class: 'quality-subzero' };
		if (level === 0) return { label: 'Best - True Zero-Knowledge', class: 'quality-best' };
		if (level === 1) return { label: 'Excellent - Local-First', class: 'quality-excellent' };
		if (level === 2) return { label: 'Very Good - Privacy First', class: 'quality-good' };
		if (level === 3) return { label: 'Good - Enhanced Privacy', class: 'quality-moderate' };
		if (level === 4) return { label: 'Basic - Minimum VU Standard', class: 'quality-basic' };
		return { label: 'Not VU Standard', class: 'quality-notvu' };
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- VU Level Badge -->
<button
	class="vu-level-badge"
	style="--badge-color: {config.color}; --badge-color-rgb: {config.colorRgb};"
	on:click={handleBadgeClick}
	aria-label="VU Privacy Level {config.level} - {config.levelName}. Click for details."
	aria-expanded={isModalOpen}
	data-testid="vu-level-badge"
>
	<div class="badge-level" class:subzero={isSubZero(config.level)}>
		<span class="level-v">V</span>
		<span class="level-number">{getLevelDisplay(config.level)}</span>
	</div>
	{#if isModalOpen}
		<div class="badge-glow"></div>
	{/if}
</button>

<!-- Privacy Level Modal -->
{#if isModalOpen}
	<div
		class="vu-level-modal-backdrop"
		on:click={handleBackdropClick}
		on:keydown={(e) => e.key === 'Enter' && handleClose()}
		role="button"
		tabindex="-1"
		transition:fade={{ duration: 200 }}
		data-testid="vu-level-modal-backdrop"
	>
		<div
			class="vu-level-modal"
			role="dialog"
			aria-modal="true"
			aria-labelledby="vu-level-modal-title"
			transition:fly={{ y: 20, duration: 300 }}
			data-testid="vu-level-modal"
		>
			<!-- Modal Header -->
			<div class="modal-header" style="--badge-color: {config.color}; --badge-color-rgb: {config.colorRgb};">
				<div class="modal-level-indicator">
					<div class="level-circle" class:subzero={isSubZero(config.level)}>
						<span class="level-text">V{getLevelDisplay(config.level)}</span>
					</div>
					<div class="level-info">
						<h2 id="vu-level-modal-title" class="level-title">{config.levelName}</h2>
						<div class="level-quality {getLevelQuality(config.level).class}">
							{getLevelQuality(config.level).label}
						</div>
					</div>
				</div>
				<button class="close-btn" on:click={handleClose} aria-label="Close modal">
					<X class="w-5 h-5" />
				</button>
			</div>

			<!-- Modal Body -->
			<div class="modal-body">
				<!-- Description -->
				<p class="modal-description">{config.description}</p>

				<!-- Privacy Details Grid -->
				<div class="privacy-details">
					<div class="detail-item control">
						<div class="detail-icon">
							<Check class="w-4 h-4" />
						</div>
						<div class="detail-content">
							<h4>What You Control</h4>
							<p>{config.whatYouControl}</p>
						</div>
					</div>

					<div class="detail-item hidden-from-us">
						<div class="detail-icon">
							<EyeOff class="w-4 h-4" />
						</div>
						<div class="detail-content">
							<h4>What We Can't See</h4>
							<p>{config.whatWeCantSee}</p>
						</div>
					</div>

					<div class="detail-item server-access">
						<div class="detail-icon">
							<Server class="w-4 h-4" />
						</div>
						<div class="detail-content">
							<h4>What Servers See</h4>
							<p>{config.whatServersSee}</p>
						</div>
					</div>
				</div>

				<!-- Tradeoffs Section -->
				{#if config.tradeoffs && config.tradeoffs.length > 0}
					<div class="tradeoffs-section">
						<h4 class="tradeoffs-title">
							<AlertTriangle class="w-4 h-4" />
							Privacy Tradeoffs
						</h4>
						<ul class="tradeoffs-list">
							{#each config.tradeoffs as tradeoff}
								<li>{tradeoff}</li>
							{/each}
						</ul>
					</div>
				{/if}

				<!-- Why This Level -->
				<div class="why-section">
					<h4 class="why-title">
						<Info class="w-4 h-4" />
						Why This Level?
					</h4>
					<p class="why-content">{config.whyThisLevel}</p>
				</div>

				<!-- VU Commitment -->
				<div class="commitment-section">
					<div class="commitment-badge">
						<Shield class="w-5 h-5" />
						<span>VU Commitment</span>
					</div>
					<p class="commitment-text">
						We strive to operate at the lowest possible VU Level. When we can't achieve Level 0,
						we're brutally honest about why and what it means for your privacy.
					</p>
				</div>
			</div>

			<!-- Modal Footer -->
			<div class="modal-footer">
				<a href="/privacy-levels" class="learn-more-btn" on:click={handleClose}>
					Learn About All VU Levels
					<ExternalLink class="w-4 h-4" />
				</a>
			</div>
		</div>
	</div>
{/if}

<style>
	/* ============================================
	   VU LEVEL BADGE
	   ============================================ */
	.vu-level-badge {
		position: fixed;
		bottom: 75px; /* Position clearly ABOVE the Zero Cookies badge */
		left: 25px; /* Slightly offset from the Zero Cookies badge */
		z-index: 1002; /* Above PrivacyShieldBadge (999-1001) */
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		background: linear-gradient(135deg, rgba(var(--badge-color-rgb), 0.9), rgba(var(--badge-color-rgb), 0.7));
		border: 2px solid rgba(var(--badge-color-rgb), 0.5);
		border-radius: 50%;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow:
			0 4px 15px rgba(var(--badge-color-rgb), 0.3),
			0 0 25px rgba(var(--badge-color-rgb), 0.1);
		overflow: hidden;
	}

	.vu-level-badge:hover {
		transform: translateY(-2px) scale(1.05);
		box-shadow:
			0 6px 20px rgba(var(--badge-color-rgb), 0.4),
			0 0 35px rgba(var(--badge-color-rgb), 0.2);
	}

	.badge-level {
		display: flex;
		align-items: center;
		justify-content: center;
		color: #000;
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
		font-weight: 700;
		font-size: 26px; /* 64% of badge (80% - 20%) */
		letter-spacing: -0.5px;
	}

	.badge-level.subzero {
		color: #000;
	}

	.level-v {
		font-size: inherit;
	}

	.level-number {
		font-size: inherit;
	}

	.badge-glow {
		position: absolute;
		inset: -50%;
		background: radial-gradient(circle, rgba(var(--badge-color-rgb), 0.4) 0%, transparent 70%);
		animation: pulse-glow 2s ease-in-out infinite;
		pointer-events: none;
	}

	@keyframes pulse-glow {
		0%, 100% {
			opacity: 0.4;
			transform: scale(1);
		}
		50% {
			opacity: 0.8;
			transform: scale(1.1);
		}
	}

	/* Mobile positioning */
	@media (max-width: 640px) {
		.vu-level-badge {
			bottom: 120px; /* Higher on mobile - above the Zero Cookies badge */
			left: 10px; /* Align with the left edge on mobile */
			width: 36px;
			height: 36px;
		}

		.badge-level {
			font-size: 23px; /* reduced by 20% */
		}
	}

	/* ============================================
	   MODAL BACKDROP
	   ============================================ */
	.vu-level-modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(8px);
		z-index: 10000;
		display: flex;
		align-items: flex-end;
		justify-content: flex-start;
		padding: 20px;
	}

	@media (min-width: 640px) {
		.vu-level-modal-backdrop {
			align-items: center;
			padding-left: 100px;
		}
	}

	/* ============================================
	   MODAL
	   ============================================ */
	.vu-level-modal {
		width: 100%;
		max-width: 480px;
		max-height: 90vh;
		background: linear-gradient(135deg, rgba(0, 0, 0, 0.98) 0%, rgba(10, 20, 40, 0.98) 100%);
		border: 1px solid rgba(var(--badge-color-rgb), 0.3);
		border-radius: 20px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		box-shadow:
			0 20px 60px rgba(0, 0, 0, 0.5),
			0 0 80px rgba(var(--badge-color-rgb), 0.1);
	}

	/* Modal Header */
	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20px;
		background: linear-gradient(135deg, rgba(var(--badge-color-rgb), 0.15), rgba(var(--badge-color-rgb), 0.05));
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
	}

	.modal-level-indicator {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.level-circle {
		width: 56px;
		height: 56px;
		background: var(--badge-color);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 20px rgba(var(--badge-color-rgb), 0.4);
		flex-shrink: 0;
	}

	.level-circle.subzero {
		background: linear-gradient(135deg, #ffffff, #cccccc);
		box-shadow: 0 4px 20px rgba(255, 255, 255, 0.3);
	}

	.level-text {
		font-size: 36px; /* reduced by 20% */
		font-weight: 700;
		color: #000;
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
		letter-spacing: -0.5px;
	}

	.level-info {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.level-title {
		font-size: 18px;
		font-weight: 700;
		color: #fff;
		margin: 0;
	}

	.level-quality {
		font-size: 12px;
		font-weight: 600;
		padding: 2px 8px;
		border-radius: 4px;
		display: inline-flex;
		width: fit-content;
	}

	.quality-subzero {
		background: rgba(255, 255, 255, 0.2);
		color: #fff;
	}

	.quality-best {
		background: rgba(59, 130, 246, 0.2);
		color: #3b82f6;
	}

	.quality-excellent {
		background: rgba(34, 197, 94, 0.2);
		color: #22c55e;
	}

	.quality-good {
		background: rgba(234, 179, 8, 0.2);
		color: #eab308;
	}

	.quality-moderate {
		background: rgba(249, 115, 22, 0.2);
		color: #f97316;
	}

	.quality-basic {
		background: rgba(239, 68, 68, 0.2);
		color: #ef4444;
	}

	.quality-notvu {
		background: rgba(107, 114, 128, 0.2);
		color: #6b7280;
	}

	.close-btn {
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		color: #888;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.close-btn:hover {
		background: rgba(255, 255, 255, 0.2);
		color: #fff;
		border-color: rgba(255, 255, 255, 0.2);
	}

	/* Modal Body */
	.modal-body {
		padding: 20px;
		overflow-y: auto;
		flex: 1;
	}

	.modal-description {
		font-size: 14px;
		line-height: 1.6;
		color: #ccc;
		margin-bottom: 20px;
	}

	/* Privacy Details Grid */
	.privacy-details {
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin-bottom: 20px;
	}

	.detail-item {
		display: flex;
		gap: 12px;
		padding: 12px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 10px;
		border-left: 3px solid;
		transition: all 0.2s ease;
	}

	.detail-item:hover {
		background: rgba(255, 255, 255, 0.05);
	}

	.detail-item.control {
		border-left-color: #22c55e;
	}

	.detail-item.hidden-from-us {
		border-left-color: #3b82f6;
	}

	.detail-item.server-access {
		border-left-color: #f97316;
	}

	.detail-icon {
		flex-shrink: 0;
		width: 28px;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 6px;
	}

	.detail-item.control .detail-icon {
		color: #22c55e;
	}

	.detail-item.hidden-from-us .detail-icon {
		color: #3b82f6;
	}

	.detail-item.server-access .detail-icon {
		color: #f97316;
	}

	.detail-content h4 {
		font-size: 12px;
		font-weight: 600;
		color: #fff;
		margin: 0 0 4px 0;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.detail-content p {
		font-size: 13px;
		color: #999;
		margin: 0;
		line-height: 1.5;
	}

	/* Tradeoffs Section */
	.tradeoffs-section {
		margin-bottom: 16px;
		padding: 12px;
		background: rgba(249, 115, 22, 0.05);
		border: 1px solid rgba(249, 115, 22, 0.2);
		border-radius: 10px;
	}

	.tradeoffs-title {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 12px;
		font-weight: 600;
		color: #f97316;
		margin: 0 0 8px 0;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.tradeoffs-list {
		margin: 0;
		padding: 0 0 0 20px;
		font-size: 13px;
		color: #999;
		line-height: 1.6;
	}

	.tradeoffs-list li {
		margin-bottom: 4px;
	}

	/* Why Section */
	.why-section {
		margin-bottom: 16px;
		padding: 12px;
		background: rgba(0, 212, 255, 0.05);
		border: 1px solid rgba(0, 212, 255, 0.2);
		border-radius: 10px;
	}

	.why-title {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 12px;
		font-weight: 600;
		color: #00d4ff;
		margin: 0 0 8px 0;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.why-content {
		font-size: 13px;
		color: #ccc;
		margin: 0;
		line-height: 1.6;
	}

	/* Commitment Section */
	.commitment-section {
		padding: 16px;
		background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(0, 212, 255, 0.1));
		border: 1px solid rgba(34, 197, 94, 0.2);
		border-radius: 10px;
	}

	.commitment-badge {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 4px 10px;
		background: rgba(34, 197, 94, 0.2);
		border: 1px solid rgba(34, 197, 94, 0.3);
		border-radius: 20px;
		font-size: 11px;
		font-weight: 700;
		color: #22c55e;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin-bottom: 10px;
	}

	.commitment-text {
		font-size: 12px;
		color: #ccc;
		margin: 0;
		line-height: 1.6;
	}

	/* Modal Footer */
	.modal-footer {
		padding: 16px 20px;
		border-top: 1px solid rgba(255, 255, 255, 0.05);
		display: flex;
		justify-content: center;
	}

	.learn-more-btn {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 10px 20px;
		background: rgba(0, 212, 255, 0.1);
		border: 1px solid rgba(0, 212, 255, 0.3);
		border-radius: 8px;
		color: #00d4ff;
		font-size: 13px;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.learn-more-btn:hover {
		background: rgba(0, 212, 255, 0.2);
		border-color: rgba(0, 212, 255, 0.4);
		transform: translateY(-1px);
	}
</style>

