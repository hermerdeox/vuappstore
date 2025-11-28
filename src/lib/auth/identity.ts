/**
 * VU Sovereign Identity
 *
 * High-level identity management built on cryptographic primitives.
 */

import {
	generateKeyPair,
	exportPublicKey,
	exportPrivateKey,
	importPrivateKey,
	generateFingerprint,
	signMessage,
	deriveEncryptionKey,
	encryptData,
	decryptData,
	createProofMessage,
	validatePassphrase,
	generateSalt,
	CRYPTO_CONFIG,
	arrayBufferToBase64,
	base64ToArrayBuffer
} from './crypto';

// ============================================
// TYPES
// ============================================

export interface VuIdentity {
	/** Unique fingerprint (VU-XXXX-XXXX-XXXX) */
	fingerprint: string;

	/** Base64-encoded public key */
	publicKey: string;

	/** CryptoKey object for signing (never exported raw) */
	privateKey: CryptoKey;

	/** Optional display name (not unique, not verified) */
	handle?: string;

	/** Privacy level preference */
	privacyLevel: 0 | 1 | 2 | 3 | 4;

	/** Local creation timestamp */
	createdAt: number;
}

export interface StoredIdentity {
	fingerprint: string;
	publicKey: string;
	encryptedPrivateKey: string;
	iv: string;
	salt: string;
	handle?: string;
	privacyLevel: 0 | 1 | 2 | 3 | 4;
	createdAt: number;
	version: number;
}

export interface AuthProof {
	fingerprint: string;
	publicKey: string;
	signature: string;
	timestamp: number;
	nonce: string;
}

export interface AuthChallenge {
	nonce: string;
	expiresAt: number;
}

export interface SessionToken {
	fingerprint: string;
	publicKey: string;
	privacyLevel: number;
	issuedAt: number;
	expiresAt: number;
	signature: string;
}

// ============================================
// IDENTITY CREATION
// ============================================

/**
 * Create a new sovereign identity
 *
 * @param passphrase - User's secret passphrase (minimum 16 chars)
 * @param options - Optional settings
 * @returns New VuIdentity object
 *
 * WARNING: Passphrase cannot be recovered. If lost, identity is gone forever.
 */
export async function createIdentity(
	passphrase: string,
	options: {
		handle?: string;
		privacyLevel?: 0 | 1 | 2 | 3 | 4;
	} = {}
): Promise<{ identity: VuIdentity; stored: StoredIdentity }> {
	// Validate passphrase
	const validation = validatePassphrase(passphrase);
	if (!validation.valid) {
		throw new Error(`Weak passphrase: ${validation.errors.join(', ')}`);
	}

	// Generate new keypair
	const { publicKey, privateKey } = await generateKeyPair();

	// Generate salt for encryption
	const salt = generateSalt();

	// Export public key
	const publicKeyBase64 = await exportPublicKey(publicKey);

	// Generate fingerprint
	const fingerprint = await generateFingerprint(publicKeyBase64);

	// Encrypt private key for storage
	const encryptionKey = await deriveEncryptionKey(passphrase, salt);
	const privateKeyBase64 = await exportPrivateKey(privateKey);
	const { ciphertext, iv } = await encryptData(encryptionKey, privateKeyBase64);

	const identity: VuIdentity = {
		fingerprint,
		publicKey: publicKeyBase64,
		privateKey,
		handle: options.handle,
		privacyLevel: options.privacyLevel ?? 0,
		createdAt: Date.now()
	};

	const stored: StoredIdentity = {
		fingerprint,
		publicKey: publicKeyBase64,
		encryptedPrivateKey: ciphertext,
		iv,
		salt: arrayBufferToBase64(salt),
		handle: options.handle,
		privacyLevel: options.privacyLevel ?? 0,
		createdAt: Date.now(),
		version: 1
	};

	return { identity, stored };
}

/**
 * Unlock an existing identity with passphrase
 */
export async function unlockIdentity(
	stored: StoredIdentity,
	passphrase: string
): Promise<VuIdentity> {
	try {
		// Derive decryption key
		const salt = new Uint8Array(base64ToArrayBuffer(stored.salt));
		const encryptionKey = await deriveEncryptionKey(passphrase, salt);

		// Decrypt private key
		const privateKeyBase64 = await decryptData(
			encryptionKey,
			stored.encryptedPrivateKey,
			stored.iv
		);

		// Import private key
		const privateKey = await importPrivateKey(privateKeyBase64);

		return {
			fingerprint: stored.fingerprint,
			publicKey: stored.publicKey,
			privateKey,
			handle: stored.handle,
			privacyLevel: stored.privacyLevel,
			createdAt: stored.createdAt
		};
	} catch (error) {
		throw new Error('Invalid passphrase or corrupted identity data');
	}
}

// ============================================
// AUTHENTICATION
// ============================================

/**
 * Create authentication proof for server verification
 */
export async function createAuthProof(
	identity: VuIdentity,
	challenge: AuthChallenge
): Promise<AuthProof> {
	const timestamp = Date.now();

	// Create message to sign
	const message = createProofMessage(challenge.nonce, timestamp, identity.fingerprint);

	// Sign message
	const signature = await signMessage(identity.privateKey, message);

	return {
		fingerprint: identity.fingerprint,
		publicKey: identity.publicKey,
		signature,
		timestamp,
		nonce: challenge.nonce
	};
}

/**
 * Create a self-signed session token
 *
 * This token proves authentication without server-side session storage.
 * The server only needs the public key to verify.
 */
export async function createSessionToken(
	identity: VuIdentity,
	durationMs: number = CRYPTO_CONFIG.TOKEN_EXPIRY_MS
): Promise<string> {
	const tokenData = {
		fingerprint: identity.fingerprint,
		publicKey: identity.publicKey,
		privacyLevel: identity.privacyLevel,
		issuedAt: Date.now(),
		expiresAt: Date.now() + durationMs
	};

	// Sign token data
	const message = JSON.stringify(tokenData);
	const signature = await signMessage(identity.privateKey, message);

	const token: SessionToken = {
		...tokenData,
		signature
	};

	// Encode as base64 JSON
	return btoa(JSON.stringify(token));
}

/**
 * Parse a session token (client-side, no verification)
 */
export function parseSessionToken(tokenString: string): SessionToken | null {
	try {
		return JSON.parse(atob(tokenString));
	} catch {
		return null;
	}
}

// ============================================
// IDENTITY UPDATES
// ============================================

/**
 * Update identity handle (re-encrypts with same passphrase)
 */
export async function updateIdentityHandle(
	stored: StoredIdentity,
	passphrase: string,
	newHandle: string
): Promise<StoredIdentity> {
	// Verify passphrase by unlocking
	await unlockIdentity(stored, passphrase);

	return {
		...stored,
		handle: newHandle
	};
}

/**
 * Change passphrase (re-encrypts private key)
 */
export async function changePassphrase(
	stored: StoredIdentity,
	oldPassphrase: string,
	newPassphrase: string
): Promise<StoredIdentity> {
	// Validate new passphrase
	const validation = validatePassphrase(newPassphrase);
	if (!validation.valid) {
		throw new Error(`Weak passphrase: ${validation.errors.join(', ')}`);
	}

	// Unlock with old passphrase
	const identity = await unlockIdentity(stored, oldPassphrase);

	// Generate new salt
	const newSalt = generateSalt();

	// Encrypt with new passphrase
	const encryptionKey = await deriveEncryptionKey(newPassphrase, newSalt);
	const privateKeyBase64 = await exportPrivateKey(identity.privateKey);
	const { ciphertext, iv } = await encryptData(encryptionKey, privateKeyBase64);

	return {
		...stored,
		encryptedPrivateKey: ciphertext,
		iv,
		salt: arrayBufferToBase64(newSalt)
	};
}

/**
 * Update privacy level
 */
export async function updatePrivacyLevel(
	stored: StoredIdentity,
	passphrase: string,
	newLevel: 0 | 1 | 2 | 3 | 4
): Promise<StoredIdentity> {
	// Verify passphrase by unlocking
	await unlockIdentity(stored, passphrase);

	return {
		...stored,
		privacyLevel: newLevel
	};
}

