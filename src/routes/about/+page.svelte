<script lang="ts">
	import { Building2, Target, Users, Shield } from 'lucide-svelte';
</script>

<svelte:head>
	<title>About Us - VuAppStore</title>
	<meta name="description" content="Learn about VuAppStore's mission to revolutionize privacy in the digital age." />
</svelte:head>

<div class="about-page container py-16 max-w-6xl relative z-10">
	<!-- Hero Section -->
	<section class="hero mb-16 text-center">
		<div class="hero-badge inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
			<span class="text-xs font-semibold text-primary uppercase tracking-wide">About VuAppStore</span>
		</div>
		<h1 class="text-4xl md:text-6xl font-black mb-6 text-gradient">
			Privacy Isn't a Feature.<br>It's Our Foundation.
		</h1>
		<p class="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
			VuAppStore was born from a simple belief: technology should empower people, not exploit them. 
			We're building the future where your data stays yours.
		</p>
	</section>

	<!-- Mission Section -->
	<section class="mission-section mb-16">
		<div class="glass-card p-8 md:p-12">
			<div class="flex items-center gap-4 mb-6">
				<Target class="w-10 h-10 text-primary" />
				<h2 class="text-3xl font-bold">Our Mission</h2>
			</div>
			<p class="text-lg text-text-secondary leading-relaxed mb-6">
				To create a world where privacy is the default, not the exception. We believe that powerful 
				software doesn't require surveillance, and that users shouldn't have to choose between 
				functionality and privacy.
			</p>
			<a href="/about/mission" class="btn btn-primary">
				Read Full Mission Statement
			</a>
		</div>
	</section>

	<!-- Values Grid -->
	<section class="values-section mb-16">
		<h2 class="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
		<div class="values-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			<div class="value-card glass-card p-6 text-center">
				<Shield class="w-12 h-12 text-primary mx-auto mb-4" />
				<h3 class="text-xl font-semibold mb-2">Privacy First</h3>
				<p class="text-sm text-text-secondary">
					Every decision starts with user privacy. No compromises, no exceptions.
				</p>
			</div>
			<div class="value-card glass-card p-6 text-center">
				<Users class="w-12 h-12 text-primary mx-auto mb-4" />
				<h3 class="text-xl font-semibold mb-2">User Ownership</h3>
				<p class="text-sm text-text-secondary">
					Your data belongs to you. Always encrypted, always under your control.
				</p>
			</div>
			<div class="value-card glass-card p-6 text-center">
				<Building2 class="w-12 h-12 text-primary mx-auto mb-4" />
				<h3 class="text-xl font-semibold mb-2">Transparency</h3>
				<p class="text-sm text-text-secondary">
					Open about our practices, clear about our policies, honest about our limitations.
				</p>
			</div>
			<div class="value-card glass-card p-6 text-center">
				<Shield class="w-12 h-12 text-primary mx-auto mb-4" />
				<h3 class="text-xl font-semibold mb-2">Zero Knowledge</h3>
				<p class="text-sm text-text-secondary">
					We can't access your data even if we wanted to. That's true security.
				</p>
			</div>
		</div>
	</section>

	<!-- Story Section -->
	<section class="story-section mb-16">
		<div class="glass-card p-8 md:p-12">
			<h2 class="text-3xl font-bold mb-6">Our Story</h2>
			<div class="prose prose-invert max-w-none">
				<p class="text-text-secondary leading-relaxed mb-4">
					VuAppStore started in 2024 when a group of privacy advocates and developers came together 
					with a shared frustration: why does every app need to track, monitor, and monetize our data?
				</p>
				<p class="text-text-secondary leading-relaxed mb-4">
					We realized that the problem wasn't technology—it was the business model. So we built a 
					different one. A model where users pay for software, not with their privacy, but with a 
					fair subscription that respects the value exchange.
				</p>
				<p class="text-text-secondary leading-relaxed">
					Today, VuAppStore hosts 30+ privacy-first applications, each built with zero-knowledge 
					architecture. We're not just creating apps; we're leading a movement towards a more 
					private digital future.
				</p>
			</div>
		</div>
	</section>

	<!-- Team CTA -->
	<section class="team-cta mb-16 text-center">
		<div class="glass-card p-8 md:p-12">
			<h2 class="text-3xl font-bold mb-4">Meet Our Team</h2>
			<p class="text-lg text-text-secondary mb-6">
				We're a diverse group of privacy advocates, developers, and designers united by a common goal.
			</p>
			<a href="/about/team" class="btn btn-primary">
				Meet the Team
			</a>
		</div>
	</section>

	<!-- Company Info -->
	<section class="company-info mb-16">
		<div class="glass-card p-8">
			<h2 class="text-2xl font-bold mb-6">Company Information</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<h3 class="font-semibold mb-2">Legal Entity</h3>
					<p class="text-text-secondary">
						VU Technologies<br>
						A Delaware Limited Liability Company
					</p>
				</div>
				<div>
					<h3 class="font-semibold mb-2">Headquarters</h3>
					<p class="text-text-secondary">
						1209 Orange Street<br>
						Wilmington, DE 19801<br>
						United States
					</p>
				</div>
				<div>
					<h3 class="font-semibold mb-2">Founded</h3>
					<p class="text-text-secondary">2024</p>
				</div>
				<div>
					<h3 class="font-semibold mb-2">Contact</h3>
					<p class="text-text-secondary">
						Email: hello@vuappstore.com<br>
						Support: support@vuappstore.com<br>
						Phone: +1-302-555-0100
					</p>
				</div>
			</div>
		</div>
	</section>
</div>
