<script lang="ts">
	import { Book, Code, Shield, Zap, Users, ExternalLink, Download, GitBranch } from 'lucide-svelte';

	interface DocLink {
		title: string;
		href: string;
		external?: boolean;
	}

	interface DocSection {
		title: string;
		icon: typeof Zap;
		description: string;
		links: DocLink[];
	}

	const docSections: DocSection[] = [
		{
			title: "Getting Started",
			icon: Zap,
			description: "Quick start guides and basic concepts",
			links: [
				{ title: "API Overview", href: "/developers/api" },
				{ title: "Authentication", href: "/developers/docs/auth" },
				{ title: "Rate Limits", href: "/developers/docs/rate-limits" },
				{ title: "Error Handling", href: "/developers/docs/errors" }
			]
		},
		{
			title: "API Reference",
			icon: Code,
			description: "Complete API endpoint documentation",
			links: [
				{ title: "Apps API", href: "/developers/docs/apps-api" },
				{ title: "Users API", href: "/developers/docs/users-api" },
				{ title: "Subscriptions API", href: "/developers/docs/subscriptions-api" },
				{ title: "Downloads API", href: "/developers/docs/downloads-api" }
			]
		},
		{
			title: "SDKs & Libraries",
			icon: Download,
			description: "Official SDKs and community libraries",
			links: [
				{ title: "JavaScript/TypeScript SDK", href: "/developers/docs/javascript" },
				{ title: "Python SDK", href: "/developers/docs/python" },
				{ title: "Go SDK", href: "/developers/docs/go" },
				{ title: "Community Libraries", href: "/developers/docs/community" }
			]
		},
		{
			title: "Privacy & Security",
			icon: Shield,
			description: "Privacy-first development guidelines",
			links: [
				{ title: "Privacy by Design", href: "/developers/docs/privacy-design" },
				{ title: "Zero-Knowledge Architecture", href: "/developers/docs/zero-knowledge" },
				{ title: "Encryption Standards", href: "/developers/docs/encryption" },
				{ title: "Security Best Practices", href: "/developers/docs/security" }
			]
		},
		{
			title: "Integration Guides",
			icon: GitBranch,
			description: "Step-by-step integration tutorials",
			links: [
				{ title: "Web App Integration", href: "/developers/docs/web-integration" },
				{ title: "Mobile App Integration", href: "/developers/docs/mobile-integration" },
				{ title: "Server-to-Server", href: "/developers/docs/server-integration" },
				{ title: "Webhook Setup", href: "/developers/docs/webhooks" }
			]
		},
		{
			title: "Community",
			icon: Users,
			description: "Connect with other developers",
			links: [
				{ title: "Developer Forum", href: "https://forum.vuappstore.com", external: true },
				{ title: "GitHub Discussions", href: "https://github.com/vuappstore/discussions", external: true },
				{ title: "Discord Community", href: "https://discord.gg/vuappstore", external: true },
				{ title: "Stack Overflow", href: "https://stackoverflow.com/questions/tagged/vuappstore", external: true }
			]
		}
	];

	const codeExamples = [
		{
			title: "Fetch All Apps",
			language: "javascript",
			code: `import { VuAppStore } from '@vuappstore/sdk';

const client = new VuAppStore({
  apiKey: 'your_api_key_here'
});

const apps = await client.apps.list({
  category: 'security',
  privacy_level: 5
});

console.log(apps);`
		},
		{
			title: "Check Subscription",
			language: "python",
			code: `from vuappstore import VuAppStore

client = VuAppStore(api_key='your_api_key_here')

subscription = client.subscriptions.get(
    user_token='user_bearer_token'
)

if subscription.is_active:
    print("User has active subscription")
    print(f"Plan: {subscription.plan}")
    print(f"Apps: {len(subscription.apps)}")`
		},
		{
			title: "Generate Download Link",
			language: "go",
			code: `package main

import (
    "fmt"
    "github.com/vuappstore/go-sdk"
)

func main() {
    client := vuappstore.NewClient("your_api_key_here")
    
    download, err := client.Downloads.Create(&vuappstore.DownloadRequest{
        AppID: "vuvault",
        UserToken: "user_bearer_token",
    })
    
    if err != nil {
        panic(err)
    }
    
    fmt.Printf("Download URL: %s\\n", download.URL)
    fmt.Printf("Expires: %s\\n", download.ExpiresAt)
}`
		}
	];
</script>

<svelte:head>
	<title>Technical Documentation - VuAppStore Developers</title>
	<meta name="description" content="Complete technical documentation for VuAppStore API, SDKs, and privacy-first development practices." />
</svelte:head>

<div class="container py-16">
	<div class="max-w-6xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-16">
			<div class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
				<Book class="w-4 h-4 text-primary" />
				<span class="text-xs font-semibold text-primary uppercase tracking-wide">Technical Documentation</span>
			</div>
			<h1 class="text-4xl md:text-6xl font-black leading-tight mb-6 text-gradient">
				Developer Documentation
			</h1>
			<p class="text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
				Everything you need to build privacy-first applications with VuAppStore. 
				From quick start guides to advanced privacy engineering concepts.
			</p>
		</div>

		<!-- Documentation Sections -->
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
			{#each docSections as section}
				<div class="glass-card p-6 hover:scale-105 transition-transform duration-200">
					<div class="flex items-center gap-3 mb-4">
						<div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
							<svelte:component this={section.icon} class="w-5 h-5 text-primary" />
						</div>
						<h3 class="text-lg font-bold">{section.title}</h3>
					</div>
					<p class="text-text-secondary text-sm mb-4">{section.description}</p>
					<ul class="space-y-2">
						{#each section.links as link}
							<li>
								<a 
									href={link.href} 
									class="text-sm text-primary hover:text-primary-dark transition-colors flex items-center gap-2"
									target={link.external ? "_blank" : undefined}
									rel={link.external ? "noopener noreferrer" : undefined}
								>
									{link.title}
									{#if link.external}
										<ExternalLink class="w-3 h-3" />
									{/if}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<!-- Code Examples -->
		<div class="mb-16">
			<h2 class="text-3xl font-bold mb-8 text-center">Code Examples</h2>
			<div class="grid lg:grid-cols-3 gap-6">
				{#each codeExamples as example}
					<div class="glass-card p-6">
						<h3 class="text-lg font-semibold mb-4">{example.title}</h3>
						<div class="bg-black/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
							<pre class="text-text-secondary whitespace-pre-wrap">{example.code}</pre>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Privacy-First Development -->
		<div class="glass-card p-8 md:p-12 mb-16">
			<div class="text-center mb-8">
				<div class="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
					<Shield class="w-8 h-8 text-success" />
				</div>
				<h2 class="text-3xl font-bold mb-4">Privacy-First Development</h2>
				<p class="text-text-secondary max-w-2xl mx-auto">
					Learn how to build applications that respect user privacy by design, not as an afterthought.
				</p>
			</div>
			
			<div class="grid md:grid-cols-2 gap-8">
				<div>
					<h3 class="text-xl font-bold mb-4">Core Principles</h3>
					<ul class="space-y-3 text-text-secondary">
						<li class="flex items-start gap-3">
							<div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
							<span><strong>Data Minimization:</strong> Collect only what you absolutely need</span>
						</li>
						<li class="flex items-start gap-3">
							<div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
							<span><strong>Purpose Limitation:</strong> Use data only for stated purposes</span>
						</li>
						<li class="flex items-start gap-3">
							<div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
							<span><strong>Storage Limitation:</strong> Delete data when no longer needed</span>
						</li>
						<li class="flex items-start gap-3">
							<div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
							<span><strong>Transparency:</strong> Be clear about data practices</span>
						</li>
					</ul>
				</div>
				<div>
					<h3 class="text-xl font-bold mb-4">Technical Implementation</h3>
					<ul class="space-y-3 text-text-secondary">
						<li class="flex items-start gap-3">
							<div class="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
							<span><strong>End-to-End Encryption:</strong> Encrypt data before transmission</span>
						</li>
						<li class="flex items-start gap-3">
							<div class="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
							<span><strong>Zero-Knowledge Architecture:</strong> Server cannot access user data</span>
						</li>
						<li class="flex items-start gap-3">
							<div class="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
							<span><strong>Local Processing:</strong> Process data on-device when possible</span>
						</li>
						<li class="flex items-start gap-3">
							<div class="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
							<span><strong>Secure Deletion:</strong> Cryptographically erase data</span>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<!-- Support -->
		<div class="text-center">
			<h2 class="text-3xl font-bold mb-6">Developer Support</h2>
			<p class="text-text-secondary mb-8 max-w-2xl mx-auto">
				Our team of privacy engineers and developer advocates is here to help you build 
				amazing privacy-first applications. Get support, share ideas, and connect with the community.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a href="/developers/api" class="btn btn-primary">
					<Code class="w-4 h-4" />
					API Reference
				</a>
				<a href="/support/contact" class="btn btn-secondary">
					Technical Support
				</a>
				<a href="https://github.com/vuappstore" class="btn btn-secondary" target="_blank" rel="noopener">
					<ExternalLink class="w-4 h-4" />
					GitHub
				</a>
			</div>
		</div>
	</div>
</div>
