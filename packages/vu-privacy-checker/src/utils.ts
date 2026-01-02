/**
 * VU Privacy Checker - Utility Functions
 * 
 * @description Helper functions for privacy checking operations.
 * 
 * @author VU Labs
 * @license MIT
 * @version 1.0.0
 */

import type { VuPrivacyLevel, PrivacyLevelConfig, PrivacyAssessment } from './types';
import { LEVEL_COLORS, LEVEL_NAMES, LEVEL_SHORT_NAMES, LEVEL_EMOJIS, LEVEL_QUALITY } from './constants';

/**
 * Format a privacy level for display
 */
export function formatLevel(level: VuPrivacyLevel): string {
  if (level === 'subzero') return 'SubZero';
  return `Level ${level}`;
}

/**
 * Get display string for level (e.g., "V0", "V1", "∅")
 */
export function getLevelDisplay(level: VuPrivacyLevel): string {
  return LEVEL_SHORT_NAMES[level];
}

/**
 * Get emoji for level
 */
export function getLevelEmoji(level: VuPrivacyLevel): string {
  return LEVEL_EMOJIS[level];
}

/**
 * Get level color (hex)
 */
export function getLevelColor(level: VuPrivacyLevel): string {
  return LEVEL_COLORS[level].color;
}

/**
 * Get level color RGB values
 */
export function getLevelColorRgb(level: VuPrivacyLevel): string {
  return LEVEL_COLORS[level].colorRgb;
}

/**
 * Get human-readable level name
 */
export function getLevelName(level: VuPrivacyLevel): string {
  return LEVEL_NAMES[level];
}

/**
 * Get quality label for level
 */
export function getLevelQuality(level: VuPrivacyLevel): { label: string; class: string } {
  return LEVEL_QUALITY[level];
}

/**
 * Check if level is SubZero
 */
export function isSubZero(level: VuPrivacyLevel): boolean {
  return level === 'subzero';
}

/**
 * Check if level meets VU standards (level 4 or better)
 */
export function isVuCompliant(level: VuPrivacyLevel): boolean {
  if (level === 'subzero') return true;
  return typeof level === 'number' && level <= 4;
}

/**
 * Check if level is privacy-excellent (level 1 or better)
 */
export function isExcellent(level: VuPrivacyLevel): boolean {
  if (level === 'subzero') return true;
  return typeof level === 'number' && level <= 1;
}

/**
 * Compare two privacy levels
 * Returns: positive if a is better, negative if b is better, 0 if equal
 */
export function compareLevels(a: VuPrivacyLevel, b: VuPrivacyLevel): number {
  const scoreA = levelToScore(a);
  const scoreB = levelToScore(b);
  return scoreA - scoreB;
}

/**
 * Convert level to numeric score (0-100, higher is better)
 */
export function levelToScore(level: VuPrivacyLevel): number {
  if (level === 'subzero') return 100;
  // Invert because lower level number = better privacy
  return Math.round((5 - level) * 20);
}

/**
 * Convert score to level
 */
export function scoreToLevel(score: number): VuPrivacyLevel {
  if (score >= 100) return 'subzero';
  if (score >= 95) return 0;
  if (score >= 80) return 1;
  if (score >= 65) return 2;
  if (score >= 50) return 3;
  if (score >= 30) return 4;
  return 5;
}

/**
 * Get all levels in order (best to worst)
 */
export function getAllLevels(): VuPrivacyLevel[] {
  return ['subzero', 0, 1, 2, 3, 4, 5];
}

/**
 * Get VU-compliant levels only (best to worst)
 */
export function getVuLevels(): VuPrivacyLevel[] {
  return ['subzero', 0, 1, 2, 3, 4];
}

/**
 * Generate CSS variables string for a level
 */
export function generateCssVariables(level: VuPrivacyLevel): string {
  const color = LEVEL_COLORS[level];
  return `
    --vu-level: ${level === 'subzero' ? '"subzero"' : level};
    --vu-level-color: ${color.color};
    --vu-level-color-rgb: ${color.colorRgb};
    --vu-level-color-dark: ${color.colorDark};
  `.trim().replace(/\n\s+/g, ' ');
}

/**
 * Generate inline style object for a level
 */
export function generateStyleObject(level: VuPrivacyLevel): Record<string, string> {
  const color = LEVEL_COLORS[level];
  return {
    '--vu-level': level === 'subzero' ? 'subzero' : level.toString(),
    '--vu-level-color': color.color,
    '--vu-level-color-rgb': color.colorRgb,
    '--vu-level-color-dark': color.colorDark
  };
}

/**
 * Generate a brief summary for a privacy config
 */
export function generateBriefSummary(config: PrivacyLevelConfig): string {
  const emoji = getLevelEmoji(config.level);
  const name = config.levelName;
  return `${emoji} ${name}: ${config.description}`;
}

/**
 * Create a minimal assessment for quick checks
 */
export function createMinimalAssessment(overrides: Partial<PrivacyAssessment>): PrivacyAssessment {
  return {
    collectsUserData: false,
    dataTypesCollected: [],
    dataCollectionOptional: true,
    canDeleteData: true,
    dataLeavesDevice: false,
    encryptionType: 'end_to_end',
    encryptedAtRest: true,
    encryptedInTransit: true,
    serviceCanReadData: false,
    thirdPartyServices: [],
    usesAnalytics: false,
    usesAdvertising: false,
    architecture: 'local_first',
    worksOffline: true,
    offlineCapability: 100,
    authMethod: 'anonymous',
    requiresRealIdentity: false,
    allowsPseudonymous: true,
    openSource: true,
    independentlyAudited: false,
    privacyPolicyClarity: 80,
    dataPracticesDocumented: true,
    usesZeroKnowledgeProofs: false,
    usesFederatedLearning: false,
    usesDifferentialPrivacy: false,
    isPeerToPeer: false,
    usesOnionRouting: false,
    ...overrides
  };
}

/**
 * Validate a privacy level value
 */
export function isValidLevel(value: unknown): value is VuPrivacyLevel {
  if (value === 'subzero') return true;
  if (typeof value === 'number') {
    return value >= 0 && value <= 5 && Number.isInteger(value);
  }
  return false;
}

/**
 * Parse a level from string input
 */
export function parseLevel(input: string): VuPrivacyLevel | null {
  const lower = input.toLowerCase().trim();
  
  if (lower === 'subzero' || lower === 'sub-zero' || lower === 'sub zero') {
    return 'subzero';
  }
  
  // Try to parse as number
  const num = parseInt(lower.replace(/[^0-9]/g, ''), 10);
  if (!isNaN(num) && num >= 0 && num <= 5) {
    return num as VuPrivacyLevel;
  }
  
  // Try matching level names
  for (const [level, name] of Object.entries(LEVEL_NAMES)) {
    if (name.toLowerCase().includes(lower)) {
      return level === 'subzero' ? 'subzero' : (parseInt(level) as VuPrivacyLevel);
    }
  }
  
  return null;
}

/**
 * Format timestamp for reports
 */
export function formatTimestamp(date: Date): string {
  return date.toISOString().replace('T', ' ').split('.')[0] + ' UTC';
}

/**
 * Deep clone a config object
 */
export function cloneConfig<T extends object>(config: T): T {
  return JSON.parse(JSON.stringify(config));
}

/**
 * Merge partial config with defaults
 */
export function mergeConfig<T extends object>(defaults: T, partial: Partial<T>): T {
  return { ...defaults, ...partial };
}

/**
 * Generate a unique ID for tracking
 */
export function generateId(): string {
  return `vu-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Debounce function for UI updates
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return function (this: unknown, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      func.apply(this, args);
      timeoutId = null;
    }, wait);
  };
}

/**
 * Throttle function for performance
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

