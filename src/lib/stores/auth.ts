/**
 * VU Authentication Store
 *
 * Reactive state management for sovereign identity.
 */

import { writable, derived, get } from 'svelte/store';
import { browser } from '$app/environment';
import type { VuIdentity, StoredIdentity, AuthChallenge } from '$lib/auth/identity';
import {
	createIdentity,
	unlockIdentity,
	createSessionToken,
	createAuthProof,
	parseSessionToken,
	changePassphrase as changeIdentityPassphrase,
	updateIdentityHandle as updateHandle
} from '$lib/auth/identity';
import {
	saveIdentity,
	loadIdentity,
	deleteIdentity,
	hasIdentity,
	exportIdentityBackup,
	importIdentityBackup,
	updateStoredIdentity
} from '$lib/auth/storage';

// ============================================
// STORE TYPES
// ============================================

interface AuthState {
	identity: VuIdentity | null;
	sessionToken: string | null;
	isLoading: boolean;
	error: string | null;
	hasStoredIdentity: boolean;
}

// ============================================
// STORES
// ============================================

const initialState: AuthState = {
	identity: null,
	sessionToken: null,
	isLoading: true,
	error: null,
	hasStoredIdentity: false
};

function createAuthStore() {
	const { subscribe, set, update } = writable<AuthState>(initialState);

	// Initialize on client
	if (browser) {
		hasIdentity().then((exists) => {
			update((state) => ({
				...state,
				hasStoredIdentity: exists,
				isLoading: false
			}));
		});
	}

	return {
		subscribe,

		/**
		 * Create a new identity
		 */
		async create(
			passphrase: string,
			options: { handle?: string; privacyLevel?: 0 | 1 | 2 | 3 | 4 } = {}
		): Promise<VuIdentity> {
			update((s) => ({ ...s, isLoading: true, error: null }));

			try {
				const { identity, stored } = await createIdentity(passphrase, options);
				await saveIdentity(stored);

				const token = await createSessionToken(identity);

				update((s) => ({
					...s,
					identity,
					sessionToken: token,
					hasStoredIdentity: true,
					isLoading: false
				}));

				return identity;
			} catch (error) {
				const message = error instanceof Error ? error.message : 'Failed to create identity';
				update((s) => ({ ...s, error: message, isLoading: false }));
				throw error;
			}
		},

		/**
		 * Unlock existing identity
		 */
		async unlock(passphrase: string): Promise<VuIdentity> {
			update((s) => ({ ...s, isLoading: true, error: null }));

			try {
				const stored = await loadIdentity();
				if (!stored) {
					throw new Error('No identity found');
				}

				const identity = await unlockIdentity(stored, passphrase);
				const token = await createSessionToken(identity);

				update((s) => ({
					...s,
					identity,
					sessionToken: token,
					isLoading: false
				}));

				return identity;
			} catch (error) {
				const message = error instanceof Error ? error.message : 'Failed to unlock identity';
				update((s) => ({ ...s, error: message, isLoading: false }));
				throw error;
			}
		},

		/**
		 * Lock identity (keep stored, clear session)
		 */
		lock(): void {
			update((s) => ({
				...s,
				identity: null,
				sessionToken: null
			}));
		},

		/**
		 * Sign out completely
		 */
		signOut(): void {
			update((s) => ({
				...s,
				identity: null,
				sessionToken: null
			}));
		},

		/**
		 * Destroy identity permanently
		 */
		async destroy(): Promise<void> {
			await deleteIdentity();
			set({
				...initialState,
				isLoading: false,
				hasStoredIdentity: false
			});
		},

		/**
		 * Create proof for server authentication
		 */
		async createProof(challenge: AuthChallenge): Promise<ReturnType<typeof createAuthProof> | null> {
			const state = get({ subscribe });
			if (!state.identity) return null;

			return createAuthProof(state.identity, challenge);
		},

		/**
		 * Refresh session token
		 */
		async refreshToken(): Promise<string | null> {
			const state = get({ subscribe });
			if (!state.identity) return null;

			const token = await createSessionToken(state.identity);
			update((s) => ({ ...s, sessionToken: token }));
			return token;
		},

		/**
		 * Export identity backup
		 */
		async exportBackup(): Promise<string | null> {
			return exportIdentityBackup();
		},

		/**
		 * Import identity backup
		 */
		async importBackup(backup: string): Promise<void> {
			await importIdentityBackup(backup);
			update((s) => ({ ...s, hasStoredIdentity: true }));
		},

		/**
		 * Update handle/display name
		 */
		async updateHandle(newHandle: string, passphrase: string): Promise<void> {
			const state = get({ subscribe });
			const stored = await loadIdentity();

			if (!stored) {
				throw new Error('No identity found');
			}

			const updated = await updateHandle(stored, passphrase, newHandle);
			await saveIdentity(updated);

			if (state.identity) {
				update((s) => ({
					...s,
					identity: s.identity ? { ...s.identity, handle: newHandle } : null
				}));
			}
		},

		/**
		 * Change passphrase
		 */
		async changePassphrase(oldPassphrase: string, newPassphrase: string): Promise<void> {
			const stored = await loadIdentity();

			if (!stored) {
				throw new Error('No identity found');
			}

			const updated = await changeIdentityPassphrase(stored, oldPassphrase, newPassphrase);
			await saveIdentity(updated);
		},

		/**
		 * Update privacy level
		 */
		async updatePrivacyLevel(
			newLevel: 0 | 1 | 2 | 3 | 4,
			passphrase: string
		): Promise<void> {
			const state = get({ subscribe });
			const stored = await loadIdentity();

			if (!stored) {
				throw new Error('No identity found');
			}

			// Verify passphrase by unlocking
			await unlockIdentity(stored, passphrase);

			// Update stored identity
			await updateStoredIdentity({ privacyLevel: newLevel });

			if (state.identity) {
				update((s) => ({
					...s,
					identity: s.identity ? { ...s.identity, privacyLevel: newLevel } : null
				}));
			}
		},

		/**
		 * Clear error
		 */
		clearError(): void {
			update((s) => ({ ...s, error: null }));
		},

		/**
		 * Get stored identity fingerprint (without unlocking)
		 */
		async getStoredFingerprint(): Promise<string | null> {
			const stored = await loadIdentity();
			return stored?.fingerprint ?? null;
		}
	};
}

export const auth = createAuthStore();

// ============================================
// DERIVED STORES
// ============================================

/** Is user authenticated? */
export const isAuthenticated = derived(auth, ($auth) => $auth.identity !== null);

/** User's fingerprint */
export const fingerprint = derived(auth, ($auth) => $auth.identity?.fingerprint ?? null);

/** User's handle */
export const handle = derived(auth, ($auth) => $auth.identity?.handle ?? null);

/** User's privacy level */
export const privacyLevel = derived(auth, ($auth) => $auth.identity?.privacyLevel ?? null);

/** Session token for API calls */
export const token = derived(auth, ($auth) => $auth.sessionToken);

/** Is identity locked (stored but not unlocked)? */
export const isLocked = derived(
	auth,
	($auth) => $auth.hasStoredIdentity && $auth.identity === null
);

/** Loading state */
export const isLoading = derived(auth, ($auth) => $auth.isLoading);

/** Error message */
export const authError = derived(auth, ($auth) => $auth.error);

/** Has stored identity? */
export const hasStoredIdentity = derived(auth, ($auth) => $auth.hasStoredIdentity);

