/**
 * Server-side authentication verification
 *
 * The server NEVER stores private keys or passwords.
 * It only verifies cryptographic proofs.
 */

import {
	importPublicKey,
	verifySignature,
	createProofMessage,
	generateChallenge,
	generateFingerprint,
	CRYPTO_CONFIG
} from '$lib/auth/crypto';
import type { AuthProof, SessionToken } from '$lib/auth/identity';

// In-memory challenge store (use Redis in production)
const challenges = new Map<string, { nonce: string; expiresAt: number }>();

// ============================================
// CHALLENGE MANAGEMENT
// ============================================

/**
 * Create a new authentication challenge
 */
export function createChallenge(identifier: string): { nonce: string; expiresAt: number } {
	const challenge = generateChallenge();
	challenges.set(identifier, challenge);

	// Auto-cleanup after expiry
	setTimeout(() => {
		challenges.delete(identifier);
	}, CRYPTO_CONFIG.CHALLENGE_EXPIRY_MS + 1000);

	return challenge;
}

/**
 * Get and consume a challenge (one-time use)
 */
export function consumeChallenge(identifier: string): { nonce: string; expiresAt: number } | null {
	const challenge = challenges.get(identifier);
	if (!challenge) return null;

	challenges.delete(identifier);

	if (Date.now() > challenge.expiresAt) {
		return null;
	}

	return challenge;
}

// ============================================
// PROOF VERIFICATION
// ============================================

/**
 * Verify an authentication proof
 */
export async function verifyAuthProof(
	proof: AuthProof,
	expectedNonce: string
): Promise<{ valid: boolean; error?: string }> {
	try {
		// Check nonce matches
		if (proof.nonce !== expectedNonce) {
			return { valid: false, error: 'Invalid nonce' };
		}

		// Check timestamp is recent
		const timeDiff = Math.abs(Date.now() - proof.timestamp);
		if (timeDiff > 60000) {
			return { valid: false, error: 'Proof expired' };
		}

		// Verify fingerprint matches public key
		const expectedFingerprint = await generateFingerprint(proof.publicKey);
		if (proof.fingerprint !== expectedFingerprint) {
			return { valid: false, error: 'Fingerprint mismatch' };
		}

		// Import public key
		const publicKey = await importPublicKey(proof.publicKey);

		// Reconstruct message
		const message = createProofMessage(proof.nonce, proof.timestamp, proof.fingerprint);

		// Verify signature
		const valid = await verifySignature(publicKey, message, proof.signature);

		if (!valid) {
			return { valid: false, error: 'Invalid signature' };
		}

		return { valid: true };
	} catch (error) {
		return { valid: false, error: 'Verification failed' };
	}
}

// ============================================
// SESSION TOKEN VERIFICATION
// ============================================

/**
 * Verify a session token
 */
export async function verifySessionToken(
	tokenString: string
): Promise<{ valid: boolean; token?: SessionToken; error?: string }> {
	try {
		const token: SessionToken = JSON.parse(atob(tokenString));

		// Check expiration
		if (Date.now() > token.expiresAt) {
			return { valid: false, error: 'Token expired' };
		}

		// Verify fingerprint matches public key
		const expectedFingerprint = await generateFingerprint(token.publicKey);
		if (token.fingerprint !== expectedFingerprint) {
			return { valid: false, error: 'Fingerprint mismatch' };
		}

		// Import public key and verify signature
		const publicKey = await importPublicKey(token.publicKey);

		const { signature, ...tokenData } = token;
		const message = JSON.stringify(tokenData);

		const valid = await verifySignature(publicKey, message, signature);

		if (!valid) {
			return { valid: false, error: 'Invalid signature' };
		}

		return { valid: true, token };
	} catch (error) {
		return { valid: false, error: 'Invalid token format' };
	}
}

/**
 * Extract token from Authorization header
 */
export function extractToken(authHeader: string | null): string | null {
	if (!authHeader) return null;

	const parts = authHeader.split(' ');
	if (parts.length !== 2 || parts[0] !== 'Bearer') {
		return null;
	}

	return parts[1];
}

/**
 * Extract token from cookie
 */
export function extractTokenFromCookie(cookieHeader: string | null): string | null {
	if (!cookieHeader) return null;

	const cookies = cookieHeader.split(';').map((c) => c.trim());
	const tokenCookie = cookies.find((c) => c.startsWith('vu_session='));

	if (!tokenCookie) return null;

	return tokenCookie.split('=')[1];
}
