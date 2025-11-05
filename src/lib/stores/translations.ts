/**
 * Zero-Knowledge Translation System
 * Privacy-first, client-side only, no external API calls
 * All translations embedded in the application
 */

export type Language = 'en' | 'es' | 'fr';

export const SUPPORTED_LANGUAGES: Language[] = ['en', 'es', 'fr'];

export const LANGUAGE_NAMES: Record<Language, string> = {
	en: 'English',
	es: 'Español',
	fr: 'Français'
};

/**
 * All translations for the entire application
 * Organized by page/component for maintainability
 */
export const translations: Record<Language, Record<string, string>> = {
	en: {
		// Common UI
		'common.continue-exploring': 'Continue Exploring',
		'common.learn-more': 'Learn More',
		'common.get-started': 'Get Started',
		'common.back': 'Back',
		'common.next': 'Next',
		'common.previous': 'Previous',
		'common.close': 'Close',
		'common.submit': 'Submit',
		'common.cancel': 'Cancel',
		'common.save': 'Save',
		'common.email': 'Email',
		'common.name': 'Name',
		'common.message': 'Message',
		
		// Footer
		'footer.tagline': 'Your Privacy, Our Priority',
		'footer.description': 'Premium privacy-focused applications that respect your data. No tracking, no surveillance, just powerful software.',
		'footer.trust.ssl': 'SSL Secured',
		'footer.trust.pci': 'PCI Compliant',
		'footer.trust.gdpr': 'GDPR Compliant',
		'footer.trust.zerologs': 'Zero Logs',
		'footer.section.resources': 'Resources',
		'footer.section.company': 'Company',
		'footer.section.legal': 'Legal & Compliance',
		'footer.section.developers': 'Developers',
		'footer.link.privacy-levels': 'VU Zero Privacy Levels',
		'footer.link.privacy-guide': 'Privacy Guide',
		'footer.link.security': 'Security Best Practices',
		'footer.link.comparison': 'VU vs Big Tech',
		'footer.link.migration': 'Migration Guides',
		'footer.link.educational': 'Educational Resources',
		'footer.link.affiliate': 'Affiliate Program',
		'footer.link.about': 'About Us',
		'footer.link.mission': 'Our Mission',
		'footer.link.team': 'Team',
		'footer.link.blog': 'Blog',
		'footer.link.contact': 'Contact',
		'footer.link.support': 'Support Center',
		'footer.link.faq': 'FAQ',
		'footer.link.terms': 'Terms of Service',
		'footer.link.privacy': 'Privacy Policy',
		'footer.link.refund': 'Refund Policy',
		'footer.link.acceptable-use': 'Acceptable Use Policy',
		'footer.link.gdpr-compliance': 'GDPR Compliance',
		'footer.link.ccpa': 'CCPA Compliance',
		'footer.link.data-processing': 'Data Processing Agreement',
		'footer.link.developer-portal': 'Developer Portal',
		'footer.link.api': 'API Documentation',
		'footer.link.docs': 'Technical Docs',
		'footer.link.contribute': 'Contribute',
		'footer.link.bug-bounty': 'Bug Bounty',
		'footer.link.github': 'GitHub',
		'footer.payments': 'Privacy Payments via',
		'footer.copyright': '© 2024 VuAppStore. All rights reserved.',
		'footer.company-info': 'VU Digital Privacy Solutions LLC | Delaware, USA',
		'footer.theme': 'Theme',
		
		// About Pages
		'about.title': 'About Us',
		'about.subtitle': 'Building the future of privacy-first technology',
		'about.intro': 'VuAppStore is more than a marketplace — it\'s a movement. We believe technology should empower, not exploit.',
		'about.mission.title': 'Our Mission',
		'about.mission.subtitle': 'The Greatest Privacy Journey In Technology History',
		'about.mission.intro': 'We\'re on a mission to prove that privacy and convenience aren\'t mutually exclusive.',
		'about.team.title': 'Our Team',
		'about.team.subtitle': 'Meet the privacy pioneers building the future',
		
		// Support Pages
		'support.title': 'Support Center',
		'support.subtitle': 'How can we help you today?',
		'support.faq.title': 'Frequently Asked Questions',
		'support.faq.subtitle': 'Find quick answers to your questions about VuAppStore, our privacy-first apps, billing, and support.',
		'support.contact.title': 'Contact Support',
		'support.contact.subtitle': 'Get in touch with our support team',
		'support.contact.name': 'Your Name',
		'support.contact.email': 'Email Address',
		'support.contact.subject': 'Subject',
		'support.contact.message': 'Message',
		'support.contact.send': 'Send Message',
		
		// Legal Pages
		'legal.terms.title': 'Terms of Service',
		'legal.privacy.title': 'Privacy Policy',
		'legal.refund.title': 'Refund Policy',
		'legal.acceptable-use.title': 'Acceptable Use Policy',
		'legal.gdpr.title': 'GDPR Compliance',
		'legal.ccpa.title': 'CCPA Compliance',
		'legal.data-processing.title': 'Data Processing Agreement',
		'legal.last-updated': 'Last Updated',
		'legal.contact.title': 'Contact Us',
		'legal.contact.text': 'If you have any questions about this policy, please contact us:',
		
		// Developer Pages
		'dev.title': 'Developer Portal',
		'dev.subtitle': 'Build privacy-first applications with VU',
		'dev.api.title': 'API Documentation',
		'dev.api.subtitle': 'Build privacy-first integrations with our secure, well-documented REST API.',
		'dev.docs.title': 'Technical Documentation',
		'dev.docs.subtitle': 'Comprehensive guides and references for developers',
		'dev.contribute.title': 'Contribute',
		'dev.contribute.subtitle': 'Join the privacy revolution',
		'dev.bug-bounty.title': 'Bug Bounty Program',
		'dev.bug-bounty.subtitle': 'Help secure privacy-first applications and earn rewards up to $50,000 for critical vulnerabilities.',
		
		// Resource Pages
		'resources.privacy-guide.title': 'Privacy Guide',
		'resources.privacy-guide.subtitle': 'Complete guide to digital privacy',
		'resources.security.title': 'Security Best Practices',
		'resources.security.subtitle': 'Essential security best practices for digital privacy',
		'resources.comparison.title': 'VU vs Big Tech',
		'resources.comparison.subtitle': 'Privacy Comparison',
		'resources.migration.title': 'Migration Guide',
		'resources.migration.subtitle': 'Complete guide to migrating from Big Tech apps to privacy-first VU Suite alternatives.',
		'resources.educational.title': 'Educational Resources',
		'resources.educational.subtitle': 'Free educational resources about digital privacy and security',
		
		// Other Pages
		'pricing.title': 'Pricing',
		'pricing.subtitle': 'Choose the plan that works for you',
		'affiliate.title': 'Affiliate Program',
		'affiliate.subtitle': 'Earn commission promoting privacy-first applications',
		'blog.title': 'Blog',
		'blog.subtitle': 'Latest news and updates from VuAppStore',
		'account.title': 'My Account',
		'account.subtitle': 'Manage your VU Suite subscription'
	},
	es: {
		// Common UI
		'common.continue-exploring': 'Continuar Explorando',
		'common.learn-more': 'Saber Más',
		'common.get-started': 'Comenzar',
		'common.back': 'Atrás',
		'common.next': 'Siguiente',
		'common.previous': 'Anterior',
		'common.close': 'Cerrar',
		'common.submit': 'Enviar',
		'common.cancel': 'Cancelar',
		'common.save': 'Guardar',
		'common.email': 'Correo Electrónico',
		'common.name': 'Nombre',
		'common.message': 'Mensaje',
		
		// Footer
		'footer.tagline': 'Tu Privacidad, Nuestra Prioridad',
		'footer.description': 'Aplicaciones premium enfocadas en la privacidad que respetan tus datos. Sin rastreo, sin vigilancia, solo software poderoso.',
		'footer.trust.ssl': 'SSL Seguro',
		'footer.trust.pci': 'Cumple PCI',
		'footer.trust.gdpr': 'Cumple GDPR',
		'footer.trust.zerologs': 'Cero Registros',
		'footer.section.resources': 'Recursos',
		'footer.section.company': 'Empresa',
		'footer.section.legal': 'Legal y Cumplimiento',
		'footer.section.developers': 'Desarrolladores',
		'footer.link.privacy-levels': 'Niveles de Privacidad VU Zero',
		'footer.link.privacy-guide': 'Guía de Privacidad',
		'footer.link.security': 'Mejores Prácticas de Seguridad',
		'footer.link.comparison': 'VU vs Big Tech',
		'footer.link.migration': 'Guías de Migración',
		'footer.link.educational': 'Recursos Educativos',
		'footer.link.affiliate': 'Programa de Afiliados',
		'footer.link.about': 'Sobre Nosotros',
		'footer.link.mission': 'Nuestra Misión',
		'footer.link.team': 'Equipo',
		'footer.link.blog': 'Blog',
		'footer.link.contact': 'Contacto',
		'footer.link.support': 'Centro de Soporte',
		'footer.link.faq': 'Preguntas Frecuentes',
		'footer.link.terms': 'Términos de Servicio',
		'footer.link.privacy': 'Política de Privacidad',
		'footer.link.refund': 'Política de Reembolso',
		'footer.link.acceptable-use': 'Política de Uso Aceptable',
		'footer.link.gdpr-compliance': 'Cumplimiento GDPR',
		'footer.link.ccpa': 'Cumplimiento CCPA',
		'footer.link.data-processing': 'Acuerdo de Procesamiento de Datos',
		'footer.link.developer-portal': 'Portal de Desarrolladores',
		'footer.link.api': 'Documentación de API',
		'footer.link.docs': 'Documentación Técnica',
		'footer.link.contribute': 'Contribuir',
		'footer.link.bug-bounty': 'Programa de Recompensas',
		'footer.link.github': 'GitHub',
		'footer.payments': 'Pagos Privados vía',
		'footer.copyright': '© 2024 VuAppStore. Todos los derechos reservados.',
		'footer.company-info': 'VU Digital Privacy Solutions LLC | Delaware, EE.UU.',
		'footer.theme': 'Tema',
		
		// About Pages
		'about.title': 'Sobre Nosotros',
		'about.subtitle': 'Construyendo el futuro de la tecnología centrada en la privacidad',
		'about.intro': 'VuAppStore es más que un mercado: es un movimiento. Creemos que la tecnología debe empoderar, no explotar.',
		'about.mission.title': 'Nuestra Misión',
		'about.mission.subtitle': 'El Mayor Viaje de Privacidad en la Historia de la Tecnología',
		'about.mission.intro': 'Estamos en una misión para demostrar que la privacidad y la conveniencia no son mutuamente excluyentes.',
		'about.team.title': 'Nuestro Equipo',
		'about.team.subtitle': 'Conoce a los pioneros de la privacidad que construyen el futuro',
		
		// Support Pages
		'support.title': 'Centro de Soporte',
		'support.subtitle': '¿Cómo podemos ayudarte hoy?',
		'support.faq.title': 'Preguntas Frecuentes',
		'support.faq.subtitle': 'Encuentra respuestas rápidas a tus preguntas sobre VuAppStore, nuestras aplicaciones centradas en la privacidad, facturación y soporte.',
		'support.contact.title': 'Contactar Soporte',
		'support.contact.subtitle': 'Ponte en contacto con nuestro equipo de soporte',
		'support.contact.name': 'Tu Nombre',
		'support.contact.email': 'Dirección de Correo',
		'support.contact.subject': 'Asunto',
		'support.contact.message': 'Mensaje',
		'support.contact.send': 'Enviar Mensaje',
		
		// Legal Pages
		'legal.terms.title': 'Términos de Servicio',
		'legal.privacy.title': 'Política de Privacidad',
		'legal.refund.title': 'Política de Reembolso',
		'legal.acceptable-use.title': 'Política de Uso Aceptable',
		'legal.gdpr.title': 'Cumplimiento GDPR',
		'legal.ccpa.title': 'Cumplimiento CCPA',
		'legal.data-processing.title': 'Acuerdo de Procesamiento de Datos',
		'legal.last-updated': 'Última Actualización',
		'legal.contact.title': 'Contáctanos',
		'legal.contact.text': 'Si tienes alguna pregunta sobre esta política, contáctanos:',
		
		// Developer Pages
		'dev.title': 'Portal de Desarrolladores',
		'dev.subtitle': 'Construye aplicaciones centradas en la privacidad con VU',
		'dev.api.title': 'Documentación de API',
		'dev.api.subtitle': 'Construye integraciones centradas en la privacidad con nuestra API REST segura y bien documentada.',
		'dev.docs.title': 'Documentación Técnica',
		'dev.docs.subtitle': 'Guías y referencias completas para desarrolladores',
		'dev.contribute.title': 'Contribuir',
		'dev.contribute.subtitle': 'Únete a la revolución de la privacidad',
		'dev.bug-bounty.title': 'Programa de Recompensas',
		'dev.bug-bounty.subtitle': 'Ayuda a asegurar aplicaciones centradas en la privacidad y gana recompensas de hasta $50,000 por vulnerabilidades críticas.',
		
		// Resource Pages
		'resources.privacy-guide.title': 'Guía de Privacidad',
		'resources.privacy-guide.subtitle': 'Guía completa sobre privacidad digital',
		'resources.security.title': 'Mejores Prácticas de Seguridad',
		'resources.security.subtitle': 'Prácticas de seguridad esenciales para la privacidad digital',
		'resources.comparison.title': 'VU vs Big Tech',
		'resources.comparison.subtitle': 'Comparación de Privacidad',
		'resources.migration.title': 'Guía de Migración',
		'resources.migration.subtitle': 'Guía completa para migrar de aplicaciones Big Tech a alternativas VU Suite centradas en la privacidad.',
		'resources.educational.title': 'Recursos Educativos',
		'resources.educational.subtitle': 'Recursos educativos gratuitos sobre privacidad y seguridad digital',
		
		// Other Pages
		'pricing.title': 'Precios',
		'pricing.subtitle': 'Elige el plan que funcione para ti',
		'affiliate.title': 'Programa de Afiliados',
		'affiliate.subtitle': 'Gana comisiones promoviendo aplicaciones centradas en la privacidad',
		'blog.title': 'Blog',
		'blog.subtitle': 'Últimas noticias y actualizaciones de VuAppStore',
		'account.title': 'Mi Cuenta',
		'account.subtitle': 'Administra tu suscripción VU Suite'
	},
	fr: {
		// Common UI
		'common.continue-exploring': 'Continuer à Explorer',
		'common.learn-more': 'En Savoir Plus',
		'common.get-started': 'Commencer',
		'common.back': 'Retour',
		'common.next': 'Suivant',
		'common.previous': 'Précédent',
		'common.close': 'Fermer',
		'common.submit': 'Soumettre',
		'common.cancel': 'Annuler',
		'common.save': 'Enregistrer',
		'common.email': 'Email',
		'common.name': 'Nom',
		'common.message': 'Message',
		
		// Footer
		'footer.tagline': 'Votre Vie Privée, Notre Priorité',
		'footer.description': 'Applications premium axées sur la confidentialité qui respectent vos données. Pas de suivi, pas de surveillance, juste des logiciels puissants.',
		'footer.trust.ssl': 'Sécurisé SSL',
		'footer.trust.pci': 'Conforme PCI',
		'footer.trust.gdpr': 'Conforme RGPD',
		'footer.trust.zerologs': 'Zéro Journaux',
		'footer.section.resources': 'Ressources',
		'footer.section.company': 'Entreprise',
		'footer.section.legal': 'Légal et Conformité',
		'footer.section.developers': 'Développeurs',
		'footer.link.privacy-levels': 'Niveaux de Confidentialité VU Zero',
		'footer.link.privacy-guide': 'Guide de Confidentialité',
		'footer.link.security': 'Meilleures Pratiques de Sécurité',
		'footer.link.comparison': 'VU vs Big Tech',
		'footer.link.migration': 'Guides de Migration',
		'footer.link.educational': 'Ressources Éducatives',
		'footer.link.affiliate': 'Programme d\'Affiliation',
		'footer.link.about': 'À Propos',
		'footer.link.mission': 'Notre Mission',
		'footer.link.team': 'Équipe',
		'footer.link.blog': 'Blog',
		'footer.link.contact': 'Contact',
		'footer.link.support': 'Centre d\'Assistance',
		'footer.link.faq': 'FAQ',
		'footer.link.terms': 'Conditions de Service',
		'footer.link.privacy': 'Politique de Confidentialité',
		'footer.link.refund': 'Politique de Remboursement',
		'footer.link.acceptable-use': 'Politique d\'Utilisation Acceptable',
		'footer.link.gdpr-compliance': 'Conformité RGPD',
		'footer.link.ccpa': 'Conformité CCPA',
		'footer.link.data-processing': 'Accord de Traitement des Données',
		'footer.link.developer-portal': 'Portail Développeurs',
		'footer.link.api': 'Documentation API',
		'footer.link.docs': 'Documentation Technique',
		'footer.link.contribute': 'Contribuer',
		'footer.link.bug-bounty': 'Programme de Primes',
		'footer.link.github': 'GitHub',
		'footer.payments': 'Paiements Privés via',
		'footer.copyright': '© 2024 VuAppStore. Tous droits réservés.',
		'footer.company-info': 'VU Digital Privacy Solutions LLC | Delaware, États-Unis',
		'footer.theme': 'Thème',
		
		// About Pages
		'about.title': 'À Propos',
		'about.subtitle': 'Construire l\'avenir de la technologie axée sur la confidentialité',
		'about.intro': 'VuAppStore est plus qu\'un marché — c\'est un mouvement. Nous croyons que la technologie devrait autonomiser, pas exploiter.',
		'about.mission.title': 'Notre Mission',
		'about.mission.subtitle': 'Le Plus Grand Voyage de Confidentialité de l\'Histoire de la Technologie',
		'about.mission.intro': 'Nous sommes en mission pour prouver que la confidentialité et la commodité ne s\'excluent pas mutuellement.',
		'about.team.title': 'Notre Équipe',
		'about.team.subtitle': 'Rencontrez les pionniers de la confidentialité qui construisent l\'avenir',
		
		// Support Pages
		'support.title': 'Centre d\'Assistance',
		'support.subtitle': 'Comment pouvons-nous vous aider aujourd\'hui?',
		'support.faq.title': 'Questions Fréquemment Posées',
		'support.faq.subtitle': 'Trouvez des réponses rapides à vos questions sur VuAppStore, nos applications axées sur la confidentialité, la facturation et l\'assistance.',
		'support.contact.title': 'Contacter l\'Assistance',
		'support.contact.subtitle': 'Contactez notre équipe d\'assistance',
		'support.contact.name': 'Votre Nom',
		'support.contact.email': 'Adresse Email',
		'support.contact.subject': 'Sujet',
		'support.contact.message': 'Message',
		'support.contact.send': 'Envoyer le Message',
		
		// Legal Pages
		'legal.terms.title': 'Conditions de Service',
		'legal.privacy.title': 'Politique de Confidentialité',
		'legal.refund.title': 'Politique de Remboursement',
		'legal.acceptable-use.title': 'Politique d\'Utilisation Acceptable',
		'legal.gdpr.title': 'Conformité RGPD',
		'legal.ccpa.title': 'Conformité CCPA',
		'legal.data-processing.title': 'Accord de Traitement des Données',
		'legal.last-updated': 'Dernière Mise à Jour',
		'legal.contact.title': 'Contactez-Nous',
		'legal.contact.text': 'Si vous avez des questions sur cette politique, veuillez nous contacter:',
		
		// Developer Pages
		'dev.title': 'Portail Développeurs',
		'dev.subtitle': 'Créez des applications axées sur la confidentialité avec VU',
		'dev.api.title': 'Documentation API',
		'dev.api.subtitle': 'Créez des intégrations axées sur la confidentialité avec notre API REST sécurisée et bien documentée.',
		'dev.docs.title': 'Documentation Technique',
		'dev.docs.subtitle': 'Guides et références complets pour les développeurs',
		'dev.contribute.title': 'Contribuer',
		'dev.contribute.subtitle': 'Rejoignez la révolution de la confidentialité',
		'dev.bug-bounty.title': 'Programme de Primes',
		'dev.bug-bounty.subtitle': 'Aidez à sécuriser les applications axées sur la confidentialité et gagnez des récompenses jusqu\'à 50 000 $ pour les vulnérabilités critiques.',
		
		// Resource Pages
		'resources.privacy-guide.title': 'Guide de Confidentialité',
		'resources.privacy-guide.subtitle': 'Guide complet sur la confidentialité numérique',
		'resources.security.title': 'Meilleures Pratiques de Sécurité',
		'resources.security.subtitle': 'Pratiques de sécurité essentielles pour la confidentialité numérique',
		'resources.comparison.title': 'VU vs Big Tech',
		'resources.comparison.subtitle': 'Comparaison de Confidentialité',
		'resources.migration.title': 'Guide de Migration',
		'resources.migration.subtitle': 'Guide complet pour migrer des applications Big Tech vers des alternatives VU Suite axées sur la confidentialité.',
		'resources.educational.title': 'Ressources Éducatives',
		'resources.educational.subtitle': 'Ressources éducatives gratuites sur la confidentialité et la sécurité numériques',
		
		// Other Pages
		'pricing.title': 'Tarifs',
		'pricing.subtitle': 'Choisissez le plan qui vous convient',
		'affiliate.title': 'Programme d\'Affiliation',
		'affiliate.subtitle': 'Gagnez des commissions en promouvant des applications axées sur la confidentialité',
		'blog.title': 'Blog',
		'blog.subtitle': 'Dernières nouvelles et mises à jour de VuAppStore',
		'account.title': 'Mon Compte',
		'account.subtitle': 'Gérez votre abonnement VU Suite'
	}
};

/**
 * Get translation for a key
 */
export function t(key: string, lang: Language = 'en'): string {
	return translations[lang][key] || translations['en'][key] || key;
}

/**
 * Get current language from localStorage
 */
export function getCurrentLanguage(): Language {
	if (typeof window === 'undefined') return 'en';
	
	const saved = localStorage.getItem('vu-language') as Language;
	if (saved && SUPPORTED_LANGUAGES.includes(saved)) {
		return saved;
	}
	
	// Check browser language
	const browserLang = navigator.language.split('-')[0] as Language;
	return SUPPORTED_LANGUAGES.includes(browserLang) ? browserLang : 'en';
}

/**
 * Set current language
 */
export function setLanguage(lang: Language): void {
	if (typeof window === 'undefined') return;
	localStorage.setItem('vu-language', lang);
}

