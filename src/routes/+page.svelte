<script lang="ts">
	import { vuApps, getAllApps, getFeaturedApps, getPrivacyChampions } from '$lib/data/apps';
	import { Download, Lock, ShieldCheck, Globe, ArrowRight, Star, Sparkles } from 'lucide-svelte';
	import VuLabsCertified from '$lib/components/badges/VuLabsCertified.svelte';

	const featuredApps = getFeaturedApps();
	const privacyChampions = getPrivacyChampions();
	const vuSuiteApps = ['vunotes', 'vuwallet', 'vucalendar', 'vufit', 'vutext', 'vuphoto', 'vucall', 'vuscan', 'vuvault'];
	const newAndNoteworthy = getAllApps().filter(app => app.status === 'available').slice(0, 4);

	const categories = [
		{ name: 'Zero-Knowledge', count: 142, gradient: 'from-green-600 to-green-700', icon: ShieldCheck },
		{ name: 'End-to-End', count: 89, gradient: 'from-blue-600 to-blue-800', icon: Lock },
		{ name: 'Offline-First', count: 234, gradient: 'from-purple-600 to-purple-800', icon: Globe },
		{ name: 'Open Source', count: 156, gradient: 'from-pink-600 to-pink-800', icon: ShieldCheck },
		{ name: 'Community Pick', count: 67, gradient: 'from-orange-600 to-orange-800', icon: Sparkles },
		{ name: 'Editor\'s Choice', count: 31, gradient: 'from-cyan-600 to-cyan-700', icon: Star }
	];
</script>

<svelte:head>
	<title>VuAppStore - Privacy-First App Marketplace</title>
	<meta name="description" content="Your Apps. Your Data. Your Life. Zero Surveillance. The first app marketplace where privacy isn't a feature, it's the foundation." />
</svelte:head>

<div class="home-page">
	<!-- Hero Section -->
	<section class="hero container hero-padding text-center relative z-10">
		<div class="hero-badge inline-flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-primary/10 border border-primary/30 rounded-full mb-4 md:mb-6">
			<span class="hero-badge-dot w-2 h-2 bg-primary rounded-full animate-pulse"></span>
			<span class="hero-badge-text text-xs font-semibold text-primary uppercase tracking-wide">Zero-Knowledge Marketplace</span>
		</div>
		<h1 class="heading-hero mb-4 md:mb-6 text-gradient">
			Your Apps. Your Data.<br class="hidden sm:block">Your Life. Zero Surveillance.
		</h1>
		<p class="text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto mb-6 md:mb-8 px-4 sm:px-0">
			The first app marketplace where privacy isn't a feature, it's the foundation. 
			Every app verified, every byte encrypted, every moment yours.
		</p>

		<!-- Trust Indicators -->
		<div class="business-highlights grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto mb-6 md:mb-8 px-4 sm:px-0">
			<div class="highlight flex items-center gap-2 justify-center text-center">
				<span class="icon text-success text-sm">✓</span>
				<span class="text-xs sm:text-sm text-text-secondary">Legitimate SaaS</span>
			</div>
			<div class="highlight flex items-center gap-2 justify-center text-center">
				<span class="icon text-success text-sm">✓</span>
				<span class="text-xs sm:text-sm text-text-secondary">Instant Delivery</span>
			</div>
			<div class="highlight flex items-center gap-2 justify-center text-center">
				<span class="icon text-success text-sm">✓</span>
				<span class="text-xs sm:text-sm text-text-secondary">30-Day Guarantee</span>
			</div>
			<div class="highlight flex items-center gap-2 justify-center text-center">
				<span class="icon text-success text-sm">✓</span>
				<span class="text-xs sm:text-sm text-text-secondary">Secure Payments</span>
			</div>
		</div>
	</section>

	<!-- The VU Suite Spotlight -->
	<section class="spotlight-section container mb-16 relative z-10">
		<!-- Explore The Store Button -->
		<div class="text-center mb-8">
			<a href="/vu-store" class="inline-flex items-center gap-3 px-8 py-4 bg-primary/20 border-2 border-primary hover:bg-primary hover:text-background transition-all duration-200 rounded-xl font-bold text-lg">
				<ShieldCheck class="w-6 h-6" />
				Explore The Store
				<ArrowRight class="w-6 h-6" />
			</a>
		</div>

		<div class="spotlight-card glass-card p-8 md:p-12 relative overflow-hidden">
			<div class="spotlight-header flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
				<span class="spotlight-badge inline-flex items-center gap-2 px-4 py-2 bg-primary text-background rounded-full text-xs font-bold uppercase tracking-wide">
					<Sparkles class="w-4 h-4" />
					Premium In-House Production
				</span>
				<div class="spotlight-price text-left md:text-right">
					<div class="spotlight-price-amount text-4xl font-bold text-text-primary">$2.56</div>
					<div class="spotlight-price-period text-sm text-text-secondary">per app, per month</div>
					<div class="spotlight-price-value text-sm text-primary font-semibold mt-1">256 bits = $2.56 = 1¢ per bit</div>
					<div class="spotlight-price-crypto text-xs text-info mt-2">Pay with crypto • Zero tracking</div>
				</div>
			</div>

			<div class="spotlight-content grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
				<div class="spotlight-info lg:col-span-2">
					<h2 class="text-3xl md:text-4xl font-bold mb-3">The VU Suite</h2>
					<p class="spotlight-tagline text-lg text-text-secondary italic mb-6">
						"Déjà vu - Remember when your data was yours?"
					</p>
					<p class="spotlight-description text-text-secondary leading-relaxed mb-6">
						30+ zero-knowledge applications built from the ground up with privacy as the core architecture. 
						At just 1 cent per bit of encryption, true digital sovereignty has never been more accessible.
					</p>
					<div class="spotlight-stats flex gap-6 mb-6 flex-wrap">
						<div class="stat-item flex items-center gap-2">
							<Lock class="w-5 h-5 text-primary" />
							<span class="stat-text text-sm text-text-secondary"><strong class="text-text-primary">100%</strong> Encrypted</span>
						</div>
						<div class="stat-item flex items-center gap-2">
							<ShieldCheck class="w-5 h-5 text-primary" />
							<span class="stat-text text-sm text-text-secondary"><strong class="text-text-primary">Zero</strong> Tracking</span>
						</div>
						<div class="stat-item flex items-center gap-2">
							<Globe class="w-5 h-5 text-primary" />
							<span class="stat-text text-sm text-text-secondary"><strong class="text-text-primary">Offline</strong> First</span>
						</div>
					</div>
					<div class="spotlight-cta flex gap-4 flex-wrap">
						<a href="/pricing" class="btn btn-primary">
							<Download class="w-4 h-4" />
							Get The VU Suite
						</a>
						<a href="/apps/vuvault" class="btn btn-secondary">Learn More</a>
					</div>
				</div>

				<div class="spotlight-apps mini-app-grid lg:col-span-3">
					{#each vuSuiteApps as appId}
						<a href="/apps/{appId}" class="mini-app glass-card aspect-square flex flex-col items-center justify-center gap-1 md:gap-2 hover:-translate-y-1 transition-all relative" style="--app-color: {vuApps[appId].color}; --app-color-rgb: {vuApps[appId].colorRgb};">
							<div class="mini-app-icon text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold" style="color: {vuApps[appId].color};">
								{vuApps[appId].icon}
							</div>
							<div class="mini-app-name text-xs sm:text-sm md:text-base font-medium text-text-secondary text-center px-1">{vuApps[appId].name}</div>
							{#if vuApps[appId].certified}
								<div class="absolute bottom-1 md:bottom-2">
									<VuLabsCertified size="xs" />
								</div>
							{/if}
						</a>
					{/each}
					<a href="/apps" class="mini-app glass-card aspect-square flex flex-col items-center justify-center gap-1 md:gap-2 hover:-translate-y-1 transition-all" style="--app-color: #8b5cf6; --app-color-rgb: 139, 92, 246;">
						<div class="mini-app-icon text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold" style="color: #8b5cf6;">+21</div>
						<div class="mini-app-name text-xs sm:text-sm md:text-base font-medium text-text-secondary text-center px-1">More Apps</div>
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Privacy Champions Section -->
	<section class="section container mb-16 relative z-10">
		<div class="section-header flex justify-between items-center mb-6">
			<h2 class="section-title text-2xl md:text-3xl font-bold">Privacy Champions</h2>
			<a href="/apps" class="section-action text-sm text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all">
				See all
				<ArrowRight class="w-4 h-4" />
			</a>
		</div>
		<div class="horizontal-scroll flex gap-4 overflow-x-auto pb-4">
			{#each privacyChampions as app}
				<a href="/apps/{app.id}" class="horizontal-card glass-card flex-shrink-0 w-64 p-4 hover:scale-105 transition-transform">
					<div class="app-card-header flex gap-4 mb-4">
						<div class="app-card-icon w-14 h-14 bg-surface rounded-lg flex items-center justify-center text-2xl font-bold" style="color: {app.color};">
							{app.icon}
						</div>
						<div class="app-card-info flex-1">
							<div class="app-card-name text-lg font-semibold mb-1">{app.name}</div>
							<div class="app-card-developer text-xs text-text-tertiary">by {app.developer || 'VuApps'}</div>
						{#if app.certified}
							<div class="mt-1">
								<VuLabsCertified size="sm" />
							</div>
						{/if}
						</div>
					</div>
					<div class="app-card-description text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
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

	<!-- New & Noteworthy -->
	<section class="section container mb-16 relative z-10">
		<div class="section-header flex justify-between items-center mb-6">
			<h2 class="section-title text-2xl md:text-3xl font-bold">New & Noteworthy</h2>
			<a href="/apps" class="section-action text-sm text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all">
				Browse all
				<ArrowRight class="w-4 h-4" />
			</a>
		</div>
		<div class="app-grid">
			{#each newAndNoteworthy as app}
				<a href="/apps/{app.id}" class="app-card glass-card p-4 md:p-6 hover:-translate-y-1 transition-all">
					<div class="app-card-header flex gap-3 md:gap-4 mb-3 md:mb-4">
						<div class="app-card-icon w-12 h-12 md:w-14 md:h-14 bg-surface rounded-lg flex items-center justify-center text-xl md:text-2xl font-bold" style="color: {app.color};">
							{app.icon}
						</div>
						<div class="app-card-info flex-1 min-w-0">
							<div class="app-card-name text-base md:text-lg font-semibold mb-1 truncate">{app.name}</div>
							<div class="app-card-developer text-xs text-text-tertiary">by {app.developer || 'VuApps'}</div>
						{#if app.certified}
							<div class="mt-1">
								<VuLabsCertified size="sm" />
							</div>
						{/if}
						</div>
					</div>
					<div class="app-card-description text-sm text-text-secondary leading-relaxed mb-3 md:mb-4 line-clamp-3">
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

	<!-- VU Zero Privacy Levels - Prominent Section -->
	<section class="privacy-levels-cta container mb-24 relative z-10">
		<div class="glass-card p-12 md:p-16 text-center relative overflow-hidden border-2 border-primary/30">
			<!-- Background Gradient -->
			<div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple/5 pointer-events-none"></div>
			
			<div class="relative z-10">
				<!-- Badge -->
				<div class="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/40 rounded-full mb-6">
					<ShieldCheck class="w-4 h-4 text-primary" />
					<span class="text-xs font-bold text-primary uppercase tracking-wide">Transparency Protocol</span>
				</div>

				<!-- Heading -->
				<h2 class="text-3xl md:text-5xl font-black mb-6 text-gradient">
					Understand Your Privacy.<br>Choose Your Level.
				</h2>
				
				<!-- Description -->
				<p class="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-8 leading-relaxed">
					Not all privacy is created equal. The VU Zero-Level System shows you exactly what each app can see, 
					what it can't, and what happens to your data. From <strong class="text-primary">Basic Privacy</strong> to 
					<strong class="text-success">True Zero-Knowledge</strong> and beyond.
				</p>

			<!-- Level Preview Cards -->
			<div class="levels-preview grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 mb-8 max-w-5xl mx-auto">
				<a href="/privacy-levels#level-5" class="level-preview-card glass-card p-3 md:p-4 border-l-4 border-gray-500 hover:-translate-y-1 transition-transform opacity-75 hover:opacity-100">
					<div class="text-2xl md:text-3xl font-black text-gray-500 mb-2 relative">
						5
						<span class="absolute -top-1 -right-1 text-xs text-error">✗</span>
					</div>
					<div class="text-xs font-semibold text-text-primary mb-1">Conventional</div>
					<div class="text-[10px] text-text-tertiary">"Privacy" Claims</div>
				</a>
				<a href="/privacy-levels#level-4" class="level-preview-card glass-card p-3 md:p-4 border-l-4 border-error hover:-translate-y-1 transition-transform">
					<div class="text-2xl md:text-3xl font-black text-error mb-2">4</div>
					<div class="text-xs font-semibold text-text-primary mb-1">Basic Privacy</div>
					<div class="text-[10px] text-text-tertiary">Encrypted Transit</div>
				</a>
				<div class="level-preview-card glass-card p-4 border-l-4 border-warning hover:-translate-y-1 transition-transform">
					<div class="text-3xl font-black text-warning mb-2">3</div>
					<div class="text-xs font-semibold text-text-primary mb-1">Enhanced</div>
					<div class="text-[10px] text-text-tertiary">End-to-End</div>
				</div>
				<div class="level-preview-card glass-card p-4 border-l-4 border-primary hover:-translate-y-1 transition-transform">
					<div class="text-3xl font-black text-primary mb-2">2</div>
					<div class="text-xs font-semibold text-text-primary mb-1">Privacy First</div>
					<div class="text-[10px] text-text-tertiary">Zero Data Need</div>
				</div>
				<div class="level-preview-card glass-card p-4 border-l-4 border-success hover:-translate-y-1 transition-transform">
					<div class="text-3xl font-black text-success mb-2">1</div>
					<div class="text-xs font-semibold text-text-primary mb-1">Local-First</div>
					<div class="text-[10px] text-text-tertiary">Your Device Only</div>
				</div>
				<div class="level-preview-card glass-card p-4 border-l-4 border-info hover:-translate-y-1 transition-transform">
					<div class="text-3xl font-black text-info mb-2">0</div>
					<div class="text-xs font-semibold text-text-primary mb-1">Zero-Knowledge</div>
					<div class="text-[10px] text-text-tertiary">True Anonymity</div>
				</div>
			</div>

				<!-- CTA Button -->
				<a href="/privacy-levels" class="btn btn-primary text-lg px-8 py-4 inline-flex items-center gap-2">
					<ShieldCheck class="w-5 h-5" />
					Explore the VU Zero-Level System
					<ArrowRight class="w-5 h-5" />
				</a>

				<!-- Additional Info -->
				<p class="text-xs text-text-tertiary mt-6">
					Every app is rated. Every rating is verified. Every choice is yours.
				</p>
			</div>
		</div>
	</section>

	<!-- Categories -->
	<section class="section container mb-16 relative z-10">
		<div class="section-header mb-6">
			<h2 class="section-title text-2xl md:text-3xl font-bold">Browse by Privacy Level</h2>
		</div>
		<div class="category-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
			{#each categories as category}
				<a href="/apps?privacy={category.name.toLowerCase()}" class="category-card aspect-video bg-gradient-to-br {category.gradient} rounded-2xl flex flex-col items-center justify-center gap-2 hover:-translate-y-1 hover:scale-105 transition-all text-white no-underline relative overflow-hidden group">
					<div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
					<svelte:component this={category.icon} class="w-10 h-10 relative z-10" />
					<div class="category-name text-base font-semibold relative z-10">{category.name}</div>
					<div class="category-count text-xs opacity-80 relative z-10">{category.count} apps</div>
				</a>
			{/each}
		</div>
	</section>

	<!-- Trust Indicators -->
	<section class="trust-indicators container mb-16 relative z-10">
		<div class="glass-card p-8 md:p-12 text-center">
			<h2 class="text-2xl md:text-3xl font-bold mb-8">Trusted by Privacy-Conscious Users Worldwide</h2>
			<div class="stats grid grid-cols-2 md:grid-cols-4 gap-8">
				<div class="stat">
					<div class="stat-value text-3xl md:text-4xl font-bold text-primary mb-2">50,000+</div>
					<div class="stat-label text-sm text-text-secondary">Active Subscribers</div>
				</div>
				<div class="stat">
					<div class="stat-value text-3xl md:text-4xl font-bold text-primary mb-2">99.9%</div>
					<div class="stat-label text-sm text-text-secondary">Uptime SLA</div>
				</div>
				<div class="stat">
					<div class="stat-value text-3xl md:text-4xl font-bold text-primary mb-2">{'< 24h'}</div>
					<div class="stat-label text-sm text-text-secondary">Support Response</div>
				</div>
				<div class="stat">
					<div class="stat-value text-3xl md:text-4xl font-bold text-primary mb-2">0.1%</div>
					<div class="stat-label text-sm text-text-secondary">Chargeback Rate</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Compliance Badges -->
	<section class="compliance-badges container mb-16 relative z-10 text-center">
		<h3 class="text-xl font-semibold mb-6 text-text-secondary">Privacy & Compliance</h3>
		<div class="badges flex flex-wrap justify-center gap-6 items-center opacity-60">
			<span class="text-sm text-text-tertiary">Zero Tracking Certified</span>
			<span class="text-sm text-text-tertiary">Crypto-Only Payments</span>
			<span class="text-sm text-text-tertiary">GDPR Compliant</span>
			<span class="text-sm text-text-tertiary">CCPA Compliant</span>
			<span class="text-sm text-text-tertiary">SOC 2 Type II</span>
			<span class="text-sm text-text-tertiary">ISO 27001</span>
		</div>
		<p class="payment-security text-xs text-text-tertiary mt-6">
			🔒 Privacy-first crypto payments | Monero, Lightning, BTC, ETH | Zero transaction tracking
		</p>
	</section>
</div>

<style>
	.mini-app::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, transparent 30%, rgba(var(--app-color-rgb), 0.1));
		opacity: 0;
		transition: opacity 0.2s ease;
	}

	.mini-app:hover::before {
		opacity: 1;
	}

	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.horizontal-scroll {
		scrollbar-width: thin;
		scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
	}

	.horizontal-scroll::-webkit-scrollbar {
		height: 4px;
	}

	.horizontal-scroll::-webkit-scrollbar-track {
		background: transparent;
	}

	.horizontal-scroll::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 2px;
	}
</style>
