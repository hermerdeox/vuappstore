<script lang="ts">
	import { Heart, Code, Bug, Lightbulb, Users, Gift, ExternalLink, Mail } from 'lucide-svelte';

	const contributionTypes = [
		{
			icon: Code,
			title: "Code Contributions",
			description: "Help build the future of privacy-first software",
			items: [
				"Frontend development (Svelte, React, Vue)",
				"Backend development (Node.js, Python, Go, Rust)",
				"Mobile development (React Native, Flutter)",
				"DevOps and infrastructure",
				"Security and cryptography"
			]
		},
		{
			icon: Bug,
			title: "Bug Reports & Testing",
			description: "Help us maintain the highest quality standards",
			items: [
				"Report bugs and security vulnerabilities",
				"Test new features and provide feedback",
				"Perform security audits and penetration testing",
				"Cross-platform compatibility testing",
				"Performance testing and optimization"
			]
		},
		{
			icon: Lightbulb,
			title: "Ideas & Design",
			description: "Shape the future of privacy-focused applications",
			items: [
				"UX/UI design and user research",
				"Privacy-first feature suggestions",
				"Technical architecture proposals",
				"Documentation improvements",
				"Accessibility enhancements"
			]
		},
		{
			icon: Users,
			title: "Community Building",
			description: "Help grow the privacy-first movement",
			items: [
				"Community moderation and support",
				"Content creation and tutorials",
				"Speaking at conferences and events",
				"Social media advocacy",
				"Translation and localization"
			]
		}
	];

	const openPositions = [
		{
			title: "Senior Privacy Engineer",
			type: "Full-time",
			location: "Remote",
			description: "Lead the development of zero-knowledge systems and privacy-preserving technologies.",
			requirements: ["5+ years cryptography experience", "Rust or Go proficiency", "Zero-knowledge protocols"],
			salary: "$180k - $250k"
		},
		{
			title: "Frontend Developer",
			type: "Full-time", 
			location: "Remote",
			description: "Build beautiful, privacy-first user interfaces for VU Suite applications.",
			requirements: ["React/Svelte expertise", "TypeScript proficiency", "Privacy UX experience"],
			salary: "$120k - $180k"
		},
		{
			title: "DevOps Engineer",
			type: "Full-time",
			location: "Remote",
			description: "Maintain secure, scalable infrastructure for privacy-critical applications.",
			requirements: ["Kubernetes experience", "Security-first mindset", "AWS/GCP expertise"],
			salary: "$140k - $200k"
		},
		{
			title: "Technical Writer",
			type: "Contract",
			location: "Remote",
			description: "Create comprehensive documentation for developers and end users.",
			requirements: ["Technical writing portfolio", "Developer documentation experience", "Privacy knowledge"],
			salary: "$80 - $120/hour"
		}
	];

	const benefits = [
		"100% remote work with flexible hours",
		"Equity participation in privacy revolution",
		"Top-tier health, dental, and vision insurance",
		"$5,000 annual learning and development budget",
		"Latest MacBook Pro and home office setup",
		"4-day work week (32 hours)",
		"Unlimited PTO policy",
		"Annual privacy conference attendance"
	];
</script>

<svelte:head>
	<title>Contribute - VuAppStore Developers</title>
	<meta name="description" content="Join the privacy revolution. Contribute to VuAppStore through code, design, testing, or community building. Open positions available." />
</svelte:head>

<div class="container py-16">
	<div class="max-w-6xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-16">
			<div class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
				<Heart class="w-4 h-4 text-primary" />
				<span class="text-xs font-semibold text-primary uppercase tracking-wide">Contribute</span>
			</div>
			<h1 class="text-4xl md:text-6xl font-black leading-tight mb-6 text-gradient">
				Join the Privacy<br>Revolution
			</h1>
			<p class="text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
				Help us build the future of privacy-first technology. Whether you're a developer, designer, 
				security researcher, or privacy advocate, there's a place for you in the VU community.
			</p>
		</div>

		<!-- Ways to Contribute -->
		<div class="mb-20">
			<h2 class="text-3xl font-bold text-center mb-12">Ways to Contribute</h2>
			<div class="grid md:grid-cols-2 gap-8">
				{#each contributionTypes as type}
					<div class="glass-card p-8">
						<div class="flex items-center gap-4 mb-6">
							<div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
								<svelte:component this={type.icon} class="w-6 h-6 text-primary" />
							</div>
							<div>
								<h3 class="text-xl font-bold">{type.title}</h3>
								<p class="text-text-secondary text-sm">{type.description}</p>
							</div>
						</div>
						<ul class="space-y-2">
							{#each type.items as item}
								<li class="flex items-start gap-3 text-sm text-text-secondary">
									<div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
									<span>{item}</span>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>

		<!-- Open Positions -->
		<div class="mb-20">
			<h2 class="text-3xl font-bold text-center mb-12">Open Positions</h2>
			<div class="space-y-6">
				{#each openPositions as position}
					<div class="glass-card p-8">
						<div class="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
							<div>
								<h3 class="text-2xl font-bold mb-2">{position.title}</h3>
								<div class="flex items-center gap-4 text-sm text-text-secondary">
									<span class="px-3 py-1 bg-primary/20 text-primary rounded-full">{position.type}</span>
									<span>{position.location}</span>
									<span class="font-semibold text-success">{position.salary}</span>
								</div>
							</div>
							<a href="/support/contact" class="btn btn-primary mt-4 lg:mt-0">
								Apply Now
							</a>
						</div>
						<p class="text-text-secondary mb-4">{position.description}</p>
						<div>
							<h4 class="font-semibold mb-2">Requirements:</h4>
							<ul class="flex flex-wrap gap-2">
								{#each position.requirements as req}
									<li class="px-3 py-1 bg-glass text-xs rounded-full border border-border">
										{req}
									</li>
								{/each}
							</ul>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Benefits -->
		<div class="glass-card p-8 md:p-12 mb-16">
			<h2 class="text-3xl font-bold text-center mb-8">Why Work With Us?</h2>
			<div class="grid md:grid-cols-2 gap-6">
				{#each benefits as benefit}
					<div class="flex items-center gap-3">
						<div class="w-2 h-2 bg-success rounded-full flex-shrink-0"></div>
						<span class="text-text-secondary">{benefit}</span>
					</div>
				{/each}
			</div>
		</div>

		<!-- Community Guidelines -->
		<div class="mb-16">
			<h2 class="text-3xl font-bold text-center mb-8">Community Guidelines</h2>
			<div class="grid md:grid-cols-3 gap-6">
				<div class="glass-card p-6 text-center">
					<div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
						<Heart class="w-6 h-6 text-primary" />
					</div>
					<h3 class="text-lg font-bold mb-3">Be Respectful</h3>
					<p class="text-text-secondary text-sm">
						Treat all community members with respect and kindness. We're all working toward the same goal.
					</p>
				</div>
				<div class="glass-card p-6 text-center">
					<div class="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
						<Users class="w-6 h-6 text-success" />
					</div>
					<h3 class="text-lg font-bold mb-3">Be Inclusive</h3>
					<p class="text-text-secondary text-sm">
						Welcome newcomers and help create an environment where everyone can contribute effectively.
					</p>
				</div>
				<div class="glass-card p-6 text-center">
					<div class="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
						<Lightbulb class="w-6 h-6 text-warning" />
					</div>
					<h3 class="text-lg font-bold mb-3">Be Constructive</h3>
					<p class="text-text-secondary text-sm">
						Provide helpful feedback and suggestions. Focus on solutions rather than just problems.
					</p>
				</div>
			</div>
		</div>

		<!-- Getting Started -->
		<div class="text-center">
			<h2 class="text-3xl font-bold mb-6">Ready to Get Started?</h2>
			<p class="text-text-secondary mb-8 max-w-2xl mx-auto">
				Join thousands of developers, designers, and privacy advocates who are building 
				the future of technology. Every contribution, no matter how small, makes a difference.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a href="https://github.com/vuappstore" class="btn btn-primary" target="_blank" rel="noopener">
					<ExternalLink class="w-4 h-4" />
					View on GitHub
				</a>
				<a href="/support/contact" class="btn btn-secondary">
					<Mail class="w-4 h-4" />
					Contact Us
				</a>
				<a href="https://discord.gg/vuappstore" class="btn btn-secondary" target="_blank" rel="noopener">
					<Users class="w-4 h-4" />
					Join Discord
				</a>
			</div>
		</div>
	</div>
</div>
