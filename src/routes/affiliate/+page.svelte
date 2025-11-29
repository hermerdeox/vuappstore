<script lang="ts">
	import {
		DollarSign,
		Users,
		TrendingUp,
		Gift,
		Star,
		ExternalLink,
		Mail,
		CheckCircle,
		X,
		Check
	} from 'lucide-svelte';

	const commissionTiers = [
		{
			tier: 'Bronze',
			referrals: '1-10',
			commission: '25%',
			color: 'warning',
			perks: ['25% commission on all sales', 'Marketing materials', 'Monthly payouts']
		},
		{
			tier: 'Silver',
			referrals: '11-50',
			commission: '30%',
			color: 'text-secondary',
			perks: [
				'30% commission on all sales',
				'Priority support',
				'Custom referral codes',
				'Bi-weekly payouts'
			]
		},
		{
			tier: 'Gold',
			referrals: '51-100',
			commission: '35%',
			color: 'primary',
			perks: [
				'35% commission on all sales',
				'Dedicated account manager',
				'Early access to new apps',
				'Weekly payouts'
			]
		},
		{
			tier: 'Platinum',
			referrals: '100+',
			commission: '40%',
			color: 'success',
			perks: [
				'40% commission on all sales',
				'Co-marketing opportunities',
				'Beta testing access',
				'Daily payouts'
			]
		}
	];

	const marketingMaterials = [
		{
			type: 'Banners & Graphics',
			items: [
				'Web banners (all sizes)',
				'Social media graphics',
				'Email headers',
				'Mobile app screenshots'
			]
		},
		{
			type: 'Content & Copy',
			items: [
				'Product descriptions',
				'Email templates',
				'Blog post drafts',
				'Social media captions'
			]
		},
		{
			type: 'Videos & Demos',
			items: [
				'App demo videos',
				'Privacy explainer videos',
				'Testimonial videos',
				'Tutorial content'
			]
		},
		{
			type: 'Landing Pages',
			items: [
				'Pre-built landing pages',
				'Conversion-optimized templates',
				'A/B tested designs',
				'Mobile-responsive layouts'
			]
		}
	];

	const earnings = [
		{
			plan: 'Monthly Plan',
			price: '$29.99',
			commission: '$7.50 - $12.00',
			description: 'Per monthly subscription'
		},
		{
			plan: 'Annual Plan',
			price: '$299.99',
			commission: '$75.00 - $120.00',
			description: 'Per annual subscription'
		},
		{
			plan: 'Lifetime Plan',
			price: '$999.99',
			commission: '$250.00 - $400.00',
			description: 'Per lifetime purchase'
		}
	];

	const benefits = [
		{
			icon: DollarSign,
			title: 'High Commissions',
			description: 'Earn 25-40% commission on every sale with our industry-leading rates'
		},
		{
			icon: TrendingUp,
			title: 'Growing Market',
			description: 'Privacy-first apps are the fastest growing segment in tech'
		},
		{
			icon: Users,
			title: 'Loyal Customers',
			description: 'Privacy-conscious users have high lifetime value and low churn'
		},
		{
			icon: Gift,
			title: 'Premium Product',
			description: 'Promote high-quality apps that customers genuinely love'
		}
	];
</script>

<svelte:head>
	<title>Affiliate Program - VuAppStore</title>
	<meta
		name="description"
		content="Join the VuAppStore Affiliate Program. Earn up to 40% commission promoting privacy-first applications. High-converting offers with premium payouts."
	/>
</svelte:head>

<div class="container py-16">
	<div class="max-w-6xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-16">
			<div
				class="inline-flex items-center gap-2 px-4 py-2 bg-success/10 border border-success/30 rounded-full mb-6"
			>
				<DollarSign class="w-4 h-4 text-success" />
				<span class="text-xs font-semibold text-success uppercase tracking-wide"
					>Affiliate Program</span
				>
			</div>
			<h1 class="text-4xl md:text-6xl font-black leading-tight mb-6 text-gradient">
				Earn While You<br />Promote Privacy
			</h1>
			<p class="text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
				Join our affiliate program and earn generous commissions promoting the world's most
				privacy-focused app suite. Help spread digital sovereignty while building your income.
			</p>
		</div>

		<!-- Program Stats -->
		<div class="grid md:grid-cols-4 gap-6 mb-16">
			<div class="glass-card p-6 text-center">
				<div class="text-3xl font-bold text-success mb-2">40%</div>
				<div class="text-sm text-text-secondary">Max Commission Rate</div>
			</div>
			<div class="glass-card p-6 text-center">
				<div class="text-3xl font-bold text-primary mb-2">$400</div>
				<div class="text-sm text-text-secondary">Max Per Sale</div>
			</div>
			<div class="glass-card p-6 text-center">
				<div class="text-3xl font-bold text-warning mb-2">90 days</div>
				<div class="text-sm text-text-secondary">Cookie Duration</div>
			</div>
			<div class="glass-card p-6 text-center">
				<div class="text-3xl font-bold text-error mb-2">24h</div>
				<div class="text-sm text-text-secondary">Approval Time</div>
			</div>
		</div>

		<!-- Commission Tiers -->
		<div class="mb-20">
			<h2 class="text-3xl font-bold text-center mb-12">Commission Tiers</h2>
			<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
				{#each commissionTiers as tier}
					<div class="glass-card p-6 text-center hover:scale-105 transition-transform duration-200">
						<div
							class="w-16 h-16 bg-{tier.color}/10 rounded-full flex items-center justify-center mx-auto mb-4"
						>
							<Star class="w-8 h-8 text-{tier.color}" />
						</div>
						<h3 class="text-xl font-bold mb-2 text-{tier.color}">{tier.tier}</h3>
						<p class="text-text-secondary text-sm mb-4">{tier.referrals} referrals/month</p>
						<div class="text-3xl font-bold text-{tier.color} mb-4">{tier.commission}</div>
						<ul class="space-y-2 text-left">
							{#each tier.perks as perk}
								<li class="flex items-start gap-2 text-sm text-text-secondary">
									<CheckCircle class="w-4 h-4 text-{tier.color} mt-0.5 flex-shrink-0" />
									<span>{perk}</span>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>

		<!-- Earnings Calculator -->
		<div class="mb-20">
			<h2 class="text-3xl font-bold text-center mb-12">Potential Earnings</h2>
			<div class="grid md:grid-cols-3 gap-6">
				{#each earnings as earning}
					<div class="glass-card p-8 text-center">
						<h3 class="text-xl font-bold mb-4">{earning.plan}</h3>
						<div class="text-2xl font-bold text-primary mb-2">{earning.price}</div>
						<div class="text-lg font-semibold text-success mb-4">{earning.commission}</div>
						<p class="text-text-secondary text-sm">{earning.description}</p>
					</div>
				{/each}
			</div>
			<div class="text-center mt-8">
				<p class="text-text-secondary text-sm">
					* Commission rates vary by tier (25-40%). Lifetime subscriptions provide the highest
					per-sale earnings.
				</p>
			</div>
		</div>

		<!-- Why Promote VuAppStore -->
		<div class="mb-20">
			<h2 class="text-3xl font-bold text-center mb-12">Why Promote VuAppStore?</h2>
			<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
				{#each benefits as benefit}
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

		<!-- Marketing Materials -->
		<div class="mb-16">
			<h2 class="text-3xl font-bold text-center mb-12">Marketing Materials</h2>
			<div class="grid md:grid-cols-2 gap-8">
				{#each marketingMaterials as material}
					<div class="glass-card p-6">
						<h3 class="text-xl font-bold mb-4">{material.type}</h3>
						<ul class="space-y-2">
							{#each material.items as item}
								<li class="flex items-center gap-3 text-sm text-text-secondary">
									<CheckCircle class="w-4 h-4 text-success" />
									{item}
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>

		<!-- How It Works -->
		<div class="glass-card p-8 md:p-12 mb-16">
			<h2 class="text-3xl font-bold text-center mb-8">How It Works</h2>
			<div class="grid md:grid-cols-4 gap-6">
				<div class="text-center">
					<div
						class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
					>
						<span class="text-xl font-bold text-primary">1</span>
					</div>
					<h3 class="font-semibold mb-2">Apply</h3>
					<p class="text-text-secondary text-sm">
						Submit your application and get approved within 24 hours
					</p>
				</div>
				<div class="text-center">
					<div
						class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
					>
						<span class="text-xl font-bold text-primary">2</span>
					</div>
					<h3 class="font-semibold mb-2">Promote</h3>
					<p class="text-text-secondary text-sm">
						Share your unique referral links and marketing materials
					</p>
				</div>
				<div class="text-center">
					<div
						class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
					>
						<span class="text-xl font-bold text-primary">3</span>
					</div>
					<h3 class="font-semibold mb-2">Track</h3>
					<p class="text-text-secondary text-sm">
						Monitor your referrals and earnings in real-time
					</p>
				</div>
				<div class="text-center">
					<div
						class="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4"
					>
						<span class="text-xl font-bold text-success">4</span>
					</div>
					<h3 class="font-semibold mb-2">Get Paid</h3>
					<p class="text-text-secondary text-sm">
						Receive your commissions via cryptocurrency (Monero, Lightning, or BTC/ETH)
					</p>
				</div>
			</div>
		</div>

		<!-- Requirements -->
		<div class="mb-16">
			<h2 class="text-3xl font-bold text-center mb-8">Requirements</h2>
			<div class="grid md:grid-cols-2 gap-8">
				<div class="glass-card p-6">
					<h3 class="text-xl font-bold mb-4 text-success flex items-center gap-2">
						<Check class="w-5 h-5" /> We Welcome
					</h3>
					<ul class="space-y-2">
						<li class="text-sm text-text-secondary">• Privacy and security bloggers</li>
						<li class="text-sm text-text-secondary">• Tech reviewers and YouTubers</li>
						<li class="text-sm text-text-secondary">• Social media influencers</li>
						<li class="text-sm text-text-secondary">• Email newsletter publishers</li>
						<li class="text-sm text-text-secondary">• Podcast hosts</li>
						<li class="text-sm text-text-secondary">• Digital privacy advocates</li>
					</ul>
				</div>
				<div class="glass-card p-6">
					<h3 class="text-xl font-bold mb-4 text-error flex items-center gap-2">
						<X class="w-5 h-5" /> Not Allowed
					</h3>
					<ul class="space-y-2">
						<li class="text-sm text-text-secondary">• Spam or unsolicited emails</li>
						<li class="text-sm text-text-secondary">• Paid search on brand terms</li>
						<li class="text-sm text-text-secondary">• Adult or illegal content</li>
						<li class="text-sm text-text-secondary">• Misleading claims</li>
						<li class="text-sm text-text-secondary">• Cookie stuffing</li>
						<li class="text-sm text-text-secondary">• Trademark bidding</li>
					</ul>
				</div>
			</div>
		</div>

		<!-- Call to Action -->
		<div class="text-center">
			<h2 class="text-3xl font-bold mb-6">Ready to Start Earning?</h2>
			<p class="text-text-secondary mb-8 max-w-2xl mx-auto">
				Join thousands of affiliates who are earning substantial commissions while promoting the
				future of privacy-first technology. Apply today and start earning tomorrow.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a href="/support/contact" class="btn btn-primary">
					<Mail class="w-4 h-4" />
					Apply Now
				</a>
				<a href="/apps" class="btn btn-secondary"> Explore Products </a>
				<a href="mailto:affiliates@vuappstore.com" class="btn btn-secondary">
					<ExternalLink class="w-4 h-4" />
					Contact Team
				</a>
			</div>
		</div>
	</div>
</div>
