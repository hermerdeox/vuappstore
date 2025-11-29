<script lang="ts">
	import {
		Shield,
		Eye,
		DollarSign,
		Users,
		Lock,
		AlertTriangle,
		CheckCircle,
		X
	} from 'lucide-svelte';

	const comparisons = [
		{
			category: 'Data Collection',
			vuApps: {
				score: 5,
				description: 'Zero data collection',
				details: 'VU apps collect no personal data. Everything stays on your device.',
				icon: CheckCircle,
				color: 'success'
			},
			bigTech: {
				score: 1,
				description: 'Extensive data collection',
				details:
					'Collects personal data, browsing habits, location, contacts, and more for advertising.',
				icon: X,
				color: 'error'
			}
		},
		{
			category: 'Encryption',
			vuApps: {
				score: 5,
				description: 'End-to-end encryption',
				details: 'Military-grade encryption with zero-knowledge architecture.',
				icon: CheckCircle,
				color: 'success'
			},
			bigTech: {
				score: 2,
				description: 'Basic encryption',
				details: 'Data encrypted in transit but accessible to the company.',
				icon: AlertTriangle,
				color: 'warning'
			}
		},
		{
			category: 'Business Model',
			vuApps: {
				score: 5,
				description: 'Subscription-based',
				details: 'Transparent pricing. You pay for the service, not with your data.',
				icon: CheckCircle,
				color: 'success'
			},
			bigTech: {
				score: 1,
				description: 'Advertising-based',
				details: 'Free services funded by selling your personal data to advertisers.',
				icon: X,
				color: 'error'
			}
		},
		{
			category: 'Transparency',
			vuApps: {
				score: 5,
				description: 'Open source',
				details: 'Code is open source and auditable by security researchers.',
				icon: CheckCircle,
				color: 'success'
			},
			bigTech: {
				score: 2,
				description: 'Closed source',
				details: 'Proprietary code with limited transparency about data practices.',
				icon: AlertTriangle,
				color: 'warning'
			}
		},
		{
			category: 'User Control',
			vuApps: {
				score: 5,
				description: 'Complete control',
				details: 'Users have full control over their data and privacy settings.',
				icon: CheckCircle,
				color: 'success'
			},
			bigTech: {
				score: 2,
				description: 'Limited control',
				details: 'Complex privacy settings with data collection continuing regardless.',
				icon: AlertTriangle,
				color: 'warning'
			}
		},
		{
			category: 'Data Sharing',
			vuApps: {
				score: 5,
				description: 'No data sharing',
				details: 'Zero data sharing with third parties or advertisers.',
				icon: CheckCircle,
				color: 'success'
			},
			bigTech: {
				score: 1,
				description: 'Extensive sharing',
				details: 'Data shared with hundreds of advertising partners and data brokers.',
				icon: X,
				color: 'error'
			}
		}
	];

	const bigTechCompanies = [
		{
			name: 'Google',
			issues: [
				'Tracks users across 2+ billion websites',
				'Collects location data even when disabled',
				'Scans Gmail content for advertising',
				'Stores voice recordings from Assistant'
			],
			vuAlternative: 'VuSearch, VuMail, VuAssistant'
		},
		{
			name: 'Facebook/Meta',
			issues: [
				'Tracks non-users with shadow profiles',
				'Collects data from third-party apps',
				'Facial recognition without consent',
				'Psychological manipulation experiments'
			],
			vuAlternative: 'VuSocial, VuChat, VuMeet'
		},
		{
			name: 'Apple',
			issues: [
				'App Store monopoly and censorship',
				'Scans photos on device for content',
				'Shares data with Chinese government',
				'Expensive privacy as a luxury'
			],
			vuAlternative: 'VuStore, VuPhoto, VuCloud'
		},
		{
			name: 'Amazon',
			issues: [
				'Alexa recordings shared with employees',
				'Ring doorbell data shared with police',
				'Marketplace surveillance of sellers',
				'AWS hosts government surveillance'
			],
			vuAlternative: 'VuAssistant, VuSecurity, VuMarket'
		}
	];

	const migrationBenefits = [
		{
			icon: Shield,
			title: 'Reclaim Your Privacy',
			description: 'Stop being the product. Your data stays private and secure.'
		},
		{
			icon: DollarSign,
			title: 'Transparent Pricing',
			description: "Know exactly what you're paying for. No hidden costs or data harvesting."
		},
		{
			icon: Lock,
			title: 'Enhanced Security',
			description: 'Military-grade encryption protects you from data breaches and hackers.'
		},
		{
			icon: Users,
			title: 'Support Privacy Movement',
			description: 'Join millions fighting for digital rights and privacy-first technology.'
		}
	];
</script>

<svelte:head>
	<title>VU vs Big Tech - Privacy Comparison | VuAppStore</title>
	<meta
		name="description"
		content="Compare VU Suite privacy-first apps with Big Tech alternatives. See why VuAppStore offers superior privacy, security, and user control."
	/>
</svelte:head>

<div class="container py-16">
	<div class="max-w-6xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-16">
			<div
				class="inline-flex items-center gap-2 px-4 py-2 bg-error/10 border border-error/30 rounded-full mb-6"
			>
				<AlertTriangle class="w-4 h-4 text-error" />
				<span class="text-xs font-semibold text-error uppercase tracking-wide"
					>Privacy Comparison</span
				>
			</div>
			<h1 class="text-4xl md:text-6xl font-black leading-tight mb-6 text-gradient">
				VU Suite vs<br />Big Tech Giants
			</h1>
			<p class="text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
				See the stark difference between privacy-first VU applications and Big Tech alternatives.
				Discover why millions are making the switch to protect their digital rights.
			</p>
		</div>

		<!-- Comparison Table -->
		<div class="mb-20">
			<h2 class="text-3xl font-bold text-center mb-12">Side-by-Side Comparison</h2>
			<div class="space-y-8">
				{#each comparisons as comparison}
					<div class="glass-card p-8">
						<h3 class="text-2xl font-bold text-center mb-8">{comparison.category}</h3>
						<div class="grid md:grid-cols-2 gap-8">
							<!-- VU Apps -->
							<div class="text-center">
								<div
									class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
								>
									<span class="text-2xl font-bold text-primary">VU</span>
								</div>
								<h4 class="text-xl font-bold mb-2 text-{comparison.vuApps.color}">
									{comparison.vuApps.description}
								</h4>
								<div class="flex justify-center mb-4">
									{#each Array(comparison.vuApps.score) as _}
										<div class="w-4 h-4 bg-{comparison.vuApps.color} rounded-full mx-1"></div>
									{/each}
								</div>
								<p class="text-text-secondary text-sm">{comparison.vuApps.details}</p>
							</div>

							<!-- Big Tech -->
							<div class="text-center">
								<div
									class="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4"
								>
									<Eye class="w-8 h-8 text-error" />
								</div>
								<h4 class="text-xl font-bold mb-2 text-{comparison.bigTech.color}">
									{comparison.bigTech.description}
								</h4>
								<div class="flex justify-center mb-4">
									{#each Array(comparison.bigTech.score) as _}
										<div class="w-4 h-4 bg-{comparison.bigTech.color} rounded-full mx-1"></div>
									{/each}
									{#each Array(5 - comparison.bigTech.score) as _}
										<div class="w-4 h-4 bg-gray-600 rounded-full mx-1"></div>
									{/each}
								</div>
								<p class="text-text-secondary text-sm">{comparison.bigTech.details}</p>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Big Tech Issues -->
		<div class="mb-20">
			<h2 class="text-3xl font-bold text-center mb-12">Big Tech Privacy Issues</h2>
			<div class="grid md:grid-cols-2 gap-8">
				{#each bigTechCompanies as company}
					<div class="glass-card p-8">
						<h3 class="text-xl font-bold mb-6 text-error">{company.name}</h3>
						<ul class="space-y-3 mb-6">
							{#each company.issues as issue}
								<li class="flex items-start gap-3">
									<X class="w-5 h-5 text-error mt-0.5 flex-shrink-0" />
									<span class="text-text-secondary text-sm">{issue}</span>
								</li>
							{/each}
						</ul>
						<div class="p-4 bg-success/10 border border-success/30 rounded-lg">
							<p class="text-sm">
								<strong class="text-success">VU Alternative:</strong>
								<span class="text-text-secondary">{company.vuAlternative}</span>
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Migration Benefits -->
		<div class="mb-16">
			<h2 class="text-3xl font-bold text-center mb-12">Why Make the Switch?</h2>
			<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
				{#each migrationBenefits as benefit}
					<div class="glass-card p-6 text-center">
						<div
							class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
						>
							<svelte:component this={benefit.icon} class="w-6 h-6 text-primary" />
						</div>
						<h3 class="text-lg font-bold mb-3">{benefit.title}</h3>
						<p class="text-text-secondary text-sm">{benefit.description}</p>
					</div>
				{/each}
			</div>
		</div>

		<!-- Real-World Impact -->
		<div class="glass-card p-8 md:p-12 mb-16">
			<div class="text-center mb-8">
				<h2 class="text-3xl font-bold mb-4">The Real-World Impact</h2>
				<p class="text-text-secondary max-w-2xl mx-auto">
					When you choose VU Suite over Big Tech alternatives, you're not just protecting yourself—
					you're supporting a movement toward a more private, secure internet for everyone.
				</p>
			</div>

			<div class="grid md:grid-cols-3 gap-8">
				<div class="text-center">
					<div class="text-3xl font-bold text-primary mb-2">$0</div>
					<div class="text-sm text-text-secondary">Revenue from your personal data</div>
				</div>
				<div class="text-center">
					<div class="text-3xl font-bold text-success mb-2">100%</div>
					<div class="text-sm text-text-secondary">Of your data stays private</div>
				</div>
				<div class="text-center">
					<div class="text-3xl font-bold text-warning mb-2">0</div>
					<div class="text-sm text-text-secondary">Third-party data sharing</div>
				</div>
			</div>
		</div>

		<!-- Call to Action -->
		<div class="text-center">
			<h2 class="text-3xl font-bold mb-6">Ready to Take Control?</h2>
			<p class="text-text-secondary mb-8 max-w-2xl mx-auto">
				Join millions who have already made the switch to privacy-first technology. Start your
				journey toward digital sovereignty today.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a href="/apps" class="btn btn-primary">
					<Shield class="w-4 h-4" />
					Explore VU Apps
				</a>
				<a href="/resources/migration" class="btn btn-secondary"> Migration Guide </a>
				<a href="/pricing" class="btn btn-secondary"> View Pricing </a>
			</div>
		</div>
	</div>
</div>
