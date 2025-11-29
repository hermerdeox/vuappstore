<script lang="ts">
	import { page } from '$app/stores';
	import { Shield, Eye, Lock, Heart, Globe, Users } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Our Mission - VuAppStore</title>
	<meta
		name="description"
		content="VuAppStore's mission: Building the greatest privacy journey in technology history. Your data, your control, your digital sovereignty."
	/>
</svelte:head>

<div class="container py-16">
	<div class="max-w-4xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-16">
			<div
				class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6"
			>
				<Heart class="w-4 h-4 text-primary" />
				<span class="text-xs font-semibold text-primary uppercase tracking-wide">Our Mission</span>
			</div>
			<h1 class="text-4xl md:text-6xl font-black leading-tight mb-6 text-gradient">
				The Greatest Privacy Journey<br />In Technology History
			</h1>
			<p class="text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
				We're not just building apps. We're building a movement. A future where technology serves
				humanity without compromising the fundamental right to privacy.
			</p>
		</div>

		<!-- Mission Statement -->
		<div class="glass-card p-8 md:p-12 mb-16">
			<div class="text-center mb-8">
				<div
					class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
				>
					<Shield class="w-8 h-8 text-primary" />
				</div>
				<h2 class="text-2xl font-bold mb-4">The VU Way</h2>
				<p class="text-lg text-text-secondary italic">
					"Déjà vu - Remember when your data was yours?"
				</p>
			</div>

			<div class="prose prose-invert max-w-none">
				<p class="text-lg leading-relaxed text-center">
					At VuAppStore, we believe that <strong
						>privacy isn't a feature—it's a fundamental human right</strong
					>. Our mission is to create the world's first truly privacy-first app ecosystem where
					users never have to choose between convenience and control over their personal data.
				</p>
			</div>
		</div>

		<!-- Core Principles -->
		<div class="grid md:grid-cols-2 gap-8 mb-16">
			<div class="glass-card p-8">
				<div class="flex items-center gap-4 mb-6">
					<div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
						<Eye class="w-6 h-6 text-primary" />
					</div>
					<h3 class="text-xl font-bold">Zero Surveillance</h3>
				</div>
				<p class="text-text-secondary leading-relaxed">
					Every app in the VU Suite is built with zero-knowledge architecture. We don't track, we
					don't collect, we don't surveil. Your digital life remains completely private, always.
				</p>
			</div>

			<div class="glass-card p-8">
				<div class="flex items-center gap-4 mb-6">
					<div class="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
						<Lock class="w-6 h-6 text-success" />
					</div>
					<h3 class="text-xl font-bold">Encryption First</h3>
				</div>
				<p class="text-text-secondary leading-relaxed">
					End-to-end encryption isn't an afterthought—it's the foundation. Every bit of data is
					encrypted before it leaves your device, ensuring maximum security and privacy.
				</p>
			</div>

			<div class="glass-card p-8">
				<div class="flex items-center gap-4 mb-6">
					<div class="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
						<Users class="w-6 h-6 text-warning" />
					</div>
					<h3 class="text-xl font-bold">User Sovereignty</h3>
				</div>
				<p class="text-text-secondary leading-relaxed">
					You own your data, you control your experience, you decide what to share. We're building
					technology that serves you, not the other way around.
				</p>
			</div>

			<div class="glass-card p-8">
				<div class="flex items-center gap-4 mb-6">
					<div class="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center">
						<Globe class="w-6 h-6 text-error" />
					</div>
					<h3 class="text-xl font-bold">Global Impact</h3>
				</div>
				<p class="text-text-secondary leading-relaxed">
					We're not just changing how apps work—we're changing how the entire tech industry thinks
					about user privacy and digital rights on a global scale.
				</p>
			</div>
		</div>

		<!-- The Vision -->
		<div class="text-center mb-16">
			<h2 class="text-3xl font-bold mb-8">Our Vision for 2030</h2>
			<div class="grid md:grid-cols-3 gap-8">
				<div class="glass-card p-6">
					<div class="text-3xl font-bold text-primary mb-2">1B+</div>
					<div class="text-sm text-text-secondary">Users protected by VU privacy technology</div>
				</div>
				<div class="glass-card p-6">
					<div class="text-3xl font-bold text-success mb-2">100%</div>
					<div class="text-sm text-text-secondary">Zero-knowledge architecture across all apps</div>
				</div>
				<div class="glass-card p-6">
					<div class="text-3xl font-bold text-warning mb-2">0</div>
					<div class="text-sm text-text-secondary">Data breaches or privacy violations</div>
				</div>
			</div>
		</div>

		<!-- Call to Action -->
		<div class="text-center">
			<h2 class="text-2xl font-bold mb-4">Join the Privacy Revolution</h2>
			<p class="text-text-secondary mb-8 max-w-2xl mx-auto">
				Every subscription to VuAppStore is a vote for a more private, secure, and user-controlled
				internet. Together, we're building the future of technology—one that respects human dignity
				and privacy.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a href="/pricing" class="btn btn-primary"> Start Your Privacy Journey </a>
				<a href="/apps" class="btn btn-secondary"> Explore VU Apps </a>
			</div>
		</div>
	</div>
</div>
