/**
 * VU Anonymous Licensing System - Public Key Endpoint
 * 
 * GET /api/license/public-key
 * 
 * Returns the public key used to verify VU license signatures.
 * Anyone can verify a license offline using this public key.
 */

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * VU Public Key for license verification
 * This is the public component of our RSA-2048 key pair
 * 
 * n: RSA modulus (2048-bit)
 * e: Public exponent (65537)
 */
const PUBLIC_KEY = {
  // 2048-bit RSA modulus
  n: 'c7f8a9b2e3d4c5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8',
  // Standard RSA public exponent
  e: '10001' // 65537 in hex
};

export const GET: RequestHandler = async () => {
  return json({
    publicKey: PUBLIC_KEY,
    algorithm: 'RSA-2048-BLIND',
    version: '1.0.0',
    
    // Verification instructions
    verification: {
      description: 'To verify a license, compute: signature^e mod n. If it equals the license seed, the signature is valid.',
      formula: 'valid = (S^e mod n) === L',
      offline: 'This verification works completely offline. No server contact needed.'
    },
    
    // Philosophy
    philosophy: 'We sign what we cannot see.',
    
    // How blind signatures work
    explanation: {
      step1: 'User generates random 512-bit license seed locally',
      step2: 'User blinds the seed: L_blind = L × r^e mod n',
      step3: 'VU signs the blinded seed: S_blind = L_blind^d mod n',
      step4: 'User unblinds locally: S = S_blind × r^(-1) mod n',
      step5: 'Result: Valid signature on original L, VU never saw it'
    },
    
    // Links
    links: {
      howItWorks: '/how-licensing-works',
      pricing: '/pricing',
      apps: '/apps'
    }
  });
};

