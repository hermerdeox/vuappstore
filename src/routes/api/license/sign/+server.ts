/**
 * VU Anonymous Licensing System - Blind Signature Endpoint
 * 
 * POST /api/license/sign
 * 
 * "We sign what we cannot see."
 * 
 * This endpoint receives a blinded license and payment proof,
 * verifies the payment, and returns a blind signature.
 * 
 * The server NEVER sees:
 * - The actual license content (it's blinded)
 * - Who the user is (Monero payment is anonymous)
 * - Any correlation between payment and license
 */

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

// RSA private key component (d) - KEEP SECRET
const PRIVATE_KEY_D = BigInt('0x' + (env.VU_PRIVATE_KEY_D || '3'));

// RSA public modulus (n) - same as in blind-signature.ts
const PUBLIC_KEY_N = BigInt('0x' + (env.VU_PUBLIC_KEY_N || 'c7f8a9b2e3d4c5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8'));

// Monero Wallet RPC endpoint
const MONERO_WALLET_RPC = env.MONERO_WALLET_RPC || 'http://localhost:18082/json_rpc';

// Pricing in XMR (approximate, should be fetched from exchange)
const PRICES: Record<string, number> = {
  monthly: 0.03,   // ~$5.12 USD
  yearly: 0.30,    // ~$51.20 USD
  lifetime: 1.50   // ~$256 USD
};

// Valid apps that can receive licenses
const VALID_APPS = [
  'vunotes', 'vumail', 'vuvault', 'vupass', 'vuchat',
  'vuphotos', 'vucloud', 'vucalendar', 'vucontacts', 'vubrowser',
  'vuvpn', 'vudns', 'vuauth', 'vusync', 'vubackup',
  'vumeet', 'vudocs', 'vusheets', 'vuslides', 'vudraw',
  'vumusic', 'vuvideo', 'vupodcast', 'vunews', 'vuread',
  'vucode', 'vuterminal', 'vuai', 'vuanalytics', 'vumonitor'
];

/**
 * Modular exponentiation for RSA signing
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
 * Verify Monero payment via Wallet RPC
 * Returns true if payment is valid and sufficient
 */
async function verifyMoneroPayment(txId: string, expectedAmount: number): Promise<boolean> {
  // In development/demo mode, accept test transactions
  if (env.NODE_ENV === 'development' && txId.startsWith('test_')) {
    console.log('[DEV] Accepting test transaction:', txId);
    return true;
  }

  try {
    const response = await fetch(MONERO_WALLET_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: '0',
        method: 'get_transfer_by_txid',
        params: { txid: txId }
      })
    });

    const result = await response.json();
    
    if (result.result?.transfer) {
      // Amount is in atomic units (1 XMR = 1e12 atomic units)
      const amountReceived = result.result.transfer.amount / 1e12;
      const isConfirmed = result.result.transfer.confirmations >= 10;
      
      console.log({
        event: 'payment_verified',
        txId,
        amountReceived,
        expectedAmount,
        confirmations: result.result.transfer.confirmations,
        isConfirmed
      });
      
      return amountReceived >= expectedAmount && isConfirmed;
    }
    
    return false;
  } catch (e) {
    console.error('Monero RPC error:', e);
    // In production, return false. In dev, be lenient.
    return env.NODE_ENV === 'development';
  }
}

/**
 * Log event for anonymous audit trail
 * We log WHAT happened, not WHO did it
 */
function logAuditEvent(event: string, app: string, tier: string) {
  console.log(JSON.stringify({
    event,
    app,
    tier,
    timestamp: Date.now(),
    // NO user identification, NO IP logging, NO tracking
  }));
}

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();
    const { blindedLicense, paymentProof, app, tier } = body;

    // Validate required fields
    if (!blindedLicense) {
      throw error(400, { message: 'Missing blindedLicense' });
    }
    if (!paymentProof) {
      throw error(400, { message: 'Missing paymentProof (Monero transaction ID)' });
    }
    if (!app) {
      throw error(400, { message: 'Missing app identifier' });
    }
    if (!tier) {
      throw error(400, { message: 'Missing tier (monthly/yearly/lifetime)' });
    }

    // Validate app is in our catalog
    if (!VALID_APPS.includes(app)) {
      throw error(400, { message: `Invalid app: ${app}` });
    }

    // Validate tier
    if (!['monthly', 'yearly', 'lifetime'].includes(tier)) {
      throw error(400, { message: 'Invalid tier. Must be monthly, yearly, or lifetime.' });
    }

    // Validate blinded license format (should be hex string)
    if (!/^[0-9a-fA-F]+$/.test(blindedLicense)) {
      throw error(400, { message: 'Invalid blindedLicense format (expected hex string)' });
    }

    // Verify Monero payment
    const expectedPrice = PRICES[tier];
    const paymentValid = await verifyMoneroPayment(paymentProof, expectedPrice);

    if (!paymentValid) {
    throw error(402, 'Payment not verified. Transaction not found, unconfirmed, or incorrect amount. Expected: ' + expectedPrice + ' XMR. Please ensure your transaction has at least 10 confirmations.');
    }

    // Convert blinded license from hex to BigInt
    const blindedLicenseBigInt = BigInt('0x' + blindedLicense);

    // Sign the blinded license: S' = L'^d mod n
    // This is the magic - we sign without knowing what L is!
    const blindedSignature = modPow(blindedLicenseBigInt, PRIVATE_KEY_D, PUBLIC_KEY_N);

    const issuedAt = Date.now();

    // Log anonymous audit event
    logAuditEvent('license_signed', app, tier);

    // Return the blind signature
    // The client will unblind this to get a valid signature on their original license
    return json({
      blindedSignature: blindedSignature.toString(16).padStart(512, '0'),
      issuedAt,
      app,
      tier,
      message: 'License signed. We have no idea who you are. This is the VU Promise.',
      philosophy: 'We sign what we cannot see.'
    });

  } catch (e) {
    if (e && typeof e === 'object' && 'status' in e) {
      throw e; // Re-throw SvelteKit errors
    }
    console.error('License signing error:', e);
    throw error(500, { message: 'Internal server error' });
  }
};

/**
 * GET - Return endpoint information
 */
export const GET: RequestHandler = async () => {
  return json({
    endpoint: '/api/license/sign',
    method: 'POST',
    description: 'Blind signature endpoint for VU Anonymous Licensing',
    required: {
      blindedLicense: 'Hex-encoded blinded license (from client)',
      paymentProof: 'Monero transaction ID',
      app: 'App identifier (e.g., vunotes)',
      tier: 'monthly | yearly | lifetime'
    },
    pricing: {
      monthly: '$5.12 (~0.03 XMR)',
      yearly: '$51.20 (~0.30 XMR)',
      lifetime: '$256 (~1.50 XMR)'
    },
    philosophy: 'We sign your license. We never see it.',
    privacy: 'Zero-knowledge blind signatures. No tracking. No identification.'
  });
};

