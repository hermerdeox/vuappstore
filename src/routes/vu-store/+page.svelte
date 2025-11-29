<script lang="ts">
	import { onMount } from 'svelte';
	import {
		TrendingUp,
		Star,
		Download,
		Users,
		MessageSquare,
		Lightbulb,
		Trophy,
		Github,
		Twitter,
		DollarSign,
		ArrowRight,
		Shield,
		Zap,
		Coins,
		Sparkles,
		Lock,
		Globe,
		Eye,
		Ghost,
		LockKeyhole,
		Mail,
		StickyNote,
		Cloud,
		BarChart3,
		Calendar,
		CheckCircle,
		Wallet,
		Dumbbell,
		Monitor,
		Music,
		FileText,
		Flame,
		Rocket,
		PlusCircle
	} from 'lucide-svelte';

	// Third-party developer apps (mockup data)
	const trendingApps = [
		{
			id: 'privatemessenger',
			name: 'PrivateMessenger',
			iconComponent: MessageSquare,
			color: '#8b5cf6',
			tagline: 'Anonymous chat with self-destruct',
			developer: '@cryptodev',
			weeklyDownloads: 15234,
			trend: '+312%',
			rating: 4.9,
			reviews: 3421,
			pricing: { monthly: 2.56 },
			privacyLevel: 0,
			description:
				'Military-grade encrypted messaging with zero metadata collection. Built by the community, for the community.'
		},
		{
			id: 'shieldvpn',
			name: 'ShieldVPN',
			iconComponent: Shield,
			color: '#22c55e',
			tagline: 'No-logs VPN with quantum resistance',
			developer: '@privacypirate',
			weeklyDownloads: 13821,
			trend: '+278%',
			rating: 4.8,
			reviews: 2897,
			pricing: { monthly: 2.56 },
			privacyLevel: 1,
			description: 'WireGuard-based VPN with distributed servers. Zero logging, maximum privacy.'
		},
		{
			id: 'ghostbrowser',
			name: 'GhostBrowser',
			iconComponent: Ghost,
			color: '#3b82f6',
			tagline: 'Browse the web without a trace',
			developer: '@anonymousdev',
			weeklyDownloads: 11543,
			trend: '+234%',
			rating: 4.9,
			reviews: 4123,
			pricing: { monthly: 2.56 },
			privacyLevel: 0,
			description: 'Chromium-based browser with built-in tracker blocking and Tor integration.'
		},
		{
			id: 'securepass',
			name: 'SecurePass',
			iconComponent: LockKeyhole,
			color: '#ef4444',
			tagline: 'Password manager you can trust',
			developer: '@securityfirst',
			weeklyDownloads: 9876,
			trend: '+198%',
			rating: 4.7,
			reviews: 2654,
			pricing: { monthly: 2.56 },
			privacyLevel: 1,
			description: 'Zero-knowledge password vault with biometric unlock and family sharing.'
		},
		{
			id: 'cryptomail',
			name: 'CryptoMail',
			iconComponent: Mail,
			color: '#f97316',
			tagline: 'Email that actually stays private',
			developer: '@emailfreedom',
			weeklyDownloads: 8765,
			trend: '+176%',
			rating: 4.8,
			reviews: 3234,
			pricing: { monthly: 2.56 },
			privacyLevel: 0,
			description: 'End-to-end encrypted email with self-hosted option and PGP support.'
		}
	];

	// Top Rated Community Apps
	const topRatedApps = [
		{
			id: 'privacynotes',
			name: 'PrivacyNotes',
			iconComponent: StickyNote,
			color: '#eab308',
			developer: '@notemaster',
			rating: 4.9,
			reviews: 5432,
			pricing: { monthly: 2.56 },
			privacyLevel: 0,
			description: 'Markdown notes with E2E encryption and offline-first design.'
		},
		{
			id: 'safecloudstorage',
			name: 'SafeCloud',
			iconComponent: Cloud,
			color: '#06b6d4',
			developer: '@cloudprivacy',
			rating: 4.8,
			reviews: 4321,
			pricing: { monthly: 2.56 },
			privacyLevel: 1,
			description: 'Zero-knowledge cloud storage with client-side encryption.'
		},
		{
			id: 'anonymousanalytics',
			name: 'PrivateMetrics',
			iconComponent: BarChart3,
			color: '#8b5cf6',
			developer: '@dataethics',
			rating: 4.8,
			reviews: 3876,
			pricing: { monthly: 2.56 },
			privacyLevel: 2,
			description: 'Privacy-preserving analytics for websites and apps.'
		},
		{
			id: 'encryptedcalendar',
			name: 'TimeVault',
			iconComponent: Calendar,
			color: '#ec4899',
			developer: '@timeprivacy',
			rating: 4.7,
			reviews: 2987,
			pricing: { monthly: 2.56 },
			privacyLevel: 1,
			description: 'Encrypted calendar with anonymous meeting links.'
		},
		{
			id: 'securetasks',
			name: 'TaskShield',
			iconComponent: CheckCircle,
			color: '#10b981',
			developer: '@productivitysec',
			rating: 4.7,
			reviews: 3456,
			pricing: { monthly: 2.56 },
			privacyLevel: 1,
			description: 'Private task management with E2E sync across devices.'
		},
		{
			id: 'privacywallet',
			name: 'CryptoVault',
			iconComponent: Wallet,
			color: '#f59e0b',
			developer: '@cryptowallet',
			rating: 4.9,
			reviews: 6543,
			pricing: { monthly: 2.56 },
			privacyLevel: 0,
			description: 'Multi-currency wallet with hardware security key support.'
		}
	];

	// New Releases from different developers
	const newReleases = [
		{
			id: 'privacyfit',
			name: 'FitPrivate',
			iconComponent: Dumbbell,
			color: '#ef4444',
			developer: '@healthsec',
			rating: 4.6,
			pricing: { monthly: 2.56 },
			tagline: 'Health tracking that stays on your device'
		},
		{
			id: 'securecode',
			name: 'CodeVault',
			iconComponent: Monitor,
			color: '#3b82f6',
			developer: '@devsecurity',
			rating: 4.7,
			pricing: { monthly: 2.56 },
			tagline: 'Code editor with encrypted cloud sync'
		},
		{
			id: 'anonymousmusic',
			name: 'TunePrivacy',
			iconComponent: Music,
			color: '#8b5cf6',
			developer: '@musicfreedom',
			rating: 4.5,
			pricing: { monthly: 2.56 },
			tagline: 'Music streaming without tracking'
		},
		{
			id: 'privatedocs',
			name: 'DocSecure',
			iconComponent: FileText,
			color: '#22c55e',
			developer: '@docprivacy',
			rating: 4.8,
			pricing: { monthly: 2.56 },
			tagline: 'Document editor with zero-knowledge sync'
		}
	];

	// Community Bounties
	const bounties = [
		{
			id: 1,
			title: 'End-to-End Encrypted Video Calls',
			description: 'Build VuMeet - zero-knowledge video conferencing with no server-side recording',
			reward: '$5,000',
			status: 'open',
			submissions: 3
		},
		{
			id: 2,
			title: 'Decentralized File Sync Protocol',
			description: 'P2P file synchronization without centralized servers for VuSync',
			reward: '$3,500',
			status: 'open',
			submissions: 7
		},
		{
			id: 3,
			title: 'Privacy-First Maps Integration',
			description: 'Offline-first maps with zero tracking for VuMaps',
			reward: '$4,000',
			status: 'in_progress',
			submissions: 12
		}
	];

	// Community Channels
	const channels = [
		{
			name: 'GitHub',
			icon: Github,
			url: 'https://github.com/vuappstore',
			members: '2.5K',
			description: 'Open source contributions'
		},
		{
			name: 'Discord',
			icon: MessageSquare,
			url: '#',
			members: '15K',
			description: 'Real-time community chat'
		},
		{
			name: 'X (Twitter)',
			icon: Twitter,
			url: '#',
			members: '8K',
			description: 'Updates & announcements'
		},
		{ name: 'Forum', icon: Users, url: '#', members: '12K', description: 'Community discussions' }
	];
</script>

<svelte:head>
	<title>VU Store - Privacy-First App Marketplace | VuAppStore</title>
	<meta
		name="description"
		content="Explore the complete VU Store marketplace. Trending apps, top rated, bounties, and community. $2.56 per app with crypto payments."
	/>
</svelte:head>

<div class="store-page">
	<!-- Eye-Catching Hero Section -->
	<section class="hero container py-10 md:py-16 lg:py-20 relative z-10 px-4">
		<div class="hero-content max-w-5xl mx-auto">
			<!-- Animated Badge -->
			<div class="text-center mb-4 md:mb-8">
				<div
					class="inline-flex items-center gap-2 md:gap-3 px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-primary/20 to-purple/20 border-2 border-primary/40 rounded-full mb-3 md:mb-4 animate-pulse-slow"
				>
					<Sparkles class="w-4 h-4 md:w-5 md:h-5 text-primary" />
					<span class="text-xs md:text-sm font-black text-primary uppercase tracking-wider"
						>The Privacy Revolution</span
					>
					<Sparkles class="w-4 h-4 md:w-5 md:h-5 text-primary" />
				</div>
			</div>

			<!-- Hero Title -->
			<h1
				class="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black text-center mb-4 md:mb-6 leading-tight"
			>
				<span class="text-gradient block mb-1 md:mb-2">The VU Store</span>
				<span
					class="text-text-secondary text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold"
					>Where Privacy Meets Innovation</span
				>
			</h1>

			<!-- Hero Description -->
			<p
				class="text-sm sm:text-base md:text-xl lg:text-2xl text-text-secondary text-center max-w-3xl mx-auto mb-6 md:mb-8 lg:mb-12 leading-relaxed"
			>
				<strong class="text-primary">500+ privacy-first apps</strong> from
				<strong class="text-success">independent developers worldwide</strong>. All at
				<strong class="text-primary">$2.56/month</strong>. Pay with
				<strong class="text-info">crypto</strong>.
				<strong class="text-success">Zero tracking</strong>.
			</p>

			<!-- Hero Stats Grid -->
			<div class="hero-stats grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-6 md:mb-8 lg:mb-12">
				<div
					class="stat-card glass-card p-3 md:p-6 text-center border-2 border-primary/20 hover:border-primary/40 transition-all hover:-translate-y-1"
				>
					<div
						class="stat-icon w-8 h-8 md:w-12 md:h-12 mx-auto mb-1 md:mb-2 flex items-center justify-center"
					>
						<Shield class="w-6 h-6 md:w-10 md:h-10 text-primary" />
					</div>
					<div class="text-2xl md:text-4xl font-black text-primary mb-0.5 md:mb-1">500+</div>
					<div class="text-[10px] md:text-xs text-text-secondary uppercase tracking-wide">
						Privacy Apps
					</div>
				</div>
				<div
					class="stat-card glass-card p-3 md:p-6 text-center border-2 border-success/20 hover:border-success/40 transition-all hover:-translate-y-1"
				>
					<div
						class="stat-icon w-8 h-8 md:w-12 md:h-12 mx-auto mb-1 md:mb-2 flex items-center justify-center"
					>
						<DollarSign class="w-6 h-6 md:w-10 md:h-10 text-success" />
					</div>
					<div class="text-2xl md:text-4xl font-black text-success mb-0.5 md:mb-1">$2.56</div>
					<div class="text-[10px] md:text-xs text-text-secondary uppercase tracking-wide">
						Per App/Month
					</div>
				</div>
				<div
					class="stat-card glass-card p-3 md:p-6 text-center border-2 border-info/20 hover:border-info/40 transition-all hover:-translate-y-1"
				>
					<div
						class="stat-icon w-8 h-8 md:w-12 md:h-12 mx-auto mb-1 md:mb-2 flex items-center justify-center"
					>
						<Rocket class="w-6 h-6 md:w-10 md:h-10 text-info" />
					</div>
					<div class="text-2xl md:text-4xl font-black text-info mb-0.5 md:mb-1">1.2M</div>
					<div class="text-[10px] md:text-xs text-text-secondary uppercase tracking-wide">
						Total Downloads
					</div>
				</div>
				<div
					class="stat-card glass-card p-3 md:p-6 text-center border-2 border-warning/20 hover:border-warning/40 transition-all hover:-translate-y-1"
				>
					<div
						class="stat-icon w-8 h-8 md:w-12 md:h-12 mx-auto mb-1 md:mb-2 flex items-center justify-center"
					>
						<Users class="w-6 h-6 md:w-10 md:h-10 text-warning" />
					</div>
					<div class="text-2xl md:text-4xl font-black text-warning mb-0.5 md:mb-1">50K+</div>
					<div class="text-[10px] md:text-xs text-text-secondary uppercase tracking-wide">
						Developers
					</div>
				</div>
			</div>

			<!-- Hero CTAs -->
			<div class="flex justify-center gap-3 md:gap-6 flex-wrap mb-6 md:mb-8 lg:mb-12">
				<a
					href="/apps"
					class="btn btn-primary text-sm md:text-lg px-4 py-3 md:px-10 md:py-5 shadow-lg hover:shadow-xl"
				>
					<Shield class="w-4 h-4 md:w-6 md:h-6" />
					Browse All Apps
					<ArrowRight class="w-4 h-4 md:w-6 md:h-6" />
				</a>
				<a
					href="/developers/contribute"
					class="btn btn-secondary text-sm md:text-lg px-4 py-3 md:px-10 md:py-5"
				>
					<Lightbulb class="w-4 h-4 md:w-6 md:h-6" />
					Submit Your App
				</a>
			</div>

			<!-- Trust Badges -->
			<div
				class="trust-badges flex justify-center gap-4 md:gap-8 flex-wrap text-xs md:text-sm text-text-tertiary"
			>
				<div class="flex items-center gap-2">
					<Lock class="w-4 h-4 text-success" />
					<span>Zero Tracking</span>
				</div>
				<div class="flex items-center gap-2">
					<Shield class="w-4 h-4 text-primary" />
					<span>Crypto Payments Only</span>
				</div>
				<div class="flex items-center gap-2">
					<Users class="w-4 h-4 text-info" />
					<span>Community Driven</span>
				</div>
				<div class="flex items-center gap-2">
					<Globe class="w-4 h-4 text-warning" />
					<span>Open to All Developers</span>
				</div>
			</div>
		</div>
	</section>

	<!-- VuToken Banner -->
	<section class="vutoken-banner container mb-8 md:mb-16 relative z-10 px-4">
		<div class="glass-card p-4 md:p-8 lg:p-12 relative overflow-hidden border-2 border-warning/30">
			<!-- Background Gradient -->
			<div
				class="absolute inset-0 bg-gradient-to-r from-warning/10 via-primary/10 to-success/10 pointer-events-none"
			></div>

			<div class="relative z-10">
				<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
					<!-- VuToken Icon -->
					<div class="text-center lg:text-left">
						<div
							class="inline-flex items-center justify-center w-24 h-24 bg-warning/20 border-4 border-warning rounded-full mb-4"
						>
							<Coins class="w-12 h-12 text-warning" />
						</div>
						<h3 class="text-2xl font-black text-warning uppercase">VuToken</h3>
						<p class="text-sm text-text-secondary">Privacy Rewards Token</p>
					</div>

					<!-- VuToken Info -->
					<div class="lg:col-span-2">
						<div class="mb-6">
							<div
								class="inline-flex items-center gap-2 px-4 py-2 bg-warning/20 border border-warning/40 rounded-full mb-3"
							>
								<Sparkles class="w-4 h-4 text-warning" />
								<span class="text-xs font-bold text-warning uppercase tracking-wide"
									>Coming Q1 2026</span
								>
							</div>
							<h2 class="text-3xl md:text-4xl font-black mb-4">
								Earn VuTokens for Supporting Privacy
							</h2>
							<p class="text-lg text-text-secondary leading-relaxed mb-4">
								The first privacy-focused rewards token. Earn VuTokens by:
							</p>
							<ul class="text-text-secondary space-y-2 mb-6">
								<li class="flex items-center gap-3">
									<span class="w-2 h-2 bg-success rounded-full"></span>
									<span>Using VU Suite apps (more privacy = more tokens)</span>
								</li>
								<li class="flex items-center gap-3">
									<span class="w-2 h-2 bg-primary rounded-full"></span>
									<span>Developing privacy-first apps</span>
								</li>
								<li class="flex items-center gap-3">
									<span class="w-2 h-2 bg-warning rounded-full"></span>
									<span>Contributing to open source privacy tools</span>
								</li>
								<li class="flex items-center gap-3">
									<span class="w-2 h-2 bg-info rounded-full"></span>
									<span>Reporting security vulnerabilities</span>
								</li>
							</ul>
							<p class="text-sm text-text-tertiary italic flex items-start gap-2">
								<Lightbulb class="w-4 h-4 flex-shrink-0 mt-0.5" /> VuToken: Privacy-preserving blockchain
								rewards. Trade tokens for subscriptions, discounts, or cash out anonymously.
							</p>
						</div>

						<a
							href="/vutoken"
							class="btn bg-warning text-background hover:bg-warning/80 inline-flex items-center gap-2 font-bold"
						>
							<Coins class="w-5 h-5" />
							Learn About VuToken
							<ArrowRight class="w-5 h-5" />
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Most Downloaded This Week -->
	<section class="trending-section container mb-16 relative z-10">
		<div class="section-header flex items-center justify-between mb-8">
			<div>
				<h2 class="text-3xl font-bold mb-2 flex items-center gap-2">
					<Flame class="w-8 h-8 text-warning" /> Trending This Week
				</h2>
				<p class="text-text-secondary">Most downloaded privacy apps in the last 7 days</p>
			</div>
			<a href="/apps" class="text-primary font-semibold hover:underline">View All →</a>
		</div>

		<div class="trending-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each trendingApps as app, index}
				<a
					href="/apps/{app.id}"
					class="trending-card glass-card p-6 hover:border-primary/30 transition-all relative"
				>
					<!-- Rank Badge -->
					<div
						class="rank-badge absolute top-4 left-4 w-10 h-10 bg-primary/20 border-2 border-primary rounded-full flex items-center justify-center font-black text-primary"
					>
						#{index + 1}
					</div>

					<div class="flex items-start gap-4 mt-8">
						<div
							class="app-icon w-16 h-16 rounded-2xl flex items-center justify-center"
							style="background: {app.color}20;"
						>
							<svelte:component
								this={app.iconComponent}
								class="w-8 h-8"
								style="color: {app.color};"
							/>
						</div>
						<div class="flex-1">
							<div class="flex items-center gap-2 mb-1">
								<h3 class="text-xl font-bold">{app.name}</h3>
								<span class="text-xs text-primary font-mono">{app.developer}</span>
							</div>
							<p class="text-sm text-text-secondary mb-3">{app.tagline}</p>

							<div class="stats flex items-center gap-4 text-xs text-text-tertiary mb-3">
								<span class="flex items-center gap-1">
									<Download class="w-3 h-3" />
									{app.weeklyDownloads.toLocaleString()}
								</span>
								<span class="flex items-center gap-1">
									<TrendingUp class="w-3 h-3 text-success" />
									{app.trend}
								</span>
								<span class="px-2 py-1 bg-info/20 text-info rounded text-xs font-bold">
									Level {app.privacyLevel}
								</span>
								<span class="flex items-center gap-1">
									<Star class="w-3 h-3 fill-primary text-primary" />
									{app.rating}
								</span>
							</div>

							<div class="flex items-center justify-between">
								<span class="text-lg font-bold text-primary">${app.pricing.monthly}/mo</span>
								<span class="text-xs text-text-tertiary"
									>{app.reviews.toLocaleString()} reviews</span
								>
							</div>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</section>

	<!-- Top Rated Apps -->
	<section class="top-rated-section container mb-16 relative z-10">
		<div class="section-header flex items-center justify-between mb-8">
			<div>
				<h2 class="text-3xl font-bold mb-2 flex items-center gap-2">
					<Star class="w-8 h-8 text-primary fill-primary" /> Top Rated Apps
				</h2>
				<p class="text-text-secondary">Highest rated by our privacy-conscious community</p>
			</div>
		</div>

		<div class="top-rated-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each topRatedApps as app}
				<a
					href="/apps/{app.id}"
					class="top-rated-card glass-card p-6 hover:border-primary/30 transition-all"
				>
					<div class="flex items-center gap-4 mb-4">
						<div
							class="app-icon w-14 h-14 rounded-xl flex items-center justify-center"
							style="background: {app.color}20;"
						>
							<svelte:component
								this={app.iconComponent}
								class="w-7 h-7"
								style="color: {app.color};"
							/>
						</div>
						<div class="flex-1">
							<h3 class="font-bold mb-1">{app.name}</h3>
							<p class="text-xs text-primary font-mono mb-1">{app.developer}</p>
							<div class="flex items-center gap-2">
								<div class="flex items-center gap-1">
									{#each Array(5) as _, i}
										<Star
											class="w-4 h-4 {i < Math.floor(app.rating)
												? 'fill-primary text-primary'
												: 'text-text-tertiary'}"
										/>
									{/each}
								</div>
								<span class="text-sm font-bold text-primary">{app.rating}</span>
								<span class="text-xs text-text-tertiary">({app.reviews.toLocaleString()})</span>
							</div>
						</div>
					</div>
					<p class="text-sm text-text-secondary mb-4">{app.description}</p>
					<div class="flex items-center justify-between">
						<span class="text-base font-bold text-primary">${app.pricing.monthly}/mo</span>
						<span class="px-2 py-1 bg-success/20 text-success rounded text-xs font-bold">
							Level {app.privacyLevel}
						</span>
					</div>
				</a>
			{/each}
		</div>
	</section>

	<!-- New Releases -->
	<section class="new-releases container mb-16 relative z-10">
		<div class="section-header mb-8">
			<h2 class="text-3xl font-bold mb-2 flex items-center gap-2">
				<PlusCircle class="w-8 h-8 text-success" /> New Releases
			</h2>
			<p class="text-text-secondary">Latest additions to the VU Suite</p>
		</div>

		<div class="new-releases-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			{#each newReleases as app}
				<a
					href="/apps/{app.id}"
					class="new-release-card glass-card p-6 hover:border-primary/30 transition-all text-center"
				>
					<div
						class="app-icon w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
						style="background: {app.color}20;"
					>
						<svelte:component
							this={app.iconComponent}
							class="w-10 h-10"
							style="color: {app.color};"
						/>
					</div>
					<h3 class="font-bold mb-2">{app.name}</h3>
					<p class="text-xs text-text-secondary mb-3 line-clamp-2">{app.tagline}</p>
					<div class="flex items-center justify-center gap-2 mb-3">
						<Star class="w-4 h-4 fill-primary text-primary" />
						<span class="text-sm font-bold">{app.rating}</span>
					</div>
					<span class="text-lg font-bold text-primary">${app.pricing.monthly}/mo</span>
				</a>
			{/each}
		</div>
	</section>

	<!-- Community Bounties -->
	<section class="bounties-section container mb-16 relative z-10">
		<div class="glass-card p-12">
			<div class="text-center mb-12">
				<div
					class="inline-flex items-center gap-2 px-4 py-2 bg-success/20 border border-success/40 rounded-full mb-4"
				>
					<Trophy class="w-4 h-4 text-success" />
					<span class="text-xs font-bold text-success uppercase tracking-wide"
						>Community Bounties</span
					>
				</div>
				<h2 class="text-3xl md:text-4xl font-bold mb-4">Build Apps, Earn Rewards</h2>
				<p class="text-lg text-text-secondary max-w-2xl mx-auto">
					Have an idea for a privacy-first app? Build it and earn rewards. The VU community funds
					development of privacy-focused applications.
				</p>
			</div>

			<div class="bounties-grid grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
				{#each bounties as bounty}
					<div
						class="bounty-card glass-card p-6 border-l-4 {bounty.status === 'open'
							? 'border-success'
							: 'border-warning'}"
					>
						<div class="flex items-start justify-between mb-4">
							<div class="bounty-reward text-2xl font-black text-primary">
								{bounty.reward}
							</div>
							<span
								class="px-3 py-1 {bounty.status === 'open'
									? 'bg-success/20 text-success'
									: 'bg-warning/20 text-warning'} rounded-full text-xs font-bold uppercase"
							>
								{bounty.status === 'open' ? 'Open' : 'In Progress'}
							</span>
						</div>

						<h3 class="font-bold text-lg mb-2">{bounty.title}</h3>
						<p class="text-sm text-text-secondary mb-4 leading-relaxed">{bounty.description}</p>

						<div class="flex items-center justify-between text-xs text-text-tertiary">
							<span class="flex items-center gap-1">
								<Users class="w-4 h-4" />
								{bounty.submissions} submissions
							</span>
							<button class="text-primary font-semibold hover:underline">View Details →</button>
						</div>
					</div>
				{/each}
			</div>

			<div class="text-center">
				<a href="/developers/contribute" class="btn btn-primary inline-flex items-center gap-2">
					<Lightbulb class="w-5 h-5" />
					Submit Your Idea
					<ArrowRight class="w-5 h-5" />
				</a>
			</div>
		</div>
	</section>

	<!-- Ideas Submission CTA -->
	<section class="ideas-section container mb-16 relative z-10">
		<div class="glass-card p-8 md:p-12 text-center border-2 border-primary/30">
			<h2 class="text-2xl md:text-3xl font-bold mb-4">Have an App Idea?</h2>
			<p class="text-lg text-text-secondary max-w-2xl mx-auto mb-6">
				The VU community decides what gets built next. Submit your privacy-first app idea, vote on
				others, and help shape the future of private computing.
			</p>
			<div class="flex justify-center gap-4 flex-wrap">
				<a href="/developers/contribute" class="btn btn-primary">
					<Lightbulb class="w-5 h-5" />
					Submit App Idea
				</a>
				<a href="/developers" class="btn btn-secondary"> Browse Submitted Ideas </a>
			</div>
		</div>
	</section>

	<!-- Community Channels -->
	<section class="community-section container mb-16 relative z-10">
		<div class="text-center mb-12">
			<div
				class="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/40 rounded-full mb-4"
			>
				<Users class="w-4 h-4 text-primary" />
				<span class="text-xs font-bold text-primary uppercase tracking-wide">Join The Movement</span
				>
			</div>
			<h2 class="text-3xl md:text-4xl font-bold mb-4">Community Channels</h2>
			<p class="text-lg text-text-secondary max-w-2xl mx-auto">
				Connect with privacy advocates, developers, and VU enthusiasts worldwide. All channels
				respect your privacy - no tracking, no data mining.
			</p>
		</div>

		<div class="channels-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			{#each channels as channel}
				<a
					href={channel.url}
					target="_blank"
					rel="noopener noreferrer"
					class="channel-card glass-card p-6 hover:border-primary/30 transition-all text-center"
				>
					<div
						class="channel-icon w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4"
					>
						<svelte:component this={channel.icon} class="w-8 h-8 text-primary" />
					</div>
					<h3 class="font-bold text-lg mb-1">{channel.name}</h3>
					<p class="text-xs text-text-secondary mb-3">{channel.description}</p>
					<div class="text-primary font-bold">{channel.members} members</div>
				</a>
			{/each}
		</div>
	</section>

	<!-- All Apps CTA -->
	<section class="all-apps-cta container mb-16 relative z-10">
		<div class="glass-card p-12 text-center">
			<h2 class="text-3xl font-bold mb-4">Ready to Explore All 31 Apps?</h2>
			<p class="text-lg text-text-secondary mb-8">
				Browse the complete VU Suite. Every app built with privacy as the foundation.
			</p>
			<a href="/apps" class="btn btn-primary text-lg px-8 py-4">
				<Shield class="w-5 h-5" />
				Browse All Apps
			</a>
		</div>
	</section>

	<!-- Developer CTA -->
	<section class="developer-cta container mb-16 relative z-10">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div class="glass-card p-8">
				<DollarSign class="w-12 h-12 text-success mb-4" />
				<h3 class="text-2xl font-bold mb-3">Earn from Bounties</h3>
				<p class="text-text-secondary mb-6">
					Build privacy-first apps and earn up to $5,000 per bounty. Open to all developers
					worldwide.
				</p>
				<a
					href="/developers/contribute"
					class="text-primary font-semibold hover:underline flex items-center gap-2"
				>
					View All Bounties
					<ArrowRight class="w-4 h-4" />
				</a>
			</div>

			<div class="glass-card p-8">
				<Lightbulb class="w-12 h-12 text-primary mb-4" />
				<h3 class="text-2xl font-bold mb-3">Submit Your Idea</h3>
				<p class="text-text-secondary mb-6">
					Got a privacy app concept? Share it with the community. Top-voted ideas get funded and
					built.
				</p>
				<a
					href="/developers/contribute"
					class="text-primary font-semibold hover:underline flex items-center gap-2"
				>
					Submit Idea
					<ArrowRight class="w-4 h-4" />
				</a>
			</div>
		</div>
	</section>
</div>

<style>
	.trending-card {
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.trending-card:hover {
		transform: translateY(-4px);
	}

	.rank-badge {
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.05);
		}
	}

	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* Brutalist theme overrides */
	:global(body.theme-brutalist) .rank-badge {
		animation: none;
		border-radius: 0px;
		border: 3px solid #000000;
		background: #ffff00;
		color: #000000;
	}

	:global(body.theme-brutalist) .bounty-card {
		border-left-width: 6px;
		border-radius: 0px;
	}

	:global(body.theme-brutalist) .channel-icon {
		border-radius: 0px;
		border: 3px solid #000000;
	}
</style>
