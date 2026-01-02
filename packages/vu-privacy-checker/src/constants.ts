/**
 * VU Privacy Checker - Constants
 * 
 * @description Privacy level definitions, colors, and brutally honest descriptions.
 * This is the source of truth for VU Privacy levels across all applications.
 * 
 * @author VU Labs
 * @license MIT
 * @version 1.0.0
 */

import type { VuPrivacyLevel, LevelColor, PrivacyLevelConfig } from './types';

/**
 * Color scheme for each privacy level
 * 
 * Philosophy: Lower number = Better privacy = Cooler colors
 * - Level 4 (Basic) = Red (Warning, entry level)
 * - Level 3 (Enhanced) = Orange (Better, but room for improvement)
 * - Level 2 (Privacy First) = Yellow (Good, approaching excellence)
 * - Level 1 (Local-First) = Green (Excellent, data stays local)
 * - Level 0 (Zero-Knowledge) = Blue (Ultimate, true privacy)
 * - SubZero = Black/White (Beyond, counter-surveillance)
 * - Level 5 = Gray (NOT VU STANDARD - conventional "privacy")
 */
export const LEVEL_COLORS: Record<VuPrivacyLevel, LevelColor> = {
  5: { 
    color: '#6b7280', 
    colorRgb: '107, 116, 128',
    colorDark: '#4b5563'
  }, // Gray - NOT VU STANDARD
  4: { 
    color: '#ef4444', 
    colorRgb: '239, 68, 68',
    colorDark: '#dc2626'
  }, // Red - Basic
  3: { 
    color: '#f97316', 
    colorRgb: '249, 115, 22',
    colorDark: '#ea580c'
  }, // Orange - Enhanced
  2: { 
    color: '#eab308', 
    colorRgb: '234, 179, 8',
    colorDark: '#ca8a04'
  }, // Yellow - Privacy First
  1: { 
    color: '#22c55e', 
    colorRgb: '34, 197, 94',
    colorDark: '#16a34a'
  }, // Green - Local-First
  0: { 
    color: '#3b82f6', 
    colorRgb: '59, 130, 246',
    colorDark: '#2563eb'
  }, // Blue - Zero-Knowledge
  subzero: { 
    color: '#ffffff', 
    colorRgb: '255, 255, 255',
    colorDark: '#000000'
  } // Black/White - SubZero
};

/**
 * Human-readable names for each privacy level
 */
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
 * Short badge display names
 */
export const LEVEL_SHORT_NAMES: Record<VuPrivacyLevel, string> = {
  5: 'V5',
  4: 'V4',
  3: 'V3',
  2: 'V2',
  1: 'V1',
  0: 'V0',
  subzero: '∅'
};

/**
 * Brutally honest taglines for each level
 */
export const LEVEL_TAGLINES: Record<VuPrivacyLevel, string> = {
  5: 'NOT VU STANDARD - What Big Tech calls "privacy"',
  4: 'The bare minimum - Encrypted transit, basic protections',
  3: 'Better than most - End-to-end encryption enabled',
  2: 'Architected for privacy - Zero data need design',
  1: 'Your device, your data - Nothing leaves without permission',
  0: 'True privacy achieved - Zero-knowledge architecture',
  subzero: 'Beyond zero - Active counter-surveillance'
};

/**
 * Detailed descriptions for each level
 */
export const LEVEL_DESCRIPTIONS: Record<VuPrivacyLevel, string> = {
  5: `This level represents what most apps falsely claim as "privacy." Data is collected, stored on servers, and often shared with third parties. Encryption may exist but the service has full access to your data. This is NOT acceptable for VU applications.`,
  
  4: `Basic Privacy is the minimum VU standard. Your data is encrypted in transit (HTTPS), and we implement basic privacy protections. However, some data processing may occur server-side. This level is for services that genuinely need server processing to function.`,
  
  3: `Enhanced Privacy means end-to-end encryption is standard. Your data is encrypted before leaving your device, and only you have the keys. We minimize metadata collection and never sell or share your information with third parties.`,
  
  2: `Privacy First Architecture means the app was designed from the ground up to not need your data. We use techniques like federated learning, differential privacy, and local computation. Servers see only what's absolutely necessary.`,
  
  1: `Local-First Computing means all processing happens on your device. Your data never leaves unless you explicitly choose to sync. Even then, it's encrypted with keys only you possess. We verify entitlements, not behavior.`,
  
  0: `True Zero-Knowledge means we cannot know anything about you even if we wanted to. Peer-to-peer architecture, complete anonymity, cryptographic guarantees. Not even a court order can reveal what we don't have.`,
  
  subzero: `SubZero is invitation-only. Active counter-surveillance, polymorphic encryption, steganographic channels. If you know what this means, you might qualify. If not, Level 0 is still better than 99.9% of apps.`
};

/**
 * What users control at each level
 */
export const LEVEL_USER_CONTROL: Record<VuPrivacyLevel, string[]> = {
  5: ['Cookie preferences (usually ignored)', 'Marketing email opt-out (eventually)'],
  4: ['Privacy settings', 'Data export', 'Account deletion'],
  3: ['Encryption keys', 'Sharing permissions', 'Complete data export', 'True account deletion'],
  2: ['All data processing', 'What leaves device', 'Selective sync', 'Local-only mode'],
  1: ['Everything', 'All data stays local by default', 'Sync is opt-in per item'],
  0: ['Complete anonymity', 'Peer connections', 'Zero server dependency'],
  subzero: ['Beyond your imagination', 'Active countermeasures', 'Plausible deniability']
};

/**
 * What the service CAN'T see at each level
 */
export const LEVEL_CANT_SEE: Record<VuPrivacyLevel, string[]> = {
  5: ['Maybe your password (hopefully)'],
  4: ['Password (hashed)', 'Some sensitive fields'],
  3: ['Content of your data', 'Who you communicate with (minimized)'],
  2: ['Most of your data', 'Usage patterns', 'Behavioral data'],
  1: ['Any of your actual data', 'Your behavior', 'Your preferences'],
  0: ['Anything', 'Your identity', 'Your existence on the platform'],
  subzero: ['Not even that you exist', 'Traffic patterns', 'Metadata']
};

/**
 * What servers CAN see at each level
 */
export const LEVEL_SERVER_SEES: Record<VuPrivacyLevel, string[]> = {
  5: ['Everything', 'Your data', 'Your behavior', 'Your social graph', 'Your location'],
  4: ['Account info', 'Usage metrics', 'Some behavioral data', 'IP addresses'],
  3: ['Encrypted blobs', 'Metadata (minimized)', 'Account existence'],
  2: ['Almost nothing', 'Encrypted sync data only if you enable it'],
  1: ['Authentication tokens only', 'No content, no behavior'],
  0: ['Nothing', 'No accounts', 'No tokens', 'No evidence you exist'],
  subzero: ['Decoy data', 'Noise', 'False patterns']
};

/**
 * Honest tradeoffs at each level
 */
export const LEVEL_TRADEOFFS: Record<VuPrivacyLevel, string[]> = {
  5: [
    'Convenient but privacy-destroying',
    'Free tier subsidized by your data',
    'Terms of service nobody reads allow anything'
  ],
  4: [
    'Some features require server processing',
    'Basic telemetry for stability (opt-out available)',
    'Account required for core functionality'
  ],
  3: [
    'Key management complexity',
    'Recovery options limited for security',
    'Some features unavailable without account'
  ],
  2: [
    'May be slower than cloud-native alternatives',
    'Large datasets require local storage',
    'Sync between devices is manual or delayed'
  ],
  1: [
    'No cloud backup (by design)',
    'Device loss = data loss without local backup',
    'Collaboration features are limited'
  ],
  0: [
    'Technical complexity for users',
    'No password recovery possible',
    'May be illegal in some jurisdictions'
  ],
  subzero: [
    'You probably don\'t qualify',
    'Requires operational security knowledge',
    'Invitation only - no applications accepted'
  ]
};

/**
 * Example apps/services at each level
 */
export const LEVEL_EXAMPLES: Record<VuPrivacyLevel, string[]> = {
  5: ['Google Services', 'Facebook Apps', 'Most "free" apps'],
  4: ['Basic Note Apps', 'Simple Calculators', 'Weather Widgets'],
  3: ['Encrypted Messengers', 'Secure Email Clients', 'Private Cloud Storage'],
  2: ['VuNotes', 'VuTask', 'Privacy-Preserving Analytics'],
  1: ['VuVault', 'Local AI Assistants', 'Offline-First Databases'],
  0: ['VuChat', 'VuWallet', 'VuHealth', 'VuCalendar'],
  subzero: ['[REDACTED]', '[CLASSIFIED]', 'The VU']
};

/**
 * Quality labels for each level
 */
export const LEVEL_QUALITY: Record<VuPrivacyLevel, { label: string; class: string }> = {
  5: { label: 'NOT VU STANDARD', class: 'quality-notvu' },
  4: { label: 'Basic - Minimum VU Standard', class: 'quality-basic' },
  3: { label: 'Good - Enhanced Privacy', class: 'quality-good' },
  2: { label: 'Very Good - Privacy First', class: 'quality-verygood' },
  1: { label: 'Excellent - Local-First', class: 'quality-excellent' },
  0: { label: 'Best - True Zero-Knowledge', class: 'quality-best' },
  subzero: { label: 'Beyond - Counter-Surveillance', class: 'quality-subzero' }
};

/**
 * Privacy score ranges for each level
 * Higher score = more private
 */
export const LEVEL_SCORE_RANGES: Record<VuPrivacyLevel, { min: number; max: number }> = {
  5: { min: 0, max: 29 },
  4: { min: 30, max: 49 },
  3: { min: 50, max: 64 },
  2: { min: 65, max: 79 },
  1: { min: 80, max: 94 },
  0: { min: 95, max: 99 },
  subzero: { min: 100, max: 100 }
};

/**
 * Default privacy configuration for unknown routes
 */
export const DEFAULT_PRIVACY_CONFIG: PrivacyLevelConfig = {
  level: 2,
  levelName: LEVEL_NAMES[2],
  shortName: LEVEL_SHORT_NAMES[2],
  color: LEVEL_COLORS[2].color,
  colorRgb: LEVEL_COLORS[2].colorRgb,
  description: 'This page follows VU privacy-first principles.',
  whatYouControl: 'Your browsing behavior stays private.',
  whatWeCantSee: 'Your personal data and behavior.',
  whatServersSee: 'Minimal data required for functionality.',
  tradeoffs: ['Standard VU privacy protections apply'],
  whyThisLevel: 'Default VU privacy level for pages not explicitly configured.'
};

/**
 * CSS class mappings for styling
 */
export const LEVEL_CSS_CLASSES: Record<VuPrivacyLevel, string> = {
  5: 'vu-level-5 vu-level-notvu',
  4: 'vu-level-4 vu-level-basic',
  3: 'vu-level-3 vu-level-enhanced',
  2: 'vu-level-2 vu-level-privacy-first',
  1: 'vu-level-1 vu-level-local-first',
  0: 'vu-level-0 vu-level-zero-knowledge',
  subzero: 'vu-level-subzero'
};

/**
 * Emoji indicators for quick visual reference
 */
export const LEVEL_EMOJIS: Record<VuPrivacyLevel, string> = {
  5: '⚠️',
  4: '🔴',
  3: '🟠',
  2: '🟡',
  1: '🟢',
  0: '🔵',
  subzero: '⚫'
};

/**
 * Privacy score weights for different assessment categories
 */
export const ASSESSMENT_WEIGHTS = {
  dataCollection: 15,
  dataStorage: 15,
  networkPrivacy: 15,
  thirdPartySharing: 15,
  userControl: 10,
  transparency: 10,
  encryption: 15,
  offlineCapability: 5
} as const;

/**
 * Penalty points for various privacy violations
 */
export const PRIVACY_PENALTIES = {
  // Data Collection
  collectsEmail: -5,
  collectsPhone: -10,
  collectsName: -3,
  collectsLocation: -15,
  collectsBiometrics: -20,
  collectsHealthData: -25,
  collectsFinancialData: -20,
  collectsBrowsingHistory: -15,
  collectsContacts: -15,
  
  // Third Parties
  usesGoogleAnalytics: -20,
  usesFacebookPixel: -25,
  usesThirdPartyAds: -30,
  sharesDataWithThirdParties: -25,
  
  // Architecture
  requiresAccount: -5,
  requiresRealIdentity: -15,
  noOfflineMode: -10,
  serverCanReadData: -20,
  
  // Transparency
  noPrivacyPolicy: -30,
  closedSource: -10,
  neverAudited: -5
} as const;

/**
 * Bonus points for privacy-positive features
 */
export const PRIVACY_BONUSES = {
  // Architecture
  localOnly: 30,
  localFirst: 20,
  peerToPeer: 25,
  federatedArchitecture: 15,
  
  // Encryption
  endToEndEncryption: 20,
  zeroKnowledgeEncryption: 30,
  homomorphicEncryption: 25,
  
  // Special Features
  usesZeroKnowledgeProofs: 20,
  usesDifferentialPrivacy: 15,
  usesFederatedLearning: 15,
  usesOnionRouting: 20,
  
  // Transparency
  openSource: 15,
  independentlyAudited: 20,
  clearPrivacyPolicy: 10,
  
  // User Control
  dataExportAvailable: 5,
  trueAccountDeletion: 10,
  pseudonymousAllowed: 10,
  anonymousAllowed: 15,
  
  // Offline
  fullOfflineCapability: 15,
  partialOfflineCapability: 5
} as const;

