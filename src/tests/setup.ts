import { vi } from 'vitest';

// Mock SvelteKit modules
vi.mock('$app/navigation', () => ({
	goto: vi.fn(),
	invalidate: vi.fn(),
	invalidateAll: vi.fn(),
	preloadData: vi.fn(),
	preloadCode: vi.fn(),
	afterNavigate: vi.fn(),
	beforeNavigate: vi.fn(),
	onNavigate: vi.fn()
}));

vi.mock('$app/stores', () => {
	const { readable, writable } = require('svelte/store');
	return {
		page: readable({
			url: new URL('http://localhost:3700'),
			params: {},
			route: { id: '/' },
			status: 200,
			error: null,
			data: {},
			form: null
		}),
		navigating: readable(null),
		updated: {
			subscribe: readable(false).subscribe,
			check: vi.fn()
		}
	};
});

vi.mock('$app/environment', () => ({
	browser: true,
	dev: true,
	building: false,
	version: 'test'
}));

// Mock browser APIs not available in jsdom
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation((query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn()
	}))
});

// Mock IntersectionObserver
class MockIntersectionObserver {
	observe = vi.fn();
	disconnect = vi.fn();
	unobserve = vi.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
	writable: true,
	value: MockIntersectionObserver
});

// Mock ResizeObserver
class MockResizeObserver {
	observe = vi.fn();
	disconnect = vi.fn();
	unobserve = vi.fn();
}

Object.defineProperty(window, 'ResizeObserver', {
	writable: true,
	value: MockResizeObserver
});

// Mock crypto for VU Identity tests
Object.defineProperty(globalThis, 'crypto', {
	value: {
		getRandomValues: (arr: Uint8Array) => {
			for (let i = 0; i < arr.length; i++) {
				arr[i] = Math.floor(Math.random() * 256);
			}
			return arr;
		},
		subtle: {
			generateKey: vi.fn(),
			exportKey: vi.fn(),
			importKey: vi.fn(),
			sign: vi.fn(),
			verify: vi.fn(),
			digest: vi.fn()
		},
		randomUUID: () => 'test-uuid-' + Math.random().toString(36).substring(7)
	}
});

// Mock localStorage
const localStorageMock = {
	getItem: vi.fn(),
	setItem: vi.fn(),
	removeItem: vi.fn(),
	clear: vi.fn(),
	length: 0,
	key: vi.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock sessionStorage
Object.defineProperty(window, 'sessionStorage', { value: localStorageMock });
