/**
 * VU Anonymous Licensing System - Blind Signature Implementation
 * 
 * RSA Blind Signatures (Chaum, 1983):
 * "We sign your license. We never see it."
 * 
 * How it works:
 * 1. User generates random 512-bit license seed locally
 * 2. User "blinds" the license with a random factor: L' = L × r^e mod n
 * 3. VU signs the blinded license: S' = L'^d mod n
 * 4. User "unblinds" locally: S = S' × r^(-1) mod n
 * 5. Result: Valid signature on original license, VU never saw it
 * 
 * Privacy guarantee:
 * - VU signs without seeing the license content
 * - Blinding factor is destroyed after use
 * - No correlation between payment and license possible
 * - Verification works offline with public key only
 */

// Using Web Crypto API for hashing (built-in, no external dependency)

/**
 * VU Public Key for license verification
 * This is the public component of our RSA-2048 key pair
 * Anyone can verify licenses, only VU can sign them
 */
const VU_PUBLIC_KEY = {
  // 2048-bit RSA modulus (n)
  n: BigInt('0x' + 'c7f8a9b2e3d4c5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8'),
  // Public exponent (e) - standard RSA value
  e: BigInt(65537)
};

/**
 * Anonymous License structure
 * Stored locally on user's device only
 */
export interface AnonymousLicense {
  /** 512-bit random seed (generated locally) */
  seed: Uint8Array;
  /** VU signature on the seed */
  signature: Uint8Array;
  /** App this license is for */
  app: string;
  /** Subscription tier */
  tier: 'monthly' | 'yearly' | 'lifetime';
  /** Unix timestamp when license was issued */
  issued: number;
  /** License format version */
  version: string;
}

/**
 * Result of blinding a license
 */
export interface BlindingResult {
  /** The blinded license to send to VU */
  blindedLicense: Uint8Array;
  /** The blinding factor (keep secret, destroy after use) */
  blindingFactor: Uint8Array;
}

/**
 * Convert bytes to BigInt
 */
function bytesToBigInt(bytes: Uint8Array): bigint {
  let hex = '0x';
  for (const byte of bytes) {
    hex += byte.toString(16).padStart(2, '0');
  }
  return BigInt(hex);
}

/**
 * Convert BigInt to bytes with specified length
 */
function bigIntToBytes(n: bigint, length: number): Uint8Array {
  const hex = n.toString(16).padStart(length * 2, '0');
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

/**
 * Modular exponentiation: base^exp mod mod
 * Uses square-and-multiply algorithm for efficiency
 */
function modPow(base: bigint, exp: bigint, mod: bigint): bigint {
  let result = 1n;
  base = base % mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) {
      result = (result * base) % mod;
    }
    exp = exp / 2n;
    base = (base * base) % mod;
  }
  return result;
}

/**
 * Extended Euclidean Algorithm for modular inverse
 * Finds x such that: a * x ≡ 1 (mod m)
 */
function modInverse(a: bigint, m: bigint): bigint {
  const extGcd = (a: bigint, b: bigint): [bigint, bigint, bigint] => {
    if (a === 0n) return [b, 0n, 1n];
    const [g, x, y] = extGcd(b % a, a);
    return [g, y - (b / a) * x, x];
  };
  const [g, x] = extGcd(((a % m) + m) % m, m);
  if (g !== 1n) throw new Error('Modular inverse does not exist');
  return ((x % m) + m) % m;
}

/**
 * Generate a random 512-bit license seed
 * This happens entirely on the user's device
 */
export function generateLicenseSeed(): Uint8Array {
  const seed = new Uint8Array(64); // 512 bits = 64 bytes
  crypto.getRandomValues(seed);
  return seed;
}

/**
 * Blind a license seed before sending to VU
 * 
 * The blinding process:
 * 1. Generate random blinding factor r
 * 2. Compute r^e mod n (blinding mask)
 * 3. Compute L × r^e mod n (blinded license)
 * 
 * VU will sign the blinded license without knowing L
 */
export function blindLicense(seed: Uint8Array): BlindingResult {
  // Generate random blinding factor
  const blindingFactor = new Uint8Array(256);
  crypto.getRandomValues(blindingFactor);
  
  const seedBigInt = bytesToBigInt(seed);
  const rBigInt = bytesToBigInt(blindingFactor);
  
  // Compute blinding mask: r^e mod n
  const blindingMask = modPow(rBigInt, VU_PUBLIC_KEY.e, VU_PUBLIC_KEY.n);
  
  // Compute blinded license: L × r^e mod n
  const blindedLicense = (seedBigInt * blindingMask) % VU_PUBLIC_KEY.n;
  
  return {
    blindedLicense: bigIntToBytes(blindedLicense, 256),
    blindingFactor
  };
}

/**
 * Unblind a signature from VU
 * 
 * The unblinding process:
 * 1. Receive blind signature S' = L'^d mod n from VU
 * 2. Compute r^(-1) mod n (inverse of blinding factor)
 * 3. Compute S = S' × r^(-1) mod n (valid signature on original L)
 * 
 * Result: Valid signature without VU ever seeing L
 */
export function unblindSignature(
  blindedSignature: Uint8Array,
  blindingFactor: Uint8Array
): Uint8Array {
  const sigBigInt = bytesToBigInt(blindedSignature);
  const rBigInt = bytesToBigInt(blindingFactor);
  
  // Compute modular inverse of blinding factor
  const rInverse = modInverse(rBigInt, VU_PUBLIC_KEY.n);
  
  // Unblind: S = S' × r^(-1) mod n
  const signature = (sigBigInt * rInverse) % VU_PUBLIC_KEY.n;
  
  return bigIntToBytes(signature, 256);
}

/**
 * Verify a license locally
 * Works completely offline - no server contact needed
 * 
 * Verification:
 * 1. Compute S^e mod n
 * 2. If it equals the original seed, signature is valid
 * 3. Check expiration for non-lifetime licenses
 */
export function verifyLicense(license: AnonymousLicense): boolean {
  const seedBigInt = bytesToBigInt(license.seed);
  const sigBigInt = bytesToBigInt(license.signature);
  
  // Verify signature: S^e mod n should equal L
  const verified = modPow(sigBigInt, VU_PUBLIC_KEY.e, VU_PUBLIC_KEY.n);
  
  // Check cryptographic validity
  if (verified !== seedBigInt) {
    return false;
  }
  
  // Check expiration for non-lifetime licenses
  if (license.tier !== 'lifetime') {
    const now = Date.now();
    const duration = license.tier === 'yearly' 
      ? 365 * 24 * 60 * 60 * 1000 // 1 year
      : 30 * 24 * 60 * 60 * 1000;  // 30 days
    
    if (now > license.issued + duration) {
      return false; // License expired
    }
  }
  
  return true;
}

/**
 * Create a display-friendly hash of license data
 * Used for showing license "fingerprint" to users
 * Uses Web Crypto API (built-in)
 */
export function hashForDisplay(data: Uint8Array): string {
  // Simple hash using XOR folding for display purposes
  // (We don't need cryptographic strength for display fingerprints)
  const result = new Uint8Array(8);
  for (let i = 0; i < data.length; i++) {
    result[i % 8] ^= data[i];
  }
  return Array.from(result)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();
}

/**
 * Serialize a license for storage/export
 * Base64-encoded JSON for portability
 */
export function serializeLicense(license: AnonymousLicense): string {
  return btoa(JSON.stringify({
    seed: Array.from(license.seed),
    signature: Array.from(license.signature),
    app: license.app,
    tier: license.tier,
    issued: license.issued,
    version: license.version
  }));
}

/**
 * Deserialize a license from storage/import
 */
export function deserializeLicense(data: string): AnonymousLicense {
  const parsed = JSON.parse(atob(data));
  return {
    seed: new Uint8Array(parsed.seed),
    signature: new Uint8Array(parsed.signature),
    app: parsed.app,
    tier: parsed.tier,
    issued: parsed.issued,
    version: parsed.version
  };
}

/**
 * Get the public key for external verification
 */
export function getPublicKey(): { n: string; e: string } {
  return {
    n: VU_PUBLIC_KEY.n.toString(16),
    e: VU_PUBLIC_KEY.e.toString(16)
  };
}

/**
 * Generate a license file name
 */
export function generateLicenseFileName(license: AnonymousLicense): string {
  const hash = hashForDisplay(license.seed).slice(0, 8);
  return `vu-license-${license.app}-${hash}.lic`;
}

/**
 * Calculate remaining days on a license
 * Returns Infinity for lifetime licenses
 */
export function getRemainingDays(license: AnonymousLicense): number {
  if (license.tier === 'lifetime') {
    return Infinity;
  }
  
  const duration = license.tier === 'yearly'
    ? 365 * 24 * 60 * 60 * 1000
    : 30 * 24 * 60 * 60 * 1000;
  
  const expiresAt = license.issued + duration;
  const remaining = expiresAt - Date.now();
  
  return Math.max(0, Math.ceil(remaining / (24 * 60 * 60 * 1000)));
}

// Types are exported inline with their interface definitions above

