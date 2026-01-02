# VU Privacy Checker - Integration Guide

This guide explains how to integrate the VU Privacy Checker into any VU application, whether it's a new project or an existing one.

---

## 📁 Directory Structure

```
packages/vu-privacy-checker/
├── src/
│   ├── index.ts          # Main entry point - exports everything
│   ├── types.ts          # TypeScript type definitions
│   ├── constants.ts      # Level colors, names, descriptions
│   ├── core.ts           # VuPrivacyChecker class
│   ├── analyzer.ts       # VuPrivacyAnalyzer class
│   └── utils.ts          # Helper functions
├── svelte/
│   ├── index.ts          # Svelte exports
│   └── VuPrivacyBadge.svelte
├── examples/
│   ├── vanilla.html      # Plain HTML/JS example
│   └── svelte-example/   # SvelteKit example
├── package.json
├── tsconfig.json
├── README.md
└── INTEGRATION_GUIDE.md  # This file
```

---

## 🔧 Installation Methods

### Method 1: Local Copy (Recommended for VU Apps)

Copy the entire package to your project:

```bash
# From vuappstore root
cp -r packages/vu-privacy-checker /path/to/your-vu-app/lib/vu-privacy-checker
```

Then import:

```typescript
// TypeScript/JavaScript
import { VuPrivacyChecker, VuPrivacyAnalyzer } from './lib/vu-privacy-checker/src';

// Svelte components
import { VuPrivacyBadge } from './lib/vu-privacy-checker/svelte';
```

### Method 2: npm Package (When Published)

```bash
npm install @vu/privacy-checker
```

```typescript
import { VuPrivacyChecker, VuPrivacyAnalyzer } from '@vu/privacy-checker';
import { VuPrivacyBadge } from '@vu/privacy-checker/svelte';
```

### Method 3: Git Submodule

```bash
git submodule add https://github.com/vu-labs/vu-privacy-checker.git lib/vu-privacy-checker
```

---

## 🚀 Quick Integration Steps

### Step 1: Create Privacy Configuration File

Create a central privacy configuration file in your app:

```typescript
// src/lib/privacy.ts (or wherever your lib folder is)

import { VuPrivacyChecker } from './vu-privacy-checker/src';
// OR from npm: import { VuPrivacyChecker } from '@vu/privacy-checker';

export const privacyChecker = new VuPrivacyChecker({
  appName: 'Your VU App',
  appVersion: '1.0.0',
  defaultLevel: 2, // Privacy First is the default
  
  routes: {
    // Static pages - no tracking
    '/': { level: 1, whyThisLevel: 'Homepage is static with zero tracking' },
    '/about': { level: 1 },
    '/docs': { level: 1 },
    
    // App functionality - local-first
    '/apps': { level: 1, whyThisLevel: 'App catalog loaded locally' },
    '/apps/*': { level: 1 },
    
    // Account pages - need some server interaction
    '/account': { 
      level: 2,
      whyThisLevel: 'Account data stored with zero-knowledge encryption'
    },
    '/account/settings': { level: 2 },
    '/account/downloads': { level: 1 },
    
    // Contact/Support - needs email for response
    '/support/contact': { 
      level: 3,
      whyThisLevel: 'Contact form requires email for response'
    },
    
    // Checkout - crypto payment
    '/checkout': { 
      level: 2,
      whyThisLevel: 'Crypto payments offer pseudonymity'
    },
    
    // Offline - perfect privacy
    '/offline': { 
      level: 0,
      whyThisLevel: 'Completely offline - zero network activity'
    }
  }
});

// Export utility functions for convenience
export function getPrivacyConfig(pathname: string) {
  return privacyChecker.getConfigForPath(pathname);
}

export function isPrivateRoute(pathname: string) {
  const config = privacyChecker.getConfigForPath(pathname);
  return config.level <= 1; // Local-First or better
}
```

### Step 2: Add Badge to Layout (SvelteKit)

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import { page } from '$app/stores';
  import { VuPrivacyBadge } from '$lib/vu-privacy-checker/svelte';
  import { privacyChecker } from '$lib/privacy';
  
  // Reactive config based on current route
  $: config = privacyChecker.getConfigForPath($page.url.pathname);
</script>

<slot />

<!-- Fixed position badge in bottom-right -->
<VuPrivacyBadge 
  {config} 
  position="fixed" 
  fixedPosition="bottom-right"
  size="md"
/>
```

### Step 3: Use in Components

```svelte
<!-- Any component that needs privacy info -->
<script>
  import { page } from '$app/stores';
  import { privacyChecker } from '$lib/privacy';
  
  $: config = privacyChecker.getConfigForPath($page.url.pathname);
  $: isHighPrivacy = config.level <= 1;
</script>

{#if isHighPrivacy}
  <div class="privacy-notice">
    🛡️ This page operates with {config.levelName} protection
  </div>
{/if}
```

---

## 🎨 Styling Integration

### Using CSS Variables

The checker provides CSS variables for consistent styling:

```svelte
<script>
  import { privacyChecker } from '$lib/privacy';
  
  const config = privacyChecker.getConfigForPath('/');
  const cssVars = privacyChecker.generateCSSVariables(config.level);
</script>

<div class="privacy-indicator" style={cssVars}>
  <!-- Uses --vu-level-color, --vu-level-color-rgb, etc. -->
</div>

<style>
  .privacy-indicator {
    background: rgba(var(--vu-level-color-rgb), 0.2);
    border-left: 4px solid var(--vu-level-color);
    color: var(--vu-level-color);
  }
</style>
```

### Custom Badge Styling

Override the default badge styles:

```css
/* Your global CSS or component style */
:global(.vu-privacy-badge) {
  /* Your custom overrides */
  font-family: 'Your Font', sans-serif;
  border-radius: 8px;
}

:global(.vu-privacy-modal) {
  /* Custom modal styling */
  background: var(--your-card-bg);
}
```

---

## 📊 Using the Analyzer

For apps that need to self-assess:

```typescript
// src/lib/privacy-analysis.ts
import { VuPrivacyAnalyzer, createMinimalAssessment } from './vu-privacy-checker/src';

const analyzer = new VuPrivacyAnalyzer();

// Assess your app's privacy practices
export const appPrivacyAssessment = createMinimalAssessment({
  // Override defaults based on your actual practices
  collectsUserData: true,
  dataTypesCollected: ['email'],
  encryptionType: 'end_to_end',
  architecture: 'local_first',
  worksOffline: true,
  offlineCapability: 80,
  openSource: true,
  canDeleteData: true
});

export const appPrivacyAnalysis = analyzer.analyze(appPrivacyAssessment);

// Use in UI
console.log(`Your app is VU Level ${appPrivacyAnalysis.level}`);
console.log(`Privacy Score: ${appPrivacyAnalysis.score}/100`);

// Get brutally honest summary
console.log(analyzer.getBrutalSummary(appPrivacyAnalysis));
```

---

## 🔄 React Integration

For React apps (framework-agnostic core):

```tsx
// src/hooks/usePrivacyLevel.ts
import { useState, useEffect } from 'react';
import { VuPrivacyChecker, PrivacyLevelConfig } from './lib/vu-privacy-checker/src';

const checker = new VuPrivacyChecker({
  // ... your config
});

export function usePrivacyLevel(pathname: string): PrivacyLevelConfig {
  const [config, setConfig] = useState(() => checker.getConfigForPath(pathname));
  
  useEffect(() => {
    setConfig(checker.getConfigForPath(pathname));
  }, [pathname]);
  
  return config;
}

// src/components/PrivacyBadge.tsx
import { usePrivacyLevel } from '../hooks/usePrivacyLevel';
import { LEVEL_COLORS, LEVEL_EMOJIS } from '../lib/vu-privacy-checker/src';

export function PrivacyBadge({ pathname }: { pathname: string }) {
  const config = usePrivacyLevel(pathname);
  const color = LEVEL_COLORS[config.level];
  const emoji = LEVEL_EMOJIS[config.level];
  
  return (
    <button 
      className="vu-badge"
      style={{
        '--badge-color': color.color,
        '--badge-color-rgb': color.colorRgb
      } as React.CSSProperties}
      title={`${emoji} ${config.levelName}`}
    >
      V{config.level === 'subzero' ? '∅' : config.level}
    </button>
  );
}
```

---

## 🛠️ Advanced Configuration

### Custom Level Names

```typescript
const checker = new VuPrivacyChecker({
  customLevelNames: {
    0: 'Maximum Privacy',
    1: 'Device-Only',
    2: 'Encrypted Cloud',
    subzero: 'Elite'
  }
});
```

### Custom Colors

```typescript
const checker = new VuPrivacyChecker({
  customColors: {
    0: { color: '#00ff88', colorRgb: '0, 255, 136', colorDark: '#00cc6a' },
    subzero: { color: '#ff00ff', colorRgb: '255, 0, 255', colorDark: '#cc00cc' }
  }
});
```

### Strict Mode

Enable stricter privacy scoring:

```typescript
const analyzer = new VuPrivacyAnalyzer({ strictMode: true });
```

---

## 📝 Route Patterns

The checker supports various route patterns:

```typescript
const checker = new VuPrivacyChecker({
  routes: {
    '/': { level: 1 },                    // Exact match
    '/apps/*': { level: 1 },              // Wildcard
    '/users/:id': { level: 2 },           // Dynamic segments
    '/account': { level: 2 },             // Also matches /account/*
    '/api/*': { level: 3 }                // API routes
  }
});

// Pattern matching examples:
checker.getConfigForPath('/');              // Exact match → level 1
checker.getConfigForPath('/apps');          // Matches '/apps/*' → level 1
checker.getConfigForPath('/apps/my-app');   // Matches '/apps/*' → level 1
checker.getConfigForPath('/users/123');     // Matches '/users/:id' → level 2
checker.getConfigForPath('/account/settings'); // Falls back to '/account' → level 2
checker.getConfigForPath('/unknown');       // Uses defaultLevel → level 2
```

---

## 🎯 Event Handling

Listen for privacy level changes:

```typescript
const checker = new VuPrivacyChecker({ /* config */ });

const unsubscribe = checker.onChange((event) => {
  console.log(`Privacy level changed: ${event.previousLevel} → ${event.currentLevel}`);
  console.log(`Path: ${event.path}`);
  
  // Track for analytics (privacy-preserving of course!)
  if (event.currentLevel <= 1) {
    console.log('User is on a high-privacy page');
  }
});

// Later: unsubscribe when done
unsubscribe();
```

---

## 🧪 Testing

### Unit Test Example

```typescript
// tests/privacy.test.ts
import { describe, it, expect } from 'vitest';
import { VuPrivacyChecker, VuPrivacyAnalyzer } from '../lib/vu-privacy-checker/src';

describe('Privacy Checker', () => {
  const checker = new VuPrivacyChecker({
    routes: {
      '/': { level: 1 },
      '/account': { level: 2 }
    }
  });

  it('returns correct level for homepage', () => {
    const config = checker.getConfigForPath('/');
    expect(config.level).toBe(1);
    expect(config.levelName).toBe('Local-First');
  });

  it('returns default level for unknown routes', () => {
    const config = checker.getConfigForPath('/unknown');
    expect(config.level).toBe(2); // Default
  });
});

describe('Privacy Analyzer', () => {
  const analyzer = new VuPrivacyAnalyzer();

  it('gives high score for local-only app', () => {
    const analysis = analyzer.analyze({
      collectsUserData: false,
      dataTypesCollected: ['none'],
      dataLeavesDevice: false,
      encryptionType: 'end_to_end',
      // ... minimal assessment
    });
    
    expect(analysis.score).toBeGreaterThan(80);
    expect(analysis.level).toBeLessThanOrEqual(1);
  });

  it('penalizes Google Analytics', () => {
    const analysis = analyzer.analyze({
      usesAnalytics: true,
      analyticsType: 'google_analytics',
      // ... other fields
    });
    
    const hasAnalyticsFlag = analysis.redFlags.some(
      f => f.description.toLowerCase().includes('google')
    );
    expect(hasAnalyticsFlag).toBe(true);
  });
});
```

---

## 🚨 Common Issues

### Issue: Badge not showing

Make sure you've imported the Svelte component correctly:
```svelte
<script>
  // Correct import path
  import { VuPrivacyBadge } from '$lib/vu-privacy-checker/svelte';
</script>
```

### Issue: TypeScript errors

Ensure your `tsconfig.json` includes the library:
```json
{
  "compilerOptions": {
    "paths": {
      "$lib/*": ["src/lib/*"]
    }
  }
}
```

### Issue: CSS not loading

The Svelte component includes scoped styles. For vanilla JS, include the styles manually or use the generated CSS variables.

---

## 📚 Additional Resources

- **README.md** - Full API documentation
- **examples/vanilla.html** - Plain HTML/JS example
- **examples/svelte-example/** - SvelteKit integration example
- **src/types.ts** - All TypeScript interfaces

---

## 🤝 Contributing

When adding new features:

1. Update `types.ts` with new interfaces
2. Update `constants.ts` if adding new levels/penalties
3. Add tests in `examples/` or a `tests/` folder
4. Update `README.md` and this guide
5. Maintain brutally honest privacy assessment

---

**Built with 🛡️ by VU Labs**

*Privacy should be verifiable, not just claimed.*

