/**
 * VU Privacy Checker - Core Logic
 * 
 * @description Framework-agnostic privacy level checker for VU applications.
 * Provides route-based privacy configuration and level management.
 * 
 * @author VU Labs
 * @license MIT
 * @version 1.0.0
 */

import type {
  VuPrivacyLevel,
  PrivacyLevelConfig,
  VuPrivacyCheckerConfig,
  PrivacyLevelChangeEvent,
  PrivacyLevelChangeCallback,
  LevelColor
} from './types';

import {
  LEVEL_COLORS,
  LEVEL_NAMES,
  LEVEL_SHORT_NAMES,
  LEVEL_DESCRIPTIONS,
  LEVEL_USER_CONTROL,
  LEVEL_CANT_SEE,
  LEVEL_SERVER_SEES,
  LEVEL_TRADEOFFS,
  LEVEL_QUALITY,
  LEVEL_EMOJIS,
  LEVEL_CSS_CLASSES,
  DEFAULT_PRIVACY_CONFIG
} from './constants';

/**
 * VuPrivacyChecker - Main class for privacy level checking
 * 
 * @example
 * ```typescript
 * const checker = new VuPrivacyChecker({
 *   routes: {
 *     '/': { level: 1, ... },
 *     '/account': { level: 2, ... }
 *   },
 *   defaultLevel: 2
 * });
 * 
 * const config = checker.getConfigForPath('/account/settings');
 * console.log(config.level); // 2
 * console.log(config.levelName); // "Privacy First"
 * ```
 */
export class VuPrivacyChecker {
  private routes: Map<string, PrivacyLevelConfig>;
  private defaultLevel: VuPrivacyLevel;
  private levelColors: Record<VuPrivacyLevel, LevelColor>;
  private levelNames: Record<VuPrivacyLevel, string>;
  private currentConfig: PrivacyLevelConfig;
  private previousLevel: VuPrivacyLevel | null = null;
  private listeners: Set<PrivacyLevelChangeCallback>;
  private appName: string;
  private appVersion: string;
  private strictMode: boolean;

  constructor(config: VuPrivacyCheckerConfig = {}) {
    this.routes = new Map();
    this.defaultLevel = config.defaultLevel ?? 2;
    this.levelColors = { ...LEVEL_COLORS, ...config.customColors };
    this.levelNames = { ...LEVEL_NAMES, ...config.customLevelNames };
    this.currentConfig = DEFAULT_PRIVACY_CONFIG;
    this.listeners = new Set();
    this.appName = config.appName ?? 'VU App';
    this.appVersion = config.appVersion ?? '1.0.0';
    this.strictMode = config.strictMode ?? false;

    // Register initial routes
    if (config.routes) {
      Object.entries(config.routes).forEach(([path, routeConfig]) => {
        this.registerRoute(path, routeConfig);
      });
    }
  }

  /**
   * Register a route with its privacy configuration
   */
  registerRoute(path: string, config: Partial<PrivacyLevelConfig> & { level: VuPrivacyLevel }): void {
    const fullConfig = this.buildConfig(config);
    this.routes.set(path, fullConfig);
  }

  /**
   * Register multiple routes at once
   */
  registerRoutes(routes: Record<string, Partial<PrivacyLevelConfig> & { level: VuPrivacyLevel }>): void {
    Object.entries(routes).forEach(([path, config]) => {
      this.registerRoute(path, config);
    });
  }

  /**
   * Get privacy configuration for a specific path
   */
  getConfigForPath(pathname: string): PrivacyLevelConfig {
    // Exact match first
    if (this.routes.has(pathname)) {
      return this.routes.get(pathname)!;
    }

    // Check for pattern matches (e.g., /apps/* matches /apps/my-app)
    for (const [routePath, config] of this.routes.entries()) {
      if (this.matchRoute(routePath, pathname)) {
        return config;
      }
    }

    // Check parent paths (e.g., /account/settings falls back to /account)
    const segments = pathname.split('/').filter(Boolean);
    while (segments.length > 0) {
      const parentPath = '/' + segments.join('/');
      if (this.routes.has(parentPath)) {
        return this.routes.get(parentPath)!;
      }
      segments.pop();
    }

    // Return default configuration
    return this.buildConfig({ level: this.defaultLevel });
  }

  /**
   * Update current path and notify listeners
   */
  updateCurrentPath(pathname: string): PrivacyLevelConfig {
    this.previousLevel = this.currentConfig.level;
    this.currentConfig = this.getConfigForPath(pathname);

    // Notify listeners if level changed
    if (this.previousLevel !== this.currentConfig.level) {
      const event: PrivacyLevelChangeEvent = {
        previousLevel: this.previousLevel,
        currentLevel: this.currentConfig.level,
        path: pathname,
        config: this.currentConfig,
        timestamp: new Date()
      };
      this.notifyListeners(event);
    }

    return this.currentConfig;
  }

  /**
   * Get the current privacy configuration
   */
  getCurrentConfig(): PrivacyLevelConfig {
    return this.currentConfig;
  }

  /**
   * Subscribe to privacy level changes
   */
  onChange(callback: PrivacyLevelChangeCallback): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  /**
   * Get level color
   */
  getLevelColor(level: VuPrivacyLevel): LevelColor {
    return this.levelColors[level];
  }

  /**
   * Get level name
   */
  getLevelName(level: VuPrivacyLevel): string {
    return this.levelNames[level];
  }

  /**
   * Get short display name (V0, V1, etc.)
   */
  getShortName(level: VuPrivacyLevel): string {
    return LEVEL_SHORT_NAMES[level];
  }

  /**
   * Get level description
   */
  getLevelDescription(level: VuPrivacyLevel): string {
    return LEVEL_DESCRIPTIONS[level];
  }

  /**
   * Get what users control at this level
   */
  getUserControl(level: VuPrivacyLevel): string[] {
    return LEVEL_USER_CONTROL[level];
  }

  /**
   * Get what the service can't see
   */
  getCantSee(level: VuPrivacyLevel): string[] {
    return LEVEL_CANT_SEE[level];
  }

  /**
   * Get what servers can see
   */
  getServerSees(level: VuPrivacyLevel): string[] {
    return LEVEL_SERVER_SEES[level];
  }

  /**
   * Get tradeoffs for this level
   */
  getTradeoffs(level: VuPrivacyLevel): string[] {
    return LEVEL_TRADEOFFS[level];
  }

  /**
   * Get quality label for the level
   */
  getLevelQuality(level: VuPrivacyLevel): { label: string; class: string } {
    return LEVEL_QUALITY[level];
  }

  /**
   * Get emoji indicator for the level
   */
  getLevelEmoji(level: VuPrivacyLevel): string {
    return LEVEL_EMOJIS[level];
  }

  /**
   * Get CSS class for the level
   */
  getLevelClass(level: VuPrivacyLevel): string {
    return LEVEL_CSS_CLASSES[level];
  }

  /**
   * Check if a level meets VU standards (4 or better)
   */
  meetsVuStandard(level: VuPrivacyLevel): boolean {
    if (level === 'subzero') return true;
    return typeof level === 'number' && level <= 4;
  }

  /**
   * Check if level is SubZero
   */
  isSubZero(level: VuPrivacyLevel): boolean {
    return level === 'subzero';
  }

  /**
   * Compare two privacy levels
   * Returns negative if a is worse, positive if a is better, 0 if equal
   */
  compareLevels(a: VuPrivacyLevel, b: VuPrivacyLevel): number {
    const scoreA = this.levelToScore(a);
    const scoreB = this.levelToScore(b);
    return scoreA - scoreB;
  }

  /**
   * Get a numeric score for comparison (higher = better)
   */
  levelToScore(level: VuPrivacyLevel): number {
    if (level === 'subzero') return 100;
    // Invert because lower level number = better
    return (5 - level) * 20;
  }

  /**
   * Convert score to level
   */
  scoreToLevel(score: number): VuPrivacyLevel {
    if (score >= 100) return 'subzero';
    if (score >= 95) return 0;
    if (score >= 80) return 1;
    if (score >= 65) return 2;
    if (score >= 50) return 3;
    if (score >= 30) return 4;
    return 5;
  }

  /**
   * Get all registered routes
   */
  getRegisteredRoutes(): Map<string, PrivacyLevelConfig> {
    return new Map(this.routes);
  }

  /**
   * Generate HTML badge (framework-agnostic)
   */
  generateBadgeHTML(level?: VuPrivacyLevel): string {
    const l = level ?? this.currentConfig.level;
    const color = this.getLevelColor(l);
    const shortName = this.getShortName(l);
    const name = this.getLevelName(l);
    const isSubZero = this.isSubZero(l);

    return `
      <div class="vu-privacy-badge ${this.getLevelClass(l)}" 
           style="--badge-color: ${color.color}; --badge-color-rgb: ${color.colorRgb};"
           title="${name}">
        <span class="vu-badge-v">V</span>
        <span class="vu-badge-level ${isSubZero ? 'vu-subzero' : ''}">${isSubZero ? '∅' : l}</span>
      </div>
    `.trim();
  }

  /**
   * Generate CSS variables for a level
   */
  generateCSSVariables(level?: VuPrivacyLevel): string {
    const l = level ?? this.currentConfig.level;
    const color = this.getLevelColor(l);
    
    return `
      --vu-level: ${l === 'subzero' ? 'subzero' : l};
      --vu-level-color: ${color.color};
      --vu-level-color-rgb: ${color.colorRgb};
      --vu-level-color-dark: ${color.colorDark};
    `.trim();
  }

  /**
   * Get app info
   */
  getAppInfo(): { name: string; version: string } {
    return {
      name: this.appName,
      version: this.appVersion
    };
  }

  /**
   * Export configuration for debugging
   */
  exportConfig(): object {
    return {
      appName: this.appName,
      appVersion: this.appVersion,
      defaultLevel: this.defaultLevel,
      strictMode: this.strictMode,
      registeredRoutes: Object.fromEntries(this.routes),
      currentConfig: this.currentConfig
    };
  }

  // Private methods

  private buildConfig(partial: Partial<PrivacyLevelConfig> & { level: VuPrivacyLevel }): PrivacyLevelConfig {
    const level = partial.level;
    const color = this.levelColors[level];
    
    return {
      level,
      levelName: partial.levelName ?? this.levelNames[level],
      shortName: partial.shortName ?? LEVEL_SHORT_NAMES[level],
      color: partial.color ?? color.color,
      colorRgb: partial.colorRgb ?? color.colorRgb,
      description: partial.description ?? LEVEL_DESCRIPTIONS[level],
      whatYouControl: partial.whatYouControl ?? LEVEL_USER_CONTROL[level].join('. '),
      whatWeCantSee: partial.whatWeCantSee ?? LEVEL_CANT_SEE[level].join('. '),
      whatServersSee: partial.whatServersSee ?? LEVEL_SERVER_SEES[level].join('. '),
      tradeoffs: partial.tradeoffs ?? LEVEL_TRADEOFFS[level],
      whyThisLevel: partial.whyThisLevel ?? `This page operates at VU Level ${level === 'subzero' ? 'SubZero' : level}.`
    };
  }

  private matchRoute(pattern: string, pathname: string): boolean {
    // Handle wildcard patterns like /apps/*
    if (pattern.endsWith('/*')) {
      const base = pattern.slice(0, -2);
      return pathname.startsWith(base + '/') || pathname === base;
    }
    
    // Handle segment wildcards like /users/:id
    if (pattern.includes(':')) {
      const patternSegments = pattern.split('/');
      const pathSegments = pathname.split('/');
      
      if (patternSegments.length !== pathSegments.length) return false;
      
      return patternSegments.every((seg, i) => {
        if (seg.startsWith(':')) return true;
        return seg === pathSegments[i];
      });
    }
    
    return false;
  }

  private notifyListeners(event: PrivacyLevelChangeEvent): void {
    this.listeners.forEach(callback => {
      try {
        callback(event);
      } catch (error) {
        console.error('[VU Privacy Checker] Listener error:', error);
      }
    });
  }
}

/**
 * Create a pre-configured privacy checker instance
 */
export function createPrivacyChecker(config?: VuPrivacyCheckerConfig): VuPrivacyChecker {
  return new VuPrivacyChecker(config);
}

/**
 * Quick function to get level info without creating an instance
 */
export function getLevelInfo(level: VuPrivacyLevel): {
  name: string;
  shortName: string;
  color: LevelColor;
  description: string;
  emoji: string;
  cssClass: string;
  quality: { label: string; class: string };
} {
  return {
    name: LEVEL_NAMES[level],
    shortName: LEVEL_SHORT_NAMES[level],
    color: LEVEL_COLORS[level],
    description: LEVEL_DESCRIPTIONS[level],
    emoji: LEVEL_EMOJIS[level],
    cssClass: LEVEL_CSS_CLASSES[level],
    quality: LEVEL_QUALITY[level]
  };
}

/**
 * Check if a level is VU compliant
 */
export function isVuCompliant(level: VuPrivacyLevel): boolean {
  if (level === 'subzero') return true;
  return typeof level === 'number' && level <= 4;
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

