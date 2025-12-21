<script lang="ts">
	import { page } from '$app/stores';
	import { getAppById } from '$lib/data/apps';
	import {
		Download,
		Shield,
		Lock,
		Globe,
		Star,
		FileText,
		Smartphone,
		Search,
		Key,
		DollarSign,
		BarChart2,
		Calendar,
		Link,
		Clock,
		Dumbbell,
		Watch,
		TrendingUp,
		Target,
		PenLine,
		Book,
		Palette,
		Upload,
		Bot,
		User,
		MapPin,
		Phone,
		Video,
		Users,
		MessageSquare,
		Type,
		Clipboard,
		Package,
		Cloud,
		UserX,
		Eye,
		Mail,
		CircleOff,
		Ban,
		Inbox,
		CheckCircle,
		RefreshCw,
		Tag,
		Ghost,
		Fingerprint,
		AlertTriangle,
		Folder,
		Music,
		Mic,
		Sliders,
		Radio,
		FastForward,
		Moon,
		Brain,
		Layers,
		Table2,
		Presentation,
		Map,
		Compass,
		Car,
		Camera,
		Trophy,
		Timer,
		BookOpen,
		ShoppingCart,
		Apple,
		CreditCard,
		Smile,
		MessageCircle,
		Pencil,
		Library,
		Zap,
		Monitor
	} from 'lucide-svelte';

	// Icon map for dynamic icon rendering
	const iconMap: Record<string, any> = {
		Lock,
		FileText,
		Smartphone,
		Search,
		Key,
		DollarSign,
		Shield,
		BarChart2,
		Calendar,
		Link,
		Clock,
		Globe,
		Dumbbell,
		Watch,
		TrendingUp,
		Target,
		PenLine,
		Book,
		Palette,
		Upload,
		Bot,
		User,
		MapPin,
		Phone,
		Video,
		Users,
		MessageSquare,
		Type,
		Clipboard,
		Package,
		Cloud,
		UserX,
		Eye,
		Mail,
		CircleOff,
		Ban,
		Inbox,
		CheckCircle,
		RefreshCw,
		Tag,
		Ghost,
		Fingerprint,
		AlertTriangle,
		Folder,
		Music,
		Mic,
		Sliders,
		Radio,
		Download,
		FastForward,
		Moon,
		Brain,
		Layers,
		Table2,
		Presentation,
		Map,
		Compass,
		Car,
		Camera,
		Trophy,
		Timer,
		BookOpen,
		ShoppingCart,
		Apple,
		CreditCard,
		Smile,
		MessageCircle,
		Pencil,
		Library,
		Zap,
		Monitor,
		Star
	};
	import VuLabsCertified from '$lib/components/badges/VuLabsCertified.svelte';

	$: app = getAppById($page.params.slug || '');

	// Zero-knowledge translation system - all translations embedded
	const translations: Record<string, Record<string, string>> = {
		en: {
			// UI Elements
			'back-to-suite': 'Continue Exploring',
			'key-features': 'Key Features',
			'technology-stack': 'Technology Stack',
			pricing: 'Pricing',
			'choose-monthly': 'Choose Monthly',
			'choose-annual': 'Choose Annual',
			'choose-lifetime': 'Choose Lifetime',
			downloads: 'Downloads',
			reviews: 'Reviews',
			'get-app': 'Get {{appName}}',

			// VuChat specific content
			'vuchat-tagline': 'Chat with confidence',
			'vuchat-description':
				'Quantum-resistant messaging with perfect forward secrecy and no metadata collection.',
			'vuchat-long-description':
				'VuChat provides military-grade encrypted messaging with advanced privacy features. Self-destructing messages, screenshot detection, and anonymous accounts ensure your conversations stay private.',
			'vuchat-privacy-name': 'Quantum-Resistant',
			'vuchat-privacy-desc': 'Future-proof encryption, no metadata',

			// VuChat features
			'quantum-resistant-feature': 'Quantum-Resistant',
			'quantum-resistant-desc': 'Future-proof encryption',
			'self-destruct-feature': 'Self-Destruct',
			'self-destruct-desc': 'Messages disappear automatically',
			'anonymous-feature': 'Anonymous',
			'anonymous-desc': 'No phone number required',
			'screenshot-alert-feature': 'Screenshot Alert',
			'screenshot-alert-desc': 'Know when screenshots are taken',

			// Tech stack
			'vuchat-tech-1': 'Rust',
			'vuchat-tech-2': 'Signal Protocol',
			'vuchat-tech-3': 'KYBER',
			'vuchat-tech-4': 'Tokio'
		},
		es: {
			// UI Elements
			'back-to-suite': 'Continuar Explorando',
			'key-features': 'Características Principales',
			'technology-stack': 'Pila Tecnológica',
			pricing: 'Precios',
			'choose-monthly': 'Elegir Mensual',
			'choose-annual': 'Elegir Anual',
			'choose-lifetime': 'Elegir Vitalicio',
			downloads: 'Descargas',
			reviews: 'Reseñas',
			'get-app': 'Obtener {{appName}}',

			// VuChat specific content
			'vuchat-tagline': 'Chatea con confianza',
			'vuchat-description':
				'Mensajería resistente a la computación cuántica con secreto perfecto hacia adelante y sin recolección de metadatos.',
			'vuchat-long-description':
				'VuChat proporciona mensajería cifrada de grado militar con funciones avanzadas de privacidad. Los mensajes autodestructivos, la detección de capturas de pantalla y las cuentas anónimas garantizan que tus conversaciones se mantengan privadas.',
			'vuchat-privacy-name': 'Resistente a Cuánticos',
			'vuchat-privacy-desc': 'Cifrado a prueba de futuro, sin metadatos',

			// VuChat features
			'quantum-resistant-feature': 'Resistente a Cuánticos',
			'quantum-resistant-desc': 'Cifrado a prueba de futuro',
			'self-destruct-feature': 'Autodestrucción',
			'self-destruct-desc': 'Los mensajes desaparecen automáticamente',
			'anonymous-feature': 'Anónimo',
			'anonymous-desc': 'No se requiere número de teléfono',
			'screenshot-alert-feature': 'Alerta de Captura',
			'screenshot-alert-desc': 'Sabe cuándo se toman capturas',

			// Tech stack
			'vuchat-tech-1': 'Rust',
			'vuchat-tech-2': 'Protocolo Signal',
			'vuchat-tech-3': 'KYBER',
			'vuchat-tech-4': 'Tokio'
		},
		fr: {
			// UI Elements
			'back-to-suite': 'Continuer à Explorer',
			'key-features': 'Fonctionnalités Clés',
			'technology-stack': 'Pile Technologique',
			pricing: 'Tarifs',
			'choose-monthly': 'Choisir Mensuel',
			'choose-annual': 'Choisir Annuel',
			'choose-lifetime': 'Choisir À Vie',
			downloads: 'Téléchargements',
			reviews: 'Avis',
			'get-app': 'Obtenir {{appName}}',

			// VuChat specific content
			'vuchat-tagline': 'Discutez en toute confiance',
			'vuchat-description':
				"Messagerie résistante à l'informatique quantique avec confidentialité parfaite en avant et aucune collecte de métadonnées.",
			'vuchat-long-description':
				"VuChat fournit une messagerie chiffrée de niveau militaire avec des fonctionnalités de confidentialité avancées. Les messages auto-destructeurs, la détection de captures d'écran et les comptes anonymes garantissent que vos conversations restent privées.",
			'vuchat-privacy-name': 'Résistant aux Quanta',
			'vuchat-privacy-desc': 'Chiffrement futur-proof, sans métadonnées',

			// VuChat features
			'quantum-resistant-feature': 'Résistant aux Quanta',
			'quantum-resistant-desc': 'Chiffrement futur-proof',
			'self-destruct-feature': 'Auto-destruction',
			'self-destruct-desc': 'Les messages disparaissent automatiquement',
			'anonymous-feature': 'Anonyme',
			'anonymous-desc': 'Aucun numéro de téléphone requis',
			'screenshot-alert-feature': 'Alerte Capture',
			'screenshot-alert-desc': 'Sachez quand les captures sont prises',

			// Tech stack
			'vuchat-tech-1': 'Rust',
			'vuchat-tech-2': 'Protocole Signal',
			'vuchat-tech-3': 'KYBER',
			'vuchat-tech-4': 'Tokio'
		}
	};

	// Translation state and functions
	let currentLang = 'en';

	function initTranslation() {
		// Check for saved language preference
		const savedLang = localStorage.getItem('vu-language');
		const browserLang = navigator.language.split('-')[0];

		// Use saved preference, or browser language if supported, or default to English
		currentLang = savedLang || (['en', 'es', 'fr'].includes(browserLang) ? browserLang : 'en');

		// Set initial language in selector
		const languageSelect = document.querySelector('.language-select') as HTMLSelectElement;
		if (languageSelect) {
			languageSelect.value = currentLang;
			languageSelect.addEventListener('change', handleLanguageChange);
		}

		// Apply initial translations
		translatePage();
	}

	function handleLanguageChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		currentLang = target.value;
		localStorage.setItem('vu-language', currentLang);
		translatePage();
	}

	function translatePage() {
		const elements = document.querySelectorAll('[data-i18n]');
		elements.forEach((element) => {
			const key = element.getAttribute('data-i18n');
			if (key && translations[currentLang] && translations[currentLang][key]) {
				let text = translations[currentLang][key];

				// Replace placeholders
				if (text.includes('{{appName}}') && app) {
					text = text.replace('{{appName}}', app.name);
				}

				element.textContent = text;
			}
		});
	}

	// Initialize translation system
	import { onMount } from 'svelte';
	onMount(() => {
		// Small delay to ensure DOM is ready
		setTimeout(initTranslation, 100);
	});
</script>

<svelte:head>
	<title>{app ? `${app.name} - VuAppStore` : 'App Not Found - VuAppStore'}</title>
	<meta
		name="description"
		content={app ? app.description : 'The requested app could not be found.'}
	/>
</svelte:head>

{#if app}
	<div class="app-detail-page">
		<!-- Back Button -->
		<div class="container pt-8 pb-4">
			<a
				href="/apps"
				class="text-text-secondary hover:text-primary transition-colors flex items-center gap-2"
				data-i18n="back-to-suite"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg
				>
				Continue Exploring
			</a>
		</div>

		<!-- Hero Section -->
		<section class="app-hero container py-16 relative z-10">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				<div class="app-info">
					<div class="flex items-center gap-3 mb-4">
						<div
							class="app-icon w-20 h-20 bg-surface rounded-2xl flex items-center justify-center text-4xl font-bold"
							style="color: {app.color};"
						>
							{app.icon}
						</div>
						<div>
							<div class="flex items-center gap-3 flex-wrap mb-2">
								<h1 class="text-4xl md:text-5xl font-black">{app.name}</h1>
								{#if app.certified}
									<VuLabsCertified size="md" />
								{/if}
							</div>
							{#if app.id === 'vuchat'}
								<p class="text-lg text-text-secondary italic" data-i18n="vuchat-tagline">
									{app.tagline}
								</p>
							{:else}
								<p class="text-lg text-text-secondary italic">{app.tagline}</p>
							{/if}
							{#if app.developer}
								<p class="text-sm text-primary font-mono mt-1">by {app.developer}</p>
							{/if}
						</div>
					</div>

					{#if app.id === 'vuchat'}
						<p
							class="text-text-secondary text-lg leading-relaxed mb-6"
							data-i18n="vuchat-long-description"
						>
							{app.longDescription}
						</p>
					{:else}
						<p class="text-text-secondary text-lg leading-relaxed mb-6">
							{app.longDescription}
						</p>
					{/if}

					<div class="privacy-level glass-card p-4 mb-6">
						<div class="flex items-center gap-3">
							<Shield class="w-8 h-8 text-success" />
							<div>
								{#if app.id === 'vuchat'}
									<div class="font-semibold text-success" data-i18n="vuchat-privacy-name">
										{app.privacyName}
									</div>
									<div class="text-sm text-text-secondary" data-i18n="vuchat-privacy-desc">
										{app.privacyDesc}
									</div>
								{:else}
									<div class="font-semibold text-success">{app.privacyName}</div>
									<div class="text-sm text-text-secondary">{app.privacyDesc}</div>
								{/if}
							</div>
							<div class="ml-auto">
								<div
									class="privacy-badge w-12 h-12 bg-success/20 rounded-full flex items-center justify-center text-xl font-bold text-success"
								>
									{app.privacyLevel}
								</div>
							</div>
						</div>
					</div>

					<div class="stats grid grid-cols-3 gap-4 mb-6">
						<div class="stat glass-card p-4 text-center">
							<div class="stat-value text-2xl font-bold text-primary mb-1">
								{(app.downloads / 1000).toFixed(0)}K
							</div>
							<div class="stat-label text-xs text-text-secondary" data-i18n="downloads">
								Downloads
							</div>
						</div>
						<div class="stat glass-card p-4 text-center">
							<div
								class="stat-value text-2xl font-bold text-primary mb-1 flex items-center justify-center gap-1"
							>
								{app.rating}
								<Star class="w-4 h-4 fill-current" />
							</div>
							<div class="stat-label text-xs text-text-secondary" data-i18n="reviews">Rating</div>
						</div>
						<div class="stat glass-card p-4 text-center">
							<div class="stat-value text-2xl font-bold text-primary mb-1">
								{(app.reviews / 1000).toFixed(1)}K
							</div>
							<div class="stat-label text-xs text-text-secondary" data-i18n="reviews">Reviews</div>
						</div>
					</div>

					<a href="/pricing" class="btn btn-primary text-lg px-8 py-4" data-i18n="get-app">
						<Download class="w-5 h-5" />
						Get {app.name}
					</a>
				</div>

				<div class="app-preview">
					<div class="preview-mockup glass-card p-8 aspect-video flex items-center justify-center">
						<div class="text-6xl font-bold" style="color: {app.color};">
							{app.icon}
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Features Section -->
		<section class="features-section container mb-16 relative z-10">
			<h2 class="text-3xl font-bold mb-8" data-i18n="key-features">Key Features</h2>
			<div class="features-grid grid grid-cols-1 md:grid-cols-2 gap-6">
				{#each app.features as feature, index}
					<div class="feature-card glass-card p-6">
						<div class="flex items-start gap-4">
							<div class="feature-icon">
								{#if iconMap[feature.icon]}
									<svelte:component
										this={iconMap[feature.icon]}
										class="w-8 h-8"
										style="color: {app.color};"
									/>
								{:else}
									<span class="text-3xl" style="color: {app.color};">V</span>
								{/if}
							</div>
							<div>
								{#if app.id === 'vuchat'}
									{#if index === 0}
										<h3 class="text-lg font-semibold mb-2" data-i18n="quantum-resistant-feature">
											{feature.title}
										</h3>
										<p class="text-sm text-text-secondary" data-i18n="quantum-resistant-desc">
											{feature.desc}
										</p>
									{:else if index === 1}
										<h3 class="text-lg font-semibold mb-2" data-i18n="self-destruct-feature">
											{feature.title}
										</h3>
										<p class="text-sm text-text-secondary" data-i18n="self-destruct-desc">
											{feature.desc}
										</p>
									{:else if index === 2}
										<h3 class="text-lg font-semibold mb-2" data-i18n="anonymous-feature">
											{feature.title}
										</h3>
										<p class="text-sm text-text-secondary" data-i18n="anonymous-desc">
											{feature.desc}
										</p>
									{:else if index === 3}
										<h3 class="text-lg font-semibold mb-2" data-i18n="screenshot-alert-feature">
											{feature.title}
										</h3>
										<p class="text-sm text-text-secondary" data-i18n="screenshot-alert-desc">
											{feature.desc}
										</p>
									{:else}
										<h3 class="text-lg font-semibold mb-2">{feature.title}</h3>
										<p class="text-sm text-text-secondary">{feature.desc}</p>
									{/if}
								{:else}
									<h3 class="text-lg font-semibold mb-2">{feature.title}</h3>
									<p class="text-sm text-text-secondary">{feature.desc}</p>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Tech Stack Section -->
		<section class="tech-stack-section container mb-16 relative z-10">
			<h2 class="text-3xl font-bold mb-8" data-i18n="technology-stack">Technology Stack</h2>
			<div class="tech-stack flex flex-wrap gap-3">
				{#each app.techStack as tech, index}
					{#if app.id === 'vuchat'}
						<span
							class="tech-badge glass-card px-4 py-2 text-sm font-medium"
							data-i18n="vuchat-tech-{index + 1}"
						>
							{tech}
						</span>
					{:else}
						<span class="tech-badge glass-card px-4 py-2 text-sm font-medium">
							{tech}
						</span>
					{/if}
				{/each}
			</div>
		</section>

		<!-- Pricing Section -->
		<section class="app-pricing-section container mb-16 relative z-10">
			<h2 class="text-3xl font-bold mb-8" data-i18n="pricing">Pricing</h2>
			<div class="pricing-grid grid grid-cols-1 md:grid-cols-3 gap-6">
				<div class="pricing-card glass-card p-6">
					<h3 class="text-xl font-semibold mb-2" data-i18n="choose-monthly">Monthly</h3>
					<div class="price mb-4">
						<span class="text-3xl font-bold">${app.pricing.monthly}</span>
						<span class="text-text-secondary">/month</span>
					</div>
					<a
						href="/pricing"
						class="btn btn-secondary w-full justify-center"
						data-i18n="choose-monthly">Choose Monthly</a
					>
				</div>
				<div class="pricing-card glass-card p-6 border-primary/50">
					<span
						class="popular-badge inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full mb-3"
					>
						BEST VALUE
					</span>
					<h3 class="text-xl font-semibold mb-2" data-i18n="choose-annual">Annual</h3>
					<div class="price mb-4">
						<span class="text-3xl font-bold">${app.pricing.yearly}</span>
						<span class="text-text-secondary">/year</span>
					</div>
					<a href="/pricing" class="btn btn-primary w-full justify-center" data-i18n="choose-annual"
						>Choose Annual</a
					>
				</div>
				<div class="pricing-card glass-card p-6">
					<h3 class="text-xl font-semibold mb-2" data-i18n="choose-lifetime">Lifetime</h3>
					<div class="price mb-4">
						<span class="text-3xl font-bold">${app.pricing.lifetime}</span>
						<span class="text-text-secondary">/once</span>
					</div>
					<a
						href="/pricing"
						class="btn btn-secondary w-full justify-center"
						data-i18n="choose-lifetime">Choose Lifetime</a
					>
				</div>
			</div>
		</section>
	</div>
{:else}
	<div class="container py-16 text-center relative z-10">
		<h1 class="text-4xl font-bold mb-4">App Not Found</h1>
		<p class="text-text-secondary mb-8">The app you're looking for doesn't exist.</p>
		<a href="/apps" class="btn btn-primary">Browse All Apps</a>
	</div>
{/if}
