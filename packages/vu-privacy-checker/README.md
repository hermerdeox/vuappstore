# @vu/privacy-checker

> **Brutally Honest Privacy Level Checker for VU Applications**

Zero compromise on honesty. Zero tolerance for privacy theater.

[![npm version](https://badge.fury.io/js/@vu%2Fprivacy-checker.svg)](https://www.npmjs.com/package/@vu/privacy-checker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🛡️ The VU Philosophy

Most apps claim to care about privacy. We **prove** it.

The VU Privacy Checker doesn't just check boxes—it performs **brutally honest assessments** of privacy practices and assigns clear, verifiable privacy levels that users can understand and trust.

**Our commitment:**
- ✅ No privacy theater
- ✅ No misleading claims  
- ✅ No hidden data collection
- ✅ Complete transparency

---

## 📊 VU Privacy Levels (0-4 + SubZero)

Lower numbers = Better privacy. Zero = True Zero-Knowledge.

| Level | Name | Color | Description |
|-------|------|-------|-------------|
| **4** | Basic Privacy | 🔴 Red | Minimum VU standard. Encrypted transit, basic protections. |
| **3** | Enhanced Privacy | 🟠 Orange | End-to-end encryption. Minimal metadata collection. |
| **2** | Privacy First | 🟡 Yellow | Zero data need design. Federated/differential privacy. |
| **1** | Local-First | 🟢 Green | All computation local. Data never leaves device. |
| **0** | Zero-Knowledge | 🔵 Blue | Peer-to-peer. Complete anonymity. True privacy. |
| **∅** | SubZero | ⚫ B/W | Beyond zero-knowledge. Counter-surveillance. Invitation only. |

> **Level 5** exists but is **NOT VU STANDARD**. It represents what Big Tech falsely calls "privacy."

---

## 📦 Installation

```bash
# npm
npm install @vu/privacy-checker

# yarn
yarn add @vu/privacy-checker

# pnpm
pnpm add @vu/privacy-checker
```

### Local Installation (for VU apps)

Copy the `packages/vu-privacy-checker` folder to your project:

```bash
cp -r packages/vu-privacy-checker ./lib/vu-privacy-checker
```

Then import locally:

```typescript
import { VuPrivacyChecker } from './lib/vu-privacy-checker/src';
```

---

## 🚀 Quick Start

### 1. Route-Based Privacy Checking

```typescript
import { VuPrivacyChecker } from '@vu/privacy-checker';

// Create checker with route configurations
const checker = new VuPrivacyChecker({
  appName: 'My VU App',
  appVersion: '1.0.0',
  defaultLevel: 2,
  routes: {
    '/': { level: 1 },
    '/account': { level: 2 },
    '/account/settings': { level: 2 },
    '/support/contact': { level: 3 },
    '/offline': { level: 0 }
  }
});

// Get privacy config for current page
const config = checker.getConfigForPath('/account/settings');

console.log(config.level);        // 2
console.log(config.levelName);    // "Privacy First"
console.log(config.color);        // "#eab308"
console.log(config.description);  // "This page follows VU privacy-first principles..."
```

### 2. App/Service Privacy Analysis

```typescript
import { VuPrivacyAnalyzer } from '@vu/privacy-checker';

const analyzer = new VuPrivacyAnalyzer();

// Analyze your app's privacy practices
const analysis = analyzer.analyze({
  // Data Collection
  collectsUserData: true,
  dataTypesCollected: ['email'],
  dataCollectionOptional: true,
  canDeleteData: true,
  
  // Network & Storage
  dataLeavesDevice: true,
  encryptionType: 'end_to_end',
  encryptedAtRest: true,
  encryptedInTransit: true,
  serviceCanReadData: false,
  
  // Third Parties
  thirdPartyServices: [],
  usesAnalytics: false,
  usesAdvertising: false,
  
  // Architecture
  architecture: 'local_first',
  worksOffline: true,
  offlineCapability: 80,
  
  // Authentication
  authMethod: 'email',
  requiresRealIdentity: false,
  allowsPseudonymous: true,
  
  // Transparency
  openSource: true,
  independentlyAudited: false,
  privacyPolicyClarity: 85,
  dataPracticesDocumented: true,
  
  // Special Features
  usesZeroKnowledgeProofs: false,
  usesFederatedLearning: false,
  usesDifferentialPrivacy: false,
  isPeerToPeer: false,
  usesOnionRouting: false
});

console.log(analysis.level);  // 2
console.log(analysis.score);  // 72

// Get brutally honest summary
console.log(analyzer.getBrutalSummary(analysis));
// "🟡 PRIVACY FIRST (Level 2): Strong privacy architecture. 
//  Minimal data collection by design. Score: 72/100."

// Check red flags
analysis.redFlags.forEach(flag => {
  console.log(`${flag.severity}: ${flag.description}`);
  if (flag.remediation) {
    console.log(`  Fix: ${flag.remediation}`);
  }
});
```

### 3. Quick One-Liner

```typescript
import { getBrutalVerdict } from '@vu/privacy-checker';

const verdict = getBrutalVerdict({
  collectsUserData: true,
  dataTypesCollected: ['email', 'location'],
  encryptionType: 'transit_only',
  usesAnalytics: true,
  analyticsType: 'google_analytics',
  // ... more
});

console.log(verdict);
// "⚠️ BASIC PRIVACY (Level 4): Meets minimum VU standards but significant 
//  room for improvement. Score: 42/100. 5 issues identified."
```

---

## 🎨 Svelte Components

### VuPrivacyBadge

```svelte
<script>
  import { VuPrivacyBadge } from '@vu/privacy-checker/svelte';
</script>

<!-- Basic usage -->
<VuPrivacyBadge level={1} />

<!-- With config object -->
<VuPrivacyBadge {config} />

<!-- Fixed position badge -->
<VuPrivacyBadge 
  level={2} 
  position="fixed" 
  fixedPosition="bottom-right" 
/>

<!-- Custom size -->
<VuPrivacyBadge level={0} size="lg" />

<!-- Events -->
<VuPrivacyBadge 
  level={1}
  on:click={(e) => console.log('Badge clicked', e.detail)}
  on:modalOpen={(e) => console.log('Modal opened')}
  on:modalClose={(e) => console.log('Modal closed')}
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `level` | `VuPrivacyLevel` | `2` | Privacy level (0-4, 'subzero') |
| `config` | `PrivacyLevelConfig \| null` | `null` | Full config object (overrides level) |
| `showModal` | `boolean` | `true` | Show modal on click |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Badge size |
| `position` | `'inline' \| 'fixed'` | `'inline'` | Position type |
| `fixedPosition` | `string` | `'bottom-right'` | Fixed position location |
| `ariaLabel` | `string` | Auto-generated | Custom aria label |

---

## 📖 API Reference

### VuPrivacyChecker

The main class for route-based privacy level management.

```typescript
class VuPrivacyChecker {
  constructor(config?: VuPrivacyCheckerConfig);
  
  // Route management
  registerRoute(path: string, config: PrivacyLevelConfig): void;
  registerRoutes(routes: Record<string, PrivacyLevelConfig>): void;
  getConfigForPath(pathname: string): PrivacyLevelConfig;
  updateCurrentPath(pathname: string): PrivacyLevelConfig;
  getCurrentConfig(): PrivacyLevelConfig;
  getRegisteredRoutes(): Map<string, PrivacyLevelConfig>;
  
  // Level information
  getLevelColor(level: VuPrivacyLevel): LevelColor;
  getLevelName(level: VuPrivacyLevel): string;
  getShortName(level: VuPrivacyLevel): string;
  getLevelDescription(level: VuPrivacyLevel): string;
  getUserControl(level: VuPrivacyLevel): string[];
  getCantSee(level: VuPrivacyLevel): string[];
  getServerSees(level: VuPrivacyLevel): string[];
  getTradeoffs(level: VuPrivacyLevel): string[];
  getLevelQuality(level: VuPrivacyLevel): { label: string; class: string };
  getLevelEmoji(level: VuPrivacyLevel): string;
  getLevelClass(level: VuPrivacyLevel): string;
  
  // Checks
  meetsVuStandard(level: VuPrivacyLevel): boolean;
  isSubZero(level: VuPrivacyLevel): boolean;
  compareLevels(a: VuPrivacyLevel, b: VuPrivacyLevel): number;
  levelToScore(level: VuPrivacyLevel): number;
  scoreToLevel(score: number): VuPrivacyLevel;
  
  // Events
  onChange(callback: PrivacyLevelChangeCallback): () => void;
  
  // Generation
  generateBadgeHTML(level?: VuPrivacyLevel): string;
  generateCSSVariables(level?: VuPrivacyLevel): string;
  
  // Debug
  exportConfig(): object;
  getAppInfo(): { name: string; version: string };
}
```

### VuPrivacyAnalyzer

Brutally honest privacy assessment engine.

```typescript
class VuPrivacyAnalyzer {
  constructor(options?: { strictMode?: boolean });
  
  // Analysis
  analyze(assessment: PrivacyAssessment): PrivacyAnalysis;
  quickAnalyze(assessment: PrivacyAssessment): { level: VuPrivacyLevel; score: number };
  analyzeCategory(category: keyof PrivacyBreakdown, assessment: Partial<PrivacyAssessment>): { score: number; flags: Array<RedFlag | GreenFlag> };
  
  // Comparison
  compare(a: PrivacyAssessment, b: PrivacyAssessment): ComparisonResult;
  
  // Summary
  getBrutalSummary(analysis: PrivacyAnalysis): string;
}
```

### PrivacyAssessment Interface

```typescript
interface PrivacyAssessment {
  // Data Collection
  collectsUserData: boolean;
  dataTypesCollected: DataType[];
  dataCollectionOptional: boolean;
  canDeleteData: boolean;
  
  // Network & Storage
  dataLeavesDevice: boolean;
  encryptionType: EncryptionType;
  encryptedAtRest: boolean;
  encryptedInTransit: boolean;
  serviceCanReadData: boolean;
  
  // Third Parties
  thirdPartyServices: ThirdPartyService[];
  usesAnalytics: boolean;
  analyticsType?: AnalyticsType;
  usesAdvertising: boolean;
  
  // Architecture
  architecture: ArchitectureType;
  worksOffline: boolean;
  offlineCapability: number; // 0-100
  
  // Authentication
  authMethod: AuthMethod;
  requiresRealIdentity: boolean;
  allowsPseudonymous: boolean;
  
  // Transparency
  openSource: boolean;
  independentlyAudited: boolean;
  privacyPolicyClarity: number; // 0-100
  dataPracticesDocumented: boolean;
  
  // Special Features
  usesZeroKnowledgeProofs: boolean;
  usesFederatedLearning: boolean;
  usesDifferentialPrivacy: boolean;
  isPeerToPeer: boolean;
  usesOnionRouting: boolean;
}
```

---

## 🔧 Utility Functions

```typescript
import {
  // Level utilities
  formatLevel,           // "Level 2" or "SubZero"
  getLevelDisplay,       // "V2" or "∅"
  getLevelEmoji,         // "🟡"
  getLevelColor,         // "#eab308"
  getLevelName,          // "Privacy First"
  getLevelQuality,       // { label: "Very Good", class: "quality-verygood" }
  
  // Checks
  isSubZero,             // true/false
  isVuCompliant,         // true for level 0-4 and subzero
  isExcellent,           // true for level 0-1 and subzero
  compareLevels,         // positive if a better, negative if b better
  isValidLevel,          // validate level value
  parseLevel,            // parse string to level
  
  // Scoring
  levelToScore,          // 0-100 (higher = better)
  scoreToLevel,          // score to level
  
  // Style generation
  generateCssVariables,  // CSS variables string
  generateStyleObject,   // { '--vu-level': '2', ... }
  
  // Helpers
  createMinimalAssessment, // create assessment with defaults
  getAllLevels,            // ['subzero', 0, 1, 2, 3, 4, 5]
  getVuLevels,             // ['subzero', 0, 1, 2, 3, 4]
} from '@vu/privacy-checker';
```

---

## 🎯 Integration Examples

### SvelteKit Integration

```typescript
// src/lib/privacy.ts
import { VuPrivacyChecker } from '@vu/privacy-checker';

export const privacyChecker = new VuPrivacyChecker({
  appName: 'My SvelteKit App',
  defaultLevel: 2,
  routes: {
    '/': { level: 1, whyThisLevel: 'Homepage is static with zero tracking' },
    '/apps': { level: 1 },
    '/account': { level: 2 },
    '/account/settings': { level: 2 },
    '/support/contact': { level: 3 },
    '/checkout': { level: 2 },
    '/offline': { level: 0 }
  }
});
```

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import { page } from '$app/stores';
  import { VuPrivacyBadge } from '@vu/privacy-checker/svelte';
  import { privacyChecker } from '$lib/privacy';
  
  $: config = privacyChecker.getConfigForPath($page.url.pathname);
</script>

<slot />

<VuPrivacyBadge {config} position="fixed" fixedPosition="bottom-right" />
```

### React Integration

```tsx
// Using the core library (framework-agnostic)
import { useState, useEffect } from 'react';
import { VuPrivacyChecker, getLevelColor, getLevelName } from '@vu/privacy-checker';

const checker = new VuPrivacyChecker({ /* config */ });

function PrivacyBadge({ pathname }: { pathname: string }) {
  const [config, setConfig] = useState(() => checker.getConfigForPath(pathname));
  
  useEffect(() => {
    setConfig(checker.getConfigForPath(pathname));
  }, [pathname]);
  
  return (
    <div 
      className="vu-badge"
      style={{ 
        backgroundColor: getLevelColor(config.level),
        color: '#fff'
      }}
    >
      V{config.level === 'subzero' ? '∅' : config.level}
    </div>
  );
}
```

### Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .vu-badge {
      display: inline-flex;
      align-items: center;
      padding: 8px 16px;
      border-radius: 12px;
      font-weight: bold;
      color: white;
    }
  </style>
</head>
<body>
  <div id="privacy-badge"></div>
  
  <script type="module">
    import { VuPrivacyChecker } from './vu-privacy-checker/src/index.js';
    
    const checker = new VuPrivacyChecker({
      routes: {
        '/': { level: 1 },
        '/about': { level: 1 }
      }
    });
    
    const badge = document.getElementById('privacy-badge');
    const config = checker.getConfigForPath(window.location.pathname);
    
    badge.innerHTML = checker.generateBadgeHTML(config.level);
    badge.style.cssText = checker.generateCSSVariables(config.level);
  </script>
</body>
</html>
```

---

## 📈 Scoring System

### Category Weights

| Category | Weight | Description |
|----------|--------|-------------|
| Data Collection | 15% | What data is collected |
| Data Storage | 15% | How data is stored |
| Network Privacy | 15% | Network exposure |
| Third-Party Sharing | 15% | External services |
| User Control | 10% | User agency |
| Transparency | 10% | Openness about practices |
| Encryption | 15% | Cryptographic protection |
| Offline Capability | 5% | Independence from network |

### Score to Level Mapping

| Score Range | Level | Quality |
|-------------|-------|---------|
| 100 | SubZero | Beyond |
| 95-99 | 0 | Best |
| 80-94 | 1 | Excellent |
| 65-79 | 2 | Very Good |
| 50-64 | 3 | Good |
| 30-49 | 4 | Basic |
| 0-29 | 5 | NOT VU STANDARD |

---

## 🚨 Red Flags (What We Penalize)

| Issue | Severity | Points |
|-------|----------|--------|
| No encryption | Critical | -50 |
| Google Analytics | High | -20 |
| Facebook Pixel | High | -25 |
| Advertising | Critical | -30 |
| Location tracking | High | -15 |
| Biometric collection | Critical | -20 |
| Health data collection | Critical | -25 |
| No data deletion | High | -15 |
| Real identity required | High | -15 |
| No offline mode | Low | -10 |

---

## ✅ Green Flags (What We Reward)

| Feature | Points |
|---------|--------|
| Local-only architecture | +30 |
| Zero-knowledge encryption | +30 |
| Peer-to-peer | +25 |
| End-to-end encryption | +20 |
| Independent audit | +20 |
| Onion routing | +20 |
| Open source | +15 |
| Anonymous access | +15 |
| Full offline capability | +15 |
| Zero-knowledge proofs | +20 |

---

## 🛠️ Configuration

### VuPrivacyCheckerConfig

```typescript
interface VuPrivacyCheckerConfig {
  // Custom route configurations
  routes?: Record<string, PrivacyLevelConfig>;
  
  // Default level for unregistered routes (default: 2)
  defaultLevel?: VuPrivacyLevel;
  
  // Custom level names
  customLevelNames?: Partial<Record<VuPrivacyLevel, string>>;
  
  // Custom level colors
  customColors?: Partial<Record<VuPrivacyLevel, LevelColor>>;
  
  // Strict mode - harsher scoring (default: false)
  strictMode?: boolean;
  
  // App info for reporting
  appName?: string;
  appVersion?: string;
}
```

### Route Pattern Matching

The checker supports several route patterns:

```typescript
const checker = new VuPrivacyChecker({
  routes: {
    '/': { level: 1 },                    // Exact match
    '/apps/*': { level: 1 },              // Wildcard (matches /apps/my-app)
    '/users/:id': { level: 2 },           // Dynamic segment
    '/account': { level: 2 },             // Parent path (matches /account/*)
  }
});
```

---

## 🧪 Testing Your Privacy

```typescript
import { VuPrivacyAnalyzer, createMinimalAssessment } from '@vu/privacy-checker';

const analyzer = new VuPrivacyAnalyzer();

// Start with a minimal (best-case) assessment
const myAssessment = createMinimalAssessment({
  // Override only what's different
  collectsUserData: true,
  dataTypesCollected: ['email'],
  encryptionType: 'end_to_end'
});

const result = analyzer.analyze(myAssessment);

// Check if you meet VU standards
if (result.level === 5) {
  console.error('❌ Does not meet VU standards!');
  console.log('Critical issues:', result.redFlags.filter(f => f.severity === 'critical'));
} else {
  console.log(`✅ VU Level ${result.level} - ${result.score}/100`);
}
```

---

## 📄 License

MIT © VU Labs

---

## 🤝 Contributing

We welcome contributions! Please ensure any changes:

1. Maintain or improve privacy standards
2. Don't introduce privacy theater
3. Include tests for new features
4. Update documentation

---

## 📞 Support

- Documentation: https://vuappstore.com/docs/privacy-checker
- Issues: https://github.com/vu-labs/vu-privacy-checker/issues
- Email: privacy@vuappstore.com

---

**Built with 🛡️ by VU Labs**

*Because privacy should be verifiable, not just claimed.*

