/**
 * VU Identity Storage
 *
 * Secure local storage using IndexedDB.
 * All sensitive data is encrypted before storage.
 */

import { browser } from '$app/environment';
import type { StoredIdentity } from './identity';

const DB_NAME = 'VuSovereignIdentity';
const DB_VERSION = 1;
const STORE_NAME = 'identities';
const PRIMARY_KEY = 'primary';

// ============================================
// DATABASE MANAGEMENT
// ============================================

/**
 * Open or create the IndexedDB database
 */
async function openDatabase(): Promise<IDBDatabase> {
	if (!browser) {
		throw new Error('IndexedDB is only available in browser');
	}

	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);

		request.onerror = () => {
			reject(new Error(`Failed to open database: ${request.error?.message}`));
		};

		request.onsuccess = () => {
			resolve(request.result);
		};

		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;

			// Create object store if it doesn't exist
			if (!db.objectStoreNames.contains(STORE_NAME)) {
				db.createObjectStore(STORE_NAME);
			}
		};
	});
}

// ============================================
// CRUD OPERATIONS
// ============================================

/**
 * Save identity to local storage
 */
export async function saveIdentity(identity: StoredIdentity): Promise<void> {
	const db = await openDatabase();

	return new Promise((resolve, reject) => {
		const transaction = db.transaction(STORE_NAME, 'readwrite');
		const store = transaction.objectStore(STORE_NAME);
		const request = store.put(identity, PRIMARY_KEY);

		request.onerror = () => {
			reject(new Error(`Failed to save identity: ${request.error?.message}`));
		};

		request.onsuccess = () => {
			resolve();
		};

		transaction.oncomplete = () => {
			db.close();
		};
	});
}

/**
 * Load identity from local storage
 */
export async function loadIdentity(): Promise<StoredIdentity | null> {
	if (!browser) return null;

	try {
		const db = await openDatabase();

		return new Promise((resolve, reject) => {
			const transaction = db.transaction(STORE_NAME, 'readonly');
			const store = transaction.objectStore(STORE_NAME);
			const request = store.get(PRIMARY_KEY);

			request.onerror = () => {
				resolve(null);
			};

			request.onsuccess = () => {
				resolve(request.result || null);
			};

			transaction.oncomplete = () => {
				db.close();
			};
		});
	} catch {
		return null;
	}
}

/**
 * Check if an identity exists
 */
export async function hasIdentity(): Promise<boolean> {
	const identity = await loadIdentity();
	return identity !== null;
}

/**
 * Delete identity from local storage
 *
 * WARNING: This is irreversible!
 */
export async function deleteIdentity(): Promise<void> {
	if (!browser) return;

	const db = await openDatabase();

	return new Promise((resolve, reject) => {
		const transaction = db.transaction(STORE_NAME, 'readwrite');
		const store = transaction.objectStore(STORE_NAME);
		const request = store.delete(PRIMARY_KEY);

		request.onerror = () => {
			reject(new Error(`Failed to delete identity: ${request.error?.message}`));
		};

		request.onsuccess = () => {
			resolve();
		};

		transaction.oncomplete = () => {
			db.close();
		};
	});
}

/**
 * Export identity for backup (still encrypted)
 */
export async function exportIdentityBackup(): Promise<string | null> {
	const identity = await loadIdentity();
	if (!identity) return null;

	const backup = {
		...identity,
		exportedAt: Date.now(),
		format: 'vu-identity-backup-v1',
		fileExtension: '.vu'
	};

	return btoa(JSON.stringify(backup));
}

/**
 * Import identity from backup
 */
export async function importIdentityBackup(backupString: string): Promise<void> {
	try {
		const backup = JSON.parse(atob(backupString));

		if (backup.format !== 'vu-identity-backup-v1') {
			throw new Error('Invalid backup format');
		}

		// Remove export metadata
		const { exportedAt, format, fileExtension, ...identity } = backup;

		await saveIdentity(identity as StoredIdentity);
	} catch (error) {
		throw new Error('Invalid or corrupted backup file');
	}
}

/**
 * Clear all VU data (factory reset)
 */
export async function clearAllData(): Promise<void> {
	if (!browser) return;

	return new Promise((resolve, reject) => {
		const request = indexedDB.deleteDatabase(DB_NAME);

		request.onerror = () => {
			reject(new Error('Failed to clear data'));
		};

		request.onsuccess = () => {
			resolve();
		};
	});
}

/**
 * Update stored identity metadata (handle, privacy level)
 */
export async function updateStoredIdentity(
	updates: Partial<Pick<StoredIdentity, 'handle' | 'privacyLevel'>>
): Promise<void> {
	const identity = await loadIdentity();
	if (!identity) {
		throw new Error('No identity found');
	}

	const updated: StoredIdentity = {
		...identity,
		...updates
	};

	await saveIdentity(updated);
}

