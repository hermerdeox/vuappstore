<script lang="ts">
	import { getAllApps } from '$lib/data/apps';
	import type { VuApp } from '$lib/data/apps';
	import { ShieldCheck } from 'lucide-svelte';
	import { page } from '$app/stores';

	const allApps = getAllApps();
	let filteredApps = allApps;

	$: {
		const category = $page.url.searchParams.get('category');
		if (category) {
			filteredApps = allApps.filter(app => app.category.toLowerCase() === category.toLowerCase());
		} else {
			filteredApps = allApps;
		}
	}

	const categories = [
		'All',
		'Productivity',
		'Communication',
		'Finance',
		'Health',
		'Creative',
		'Learning',
		'Utilities',
		'Security'
	];
</script>

<svelte:head>
	<title>Browse Apps - VuAppStore</title>
	<meta name="description" content="Discover 30+ privacy-focused applications. Every app verified for security and privacy." />
</svelte:head>

<div class="apps-page">
	<!-- Hero Section -->
	<section class="hero container py-12 text-center relative z-10">
		<h1 class="text-4xl md:text-5xl font-black mb-4 text-gradient">
			Privacy-First Applications
		</h1>
		<p class="text-lg text-text-secondary max-w-2xl mx-auto">
			Every app in the VU Suite is built with privacy as the foundation. Browse our collection of 30+ zero-knowledge applications.
		</p>
	</section>

	<!-- Category Filter -->
	<section class="filter-section container mb-8 relative z-10">
		<div class="category-filter flex flex-wrap gap-3 justify-center">
			{#each categories as category}
				<a 
					href={category === 'All' ? '/apps' : `/apps?category=${category.toLowerCase()}`}
					class="category-btn px-4 py-2 rounded-lg text-sm font-medium transition-all"
					class:active={category === 'All' ? !$page.url.searchParams.get('category') : $page.url.searchParams.get('category')?.toLowerCase() === category.toLowerCase()}
				>
					{category}
				</a>
			{/each}
		</div>
	</section>

	<!-- Apps Grid -->
	<section class="apps-grid-section container mb-16 relative z-10">
		<div class="app-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{#each filteredApps as app}
				<a href="/apps/{app.id}" class="app-card glass-card p-6 hover:-translate-y-1 transition-all">
					<div class="app-card-header flex gap-4 mb-4">
						<div 
							class="app-card-icon w-14 h-14 bg-surface rounded-lg flex items-center justify-center text-2xl font-bold" 
							style="color: {app.color};"
						>
							{app.icon}
						</div>
						<div class="app-card-info flex-1">
							<div class="app-card-name text-lg font-semibold mb-1">{app.name}</div>
							<div class="app-card-category text-xs text-text-tertiary">{app.category}</div>
						</div>
					</div>
					<div class="app-card-description text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3">
						{app.description}
					</div>
					<div class="app-card-footer flex justify-between items-center">
						<div class="app-card-privacy flex items-center gap-2">
							<div class="privacy-badge w-6 h-6 bg-success/10 rounded-full flex items-center justify-center text-xs font-bold text-success">
								{app.privacyLevel}
							</div>
							<span class="text-xs text-text-tertiary">Privacy Score</span>
						</div>
						<div class="app-card-price text-sm font-semibold">${app.pricing.monthly}/mo</div>
					</div>
				</a>
			{/each}
		</div>
	</section>
</div>

<style>
	.category-btn {
		@apply bg-glass border border-border text-text-secondary;
	}

	.category-btn:hover {
		@apply bg-glass-heavy text-text-primary;
	}

	.category-btn.active {
		@apply bg-primary/20 border-primary/50 text-primary;
	}

	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>

