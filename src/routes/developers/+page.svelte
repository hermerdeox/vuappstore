<script lang="ts">
	import { Code, Book, GitBranch, Bug, Shield, Zap } from 'lucide-svelte';

	const resources = [
		{
			icon: Book,
			title: 'API Documentation',
			description: 'Complete API reference for integrating with VuAppStore',
			link: '/developers/api'
		},
		{
			icon: Code,
			title: 'Technical Docs',
			description: 'In-depth technical documentation for all VU apps',
			link: '/developers/docs'
		},
		{
			icon: GitBranch,
			title: 'Contribute',
			description: 'Join us in building privacy-first applications',
			link: '/developers/contribute'
		},
		{
			icon: Bug,
			title: 'Bug Bounty',
			description: 'Help us improve security and earn rewards',
			link: '/developers/bug-bounty'
		}
	];
</script>

<svelte:head>
	<title>Developer Portal - VuAppStore</title>
	<meta
		name="description"
		content="Developer resources, API documentation, and tools for building privacy-first applications."
	/>
</svelte:head>

<div class="developers-page container py-16 max-w-6xl relative z-10">
	<!-- Hero Section -->
	<section class="hero mb-16 text-center">
		<div
			class="hero-badge inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6"
		>
			<Code class="w-4 h-4" />
			<span class="text-xs font-semibold text-primary uppercase tracking-wide"
				>Developer Portal</span
			>
		</div>
		<h1 class="text-4xl md:text-6xl font-black mb-6 text-gradient">Build Privacy-First Apps</h1>
		<p class="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
			Join the movement. Build applications that respect user privacy by default.
		</p>
	</section>

	<!-- Resources Grid -->
	<section class="resources mb-16">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			{#each resources as resource}
				<a
					href={resource.link}
					class="resource-card glass-card p-8 hover:-translate-y-1 transition-all"
				>
					<svelte:component this={resource.icon} class="w-12 h-12 text-primary mb-4" />
					<h3 class="text-xl font-bold mb-2">{resource.title}</h3>
					<p class="text-text-secondary">{resource.description}</p>
				</a>
			{/each}
		</div>
	</section>

	<!-- Code Examples -->
	<section class="code-examples mb-16">
		<div class="glass-card p-8">
			<h2 class="text-2xl font-bold mb-6">Quick Start</h2>
			<div class="code-block bg-black/50 rounded-lg p-6 overflow-x-auto">
				<pre><code class="text-sm text-gray-300"
						>{`# Install VU SDK
npm install @vuappstore/sdk

# Initialize your app
import { VuApp } from '@vuappstore/sdk';

const app = new VuApp({
  appId: 'your-app-id',
  privacyLevel: 5,
  encryption: 'aes-256-gcm'
});

// All data encrypted locally before sync
await app.encrypt(userData);
await app.sync(); // Zero-knowledge sync`}</code
					></pre>
			</div>
		</div>
	</section>

	<!-- Developer Principles -->
	<section class="principles mb-16">
		<h2 class="text-3xl font-bold mb-8 text-center">VU Development Principles</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<div class="principle-card glass-card p-6 text-center">
				<Shield class="w-12 h-12 text-primary mx-auto mb-4" />
				<h3 class="text-lg font-bold mb-2">Privacy by Design</h3>
				<p class="text-sm text-text-secondary">
					Build privacy into the architecture, not as an afterthought
				</p>
			</div>
			<div class="principle-card glass-card p-6 text-center">
				<Zap class="w-12 h-12 text-primary mx-auto mb-4" />
				<h3 class="text-lg font-bold mb-2">Zero-Knowledge</h3>
				<p class="text-sm text-text-secondary">We can't access user data, even if we wanted to</p>
			</div>
			<div class="principle-card glass-card p-6 text-center">
				<Code class="w-12 h-12 text-primary mx-auto mb-4" />
				<h3 class="text-lg font-bold mb-2">Open Standards</h3>
				<p class="text-sm text-text-secondary">
					Use open protocols and standards for interoperability
				</p>
			</div>
		</div>
	</section>

	<!-- GitHub CTA -->
	<section class="github-cta">
		<div class="glass-card p-8 text-center">
			<h2 class="text-2xl font-bold mb-4">Open Source</h2>
			<p class="text-text-secondary mb-6">
				Many of our tools and SDKs are open source. Contribute to the privacy revolution.
			</p>
			<a
				href="https://github.com/vuappstore"
				target="_blank"
				rel="noopener noreferrer"
				class="btn btn-primary"
			>
				<GitBranch class="w-4 h-4" />
				View on GitHub
			</a>
		</div>
	</section>
</div>
