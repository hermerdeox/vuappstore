<script lang="ts">
	import { ChevronDown } from 'lucide-svelte';

	interface FAQItem {
		question: string;
		answer: string;
		category: string;
	}

	const faqs: FAQItem[] = [
		{
			category: 'General',
			question: 'What is VuAppStore?',
			answer: 'VuAppStore is a privacy-first app marketplace offering 30+ zero-knowledge applications. Every app is designed with privacy as the foundation, ensuring your data stays encrypted and under your control.'
		},
		{
			category: 'General',
			question: 'How is VuAppStore different from other app stores?',
			answer: 'Unlike traditional app stores, VuAppStore exclusively features privacy-focused applications with zero tracking, no surveillance, and end-to-end encryption. We never collect or sell your data.'
		},
		{
			category: 'Pricing',
			question: 'What\'s included in the subscription?',
			answer: 'All subscriptions include access to all 30+ apps in the VU Suite, automatic updates, cloud sync (encrypted), multi-device access, and priority support. The only difference between plans is the billing period and some exclusive features for annual/lifetime members.'
		},
		{
			category: 'Pricing',
			question: 'Can I try before I buy?',
			answer: 'Yes! We offer a 14-day free trial for monthly and annual plans. No credit card required upfront. Plus, all plans come with a 30-day money-back guarantee.'
		},
		{
			category: 'Pricing',
			question: 'How do I cancel my subscription?',
			answer: 'You can cancel anytime through your account dashboard. Go to Billing & Subscriptions and click "Cancel Subscription". You\'ll retain access until the end of your billing period.'
		},
		{
			category: 'Privacy',
			question: 'What data do you collect?',
			answer: 'We collect minimal data: only your @vumail.app address for account access. Payment information is handled via cryptocurrency (Monero, Lightning, BTC, ETH) with zero tracking. We never store payment details, track app usage, collect analytics, or share data with anyone.'
		},
		{
			category: 'Privacy',
			question: 'What does "zero-knowledge" mean?',
			answer: 'Zero-knowledge means all your data is encrypted on your device before syncing. We cannot access your data even if we wanted to - only you have the encryption keys.'
		},
		{
			category: 'Privacy',
			question: 'Do you comply with GDPR and CCPA?',
			answer: 'Yes, we fully comply with GDPR, CCPA, and other privacy regulations. You have the right to access, correct, delete, and export your data at any time.'
		},
		{
			category: 'Technical',
			question: 'What platforms are supported?',
			answer: 'Our apps support Windows, macOS, Linux, iOS, and Android. Some apps are also available as web applications. Check individual app pages for specific platform availability.'
		},
		{
			category: 'Technical',
			question: 'How do I install the apps?',
			answer: 'After subscribing, you can download apps from your account dashboard. Each app comes with installation instructions. Most apps have simple one-click installers.'
		},
		{
			category: 'Technical',
			question: 'Can I use apps offline?',
			answer: 'Yes! Most VU apps are designed to work offline-first. They only connect to the internet for encrypted sync when you choose to enable it.'
		},
		{
			category: 'Support',
			question: 'How do I contact support?',
			answer: 'Email us at support@vuappstore.com or use the contact form. We respond within 24 hours (usually much faster). Priority support is available for annual and lifetime members.'
		},
		{
			category: 'Support',
			question: 'What if I have technical issues?',
			answer: 'Our support team is here to help! Contact us with any technical issues. If we can\'t resolve them, you\'re eligible for a full refund within 30 days.'
		},
		{
			category: 'Billing',
			question: 'What payment methods do you accept?',
			answer: 'VU accepts privacy-first cryptocurrency payments only: Monero (XMR) for maximum privacy (Level 0), Bitcoin Lightning for fast payments (Level 1), and standard Bitcoin/Ethereum (Level 2). No credit cards, no PayPal, no surveillance.'
		},
		{
			category: 'Billing',
			question: 'Is my payment information secure?',
			answer: 'Yes! Cryptocurrency payments are cryptographically secure and completely private. Monero (Level 0) provides zero-knowledge transactions that are completely untraceable. Bitcoin Lightning (Level 1) offers enhanced privacy with off-chain payments. We never see or store any payment details - your financial privacy is absolute.'
		},
		{
			category: 'Billing',
			question: 'How does the refund policy work?',
			answer: 'We offer a 30-day money-back guarantee on all plans. Request a refund through your account dashboard or email support. Refunds are processed within 5-7 business days.'
		}
	];

	const categories = [...new Set(faqs.map(f => f.category))];
	let selectedCategory = 'All';
	let expandedItems: Set<number> = new Set();

	$: filteredFaqs = selectedCategory === 'All' 
		? faqs 
		: faqs.filter(f => f.category === selectedCategory);

	function toggleItem(index: number) {
		if (expandedItems.has(index)) {
			expandedItems.delete(index);
		} else {
			expandedItems.add(index);
		}
		expandedItems = expandedItems;
	}
</script>

<svelte:head>
	<title>FAQ - VuAppStore</title>
	<meta name="description" content="Frequently asked questions about VuAppStore, pricing, privacy, and support." />
</svelte:head>

<div class="faq-page container py-16 max-w-4xl relative z-10">
	<!-- Hero Section -->
	<section class="hero mb-12 text-center">
		<h1 class="text-4xl md:text-5xl font-black mb-4 text-gradient">
			Frequently Asked Questions
		</h1>
		<p class="text-lg text-text-secondary">
			Find answers to common questions about VuAppStore
		</p>
	</section>

	<!-- Category Filter -->
	<section class="category-filter mb-8">
		<div class="flex flex-wrap gap-3 justify-center">
			<button 
				class="category-btn px-4 py-2 rounded-lg text-sm font-medium transition-all"
				class:active={selectedCategory === 'All'}
				on:click={() => selectedCategory = 'All'}
			>
				All
			</button>
			{#each categories as category}
				<button 
					class="category-btn px-4 py-2 rounded-lg text-sm font-medium transition-all"
					class:active={selectedCategory === category}
					on:click={() => selectedCategory = category}
				>
					{category}
				</button>
			{/each}
		</div>
	</section>

	<!-- FAQ Items -->
	<section class="faq-items space-y-4">
		{#each filteredFaqs as faq, index}
			<div class="faq-item glass-card">
				<button 
					class="faq-question w-full p-6 text-left flex items-center justify-between gap-4"
					on:click={() => toggleItem(index)}
				>
					<div>
						<span class="text-xs text-primary font-semibold uppercase tracking-wide mb-2 block">
							{faq.category}
						</span>
						<h3 class="text-lg font-semibold">
							{faq.question}
						</h3>
					</div>
				<ChevronDown 
					class="w-5 h-5 text-text-secondary flex-shrink-0 transition-transform {expandedItems.has(index) ? 'rotate-180' : ''}"
				/>
				</button>
				{#if expandedItems.has(index)}
					<div class="faq-answer px-6 pb-6">
						<p class="text-text-secondary leading-relaxed">
							{faq.answer}
						</p>
					</div>
				{/if}
			</div>
		{/each}
	</section>

	<!-- Still Have Questions -->
	<section class="cta-section mt-16">
		<div class="glass-card p-8 text-center">
			<h2 class="text-2xl font-bold mb-4">Still Have Questions?</h2>
			<p class="text-text-secondary mb-6">
				Can't find what you're looking for? Our support team is here to help.
			</p>
			<a href="/support/contact" class="btn btn-primary">
				Contact Support
			</a>
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

	.rotate-180 {
		transform: rotate(180deg);
	}
</style>
