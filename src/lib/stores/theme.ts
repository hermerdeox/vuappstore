/**
 * Theme Management Store
 * Non-destructive theme switching between Modern and Brutalist
 */

import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'modern' | 'brutalist';

// Initialize theme from localStorage or default to modern
function getInitialTheme(): Theme {
	if (!browser) return 'modern';
	
	const saved = localStorage.getItem('vu-theme');
	if (saved === 'brutalist' || saved === 'modern') {
		return saved as Theme;
	}
	
	return 'modern';
}

// Create the theme store
export const currentTheme = writable<Theme>(getInitialTheme());

// Subscribe to theme changes and update DOM
if (browser) {
	currentTheme.subscribe((theme) => {
		// Save to localStorage
		localStorage.setItem('vu-theme', theme);
		
		// Update body class
		if (theme === 'brutalist') {
			document.body.classList.add('theme-brutalist');
			document.body.classList.remove('theme-modern');
		} else {
			document.body.classList.add('theme-modern');
			document.body.classList.remove('theme-brutalist');
		}
	});
	
	// Apply initial theme class
	const initial = getInitialTheme();
	if (initial === 'brutalist') {
		document.body.classList.add('theme-brutalist');
	} else {
		document.body.classList.add('theme-modern');
	}
}

/**
 * Toggle between Modern and Brutalist themes
 */
export function toggleTheme(): void {
	currentTheme.update(current => current === 'modern' ? 'brutalist' : 'modern');
}

/**
 * Set specific theme
 */
export function setTheme(theme: Theme): void {
	currentTheme.set(theme);
}

/**
 * Get current theme (for use outside of Svelte components)
 */
export function getTheme(): Theme {
	if (!browser) return 'modern';
	return localStorage.getItem('vu-theme') as Theme || 'modern';
}

