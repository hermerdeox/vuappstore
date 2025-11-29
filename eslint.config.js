import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import svelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import prettier from 'eslint-config-prettier';

export default [
	js.configs.recommended,
	prettier,
	{
		files: ['**/*.ts'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: './tsconfig.json',
				extraFileExtensions: ['.svelte']
			},
			globals: {
				console: 'readonly',
				process: 'readonly',
				setTimeout: 'readonly',
				clearTimeout: 'readonly',
				setInterval: 'readonly',
				clearInterval: 'readonly',
				fetch: 'readonly',
				Response: 'readonly',
				Request: 'readonly',
				Headers: 'readonly',
				URL: 'readonly',
				URLSearchParams: 'readonly',
				crypto: 'readonly',
				TextEncoder: 'readonly',
				TextDecoder: 'readonly',
				Uint8Array: 'readonly',
				ArrayBuffer: 'readonly',
				Map: 'readonly',
				Set: 'readonly',
				Promise: 'readonly',
				Date: 'readonly',
				JSON: 'readonly',
				Math: 'readonly',
				Object: 'readonly',
				Array: 'readonly',
				String: 'readonly',
				Number: 'readonly',
				Boolean: 'readonly',
				Error: 'readonly',
				document: 'readonly',
				window: 'readonly',
				localStorage: 'readonly',
				sessionStorage: 'readonly',
				navigator: 'readonly',
				location: 'readonly',
				history: 'readonly',
				atob: 'readonly',
				btoa: 'readonly'
			}
		},
		plugins: {
			'@typescript-eslint': ts
		},
		rules: {
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/no-explicit-any': 'warn',
			'no-console': ['warn', { allow: ['warn', 'error'] }],
			'no-unused-vars': 'off' // Use TypeScript's version
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: tsParser
			},
			globals: {
				console: 'readonly',
				document: 'readonly',
				window: 'readonly',
				localStorage: 'readonly',
				sessionStorage: 'readonly',
				navigator: 'readonly',
				location: 'readonly',
				history: 'readonly',
				fetch: 'readonly',
				setTimeout: 'readonly',
				clearTimeout: 'readonly',
				setInterval: 'readonly',
				clearInterval: 'readonly',
				requestAnimationFrame: 'readonly',
				cancelAnimationFrame: 'readonly',
				CustomEvent: 'readonly',
				Event: 'readonly',
				MouseEvent: 'readonly',
				KeyboardEvent: 'readonly',
				IntersectionObserver: 'readonly',
				MutationObserver: 'readonly',
				ResizeObserver: 'readonly',
				matchMedia: 'readonly',
				getComputedStyle: 'readonly',
				HTMLElement: 'readonly',
				Element: 'readonly',
				Node: 'readonly',
				NodeList: 'readonly',
				URL: 'readonly',
				URLSearchParams: 'readonly',
				Map: 'readonly',
				Set: 'readonly',
				Promise: 'readonly',
				Date: 'readonly',
				JSON: 'readonly',
				Math: 'readonly',
				Object: 'readonly',
				Array: 'readonly',
				String: 'readonly',
				Number: 'readonly',
				Boolean: 'readonly',
				Error: 'readonly',
				crypto: 'readonly',
				TextEncoder: 'readonly',
				TextDecoder: 'readonly',
				Uint8Array: 'readonly',
				ArrayBuffer: 'readonly',
				atob: 'readonly',
				btoa: 'readonly'
			}
		},
		plugins: {
			svelte
		},
		rules: {
			...svelte.configs.recommended.rules,
			'no-undef': 'off', // Svelte handles this
			'no-unused-vars': 'off' // Svelte handles this
		}
	},
	{
		ignores: [
			'.svelte-kit/',
			'build/',
			'node_modules/',
			'static/',
			'*.config.js',
			'*.config.ts',
			'vite.config.ts',
			'svelte.config.js',
			'postcss.config.js',
			'tailwind.config.js',
			'playwright.config.ts',
			'vitest.config.ts'
		]
	}
];
