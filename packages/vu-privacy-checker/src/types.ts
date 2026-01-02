/**
 * VU Privacy Checker - Type Definitions
 * 
 * @description Brutally honest privacy level type system for VU applications.
 * Lower numbers = Better privacy. Zero = True Zero-Knowledge.
 * 
 * @author VU Labs
 * @license MIT
 * @version 1.0.0
 */

/**
 * VU Privacy Level Scale (0-4 + SubZero)
 * 
 * Lower is BETTER:
 * - 4: Basic Privacy - Encrypted transit, basic protections (RED)
 * - 3: Enhanced Privacy - End-to-end encryption, minimal metadata (ORANGE)
 * - 2: Privacy First - Zero data need design, federated/differential privacy (YELLOW)
 * - 1: Local-First - All computation local, data never leaves device (GREEN)
 * - 0: True Zero-Knowledge - Peer-to-peer, complete anonymity (BLUE)
 * - subzero: Beyond zero-knowledge - Invitation only, counter-surveillance (BLACK/WHITE)
 * 
 * Level 5 exists but is NOT VU STANDARD - used to show what "conventional privacy" really means
 */
export type VuPrivacyLevel = 0 | 1 | 2 | 3 | 4 | 5 | 'subzero';

/**
 * Privacy level color configuration
 */
export interface LevelColor {
  /** Hex color code */
  color: string;
  /** RGB values as comma-separated string for CSS rgba() */
  colorRgb: string;
  /** Dark mode variant */
  colorDark: string;
}

/**
 * Complete privacy configuration for a route/service/app
 */
export interface PrivacyLevelConfig {
  /** Privacy level (0-4, 5 for non-VU, 'subzero' for beyond) */
  level: VuPrivacyLevel;
  /** Human-readable level name */
  levelName: string;
  /** Short badge display (V0, V1, V2, V3, V4, ∅) */
  shortName: string;
  /** Level color (hex) */
  color: string;
  /** RGB values for CSS */
  colorRgb: string;
  /** Brutally honest description of privacy state */
  description: string;
  /** What the user controls */
  whatYouControl: string;
  /** What the service cannot see */
  whatWeCantSee: string;
  /** What servers can potentially see */
  whatServersSee: string;
  /** Honest tradeoffs of this level */
  tradeoffs: string[];
  /** Explanation for why this level was assigned */
  whyThisLevel: string;
}

/**
 * Privacy analysis result for an app or service
 */
export interface PrivacyAnalysis {
  /** Calculated privacy level */
  level: VuPrivacyLevel;
  /** Overall score (0-100, higher is more private) */
  score: number;
  /** Detailed breakdown by category */
  breakdown: PrivacyBreakdown;
  /** Red flags that lower the score */
  redFlags: RedFlag[];
  /** Green flags that improve trust */
  greenFlags: GreenFlag[];
  /** Recommendations for improvement */
  recommendations: string[];
  /** Raw assessment data */
  assessment: PrivacyAssessment;
  /** Timestamp of analysis */
  analyzedAt: Date;
}

/**
 * Privacy breakdown by category
 */
export interface PrivacyBreakdown {
  /** Data collection practices (0-100) */
  dataCollection: number;
  /** Data storage security (0-100) */
  dataStorage: number;
  /** Network privacy (0-100) */
  networkPrivacy: number;
  /** Third-party sharing (0-100) */
  thirdPartySharing: number;
  /** User control (0-100) */
  userControl: number;
  /** Transparency (0-100) */
  transparency: number;
  /** Encryption strength (0-100) */
  encryption: number;
  /** Offline capability (0-100) */
  offlineCapability: number;
}

/**
 * Red flag indicating privacy concern
 */
export interface RedFlag {
  /** Severity: critical, high, medium, low */
  severity: 'critical' | 'high' | 'medium' | 'low';
  /** Category affected */
  category: keyof PrivacyBreakdown;
  /** Description of the issue */
  description: string;
  /** Points deducted */
  impact: number;
  /** How to fix this */
  remediation?: string;
}

/**
 * Green flag indicating privacy strength
 */
export interface GreenFlag {
  /** Category */
  category: keyof PrivacyBreakdown;
  /** Description of the strength */
  description: string;
  /** Points added */
  impact: number;
}

/**
 * Raw privacy assessment input
 */
export interface PrivacyAssessment {
  // Data Collection
  /** Does the app collect any user data? */
  collectsUserData: boolean;
  /** Types of data collected */
  dataTypesCollected: DataType[];
  /** Is data collection optional? */
  dataCollectionOptional: boolean;
  /** Can user delete their data? */
  canDeleteData: boolean;
  
  // Network & Storage
  /** Does data leave the device? */
  dataLeavesDevice: boolean;
  /** Type of encryption used */
  encryptionType: EncryptionType;
  /** Is data encrypted at rest? */
  encryptedAtRest: boolean;
  /** Is data encrypted in transit? */
  encryptedInTransit: boolean;
  /** Does the service have access to unencrypted data? */
  serviceCanReadData: boolean;
  
  // Third Parties
  /** Third-party services used */
  thirdPartyServices: ThirdPartyService[];
  /** Does the app use analytics? */
  usesAnalytics: boolean;
  /** Type of analytics */
  analyticsType?: AnalyticsType;
  /** Does the app use advertising? */
  usesAdvertising: boolean;
  
  // Architecture
  /** Application architecture type */
  architecture: ArchitectureType;
  /** Can app function offline? */
  worksOffline: boolean;
  /** Offline functionality percentage (0-100) */
  offlineCapability: number;
  
  // Authentication & Identity
  /** Authentication method */
  authMethod: AuthMethod;
  /** Does login require real identity? */
  requiresRealIdentity: boolean;
  /** Can use pseudonymous accounts? */
  allowsPseudonymous: boolean;
  
  // Transparency
  /** Is source code open? */
  openSource: boolean;
  /** Has been independently audited? */
  independentlyAudited: boolean;
  /** Privacy policy clarity (0-100) */
  privacyPolicyClarity: number;
  /** Are data practices documented? */
  dataPracticesDocumented: boolean;
  
  // Special Features
  /** Uses zero-knowledge proofs? */
  usesZeroKnowledgeProofs: boolean;
  /** Uses federated learning? */
  usesFederatedLearning: boolean;
  /** Uses differential privacy? */
  usesDifferentialPrivacy: boolean;
  /** Is peer-to-peer? */
  isPeerToPeer: boolean;
  /** Uses onion routing/Tor? */
  usesOnionRouting: boolean;
}

/**
 * Types of data that can be collected
 */
export type DataType = 
  | 'email'
  | 'phone'
  | 'name'
  | 'address'
  | 'payment'
  | 'location'
  | 'contacts'
  | 'photos'
  | 'files'
  | 'messages'
  | 'browsing_history'
  | 'search_history'
  | 'device_info'
  | 'ip_address'
  | 'usage_patterns'
  | 'biometrics'
  | 'health_data'
  | 'financial_data'
  | 'social_connections'
  | 'voice_recordings'
  | 'none';

/**
 * Encryption types
 */
export type EncryptionType = 
  | 'none'
  | 'transit_only'
  | 'at_rest'
  | 'end_to_end'
  | 'zero_knowledge'
  | 'homomorphic'
  | 'polymorphic';

/**
 * Third-party service categories
 */
export interface ThirdPartyService {
  name: string;
  category: 'analytics' | 'advertising' | 'payment' | 'auth' | 'cdn' | 'storage' | 'email' | 'other';
  privacyImpact: 'high' | 'medium' | 'low';
  dataShared: DataType[];
}

/**
 * Analytics types
 */
export type AnalyticsType = 
  | 'none'
  | 'privacy_preserving'
  | 'aggregated_only'
  | 'self_hosted'
  | 'third_party_minimal'
  | 'third_party_full'
  | 'google_analytics'
  | 'facebook_pixel';

/**
 * Architecture types
 */
export type ArchitectureType = 
  | 'local_only'
  | 'local_first'
  | 'peer_to_peer'
  | 'federated'
  | 'client_server'
  | 'cloud_native'
  | 'hybrid';

/**
 * Authentication methods
 */
export type AuthMethod = 
  | 'none'
  | 'anonymous'
  | 'pseudonymous'
  | 'email'
  | 'phone'
  | 'oauth_privacy_friendly'
  | 'oauth_big_tech'
  | 'biometric_local'
  | 'biometric_cloud'
  | 'passkey'
  | 'hardware_key';

/**
 * Configuration for initializing the privacy checker
 */
export interface VuPrivacyCheckerConfig {
  /** Custom route privacy configurations */
  routes?: Record<string, PrivacyLevelConfig>;
  /** Default level for unregistered routes */
  defaultLevel?: VuPrivacyLevel;
  /** Custom level names */
  customLevelNames?: Partial<Record<VuPrivacyLevel, string>>;
  /** Custom level colors */
  customColors?: Partial<Record<VuPrivacyLevel, LevelColor>>;
  /** Enable strict mode (lower scores for same issues) */
  strictMode?: boolean;
  /** App name for reporting */
  appName?: string;
  /** App version for reporting */
  appVersion?: string;
}

/**
 * Privacy badge display options
 */
export interface BadgeOptions {
  /** Show full level name */
  showName?: boolean;
  /** Show color indicator */
  showColor?: boolean;
  /** Size: sm, md, lg */
  size?: 'sm' | 'md' | 'lg';
  /** Enable click for details */
  clickable?: boolean;
  /** Position: fixed or inline */
  position?: 'fixed' | 'inline';
  /** Fixed position location */
  fixedPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

/**
 * Event emitted when privacy level changes
 */
export interface PrivacyLevelChangeEvent {
  previousLevel: VuPrivacyLevel | null;
  currentLevel: VuPrivacyLevel;
  path: string;
  config: PrivacyLevelConfig;
  timestamp: Date;
}

/**
 * Callback for privacy level changes
 */
export type PrivacyLevelChangeCallback = (event: PrivacyLevelChangeEvent) => void;

