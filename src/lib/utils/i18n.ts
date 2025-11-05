/**
 * Translation utility functions
 * Client-side only, zero-knowledge translation system
 */

import { translations, type Language } from '$lib/stores/translations';

/**
 * Initialize translation system on page
 * Call this in onMount() for each page that needs translations
 */
export function initTranslation(): void {
	if (typeof window === 'undefined') return;
	
	// Get saved language or detect browser language
	const savedLang = localStorage.getItem('vu-language');
	const browserLang = navigator.language.split('-')[0];
	const currentLang = savedLang || (['en', 'es', 'fr'].includes(browserLang) ? browserLang : 'en');
	
	// Set language selector if it exists
	const languageSelect = document.querySelector('.language-select') as HTMLSelectElement;
	if (languageSelect) {
		languageSelect.value = currentLang;
		
		// Remove any existing listeners to prevent duplicates
		const newSelect = languageSelect.cloneNode(true) as HTMLSelectElement;
		languageSelect.parentNode?.replaceChild(newSelect, languageSelect);
		
		// Add new listener
		newSelect.addEventListener('change', handleLanguageChange);
	}
	
	// Apply translations
	translatePage(currentLang);
}

/**
 * Handle language change from selector
 */
function handleLanguageChange(event: Event): void {
	const target = event.target as HTMLSelectElement;
	const newLang = target.value;
	localStorage.setItem('vu-language', newLang);
	translatePage(newLang);
}

/**
 * Translate all elements with data-i18n attribute
 */
export function translatePage(lang: string): void {
	const elements = document.querySelectorAll('[data-i18n]');
	
	elements.forEach(element => {
		const key = element.getAttribute('data-i18n');
		if (!key) return;
		
		const translation = translations[lang as Language]?.[key] || translations['en'][key] || key;
		
		// Handle HTML content if data-i18n-html attribute is present
		if (element.hasAttribute('data-i18n-html')) {
			element.innerHTML = translation;
		} else {
			element.textContent = translation;
		}
	});
}

/**
 * Get translation for a specific key
 */
export function t(key: string, lang: string = 'en'): string {
	return translations[lang as Language]?.[key] || translations['en'][key] || key;
}

/**
 * Get current language
 */
export function getCurrentLang(): string {
	if (typeof window === 'undefined') return 'en';
	return localStorage.getItem('vu-language') || 'en';
}

