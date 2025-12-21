/**
 * VU Anonymous Licensing System - Payment Address Generation
 * 
 * POST /api/payment/address
 * 
 * Generates a unique Monero integrated address for payment.
 * Each payment gets a unique address for tracking without identification.
 */

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

// Monero Wallet RPC endpoint
const MONERO_WALLET_RPC = env.MONERO_WALLET_RPC || 'http://localhost:18082/json_rpc';

// VU Main Monero address (fallback for demo mode)
const DEMO_ADDRESS = '4' + 'V'.repeat(94); // Placeholder for demo

// Pricing in USD and XMR
const PRICES: Record<string, { usd: number; xmr: number }> = {
  monthly: { usd: 5.12, xmr: 0.03 },    // 512 × $0.01
  yearly: { usd: 51.20, xmr: 0.30 },    // 512 × $0.10
  lifetime: { usd: 256.00, xmr: 1.50 }  // 256-bit legacy price
};

// Valid apps
const VALID_APPS = [
  'vunotes', 'vumail', 'vuvault', 'vupass', 'vuchat',
  'vuphotos', 'vucloud', 'vucalendar', 'vucontacts', 'vubrowser',
  'vuvpn', 'vudns', 'vuauth', 'vusync', 'vubackup',
  'vumeet', 'vudocs', 'vusheets', 'vuslides', 'vudraw',
  'vumusic', 'vuvideo', 'vupodcast', 'vunews', 'vuread',
  'vucode', 'vuterminal', 'vuai', 'vuanalytics', 'vumonitor'
];

/**
 * Generate unique payment ID (16 bytes hex)
 */
function generatePaymentId(): string {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Call Monero Wallet RPC to generate integrated address
 */
async function generateIntegratedAddress(): Promise<{ address: string; paymentId: string }> {
  try {
    const response = await fetch(MONERO_WALLET_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: '0',
        method: 'make_integrated_address',
        params: {}
      })
    });

    const result = await response.json();

    if (result.result?.integrated_address) {
      return {
        address: result.result.integrated_address,
        paymentId: result.result.payment_id
      };
    }

    throw new Error('Failed to generate integrated address');
  } catch (e) {
    // In development mode, return demo address
    if (env.NODE_ENV === 'development') {
      const paymentId = generatePaymentId();
      return {
        address: DEMO_ADDRESS,
        paymentId
      };
    }
    throw e;
  }
}

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { app, tier } = await request.json();

    // Validate required fields
    if (!app) {
      throw error(400, { message: 'Missing app identifier' });
    }
    if (!tier) {
      throw error(400, { message: 'Missing tier (monthly/yearly/lifetime)' });
    }

    // Validate app
    if (!VALID_APPS.includes(app)) {
      throw error(400, { message: `Invalid app: ${app}` });
    }

    // Validate tier
    if (!PRICES[tier]) {
      throw error(400, { message: 'Invalid tier. Must be monthly, yearly, or lifetime.' });
    }

    // Generate unique payment address
    const { address, paymentId } = await generateIntegratedAddress();

    // Calculate expiry (30 minutes)
    const expiresAt = Date.now() + 30 * 60 * 1000;

    // Generate QR code data
    const qrData = `monero:${address}?tx_amount=${PRICES[tier].xmr}`;

    return json({
      // Payment details
      address,
      paymentId,
      
      // Amount to pay
      amount: PRICES[tier].xmr,
      amountUSD: PRICES[tier].usd,
      
      // What they're buying
      app,
      tier,
      
      // Expiry
      expiresAt,
      expiresIn: '30 minutes',
      
      // For QR code generation
      qrData,
      
      // VU Philosophy pricing explanation
      pricing: {
        formula: tier === 'lifetime' ? '256-bit legacy' : `512 bits × $${tier === 'monthly' ? '0.01' : '0.10'}`,
        explanation: 'The honest price of privacy: 1 cent per bit of encryption.'
      },
      
      // Instructions
      instructions: [
        'Send exactly the specified amount to the address above',
        'Wait for at least 10 confirmations (~20 minutes)',
        'Return to this page with your transaction ID',
        'Your license will be generated anonymously'
      ],
      
      // Privacy reminder
      privacy: 'This is a Monero integrated address. Your payment is completely untraceable. We will receive the funds without knowing who sent them.'
    });

  } catch (e) {
    if (e && typeof e === 'object' && 'status' in e) {
      throw e;
    }
    console.error('Payment address generation error:', e);
    throw error(500, { message: 'Failed to generate payment address' });
  }
};

/**
 * GET - Return endpoint information
 */
export const GET: RequestHandler = async () => {
  return json({
    endpoint: '/api/payment/address',
    method: 'POST',
    description: 'Generate a unique Monero payment address',
    required: {
      app: 'App identifier (e.g., vunotes)',
      tier: 'monthly | yearly | lifetime'
    },
    pricing: {
      monthly: {
        usd: 5.12,
        xmr: '~0.03',
        formula: '512 × $0.01'
      },
      yearly: {
        usd: 51.20,
        xmr: '~0.30',
        formula: '512 × $0.10'
      },
      lifetime: {
        usd: 256.00,
        xmr: '~1.50',
        formula: '256-bit legacy'
      }
    },
    acceptedCryptocurrencies: ['Monero (XMR)'],
    philosophy: 'Anonymous payments for anonymous licenses.',
    notAccepted: ['Credit cards', 'Monero', 'Bank transfers', 'Any KYC-required method']
  });
};

