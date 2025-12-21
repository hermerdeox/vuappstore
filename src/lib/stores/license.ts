/**
 * VU Anonymous Licensing System - License Store
 * 
 * Manages anonymous licenses stored locally in IndexedDB.
 * "Your licenses never leave your device unless you export them."
 * 
 * Features:
 * - All licenses stored encrypted in browser IndexedDB
 * - Licenses can be verified completely offline
 * - Export/import for backup and device transfer
 * - Zero server-side storage of license data
 */

import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import {
  generateLicenseSeed,
  blindLicense,
  unblindSignature,
  verifyLicense,
  serializeLicense,
  deserializeLicense,
  getRemainingDays,
  type AnonymousLicense
} from '$lib/crypto/blind-signature';

/**
 * License store state
 */
interface LicenseState {
  /** Map of app slug to license */
  licenses: Map<string, AnonymousLicense>;
  /** Currently loading */
  loading: boolean;
  /** Error message if any */
  error: string | null;
  /** Store initialized from IndexedDB */
  initialized: boolean;
}

// IndexedDB configuration
const DB_NAME = 'vu-licenses';
const DB_VERSION = 1;
const STORE_NAME = 'licenses';

/**
 * Open IndexedDB connection
 */
async function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'app' });
      }
    };
  });
}

/**
 * Store a license in IndexedDB
 */
async function storeLicenseInDB(license: AnonymousLicense): Promise<void> {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  
  // Serialize for storage
  const encrypted = serializeLicense(license);
  
  return new Promise((resolve, reject) => {
    const request = store.put({
      app: license.app,
      data: encrypted,
      stored: Date.now()
    });
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

/**
 * Remove a license from IndexedDB
 */
async function removeLicenseFromDB(app: string): Promise<void> {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  
  return new Promise((resolve, reject) => {
    const request = store.delete(app);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

/**
 * Load all licenses from IndexedDB
 */
async function loadLicensesFromDB(): Promise<Map<string, AnonymousLicense>> {
  const licenses = new Map<string, AnonymousLicense>();
  
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    
    const items = await new Promise<{ app: string; data: string; stored: number }[]>((resolve, reject) => {
      const request = store.getAll();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
    
    for (const item of items) {
      try {
        const license = deserializeLicense(item.data);
        // Only add valid licenses
        if (verifyLicense(license)) {
          licenses.set(license.app, license);
        } else {
          // Remove expired/invalid licenses
          await removeLicenseFromDB(item.app);
        }
      } catch {
        console.warn(`Invalid license data for ${item.app}, removing`);
        await removeLicenseFromDB(item.app);
      }
    }
  } catch (e) {
    console.error('Failed to load licenses:', e);
  }
  
  return licenses;
}

/**
 * Create the license store
 */
function createLicenseStore() {
  const { subscribe, set, update } = writable<LicenseState>({
    licenses: new Map(),
    loading: false,
    error: null,
    initialized: false
  });

  return {
    subscribe,

    /**
     * Initialize the store by loading licenses from IndexedDB
     */
    async initialize(): Promise<void> {
      if (!browser) return;
      
      update(s => ({ ...s, loading: true }));
      
      try {
        const licenses = await loadLicensesFromDB();
        update(s => ({ 
          ...s, 
          licenses, 
          loading: false, 
          initialized: true 
        }));
      } catch (error) {
        update(s => ({ 
          ...s, 
          loading: false, 
          error: 'Failed to load licenses',
          initialized: true 
        }));
      }
    },

    /**
     * Purchase a new license
     * 
     * Flow:
     * 1. Generate random seed locally
     * 2. Blind the seed
     * 3. Send blinded seed to VU with payment proof
     * 4. Receive blind signature
     * 5. Unblind signature locally
     * 6. Verify and store license
     */
    async purchaseLicense(
      app: string,
      tier: 'monthly' | 'yearly' | 'lifetime',
      moneroTxId: string
    ): Promise<AnonymousLicense> {
      update(s => ({ ...s, loading: true, error: null }));

      try {
        // Step 1: Generate random seed locally
        const seed = generateLicenseSeed();
        
        // Step 2: Blind the license
        const { blindedLicense, blindingFactor } = blindLicense(seed);
        
        // Step 3: Send blinded license to VU for signing
        const response = await fetch('/api/license/sign', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            blindedLicense: Array.from(blindedLicense)
              .map(b => b.toString(16).padStart(2, '0'))
              .join(''),
            paymentProof: moneroTxId,
            app,
            tier
          })
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'License signing failed');
        }

        // Step 4: Receive blind signature
        const { blindedSignature, issuedAt } = await response.json();
        
        // Convert hex string back to bytes
        const signatureBytes = new Uint8Array(
          blindedSignature.match(/.{2}/g)!.map((h: string) => parseInt(h, 16))
        );
        
        // Step 5: Unblind signature locally
        const signature = unblindSignature(signatureBytes, blindingFactor);

        // Step 6: Create and verify license
        const license: AnonymousLicense = {
          seed,
          signature,
          app,
          tier,
          issued: issuedAt,
          version: '1.0.0'
        };

        // Verify the license is valid before storing
        if (!verifyLicense(license)) {
          throw new Error('License verification failed - signature invalid');
        }

        // Store in IndexedDB
        await storeLicenseInDB(license);

        // Update store
        update(s => {
          const licenses = new Map(s.licenses);
          licenses.set(app, license);
          return { ...s, licenses, loading: false };
        });

        // Clear the blinding factor from memory (security)
        blindingFactor.fill(0);

        return license;

      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        update(s => ({ ...s, loading: false, error: message }));
        throw error;
      }
    },

    /**
     * Check if a valid license exists for an app
     */
    checkLicense(app: string): boolean {
      let isValid = false;
      
      const unsubscribe = subscribe(state => {
        const license = state.licenses.get(app);
        if (license) {
          isValid = verifyLicense(license);
        }
      });
      unsubscribe();

      return isValid;
    },

    /**
     * Get license details for an app
     */
    getLicense(app: string): AnonymousLicense | undefined {
      let license: AnonymousLicense | undefined;
      
      const unsubscribe = subscribe(state => {
        license = state.licenses.get(app);
      });
      unsubscribe();

      return license;
    },

    /**
     * Export a license for backup/transfer
     */
    async exportLicense(app: string): Promise<string> {
      let license: AnonymousLicense | undefined;
      
      const unsubscribe = subscribe(state => {
        license = state.licenses.get(app);
      });
      unsubscribe();

      if (!license) {
        throw new Error('License not found');
      }

      return serializeLicense(license);
    },

    /**
     * Export all licenses as a single backup file
     */
    async exportAllLicenses(): Promise<string> {
      let licenses: AnonymousLicense[] = [];
      
      const unsubscribe = subscribe(state => {
        licenses = Array.from(state.licenses.values());
      });
      unsubscribe();

      return btoa(JSON.stringify(licenses.map(l => serializeLicense(l))));
    },

    /**
     * Import a license from backup
     */
    async importLicense(exportedData: string): Promise<void> {
      const license = deserializeLicense(exportedData);

      // Verify before importing
      if (!verifyLicense(license)) {
        throw new Error('Invalid or expired license');
      }

      // Store in IndexedDB
      await storeLicenseInDB(license);
      
      // Update store
      update(s => {
        const licenses = new Map(s.licenses);
        licenses.set(license.app, license);
        return { ...s, licenses };
      });
    },

    /**
     * Import multiple licenses from backup
     */
    async importAllLicenses(exportedData: string): Promise<number> {
      const serializedLicenses = JSON.parse(atob(exportedData)) as string[];
      let imported = 0;

      for (const serialized of serializedLicenses) {
        try {
          const license = deserializeLicense(serialized);
          if (verifyLicense(license)) {
            await storeLicenseInDB(license);
            update(s => {
              const licenses = new Map(s.licenses);
              licenses.set(license.app, license);
              return { ...s, licenses };
            });
            imported++;
          }
        } catch {
          // Skip invalid licenses
        }
      }

      return imported;
    },

    /**
     * Remove a license (for testing or user request)
     */
    async removeLicense(app: string): Promise<void> {
      await removeLicenseFromDB(app);
      
      update(s => {
        const licenses = new Map(s.licenses);
        licenses.delete(app);
        return { ...s, licenses };
      });
    },

    /**
     * Clear all licenses (dangerous!)
     */
    async clearAllLicenses(): Promise<void> {
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      
      await new Promise<void>((resolve, reject) => {
        const request = store.clear();
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
      });
      
      update(s => ({ ...s, licenses: new Map() }));
    }
  };
}

// Export the store instance
export const licenseStore = createLicenseStore();

/**
 * Derived store: Check if user has valid license for specific app
 */
export const hasValidLicense = (app: string) => derived(
  licenseStore,
  $store => {
    const license = $store.licenses.get(app);
    return license ? verifyLicense(license) : false;
  }
);

/**
 * Derived store: Get all valid licenses
 */
export const allLicenses = derived(
  licenseStore,
  $store => Array.from($store.licenses.values()).filter(l => verifyLicense(l))
);

/**
 * Derived store: Get licenses expiring soon (within 7 days)
 */
export const expiringLicenses = derived(
  licenseStore,
  $store => Array.from($store.licenses.values())
    .filter(l => {
      if (l.tier === 'lifetime') return false;
      const remaining = getRemainingDays(l);
      return remaining > 0 && remaining <= 7;
    })
);

/**
 * Derived store: Get total number of active licenses
 */
export const totalLicenses = derived(
  licenseStore,
  $store => $store.licenses.size
);

