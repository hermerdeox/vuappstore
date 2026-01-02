/**
 * @vu/privacy-checker
 * 
 * Brutally Honest Privacy Level Checker for VU Applications
 * 
 * @description Framework-agnostic privacy assessment and level checking.
 * Zero compromise on honesty. Zero tolerance for privacy theater.
 * 
 * VU Privacy Levels (0-4 + SubZero):
 * - Level 4: Basic Privacy - Minimum VU standard
 * - Level 3: Enhanced Privacy - End-to-end encryption
 * - Level 2: Privacy First - Zero data need design
 * - Level 1: Local-First - Data never leaves device
 * - Level 0: Zero-Knowledge - True privacy achieved
 * - SubZero: Beyond - Counter-surveillance enabled
 * 
 * @example
 * ```typescript
 * import { VuPrivacyChecker, VuPrivacyAnalyzer } from '@vu/privacy-checker';
 * 
 * // Route-based privacy checking
 * const checker = new VuPrivacyChecker({
 *   routes: {
 *     '/': { level: 1 },
 *     '/account': { level: 2 }
 *   }
 * });
 * 
 * const config = checker.getConfigForPath('/account');
 * console.log(config.levelName); // "Privacy First"
 * 
 * // App/service analysis
 * const analyzer = new VuPrivacyAnalyzer();
 * const analysis = analyzer.analyze({
 *   collectsUserData: true,
 *   encryptionType: 'end_to_end',
 *   // ... more assessment data
 * });
 * 
 * console.log(analysis.level); // 3
 * console.log(analysis.score); // 58
 * ```
 * 
 * @author VU Labs
 * @license MIT
 * @version 1.0.0
 */

// ============================================================================
// Types
// ============================================================================

export type {
  // Core types
  VuPrivacyLevel,
  LevelColor,
  PrivacyLevelConfig,
  
  // Analysis types
  PrivacyAnalysis,
  PrivacyAssessment,
  PrivacyBreakdown,
  RedFlag,
  GreenFlag,
  
  // Data types
  DataType,
  EncryptionType,
  ThirdPartyService,
  AnalyticsType,
  ArchitectureType,
  AuthMethod,
  
  // Configuration types
  VuPrivacyCheckerConfig,
  BadgeOptions,
  
  // Event types
  PrivacyLevelChangeEvent,
  PrivacyLevelChangeCallback
} from './types';

// ============================================================================
// Constants
// ============================================================================

export {
  // Colors and names
  LEVEL_COLORS,
  LEVEL_NAMES,
  LEVEL_SHORT_NAMES,
  LEVEL_TAGLINES,
  LEVEL_DESCRIPTIONS,
  
  // Details
  LEVEL_USER_CONTROL,
  LEVEL_CANT_SEE,
  LEVEL_SERVER_SEES,
  LEVEL_TRADEOFFS,
  LEVEL_EXAMPLES,
  
  // Quality and scoring
  LEVEL_QUALITY,
  LEVEL_SCORE_RANGES,
  
  // Visual
  LEVEL_CSS_CLASSES,
  LEVEL_EMOJIS,
  
  // Defaults
  DEFAULT_PRIVACY_CONFIG,
  
  // Scoring weights
  ASSESSMENT_WEIGHTS,
  PRIVACY_PENALTIES,
  PRIVACY_BONUSES
} from './constants';

// ============================================================================
// Core Classes
// ============================================================================

export {
  VuPrivacyChecker,
  createPrivacyChecker,
  getLevelInfo,
  isVuCompliant,
  getAllLevels,
  getVuLevels
} from './core';

// ============================================================================
// Analyzer
// ============================================================================

export {
  VuPrivacyAnalyzer,
  createPrivacyAnalyzer,
  analyzePrivacy,
  getBrutalVerdict
} from './analyzer';

// ============================================================================
// Utilities
// ============================================================================

export {
  // Level utilities
  formatLevel,
  getLevelDisplay,
  getLevelEmoji,
  getLevelColor,
  getLevelColorRgb,
  getLevelName,
  getLevelQuality,
  
  // Level checks
  isSubZero,
  isExcellent,
  compareLevels,
  levelToScore,
  scoreToLevel,
  isValidLevel,
  parseLevel,
  
  // Style generation
  generateCssVariables,
  generateStyleObject,
  
  // Config helpers
  generateBriefSummary,
  createMinimalAssessment,
  cloneConfig,
  mergeConfig,
  
  // General utilities
  formatTimestamp,
  generateId,
  debounce,
  throttle
} from './utils';

// ============================================================================
// Default Export
// ============================================================================

import { VuPrivacyChecker } from './core';
import { VuPrivacyAnalyzer } from './analyzer';

/**
 * Default export - main classes for convenience
 */
export default {
  VuPrivacyChecker,
  VuPrivacyAnalyzer
};

// ============================================================================
// Version
// ============================================================================

/**
 * Package version
 */
export const VERSION = '1.0.0';

/**
 * Package name
 */
export const PACKAGE_NAME = '@vu/privacy-checker';

