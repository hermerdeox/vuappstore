<script lang="ts">
	import { Shield, Bug, Award, AlertTriangle, DollarSign, Users, ExternalLink } from 'lucide-svelte';

	const bountyTiers = [
		{
			severity: "Critical",
			color: "error",
			reward: "$10,000 - $50,000",
			description: "Remote code execution, authentication bypass, data breach",
			examples: [
				"Remote code execution on production servers",
				"Authentication bypass allowing admin access", 
				"SQL injection leading to data exposure",
				"Zero-day vulnerabilities in cryptographic implementations"
			]
		},
		{
			severity: "High",
			color: "warning", 
			reward: "$2,500 - $10,000",
			description: "Privilege escalation, sensitive data exposure, major security flaws",
			examples: [
				"Privilege escalation vulnerabilities",
				"Sensitive data exposure through API endpoints",
				"Cross-site scripting (XSS) in admin panels",
				"Insecure direct object references"
			]
		},
		{
			severity: "Medium",
			color: "primary",
			reward: "$500 - $2,500", 
			description: "Information disclosure, CSRF, business logic flaws",
			examples: [
				"Cross-site request forgery (CSRF)",
				"Information disclosure vulnerabilities",
				"Business logic flaws",
				"Insecure file upload mechanisms"
			]
		},
		{
			severity: "Low",
			color: "success",
			reward: "$100 - $500",
			description: "Minor security issues, configuration problems",
			examples: [
				"Missing security headers",
				"Information leakage in error messages",
				"Weak password policies",
				"Minor configuration issues"
			]
		}
	];

	const rules = [
		{
			title: "Scope",
			items: [
				"All VuAppStore domains and subdomains",
				"VU Suite mobile applications",
				"API endpoints and services",
				"Open source repositories"
			]
		},
		{
			title: "Out of Scope",
			items: [
				"Third-party services (AWS, CDN, etc.) - Note: No payment processors, we use crypto",
				"Social engineering attacks",
				"Physical security issues",
				"Denial of service attacks"
			]
		},
		{
			title: "Responsible Disclosure",
			items: [
				"Report vulnerabilities privately first",
				"Allow 90 days for remediation",
				"Do not access user data",
				"Do not disrupt services"
			]
		}
	];

	const hallOfFame = [
		{
			name: "Alex Chen",
			country: "🇺🇸 USA",
			vulnerabilities: 12,
			totalReward: "$45,000",
			specialization: "Cryptography"
		},
		{
			name: "Maria Rodriguez", 
			country: "🇪🇸 Spain",
			vulnerabilities: 8,
			totalReward: "$28,500",
			specialization: "Web Security"
		},
		{
			name: "Hiroshi Tanaka",
			country: "🇯🇵 Japan", 
			vulnerabilities: 15,
			totalReward: "$52,000",
			specialization: "Mobile Security"
		},
		{
			name: "Sarah Johnson",
			country: "🇨🇦 Canada",
			vulnerabilities: 6,
			totalReward: "$19,200",
			specialization: "API Security"
		}
	];
</script>

<svelte:head>
	<title>Bug Bounty Program - VuAppStore Developers</title>
	<meta name="description" content="VuAppStore Bug Bounty Program. Help secure privacy-first applications and earn rewards up to $50,000 for critical vulnerabilities." />
</svelte:head>

<div class="container py-16">
	<div class="max-w-6xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-16">
			<div class="inline-flex items-center gap-2 px-4 py-2 bg-error/10 border border-error/30 rounded-full mb-6">
				<Bug class="w-4 h-4 text-error" />
				<span class="text-xs font-semibold text-error uppercase tracking-wide">Bug Bounty Program</span>
			</div>
			<h1 class="text-4xl md:text-6xl font-black leading-tight mb-6 text-gradient">
				Help Secure the<br>Privacy Revolution
			</h1>
			<p class="text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
				Join our mission to build the most secure privacy-first platform. Find vulnerabilities, 
				get rewarded, and help protect millions of users' data and privacy.
			</p>
		</div>

		<!-- Program Stats -->
		<div class="grid md:grid-cols-4 gap-6 mb-16">
			<div class="glass-card p-6 text-center">
				<div class="text-3xl font-bold text-primary mb-2">$500K+</div>
				<div class="text-sm text-text-secondary">Total Rewards Paid</div>
			</div>
			<div class="glass-card p-6 text-center">
				<div class="text-3xl font-bold text-success mb-2">150+</div>
				<div class="text-sm text-text-secondary">Vulnerabilities Fixed</div>
			</div>
			<div class="glass-card p-6 text-center">
				<div class="text-3xl font-bold text-warning mb-2">24h</div>
				<div class="text-sm text-text-secondary">Average Response Time</div>
			</div>
			<div class="glass-card p-6 text-center">
				<div class="text-3xl font-bold text-error mb-2">90%</div>
				<div class="text-sm text-text-secondary">Researcher Satisfaction</div>
			</div>
		</div>

		<!-- Bounty Tiers -->
		<div class="mb-16">
			<h2 class="text-3xl font-bold text-center mb-12">Bounty Tiers</h2>
			<div class="space-y-6">
				{#each bountyTiers as tier}
					<div class="glass-card p-8">
						<div class="flex items-center justify-between mb-6">
							<div class="flex items-center gap-4">
								<div class="w-12 h-12 bg-{tier.color}/10 rounded-lg flex items-center justify-center">
									<AlertTriangle class="w-6 h-6 text-{tier.color}" />
								</div>
								<div>
									<h3 class="text-2xl font-bold text-{tier.color}">{tier.severity}</h3>
									<p class="text-text-secondary">{tier.description}</p>
								</div>
							</div>
							<div class="text-right">
								<div class="text-2xl font-bold text-{tier.color}">{tier.reward}</div>
								<div class="text-sm text-text-secondary">Reward Range</div>
							</div>
						</div>
						<div>
							<h4 class="font-semibold mb-3">Examples:</h4>
							<ul class="grid md:grid-cols-2 gap-2">
								{#each tier.examples as example}
									<li class="flex items-start gap-3 text-sm text-text-secondary">
										<div class="w-2 h-2 bg-{tier.color} rounded-full mt-2 flex-shrink-0"></div>
										<span>{example}</span>
									</li>
								{/each}
							</ul>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Program Rules -->
		<div class="mb-16">
			<h2 class="text-3xl font-bold text-center mb-12">Program Rules</h2>
			<div class="grid md:grid-cols-3 gap-6">
				{#each rules as section}
					<div class="glass-card p-6">
						<h3 class="text-xl font-bold mb-4">{section.title}</h3>
						<ul class="space-y-2">
							{#each section.items as item}
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

		<!-- Submission Process -->
		<div class="glass-card p-8 md:p-12 mb-16">
			<h2 class="text-3xl font-bold text-center mb-8">How to Submit</h2>
			<div class="grid md:grid-cols-4 gap-6">
				<div class="text-center">
					<div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
						<span class="text-xl font-bold text-primary">1</span>
					</div>
					<h3 class="font-semibold mb-2">Discover</h3>
					<p class="text-text-secondary text-sm">Find a security vulnerability in our systems</p>
				</div>
				<div class="text-center">
					<div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
						<span class="text-xl font-bold text-primary">2</span>
					</div>
					<h3 class="font-semibold mb-2">Document</h3>
					<p class="text-text-secondary text-sm">Create a detailed report with steps to reproduce</p>
				</div>
				<div class="text-center">
					<div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
						<span class="text-xl font-bold text-primary">3</span>
					</div>
					<h3 class="font-semibold mb-2">Submit</h3>
					<p class="text-text-secondary text-sm">Send your report to security@vuappstore.com</p>
				</div>
				<div class="text-center">
					<div class="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
						<span class="text-xl font-bold text-success">4</span>
					</div>
					<h3 class="font-semibold mb-2">Get Rewarded</h3>
					<p class="text-text-secondary text-sm">Receive your bounty after verification</p>
				</div>
			</div>
		</div>

		<!-- Hall of Fame -->
		<div class="mb-16">
			<h2 class="text-3xl font-bold text-center mb-12">Hall of Fame</h2>
			<div class="grid md:grid-cols-2 gap-6">
				{#each hallOfFame as researcher}
					<div class="glass-card p-6">
						<div class="flex items-center justify-between mb-4">
							<div>
								<h3 class="text-lg font-bold">{researcher.name}</h3>
								<p class="text-text-secondary text-sm">{researcher.country}</p>
							</div>
							<div class="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
								<Award class="w-6 h-6 text-warning" />
							</div>
						</div>
						<div class="grid grid-cols-3 gap-4 text-center">
							<div>
								<div class="text-xl font-bold text-primary">{researcher.vulnerabilities}</div>
								<div class="text-xs text-text-secondary">Vulnerabilities</div>
							</div>
							<div>
								<div class="text-xl font-bold text-success">{researcher.totalReward}</div>
								<div class="text-xs text-text-secondary">Total Earned</div>
							</div>
							<div>
								<div class="text-sm font-semibold text-warning">{researcher.specialization}</div>
								<div class="text-xs text-text-secondary">Specialty</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Call to Action -->
		<div class="text-center">
			<h2 class="text-3xl font-bold mb-6">Ready to Start Hunting?</h2>
			<p class="text-text-secondary mb-8 max-w-2xl mx-auto">
				Join our community of security researchers and help us build the most secure 
				privacy-first platform in the world. Every vulnerability you find makes the internet safer.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a href="mailto:security@vuappstore.com" class="btn btn-primary">
					<Bug class="w-4 h-4" />
					Submit Vulnerability
				</a>
				<a href="/developers/docs/security" class="btn btn-secondary">
					<Shield class="w-4 h-4" />
					Security Guidelines
				</a>
				<a href="https://github.com/vuappstore/security" class="btn btn-secondary" target="_blank" rel="noopener">
					<ExternalLink class="w-4 h-4" />
					Security Repository
				</a>
			</div>
		</div>
	</div>
</div>
