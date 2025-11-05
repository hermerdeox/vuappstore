<script lang="ts">
	import { Check, Shield, Zap, Crown, Bitcoin } from 'lucide-svelte';

	// VU Pricing Model: $2.56/month per app
	// 256 bits of encryption = $2.56 = 1 cent per bit
	const pricePerApp = 2.56;
	const totalApps = 30;

	const plans = [
		{
			name: 'Single App',
			price: 2.56,
			period: 'month',
			description: 'Perfect for trying one VU app',
			subtitle: '1¢ per bit of encryption',
			features: [
				'Choose any 1 app',
				'256-bit encryption',
				'Cancel anytime',
				'Regular updates',
				'Privacy Level 0',
				'Zero tracking'
			],
			cta: 'Choose Your App',
			popular: false,
			icon: Zap,
			appsIncluded: 1
		},
		{
			name: 'VU Suite Complete',
			price: 76.80,
			period: 'month',
			annualPrice: 768,
			savings: '$2.56/app',
			description: 'All 30 apps at $2.56 each',
			subtitle: '30 apps × $2.56 = $76.80/mo',
			features: [
				'All 30+ VU Suite apps',
				'$2.56 per app per month',
				'7,680 bits of encryption',
				'Priority support',
				'Early access to new apps',
				'Multi-device access',
				'Lifetime price lock',
				'Annual privacy report'
			],
			cta: 'Get Complete Suite',
			popular: true,
			icon: Shield,
			appsIncluded: 30
		},
		{
			name: 'Lifetime Access',
			price: 2560,
			period: 'once',
			savings: '$2.56 × 1000 months',
			description: 'Pay once, own forever',
			subtitle: '83 years of access upfront',
			features: [
				'All 30+ apps forever',
				'All future apps included',
				'Lifetime updates',
				'VIP support',
				'Beta access',
				'Priority feature requests',
				'Exclusive community',
				'SubZero level access (invitation)'
			],
			cta: 'Get Lifetime Access',
			popular: false,
			icon: Crown,
			appsIncluded: 30
		}
	];

	// Crypto payment methods (VU Philosophy: Privacy-First Payments)
	const cryptoMethods = [
		{
			level: 0,
			name: 'Monero (XMR)',
			label: 'Zero-Knowledge',
			description: 'Maximum privacy - completely untraceable',
			icon: '🛡️',
			color: '#3b82f6',
			recommended: true
		},
		{
			level: 1,
			name: 'Bitcoin Lightning',
			label: 'Fast & Private',
			description: 'Near-instant with enhanced privacy',
			icon: '⚡',
			color: '#22c55e'
		},
		{
			level: 2,
			name: 'Bitcoin/Ethereum',
			label: 'Standard Crypto',
			description: 'Transparent blockchain',
			icon: '₿',
			color: '#eab308'
		}
	];

	const faqs = [
		{
			question: 'What\'s included in all plans?',
			answer: 'All plans include access to all 30+ privacy-focused apps in the VU Suite, regular updates, cloud sync, and multi-device access. The only differences are pricing and some exclusive features for annual/lifetime plans.'
		},
		{
			question: 'Can I cancel anytime?',
			answer: 'Yes! Monthly and annual subscriptions can be cancelled anytime through your account dashboard. You\'ll retain access until the end of your billing period. We also offer a 30-day money-back guarantee on all plans.'
		},
		{
			question: 'What payment methods do you accept?',
			answer: 'VU accepts privacy-first cryptocurrency payments only: Monero (XMR) for maximum privacy (Level 0), Bitcoin Lightning for fast payments (Level 1), and standard Bitcoin/Ethereum (Level 2). No credit cards, no PayPal, no surveillance.'
		},
		{
			question: 'Why crypto-only payments?',
			answer: 'Traditional payment processors track every purchase, build profiles, and sell your data. Crypto payments align with VU\'s zero-knowledge philosophy - your purchase history stays private. We recommend Monero for complete transaction privacy.'
		},
		{
			question: 'Is there a free trial?',
			answer: 'Yes! We offer a 14-day free trial on monthly and annual plans. No credit card required upfront. You\'ll only be charged if you decide to continue after the trial.'
		},
		{
			question: 'What happens to my data if I cancel?',
			answer: 'Your data remains encrypted and accessible for 90 days after cancellation. After 90 days, it\'s permanently deleted from our servers. You can export your data anytime before then.'
		},
		{
			question: 'Do you offer student or non-profit discounts?',
			answer: 'Yes! We offer 50% off for students and registered non-profits. Contact support@vuappstore.com with verification to receive your discount code.'
		}
	];
</script>

<svelte:head>
	<title>Pricing - VuAppStore</title>
	<meta name="description" content="Simple, transparent pricing for privacy-focused apps. One subscription, all apps included." />
</svelte:head>

<div class="pricing-page">
	<!-- Hero Section -->
	<section class="hero container py-16 text-center relative z-10">
		<div class="hero-badge inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
			<span class="text-xs font-semibold text-primary uppercase tracking-wide">Honest Pricing</span>
		</div>
		<h1 class="text-4xl md:text-6xl font-black mb-6 text-gradient">
			$2.56 Per App.<br>256 Bits of Encryption.<br>1¢ Per Bit.
		</h1>
		<p class="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-4">
			The honest price of privacy. Choose one app or get all 30 at $2.56 each. 
			No hidden fees, no tracking, no surveillance.
		</p>
		<p class="text-base text-primary font-semibold">
			Pay with crypto only • Monero, Lightning, or standard blockchain
		</p>
	</section>

	<!-- Pricing Cards -->
	<section class="pricing-section container mb-16 relative z-10">
		<div class="pricing-grid grid grid-cols-1 md:grid-cols-3 gap-8">
			{#each plans as plan}
				<div class="pricing-card glass-card p-8 relative" class:popular={plan.popular}>
					{#if plan.popular}
						<div class="popular-badge absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-background rounded-full text-xs font-bold uppercase">
							Most Popular
						</div>
					{/if}

					<div class="card-header mb-6">
						<div class="flex items-center justify-between mb-4">
							<svelte:component this={plan.icon} class="w-10 h-10 text-primary" />
							{#if plan.savings}
								<span class="savings-badge px-3 py-1 bg-success/20 text-success text-xs font-semibold rounded-full">
									{plan.savings}
								</span>
							{/if}
						</div>
						<h3 class="text-2xl font-bold mb-2">{plan.name}</h3>
						<p class="text-sm text-text-secondary mb-2">{plan.description}</p>
						<p class="text-xs text-text-tertiary mb-4">{plan.subtitle}</p>
						<div class="price mb-2">
							<span class="text-4xl font-bold">${plan.price.toFixed(2)}</span>
							<span class="text-text-secondary">/{plan.period}</span>
						</div>
						{#if plan.annualPrice}
							<p class="text-sm text-success">${plan.annualPrice}/year if paid annually</p>
						{/if}
					</div>

					<a href="/checkout?plan={plan.name.toLowerCase()}" class="btn btn-primary w-full justify-center mb-6">
						{plan.cta}
					</a>

					<div class="features space-y-3">
						{#each plan.features as feature}
							<div class="feature-item flex items-start gap-3">
								<Check class="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
								<span class="text-sm text-text-secondary">{feature}</span>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Crypto Payment Methods -->
	<section class="crypto-section container mb-16 relative z-10">
		<div class="glass-card p-12">
			<div class="text-center mb-12">
				<div class="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/40 rounded-full mb-4">
					<Bitcoin class="w-4 h-4 text-primary" />
					<span class="text-xs font-bold text-primary uppercase tracking-wide">Privacy-First Payments</span>
				</div>
				<h2 class="text-3xl md:text-4xl font-bold mb-4">We Accept Crypto Only</h2>
				<p class="text-lg text-text-secondary max-w-2xl mx-auto">
					No credit cards. No PayPal. No surveillance. Choose your privacy level.
				</p>
			</div>

			<div class="crypto-methods grid grid-cols-1 md:grid-cols-3 gap-6">
				{#each cryptoMethods as method}
					<div class="crypto-method glass-card p-6 border-l-4" style="border-color: {method.color};">
						<div class="flex items-center justify-between mb-4">
							<span class="text-3xl">{method.icon}</span>
							{#if method.recommended}
								<span class="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full uppercase">
									Recommended
								</span>
							{/if}
						</div>
						<div class="mb-4">
							<h3 class="text-xl font-bold mb-1">{method.name}</h3>
							<p class="text-sm font-semibold mb-2" style="color: {method.color};">
								{method.label} • Level {method.level}
							</p>
							<p class="text-sm text-text-secondary">
								{method.description}
							</p>
						</div>
					</div>
				{/each}
			</div>

			<div class="mt-8 p-6 bg-primary/5 border border-primary/30 rounded-lg">
				<div class="flex items-start gap-3">
					<Shield class="w-6 h-6 text-primary flex-shrink-0 mt-1" />
					<div>
						<h4 class="font-semibold text-primary mb-2">Why Crypto-Only?</h4>
						<p class="text-sm text-text-secondary leading-relaxed">
							Traditional payment processors track every purchase, build profiles, and sell your data. 
							Cryptocurrency payments align with VU's zero-knowledge philosophy - your purchase history 
							stays completely private. We recommend <strong class="text-text-primary">Monero (XMR)</strong> for 
							untraceable transactions.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Trust Indicators -->
	<section class="trust-section container mb-16 relative z-10">
		<div class="glass-card p-8 text-center">
			<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
				<div class="trust-item">
					<div class="text-3xl font-bold text-primary mb-2">30-Day</div>
					<div class="text-sm text-text-secondary">Money-Back Guarantee</div>
				</div>
				<div class="trust-item">
					<div class="text-3xl font-bold text-primary mb-2">$2.56</div>
					<div class="text-sm text-text-secondary">Per App Per Month</div>
				</div>
				<div class="trust-item">
					<div class="text-3xl font-bold text-primary mb-2">Zero</div>
					<div class="text-sm text-text-secondary">Payment Tracking</div>
				</div>
				<div class="trust-item">
					<div class="text-3xl font-bold text-primary mb-2">100%</div>
					<div class="text-sm text-text-secondary">Crypto Payments</div>
				</div>
			</div>
		</div>
	</section>

	<!-- FAQ Section -->
	<section class="faq-section container mb-16 relative z-10">
		<h2 class="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
		<div class="faq-grid grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
			{#each faqs as faq}
				<div class="faq-item glass-card p-6">
					<h3 class="text-lg font-semibold mb-3">{faq.question}</h3>
					<p class="text-sm text-text-secondary leading-relaxed">{faq.answer}</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- Crypto Payment Info -->
	<section class="payment-info container mb-16 relative z-10">
		<div class="glass-card p-8">
			<h3 class="text-2xl font-bold text-center mb-8">Privacy-First Payment Processing</h3>
			
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<div class="payment-feature text-center p-4">
					<div class="text-4xl mb-3">🛡️</div>
					<h4 class="font-semibold mb-2">Zero-Knowledge Payments</h4>
					<p class="text-sm text-text-secondary">
						Monero transactions are completely untraceable
					</p>
				</div>
				<div class="payment-feature text-center p-4">
					<div class="text-4xl mb-3">⚡</div>
					<h4 class="font-semibold mb-2">Lightning Fast</h4>
					<p class="text-sm text-text-secondary">
						Bitcoin Lightning confirms in seconds
					</p>
				</div>
				<div class="payment-feature text-center p-4">
					<div class="text-4xl mb-3">🌍</div>
					<h4 class="font-semibold mb-2">Global Access</h4>
					<p class="text-sm text-text-secondary">
						No geographic restrictions or censorship
					</p>
				</div>
			</div>

			<div class="text-center">
				<p class="text-sm text-text-tertiary mb-4">
					Accepted Cryptocurrencies
				</p>
				<div class="flex flex-wrap justify-center gap-6 items-center">
					<span class="text-sm font-semibold" style="color: #3b82f6;">Monero (XMR)</span>
					<span class="text-sm font-semibold" style="color: #22c55e;">Bitcoin Lightning</span>
					<span class="text-sm text-text-secondary">Bitcoin (BTC)</span>
					<span class="text-sm text-text-secondary">Ethereum (ETH)</span>
				</div>
				<p class="text-xs text-text-tertiary mt-4">
					🔒 All payments are cryptographically secure and completely private
				</p>
			</div>
		</div>
	</section>
</div>

<style>
	.pricing-card.popular {
		border-color: rgba(0, 212, 255, 0.3);
		transform: scale(1.05);
	}
</style>

