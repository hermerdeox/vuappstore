/**
 * VU App Store - Payment Types
 *
 * Crypto-only payment system aligned with VU privacy philosophy:
 * - Level 0: Monero (XMR) - Complete anonymity, zero-knowledge
 * - Level 1: Lightning Network - Fast, private, off-chain
 * - Level 2: Bitcoin/Ethereum - Standard cryptocurrency
 *
 * NO traditional payment processors. NO KYC. NO data collection.
 */

export type PaymentMethod = 'monero' | 'lightning' | 'bitcoin' | 'ethereum';

export type PaymentLevel = 0 | 1 | 2;

export interface PaymentRequest {
	method: PaymentMethod;
	level: PaymentLevel;
	amountUSD: number;
	orderId: string;
	userId: string;
}

export type PaymentStatus =
	| 'pending' // Awaiting payment
	| 'mempool' // Seen in mempool (unconfirmed)
	| 'confirming' // Has confirmations, not enough
	| 'confirmed' // Fully confirmed
	| 'expired' // Payment window expired
	| 'failed'; // Payment failed

export interface PaymentRecord {
	id: string;
	orderId: string;
	userId: string;
	method: PaymentMethod;
	level: PaymentLevel;
	amountUSD: number;
	amountCrypto: string;
	address: string;
	status: PaymentStatus;
	confirmations: number;
	requiredConfirmations: number;
	txHash?: string;
	createdAt: Date;
	expiresAt: Date;
	confirmedAt?: Date;
}

export interface PaymentAddress {
	address: string;
	amount: string; // crypto amount
	amountUSD: number;
	method: PaymentMethod;
	level: PaymentLevel;
	expiry: Date;
	qrCode?: string;
}

export interface CryptoPaymentConfig {
	method: PaymentMethod;
	amount: number; // in USD cents
	currency: 'USD';
	orderId: string;
	userId: string;
}

/**
 * Payment level metadata
 */
export interface PaymentLevelInfo {
	level: PaymentLevel;
	name: string;
	symbol: string;
	description: string;
	privacy: 'Maximum' | 'High' | 'Standard';
	color: string;
	recommended?: boolean;
}

/**
 * VU Payment Levels Configuration
 */
export const PAYMENT_LEVELS: Record<PaymentLevel, PaymentLevelInfo> = {
	0: {
		level: 0,
		name: 'Monero',
		symbol: 'XMR',
		description: 'Zero-knowledge, completely untraceable',
		privacy: 'Maximum',
		color: '#3b82f6',
		recommended: true
	},
	1: {
		level: 1,
		name: 'Lightning',
		symbol: 'BTC',
		description: 'Fast off-chain payments with enhanced privacy',
		privacy: 'High',
		color: '#22c55e'
	},
	2: {
		level: 2,
		name: 'Bitcoin/Ethereum',
		symbol: 'BTC/ETH',
		description: 'Standard cryptocurrency payments',
		privacy: 'Standard',
		color: '#eab308'
	}
} as const;

/**
 * Required confirmations per payment method
 */
export const REQUIRED_CONFIRMATIONS: Record<PaymentMethod, number> = {
	monero: 10, // ~20 minutes
	lightning: 0, // Instant (off-chain)
	bitcoin: 3, // ~30 minutes
	ethereum: 12 // ~3 minutes
} as const;

/**
 * Payment expiry times in milliseconds
 */
export const PAYMENT_EXPIRY_MS: Record<PaymentMethod, number> = {
	monero: 30 * 60 * 1000, // 30 minutes
	lightning: 60 * 60 * 1000, // 1 hour (invoice expiry)
	bitcoin: 60 * 60 * 1000, // 1 hour
	ethereum: 30 * 60 * 1000 // 30 minutes
} as const;
