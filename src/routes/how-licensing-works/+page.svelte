<script lang="ts">
	import { onMount } from 'svelte';
	import { Shield, Zap, Eye, Lock, Check, X, Globe, Wifi, WifiOff } from 'lucide-svelte';

	let currentStep = 0;
	let animationProgress = 0;

	const steps = [
		{
			title: 'You Generate',
			subtitle: 'A random 512-bit license seed',
			description:
				"Your device creates a completely random license identifier. This happens entirely on your device - we never see it.",
			icon: '🎲',
			technical: 'crypto.getRandomValues(new Uint8Array(64))'
		},
		{
			title: 'You Blind',
			subtitle: 'Mathematical scrambling',
			description:
				"Your license is mathematically 'blinded' using a random factor. Even we cannot reverse this to see your original license.",
			icon: '🔐',
			technical: 'L_blind = L × r^e mod n'
		},
		{
			title: 'We Sign',
			subtitle: 'Without seeing anything',
			description:
				"We sign the blinded license after verifying your Monero payment. We have no idea what we're signing - by design.",
			icon: '✍️',
			technical: 'S_blind = L_blind^d mod n'
		},
		{
			title: 'You Unblind',
			subtitle: 'Extract your valid signature',
			description:
				'You remove the blinding factor locally, revealing a valid VU signature on your original license. Magic!',
			icon: '✨',
			technical: 'S = S_blind × r^(-1) mod n'
		},
		{
			title: 'Verify Anywhere',
			subtitle: 'Offline, forever',
			description:
				'Your license can be verified offline using only our public key. No server contact. No tracking. No identity.',
			icon: '✅',
			technical: 'S^e mod n === L → Valid'
		}
	];

	onMount(() => {
		const interval = setInterval(() => {
			animationProgress = (animationProgress + 1) % 100;
		}, 50);

		return () => clearInterval(interval);
	});

	function nextStep() {
		currentStep = Math.min(currentStep + 1, steps.length - 1);
	}

	function prevStep() {
		currentStep = Math.max(currentStep - 1, 0);
	}
</script>

<svelte:head>
	<title>How Anonymous Licensing Works | VU Apps</title>
	<meta
		name="description"
		content="Learn how VU's zero-knowledge blind signature licensing system works. True privacy through mathematics, not promises."
	/>
</svelte:head>

<div class="page">
	<header class="hero">
		<div class="hero-content">
			<div class="hero-badge">ZERO-KNOWLEDGE LICENSING</div>
			<h1>We Sign Your License.<br />We Never See It.</h1>
			<p class="hero-subtitle">
				The first licensing system where the vendor <em>mathematically cannot</em> identify customers.
				Not "won't" - <strong>cannot</strong>.
			</p>
		</div>

		<div class="hero-visual">
			<div class="blind-animation">
				<div class="license-block original">
					<span>Your License</span>
					<code>7F3A...</code>
				</div>
				<div class="arrow">→</div>
				<div class="license-block blinded" style="--progress: {animationProgress}%">
					<span>Blinded</span>
					<code>????</code>
				</div>
				<div class="arrow">→</div>
				<div class="license-block signed">
					<span>Signed</span>
					<code>✓</code>
				</div>
			</div>
		</div>
	</header>

	<section class="comparison">
		<h2>Traditional vs VU Licensing</h2>

		<div class="comparison-grid">
			<div class="comparison-card traditional">
				<div class="card-header">
					<Eye class="card-icon-svg" />
					<h3>Traditional Licensing</h3>
				</div>
				<ul class="card-list">
					<li class="bad"><X class="list-icon" /> Server stores: Name, Email, Payment info</li>
					<li class="bad"><X class="list-icon" /> License tied to your identity</li>
					<li class="bad"><X class="list-icon" /> Usage tracked and logged</li>
					<li class="bad"><X class="list-icon" /> Data can be subpoenaed</li>
					<li class="bad"><X class="list-icon" /> Breaches expose customers</li>
					<li class="bad"><X class="list-icon" /> Requires internet for validation</li>
				</ul>
				<div class="card-footer">
					<span class="verdict bad">Privacy by Policy</span>
				</div>
			</div>

			<div class="comparison-card vu">
				<div class="card-header">
					<Shield class="card-icon-svg text-primary" />
					<h3>VU Anonymous Licensing</h3>
				</div>
				<ul class="card-list">
					<li class="good"><Check class="list-icon" /> Server stores: Nothing about you</li>
					<li class="good"><Check class="list-icon" /> License has no identity attached</li>
					<li class="good"><Check class="list-icon" /> Zero tracking possible</li>
					<li class="good"><Check class="list-icon" /> Nothing to subpoena</li>
					<li class="good"><Check class="list-icon" /> Breaches reveal nothing</li>
					<li class="good"><Check class="list-icon" /> Works 100% offline</li>
				</ul>
				<div class="card-footer">
					<span class="verdict good">Privacy by Mathematics</span>
				</div>
			</div>
		</div>
	</section>

	<section class="how-it-works">
		<h2>The Five Steps to Anonymous Licensing</h2>

		<div class="steps-container">
			<div class="steps-nav">
				{#each steps as step, i}
					<button
						class="step-dot"
						class:active={i === currentStep}
						class:completed={i < currentStep}
						on:click={() => (currentStep = i)}
					>
						{i + 1}
					</button>
				{/each}
			</div>

			<div class="step-content">
				<div class="step-icon">{steps[currentStep].icon}</div>
				<div class="step-number">Step {currentStep + 1} of {steps.length}</div>
				<h3 class="step-title">{steps[currentStep].title}</h3>
				<p class="step-subtitle">{steps[currentStep].subtitle}</p>
				<p class="step-description">{steps[currentStep].description}</p>

				<div class="step-technical">
					<code>{steps[currentStep].technical}</code>
				</div>

				<div class="step-controls">
					<button class="btn-secondary" on:click={prevStep} disabled={currentStep === 0}>
						← Previous
					</button>
					<button
						class="btn-primary"
						on:click={nextStep}
						disabled={currentStep === steps.length - 1}
					>
						Next →
					</button>
				</div>
			</div>

			<div class="step-diagram">
				{#if currentStep === 0}
					<div class="diagram-generate">
						<div class="device">
							<div class="device-screen">
								<div class="bits">
									{#each Array(8) as _, i}
										<span class="bit" style="animation-delay: {i * 0.1}s">
											{Math.random() > 0.5 ? '1' : '0'}
										</span>
									{/each}
								</div>
								<div class="label">512 random bits</div>
							</div>
						</div>
					</div>
				{:else if currentStep === 1}
					<div class="diagram-blind">
						<div class="formula">
							<span class="var">L</span>
							<span class="op">×</span>
							<span class="var">r<sup>e</sup></span>
							<span class="op">=</span>
							<span class="result">????</span>
						</div>
					</div>
				{:else if currentStep === 2}
					<div class="diagram-sign">
						<div class="server">
							<div class="server-label">VU Server</div>
							<div class="server-sees">
								<div class="sees-item">Payment: ✓</div>
								<div class="sees-item">License: ????</div>
								<div class="sees-item">Identity: ???</div>
							</div>
						</div>
					</div>
				{:else if currentStep === 3}
					<div class="diagram-unblind">
						<div class="formula">
							<span class="var">S<sub>blind</sub></span>
							<span class="op">×</span>
							<span class="var">r<sup>-1</sup></span>
							<span class="op">=</span>
							<span class="result good">Valid Sig!</span>
						</div>
					</div>
				{:else}
					<div class="diagram-verify">
						<div class="offline-badge">
							<WifiOff class="wifi-icon" />
							<span>Works Offline</span>
						</div>
						<div class="verify-result">
							<span class="checkmark">✓</span>
							<span>License Valid</span>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</section>

	<section class="what-we-know">
		<h2>What VU Knows About You</h2>

		<div class="knowledge-grid">
			<div class="knowledge-card">
				<div class="icon">👤</div>
				<h3>Your Identity</h3>
				<p class="value">Unknown</p>
				<p class="explanation">
					Monero payments are unlinkable. We receive funds without sender information.
				</p>
			</div>

			<div class="knowledge-card">
				<div class="icon">🎫</div>
				<h3>Your License</h3>
				<p class="value">Unknown</p>
				<p class="explanation">
					Blind signatures mean we sign without seeing. Mathematical certainty.
				</p>
			</div>

			<div class="knowledge-card">
				<div class="icon">📊</div>
				<h3>Your Usage</h3>
				<p class="value">Unknown</p>
				<p class="explanation">
					Offline verification means we're never contacted. Zero telemetry.
				</p>
			</div>

			<div class="knowledge-card">
				<div class="icon">🔗</div>
				<h3>Payment ↔ License Link</h3>
				<p class="value">Impossible</p>
				<p class="explanation">
					The blinding factor is destroyed after use. No way to correlate.
				</p>
			</div>
		</div>

		<div class="legal-statement">
			<h3>Legal Implications</h3>
			<p>
				Even with a court order, subpoena, or government demand, we <strong>cannot</strong> provide
				information about who purchased licenses because we do not possess this information. This is
				not a policy choice - it is a mathematical certainty built into the cryptographic protocol
				itself.
			</p>
		</div>
	</section>

	<section class="cryptography">
		<h2>The Mathematics</h2>

		<div class="crypto-explanation">
			<div class="crypto-card">
				<h3>RSA Blind Signatures</h3>
				<p>
					Invented by David Chaum in 1983, blind signatures allow a signer to sign a message without
					seeing its contents. VU uses RSA-2048 with a 512-bit license seed.
				</p>

				<div class="formula-block">
					<div class="formula-row">
						<span class="label">Blinding:</span>
						<code>L' = L × r<sup>e</sup> mod n</code>
					</div>
					<div class="formula-row">
						<span class="label">Signing:</span>
						<code>S' = L'<sup>d</sup> mod n</code>
					</div>
					<div class="formula-row">
						<span class="label">Unblinding:</span>
						<code>S = S' × r<sup>-1</sup> mod n</code>
					</div>
					<div class="formula-row">
						<span class="label">Verification:</span>
						<code>S<sup>e</sup> mod n = L</code>
					</div>
				</div>
			</div>

			<div class="crypto-card">
				<h3>Monero (XMR) Payments</h3>
				<p>
					Monero uses ring signatures, stealth addresses, and RingCT to make transactions completely
					untraceable. We verify payment occurred without knowing who sent it.
				</p>

				<ul class="crypto-features">
					<li>Ring signatures hide sender among decoys</li>
					<li>Stealth addresses hide recipient</li>
					<li>RingCT hides transaction amounts</li>
					<li>No blockchain analysis possible</li>
				</ul>
			</div>
		</div>
	</section>

	<section class="pricing">
		<h2>Transparent Pricing</h2>
		<p class="pricing-philosophy">512 bits × $0.01 = $5.12</p>

		<div class="pricing-grid">
			<div class="price-card">
				<h3>Monthly</h3>
				<div class="price">$5.12</div>
				<div class="price-calc">512 × $0.01</div>
				<p>~0.03 XMR</p>
			</div>

			<div class="price-card featured">
				<div class="featured-badge">BEST VALUE</div>
				<h3>Yearly</h3>
				<div class="price">$51.20</div>
				<div class="price-calc">512 × $0.10</div>
				<p>~0.30 XMR</p>
			</div>

			<div class="price-card">
				<h3>Lifetime</h3>
				<div class="price">$256</div>
				<div class="price-calc">256-bit legacy</div>
				<p>~1.50 XMR</p>
			</div>
		</div>
	</section>

	<section class="cta">
		<h2>Ready for True Privacy?</h2>
		<p>Your license. Your device. Your anonymity.</p>
		<a href="/apps" class="btn-primary large">Browse Apps</a>
	</section>
</div>

<style>
	.page {
		background: var(--color-background, #000);
		color: var(--color-text-primary, #fff);
		min-height: 100vh;
	}

	.hero {
		padding: 80px 24px;
		text-align: center;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.hero-badge {
		display: inline-block;
		padding: 8px 16px;
		background: rgba(0, 212, 255, 0.1);
		border: 1px solid rgba(0, 212, 255, 0.3);
		border-radius: 20px;
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.1em;
		color: var(--color-primary, #00d4ff);
		margin-bottom: 24px;
	}

	.hero h1 {
		font-size: clamp(32px, 6vw, 56px);
		font-weight: 700;
		line-height: 1.1;
		margin-bottom: 24px;
		background: linear-gradient(135deg, #fff 0%, var(--color-primary, #00d4ff) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hero-subtitle {
		font-size: 18px;
		color: var(--color-text-secondary, rgba(255, 255, 255, 0.7));
		max-width: 600px;
		margin: 0 auto 48px;
		line-height: 1.6;
	}

	.hero-visual {
		max-width: 600px;
		margin: 0 auto;
	}

	.blind-animation {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 16px;
		flex-wrap: wrap;
	}

	.license-block {
		padding: 16px 24px;
		border: 2px solid rgba(255, 255, 255, 0.2);
		background: rgba(255, 255, 255, 0.05);
		text-align: center;
	}

	.license-block span {
		display: block;
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-text-secondary, rgba(255, 255, 255, 0.6));
		margin-bottom: 8px;
	}

	.license-block code {
		font-family: monospace;
		font-size: 16px;
		color: var(--color-primary, #00d4ff);
	}

	.license-block.blinded {
		background: linear-gradient(
			90deg,
			rgba(255, 255, 255, 0.05) 0%,
			rgba(0, 212, 255, 0.1) var(--progress, 0%),
			rgba(255, 255, 255, 0.05) 100%
		);
	}

	.license-block.signed {
		border-color: rgba(34, 197, 94, 0.5);
	}

	.license-block.signed code {
		color: #22c55e;
	}

	.arrow {
		font-size: 24px;
		color: var(--color-text-tertiary, rgba(255, 255, 255, 0.3));
	}

	section {
		padding: 80px 24px;
		max-width: 1200px;
		margin: 0 auto;
	}

	section h2 {
		font-size: 32px;
		font-weight: 700;
		text-align: center;
		margin-bottom: 48px;
	}

	.comparison-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 32px;
	}

	.comparison-card {
		padding: 32px;
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(255, 255, 255, 0.02);
	}

	.comparison-card.vu {
		border-color: rgba(0, 212, 255, 0.3);
		background: rgba(0, 212, 255, 0.05);
	}

	.card-header {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 24px;
	}

	.card-icon-svg {
		width: 24px;
		height: 24px;
	}

	.card-header h3 {
		font-size: 18px;
		font-weight: 600;
	}

	.card-list {
		list-style: none;
		padding: 0;
		margin: 0 0 24px;
	}

	.card-list li {
		padding: 12px 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.list-icon {
		width: 14px;
		height: 14px;
		flex-shrink: 0;
	}

	.card-list li.bad .list-icon {
		color: #ef4444;
	}

	.card-list li.good .list-icon {
		color: #22c55e;
	}

	.verdict {
		display: inline-block;
		padding: 8px 16px;
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.verdict.bad {
		background: rgba(239, 68, 68, 0.1);
		color: #ef4444;
	}

	.verdict.good {
		background: rgba(34, 197, 94, 0.1);
		color: #22c55e;
	}

	.steps-container {
		display: grid;
		grid-template-columns: 1fr;
		gap: 48px;
	}

	@media (min-width: 768px) {
		.steps-container {
			grid-template-columns: 1fr 1fr;
		}
	}

	.steps-nav {
		display: flex;
		justify-content: center;
		gap: 16px;
		margin-bottom: 32px;
		grid-column: 1 / -1;
	}

	.step-dot {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: 2px solid rgba(255, 255, 255, 0.2);
		background: transparent;
		color: var(--color-text-secondary, rgba(255, 255, 255, 0.5));
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s;
	}

	.step-dot.active {
		border-color: var(--color-primary, #00d4ff);
		color: var(--color-primary, #00d4ff);
		background: rgba(0, 212, 255, 0.1);
	}

	.step-dot.completed {
		border-color: #22c55e;
		background: #22c55e;
		color: #000;
	}

	.step-content {
		text-align: center;
	}

	.step-icon {
		font-size: 48px;
		margin-bottom: 16px;
	}

	.step-number {
		font-size: 12px;
		color: var(--color-text-secondary, rgba(255, 255, 255, 0.5));
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: 8px;
	}

	.step-title {
		font-size: 24px;
		font-weight: 700;
		margin-bottom: 8px;
	}

	.step-subtitle {
		font-size: 16px;
		color: var(--color-primary, #00d4ff);
		margin-bottom: 16px;
	}

	.step-description {
		color: var(--color-text-secondary, rgba(255, 255, 255, 0.7));
		line-height: 1.6;
		margin-bottom: 24px;
	}

	.step-technical {
		background: rgba(0, 0, 0, 0.5);
		border: 1px solid rgba(255, 255, 255, 0.1);
		padding: 16px;
		margin-bottom: 24px;
	}

	.step-technical code {
		font-family: monospace;
		color: var(--color-primary, #00d4ff);
		font-size: 14px;
	}

	.step-controls {
		display: flex;
		justify-content: center;
		gap: 16px;
	}

	.step-diagram {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 200px;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.1);
		padding: 32px;
	}

	.diagram-generate .device {
		width: 200px;
		padding: 16px;
		border: 2px solid rgba(255, 255, 255, 0.2);
		background: rgba(0, 0, 0, 0.5);
	}

	.bits {
		display: flex;
		justify-content: center;
		gap: 4px;
		margin-bottom: 12px;
	}

	.bit {
		font-family: monospace;
		font-size: 20px;
		color: var(--color-primary, #00d4ff);
		animation: flicker 0.5s infinite;
	}

	@keyframes flicker {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	.formula {
		display: flex;
		align-items: center;
		gap: 12px;
		font-size: 24px;
		font-family: monospace;
	}

	.var {
		color: var(--color-primary, #00d4ff);
	}

	.op {
		color: var(--color-text-secondary, rgba(255, 255, 255, 0.5));
	}

	.result {
		color: #f59e0b;
	}

	.result.good {
		color: #22c55e;
	}

	.server {
		text-align: center;
	}

	.server-label {
		font-weight: 600;
		margin-bottom: 16px;
		padding: 8px 16px;
		background: rgba(255, 255, 255, 0.1);
		display: inline-block;
	}

	.sees-item {
		padding: 8px;
		margin-bottom: 8px;
		background: rgba(0, 0, 0, 0.3);
		font-family: monospace;
		font-size: 14px;
	}

	.offline-badge {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 20px;
		background: rgba(34, 197, 94, 0.1);
		border: 1px solid rgba(34, 197, 94, 0.3);
		margin-bottom: 16px;
	}

	.wifi-icon {
		width: 20px;
		height: 20px;
	}

	.verify-result {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 20px;
		color: #22c55e;
	}

	.checkmark {
		font-size: 32px;
	}

	.knowledge-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 24px;
		margin-bottom: 48px;
	}

	.knowledge-card {
		padding: 32px;
		text-align: center;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.knowledge-card .icon {
		font-size: 32px;
		margin-bottom: 16px;
	}

	.knowledge-card h3 {
		font-size: 16px;
		font-weight: 600;
		margin-bottom: 8px;
	}

	.knowledge-card .value {
		font-size: 24px;
		font-weight: 700;
		color: var(--color-primary, #00d4ff);
		margin-bottom: 12px;
	}

	.knowledge-card .explanation {
		font-size: 14px;
		color: var(--color-text-secondary, rgba(255, 255, 255, 0.6));
		line-height: 1.5;
	}

	.legal-statement {
		padding: 32px;
		background: rgba(239, 68, 68, 0.05);
		border: 1px solid rgba(239, 68, 68, 0.2);
		text-align: center;
	}

	.legal-statement h3 {
		color: #ef4444;
		margin-bottom: 16px;
	}

	.legal-statement p {
		color: var(--color-text-secondary, rgba(255, 255, 255, 0.8));
		line-height: 1.6;
		max-width: 800px;
		margin: 0 auto;
	}

	.crypto-explanation {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 32px;
	}

	.crypto-card {
		padding: 32px;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.crypto-card h3 {
		font-size: 20px;
		margin-bottom: 16px;
		color: var(--color-primary, #00d4ff);
	}

	.crypto-card p {
		color: var(--color-text-secondary, rgba(255, 255, 255, 0.7));
		line-height: 1.6;
		margin-bottom: 24px;
	}

	.formula-block {
		background: rgba(0, 0, 0, 0.5);
		padding: 16px;
	}

	.formula-row {
		display: flex;
		gap: 12px;
		padding: 8px 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
	}

	.formula-row:last-child {
		border-bottom: none;
	}

	.formula-row .label {
		color: var(--color-text-secondary, rgba(255, 255, 255, 0.5));
		min-width: 100px;
	}

	.formula-row code {
		font-family: monospace;
		color: var(--color-primary, #00d4ff);
	}

	.crypto-features {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.crypto-features li {
		padding: 8px 0;
		padding-left: 24px;
		position: relative;
	}

	.crypto-features li::before {
		content: '→';
		position: absolute;
		left: 0;
		color: var(--color-primary, #00d4ff);
	}

	.pricing-philosophy {
		text-align: center;
		font-size: 24px;
		font-family: monospace;
		color: var(--color-primary, #00d4ff);
		margin-bottom: 48px;
	}

	.pricing-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 24px;
		max-width: 800px;
		margin: 0 auto;
	}

	.price-card {
		padding: 32px;
		text-align: center;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.1);
		position: relative;
	}

	.price-card.featured {
		border-color: var(--color-primary, #00d4ff);
		background: rgba(0, 212, 255, 0.05);
	}

	.featured-badge {
		position: absolute;
		top: -12px;
		left: 50%;
		transform: translateX(-50%);
		padding: 4px 12px;
		background: var(--color-primary, #00d4ff);
		color: #000;
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.1em;
	}

	.price-card h3 {
		font-size: 16px;
		font-weight: 600;
		margin-bottom: 16px;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.price-card .price {
		font-size: 48px;
		font-weight: 700;
		margin-bottom: 8px;
	}

	.price-card .price-calc {
		font-family: monospace;
		font-size: 12px;
		color: var(--color-text-secondary, rgba(255, 255, 255, 0.5));
		margin-bottom: 16px;
	}

	.price-card p {
		color: var(--color-text-secondary, rgba(255, 255, 255, 0.6));
		font-size: 14px;
	}

	.cta {
		text-align: center;
		padding: 120px 24px;
		background: linear-gradient(180deg, transparent 0%, rgba(0, 212, 255, 0.05) 100%);
	}

	.cta h2 {
		margin-bottom: 16px;
	}

	.cta p {
		color: var(--color-text-secondary, rgba(255, 255, 255, 0.6));
		margin-bottom: 32px;
	}

	.btn-primary {
		display: inline-block;
		padding: 16px 32px;
		background: var(--color-primary, #00d4ff);
		color: #000;
		font-weight: 600;
		text-decoration: none;
		border: none;
		cursor: pointer;
		transition: all 0.2s;
	}

	.btn-primary:hover {
		background: #fff;
		transform: translateY(-2px);
	}

	.btn-primary.large {
		padding: 20px 48px;
		font-size: 18px;
	}

	.btn-secondary {
		padding: 12px 24px;
		background: transparent;
		color: var(--color-text-primary, #fff);
		border: 1px solid rgba(255, 255, 255, 0.2);
		cursor: pointer;
		transition: all 0.2s;
	}

	.btn-secondary:hover:not(:disabled) {
		border-color: rgba(255, 255, 255, 0.5);
	}

	.btn-secondary:disabled,
	.btn-primary:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.label {
		font-size: 12px;
		color: var(--color-text-secondary, rgba(255, 255, 255, 0.6));
	}
</style>

