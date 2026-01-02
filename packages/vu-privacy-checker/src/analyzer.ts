/**
 * VU Privacy Analyzer - Brutally Honest Privacy Assessment
 * 
 * @description Analyzes apps and services with zero compromise honesty.
 * This is the core of VU's commitment to privacy transparency.
 * 
 * @author VU Labs
 * @license MIT
 * @version 1.0.0
 */

import type {
  VuPrivacyLevel,
  PrivacyAnalysis,
  PrivacyAssessment,
  PrivacyBreakdown,
  RedFlag,
  GreenFlag,
  DataType,
  ThirdPartyService
} from './types';

import {
  ASSESSMENT_WEIGHTS,
  PRIVACY_PENALTIES,
  PRIVACY_BONUSES,
  LEVEL_SCORE_RANGES
} from './constants';

/**
 * VuPrivacyAnalyzer - Brutally honest privacy assessment engine
 * 
 * @example
 * ```typescript
 * const analyzer = new VuPrivacyAnalyzer();
 * 
 * const analysis = analyzer.analyze({
 *   collectsUserData: true,
 *   dataTypesCollected: ['email', 'name'],
 *   encryptionType: 'end_to_end',
 *   // ... more assessment data
 * });
 * 
 * console.log(analysis.level); // 3
 * console.log(analysis.score); // 58
 * console.log(analysis.redFlags); // [{ severity: 'medium', ... }]
 * ```
 */
export class VuPrivacyAnalyzer {
  private strictMode: boolean;

  constructor(options: { strictMode?: boolean } = {}) {
    this.strictMode = options.strictMode ?? false;
  }

  /**
   * Perform a complete privacy analysis
   */
  analyze(assessment: PrivacyAssessment): PrivacyAnalysis {
    const redFlags: RedFlag[] = [];
    const greenFlags: GreenFlag[] = [];
    const recommendations: string[] = [];

    // Calculate breakdown scores
    const breakdown = this.calculateBreakdown(assessment, redFlags, greenFlags);
    
    // Calculate overall score
    const score = this.calculateOverallScore(breakdown);
    
    // Determine level from score
    const level = this.scoreToLevel(score);
    
    // Generate recommendations
    this.generateRecommendations(assessment, redFlags, recommendations);

    return {
      level,
      score,
      breakdown,
      redFlags: this.sortRedFlags(redFlags),
      greenFlags,
      recommendations,
      assessment,
      analyzedAt: new Date()
    };
  }

  /**
   * Quick analysis - returns just the level and score
   */
  quickAnalyze(assessment: PrivacyAssessment): { level: VuPrivacyLevel; score: number } {
    const analysis = this.analyze(assessment);
    return { level: analysis.level, score: analysis.score };
  }

  /**
   * Analyze a specific category only
   */
  analyzeCategory(
    category: keyof PrivacyBreakdown,
    assessment: Partial<PrivacyAssessment>
  ): { score: number; flags: (RedFlag | GreenFlag)[] } {
    const flags: (RedFlag | GreenFlag)[] = [];
    let score = 100;

    switch (category) {
      case 'dataCollection':
        score = this.analyzeDataCollection(assessment as PrivacyAssessment, flags);
        break;
      case 'encryption':
        score = this.analyzeEncryption(assessment as PrivacyAssessment, flags);
        break;
      case 'thirdPartySharing':
        score = this.analyzeThirdParties(assessment as PrivacyAssessment, flags);
        break;
      case 'offlineCapability':
        score = this.analyzeOfflineCapability(assessment as PrivacyAssessment, flags);
        break;
      default:
        score = 50;
    }

    return { score, flags };
  }

  /**
   * Get brutally honest summary
   */
  getBrutalSummary(analysis: PrivacyAnalysis): string {
    const { level, score, redFlags, greenFlags } = analysis;
    
    const criticalFlags = redFlags.filter(f => f.severity === 'critical').length;
    const highFlags = redFlags.filter(f => f.severity === 'high').length;

    if (level === 5) {
      return `🚨 NOT VU STANDARD: This app/service fails basic privacy requirements. Found ${criticalFlags} critical and ${highFlags} high-severity issues. Score: ${score}/100. We cannot recommend this.`;
    }

    if (level === 4) {
      return `⚠️ BASIC PRIVACY (Level 4): Meets minimum VU standards but significant room for improvement. Score: ${score}/100. ${redFlags.length} issues identified.`;
    }

    if (level === 3) {
      return `🟠 ENHANCED PRIVACY (Level 3): Good privacy practices with end-to-end encryption. Score: ${score}/100. ${greenFlags.length} positive features, ${redFlags.length} areas to improve.`;
    }

    if (level === 2) {
      return `🟡 PRIVACY FIRST (Level 2): Strong privacy architecture. Minimal data collection by design. Score: ${score}/100.`;
    }

    if (level === 1) {
      return `🟢 LOCAL-FIRST (Level 1): Excellent privacy. Data stays on your device. Score: ${score}/100.`;
    }

    if (level === 0) {
      return `🔵 ZERO-KNOWLEDGE (Level 0): True privacy achieved. Zero-knowledge architecture. Score: ${score}/100. We literally cannot know anything about you.`;
    }

    return `⚫ SUBZERO: Beyond zero-knowledge. Counter-surveillance enabled. Score: ${score}/100. You are protected against nation-state adversaries.`;
  }

  /**
   * Compare two assessments
   */
  compare(a: PrivacyAssessment, b: PrivacyAssessment): {
    winner: 'a' | 'b' | 'tie';
    scoreDiff: number;
    levelDiff: number;
    breakdown: Record<keyof PrivacyBreakdown, { a: number; b: number; winner: 'a' | 'b' | 'tie' }>;
  } {
    const analysisA = this.analyze(a);
    const analysisB = this.analyze(b);

    const scoreDiff = analysisA.score - analysisB.score;
    const levelDiff = this.levelToNumber(analysisA.level) - this.levelToNumber(analysisB.level);

    const breakdown: Record<keyof PrivacyBreakdown, { a: number; b: number; winner: 'a' | 'b' | 'tie' }> = {} as any;

    for (const key of Object.keys(analysisA.breakdown) as (keyof PrivacyBreakdown)[]) {
      const scoreA = analysisA.breakdown[key];
      const scoreB = analysisB.breakdown[key];
      breakdown[key] = {
        a: scoreA,
        b: scoreB,
        winner: scoreA > scoreB ? 'a' : scoreA < scoreB ? 'b' : 'tie'
      };
    }

    return {
      winner: scoreDiff > 0 ? 'a' : scoreDiff < 0 ? 'b' : 'tie',
      scoreDiff: Math.abs(scoreDiff),
      levelDiff,
      breakdown
    };
  }

  // Private calculation methods

  private calculateBreakdown(
    assessment: PrivacyAssessment,
    redFlags: RedFlag[],
    greenFlags: GreenFlag[]
  ): PrivacyBreakdown {
    return {
      dataCollection: this.analyzeDataCollection(assessment, redFlags, greenFlags),
      dataStorage: this.analyzeDataStorage(assessment, redFlags, greenFlags),
      networkPrivacy: this.analyzeNetworkPrivacy(assessment, redFlags, greenFlags),
      thirdPartySharing: this.analyzeThirdParties(assessment, redFlags, greenFlags),
      userControl: this.analyzeUserControl(assessment, redFlags, greenFlags),
      transparency: this.analyzeTransparency(assessment, redFlags, greenFlags),
      encryption: this.analyzeEncryption(assessment, redFlags, greenFlags),
      offlineCapability: this.analyzeOfflineCapability(assessment, redFlags, greenFlags)
    };
  }

  private analyzeDataCollection(
    assessment: PrivacyAssessment,
    flags: (RedFlag | GreenFlag)[] = [],
    greenFlags?: GreenFlag[]
  ): number {
    let score = 100;

    if (!assessment.collectsUserData) {
      if (greenFlags) {
        greenFlags.push({
          category: 'dataCollection',
          description: 'Collects zero user data',
          impact: 20
        });
      }
      return 100;
    }

    // Check each data type collected
    for (const dataType of assessment.dataTypesCollected) {
      const penalty = this.getDataTypePenalty(dataType);
      score -= penalty;

      if (penalty >= 15) {
        flags.push({
          severity: penalty >= 20 ? 'critical' : 'high',
          category: 'dataCollection',
          description: `Collects ${this.formatDataType(dataType)}`,
          impact: penalty,
          remediation: `Consider if ${this.formatDataType(dataType)} is truly necessary for core functionality`
        });
      }
    }

    // Bonus for optional collection
    if (assessment.dataCollectionOptional) {
      score += 10;
      if (greenFlags) {
        greenFlags.push({
          category: 'dataCollection',
          description: 'Data collection is optional',
          impact: 10
        });
      }
    }

    // Bonus for deletion capability
    if (assessment.canDeleteData) {
      score += 5;
      if (greenFlags) {
        greenFlags.push({
          category: 'dataCollection',
          description: 'Users can delete their data',
          impact: 5
        });
      }
    } else {
      flags.push({
        severity: 'high',
        category: 'dataCollection',
        description: 'Users cannot delete their data',
        impact: 15,
        remediation: 'Implement true data deletion (not just marking as deleted)'
      });
      score -= 15;
    }

    return Math.max(0, Math.min(100, score));
  }

  private analyzeDataStorage(
    assessment: PrivacyAssessment,
    flags: (RedFlag | GreenFlag)[] = [],
    greenFlags?: GreenFlag[]
  ): number {
    let score = 100;

    // Local-only is best
    if (!assessment.dataLeavesDevice) {
      if (greenFlags) {
        greenFlags.push({
          category: 'dataStorage',
          description: 'Data never leaves the device',
          impact: PRIVACY_BONUSES.localOnly
        });
      }
      return 100;
    }

    // Data leaves device - check encryption
    if (!assessment.encryptedInTransit) {
      flags.push({
        severity: 'critical',
        category: 'dataStorage',
        description: 'Data transmitted without encryption',
        impact: 40,
        remediation: 'Implement TLS/HTTPS for all data transmission'
      });
      score -= 40;
    }

    if (!assessment.encryptedAtRest) {
      flags.push({
        severity: 'high',
        category: 'dataStorage',
        description: 'Data stored without encryption',
        impact: 20,
        remediation: 'Encrypt data at rest using AES-256 or better'
      });
      score -= 20;
    }

    if (assessment.serviceCanReadData) {
      flags.push({
        severity: 'high',
        category: 'dataStorage',
        description: 'Service has access to unencrypted data',
        impact: PRIVACY_PENALTIES.serverCanReadData,
        remediation: 'Implement end-to-end encryption where service cannot read data'
      });
      score -= Math.abs(PRIVACY_PENALTIES.serverCanReadData);
    } else if (greenFlags) {
      greenFlags.push({
        category: 'dataStorage',
        description: 'Service cannot read user data',
        impact: 15
      });
    }

    return Math.max(0, Math.min(100, score));
  }

  private analyzeNetworkPrivacy(
    assessment: PrivacyAssessment,
    flags: (RedFlag | GreenFlag)[] = [],
    greenFlags?: GreenFlag[]
  ): number {
    let score = 70; // Start at 70 - network always has some exposure

    // Architecture bonuses
    if (assessment.architecture === 'local_only') {
      score = 100;
      if (greenFlags) {
        greenFlags.push({
          category: 'networkPrivacy',
          description: 'Local-only architecture (no network)',
          impact: 30
        });
      }
      return score;
    }

    if (assessment.isPeerToPeer) {
      score += PRIVACY_BONUSES.peerToPeer;
      if (greenFlags) {
        greenFlags.push({
          category: 'networkPrivacy',
          description: 'Peer-to-peer architecture (no central server)',
          impact: PRIVACY_BONUSES.peerToPeer
        });
      }
    }

    if (assessment.usesOnionRouting) {
      score += PRIVACY_BONUSES.usesOnionRouting;
      if (greenFlags) {
        greenFlags.push({
          category: 'networkPrivacy',
          description: 'Uses onion routing for anonymity',
          impact: PRIVACY_BONUSES.usesOnionRouting
        });
      }
    }

    if (assessment.architecture === 'cloud_native') {
      flags.push({
        severity: 'medium',
        category: 'networkPrivacy',
        description: 'Cloud-native architecture exposes more metadata',
        impact: 15
      });
      score -= 15;
    }

    return Math.max(0, Math.min(100, score));
  }

  private analyzeThirdParties(
    assessment: PrivacyAssessment,
    flags: (RedFlag | GreenFlag)[] = [],
    greenFlags?: GreenFlag[]
  ): number {
    let score = 100;

    if (assessment.thirdPartyServices.length === 0) {
      if (greenFlags) {
        greenFlags.push({
          category: 'thirdPartySharing',
          description: 'No third-party services used',
          impact: 20
        });
      }
      return 100;
    }

    // Analyze each third party
    for (const service of assessment.thirdPartyServices) {
      const penalty = this.getThirdPartyPenalty(service);
      score -= penalty;

      if (penalty >= 10) {
        flags.push({
          severity: penalty >= 20 ? 'high' : 'medium',
          category: 'thirdPartySharing',
          description: `Uses ${service.name} (${service.category})`,
          impact: penalty,
          remediation: this.getThirdPartyRemediation(service)
        });
      }
    }

    // Advertising is a major red flag
    if (assessment.usesAdvertising) {
      flags.push({
        severity: 'critical',
        category: 'thirdPartySharing',
        description: 'Uses advertising - your data is the product',
        impact: Math.abs(PRIVACY_PENALTIES.usesThirdPartyAds),
        remediation: 'Remove advertising entirely or switch to privacy-preserving alternatives'
      });
      score -= Math.abs(PRIVACY_PENALTIES.usesThirdPartyAds);
    }

    // Analytics penalties
    if (assessment.usesAnalytics && assessment.analyticsType) {
      const analyticsPenalty = this.getAnalyticsPenalty(assessment.analyticsType);
      score -= analyticsPenalty;

      if (analyticsPenalty > 0) {
        flags.push({
          severity: analyticsPenalty >= 20 ? 'high' : 'medium',
          category: 'thirdPartySharing',
          description: `Uses ${assessment.analyticsType.replace(/_/g, ' ')} analytics`,
          impact: analyticsPenalty,
          remediation: 'Switch to privacy-preserving analytics (Plausible, Fathom) or self-hosted'
        });
      }
    }

    return Math.max(0, Math.min(100, score));
  }

  private analyzeUserControl(
    assessment: PrivacyAssessment,
    flags: (RedFlag | GreenFlag)[] = [],
    greenFlags?: GreenFlag[]
  ): number {
    let score = 50; // Start at baseline

    // Anonymous/pseudonymous access
    if (assessment.authMethod === 'none' || assessment.authMethod === 'anonymous') {
      score += PRIVACY_BONUSES.anonymousAllowed;
      if (greenFlags) {
        greenFlags.push({
          category: 'userControl',
          description: 'Works without account/anonymously',
          impact: PRIVACY_BONUSES.anonymousAllowed
        });
      }
    } else if (assessment.allowsPseudonymous) {
      score += PRIVACY_BONUSES.pseudonymousAllowed;
      if (greenFlags) {
        greenFlags.push({
          category: 'userControl',
          description: 'Allows pseudonymous accounts',
          impact: PRIVACY_BONUSES.pseudonymousAllowed
        });
      }
    }

    if (assessment.requiresRealIdentity) {
      flags.push({
        severity: 'high',
        category: 'userControl',
        description: 'Requires real identity verification',
        impact: Math.abs(PRIVACY_PENALTIES.requiresRealIdentity),
        remediation: 'Allow pseudonymous or anonymous access where possible'
      });
      score -= Math.abs(PRIVACY_PENALTIES.requiresRealIdentity);
    }

    // Data export
    if (assessment.canDeleteData) {
      score += PRIVACY_BONUSES.trueAccountDeletion;
      if (greenFlags) {
        greenFlags.push({
          category: 'userControl',
          description: 'True data deletion available',
          impact: PRIVACY_BONUSES.trueAccountDeletion
        });
      }
    }

    // OAuth provider impact
    if (assessment.authMethod === 'oauth_big_tech') {
      flags.push({
        severity: 'high',
        category: 'userControl',
        description: 'Uses Big Tech OAuth (Google, Facebook, etc.)',
        impact: 15,
        remediation: 'Offer privacy-friendly alternatives or custom auth'
      });
      score -= 15;
    }

    return Math.max(0, Math.min(100, score));
  }

  private analyzeTransparency(
    assessment: PrivacyAssessment,
    flags: (RedFlag | GreenFlag)[] = [],
    greenFlags?: GreenFlag[]
  ): number {
    let score = 30; // Start low - transparency must be earned

    // Open source bonus
    if (assessment.openSource) {
      score += PRIVACY_BONUSES.openSource;
      if (greenFlags) {
        greenFlags.push({
          category: 'transparency',
          description: 'Open source - code is verifiable',
          impact: PRIVACY_BONUSES.openSource
        });
      }
    } else {
      flags.push({
        severity: 'low',
        category: 'transparency',
        description: 'Closed source - privacy claims cannot be verified',
        impact: Math.abs(PRIVACY_PENALTIES.closedSource)
      });
      score -= Math.abs(PRIVACY_PENALTIES.closedSource);
    }

    // Independent audit
    if (assessment.independentlyAudited) {
      score += PRIVACY_BONUSES.independentlyAudited;
      if (greenFlags) {
        greenFlags.push({
          category: 'transparency',
          description: 'Independently audited by security researchers',
          impact: PRIVACY_BONUSES.independentlyAudited
        });
      }
    } else {
      flags.push({
        severity: 'low',
        category: 'transparency',
        description: 'No independent security audit',
        impact: Math.abs(PRIVACY_PENALTIES.neverAudited)
      });
    }

    // Privacy policy clarity
    if (assessment.privacyPolicyClarity >= 80) {
      score += PRIVACY_BONUSES.clearPrivacyPolicy;
      if (greenFlags) {
        greenFlags.push({
          category: 'transparency',
          description: 'Clear, readable privacy policy',
          impact: PRIVACY_BONUSES.clearPrivacyPolicy
        });
      }
    } else if (assessment.privacyPolicyClarity < 50) {
      flags.push({
        severity: 'medium',
        category: 'transparency',
        description: 'Privacy policy is unclear or hard to understand',
        impact: 10
      });
      score -= 10;
    }

    // Data practices documented
    if (assessment.dataPracticesDocumented) {
      score += 10;
      if (greenFlags) {
        greenFlags.push({
          category: 'transparency',
          description: 'Data practices are publicly documented',
          impact: 10
        });
      }
    }

    return Math.max(0, Math.min(100, score));
  }

  private analyzeEncryption(
    assessment: PrivacyAssessment,
    flags: (RedFlag | GreenFlag)[] = [],
    greenFlags?: GreenFlag[]
  ): number {
    let score = 50;

    switch (assessment.encryptionType) {
      case 'none':
        flags.push({
          severity: 'critical',
          category: 'encryption',
          description: 'No encryption implemented',
          impact: 50,
          remediation: 'Implement at minimum TLS for transit and AES for storage'
        });
        score = 0;
        break;

      case 'transit_only':
        score = 40;
        flags.push({
          severity: 'medium',
          category: 'encryption',
          description: 'Only transit encryption (HTTPS)',
          impact: 20,
          remediation: 'Add encryption at rest for stored data'
        });
        break;

      case 'at_rest':
        score = 50;
        break;

      case 'end_to_end':
        score = 80;
        score += PRIVACY_BONUSES.endToEndEncryption;
        if (greenFlags) {
          greenFlags.push({
            category: 'encryption',
            description: 'End-to-end encryption - only you can read your data',
            impact: PRIVACY_BONUSES.endToEndEncryption
          });
        }
        break;

      case 'zero_knowledge':
        score = 95;
        score += PRIVACY_BONUSES.zeroKnowledgeEncryption;
        if (greenFlags) {
          greenFlags.push({
            category: 'encryption',
            description: 'Zero-knowledge encryption - mathematically private',
            impact: PRIVACY_BONUSES.zeroKnowledgeEncryption
          });
        }
        break;

      case 'homomorphic':
        score = 98;
        score += PRIVACY_BONUSES.homomorphicEncryption;
        if (greenFlags) {
          greenFlags.push({
            category: 'encryption',
            description: 'Homomorphic encryption - compute on encrypted data',
            impact: PRIVACY_BONUSES.homomorphicEncryption
          });
        }
        break;

      case 'polymorphic':
        score = 100;
        if (greenFlags) {
          greenFlags.push({
            category: 'encryption',
            description: 'Polymorphic encryption - SubZero grade',
            impact: 30
          });
        }
        break;
    }

    // Additional encryption features
    if (assessment.usesZeroKnowledgeProofs) {
      score += PRIVACY_BONUSES.usesZeroKnowledgeProofs;
      if (greenFlags) {
        greenFlags.push({
          category: 'encryption',
          description: 'Uses zero-knowledge proofs',
          impact: PRIVACY_BONUSES.usesZeroKnowledgeProofs
        });
      }
    }

    return Math.max(0, Math.min(100, score));
  }

  private analyzeOfflineCapability(
    assessment: PrivacyAssessment,
    flags: (RedFlag | GreenFlag)[] = [],
    greenFlags?: GreenFlag[]
  ): number {
    if (!assessment.worksOffline) {
      flags.push({
        severity: 'low',
        category: 'offlineCapability',
        description: 'Requires internet connection to function',
        impact: Math.abs(PRIVACY_PENALTIES.noOfflineMode)
      });
      return 0;
    }

    const score = assessment.offlineCapability;

    if (score >= 90) {
      if (greenFlags) {
        greenFlags.push({
          category: 'offlineCapability',
          description: 'Full offline capability - works without internet',
          impact: PRIVACY_BONUSES.fullOfflineCapability
        });
      }
    } else if (score >= 50) {
      if (greenFlags) {
        greenFlags.push({
          category: 'offlineCapability',
          description: 'Partial offline capability',
          impact: PRIVACY_BONUSES.partialOfflineCapability
        });
      }
    }

    return score;
  }

  private calculateOverallScore(breakdown: PrivacyBreakdown): number {
    let weightedScore = 0;
    let totalWeight = 0;

    for (const [category, weight] of Object.entries(ASSESSMENT_WEIGHTS)) {
      const categoryScore = breakdown[category as keyof PrivacyBreakdown];
      weightedScore += categoryScore * weight;
      totalWeight += weight;
    }

    return Math.round(weightedScore / totalWeight);
  }

  private scoreToLevel(score: number): VuPrivacyLevel {
    for (const [level, range] of Object.entries(LEVEL_SCORE_RANGES)) {
      if (score >= range.min && score <= range.max) {
        return level === 'subzero' ? 'subzero' : (parseInt(level) as VuPrivacyLevel);
      }
    }
    return 5;
  }

  private levelToNumber(level: VuPrivacyLevel): number {
    if (level === 'subzero') return -1;
    return level;
  }

  private sortRedFlags(flags: RedFlag[]): RedFlag[] {
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return flags.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
  }

  private generateRecommendations(
    assessment: PrivacyAssessment,
    redFlags: RedFlag[],
    recommendations: string[]
  ): void {
    // Critical issues first
    const critical = redFlags.filter(f => f.severity === 'critical');
    if (critical.length > 0) {
      recommendations.push('🚨 URGENT: Address critical privacy issues before deployment');
      critical.forEach(f => {
        if (f.remediation) recommendations.push(`  → ${f.remediation}`);
      });
    }

    // Architecture recommendations
    if (assessment.architecture === 'cloud_native' && !assessment.encryptionType.includes('end_to_end')) {
      recommendations.push('Consider local-first architecture to minimize server dependency');
    }

    if (!assessment.openSource) {
      recommendations.push('Open source your code to build trust and allow verification');
    }

    if (!assessment.independentlyAudited) {
      recommendations.push('Get an independent security audit from a reputable firm');
    }

    // Quick wins
    if (assessment.usesAnalytics && assessment.analyticsType === 'google_analytics') {
      recommendations.push('Quick win: Replace Google Analytics with Plausible or Fathom');
    }

    if (assessment.authMethod === 'oauth_big_tech') {
      recommendations.push('Quick win: Offer email/password or passkey authentication as alternative');
    }
  }

  private getDataTypePenalty(dataType: DataType): number {
    const penalties: Record<DataType, number> = {
      email: Math.abs(PRIVACY_PENALTIES.collectsEmail),
      phone: Math.abs(PRIVACY_PENALTIES.collectsPhone),
      name: Math.abs(PRIVACY_PENALTIES.collectsName),
      address: 10,
      payment: 8,
      location: Math.abs(PRIVACY_PENALTIES.collectsLocation),
      contacts: Math.abs(PRIVACY_PENALTIES.collectsContacts),
      photos: 12,
      files: 8,
      messages: 15,
      browsing_history: Math.abs(PRIVACY_PENALTIES.collectsBrowsingHistory),
      search_history: 12,
      device_info: 5,
      ip_address: 5,
      usage_patterns: 10,
      biometrics: Math.abs(PRIVACY_PENALTIES.collectsBiometrics),
      health_data: Math.abs(PRIVACY_PENALTIES.collectsHealthData),
      financial_data: Math.abs(PRIVACY_PENALTIES.collectsFinancialData),
      social_connections: 15,
      voice_recordings: 18,
      none: 0
    };
    return penalties[dataType] ?? 10;
  }

  private formatDataType(dataType: DataType): string {
    return dataType.replace(/_/g, ' ');
  }

  private getThirdPartyPenalty(service: ThirdPartyService): number {
    const basePenalty: Record<string, number> = {
      analytics: 15,
      advertising: 30,
      payment: 5,
      auth: 10,
      cdn: 3,
      storage: 8,
      email: 5,
      other: 5
    };

    let penalty = basePenalty[service.category] ?? 10;
    
    // Adjust for privacy impact
    if (service.privacyImpact === 'high') penalty *= 1.5;
    else if (service.privacyImpact === 'low') penalty *= 0.5;

    // Known bad actors
    if (service.name.toLowerCase().includes('google')) penalty += 5;
    if (service.name.toLowerCase().includes('facebook') || service.name.toLowerCase().includes('meta')) penalty += 10;

    return Math.round(penalty);
  }

  private getThirdPartyRemediation(service: ThirdPartyService): string {
    const remediations: Record<string, string> = {
      analytics: 'Use privacy-preserving analytics (Plausible, Fathom, Umami)',
      advertising: 'Remove advertising or use privacy-respecting alternatives',
      payment: 'Consider cryptocurrency payments for anonymity',
      auth: 'Implement your own auth or use privacy-friendly providers',
      cdn: 'Self-host if possible or use privacy-respecting CDNs',
      storage: 'Use end-to-end encrypted storage or self-host',
      email: 'Use privacy-focused email providers',
      other: 'Evaluate if this service is truly necessary'
    };
    return remediations[service.category] ?? 'Review necessity of this third-party service';
  }

  private getAnalyticsPenalty(analyticsType: string): number {
    const penalties: Record<string, number> = {
      none: 0,
      privacy_preserving: 0,
      aggregated_only: 3,
      self_hosted: 5,
      third_party_minimal: 10,
      third_party_full: 15,
      google_analytics: Math.abs(PRIVACY_PENALTIES.usesGoogleAnalytics),
      facebook_pixel: Math.abs(PRIVACY_PENALTIES.usesFacebookPixel)
    };
    return penalties[analyticsType] ?? 10;
  }
}

/**
 * Create a pre-configured analyzer instance
 */
export function createPrivacyAnalyzer(options?: { strictMode?: boolean }): VuPrivacyAnalyzer {
  return new VuPrivacyAnalyzer(options);
}

/**
 * Quick analyze function without creating an instance
 */
export function analyzePrivacy(assessment: PrivacyAssessment): PrivacyAnalysis {
  const analyzer = new VuPrivacyAnalyzer();
  return analyzer.analyze(assessment);
}

/**
 * Get a brutal summary without full analysis
 */
export function getBrutalVerdict(assessment: PrivacyAssessment): string {
  const analyzer = new VuPrivacyAnalyzer();
  const analysis = analyzer.analyze(assessment);
  return analyzer.getBrutalSummary(analysis);
}

