<script lang="ts">
	import { Mail, MessageCircle, Phone, MapPin, Send } from 'lucide-svelte';

	let formData = {
		name: '',
		email: '',
		subject: '',
		category: 'general',
		message: ''
	};

	let isSubmitting = false;
	let submitMessage = '';

	async function handleSubmit(e: Event) {
		e.preventDefault();
		isSubmitting = true;
		
		// Simulate form submission
		setTimeout(() => {
			isSubmitting = false;
			submitMessage = 'Thank you for contacting us! We\'ll respond within 24 hours.';
			formData = {
				name: '',
				email: '',
				subject: '',
				category: 'general',
				message: ''
			};
		}, 1000);
	}
</script>

<svelte:head>
	<title>Contact Support - VuAppStore</title>
	<meta name="description" content="Contact VuAppStore support team for help with your privacy-first applications." />
</svelte:head>

<div class="contact-page container py-16 max-w-6xl relative z-10">
	<!-- Hero Section -->
	<section class="hero mb-12 text-center">
		<h1 class="text-4xl md:text-5xl font-black mb-4 text-gradient">
			Get in Touch
		</h1>
		<p class="text-lg text-text-secondary max-w-2xl mx-auto">
			Our support team is here to help with any questions about VuAppStore and your privacy-first apps.
		</p>
	</section>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
		<!-- Contact Form -->
		<div class="lg:col-span-2">
			<div class="glass-card p-8">
				<h2 class="text-2xl font-bold mb-6">Send Us a Message</h2>
				
				{#if submitMessage}
					<div class="success-message mb-6 p-4 bg-success/20 border border-success/50 rounded-lg">
						<p class="text-success">{submitMessage}</p>
					</div>
				{/if}

				<form on:submit={handleSubmit} class="space-y-6">
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label for="name" class="block text-sm font-medium mb-2">Name *</label>
							<input
								type="text"
								id="name"
								bind:value={formData.name}
								required
								class="w-full px-4 py-3 bg-glass border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
								placeholder="Your name"
							/>
						</div>
						<div>
							<label for="email" class="block text-sm font-medium mb-2">Email *</label>
							<input
								type="email"
								id="email"
								bind:value={formData.email}
								required
								class="w-full px-4 py-3 bg-glass border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
								placeholder="your@email.com"
							/>
						</div>
					</div>

					<div>
						<label for="category" class="block text-sm font-medium mb-2">Category *</label>
						<select
							id="category"
							bind:value={formData.category}
							required
							class="w-full px-4 py-3 bg-glass border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
						>
							<option value="general">General Inquiry</option>
							<option value="technical">Technical Support</option>
							<option value="billing">Billing & Payments</option>
							<option value="refund">Refund Request</option>
							<option value="privacy">Privacy & Security</option>
							<option value="feature">Feature Request</option>
							<option value="bug">Bug Report</option>
						</select>
					</div>

					<div>
						<label for="subject" class="block text-sm font-medium mb-2">Subject *</label>
						<input
							type="text"
							id="subject"
							bind:value={formData.subject}
							required
							class="w-full px-4 py-3 bg-glass border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
							placeholder="Brief description of your issue"
						/>
					</div>

					<div>
						<label for="message" class="block text-sm font-medium mb-2">Message *</label>
						<textarea
							id="message"
							bind:value={formData.message}
							required
							rows="6"
							class="w-full px-4 py-3 bg-glass border border-border rounded-lg focus:border-primary focus:outline-none transition-colors resize-none"
							placeholder="Please describe your issue in detail..."
						></textarea>
					</div>

					<button 
						type="submit" 
						class="btn btn-primary w-full justify-center"
						disabled={isSubmitting}
					>
						{#if isSubmitting}
							Sending...
						{:else}
							<Send class="w-4 h-4" />
							Send Message
						{/if}
					</button>
				</form>
			</div>
		</div>

		<!-- Contact Information -->
		<div class="space-y-6">
			<!-- Quick Contact -->
			<div class="glass-card p-6">
				<h3 class="text-xl font-bold mb-4">Quick Contact</h3>
				<div class="space-y-4">
					<div class="flex items-start gap-3">
						<Mail class="w-5 h-5 text-primary mt-1" />
						<div>
							<p class="font-medium">Email</p>
							<a href="mailto:support@vuappstore.com" class="text-text-secondary hover:text-primary transition-colors">
								support@vuappstore.com
							</a>
						</div>
					</div>
					<div class="flex items-start gap-3">
						<Phone class="w-5 h-5 text-primary mt-1" />
						<div>
							<p class="font-medium">Phone</p>
							<p class="text-text-secondary">+1-302-555-0100</p>
							<p class="text-xs text-text-tertiary">Mon-Fri, 9 AM - 6 PM ET</p>
						</div>
					</div>
					<div class="flex items-start gap-3">
						<MapPin class="w-5 h-5 text-primary mt-1" />
						<div>
							<p class="font-medium">Office</p>
							<p class="text-text-secondary">
								1209 Orange Street<br>
								Wilmington, DE 19801<br>
								United States
							</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Response Times -->
			<div class="glass-card p-6">
				<h3 class="text-xl font-bold mb-4">Response Times</h3>
				<div class="space-y-3">
					<div class="flex justify-between">
						<span class="text-text-secondary">General Inquiries</span>
						<span class="font-medium">24 hours</span>
					</div>
					<div class="flex justify-between">
						<span class="text-text-secondary">Technical Support</span>
						<span class="font-medium">4-6 hours</span>
					</div>
					<div class="flex justify-between">
						<span class="text-text-secondary">Billing Issues</span>
						<span class="font-medium">2-4 hours</span>
					</div>
					<div class="flex justify-between">
						<span class="text-text-secondary">Priority Support</span>
						<span class="font-medium text-primary">1-2 hours</span>
					</div>
				</div>
			</div>

			<!-- Other Support Options -->
			<div class="glass-card p-6">
				<h3 class="text-xl font-bold mb-4">Other Support Options</h3>
				<div class="space-y-3">
					<a href="/support/faq" class="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors">
						<MessageCircle class="w-4 h-4" />
						Browse FAQ
					</a>
					<a href="/developers/docs" class="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors">
						<MessageCircle class="w-4 h-4" />
						Documentation
					</a>
					<a href="/support" class="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors">
						<MessageCircle class="w-4 h-4" />
						Support Center
					</a>
				</div>
			</div>
		</div>
	</div>
</div>
