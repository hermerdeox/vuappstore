<script lang="ts">
	import { Shield, Lock, Eye, AlertTriangle, CheckCircle, Smartphone, Globe } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Security Best Practices - VuAppStore Resources</title>
	<meta
		name="description"
		content="Essential security best practices for digital privacy. Learn how to protect yourself online with VU Suite applications and security guidelines."
	/>
</svelte:head>

<div class="container py-16">
	<div class="max-w-6xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-16">
			<div
				class="inline-flex items-center gap-2 px-4 py-2 bg-error/10 border border-error/30 rounded-full mb-6"
			>
				<Shield class="w-4 h-4 text-error" />
				<span class="text-xs font-semibold text-error uppercase tracking-wide">Security Guide</span>
			</div>
			<h1 class="text-4xl md:text-6xl font-black leading-tight mb-6 text-gradient">
				Security Best<br />Practices Guide
			</h1>
			<p class="text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
				Comprehensive security guidelines to protect your digital life. Learn essential practices
				for staying safe online with privacy-first applications and security tools.
			</p>
		</div>

		<!-- Essential Security Practices -->
		<div class="mb-20">
			<h2 class="text-3xl font-bold text-center mb-12">Essential Security Practices</h2>
			<div class="grid md:grid-cols-2 gap-8">
				<div class="glass-card p-8">
					<div class="flex items-center gap-4 mb-6">
						<div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
							<Lock class="w-6 h-6 text-primary" />
						</div>
						<h3 class="text-xl font-bold">Strong Authentication</h3>
					</div>
					<ul class="space-y-3">
						<li class="flex items-start gap-3">
							<CheckCircle class="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
							<span class="text-text-secondary text-sm"
								>Use unique, complex passwords for every account</span
							>
						</li>
						<li class="flex items-start gap-3">
							<CheckCircle class="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
							<span class="text-text-secondary text-sm"
								>Enable two-factor authentication (2FA) everywhere</span
							>
						</li>
						<li class="flex items-start gap-3">
							<CheckCircle class="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
							<span class="text-text-secondary text-sm"
								>Use a privacy-focused password manager like VuPass</span
							>
						</li>
						<li class="flex items-start gap-3">
							<CheckCircle class="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
							<span class="text-text-secondary text-sm"
								>Consider hardware security keys for critical accounts</span
							>
						</li>
					</ul>
				</div>

				<div class="glass-card p-8">
					<div class="flex items-center gap-4 mb-6">
						<div class="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
							<Eye class="w-6 h-6 text-success" />
						</div>
						<h3 class="text-xl font-bold">Privacy Protection</h3>
					</div>
					<ul class="space-y-3">
						<li class="flex items-start gap-3">
							<CheckCircle class="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
							<span class="text-text-secondary text-sm"
								>Use VPN services for public Wi-Fi connections</span
							>
						</li>
						<li class="flex items-start gap-3">
							<CheckCircle class="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
							<span class="text-text-secondary text-sm"
								>Browse with privacy-focused browsers like VuBrowser</span
							>
						</li>
						<li class="flex items-start gap-3">
							<CheckCircle class="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
							<span class="text-text-secondary text-sm"
								>Use encrypted messaging apps for sensitive communications</span
							>
						</li>
						<li class="flex items-start gap-3">
							<CheckCircle class="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
							<span class="text-text-secondary text-sm"
								>Regularly review and limit app permissions</span
							>
						</li>
					</ul>
				</div>

				<div class="glass-card p-8">
					<div class="flex items-center gap-4 mb-6">
						<div class="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
							<Smartphone class="w-6 h-6 text-warning" />
						</div>
						<h3 class="text-xl font-bold">Device Security</h3>
					</div>
					<ul class="space-y-3">
						<li class="flex items-start gap-3">
							<CheckCircle class="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
							<span class="text-text-secondary text-sm"
								>Keep all devices updated with latest security patches</span
							>
						</li>
						<li class="flex items-start gap-3">
							<CheckCircle class="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
							<span class="text-text-secondary text-sm"
								>Enable full-disk encryption on all devices</span
							>
						</li>
						<li class="flex items-start gap-3">
							<CheckCircle class="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
							<span class="text-text-secondary text-sm"
								>Use secure lock screens with biometric authentication</span
							>
						</li>
						<li class="flex items-start gap-3">
							<CheckCircle class="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
							<span class="text-text-secondary text-sm">Install apps only from trusted sources</span
							>
						</li>
					</ul>
				</div>

				<div class="glass-card p-8">
					<div class="flex items-center gap-4 mb-6">
						<div class="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center">
							<AlertTriangle class="w-6 h-6 text-error" />
						</div>
						<h3 class="text-xl font-bold">Threat Awareness</h3>
					</div>
					<ul class="space-y-3">
						<li class="flex items-start gap-3">
							<CheckCircle class="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
							<span class="text-text-secondary text-sm"
								>Be cautious of phishing emails and suspicious links</span
							>
						</li>
						<li class="flex items-start gap-3">
							<CheckCircle class="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
							<span class="text-text-secondary text-sm"
								>Verify website authenticity before entering credentials</span
							>
						</li>
						<li class="flex items-start gap-3">
							<CheckCircle class="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
							<span class="text-text-secondary text-sm"
								>Avoid downloading software from untrusted sources</span
							>
						</li>
						<li class="flex items-start gap-3">
							<CheckCircle class="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
							<span class="text-text-secondary text-sm"
								>Be skeptical of unsolicited communications</span
							>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<!-- VU Suite Security -->
		<div class="glass-card p-8 md:p-12 mb-16">
			<div class="text-center mb-8">
				<div
					class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
				>
					<Shield class="w-8 h-8 text-primary" />
				</div>
				<h2 class="text-3xl font-bold mb-4">VU Suite Security Features</h2>
				<p class="text-text-secondary max-w-2xl mx-auto">
					Every VU application is built with security-first principles, providing military-grade
					protection for your personal data and digital activities.
				</p>
			</div>

			<div class="grid md:grid-cols-3 gap-8">
				<div class="text-center">
					<div
						class="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4"
					>
						<Lock class="w-6 h-6 text-success" />
					</div>
					<h3 class="font-bold mb-2">End-to-End Encryption</h3>
					<p class="text-text-secondary text-sm">
						AES-256 encryption protects all data before it leaves your device
					</p>
				</div>
				<div class="text-center">
					<div
						class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
					>
						<Eye class="w-6 h-6 text-primary" />
					</div>
					<h3 class="font-bold mb-2">Zero-Knowledge Architecture</h3>
					<p class="text-text-secondary text-sm">
						Even we cannot access your encrypted data or personal information
					</p>
				</div>
				<div class="text-center">
					<div
						class="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4"
					>
						<Shield class="w-6 h-6 text-warning" />
					</div>
					<h3 class="font-bold mb-2">Regular Security Audits</h3>
					<p class="text-text-secondary text-sm">
						Independent security researchers regularly audit our code and systems
					</p>
				</div>
			</div>
		</div>

		<!-- Call to Action -->
		<div class="text-center">
			<h2 class="text-3xl font-bold mb-6">Secure Your Digital Life</h2>
			<p class="text-text-secondary mb-8 max-w-2xl mx-auto">
				Take control of your security today. Start using privacy-first applications that protect
				your data with military-grade encryption and zero-knowledge architecture.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a href="/apps" class="btn btn-primary">
					<Shield class="w-4 h-4" />
					Explore Secure Apps
				</a>
				<a href="/resources/privacy-guide" class="btn btn-secondary"> Privacy Guide </a>
				<a href="/pricing" class="btn btn-secondary"> Get Protected </a>
			</div>
		</div>
	</div>
</div>
