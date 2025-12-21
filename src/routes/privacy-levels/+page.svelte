<script lang="ts">
	import { onMount } from 'svelte';
	import { ShieldCheck, Lock, Ban, Circle, Check, X, Zap } from 'lucide-svelte';

	let themeMode: 'modern' | 'brutal' = 'modern';

	function setTheme(mode: 'modern' | 'brutal') {
		themeMode = mode;
		if (typeof document !== 'undefined') {
			if (mode === 'brutal') {
				document.body.classList.add('theme-brutal');
			} else {
				document.body.classList.remove('theme-brutal');
			}
			localStorage.setItem('vuTheme', mode);
		}
	}

	onMount(() => {
		// Load saved theme preference
		const savedTheme = localStorage.getItem('vuTheme');
		if (savedTheme === 'brutal') {
			setTheme('brutal');
		}

		// Smooth scroll animation for cards
		const cards = document.querySelectorAll('.level-card');
		cards.forEach((card, index) => {
			(card as HTMLElement).style.opacity = '0';
			(card as HTMLElement).style.transform = 'translateY(30px)';

			setTimeout(() => {
				(card as HTMLElement).style.transition = 'opacity 0.6s ease, transform 0.6s ease';
				(card as HTMLElement).style.opacity = '1';
				(card as HTMLElement).style.transform = 'translateY(0)';
			}, index * 200);
		});

		// SubZero special effects
		const subzeroCard = document.getElementById('level-subzero');
		if (subzeroCard) {
			// Random glitch effect
			const glitchInterval = setInterval(() => {
				if (Math.random() > 0.95) {
					subzeroCard.style.transform = `translateX(${Math.random() * 4 - 2}px)`;
					setTimeout(() => {
						subzeroCard.style.transform = 'translateX(0)';
					}, 50);
				}
			}, 100);

			// Disappearing effect on scroll
			let lastScrollY = window.scrollY;
			const scrollHandler = () => {
				const rect = subzeroCard.getBoundingClientRect();
				const centerY = rect.top + rect.height / 2;
				const windowCenterY = window.innerHeight / 2;
				const distance = Math.abs(centerY - windowCenterY);
				const maxDistance = window.innerHeight / 2;

				const opacity = Math.max(0.3, 1 - (distance / maxDistance) * 0.5);
				subzeroCard.style.opacity = opacity.toString();

				if (Math.abs(window.scrollY - lastScrollY) > 5) {
					subzeroCard.classList.add('glitching');
					setTimeout(() => {
						subzeroCard.classList.remove('glitching');
					}, 200);
				}
				lastScrollY = window.scrollY;
			};

			window.addEventListener('scroll', scrollHandler);

			// Hover effect for invitation input
			const invitationInput = subzeroCard.querySelector('.invitation-input') as HTMLInputElement;
			if (invitationInput) {
				invitationInput.addEventListener('mouseenter', () => {
					invitationInput.placeholder = 'ACCESS DENIED';
					setTimeout(() => {
						invitationInput.placeholder = 'Enter access code...';
					}, 1000);
				});
			}

			// Random text corruption for blurred elements
			const blurredElements = subzeroCard.querySelectorAll('.blurred-text');
			const blurInterval = setInterval(() => {
				blurredElements.forEach((element) => {
					if (Math.random() > 0.98) {
						(element as HTMLElement).style.filter = 'blur(1.5px)';
						(element as HTMLElement).style.opacity = '0.6';
						setTimeout(() => {
							(element as HTMLElement).style.filter = 'blur(0.5px)';
							(element as HTMLElement).style.opacity = '0.9';
						}, 100);
					}
				});
			}, 2000);

			return () => {
				clearInterval(glitchInterval);
				clearInterval(blurInterval);
				window.removeEventListener('scroll', scrollHandler);
			};
		}
	});
</script>

<svelte:head>
	<title>VU Privacy Transparency Protocol - Your Data, Your Rules | VuAppStore</title>
	<meta
		name="description"
		content="Understand the VU Zero-Level System. From Basic Privacy to True Zero-Knowledge. Every app rated, every rating verified, every choice yours."
	/>
</svelte:head>

<!-- Back Button -->
<a href="/" class="back-button">
	<svg
		class="icon icon-sm"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
	>
		<path d="M19 12H5M5 12L12 19M5 12L12 5" />
	</svg>
	<span>Back to Store</span>
</a>

<!-- Theme Toggle -->
<div class="theme-toggle">
	<button class:active={themeMode === 'modern'} on:click={() => setTheme('modern')}>Modern</button>
	<button class:active={themeMode === 'brutal'} on:click={() => setTheme('brutal')}>Brutal</button>
</div>

<div class="container">
	<!-- Hero Section -->
	<section class="hero">
		<h1>Privacy Transparency<br />Protocol</h1>
		<p class="hero-subtitle">
			The VU Zero-Level System: Where Every Bit of Your Data Has a Guardian Angel
		</p>
		<p class="hero-dramatic">
			In a world where your data is currency, we're creating a new economy.<br />
			One where YOU are the central bank.
		</p>
	</section>

	<!-- Level 5 (Conventional "Privacy" - Not VU Standard) -->
	<div
		class="level-card level-5-conventional"
		style="--level-color: #6b7280; --level-color-dark: #4b5563; --level-color-rgb: 107, 116, 128;"
	>
		<div class="level-header">
			<div class="level-info">
				<div class="level-number level-5-number">5</div>
				<div class="level-title-group">
					<h2 class="level-name">Conventional "Privacy"</h2>
					<p class="level-tagline">What Others Call Privacy</p>
				</div>
			</div>
			<div class="level-disclaimer">
				<div class="disclaimer-badge">
					<X class="w-4 h-4" />
					<span>NOT VU STANDARD</span>
				</div>
			</div>
		</div>
		<p class="level-description">
			This represents what most "privacy-focused" apps claim to offer. While marketed as private,
			these solutions still collect metadata, require trust in centralized servers, and often have
			backdoors for "lawful access." <strong>VU doesn't recognize this as true privacy.</strong>
		</p>
		<div class="privacy-grid">
			<div class="privacy-item can-control conventional">
				<div class="privacy-item-header">
					<Check class="w-5 h-5" />
					<span>What You "Control"</span>
				</div>
				<div class="privacy-item-desc">
					Basic privacy settings, opt-out requests (maybe honored)
				</div>
			</div>
			<div class="privacy-item cannot-see conventional">
				<div class="privacy-item-header">
					<X class="w-5 h-5" />
					<span>What They "Can't" See</span>
				</div>
				<div class="privacy-item-desc">
					Message content (but metadata exposed), encrypted files (with keys)
				</div>
			</div>
			<div class="privacy-item server-sees conventional">
				<div class="privacy-item-header">
					<Circle class="w-5 h-5" />
					<span>What Servers Actually See</span>
				</div>
				<div class="privacy-item-desc">
					All metadata, usage patterns, social graphs, behavioral analytics
				</div>
			</div>
			<div class="privacy-item never-keep conventional">
				<div class="privacy-item-header">
					<Ban class="w-5 h-5" />
					<span>What They "Never" Keep</span>
				</div>
				<div class="privacy-item-desc">
					Raw content (but derivatives stored), "deleted" data (archived)
				</div>
			</div>
			<div class="privacy-item offline conventional">
				<div class="privacy-item-header">
					<Zap class="w-5 h-5" />
					<span>Offline Capability</span>
				</div>
				<div class="privacy-item-desc">
					Minimal offline access, requires constant server validation
				</div>
			</div>
		</div>
		<div
			class="examples-section conventional-examples"
			style="--level-color: #6b7280; --level-color-rgb: 107, 116, 128;"
		>
			<div class="examples-title">Popular Apps at This Level:</div>
			<div class="example-apps">
				<span class="example-app">ProtonMail</span>
				<span class="example-app">Signal</span>
				<span class="example-app">Telegram</span>
				<span class="example-app">DuckDuckGo</span>
				<span class="example-app">Brave Browser</span>
				<span class="example-app">1Password</span>
			</div>
			<div class="level-5-warning">
				<div class="warning-content">
					<X class="w-5 h-5 text-error" />
					<div>
						<strong>Why VU Doesn't Accept This Standard:</strong>
						<p>
							These apps still require trust in centralized infrastructure, collect metadata that
							can reveal your entire digital life, and often have government backdoors or "lawful
							access" provisions. True privacy shouldn't require trust.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Level 4 (Basic Privacy - Lowest) -->
	<div
		class="level-card"
		style="--level-color: #ef4444; --level-color-dark: #dc2626; --level-color-rgb: 239, 68, 68;"
	>
		<div class="level-header">
			<div class="level-info">
				<div class="level-number">4</div>
				<div class="level-title-group">
					<h2 class="level-name">VU Zero-Level 4</h2>
					<p class="level-tagline">Basic Privacy</p>
				</div>
			</div>
		</div>
		<p class="level-description">
			The foundation of trust. Even at our most basic level, you have more privacy than most
			"premium" services offer. Your data is encrypted in transit, and we promise not to sell it.
			But let's be honest - in 2025, this should be the bare minimum, not a feature.
		</p>
		<div class="privacy-grid">
			<div class="privacy-item can-control">
				<div class="privacy-item-header">
					<Check class="w-5 h-5" />
					<span>What You Control</span>
				</div>
				<div class="privacy-item-desc">Account deletion, data export, basic privacy settings</div>
			</div>
			<div class="privacy-item cannot-see">
				<div class="privacy-item-header">
					<X class="w-5 h-5" />
					<span>What We Can't See</span>
				</div>
				<div class="privacy-item-desc">Your passwords (hashed), payment details (tokenized)</div>
			</div>
			<div class="privacy-item server-sees">
				<div class="privacy-item-header">
					<Circle class="w-5 h-5" />
					<span>What Servers See</span>
				</div>
				<div class="privacy-item-desc">Encrypted data, basic metadata, usage timestamps</div>
			</div>
			<div class="privacy-item never-keep">
				<div class="privacy-item-header">
					<Ban class="w-5 h-5" />
					<span>What We Never Keep</span>
				</div>
				<div class="privacy-item-desc">Deleted data, expired sessions, declined permissions</div>
			</div>
			<div class="privacy-item offline">
				<div class="privacy-item-header">
					<Zap class="w-5 h-5" />
					<span>Offline Capability</span>
				</div>
				<div class="privacy-item-desc">Limited offline access, sync required for full features</div>
			</div>
		</div>
		<div class="examples-section" style="--level-color: #ef4444; --level-color-rgb: 239, 68, 68;">
			<div class="examples-title">Example Apps at This Level:</div>
			<div class="example-apps">
				<span class="example-app">Basic Note Apps</span>
				<span class="example-app">Simple Calculators</span>
				<span class="example-app">Weather Widgets</span>
			</div>
		</div>
	</div>

	<!-- Level 3 (Enhanced Privacy) -->
	<div
		class="level-card"
		style="--level-color: #f97316; --level-color-dark: #ea580c; --level-color-rgb: 249, 115, 22;"
	>
		<div class="level-header">
			<div class="level-info">
				<div class="level-number">3</div>
				<div class="level-title-group">
					<h2 class="level-name">VU Zero-Level 3</h2>
					<p class="level-tagline">Enhanced Privacy</p>
				</div>
			</div>
		</div>
		<p class="level-description">
			Now we're talking. End-to-end encryption becomes standard, not premium. Your data is encrypted
			before it even leaves your device. We can't read it, hackers can't steal it, governments can't
			demand it. This is privacy that actually means something.
		</p>
		<div class="privacy-grid">
			<div class="privacy-item can-control">
				<div class="privacy-item-header">
					<Check class="w-5 h-5" />
					<span>What You Control</span>
				</div>
				<div class="privacy-item-desc">
					Encryption keys, sharing permissions, data retention periods
				</div>
			</div>
			<div class="privacy-item cannot-see">
				<div class="privacy-item-header">
					<X class="w-5 h-5" />
					<span>What We Can't See</span>
				</div>
				<div class="privacy-item-desc">Message content, file contents, user-generated data</div>
			</div>
			<div class="privacy-item server-sees">
				<div class="privacy-item-header">
					<Circle class="w-5 h-5" />
					<span>What Servers See</span>
				</div>
				<div class="privacy-item-desc">Encrypted blobs, connection times, data size</div>
			</div>
			<div class="privacy-item never-keep">
				<div class="privacy-item-header">
					<Ban class="w-5 h-5" />
					<span>What We Never Keep</span>
				</div>
				<div class="privacy-item-desc">
					IP addresses after session, decryption keys, message metadata
				</div>
			</div>
			<div class="privacy-item offline">
				<div class="privacy-item-header">
					<Zap class="w-5 h-5" />
					<span>Offline Capability</span>
				</div>
				<div class="privacy-item-desc">Most features work offline, periodic sync for updates</div>
			</div>
		</div>
		<div class="examples-section" style="--level-color: #f97316; --level-color-rgb: 249, 115, 22;">
			<div class="examples-title">Example Apps at This Level:</div>
			<div class="example-apps">
				<span class="example-app">Encrypted Messengers</span>
				<span class="example-app">Secure Email Clients</span>
				<span class="example-app">Private Cloud Storage</span>
			</div>
		</div>
	</div>

	<!-- Level 2 -->
	<div
		class="level-card"
		style="--level-color: #eab308; --level-color-dark: #ca8a04; --level-color-rgb: 234, 179, 8;"
	>
		<div class="level-header">
			<div class="level-info">
				<div class="level-number">2</div>
				<div class="level-title-group">
					<h2 class="level-name">VU Zero-Level 2</h2>
					<p class="level-tagline">Privacy First Architecture</p>
				</div>
			</div>
		</div>
		<p class="level-description">
			The paradigm shift. We don't just encrypt your data - we architect entire systems to never
			need it in the first place. Federated learning, differential privacy, homomorphic encryption.
			Your data becomes a ghost that can compute without ever materializing.
		</p>
		<div class="privacy-grid">
			<div class="privacy-item can-control">
				<div class="privacy-item-header">
					<Check class="w-5 h-5" />
					<span>What You Control</span>
				</div>
				<div class="privacy-item-desc">
					All data processing, federation settings, privacy budget
				</div>
			</div>
			<div class="privacy-item cannot-see">
				<div class="privacy-item-header">
					<X class="w-5 h-5" />
					<span>What We Can't See</span>
				</div>
				<div class="privacy-item-desc">
					Individual data points, user behavior, personal patterns
				</div>
			</div>
			<div class="privacy-item server-sees">
				<div class="privacy-item-header">
					<Circle class="w-5 h-5" />
					<span>What Servers See</span>
				</div>
				<div class="privacy-item-desc">
					Aggregate statistics only, differentially private outputs
				</div>
			</div>
			<div class="privacy-item never-keep">
				<div class="privacy-item-header">
					<Ban class="w-5 h-5" />
					<span>What We Never Keep</span>
				</div>
				<div class="privacy-item-desc">Individual records, personal identifiers, raw data</div>
			</div>
			<div class="privacy-item offline">
				<div class="privacy-item-header">
					<Zap class="w-5 h-5" />
					<span>Offline Capability</span>
				</div>
				<div class="privacy-item-desc">
					Full offline functionality, optional federation participation
				</div>
			</div>
		</div>
		<div class="examples-section" style="--level-color: #eab308; --level-color-rgb: 234, 179, 8;">
			<div class="examples-title">Example Apps at This Level:</div>
			<div class="example-apps">
				<span class="example-app">Federated Learning Platforms</span>
				<span class="example-app">Privacy-Preserving Analytics</span>
				<span class="example-app">Distributed Social Networks</span>
			</div>
		</div>
	</div>

	<!-- Level 1 (Local-First Computing) -->
	<div
		class="level-card"
		style="--level-color: #22c55e; --level-color-dark: #16a34a; --level-color-rgb: 34, 197, 94;"
	>
		<div class="level-header">
			<div class="level-info">
				<div class="level-number">1</div>
				<div class="level-title-group">
					<h2 class="level-name">VU Zero-Level 1</h2>
					<p class="level-tagline">Local-First Computing</p>
				</div>
			</div>
		</div>
		<p class="level-description">
			Welcome to the revolution. Your device becomes a fortress. All computation happens locally. AI
			runs on YOUR hardware. The cloud becomes optional, not essential. This isn't just privacy -
			it's digital sovereignty. Your data never leaves home unless you explicitly pack its bags.
		</p>
		<div class="privacy-grid">
			<div class="privacy-item can-control">
				<div class="privacy-item-header">
					<Check class="w-5 h-5" />
					<span>What You Control</span>
				</div>
				<div class="privacy-item-desc">
					Everything. All computation, all storage, all processing
				</div>
			</div>
			<div class="privacy-item cannot-see">
				<div class="privacy-item-header">
					<X class="w-5 h-5" />
					<span>What We Can't See</span>
				</div>
				<div class="privacy-item-desc">Everything. Your data never reaches our servers</div>
			</div>
			<div class="privacy-item server-sees">
				<div class="privacy-item-header">
					<Circle class="w-5 h-5" />
					<span>What Servers See</span>
				</div>
				<div class="privacy-item-desc">Nothing. Optional anonymous telemetry if you consent</div>
			</div>
			<div class="privacy-item never-keep">
				<div class="privacy-item-header">
					<Ban class="w-5 h-5" />
					<span>What We Never Keep</span>
				</div>
				<div class="privacy-item-desc">We never receive your data in the first place</div>
			</div>
			<div class="privacy-item offline">
				<div class="privacy-item-header">
					<Zap class="w-5 h-5" />
					<span>Offline Capability</span>
				</div>
				<div class="privacy-item-desc">100% offline. Internet is optional for updates only</div>
			</div>
		</div>
		<div class="examples-section" style="--level-color: #22c55e; --level-color-rgb: 34, 197, 94;">
			<div class="examples-title">Example Apps at This Level:</div>
			<div class="example-apps">
				<span class="example-app">VuNotes</span>
				<span class="example-app">VuTask</span>
				<span class="example-app">Local AI Assistants</span>
				<span class="example-app">Offline-First Databases</span>
			</div>
		</div>
	</div>

	<!-- Level 0 (True Zero-Knowledge - Highest Standard) -->
	<div
		class="level-card"
		style="--level-color: #3b82f6; --level-color-dark: #2563eb; --level-color-rgb: 59, 130, 246;"
	>
		<div class="level-header">
			<div class="level-info">
				<div class="level-number">0</div>
				<div class="level-title-group">
					<h2 class="level-name">VU Zero-Level 0</h2>
					<p class="level-tagline">True Zero-Knowledge</p>
				</div>
			</div>
		</div>
		<p class="level-description">
			The holy grail of privacy. True zero-knowledge architecture where even the existence of your
			data is unknowable to us. Peer-to-peer when connected, completely autonomous when not. Your
			device isn't just a fortress - it's a sovereign nation in the digital realm. This is privacy
			so absolute, even quantum computers of the future can't break it. Welcome to digital
			immortality.
		</p>
		<div class="privacy-grid">
			<div class="privacy-item can-control">
				<div class="privacy-item-header">
					<Check class="w-5 h-5" />
					<span>What You Control</span>
				</div>
				<div class="privacy-item-desc">
					Absolutely everything. You are the sole sovereign of your data
				</div>
			</div>
			<div class="privacy-item cannot-see">
				<div class="privacy-item-header">
					<X class="w-5 h-5" />
					<span>What We Can't See</span>
				</div>
				<div class="privacy-item-desc">We don't even know you exist as a user</div>
			</div>
			<div class="privacy-item server-sees">
				<div class="privacy-item-header">
					<Circle class="w-5 h-5" />
					<span>What Servers See</span>
				</div>
				<div class="privacy-item-desc">No servers involved. Pure P2P or offline operation</div>
			</div>
			<div class="privacy-item never-keep">
				<div class="privacy-item-header">
					<Ban class="w-5 h-5" />
					<span>What We Never Keep</span>
				</div>
				<div class="privacy-item-desc">There's nothing to keep. You're a ghost in the machine</div>
			</div>
			<div class="privacy-item offline">
				<div class="privacy-item-header">
					<Zap class="w-5 h-5" />
					<span>Offline Capability</span>
				</div>
				<div class="privacy-item-desc">Perfect offline operation. P2P sync when desired</div>
			</div>
		</div>
		<div class="examples-section" style="--level-color: #3b82f6; --level-color-rgb: 59, 130, 246;">
			<div class="examples-title">Example Apps at This Level:</div>
			<div class="example-apps">
				<span class="example-app">VuChat</span>
				<span class="example-app">VuWallet</span>
				<span class="example-app">VuVault</span>
				<span class="example-app">VuHealth</span>
				<span class="example-app">VuCalendar</span>
			</div>
		</div>
	</div>

	<!-- Level 6 - SUBZERO (Secret/Exclusive) -->
	<div class="level-card level-subzero" id="level-subzero">
		<div class="glitch-container">
			<div class="level-header">
				<div class="level-info">
					<div class="level-number subzero-logo">
						<span class="vu-text">VU</span>
					</div>
					<div class="level-title-group">
						<h2 class="level-name glitch" data-text="The VU - SubZero">The VU - SubZero</h2>
						<p class="level-tagline">Your Thoughts | Your Actions</p>
					</div>
				</div>
			</div>
			<p class="level-description blurred-text">
				Beyond zero-knowledge lies negative entropy - a system that generates false signals for
				every real action, creating an impenetrable fog of war around your digital presence. SubZero
				employs polymorphic encryption that mutates its own algorithms after each operation,
				time-dilated data sharding across ephemeral nodes, and steganographic channels hidden within
				legitimate traffic. Your real data becomes indistinguishable from millions of synthetic
				decoys, each with perfect behavioral signatures. This isn't just privacy - it's active
				counter-surveillance where every tracker becomes poisoned with false positives until the
				signal drowns in self-generated noise.
			</p>
			<div class="privacy-grid subzero-grid">
				<div class="privacy-item subzero-item">
					<div class="privacy-item-header">
						<Check class="w-5 h-5" />
						<span class="glitch-text">What You Control</span>
					</div>
					<div class="privacy-item-desc blurred-text">
						The entire signal-to-noise ratio. Your truth hides in oceans of synthetic data
					</div>
				</div>
				<div class="privacy-item subzero-item">
					<div class="privacy-item-header">
						<X class="w-5 h-5" />
						<span class="glitch-text">What We Can't See</span>
					</div>
					<div class="privacy-item-desc blurred-text">
						Which of the million data streams is actually you. Every shadow could be real
					</div>
				</div>
				<div class="privacy-item subzero-item">
					<div class="privacy-item-header">
						<Circle class="w-5 h-5" />
						<span class="glitch-text">What Servers See</span>
					</div>
					<div class="privacy-item-desc blurred-text">
						Honeypot networks. Every query spawns 10,000 false trails across distributed nodes
					</div>
				</div>
				<div class="privacy-item subzero-item">
					<div class="privacy-item-header">
						<Ban class="w-5 h-5" />
						<span class="glitch-text">What We Never Keep</span>
					</div>
					<div class="privacy-item-desc blurred-text">
						Temporal data. All traces self-corrupt through cryptographic decay functions
					</div>
				</div>
				<div class="privacy-item subzero-item">
					<div class="privacy-item-header">
						<Zap class="w-5 h-5" />
						<span class="glitch-text">Offline Capability</span>
					</div>
					<div class="privacy-item-desc blurred-text">
						Mesh-isolated. Creates local darknet bubbles. Air-gapped by design, not limitation
					</div>
				</div>
			</div>
			<div class="invitation-section">
				<p class="invitation-text">By Invitation Only</p>
				<input type="email" class="invitation-input" placeholder="Enter access code..." disabled />
			</div>
		</div>
		<div class="static-overlay"></div>
	</div>

	<!-- VU Badge Explanation Section -->
	<div class="vu-badge-section">
		<div class="badge-header">
			<div class="badge-demo">
				<div class="demo-badge v1">
					<span class="demo-v">V</span>
					<span class="demo-num">1</span>
				</div>
				<div class="demo-badge v2">
					<span class="demo-v">V</span>
					<span class="demo-num">2</span>
				</div>
				<div class="demo-badge v0">
					<span class="demo-v">V</span>
					<span class="demo-num">0</span>
				</div>
			</div>
			<h2 class="badge-title">The VU Badge</h2>
			<p class="badge-subtitle">
				Radical Transparency in Every Corner of the VU Ecosystem
			</p>
		</div>

		<div class="badge-explanation">
			<div class="explanation-item">
				<div class="explanation-icon location">📍</div>
				<div class="explanation-content">
					<h4>Always Visible</h4>
					<p>
						Look at the bottom-left corner of your screen. You'll see a small circular badge with <strong>V</strong> followed by a number.
						This is the VU Privacy Level Badge - present on every page and service in the VU ecosystem.
					</p>
				</div>
			</div>

			<div class="explanation-item">
				<div class="explanation-icon colors">🎨</div>
				<div class="explanation-content">
					<h4>Color-Coded for Clarity</h4>
					<p>
						Each level has its own color. <span class="inline-badge blue">V0</span> Blue for Zero-Knowledge (best),
						<span class="inline-badge green">V1</span> Green for Local-First,
						<span class="inline-badge yellow">V2</span> Yellow for Privacy-First, and so on.
						The warmer the color, the more we need to explain.
					</p>
				</div>
			</div>

			<div class="explanation-item">
				<div class="explanation-icon click">👆</div>
				<div class="explanation-content">
					<h4>Click for Complete Transparency</h4>
					<p>
						Clicking the badge opens a detailed modal explaining: what you control on this page,
						what we can't see, what servers see, any privacy tradeoffs, and why this page
						operates at this specific level.
					</p>
				</div>
			</div>

			<div class="explanation-item">
				<div class="explanation-icon honest">💯</div>
				<div class="explanation-content">
					<h4>Brutally Honest</h4>
					<p>
						We don't sugarcoat. If a page requires more data than Level 0, we tell you exactly why.
						The VU Badge represents reality - not marketing claims. Every page is rated based on
						actual services and data flows, not aspirations.
					</p>
				</div>
			</div>
		</div>

		<div class="badge-commitment">
			<div class="commitment-header">
				<ShieldCheck class="w-6 h-6" />
				<span>Our Commitment</span>
			</div>
			<p class="commitment-text">
				Every page in the VU ecosystem will always display the VU Badge. We continuously strive to
				lower our levels. When we can achieve Level 0, we will. When we can't, you'll know exactly why.
				This is privacy transparency as it should be: visible, verifiable, and honest.
			</p>
		</div>
	</div>

	<!-- Call to Action -->
	<div class="cta-section">
		<h2 class="cta-title">Your Privacy Journey Starts Here</h2>
		<p class="cta-subtitle">
			Join the revolution. Choose apps that respect your digital sovereignty.
		</p>
		<a href="/apps" class="cta-button">Explore VU Suite Apps</a>
	</div>
</div>

<style>
	/* Import theme variables from main app.css */
	:global(body.theme-brutal) {
		--color-primary: #000000;
		--color-background: #ffffff;
		--color-text-primary: #000000;
	}

	/* Back Button */
	.back-button {
		position: fixed;
		top: 12px;
		left: 12px;
		padding: 6px 10px;
		background: var(--color-glass, rgba(255, 255, 255, 0.05));
		backdrop-filter: blur(10px);
		border: 1px solid var(--color-border, rgba(255, 255, 255, 0.1));
		border-radius: var(--border-radius, 8px);
		color: var(--color-text-secondary, #888888);
		font-size: 12px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		gap: 4px;
		z-index: 1000;
	}

	@media (min-width: 768px) {
		.back-button {
			top: 16px;
			left: 16px;
			padding: 8px 12px;
			font-size: 14px;
		}
	}

	.back-button:hover {
		background: rgba(255, 255, 255, 0.1);
		color: var(--color-text-primary, #ffffff);
		border-color: var(--color-border-hover, rgba(255, 255, 255, 0.2));
	}

	/* Theme Toggle */
	.theme-toggle {
		position: fixed;
		top: 16px;
		right: 16px;
		display: flex;
		gap: 0;
		background: var(--color-glass, rgba(255, 255, 255, 0.05));
		backdrop-filter: blur(10px);
		border: 1px solid var(--color-border, rgba(255, 255, 255, 0.1));
		border-radius: 8px;
		z-index: 1000;
		overflow: hidden;
	}

	.theme-toggle button {
		padding: 8px 16px;
		background: transparent;
		color: var(--color-text-secondary, #888888);
		border: none;
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.theme-toggle button.active {
		background: var(--color-primary, #00d4ff);
		color: var(--color-background, #000000);
	}

	/* Hero Section */
	.hero {
		text-align: center;
		padding: 64px 16px 32px;
	}

	@media (min-width: 768px) {
		.hero {
			padding: 96px 0 64px;
		}
	}

	.hero h1 {
		font-size: clamp(32px, 6vw, 96px);
		font-weight: 900;
		line-height: 1.1;
		margin-bottom: 16px;
		background: linear-gradient(
			135deg,
			var(--color-text-primary, #ffffff) 0%,
			var(--color-primary, #00d4ff) 100%
		);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		letter-spacing: -1px;
	}

	@media (min-width: 768px) {
		.hero h1 {
			margin-bottom: 24px;
			letter-spacing: -2px;
		}
	}

	.hero-subtitle {
		font-size: 16px;
		color: var(--color-text-secondary, #888888);
		margin-bottom: 20px;
	}

	@media (min-width: 768px) {
		.hero-subtitle {
			font-size: 24px;
			margin-bottom: 32px;
		}
	}

	.hero-dramatic {
		font-size: 14px;
		color: var(--color-primary, #00d4ff);
		font-weight: 600;
		margin-bottom: 32px;
		line-height: 1.6;
	}

	@media (min-width: 768px) {
		.hero-dramatic {
			font-size: 20px;
			margin-bottom: 48px;
		}
	}

	/* Level Cards */
	.level-card {
		background: var(--color-glass, rgba(255, 255, 255, 0.05));
		backdrop-filter: blur(10px);
		border: 2px solid var(--color-border, rgba(255, 255, 255, 0.1));
		border-radius: 16px;
		padding: 20px;
		margin-bottom: 24px;
		position: relative;
		overflow: hidden;
	}

	@media (min-width: 768px) {
		.level-card {
			border-radius: 24px;
			padding: 48px;
			margin-bottom: 48px;
		}
	}

	.level-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(90deg, var(--level-color) 0%, transparent 100%);
	}

	.level-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 32px;
	}

	.level-info {
		display: flex;
		align-items: center;
		gap: 24px;
	}

	.level-number {
		width: 50px;
		height: 50px;
		background: linear-gradient(135deg, var(--level-color) 0%, var(--level-color-dark) 100%);
		border-radius: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28px;
		font-weight: 900;
		color: white;
		box-shadow: 0 0 20px rgba(var(--level-color-rgb), 0.3);
	}

	@media (min-width: 768px) {
		.level-number {
			width: 80px;
			height: 80px;
			font-size: 48px;
			border-radius: 24px;
			box-shadow: 0 0 40px rgba(var(--level-color-rgb), 0.3);
		}
	}

	.level-name {
		font-size: 20px;
		font-weight: 700;
		margin-bottom: 4px;
	}

	@media (min-width: 768px) {
		.level-name {
			font-size: 32px;
		}
	}

	.level-tagline {
		font-size: 14px;
		color: var(--level-color);
		font-weight: 600;
	}

	@media (min-width: 768px) {
		.level-tagline {
			font-size: 18px;
		}
	}

	.level-description {
		font-size: 14px;
		line-height: 1.6;
		color: var(--color-text-secondary, #888888);
		margin-bottom: 20px;
	}

	@media (min-width: 768px) {
		.level-description {
			font-size: 18px;
			margin-bottom: 32px;
		}
	}

	/* Privacy Grid */
	.privacy-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 16px;
		margin-bottom: 32px;
	}

	.privacy-item {
		padding: 16px;
		background: var(--color-glass, rgba(255, 255, 255, 0.05));
		border-left: 4px solid;
		border-radius: 8px;
	}

	.privacy-item.can-control {
		border-color: var(--color-success, #22c55e);
	}

	.privacy-item.cannot-see {
		border-color: var(--color-info, #3b82f6);
	}

	.privacy-item.server-sees {
		border-color: var(--color-warning, #ffa500);
	}

	.privacy-item.never-keep {
		border-color: var(--color-error, #ef4444);
	}

	.privacy-item.offline {
		border-color: var(--color-purple, #9333ea);
	}

	.privacy-item-header {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 8px;
		font-weight: 600;
		font-size: 16px;
	}

	.privacy-item-desc {
		color: var(--color-text-secondary, #888888);
		font-size: 14px;
		line-height: 1.5;
	}

	/* Examples Section */
	.examples-section {
		background: rgba(var(--level-color-rgb), 0.05);
		border: 1px solid rgba(var(--level-color-rgb), 0.2);
		border-radius: 8px;
		padding: 24px;
		margin-top: 24px;
	}

	.examples-title {
		font-size: 18px;
		font-weight: 600;
		color: var(--level-color);
		margin-bottom: 12px;
	}

	.example-apps {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.example-app {
		padding: 4px 12px;
		background: var(--color-glass, rgba(255, 255, 255, 0.05));
		border: 1px solid var(--color-border, rgba(255, 255, 255, 0.1));
		border-radius: 8px;
		font-size: 14px;
		font-weight: 500;
	}

	/* SubZero Special Styles */
	.level-subzero {
		background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%);
		border-color: #333333;
		animation: flicker 8s infinite;
	}

	@keyframes flicker {
		0%,
		100% {
			opacity: 1;
		}
		92% {
			opacity: 1;
		}
		93% {
			opacity: 0.8;
		}
		94% {
			opacity: 1;
		}
		95% {
			opacity: 0.9;
		}
		96% {
			opacity: 1;
		}
	}

	.subzero-logo {
		background: #000000;
		border: 3px solid #ffffff;
		box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
		animation: pulse-border 2s infinite;
	}

	@keyframes pulse-border {
		0%,
		100% {
			box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
		}
		50% {
			box-shadow: 0 0 50px rgba(255, 255, 255, 0.6);
		}
	}

	.vu-text {
		color: #ffffff;
		font-weight: 900;
		font-size: 36px;
		letter-spacing: 2px;
		text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
	}

	.level-subzero .level-name {
		color: #ffffff;
		text-transform: uppercase;
		letter-spacing: 3px;
	}

	.blurred-text {
		color: #999999;
		filter: blur(0.5px);
		user-select: none;
		text-shadow: 0 0 3px rgba(255, 255, 255, 0.1);
	}

	.glitch-text {
		color: #cccccc;
		font-family: var(--font-mono, monospace);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.invitation-section {
		margin-top: 48px;
		text-align: center;
		opacity: 0.6;
		transition: opacity 0.3s ease;
	}

	.invitation-section:hover {
		opacity: 1;
	}

	.invitation-text {
		font-size: 14px;
		color: #808080;
		text-transform: uppercase;
		letter-spacing: 2px;
		margin-bottom: 12px;
		font-weight: 600;
	}

	.invitation-input {
		background: rgba(0, 0, 0, 0.5);
		border: 1px solid #333333;
		color: #666666;
		padding: 12px 24px;
		font-size: 14px;
		font-family: var(--font-mono, monospace);
		border-radius: 0;
		width: 300px;
		max-width: 90%;
		text-align: center;
		cursor: not-allowed;
	}

	.static-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-image: repeating-linear-gradient(
			0deg,
			transparent,
			transparent 2px,
			rgba(255, 255, 255, 0.03) 2px,
			rgba(255, 255, 255, 0.03) 4px
		);
		pointer-events: none;
		opacity: 0.3;
	}

	/* CTA Section */
	.cta-section {
		text-align: center;
		padding: 64px 0;
		background: linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, transparent 100%);
		border-radius: 24px;
		margin: 64px 0;
	}

	.cta-title {
		font-size: 36px;
		font-weight: 700;
		margin-bottom: 16px;
	}

	.cta-subtitle {
		font-size: 20px;
		margin-bottom: 32px;
		color: var(--color-text-secondary, #888888);
	}

	.cta-button {
		display: inline-block;
		padding: 16px 32px;
		background: var(--color-primary, #00d4ff);
		color: var(--color-background, #000000);
		font-size: 18px;
		font-weight: 600;
		border-radius: 8px;
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.cta-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(0, 212, 255, 0.3);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.hero h1 {
			font-size: 48px;
		}

		.level-header {
			flex-direction: column;
			gap: 24px;
		}

		.privacy-grid {
			grid-template-columns: 1fr;
		}
	}

	/* Glitching animation */
	:global(.glitching) {
		animation: intense-glitch 0.2s infinite !important;
	}

	@keyframes intense-glitch {
		0%,
		100% {
			transform: translateX(0) skewX(0deg);
		}
		20% {
			transform: translateX(-2px) skewX(2deg);
		}
		40% {
			transform: translateX(2px) skewX(-2deg);
		}
		60% {
			transform: translateX(-1px) skewX(1deg);
		}
		80% {
			transform: translateX(1px) skewX(-1deg);
		}
	}

	/* ========================================
	   LEVEL 5 - CONVENTIONAL "PRIVACY" STYLES
	   ======================================== */

	.level-5-conventional {
		position: relative;
		border: 2px dashed var(--level-color) !important;
		background: linear-gradient(
			135deg,
			rgba(var(--level-color-rgb), 0.05),
			rgba(var(--level-color-rgb), 0.02)
		);
		opacity: 0.85;
	}

	.level-5-conventional::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: repeating-linear-gradient(
			45deg,
			transparent,
			transparent 10px,
			rgba(var(--level-color-rgb), 0.1) 10px,
			rgba(var(--level-color-rgb), 0.1) 20px
		);
		pointer-events: none;
		z-index: 1;
	}

	.level-5-conventional > * {
		position: relative;
		z-index: 2;
	}

	.level-5-number {
		background: var(--level-color) !important;
		color: #ffffff !important;
		position: relative;
	}

	.level-5-number::after {
		content: '×';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #ffffff;
		font-size: 24px;
		font-weight: 900;
		text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
	}

	.level-disclaimer {
		display: flex;
		align-items: center;
		margin-left: auto;
	}

	.disclaimer-badge {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 6px 12px;
		background: rgba(239, 68, 68, 0.2);
		border: 1px solid #ef4444;
		border-radius: 20px;
		color: #ef4444;
		font-size: 12px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.conventional-examples {
		background: rgba(var(--level-color-rgb), 0.1) !important;
		border: 1px dashed var(--level-color) !important;
	}

	.privacy-item.conventional {
		opacity: 0.8;
		border-style: dashed !important;
	}

	.privacy-item.conventional .privacy-item-header span {
		position: relative;
	}

	.privacy-item.conventional .privacy-item-header span::before {
		content: '"';
		opacity: 0.6;
	}

	.privacy-item.conventional .privacy-item-header span::after {
		content: '"';
		opacity: 0.6;
	}

	.level-5-warning {
		margin-top: 24px;
		padding: 16px;
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.3);
		border-radius: 8px;
	}

	.warning-content {
		display: flex;
		gap: 12px;
		align-items: flex-start;
	}

	.warning-content strong {
		color: #ef4444;
		display: block;
		margin-bottom: 8px;
	}

	.warning-content p {
		color: #888888;
		font-size: 14px;
		line-height: 1.5;
		margin: 0;
	}

	/* Level 5 hover effects */
	.level-5-conventional:hover {
		opacity: 1;
		border-color: #ef4444 !important;
	}

	.level-5-conventional:hover::before {
		background: repeating-linear-gradient(
			45deg,
			transparent,
			transparent 10px,
			rgba(239, 68, 68, 0.15) 10px,
			rgba(239, 68, 68, 0.15) 20px
		);
	}

	/* Responsive adjustments for Level 5 */
	@media (max-width: 768px) {
		.level-disclaimer {
			margin-left: 0;
			margin-top: 12px;
		}

		.level-header {
			flex-direction: column;
			align-items: flex-start;
		}

		.disclaimer-badge {
			font-size: 10px;
			padding: 4px 8px;
		}

		.warning-content {
			flex-direction: column;
			gap: 8px;
		}
	}

	/* ========================================
	   VU BADGE EXPLANATION SECTION
	   ======================================== */
	.vu-badge-section {
		background: linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(34, 197, 94, 0.05) 100%);
		border: 2px solid rgba(0, 212, 255, 0.2);
		border-radius: 24px;
		padding: 32px;
		margin-bottom: 48px;
	}

	@media (min-width: 768px) {
		.vu-badge-section {
			padding: 48px;
		}
	}

	.badge-header {
		text-align: center;
		margin-bottom: 32px;
	}

	.badge-demo {
		display: flex;
		gap: 12px;
		justify-content: center;
		margin-bottom: 24px;
	}

	.demo-badge {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		display: flex;
		align-items: baseline;
		justify-content: center;
		font-weight: 900;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
		animation: float 3s ease-in-out infinite;
	}

	.demo-badge.v0 {
		background: linear-gradient(135deg, #3b82f6, #2563eb);
		animation-delay: 0s;
	}

	.demo-badge.v1 {
		background: linear-gradient(135deg, #22c55e, #16a34a);
		animation-delay: 0.5s;
	}

	.demo-badge.v2 {
		background: linear-gradient(135deg, #eab308, #ca8a04);
		animation-delay: 1s;
	}

	.demo-v {
		font-size: 14px;
		color: #000;
	}

	.demo-num {
		font-size: 20px;
		color: #000;
	}

	@keyframes float {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-8px);
		}
	}

	.badge-title {
		font-size: 28px;
		font-weight: 800;
		margin-bottom: 8px;
		background: linear-gradient(135deg, #00d4ff, #22c55e);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	@media (min-width: 768px) {
		.badge-title {
			font-size: 36px;
		}
	}

	.badge-subtitle {
		font-size: 16px;
		color: var(--color-text-secondary, #888888);
	}

	@media (min-width: 768px) {
		.badge-subtitle {
			font-size: 20px;
		}
	}

	.badge-explanation {
		display: grid;
		grid-template-columns: 1fr;
		gap: 20px;
		margin-bottom: 32px;
	}

	@media (min-width: 768px) {
		.badge-explanation {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.explanation-item {
		display: flex;
		gap: 16px;
		padding: 20px;
		background: var(--color-glass, rgba(255, 255, 255, 0.05));
		border: 1px solid var(--color-border, rgba(255, 255, 255, 0.1));
		border-radius: 16px;
		transition: all 0.2s ease;
	}

	.explanation-item:hover {
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(0, 212, 255, 0.3);
		transform: translateY(-2px);
	}

	.explanation-icon {
		font-size: 32px;
		flex-shrink: 0;
	}

	.explanation-content h4 {
		font-size: 16px;
		font-weight: 700;
		margin-bottom: 8px;
		color: var(--color-text-primary, #ffffff);
	}

	.explanation-content p {
		font-size: 14px;
		line-height: 1.6;
		color: var(--color-text-secondary, #888888);
		margin: 0;
	}

	.inline-badge {
		display: inline-flex;
		align-items: center;
		padding: 2px 6px;
		border-radius: 4px;
		font-size: 12px;
		font-weight: 700;
		margin: 0 2px;
	}

	.inline-badge.blue {
		background: rgba(59, 130, 246, 0.2);
		color: #3b82f6;
	}

	.inline-badge.green {
		background: rgba(34, 197, 94, 0.2);
		color: #22c55e;
	}

	.inline-badge.yellow {
		background: rgba(234, 179, 8, 0.2);
		color: #eab308;
	}

	.badge-commitment {
		background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(0, 212, 255, 0.1));
		border: 1px solid rgba(34, 197, 94, 0.3);
		border-radius: 16px;
		padding: 24px;
		text-align: center;
	}

	.commitment-header {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 8px 16px;
		background: rgba(34, 197, 94, 0.2);
		border: 1px solid rgba(34, 197, 94, 0.3);
		border-radius: 24px;
		color: #22c55e;
		font-size: 14px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin-bottom: 16px;
	}

	.commitment-text {
		font-size: 14px;
		line-height: 1.7;
		color: var(--color-text-secondary, #cccccc);
		max-width: 800px;
		margin: 0 auto;
	}

	@media (min-width: 768px) {
		.commitment-text {
			font-size: 16px;
		}
	}
</style>
