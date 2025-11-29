<script lang="ts">
	import { Clock } from 'lucide-svelte';

	export let title: string;
	export let lastUpdated: string;
</script>

<div class="legal-page container py-16 max-w-4xl relative z-10">
	<div class="legal-header mb-12">
		<h1 class="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
		<div class="flex items-center gap-2 text-sm text-text-secondary">
			<Clock class="w-4 h-4" />
			<span>Last Updated: {lastUpdated}</span>
		</div>
	</div>

	<div class="legal-content prose prose-invert prose-primary max-w-none">
		<slot />
	</div>

	<div class="legal-footer mt-12 p-6 bg-glass border border-border rounded-2xl">
		<h3 class="text-lg font-semibold mb-2">Questions?</h3>
		<p class="text-sm text-text-secondary mb-4">
			If you have any questions about this {title.toLowerCase()}, please contact us at:
		</p>
		<a href="mailto:legal@vuappstore.com" class="text-primary font-semibold hover:underline">
			legal@vuappstore.com
		</a>
	</div>
</div>

<style>
	:global(.legal-content) {
		color: var(--text-secondary);
		line-height: 1.75;
	}

	:global(.legal-content h2) {
		font-size: 1.5rem;
		font-weight: bold;
		color: var(--text-primary);
		margin-top: 3rem;
		margin-bottom: 1rem;
	}

	:global(.legal-content h3) {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-top: 2rem;
		margin-bottom: 0.75rem;
	}

	:global(.legal-content p) {
		margin-bottom: 1rem;
	}

	:global(.legal-content ul) {
		margin-bottom: 1rem;
		margin-left: 1.5rem;
		list-style-type: disc;
	}

	:global(.legal-content ol) {
		margin-bottom: 1rem;
		margin-left: 1.5rem;
		list-style-type: decimal;
	}

	:global(.legal-content ul li) {
		margin-bottom: 0.5rem;
	}

	:global(.legal-content ol li) {
		margin-bottom: 0.5rem;
	}

	:global(.legal-content li) {
		list-style-type: disc;
	}

	:global(.legal-content a) {
		color: #00d4ff;
		text-decoration: none;
	}

	:global(.legal-content a:hover) {
		text-decoration: underline;
	}

	:global(.legal-content strong) {
		color: var(--text-primary);
		font-weight: 600;
	}
</style>
