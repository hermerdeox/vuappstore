/**
 * VU Cryptographic Primitives
 * 
 * All cryptographic operations for the Sovereign Identity system.
 * Uses Web Crypto API for maximum security and browser compatibility.
 */

// ============================================
// CONSTANTS
// ============================================

export const CRYPTO_CONFIG = {
	// Key derivation
	PBKDF2_ITERATIONS: 310000, // OWASP 2023 recommendation
	PBKDF2_HASH: 'SHA-256',

	// Signing algorithm
	SIGNING_ALGORITHM: { name: 'ECDSA', namedCurve: 'P-384' },
	SIGNING_HASH: 'SHA-384',

	// Encryption for local storage
	ENCRYPTION_ALGORITHM: 'AES-GCM',
	ENCRYPTION_KEY_LENGTH: 256,

	// Token settings
	TOKEN_EXPIRY_MS: 24 * 60 * 60 * 1000, // 24 hours
	CHALLENGE_EXPIRY_MS: 5 * 60 * 1000, // 5 minutes

	// Fingerprint format
	FINGERPRINT_PREFIX: 'VU',
	FINGERPRINT_LENGTH: 12
} as const;

// ============================================
// KEY GENERATION
// ============================================

/**
 * Generate a new ECDSA keypair for sovereign identity
 */
export async function generateKeyPair(): Promise<{
	publicKey: CryptoKey;
	privateKey: CryptoKey;
}> {
	const keyPair = await crypto.subtle.generateKey(
		CRYPTO_CONFIG.SIGNING_ALGORITHM,
		true, // extractable for export
		['sign', 'verify']
	);

	return {
		publicKey: keyPair.publicKey,
		privateKey: keyPair.privateKey
	};
}

/**
 * Export public key to base64 string for storage/transmission
 */
export async function exportPublicKey(key: CryptoKey): Promise<string> {
	const exported = await crypto.subtle.exportKey('spki', key);
	return arrayBufferToBase64(exported);
}

/**
 * Import public key from base64 string
 */
export async function importPublicKey(base64Key: string): Promise<CryptoKey> {
	const keyData = base64ToArrayBuffer(base64Key);
	return crypto.subtle.importKey(
		'spki',
		keyData,
		CRYPTO_CONFIG.SIGNING_ALGORITHM,
		true,
		['verify']
	);
}

/**
 * Export private key to base64 (for encrypted local storage only)
 */
export async function exportPrivateKey(key: CryptoKey): Promise<string> {
	const exported = await crypto.subtle.exportKey('pkcs8', key);
	return arrayBufferToBase64(exported);
}

/**
 * Import private key from base64
 */
export async function importPrivateKey(base64Key: string): Promise<CryptoKey> {
	const keyData = base64ToArrayBuffer(base64Key);
	return crypto.subtle.importKey(
		'pkcs8',
		keyData,
		CRYPTO_CONFIG.SIGNING_ALGORITHM,
		true, // keep extractable for re-export
		['sign']
	);
}

// ============================================
// FINGERPRINT GENERATION
// ============================================

/**
 * Generate a human-readable fingerprint from a public key
 * Format: VU-XXXX-XXXX-XXXX
 */
export async function generateFingerprint(publicKeyBase64: string): Promise<string> {
	const hash = await crypto.subtle.digest(
		'SHA-256',
		new TextEncoder().encode(publicKeyBase64)
	);

	const bytes = new Uint8Array(hash).slice(0, 6);
	const hex = Array.from(bytes)
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('')
		.toUpperCase();

	return `${CRYPTO_CONFIG.FINGERPRINT_PREFIX}-${hex.slice(0, 4)}-${hex.slice(4, 8)}-${hex.slice(8, 12)}`;
}

// ============================================
// SIGNING & VERIFICATION
// ============================================

/**
 * Sign a message with private key
 */
export async function signMessage(privateKey: CryptoKey, message: string): Promise<string> {
	const signature = await crypto.subtle.sign(
		{ name: 'ECDSA', hash: CRYPTO_CONFIG.SIGNING_HASH },
		privateKey,
		new TextEncoder().encode(message)
	);
	return arrayBufferToBase64(signature);
}

/**
 * Verify a signature with public key
 */
export async function verifySignature(
	publicKey: CryptoKey,
	message: string,
	signatureBase64: string
): Promise<boolean> {
	try {
		const signature = base64ToArrayBuffer(signatureBase64);
		return await crypto.subtle.verify(
			{ name: 'ECDSA', hash: CRYPTO_CONFIG.SIGNING_HASH },
			publicKey,
			signature,
			new TextEncoder().encode(message)
		);
	} catch {
		return false;
	}
}

// ============================================
// LOCAL ENCRYPTION
// ============================================

/**
 * Derive an encryption key from passphrase for local storage
 */
export async function deriveEncryptionKey(
	passphrase: string,
	salt: Uint8Array
): Promise<CryptoKey> {
	const keyMaterial = await crypto.subtle.importKey(
		'raw',
		new TextEncoder().encode(passphrase),
		'PBKDF2',
		false,
		['deriveKey']
	);

	return crypto.subtle.deriveKey(
		{
			name: 'PBKDF2',
			salt,
			iterations: CRYPTO_CONFIG.PBKDF2_ITERATIONS,
			hash: CRYPTO_CONFIG.PBKDF2_HASH
		},
		keyMaterial,
		{
			name: CRYPTO_CONFIG.ENCRYPTION_ALGORITHM,
			length: CRYPTO_CONFIG.ENCRYPTION_KEY_LENGTH
		},
		false,
		['encrypt', 'decrypt']
	);
}

/**
 * Encrypt data for local storage
 */
export async function encryptData(
	key: CryptoKey,
	data: string
): Promise<{ ciphertext: string; iv: string }> {
	const iv = crypto.getRandomValues(new Uint8Array(12));
	const encrypted = await crypto.subtle.encrypt(
		{ name: CRYPTO_CONFIG.ENCRYPTION_ALGORITHM, iv },
		key,
		new TextEncoder().encode(data)
	);

	return {
		ciphertext: arrayBufferToBase64(encrypted),
		iv: arrayBufferToBase64(iv)
	};
}

/**
 * Decrypt data from local storage
 */
export async function decryptData(key: CryptoKey, ciphertext: string, iv: string): Promise<string> {
	const decrypted = await crypto.subtle.decrypt(
		{
			name: CRYPTO_CONFIG.ENCRYPTION_ALGORITHM,
			iv: base64ToArrayBuffer(iv)
		},
		key,
		base64ToArrayBuffer(ciphertext)
	);

	return new TextDecoder().decode(decrypted);
}

// ============================================
// CHALLENGE-RESPONSE
// ============================================

/**
 * Generate a cryptographically secure challenge
 */
export function generateChallenge(): { nonce: string; expiresAt: number } {
	const nonceBytes = crypto.getRandomValues(new Uint8Array(32));
	return {
		nonce: arrayBufferToBase64(nonceBytes),
		expiresAt: Date.now() + CRYPTO_CONFIG.CHALLENGE_EXPIRY_MS
	};
}

/**
 * Create proof message for authentication
 */
export function createProofMessage(nonce: string, timestamp: number, fingerprint: string): string {
	return `vu-auth-v1:${nonce}:${timestamp}:${fingerprint}`;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function arrayBufferToBase64(buffer: ArrayBuffer): string {
	const bytes = new Uint8Array(buffer);
	let binary = '';
	for (let i = 0; i < bytes.byteLength; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return btoa(binary);
}

export function base64ToArrayBuffer(base64: string): ArrayBuffer {
	const binary = atob(base64);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) {
		bytes[i] = binary.charCodeAt(i);
	}
	return bytes.buffer;
}

/**
 * Validate passphrase strength
 */
export function validatePassphrase(passphrase: string): {
	valid: boolean;
	score: number;
	errors: string[];
} {
	const errors: string[] = [];
	let score = 0;

	if (passphrase.length < 16) {
		errors.push('Passphrase must be at least 16 characters');
	} else {
		score += Math.min(passphrase.length / 4, 25);
	}

	if (!/[a-z]/.test(passphrase)) {
		errors.push('Include lowercase letters');
	} else {
		score += 15;
	}

	if (!/[A-Z]/.test(passphrase)) {
		errors.push('Include uppercase letters');
	} else {
		score += 15;
	}

	if (!/[0-9]/.test(passphrase)) {
		errors.push('Include numbers');
	} else {
		score += 15;
	}

	if (!/[^a-zA-Z0-9]/.test(passphrase)) {
		errors.push('Include special characters');
	} else {
		score += 15;
	}

	// Bonus for length
	if (passphrase.length >= 24) score += 15;

	return {
		valid: errors.length === 0,
		score: Math.min(score, 100),
		errors
	};
}

/**
 * Generate a random salt
 */
export function generateSalt(): Uint8Array {
	return crypto.getRandomValues(new Uint8Array(32));
}

