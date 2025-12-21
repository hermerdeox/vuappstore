/**
 * VU Privacy Level Store
 * 
 * This store tracks the REALISTIC privacy level of each page/service in the VU ecosystem.
 * The VU Privacy Level Badge uses this to display BRUTALLY HONEST privacy information.
 * 
 * VU Privacy Levels (Lower is BETTER):
 * - Level 5: Conventional "Privacy" - NOT VU STANDARD - What other apps falsely claim
 * - Level 4: Basic Privacy - Encrypted transit, basic protections
 * - Level 3: Enhanced Privacy - End-to-end encryption, minimal metadata
 * - Level 2: Privacy First - Zero data need design, federated/differential privacy
 * - Level 1: Local-First - All computation local, data never leaves device
 * - Level 0: True Zero-Knowledge - Peer-to-peer, complete anonymity
 * - SubZero: Beyond zero-knowledge - Invitation only, counter-surveillance
 */

import { writable, derived, get } from 'svelte/store';
import { page } from '$app/stores';
import { browser } from '$app/environment';

export type VuPrivacyLevel = 0 | 1 | 2 | 3 | 4 | 5 | 'subzero';

export interface PrivacyLevelConfig {
	level: VuPrivacyLevel;
	levelName: string;
	shortName: string;
	color: string;
	colorRgb: string;
	description: string;
	whatYouControl: string;
	whatWeCantSee: string;
	whatServersSee: string;
	tradeoffs: string[];
	whyThisLevel: string;
}

// Color scheme for each level (inverted - lower number = better = cooler colors)
export const LEVEL_COLORS: Record<VuPrivacyLevel, { color: string; colorRgb: string }> = {
	5: { color: '#6b7280', colorRgb: '107, 116, 128' }, // Gray - NOT VU STANDARD
	4: { color: '#ef4444', colorRgb: '239, 68, 68' },    // Red
	3: { color: '#f97316', colorRgb: '249, 115, 22' },   // Orange
	2: { color: '#eab308', colorRgb: '234, 179, 8' },    // Yellow
	1: { color: '#22c55e', colorRgb: '34, 197, 94' },    // Green
	0: { color: '#3b82f6', colorRgb: '59, 130, 246' },   // Blue
	subzero: { color: '#ffffff', colorRgb: '255, 255, 255' } // White
};

export const LEVEL_NAMES: Record<VuPrivacyLevel, string> = {
	5: 'Conventional "Privacy"',
	4: 'Basic Privacy',
	3: 'Enhanced Privacy',
	2: 'Privacy First',
	1: 'Local-First',
	0: 'Zero-Knowledge',
	subzero: 'SubZero'
};

/**
 * BRUTALLY HONEST page-level privacy configurations
 * Each route is mapped to its REALISTIC privacy level based on actual services used
 */
export const PAGE_PRIVACY_CONFIGS: Record<string, PrivacyLevelConfig> = {
	// Homepage and static pages - Pure local rendering, no data collection
	'/': {
		level: 1,
		levelName: 'Local-First',
		shortName: 'V1',
		color: LEVEL_COLORS[1].color,
		colorRgb: LEVEL_COLORS[1].colorRgb,
		description: 'This page is rendered entirely locally with zero tracking.',
		whatYouControl: 'Everything - page loads locally with no server-side data collection.',
		whatWeCantSee: 'Your browsing behavior, clicks, scroll depth, time spent.',
		whatServersSee: 'Only the initial page request (standard HTTP).',
		tradeoffs: [
			'Static content served over HTTPS',
			'No analytics or behavioral tracking',
			'No cookies or fingerprinting'
		],
		whyThisLevel: 'Static content with zero JavaScript tracking. We deliver the page and forget you exist.'
	},

	// Apps listing - Static data
	'/apps': {
		level: 1,
		levelName: 'Local-First',
		shortName: 'V1',
		color: LEVEL_COLORS[1].color,
		colorRgb: LEVEL_COLORS[1].colorRgb,
		description: 'App catalog is loaded once and rendered locally.',
		whatYouControl: 'All browsing, filtering, and searching happens in your browser.',
		whatWeCantSee: 'Which apps you look at, how long you browse, what you search.',
		whatServersSee: 'Only the initial page request.',
		tradeoffs: [
			'App data is bundled and served statically',
			'No search queries are logged',
			'Filtering happens client-side'
		],
		whyThisLevel: 'We pre-bundle all app data. Your browsing behavior stays on your device.'
	},

	// Privacy levels page - Educational, static
	'/privacy-levels': {
		level: 1,
		levelName: 'Local-First',
		shortName: 'V1',
		color: LEVEL_COLORS[1].color,
		colorRgb: LEVEL_COLORS[1].colorRgb,
		description: 'Educational content with zero tracking.',
		whatYouControl: 'Theme preferences are stored locally only.',
		whatWeCantSee: 'Your reading behavior, interest in specific levels.',
		whatServersSee: 'Only the initial page request.',
		tradeoffs: [
			'Theme preference saved to localStorage only',
			'No reading analytics',
			'All animations run locally'
		],
		whyThisLevel: 'Pure educational content. We want you informed, not tracked.'
	},

	// Pricing page - May involve external payment processor considerations
	'/pricing': {
		level: 2,
		levelName: 'Privacy First',
		shortName: 'V2',
		color: LEVEL_COLORS[2].color,
		colorRgb: LEVEL_COLORS[2].colorRgb,
		description: 'Pricing displayed locally, but checkout involves crypto processors.',
		whatYouControl: 'View pricing freely. Payment is crypto-only, minimizing identity exposure.',
		whatWeCantSee: 'Which plans you consider, time spent on page.',
		whatServersSee: 'When you initiate checkout, we generate a payment address.',
		tradeoffs: [
			'Crypto payments offer pseudonymity',
			'No cryptocurrency data ever touches our servers',
			'Blockchain transactions are public but pseudonymous'
		],
		whyThisLevel: 'We accept crypto-only to minimize financial tracking, but blockchain is inherently public.'
	},

	// VU Store - Marketplace
	'/vu-store': {
		level: 1,
		levelName: 'Local-First',
		shortName: 'V1',
		color: LEVEL_COLORS[1].color,
		colorRgb: LEVEL_COLORS[1].colorRgb,
		description: 'Store browsing is completely private.',
		whatYouControl: 'All browsing, wishlisting (local), and comparison.',
		whatWeCantSee: 'Your shopping behavior, interests, or preferences.',
		whatServersSee: 'Only the initial page request.',
		tradeoffs: [
			'Store data is pre-bundled',
			'No cart tracking or abandonment analytics',
			'Wishlists stored locally only'
		],
		whyThisLevel: 'Shop without surveillance. We only know what you buy, not what you browse.'
	},

	// VU Token page - Informational
	'/vutoken': {
		level: 1,
		levelName: 'Local-First',
		shortName: 'V1',
		color: LEVEL_COLORS[1].color,
		colorRgb: LEVEL_COLORS[1].colorRgb,
		description: 'Token information page with no tracking.',
		whatYouControl: 'Read about VU Token privately.',
		whatWeCantSee: 'Your interest level or investment intentions.',
		whatServersSee: 'Only the initial page request.',
		tradeoffs: [
			'Static informational content',
			'No engagement tracking',
			'External links open in new tabs'
		],
		whyThisLevel: 'Informational content only. Your financial interests are your business.'
	},

	// Account pages - Require authentication
	'/account': {
		level: 2,
		levelName: 'Privacy First',
		shortName: 'V2',
		color: LEVEL_COLORS[2].color,
		colorRgb: LEVEL_COLORS[2].colorRgb,
		description: 'Your account data is stored with zero-knowledge encryption.',
		whatYouControl: '@username (changeable), @vumail.app, subscription status.',
		whatWeCantSee: 'No real names, phone numbers, or payment methods.',
		whatServersSee: 'Encrypted account data, subscription status only.',
		tradeoffs: [
			'@username required for account identification',
			'@vumail.app required for secure communication',
			'Subscription status tracked for access control'
		],
		whyThisLevel: 'Accounts need identity, but we collect the absolute minimum: a username and encrypted email.'
	},

	'/account/downloads': {
		level: 1,
		levelName: 'Local-First',
		shortName: 'V1',
		color: LEVEL_COLORS[1].color,
		colorRgb: LEVEL_COLORS[1].colorRgb,
		description: 'Download history stored locally on your device only.',
		whatYouControl: 'Your complete download history.',
		whatWeCantSee: 'What you download, when, or how many times.',
		whatServersSee: 'Only authentication token for access verification.',
		tradeoffs: [
			'Download history is local-only',
			'Re-downloads don\'t create server logs',
			'We verify entitlement, not usage'
		],
		whyThisLevel: 'We verify you can access apps, but we don\'t track what you actually download.'
	},

	'/account/subscriptions': {
		level: 2,
		levelName: 'Privacy First',
		shortName: 'V2',
		color: LEVEL_COLORS[2].color,
		colorRgb: LEVEL_COLORS[2].colorRgb,
		description: 'Subscription data with zero payment storage.',
		whatYouControl: 'Plan changes, pause/cancel anytime.',
		whatWeCantSee: 'Your payment method details (handled by crypto processor).',
		whatServersSee: 'Subscription status and billing dates only.',
		tradeoffs: [
			'Billing dates stored for subscription management',
			'Invoice records kept for legal compliance (7 years)',
			'Payment processor handles all financial data'
		],
		whyThisLevel: 'We need to know if you\'re subscribed, but payment details stay with the crypto processor.'
	},

	'/account/settings': {
		level: 2,
		levelName: 'Privacy First',
		shortName: 'V2',
		color: LEVEL_COLORS[2].color,
		colorRgb: LEVEL_COLORS[2].colorRgb,
		description: 'Settings with privacy-first defaults.',
		whatYouControl: 'All preferences, 2FA, data export, account deletion.',
		whatWeCantSee: 'Your choices unless you explicitly save them.',
		whatServersSee: '@username, @vumail.app, security settings.',
		tradeoffs: [
			'Password hashed with Argon2id (never stored plain)',
			'2FA via VuAuth (no SMS to prevent tracking)',
			'All non-essential settings OFF by default'
		],
		whyThisLevel: 'Account settings require server storage, but all tracking features are OFF by default.'
	},

	// About pages - Static content
	'/about': {
		level: 1,
		levelName: 'Local-First',
		shortName: 'V1',
		color: LEVEL_COLORS[1].color,
		colorRgb: LEVEL_COLORS[1].colorRgb,
		description: 'About page with zero tracking.',
		whatYouControl: 'Read about us privately.',
		whatWeCantSee: 'Your interest in our company or team.',
		whatServersSee: 'Only the initial page request.',
		tradeoffs: ['Static content only'],
		whyThisLevel: 'Pure informational content. We share our story without watching you read it.'
	},

	'/about/mission': {
		level: 1,
		levelName: 'Local-First',
		shortName: 'V1',
		color: LEVEL_COLORS[1].color,
		colorRgb: LEVEL_COLORS[1].colorRgb,
		description: 'Mission statement with zero tracking.',
		whatYouControl: 'Read our mission privately.',
		whatWeCantSee: 'Your interest or engagement.',
		whatServersSee: 'Only the initial page request.',
		tradeoffs: ['Static content only'],
		whyThisLevel: 'Our mission is privacy. We practice what we preach.'
	},

	'/about/team': {
		level: 1,
		levelName: 'Local-First',
		shortName: 'V1',
		color: LEVEL_COLORS[1].color,
		colorRgb: LEVEL_COLORS[1].colorRgb,
		description: 'Team page with zero tracking.',
		whatYouControl: 'Learn about our team privately.',
		whatWeCantSee: 'Which team members interest you.',
		whatServersSee: 'Only the initial page request.',
		tradeoffs: ['Static content only'],
		whyThisLevel: 'Meet the team without us knowing you\'re looking.'
	},

	// Support pages
	'/support': {
		level: 2,
		levelName: 'Privacy First',
		shortName: 'V2',
		color: LEVEL_COLORS[2].color,
		colorRgb: LEVEL_COLORS[2].colorRgb,
		description: 'Support center with minimal data collection.',
		whatYouControl: 'Browse FAQs and docs privately.',
		whatWeCantSee: 'What issues you\'re researching.',
		whatServersSee: 'Only contact form submissions (if you choose to submit).',
		tradeoffs: [
			'FAQ browsing is completely private',
			'Contact requires @vumail.app email',
			'Support tickets stored only until resolved'
		],
		whyThisLevel: 'Browse support privately. We only collect data if you explicitly contact us.'
	},

	'/support/faq': {
		level: 1,
		levelName: 'Local-First',
		shortName: 'V1',
		color: LEVEL_COLORS[1].color,
		colorRgb: LEVEL_COLORS[1].colorRgb,
		description: 'FAQ page with zero tracking.',
		whatYouControl: 'Search and read FAQs locally.',
		whatWeCantSee: 'What questions you\'re looking at.',
		whatServersSee: 'Only the initial page request.',
		tradeoffs: ['All FAQ content is pre-bundled'],
		whyThisLevel: 'Find answers without us tracking your questions.'
	},

	'/support/contact': {
		level: 3,
		levelName: 'Enhanced Privacy',
		shortName: 'V3',
		color: LEVEL_COLORS[3].color,
		colorRgb: LEVEL_COLORS[3].colorRgb,
		description: 'Contact form requires email for response.',
		whatYouControl: 'What you share in your message.',
		whatWeCantSee: 'Why you visited until you submit.',
		whatServersSee: '@vumail.app address and your message content.',
		tradeoffs: [
			'@vumail.app required to respond to you',
			'Message content stored until issue resolved',
			'Tickets auto-deleted after 30 days'
		],
		whyThisLevel: 'To help you, we need to know how to reach you. But only @vumail.app accepted.'
	},

	// Developer pages
	'/developers': {
		level: 1,
		levelName: 'Local-First',
		shortName: 'V1',
		color: LEVEL_COLORS[1].color,
		colorRgb: LEVEL_COLORS[1].colorRgb,
		description: 'Developer portal with zero tracking.',
		whatYouControl: 'Browse docs and resources privately.',
		whatWeCantSee: 'What you\'re building or researching.',
		whatServersSee: 'Only the initial page request.',
		tradeoffs: ['All docs are static content'],
		whyThisLevel: 'Build with VU without us watching your development process.'
	},

	'/developers/api': {
		level: 2,
		levelName: 'Privacy First',
		shortName: 'V2',
		color: LEVEL_COLORS[2].color,
		colorRgb: LEVEL_COLORS[2].colorRgb,
		description: 'API docs with minimal tracking for abuse prevention.',
		whatYouControl: 'Browse API docs freely.',
		whatWeCantSee: 'What endpoints you\'re researching.',
		whatServersSee: 'Rate limiting data for API abuse prevention.',
		tradeoffs: [
			'API keys required for actual API usage',
			'Rate limiting requires request counting',
			'No payload logging'
		],
		whyThisLevel: 'API rate limiting requires some tracking, but we log requests, not content.'
	},

	'/developers/docs': {
		level: 1,
		levelName: 'Local-First',
		shortName: 'V1',
		color: LEVEL_COLORS[1].color,
		colorRgb: LEVEL_COLORS[1].colorRgb,
		description: 'Technical docs with zero tracking.',
		whatYouControl: 'Read all documentation privately.',
		whatWeCantSee: 'What you\'re learning or building.',
		whatServersSee: 'Only the initial page request.',
		tradeoffs: ['Static documentation content'],
		whyThisLevel: 'Learn to build privacy-first apps without us watching.'
	},

	'/developers/contribute': {
		level: 1,
		levelName: 'Local-First',
		shortName: 'V1',
		color: LEVEL_COLORS[1].color,
		colorRgb: LEVEL_COLORS[1].colorRgb,
		description: 'Contribution guide with zero tracking.',
		whatYouControl: 'Learn how to contribute privately.',
		whatWeCantSee: 'Your interest in contributing.',
		whatServersSee: 'Only the initial page request.',
		tradeoffs: ['Static content'],
		whyThisLevel: 'Decide to contribute on your own terms.'
	},

	'/developers/bug-bounty': {
		level: 2,
		levelName: 'Privacy First',
		shortName: 'V2',
		color: LEVEL_COLORS[2].color,
		colorRgb: LEVEL_COLORS[2].colorRgb,
		description: 'Bug bounty with responsible disclosure process.',
		whatYouControl: 'Report bugs with optional anonymity.',
		whatWeCantSee: 'Your security research activities.',
		whatServersSee: 'Submitted reports and payment info for bounties.',
		tradeoffs: [
			'Reports stored securely until resolved',
			'Payment requires some identity for legal compliance',
			'Anonymous tips accepted via encrypted channel'
		],
		whyThisLevel: 'Report anonymously or claim your bounty - your choice.'
	},

	// Legal pages - All static
	'/legal/terms': {
		level: 1,
		levelName: 'Local-First',
		shortName: 'V1',
		color: LEVEL_COLORS[1].color,
		colorRgb: LEVEL_COLORS[1].colorRgb,
		description: 'Terms of Service - static legal document.',
		whatYouControl: 'Read terms privately.',
		whatWeCantSee: 'Whether you\'ve read the terms.',
		whatServersSee: 'Only the initial page request.',
		tradeoffs: ['Static legal content'],
		whyThisLevel: 'Legal docs don\'t need tracking. Read at your own pace.'
	},

	'/legal/privacy': {
		level: 1,
		levelName: 'Local-First',
		shortName: 'V1',
		color: LEVEL_COLORS[1].color,
		colorRgb: LEVEL_COLORS[1].colorRgb,
		description: 'Privacy Policy - static legal document.',
		whatYouControl: 'Read our privacy policy privately.',
		whatWeCantSee: 'Your interest in specific sections.',
		whatServersSee: 'Only the initial page request.',
		tradeoffs: ['Static legal content'],
		whyThisLevel: 'Reading about privacy should be private.'
	},

	'/legal/refund': {
		level: 1,
		levelName: 'Local-First',
		shortName: 'V1',
		color: LEVEL_COLORS[1].color,
		colorRgb: LEVEL_COLORS[1].colorRgb,
		description: 'Refund Policy - static legal document.',
		whatYouControl: 'Read refund policy privately.',
		whatWeCantSee: 'Whether you\'re considering a refund.',
		whatServersSee: 'Only the initial page request.',
		tradeoffs: ['Static legal content'],
		whyThisLevel: 'Consider your options privately.'
	},

	'/legal/acceptable-use': {
		level: 1,
		levelName: 'Local-First',
		shortName: 'V1',
		color: LEVEL_COLORS[1].color,
		colorRgb: LEVEL_COLORS[1].colorRgb,
		description: 'Acceptable Use Policy - static legal document.',
		whatYouControl: 'Read AUP privately.',
		whatWeCantSee: 'Your interest in specific sections.',
		whatServersSee: 'Only the initial page request.',
		tradeoffs: ['Static legal content'],
		whyThisLevel: 'Understand our policies without surveillance.'
	},

	'/legal/gdpr': {
		level: 1,
		levelName: 'Local-First',
		shortName: 'V1',
		color: LEVEL_COLORS[1].color,
		colorRgb: LEVEL_COLORS[1].colorRgb,
		description: 'GDPR Compliance - static legal document.',
		whatYouControl: 'Read GDPR info privately.',
		whatWeCantSee: 'Your jurisdiction or concerns.',
		whatServersSee: 'Only the initial page request.',
		tradeoffs: ['Static legal content'],
		whyThisLevel: 'Learn about your rights privately.'
	},

	'/legal/ccpa': {
		level: 1,
		levelName: 'Local-First',
		shortName: 'V1',
		color: LEVEL_COLORS[1].color,
		colorRgb: LEVEL_COLORS[1].colorRgb,
		description: 'CCPA Compliance - static legal document.',
		whatYouControl: 'Read CCPA info privately.',
		whatWeCantSee: 'Your jurisdiction or concerns.',
		whatServersSee: 'Only the initial page request.',
		tradeoffs: ['Static legal content'],
		whyThisLevel: 'California privacy rights, explained privately.'
	},

	'/legal/data-processing': {
		level: 1,
		levelName: 'Local-First',
		shortName: 'V1',
		color: LEVEL_COLORS[1].color,
		colorRgb: LEVEL_COLORS[1].colorRgb,
		description: 'Data Processing Agreement - static legal document.',
		whatYouControl: 'Read DPA privately.',
		whatWeCantSee: 'Your business needs.',
		whatServersSee: 'Only the initial page request.',
		tradeoffs: ['Static legal content'],
		whyThisLevel: 'Enterprise legal docs, no tracking.'
	},

	// Resources - Educational content
	'/resources/privacy-guide': {
		level: 1,
		levelName: 'Local-First',
		shortName: 'V1',
		color: LEVEL_COLORS[1].color,
		colorRgb: LEVEL_COLORS[1].colorRgb,
		description: 'Privacy guide with zero tracking.',
		whatYouControl: 'Learn privacy practices privately.',
		whatWeCantSee: 'What you\'re learning or your privacy concerns.',
		whatServersSee: 'Only the initial page request.',
		tradeoffs: ['Static educational content'],
		whyThisLevel: 'Learn to protect your privacy... privately.'
	},

	'/resources/security-best-practices': {
		level: 1,
		levelName: 'Local-First',
		shortName: 'V1',
		color: LEVEL_COLORS[1].color,
		colorRgb: LEVEL_COLORS[1].colorRgb,
		description: 'Security guide with zero tracking.',
		whatYouControl: 'Learn security practices privately.',
		whatWeCantSee: 'Your security concerns.',
		whatServersSee: 'Only the initial page request.',
		tradeoffs: ['Static educational content'],
		whyThisLevel: 'Security education without surveillance.'
	},

	'/resources/comparison': {
		level: 1,
		levelName: 'Local-First',
		shortName: 'V1',
		color: LEVEL_COLORS[1].color,
		colorRgb: LEVEL_COLORS[1].colorRgb,
		description: 'VU vs Big Tech comparison - static content.',
		whatYouControl: 'Compare services privately.',
		whatWeCantSee: 'What alternatives you\'re considering.',
		whatServersSee: 'Only the initial page request.',
		tradeoffs: ['Static comparison content'],
		whyThisLevel: 'Compare your options without us knowing.'
	},

	'/resources/migration': {
		level: 1,
		levelName: 'Local-First',
		shortName: 'V1',
		color: LEVEL_COLORS[1].color,
		colorRgb: LEVEL_COLORS[1].colorRgb,
		description: 'Migration guides - static content.',
		whatYouControl: 'Plan your migration privately.',
		whatWeCantSee: 'What services you\'re migrating from.',
		whatServersSee: 'Only the initial page request.',
		tradeoffs: ['Static guide content'],
		whyThisLevel: 'Plan your escape from Big Tech without them knowing.'
	},

	'/resources/educational': {
		level: 1,
		levelName: 'Local-First',
		shortName: 'V1',
		color: LEVEL_COLORS[1].color,
		colorRgb: LEVEL_COLORS[1].colorRgb,
		description: 'Educational resources - static content.',
		whatYouControl: 'Learn at your own pace.',
		whatWeCantSee: 'Your learning progress.',
		whatServersSee: 'Only the initial page request.',
		tradeoffs: ['Static educational content'],
		whyThisLevel: 'Education without surveillance.'
	},

	// Business pages
	'/affiliate': {
		level: 3,
		levelName: 'Enhanced Privacy',
		shortName: 'V3',
		color: LEVEL_COLORS[3].color,
		colorRgb: LEVEL_COLORS[3].colorRgb,
		description: 'Affiliate program requires identity for payments.',
		whatYouControl: 'View program details privately.',
		whatWeCantSee: 'Your interest until you sign up.',
		whatServersSee: 'Referral tracking for commission calculation.',
		tradeoffs: [
			'Affiliate signup requires @vumail.app',
			'Referral links create trackable connections',
			'Payment requires some identity for tax purposes'
		],
		whyThisLevel: 'Affiliate tracking is necessary for commissions, but we minimize data collection.'
	},

	'/blog': {
		level: 1,
		levelName: 'Local-First',
		shortName: 'V1',
		color: LEVEL_COLORS[1].color,
		colorRgb: LEVEL_COLORS[1].colorRgb,
		description: 'Blog with zero tracking.',
		whatYouControl: 'Read articles privately.',
		whatWeCantSee: 'What you read, how long, or engagement.',
		whatServersSee: 'Only the initial page request.',
		tradeoffs: ['Static blog content'],
		whyThisLevel: 'Read our thoughts without us tracking yours.'
	},

	// Offline page (PWA)
	'/offline': {
		level: 0,
		levelName: 'Zero-Knowledge',
		shortName: 'V0',
		color: LEVEL_COLORS[0].color,
		colorRgb: LEVEL_COLORS[0].colorRgb,
		description: 'Completely offline - zero network activity.',
		whatYouControl: 'Everything. No network connection.',
		whatWeCantSee: 'Literally everything. You\'re offline.',
		whatServersSee: 'Nothing. You\'re not connected.',
		tradeoffs: ['Cached content only'],
		whyThisLevel: 'True zero-knowledge: we can\'t know what we can\'t connect to.'
	}
};

// Default config for unregistered pages
const DEFAULT_CONFIG: PrivacyLevelConfig = {
	level: 2,
	levelName: 'Privacy First',
	shortName: 'V2',
	color: LEVEL_COLORS[2].color,
	colorRgb: LEVEL_COLORS[2].colorRgb,
	description: 'This page follows VU privacy-first principles.',
	whatYouControl: 'Your browsing behavior stays private.',
	whatWeCantSee: 'Your personal data and behavior.',
	whatServersSee: 'Minimal data required for functionality.',
	tradeoffs: ['Standard VU privacy protections apply'],
	whyThisLevel: 'Default VU privacy level for unlisted pages.'
};

// Store for current page privacy config
export const currentPrivacyConfig = writable<PrivacyLevelConfig>(DEFAULT_CONFIG);

// Store for modal visibility
export const isPrivacyModalOpen = writable(false);

// Function to get privacy config for a path
export function getPrivacyConfigForPath(pathname: string): PrivacyLevelConfig {
	// Exact match first
	if (PAGE_PRIVACY_CONFIGS[pathname]) {
		return PAGE_PRIVACY_CONFIGS[pathname];
	}

	// Check for app detail pages
	if (pathname.startsWith('/apps/') && pathname !== '/apps') {
		return {
			level: 1,
			levelName: 'Local-First',
			shortName: 'V1',
			color: LEVEL_COLORS[1].color,
			colorRgb: LEVEL_COLORS[1].colorRgb,
			description: 'App detail page with zero tracking.',
			whatYouControl: 'Browse app details privately.',
			whatWeCantSee: 'Which apps interest you.',
			whatServersSee: 'Only the initial page request.',
			tradeoffs: ['Static app data'],
			whyThisLevel: 'Explore apps without us knowing your interests.'
		};
	}

	// Check for legal pages
	if (pathname.startsWith('/legal/')) {
		return {
			level: 1,
			levelName: 'Local-First',
			shortName: 'V1',
			color: LEVEL_COLORS[1].color,
			colorRgb: LEVEL_COLORS[1].colorRgb,
			description: 'Legal document with zero tracking.',
			whatYouControl: 'Read legal docs privately.',
			whatWeCantSee: 'Your legal concerns.',
			whatServersSee: 'Only the initial page request.',
			tradeoffs: ['Static legal content'],
			whyThisLevel: 'Legal information without surveillance.'
		};
	}

	// Check for account pages
	if (pathname.startsWith('/account/')) {
		return PAGE_PRIVACY_CONFIGS['/account'] || DEFAULT_CONFIG;
	}

	// Check for resource pages
	if (pathname.startsWith('/resources/')) {
		return {
			level: 1,
			levelName: 'Local-First',
			shortName: 'V1',
			color: LEVEL_COLORS[1].color,
			colorRgb: LEVEL_COLORS[1].colorRgb,
			description: 'Educational resource with zero tracking.',
			whatYouControl: 'Learn privately.',
			whatWeCantSee: 'Your learning interests.',
			whatServersSee: 'Only the initial page request.',
			tradeoffs: ['Static educational content'],
			whyThisLevel: 'Education without surveillance.'
		};
	}

	// Check for developer pages
	if (pathname.startsWith('/developers/')) {
		return PAGE_PRIVACY_CONFIGS['/developers'] || DEFAULT_CONFIG;
	}

	return DEFAULT_CONFIG;
}

// Function to update current config based on path
export function updatePrivacyConfigForPath(pathname: string) {
	const config = getPrivacyConfigForPath(pathname);
	currentPrivacyConfig.set(config);
}

// Function to open the privacy modal
export function openPrivacyModal() {
	isPrivacyModalOpen.set(true);
}

// Function to close the privacy modal
export function closePrivacyModal() {
	isPrivacyModalOpen.set(false);
}

// Function to toggle the privacy modal
export function togglePrivacyModal() {
	isPrivacyModalOpen.update(v => !v);
}

