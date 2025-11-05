<script lang="ts">
	import { HelpCircle, MessageCircle, Book, Mail, Phone, Clock } from 'lucide-svelte';

	const supportOptions = [
		{
			icon: HelpCircle,
			title: 'FAQ',
			description: 'Find answers to common questions',
			link: '/support/faq',
			linkText: 'Browse FAQ'
		},
		{
			icon: MessageCircle,
			title: 'Contact Support',
			description: 'Get help from our support team',
			link: '/support/contact',
			linkText: 'Contact Us'
		},
		{
			icon: Book,
			title: 'Documentation',
			description: 'Learn how to use our apps',
			link: '/developers/docs',
			linkText: 'View Docs'
		},
		{
			icon: Mail,
			title: 'Email Support',
			description: 'support@vuappstore.com',
			link: 'mailto:support@vuappstore.com',
			linkText: 'Send Email'
		}
	];

	const commonTopics = [
		'Getting Started with VuAppStore',
		'Managing Your Subscription',
		'Download and Installation',
		'Account Settings',
		'Billing and Payments',
		'Privacy and Security',
		'Troubleshooting Apps',
		'Refund Requests'
	];
</script>

<svelte:head>
	<title>Support Center - VuAppStore</title>
	<meta name="description" content="Get help with VuAppStore. Browse FAQs, contact support, or access documentation." />
</svelte:head>

<div class="support-page container py-16 max-w-6xl relative z-10">
	<!-- Hero Section -->
	<section class="hero mb-16 text-center">
		<h1 class="text-4xl md:text-5xl font-black mb-4 text-gradient">
			How Can We Help?
		</h1>
		<p class="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
			Get support for VuAppStore and all your privacy-first applications.
		</p>
		
		<!-- Search Bar -->
		<div class="search-container max-w-2xl mx-auto">
			<div class="search-bar glass-card p-4 flex items-center gap-3">
				<HelpCircle class="w-6 h-6 text-text-secondary" />
				<input 
					type="text" 
					placeholder="Search for help..." 
					class="flex-1 bg-transparent outline-none text-text-primary placeholder:text-text-tertiary"
				/>
				<button class="btn btn-primary">Search</button>
			</div>
		</div>
	</section>

	<!-- Support Options Grid -->
	<section class="support-options mb-16">
		<h2 class="text-2xl font-bold mb-8 text-center">Support Options</h2>
		<div class="options-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			{#each supportOptions as option}
				<a href={option.link} class="support-card glass-card p-6 hover:-translate-y-1 transition-all">
					<svelte:component this={option.icon} class="w-12 h-12 text-primary mb-4" />
					<h3 class="text-lg font-semibold mb-2">{option.title}</h3>
					<p class="text-sm text-text-secondary mb-4">{option.description}</p>
					<span class="text-primary font-medium text-sm">{option.linkText} →</span>
				</a>
			{/each}
		</div>
	</section>

	<!-- Common Topics -->
	<section class="common-topics mb-16">
		<div class="glass-card p-8">
			<h2 class="text-2xl font-bold mb-6">Common Topics</h2>
			<div class="topics-grid grid grid-cols-1 md:grid-cols-2 gap-4">
				{#each commonTopics as topic}
					<a href="/support/faq" class="topic-item flex items-center gap-3 p-4 rounded-lg hover:bg-glass transition-colors">
						<div class="w-2 h-2 bg-primary rounded-full"></div>
						<span class="text-text-secondary hover:text-text-primary transition-colors">{topic}</span>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- Contact Information -->
	<section class="contact-info mb-16">
		<div class="glass-card p-8">
			<h2 class="text-2xl font-bold mb-6">Contact Information</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div class="contact-method">
					<div class="flex items-center gap-3 mb-3">
						<Mail class="w-5 h-5 text-primary" />
						<h3 class="font-semibold">Email Support</h3>
					</div>
					<p class="text-text-secondary mb-2">support@vuappstore.com</p>
					<p class="text-sm text-text-tertiary">Response within 24 hours</p>
				</div>
				<div class="contact-method">
					<div class="flex items-center gap-3 mb-3">
						<Phone class="w-5 h-5 text-primary" />
						<h3 class="font-semibold">Phone Support</h3>
					</div>
					<p class="text-text-secondary mb-2">+1-302-555-0100</p>
					<p class="text-sm text-text-tertiary">Mon-Fri, 9 AM - 6 PM ET</p>
				</div>
				<div class="contact-method">
					<div class="flex items-center gap-3 mb-3">
						<Clock class="w-5 h-5 text-primary" />
						<h3 class="font-semibold">Response Time</h3>
					</div>
					<p class="text-text-secondary mb-2">Average: 4 hours</p>
					<p class="text-sm text-text-tertiary">Priority support for annual plans</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Status Section -->
	<section class="status-section">
		<div class="glass-card p-6 text-center">
			<div class="flex items-center justify-center gap-3 mb-2">
				<div class="w-3 h-3 bg-success rounded-full animate-pulse"></div>
				<span class="text-success font-semibold">All Systems Operational</span>
			</div>
			<p class="text-sm text-text-secondary">
				Current uptime: 99.9% | Last incident: None in the past 90 days
			</p>
		</div>
	</section>
</div>
