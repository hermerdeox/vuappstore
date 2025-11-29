<script lang="ts">
	import {
		Shield,
		Eye,
		Lock,
		Smartphone,
		Globe,
		AlertTriangle,
		CheckCircle,
		ExternalLink
	} from 'lucide-svelte';

	const privacyLevels = [
		{
			level: 1,
			name: 'Basic Privacy',
			color: 'error',
			description: 'Minimal privacy protection with basic security measures',
			features: ['Basic encryption', 'Standard privacy policy', 'Some data collection'],
			examples: ['Most mainstream apps', 'Social media platforms', 'Free email services']
		},
		{
			level: 2,
			name: 'Enhanced Privacy',
			color: 'warning',
			description: 'Improved privacy with reduced data collection',
			features: ['Better encryption', 'Limited data collection', 'Opt-out options'],
			examples: ['Privacy-focused browsers', 'Secure messaging apps', 'VPN services']
		},
		{
			level: 3,
			name: 'Strong Privacy',
			color: 'primary',
			description: 'Comprehensive privacy protection with minimal data collection',
			features: ['End-to-end encryption', 'Minimal data collection', 'Open source code'],
			examples: ['Signal', 'ProtonMail', 'Tor Browser']
		},
		{
			level: 4,
			name: 'Maximum Privacy',
			color: 'success',
			description: 'Near-zero data collection with advanced privacy features',
			features: ['Zero-knowledge architecture', 'Local processing', 'Anonymous usage'],
			examples: ['VU Suite apps', 'Privacy-first tools', 'Offline-first applications']
		},
		{
			level: 5,
			name: 'Zero-Knowledge',
			color: 'primary',
			description: 'Complete privacy with zero server-side data access',
			features: ['Zero-knowledge encryption', 'Client-side processing', 'No data collection'],
			examples: ['VuVault', 'VuNotes', 'VuWallet']
		}
	];

	const threats = [
		{
			icon: Eye,
			title: 'Data Collection & Tracking',
			description: 'Companies collecting personal data for advertising and profiling',
			protection: "Use privacy-focused apps that don't collect unnecessary data"
		},
		{
			icon: Globe,
			title: 'Government Surveillance',
			description: 'Mass surveillance programs monitoring digital communications',
			protection: 'Use end-to-end encrypted communication and VPN services'
		},
		{
			icon: AlertTriangle,
			title: 'Data Breaches',
			description: 'Hackers gaining access to databases containing personal information',
			protection: 'Choose services with strong security and minimal data storage'
		},
		{
			icon: Smartphone,
			title: 'Device Tracking',
			description: 'Apps and websites tracking your location and device usage',
			protection: 'Review app permissions and use privacy-focused alternatives'
		}
	];

	const tips = [
		{
			category: 'Passwords & Authentication',
			items: [
				'Use a unique, strong password for every account',
				'Enable two-factor authentication wherever possible',
				'Use a privacy-focused password manager like VuPass',
				'Avoid using personal information in passwords'
			]
		},
		{
			category: 'Communication',
			items: [
				'Use end-to-end encrypted messaging apps',
				'Avoid sharing sensitive information over unencrypted channels',
				'Be cautious about what you share on social media',
				'Use secure email providers like ProtonMail or VuMail'
			]
		},
		{
			category: 'Web Browsing',
			items: [
				'Use privacy-focused browsers like VuBrowser or Firefox',
				'Install ad blockers and tracker blockers',
				'Browse with VPN when on public Wi-Fi',
				'Clear cookies and browsing data regularly'
			]
		},
		{
			category: 'Mobile Privacy',
			items: [
				'Review and limit app permissions',
				'Turn off location tracking when not needed',
				'Use privacy-focused alternatives to mainstream apps',
				'Keep your device software updated'
			]
		}
	];
</script>

<svelte:head>
	<title>Privacy Guide - VuAppStore Resources</title>
	<meta
		name="description"
		content="Complete guide to digital privacy. Learn about privacy levels, threats, and how to protect your data with privacy-first applications."
	/>
</svelte:head>

<div class="container py-16">
	<div class="max-w-6xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-16">
			<div
				class="inline-flex items-center gap-2 px-4 py-2 bg-success/10 border border-success/30 rounded-full mb-6"
			>
				<Shield class="w-4 h-4 text-success" />
				<span class="text-xs font-semibold text-success uppercase tracking-wide">Privacy Guide</span
				>
			</div>
			<h1 class="text-4xl md:text-6xl font-black leading-tight mb-6 text-gradient">
				Your Complete Guide<br />to Digital Privacy
			</h1>
			<p class="text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
				Learn how to protect your personal data, understand privacy threats, and choose
				privacy-first applications that respect your digital rights.
			</p>
		</div>

		<!-- Privacy Levels -->
		<div class="mb-20">
			<h2 class="text-3xl font-bold text-center mb-12">Understanding Privacy Levels</h2>
			<div class="space-y-6">
				{#each privacyLevels as level}
					<div class="glass-card p-8">
						<div class="flex items-start gap-6">
							<div
								class="w-16 h-16 bg-{level.color}/10 rounded-full flex items-center justify-center flex-shrink-0"
							>
								<span class="text-2xl font-bold text-{level.color}">{level.level}</span>
							</div>
							<div class="flex-1">
								<h3 class="text-2xl font-bold mb-2 text-{level.color}">{level.name}</h3>
								<p class="text-text-secondary mb-4">{level.description}</p>
								<div class="grid md:grid-cols-2 gap-6">
									<div>
										<h4 class="font-semibold mb-3">Features:</h4>
										<ul class="space-y-1">
											{#each level.features as feature}
												<li class="flex items-center gap-2 text-sm text-text-secondary">
													<CheckCircle class="w-4 h-4 text-{level.color}" />
													{feature}
												</li>
											{/each}
										</ul>
									</div>
									<div>
										<h4 class="font-semibold mb-3">Examples:</h4>
										<ul class="space-y-1">
											{#each level.examples as example}
												<li class="text-sm text-text-secondary">• {example}</li>
											{/each}
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Privacy Threats -->
		<div class="mb-20">
			<h2 class="text-3xl font-bold text-center mb-12">Common Privacy Threats</h2>
			<div class="grid md:grid-cols-2 gap-8">
				{#each threats as threat}
					<div class="glass-card p-8">
						<div class="flex items-center gap-4 mb-6">
							<div class="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center">
								<svelte:component this={threat.icon} class="w-6 h-6 text-error" />
							</div>
							<h3 class="text-xl font-bold">{threat.title}</h3>
						</div>
						<p class="text-text-secondary mb-4">{threat.description}</p>
						<div class="p-4 bg-success/10 border border-success/30 rounded-lg">
							<p class="text-sm text-success">
								<strong>Protection:</strong>
								{threat.protection}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Privacy Tips -->
		<div class="mb-16">
			<h2 class="text-3xl font-bold text-center mb-12">Essential Privacy Tips</h2>
			<div class="grid md:grid-cols-2 gap-8">
				{#each tips as category}
					<div class="glass-card p-8">
						<h3 class="text-xl font-bold mb-6">{category.category}</h3>
						<ul class="space-y-3">
							{#each category.items as tip}
								<li class="flex items-start gap-3">
									<div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
									<span class="text-text-secondary text-sm">{tip}</span>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>

		<!-- VU Suite Advantage -->
		<div class="glass-card p-8 md:p-12 mb-16">
			<div class="text-center mb-8">
				<div
					class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
				>
					<Lock class="w-8 h-8 text-primary" />
				</div>
				<h2 class="text-3xl font-bold mb-4">The VU Suite Advantage</h2>
				<p class="text-text-secondary max-w-2xl mx-auto">
					All VU Suite applications are built with Level 5 Zero-Knowledge privacy, ensuring maximum
					protection for your personal data.
				</p>
			</div>

			<div class="grid md:grid-cols-3 gap-6">
				<div class="text-center">
					<div
						class="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4"
					>
						<Shield class="w-6 h-6 text-success" />
					</div>
					<h3 class="font-bold mb-2">Zero Data Collection</h3>
					<p class="text-text-secondary text-sm">
						We don't collect, store, or analyze your personal data
					</p>
				</div>
				<div class="text-center">
					<div
						class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
					>
						<Lock class="w-6 h-6 text-primary" />
					</div>
					<h3 class="font-bold mb-2">End-to-End Encryption</h3>
					<p class="text-text-secondary text-sm">All data encrypted before leaving your device</p>
				</div>
				<div class="text-center">
					<div
						class="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4"
					>
						<Eye class="w-6 h-6 text-warning" />
					</div>
					<h3 class="font-bold mb-2">Open Source</h3>
					<p class="text-text-secondary text-sm">Transparent code that can be audited by anyone</p>
				</div>
			</div>
		</div>

		<!-- Call to Action -->
		<div class="text-center">
			<h2 class="text-3xl font-bold mb-6">Start Your Privacy Journey</h2>
			<p class="text-text-secondary mb-8 max-w-2xl mx-auto">
				Take control of your digital privacy today. Explore privacy-first applications that put your
				rights and security first.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a href="/apps" class="btn btn-primary">
					<Shield class="w-4 h-4" />
					Explore VU Apps
				</a>
				<a href="/resources/comparison" class="btn btn-secondary"> VU vs Big Tech </a>
				<a href="/resources/security-best-practices" class="btn btn-secondary"> Security Guide </a>
			</div>
		</div>
	</div>
</div>
