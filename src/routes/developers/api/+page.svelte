<script lang="ts">
	import { Code, Key, Shield, Zap, Book, ExternalLink } from 'lucide-svelte';

	const endpoints = [
		{
			method: 'GET',
			path: '/api/v1/apps',
			description: 'Retrieve all available apps with privacy scores and metadata',
			auth: 'API Key',
			response: 'Array of app objects'
		},
		{
			method: 'GET', 
			path: '/api/v1/apps/{id}',
			description: 'Get detailed information about a specific app',
			auth: 'API Key',
			response: 'App object with full details'
		},
		{
			method: 'GET',
			path: '/api/v1/user/subscriptions',
			description: 'Get user subscription status and active apps',
			auth: 'Bearer Token',
			response: 'Subscription object'
		},
		{
			method: 'POST',
			path: '/api/v1/downloads',
			description: 'Generate secure download link for subscribed apps',
			auth: 'Bearer Token',
			response: 'Temporary download URL'
		}
	];

	const sdks = [
		{
			name: 'JavaScript/TypeScript',
			description: 'Official SDK for web and Node.js applications',
			install: 'npm install @vuappstore/sdk',
			docs: '/developers/docs/javascript'
		},
		{
			name: 'Python',
			description: 'Python SDK for backend integrations',
			install: 'pip install vuappstore-sdk',
			docs: '/developers/docs/python'
		},
		{
			name: 'Go',
			description: 'Go SDK for high-performance applications',
			install: 'go get github.com/vuappstore/go-sdk',
			docs: '/developers/docs/go'
		}
	];
</script>

<svelte:head>
	<title>API Documentation - VuAppStore Developers</title>
	<meta name="description" content="VuAppStore API documentation. Build privacy-first integrations with our secure, well-documented REST API." />
</svelte:head>

<div class="container py-16">
	<div class="max-w-6xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-16">
			<div class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
				<Code class="w-4 h-4 text-primary" />
				<span class="text-xs font-semibold text-primary uppercase tracking-wide">API Documentation</span>
			</div>
			<h1 class="text-4xl md:text-6xl font-black leading-tight mb-6 text-gradient">
				VuAppStore API
			</h1>
			<p class="text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
				Build privacy-first integrations with our secure, well-documented REST API. Access app metadata, 
				manage subscriptions, and generate secure downloads—all while maintaining user privacy.
			</p>
		</div>

		<!-- Quick Start -->
		<div class="glass-card p-8 mb-16">
			<h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
				<Zap class="w-6 h-6 text-primary" />
				Quick Start
			</h2>
			<div class="grid md:grid-cols-2 gap-8">
				<div>
					<h3 class="text-lg font-semibold mb-4">1. Get Your API Key</h3>
					<p class="text-text-secondary mb-4">
						Generate your API key from the developer dashboard to authenticate your requests.
					</p>
					<a href="/account" class="btn btn-primary btn-sm">
						Get API Key
					</a>
				</div>
				<div>
					<h3 class="text-lg font-semibold mb-4">2. Make Your First Request</h3>
					<div class="bg-black/50 rounded-lg p-4 font-mono text-sm">
						<div class="text-success">curl -H "X-API-Key: your_key_here" \</div>
						<div class="text-primary">  https://api.vuappstore.com/v1/apps</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Authentication -->
		<div class="mb-16">
			<h2 class="text-3xl font-bold mb-8 flex items-center gap-3">
				<Key class="w-8 h-8 text-warning" />
				Authentication
			</h2>
			<div class="grid md:grid-cols-2 gap-8">
				<div class="glass-card p-6">
					<h3 class="text-xl font-semibold mb-4">API Key Authentication</h3>
					<p class="text-text-secondary mb-4">
						For public endpoints like app listings and metadata. Include your API key in the header:
					</p>
					<div class="bg-black/50 rounded-lg p-4 font-mono text-sm">
						<div class="text-primary">X-API-Key: your_api_key_here</div>
					</div>
				</div>
				<div class="glass-card p-6">
					<h3 class="text-xl font-semibold mb-4">Bearer Token Authentication</h3>
					<p class="text-text-secondary mb-4">
						For user-specific endpoints like subscriptions and downloads. Use OAuth 2.0 bearer tokens:
					</p>
					<div class="bg-black/50 rounded-lg p-4 font-mono text-sm">
						<div class="text-success">Authorization: Bearer your_token_here</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Endpoints -->
		<div class="mb-16">
			<h2 class="text-3xl font-bold mb-8">API Endpoints</h2>
			<div class="space-y-6">
				{#each endpoints as endpoint}
					<div class="glass-card p-6">
						<div class="flex items-start justify-between mb-4">
							<div class="flex items-center gap-4">
								<span class="px-3 py-1 bg-primary/20 text-primary text-xs font-mono rounded-full">
									{endpoint.method}
								</span>
								<code class="text-lg font-mono">{endpoint.path}</code>
							</div>
							<span class="px-3 py-1 bg-success/20 text-success text-xs rounded-full">
								{endpoint.auth}
							</span>
						</div>
						<p class="text-text-secondary mb-4">{endpoint.description}</p>
						<div class="text-sm">
							<strong>Response:</strong> <span class="text-primary">{endpoint.response}</span>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- SDKs -->
		<div class="mb-16">
			<h2 class="text-3xl font-bold mb-8">Official SDKs</h2>
			<div class="grid md:grid-cols-3 gap-6">
				{#each sdks as sdk}
					<div class="glass-card p-6">
						<h3 class="text-xl font-semibold mb-3">{sdk.name}</h3>
						<p class="text-text-secondary text-sm mb-4">{sdk.description}</p>
						<div class="bg-black/50 rounded-lg p-3 font-mono text-sm mb-4">
							<div class="text-success">{sdk.install}</div>
						</div>
						<a href={sdk.docs} class="btn btn-secondary btn-sm w-full">
							View Documentation
						</a>
					</div>
				{/each}
			</div>
		</div>

		<!-- Rate Limits -->
		<div class="mb-16">
			<h2 class="text-3xl font-bold mb-8">Rate Limits & Security</h2>
			<div class="grid md:grid-cols-2 gap-8">
				<div class="glass-card p-6">
					<h3 class="text-xl font-semibold mb-4 flex items-center gap-3">
						<Shield class="w-6 h-6 text-success" />
						Rate Limits
					</h3>
					<ul class="space-y-2 text-text-secondary">
						<li>• <strong>Free Tier:</strong> 1,000 requests/hour</li>
						<li>• <strong>Pro Tier:</strong> 10,000 requests/hour</li>
						<li>• <strong>Enterprise:</strong> Custom limits</li>
						<li>• <strong>Burst:</strong> 2x limit for 5 minutes</li>
					</ul>
				</div>
				<div class="glass-card p-6">
					<h3 class="text-xl font-semibold mb-4 flex items-center gap-3">
						<Shield class="w-6 h-6 text-primary" />
						Security Features
					</h3>
					<ul class="space-y-2 text-text-secondary">
						<li>• TLS 1.3 encryption for all requests</li>
						<li>• API key rotation and management</li>
						<li>• Request signing for sensitive operations</li>
						<li>• IP whitelisting available</li>
					</ul>
				</div>
			</div>
		</div>

		<!-- Example Response -->
		<div class="mb-16">
			<h2 class="text-3xl font-bold mb-8">Example Response</h2>
			<div class="glass-card p-6">
				<h3 class="text-lg font-semibold mb-4">GET /api/v1/apps/vuvault</h3>
				<div class="bg-black/50 rounded-lg p-6 font-mono text-sm overflow-x-auto">
					<pre class="text-text-secondary">{JSON.stringify({
						"id": "vuvault",
						"name": "VuVault",
						"tagline": "Military-grade encrypted file storage",
						"category": "Security",
						"privacy_score": 5,
						"privacy_name": "Zero-Knowledge",
						"description": "Military-grade encrypted file storage with zero-knowledge architecture",
						"features": [
							{
								"icon": "shield",
								"title": "End-to-End Encryption",
								"description": "AES-256 encryption with client-side key generation"
							}
						],
						"pricing": {
							"monthly": 9.99,
							"yearly": 99.99,
							"lifetime": 299.99
						},
						"status": "available",
						"downloads": 15420,
						"rating": 4.9,
						"tech_stack": ["Rust", "WebAssembly", "React"]
					}, null, 2)}</pre>
				</div>
			</div>
		</div>

		<!-- Support -->
		<div class="text-center">
			<h2 class="text-3xl font-bold mb-6">Need Help?</h2>
			<p class="text-text-secondary mb-8 max-w-2xl mx-auto">
				Our developer support team is here to help you build amazing privacy-first integrations. 
				Get in touch if you need assistance or have questions about the API.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a href="/developers/docs" class="btn btn-primary">
					<Book class="w-4 h-4" />
					Full Documentation
				</a>
				<a href="/support/contact" class="btn btn-secondary">
					Contact Support
				</a>
				<a href="https://github.com/vuappstore/api-examples" class="btn btn-secondary" target="_blank" rel="noopener">
					<ExternalLink class="w-4 h-4" />
					Code Examples
				</a>
			</div>
		</div>
	</div>
</div>
