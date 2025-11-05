<script lang="ts">
	import { page } from '$app/stores';
	import { ShieldCheck, Lock, FileCheck, EyeOff } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { initTranslation } from '$lib/utils/i18n';
	import ThemeToggle from '$lib/components/theme/ThemeToggle.svelte';

	const footerSections = [
		{
			titleKey: 'footer.section.resources',
			links: [
				{ href: '/privacy-levels', labelKey: 'footer.link.privacy-levels', featured: true },
				{ href: '/resources/privacy-guide', labelKey: 'footer.link.privacy-guide' },
				{ href: '/resources/security-best-practices', labelKey: 'footer.link.security' },
				{ href: '/resources/comparison', labelKey: 'footer.link.comparison' },
				{ href: '/resources/migration', labelKey: 'footer.link.migration' },
				{ href: '/resources/educational', labelKey: 'footer.link.educational' },
				{ href: '/affiliate', labelKey: 'footer.link.affiliate' }
			]
		},
		{
			titleKey: 'footer.section.company',
			links: [
				{ href: '/about', labelKey: 'footer.link.about' },
				{ href: '/about/mission', labelKey: 'footer.link.mission' },
				{ href: '/about/team', labelKey: 'footer.link.team' },
				{ href: '/blog', labelKey: 'footer.link.blog' },
				{ href: '/support/contact', labelKey: 'footer.link.contact' },
				{ href: '/support', labelKey: 'footer.link.support' },
				{ href: '/support/faq', labelKey: 'footer.link.faq' }
			]
		},
		{
			titleKey: 'footer.section.legal',
			links: [
				{ href: '/legal/terms', labelKey: 'footer.link.terms' },
				{ href: '/legal/privacy', labelKey: 'footer.link.privacy' },
				{ href: '/legal/refund', labelKey: 'footer.link.refund' },
				{ href: '/legal/acceptable-use', labelKey: 'footer.link.acceptable-use' },
				{ href: '/legal/gdpr', labelKey: 'footer.link.gdpr-compliance' },
				{ href: '/legal/ccpa', labelKey: 'footer.link.ccpa' },
				{ href: '/legal/data-processing', labelKey: 'footer.link.data-processing' }
			]
		},
		{
			titleKey: 'footer.section.developers',
			links: [
				{ href: '/developers', labelKey: 'footer.link.developer-portal' },
				{ href: '/developers/api', labelKey: 'footer.link.api' },
				{ href: '/developers/docs', labelKey: 'footer.link.docs' },
				{ href: '/developers/contribute', labelKey: 'footer.link.contribute' },
				{ href: '/developers/bug-bounty', labelKey: 'footer.link.bug-bounty' },
				{ href: 'https://github.com/vuappstore', labelKey: 'footer.link.github', external: true }
			]
		}
	];

	const trustBadges = [
		{ nameKey: 'footer.trust.ssl', icon: Lock },
		{ nameKey: 'footer.trust.pci', icon: ShieldCheck },
		{ nameKey: 'footer.trust.gdpr', icon: FileCheck },
		{ nameKey: 'footer.trust.zerologs', icon: EyeOff }
	];

	onMount(() => {
		setTimeout(initTranslation, 100);
	});
</script>

<footer class="footer mt-16 pt-12 border-t border-border">
	<div class="container">
		<div class="footer-content">
			<!-- Main Footer Content -->
			<div class="footer-main grid grid-cols-1 lg:grid-cols-6 gap-8 mb-8">
				<div class="footer-brand lg:col-span-2">
					<div class="brand-logo flex items-center gap-3 mb-4">
						<span class="v-letter flex items-center justify-center w-10 h-10 bg-primary rounded-lg font-bold text-xl text-background">V</span>
						<span class="brand-text text-xl font-bold">VuAppStore</span>
					</div>
					<p class="brand-tagline text-primary text-sm font-semibold mb-2" data-i18n="footer.tagline">Your Privacy, Our Priority</p>
					<p class="brand-description text-text-secondary text-sm leading-relaxed mb-6" data-i18n="footer.description">
						Premium privacy-focused applications that respect your data. 
						No tracking, no surveillance, just powerful software.
					</p>
					
					<!-- Trust Badges -->
					<div class="trust-badges grid grid-cols-2 gap-3">
						{#each trustBadges as badge}
							<div class="badge flex items-center gap-2 p-2 bg-glass rounded-lg border border-border">
								<svelte:component this={badge.icon} class="w-4 h-4 text-success" />
								<span class="badge-text text-xs text-text-secondary" data-i18n={badge.nameKey}>SSL Secured</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- Footer Links Grid -->
				{#each footerSections as section}
					<div class="footer-section">
						<h4 class="text-sm font-semibold mb-4 text-text-primary" data-i18n={section.titleKey}>Resources</h4>
						<ul class="space-y-3">
							{#each section.links as link}
								<li>
									{#if link.external}
										<a 
											href={link.href} 
											target="_blank" 
											rel="noopener noreferrer"
											class="footer-link text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1"
											data-i18n={link.labelKey}
										>
											GitHub
											<span class="external-icon text-xs">↗</span>
										</a>
									{:else}
										<a 
											href={link.href} 
											class="footer-link text-sm transition-colors {link.featured ? 'text-primary font-semibold hover:text-primary-dark' : 'text-text-secondary hover:text-text-primary'}"
											class:active={$page.url.pathname === link.href}
											data-i18n={link.labelKey}
										>
											{#if link.featured}🛡️ {/if}Link
										</a>
									{/if}
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>

			<!-- Payment Methods & Certifications -->
			<div class="footer-payment grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-t border-border">
				<div class="payment-methods">
					<span class="payment-label text-xs text-text-tertiary mb-2 block" data-i18n="footer.payments">Privacy Payments via</span>
					<div class="payment-icons flex items-center gap-4 flex-wrap">
						<span class="payment-brand text-sm font-semibold" style="color: #3b82f6;">Monero</span>
						<span class="payment-brand text-sm font-semibold" style="color: #22c55e;">Lightning</span>
						<span class="payment-types text-xs text-text-tertiary">Bitcoin</span>
						<span class="payment-types text-xs text-text-tertiary">Ethereum</span>
						<span class="payment-types text-xs text-primary font-semibold">Crypto Only</span>
					</div>
				</div>
				<div class="certifications flex items-center gap-4 justify-start md:justify-end">
					<span class="text-xs text-text-tertiary">Zero Tracking</span>
					<span class="text-xs text-text-tertiary">ISO 27001</span>
					<span class="text-xs text-text-tertiary">Privacy Shield</span>
				</div>
			</div>

			<!-- Bottom Bar -->
			<div class="footer-bottom flex flex-col md:flex-row justify-between items-center gap-4 py-6 border-t border-border">
				<div class="footer-copyright text-center md:text-left">
					<p class="text-sm text-text-secondary mb-1" data-i18n="footer.copyright">© 2024 VuAppStore. All rights reserved.</p>
					<p class="footer-company text-xs text-text-tertiary" data-i18n="footer.company-info">
						VU Digital Privacy Solutions LLC | Delaware, USA
					</p>
				</div>
				<div class="footer-actions flex items-center gap-4">
					<ThemeToggle variant="footer" />
					<select class="language-select px-3 py-1.5 bg-glass border border-border rounded-lg text-xs text-text-secondary">
						<option value="en">English</option>
						<option value="es">Español</option>
						<option value="fr">Français</option>
					</select>
				</div>
			</div>

			<!-- VuApps Signature -->
			<div class="vuapps-signature text-center py-4 border-t border-border/50">
				<p class="text-[10px] text-text-tertiary tracking-wider">VUAPPS</p>
			</div>
		</div>
	</div>
</footer>

<style>
	.footer-link.active {
		color: var(--color-primary);
	}
</style>

