<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { Search, X, ArrowRight } from 'lucide-svelte';
	import { getAllApps, type VuApp } from '$lib/data/apps';

	export let isOpen = false;
	export let onClose: () => void;

	let searchQuery = '';
	let searchInput: HTMLInputElement;
	let filteredApps: VuApp[] = [];
	let selectedIndex = 0;

	const allApps = getAllApps();

	// Focus search input when modal opens
	$: if (isOpen && searchInput) {
		setTimeout(() => searchInput.focus(), 100);
	}

	// Filter apps based on search query
	$: {
		if (searchQuery.trim() === '') {
			filteredApps = allApps.slice(0, 8); // Show first 8 apps as suggestions
		} else {
			const query = searchQuery.toLowerCase();
			filteredApps = allApps.filter(app => 
				app.name.toLowerCase().includes(query) ||
				app.tagline.toLowerCase().includes(query) ||
				app.description.toLowerCase().includes(query) ||
				app.category.toLowerCase().includes(query) ||
				app.techStack.some(tech => tech.toLowerCase().includes(query))
			).slice(0, 8); // Limit to 8 results
		}
		selectedIndex = 0; // Reset selection when results change
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			onClose();
		} else if (event.key === 'ArrowDown') {
			event.preventDefault();
			selectedIndex = Math.min(selectedIndex + 1, filteredApps.length - 1);
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			selectedIndex = Math.max(selectedIndex - 1, 0);
		} else if (event.key === 'Enter' && filteredApps[selectedIndex]) {
			navigateToApp(filteredApps[selectedIndex].id);
		}
	}

	function navigateToApp(appId: string) {
		window.location.href = `/apps/${appId}`;
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			onClose();
		}
	}

	onMount(() => {
		// Prevent body scroll when modal is open
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

{#if isOpen}
	<div class="search-modal" transition:fade={{ duration: 200 }} on:click={handleBackdropClick} role="dialog" aria-modal="true" aria-labelledby="search-title">
		<div class="modal-content" transition:fly={{ y: -50, duration: 300 }}>
			<!-- Search Header -->
			<div class="search-header">
				<div class="search-input-container">
					<Search class="search-icon w-6 h-6 text-text-secondary" />
					<input
						bind:this={searchInput}
						bind:value={searchQuery}
						on:keydown={handleKeydown}
						type="text"
						placeholder="Search VU Suite apps..."
						class="search-input"
						aria-label="Search apps"
					/>
					<button on:click={onClose} class="close-button" aria-label="Close search">
						<X class="w-5 h-5" />
					</button>
				</div>
			</div>

			<!-- Search Results -->
			<div class="search-results">
				{#if searchQuery.trim() === ''}
					<div class="search-suggestions">
						<p class="suggestions-title">Suggested Apps</p>
						<div class="suggestions-grid">
							{#each filteredApps as app, index}
								<button
									class="app-result"
									class:selected={index === selectedIndex}
									on:click={() => navigateToApp(app.id)}
									on:mouseenter={() => selectedIndex = index}
								>
									<div class="app-icon" style="color: {app.color};">{app.icon}</div>
									<div class="app-info">
										<h4 class="app-name">{app.name}</h4>
										<p class="app-tagline">{app.tagline}</p>
										<div class="app-meta">
											<span class="privacy-badge">Level {app.privacyLevel}</span>
											<span class="category-badge">{app.category}</span>
										</div>
									</div>
									<div class="app-action">
										<ArrowRight class="w-5 h-5" />
									</div>
								</button>
							{/each}
						</div>
					</div>
				{:else if filteredApps.length > 0}
					<div class="search-results-list">
						<p class="results-title">{filteredApps.length} result{filteredApps.length !== 1 ? 's' : ''} for "{searchQuery}"</p>
						<div class="results-grid">
							{#each filteredApps as app, index}
								<button
									class="app-result"
									class:selected={index === selectedIndex}
									on:click={() => navigateToApp(app.id)}
									on:mouseenter={() => selectedIndex = index}
								>
									<div class="app-icon" style="color: {app.color};">{app.icon}</div>
									<div class="app-info">
										<h4 class="app-name">{app.name}</h4>
										<p class="app-tagline">{app.tagline}</p>
										<div class="app-meta">
											<span class="privacy-badge">Level {app.privacyLevel}</span>
											<span class="price-badge">${app.pricing.monthly}/mo</span>
										</div>
									</div>
									<div class="app-action">
										<ArrowRight class="w-5 h-5" />
									</div>
								</button>
							{/each}
						</div>
					</div>
				{:else}
					<div class="no-results">
						<div class="no-results-icon">🔍</div>
						<h3>No apps found</h3>
						<p>Try searching for something else, or <a href="/apps" class="text-primary hover:underline">browse all apps</a></p>
					</div>
				{/if}
			</div>

			<!-- Search Tips -->
			<div class="search-footer">
				<div class="search-tips">
					<span class="tip"><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
					<span class="tip"><kbd>Enter</kbd> Select</span>
					<span class="tip"><kbd>Esc</kbd> Close</span>
				</div>
				<div class="privacy-notice">
					<span class="privacy-icon">🛡️</span>
					<span class="privacy-text">Your searches are never logged or tracked</span>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.search-modal {
		position: fixed;
		inset: 0;
		z-index: 9999;
		background: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(8px);
		display: flex;
		justify-content: center;
		padding-top: 10vh;
	}

	.modal-content {
		width: 90%;
		max-width: 640px;
		max-height: 80vh;
		background: var(--color-background);
		border: 1px solid var(--color-border);
		border-radius: 16px;
		overflow: hidden;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
	}

	.search-header {
		padding: 24px;
		border-bottom: 1px solid var(--color-border);
	}

	.search-input-container {
		display: flex;
		align-items: center;
		gap: 12px;
		background: var(--color-glass);
		border: 2px solid var(--color-border);
		border-radius: 12px;
		padding: 12px 16px;
		transition: border-color 0.2s ease;
	}

	.search-input-container:focus-within {
		border-color: var(--color-primary);
	}

	.search-icon {
		flex-shrink: 0;
	}

	.search-input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		font-size: 18px;
		color: var(--color-text-primary);
	}

	.search-input::placeholder {
		color: var(--color-text-tertiary);
	}

	.close-button {
		flex-shrink: 0;
		background: transparent;
		border: none;
		color: var(--color-text-secondary);
		cursor: pointer;
		padding: 4px;
		border-radius: 4px;
		transition: all 0.2s ease;
	}

	.close-button:hover {
		background: var(--color-glass);
		color: var(--color-text-primary);
	}

	.search-results {
		max-height: 50vh;
		overflow-y: auto;
		padding: 16px;
	}

	.search-results::-webkit-scrollbar {
		width: 8px;
	}

	.search-results::-webkit-scrollbar-track {
		background: transparent;
	}

	.search-results::-webkit-scrollbar-thumb {
		background: var(--color-border);
		border-radius: 4px;
	}

	.search-results::-webkit-scrollbar-thumb:hover {
		background: var(--color-border-hover);
	}

	.suggestions-title,
	.results-title {
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		color: var(--color-text-tertiary);
		margin-bottom: 12px;
		letter-spacing: 0.5px;
	}

	.suggestions-grid,
	.results-grid {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.app-result {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 12px;
		background: var(--color-glass);
		border: 1px solid var(--color-border);
		border-radius: 12px;
		cursor: pointer;
		transition: all 0.2s ease;
		text-align: left;
		width: 100%;
	}

	.app-result:hover,
	.app-result.selected {
		background: rgba(0, 212, 255, 0.1);
		border-color: var(--color-primary);
		transform: translateX(4px);
	}

	.app-icon {
		width: 48px;
		height: 48px;
		background: var(--color-surface);
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24px;
		font-weight: bold;
		flex-shrink: 0;
	}

	.app-info {
		flex: 1;
		min-width: 0;
	}

	.app-name {
		font-size: 16px;
		font-weight: 600;
		color: var(--color-text-primary);
		margin-bottom: 4px;
	}

	.app-tagline {
		font-size: 13px;
		color: var(--color-text-secondary);
		margin-bottom: 6px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.app-meta {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}

	.privacy-badge,
	.category-badge,
	.price-badge {
		font-size: 10px;
		padding: 2px 8px;
		border-radius: 4px;
		font-weight: 600;
	}

	.privacy-badge {
		background: rgba(59, 130, 246, 0.2);
		color: #3b82f6;
	}

	.category-badge {
		background: rgba(255, 255, 255, 0.1);
		color: var(--color-text-tertiary);
	}

	.price-badge {
		background: rgba(0, 212, 255, 0.2);
		color: var(--color-primary);
	}

	.app-action {
		flex-shrink: 0;
		color: var(--color-text-secondary);
		transition: transform 0.2s ease;
	}

	.app-result:hover .app-action,
	.app-result.selected .app-action {
		color: var(--color-primary);
		transform: translateX(4px);
	}

	.no-results {
		text-align: center;
		padding: 48px 24px;
	}

	.no-results-icon {
		font-size: 64px;
		margin-bottom: 16px;
		opacity: 0.5;
	}

	.no-results h3 {
		font-size: 20px;
		font-weight: 600;
		margin-bottom: 8px;
		color: var(--color-text-primary);
	}

	.no-results p {
		font-size: 14px;
		color: var(--color-text-secondary);
	}

	.search-footer {
		padding: 16px 24px;
		border-top: 1px solid var(--color-border);
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 16px;
		flex-wrap: wrap;
	}

	.search-tips {
		display: flex;
		gap: 16px;
		flex-wrap: wrap;
	}

	.tip {
		font-size: 12px;
		color: var(--color-text-tertiary);
		display: flex;
		align-items: center;
		gap: 6px;
	}

	kbd {
		background: var(--color-glass);
		border: 1px solid var(--color-border);
		border-radius: 4px;
		padding: 2px 6px;
		font-family: var(--font-mono, monospace);
		font-size: 11px;
		font-weight: 600;
		color: var(--color-text-secondary);
	}

	.privacy-notice {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 11px;
		color: var(--color-text-tertiary);
	}

	.privacy-icon {
		font-size: 14px;
	}

	/* Mobile responsiveness */
	@media (max-width: 768px) {
		.search-modal {
			padding-top: 5vh;
		}

		.modal-content {
			width: 95%;
			max-height: 85vh;
		}

		.search-header {
			padding: 16px;
		}

		.search-input {
			font-size: 16px;
		}

		.app-result {
			padding: 10px;
		}

		.app-icon {
			width: 40px;
			height: 40px;
			font-size: 20px;
		}

		.app-name {
			font-size: 14px;
		}

		.app-tagline {
			font-size: 12px;
		}

		.search-footer {
			flex-direction: column;
			align-items: flex-start;
			gap: 12px;
		}
	}
</style>

