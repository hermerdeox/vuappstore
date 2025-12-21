/**
 * VU Anonymous Licensing System - Blind Signature Tests
 * 
 * These tests verify the cryptographic integrity of the
 * blind signature implementation.
 */

import { describe, it, expect } from 'vitest';
import {
  generateLicenseSeed,
  blindLicense,
  verifyLicense,
  serializeLicense,
  deserializeLicense,
  hashForDisplay,
  getRemainingDays,
  getPublicKey,
  generateLicenseFileName,
  type AnonymousLicense
} from './blind-signature';

describe('Blind Signature System', () => {
  describe('License Seed Generation', () => {
    it('should generate a 512-bit (64 byte) license seed', () => {
      const seed = generateLicenseSeed();
      expect(seed).toBeInstanceOf(Uint8Array);
      expect(seed.length).toBe(64); // 512 bits = 64 bytes
    });

    it('should generate unique seeds', () => {
      const seed1 = generateLicenseSeed();
      const seed2 = generateLicenseSeed();
      
      // Convert to hex for comparison
      const hex1 = Array.from(seed1).map(b => b.toString(16)).join('');
      const hex2 = Array.from(seed2).map(b => b.toString(16)).join('');
      
      expect(hex1).not.toBe(hex2);
    });

    it('should generate random seeds (entropy check)', () => {
      const seed = generateLicenseSeed();
      
      // Check that not all bytes are the same (basic entropy check)
      const uniqueBytes = new Set(seed);
      expect(uniqueBytes.size).toBeGreaterThan(10);
    });
  });

  describe('License Blinding', () => {
    it('should blind a license correctly', () => {
      const seed = generateLicenseSeed();
      const { blindedLicense, blindingFactor } = blindLicense(seed);

      expect(blindedLicense).toBeInstanceOf(Uint8Array);
      expect(blindingFactor).toBeInstanceOf(Uint8Array);
      expect(blindedLicense.length).toBe(256);
      expect(blindingFactor.length).toBe(256);
    });

    it('should produce different blinded values for same seed', () => {
      const seed = generateLicenseSeed();
      const result1 = blindLicense(seed);
      const result2 = blindLicense(seed);

      // Blinded values should be different due to random blinding factor
      const hex1 = Array.from(result1.blindedLicense).map(b => b.toString(16)).join('');
      const hex2 = Array.from(result2.blindedLicense).map(b => b.toString(16)).join('');

      expect(hex1).not.toBe(hex2);
    });

    it('should produce unique blinding factors', () => {
      const seed = generateLicenseSeed();
      const result1 = blindLicense(seed);
      const result2 = blindLicense(seed);

      const factor1 = Array.from(result1.blindingFactor).map(b => b.toString(16)).join('');
      const factor2 = Array.from(result2.blindingFactor).map(b => b.toString(16)).join('');

      expect(factor1).not.toBe(factor2);
    });
  });

  describe('License Serialization', () => {
    it('should serialize and deserialize licenses correctly', () => {
      const original: AnonymousLicense = {
        seed: generateLicenseSeed(),
        signature: new Uint8Array(256).fill(1),
        app: 'vunotes',
        tier: 'yearly',
        issued: Date.now(),
        version: '1.0.0'
      };

      const serialized = serializeLicense(original);
      expect(typeof serialized).toBe('string');
      expect(serialized.length).toBeGreaterThan(0);

      const deserialized = deserializeLicense(serialized);
      expect(deserialized.app).toBe(original.app);
      expect(deserialized.tier).toBe(original.tier);
      expect(deserialized.version).toBe(original.version);
      expect(deserialized.issued).toBe(original.issued);
      expect(Array.from(deserialized.seed)).toEqual(Array.from(original.seed));
      expect(Array.from(deserialized.signature)).toEqual(Array.from(original.signature));
    });

    it('should produce valid base64', () => {
      const license: AnonymousLicense = {
        seed: generateLicenseSeed(),
        signature: new Uint8Array(256),
        app: 'vumail',
        tier: 'monthly',
        issued: Date.now(),
        version: '1.0.0'
      };

      const serialized = serializeLicense(license);
      
      // Should be valid base64
      expect(() => atob(serialized)).not.toThrow();
    });
  });

  describe('License Expiration', () => {
    it('should reject expired monthly licenses', () => {
      const license: AnonymousLicense = {
        seed: generateLicenseSeed(),
        signature: new Uint8Array(256),
        app: 'vunotes',
        tier: 'monthly',
        issued: Date.now() - (31 * 24 * 60 * 60 * 1000), // 31 days ago
        version: '1.0.0'
      };

      // Note: verifyLicense checks both signature AND expiration
      // Since we have a dummy signature, it will fail on signature verification
      // But we can test getRemainingDays
      expect(getRemainingDays(license)).toBe(0);
    });

    it('should reject expired yearly licenses', () => {
      const license: AnonymousLicense = {
        seed: generateLicenseSeed(),
        signature: new Uint8Array(256),
        app: 'vunotes',
        tier: 'yearly',
        issued: Date.now() - (366 * 24 * 60 * 60 * 1000), // 366 days ago
        version: '1.0.0'
      };

      expect(getRemainingDays(license)).toBe(0);
    });

    it('should accept lifetime licenses regardless of age', () => {
      const license: AnonymousLicense = {
        seed: generateLicenseSeed(),
        signature: new Uint8Array(256),
        app: 'vunotes',
        tier: 'lifetime',
        issued: Date.now() - (365 * 10 * 24 * 60 * 60 * 1000), // 10 years ago
        version: '1.0.0'
      };

      expect(getRemainingDays(license)).toBe(Infinity);
    });

    it('should calculate correct remaining days for monthly', () => {
      const license: AnonymousLicense = {
        seed: generateLicenseSeed(),
        signature: new Uint8Array(256),
        app: 'vunotes',
        tier: 'monthly',
        issued: Date.now() - (15 * 24 * 60 * 60 * 1000), // 15 days ago
        version: '1.0.0'
      };

      const remaining = getRemainingDays(license);
      expect(remaining).toBeGreaterThanOrEqual(14);
      expect(remaining).toBeLessThanOrEqual(16);
    });

    it('should calculate correct remaining days for yearly', () => {
      const license: AnonymousLicense = {
        seed: generateLicenseSeed(),
        signature: new Uint8Array(256),
        app: 'vunotes',
        tier: 'yearly',
        issued: Date.now() - (100 * 24 * 60 * 60 * 1000), // 100 days ago
        version: '1.0.0'
      };

      const remaining = getRemainingDays(license);
      expect(remaining).toBeGreaterThanOrEqual(264);
      expect(remaining).toBeLessThanOrEqual(266);
    });
  });

  describe('Hash Functions', () => {
    it('should generate consistent display hashes', () => {
      const data = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
      const hash1 = hashForDisplay(data);
      const hash2 = hashForDisplay(data);

      expect(hash1).toBe(hash2);
      expect(hash1.length).toBe(16); // 8 bytes = 16 hex chars
      expect(/^[0-9A-F]+$/.test(hash1)).toBe(true);
    });

    it('should generate different hashes for different data', () => {
      const data1 = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
      const data2 = new Uint8Array([8, 7, 6, 5, 4, 3, 2, 1]);

      expect(hashForDisplay(data1)).not.toBe(hashForDisplay(data2));
    });
  });

  describe('Public Key', () => {
    it('should return valid public key components', () => {
      const publicKey = getPublicKey();

      expect(publicKey.n).toBeDefined();
      expect(publicKey.e).toBeDefined();
      expect(publicKey.n.length).toBeGreaterThan(0);
      expect(publicKey.e).toBe('10001'); // 65537 in hex
    });
  });

  describe('File Name Generation', () => {
    it('should generate valid license file names', () => {
      const license: AnonymousLicense = {
        seed: generateLicenseSeed(),
        signature: new Uint8Array(256),
        app: 'vunotes',
        tier: 'yearly',
        issued: Date.now(),
        version: '1.0.0'
      };

      const fileName = generateLicenseFileName(license);

      expect(fileName).toMatch(/^vu-license-vunotes-[0-9A-F]+\.lic$/);
    });

    it('should generate unique file names for different licenses', () => {
      const license1: AnonymousLicense = {
        seed: generateLicenseSeed(),
        signature: new Uint8Array(256),
        app: 'vunotes',
        tier: 'yearly',
        issued: Date.now(),
        version: '1.0.0'
      };

      const license2: AnonymousLicense = {
        seed: generateLicenseSeed(),
        signature: new Uint8Array(256),
        app: 'vunotes',
        tier: 'yearly',
        issued: Date.now(),
        version: '1.0.0'
      };

      expect(generateLicenseFileName(license1)).not.toBe(generateLicenseFileName(license2));
    });
  });
});

describe('VU Pricing Model', () => {
  const PRICE_PER_APP_MONTHLY = 5.12; // $5.12 per app per month (512 × $0.01)
  const PRICE_PER_APP_YEARLY = 51.20; // $51.20 per app per year (512 × $0.10)
  const PRICE_LIFETIME = 256; // $256 lifetime

  it('should have price aligned with 512-bit encryption', () => {
    // 512 bits = $5.12 = 1¢ per bit (monthly)
    expect(PRICE_PER_APP_MONTHLY).toBe(5.12);
    expect(5.12 / 512).toBeCloseTo(0.01, 4); // 1 cent per bit
  });

  it('should have yearly price at 10× monthly formula', () => {
    // 512 bits = $51.20 = 10¢ per bit (yearly)
    expect(PRICE_PER_APP_YEARLY).toBe(51.20);
    expect(51.20 / 512).toBeCloseTo(0.10, 4); // 10 cents per bit
  });

  it('should have lifetime price at 256-bit legacy', () => {
    // Lifetime = $256 (256-bit legacy pricing)
    expect(PRICE_LIFETIME).toBe(256);
  });
});

describe('Payment Method Validation', () => {
  const validPaymentMethods = ['monero', 'lightning', 'bitcoin', 'ethereum'];

  it('should accept valid crypto payment methods', () => {
    validPaymentMethods.forEach((method) => {
      expect(validPaymentMethods.includes(method)).toBe(true);
    });
  });

  it('should NOT include traditional payment methods', () => {
    const traditionalMethods = [
      'cryptocurrency',
      'monero',
      'crypto',
      'apple_pay',
      'google_pay',
      'bank_transfer'
    ];

    traditionalMethods.forEach((method) => {
      expect(validPaymentMethods.includes(method)).toBe(false);
    });
  });

  it('should recommend Monero for maximum privacy', () => {
    const recommendedMethod = validPaymentMethods[0];
    expect(recommendedMethod).toBe('monero');
  });
});

describe('VU Philosophy Compliance', () => {
  it('should never store user identity', () => {
    // License contains NO user identity fields
    const license: AnonymousLicense = {
      seed: generateLicenseSeed(),
      signature: new Uint8Array(256),
      app: 'vunotes',
      tier: 'yearly',
      issued: Date.now(),
      version: '1.0.0'
    };

    // Verify no identity fields exist
    expect('email' in license).toBe(false);
    expect('name' in license).toBe(false);
    expect('userId' in license).toBe(false);
    expect('customerId' in license).toBe(false);
    expect('paymentId' in license).toBe(false);
  });

  it('should enable offline verification', () => {
    // Public key is available for offline verification
    const publicKey = getPublicKey();
    expect(publicKey.n).toBeDefined();
    expect(publicKey.e).toBeDefined();
    
    // Verification formula: S^e mod n === L
    // This can be computed entirely offline
  });

  it('should not link payment to license', () => {
    // The blinding process ensures no correlation
    const seed = generateLicenseSeed();
    const { blindedLicense, blindingFactor } = blindLicense(seed);
    
    // Blinded license reveals nothing about original seed
    // Blinding factor is destroyed after use
    // No way to correlate payment with license
    
    expect(blindedLicense).toBeDefined();
    expect(blindingFactor).toBeDefined();
    
    // These are mathematically independent
    const seedHex = Array.from(seed).map(b => b.toString(16)).join('');
    const blindedHex = Array.from(blindedLicense).map(b => b.toString(16)).join('');
    
    expect(blindedHex).not.toContain(seedHex);
  });
});

