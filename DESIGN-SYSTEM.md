# VuAppStore Design System

**Version**: 0.0.1  
**Last Updated**: 2024  
**Purpose**: Single source of truth for pixel-perfect component recreation and extension  
**Target Audience**: AI assistants, developers, designers

---

## 1. PROJECT OVERVIEW

### Identity
- **Name**: VuAppStore
- **Version**: 0.0.1
- **Description**: Privacy-first app marketplace showcasing 30+ zero-knowledge applications
- **Purpose**: First app marketplace where privacy isn't a feature—it's the foundation
- **Target Audience**: Privacy-conscious users, developers, enterprises
- **URLs**: 
  - Development: `http://localhost:3700`
  - Production: `https://vuappstore.com`

### Repository Structure
- **Type**: Single SvelteKit application
- **Key Directories**:
  - `/src/routes/` - Page routes and layouts
  - `/src/lib/components/` - Reusable components
  - `/src/lib/stores/` - State management
  - `/src/lib/data/` - Static data (apps database)
  - `/src/lib/utils/` - Utility functions
  - `/src/lib/server/` - Server-side code (Stripe integration)
  - `/static/` - Static assets (icons, manifest, service worker)
  - `/prisma/` - Database schema

---

## 2. TECHNOLOGY STACK

### Core

| Layer | Technology | Version | Notes |
|-------|------------|---------|-------|
| Framework | SvelteKit | 2.47.1 | Build tool: Vite 7.1.10 |
| Language | TypeScript | 5.9.3 | Strict mode enabled |
| Styling | Tailwind CSS | 3.4.18 | Custom design system, PostCSS |
| State | Svelte Stores | 5.41.0 | Writable/readable stores, localStorage persistence |
| Database | PostgreSQL | 14+ | ORM: Prisma 6.18.0 |
| Auth | JWT (planned) | - | Currently public marketplace |

### Key Libraries

- **UI Components**: bits-ui 2.14.2, lucide-svelte 0.552.0
- **Styling Utilities**: clsx 2.1.1, tailwind-merge 3.3.1, tailwind-variants 3.1.1
- **Animations**: GSAP 3.13.0, svelte-motion 0.12.2, svelte-intersection-observer 1.0.0
- **Validation**: Zod 4.1.12
- **HTTP**: Native fetch (SvelteKit)
- **Icons**: Lucide Svelte (comprehensive icon set)
- **Theme**: mode-watcher 1.1.0
- **Meta Tags**: svelte-meta-tags 4.5.0

### Infrastructure

- **Hosting**: Vercel/Netlify (adapter-auto)
- **CI/CD**: Not configured (manual deployment)
- **Monitoring**: Not configured (privacy-first, no analytics)
- **Payment**: Stripe (currently disabled, crypto-only planned)

---

## 3. DESIGN TOKENS

### Colors

```css
/* Primary Colors */
--color-primary: #00d4ff;              /* Cyan - Main brand color */
--color-primary-dark: #0099cc;        /* Darker cyan for hover states */
--color-background: #000000;          /* Pure black background */
--color-surface: rgba(0, 0, 0, 0.6);  /* Semi-transparent surface */
--color-glass: rgba(255, 255, 255, 0.05);      /* Glass morphism base */
--color-glass-heavy: rgba(255, 255, 255, 0.08); /* Glass morphism hover */

/* Text Colors */
--color-text-primary: #ffffff;         /* Primary text */
--color-text-secondary: #888888;       /* Secondary text */
--color-text-tertiary: #666666;        /* Tertiary text */

/* Border Colors */
--color-border: rgba(255, 255, 255, 0.1);        /* Default border */
--color-border-hover: rgba(255, 255, 255, 0.2);  /* Hover border */
--color-accent-border: rgba(0, 212, 255, 0.1);  /* Accent border */

/* Semantic Colors */
--color-success: #22c55e;              /* Green - Success states */
--color-warning: #ffa500;               /* Orange - Warning states */
--color-error: #ef4444;                 /* Red - Error states */
--color-info: #3b82f6;                  /* Blue - Info states */

/* Payment Colors (Stripe-friendly) */
--color-stripe-blue: #635BFF;
--color-trust-green: #00D924;
--color-secure-gold: #FFB800;
```

**Usage Context**:
- `primary`: Buttons, links, accents, CTAs
- `background`: Main page background
- `glass`: Card backgrounds, modal overlays
- `text-primary`: Headings, important text
- `text-secondary`: Body text, descriptions
- `text-tertiary`: Captions, metadata
- `border`: Card borders, dividers
- `success`: Privacy badges, positive indicators
- `error`: Privacy level warnings, errors

### Typography

```css
/* Font Families */
--font-primary: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'IBM Plex Mono', Monaco, monospace;

/* Font Weights */
--font-thin: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-black: 900;

/* Font Sizes (Mobile-first) */
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
--text-5xl: 3rem;        /* 48px */
--text-6xl: 3.75rem;     /* 60px */
--text-7xl: 4.5rem;      /* 72px */

/* Line Heights */
--leading-none: 1;
--leading-tight: 1.1;
--leading-snug: 1.2;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;

/* Letter Spacing */
--tracking-tighter: -0.05em;
--tracking-tight: -0.025em;
--tracking-normal: 0;
--tracking-wide: 0.025em;
--tracking-wider: 0.05em;
--tracking-widest: 0.1em;
```

**Typography Scale**:
- **Hero Headings**: `text-2xl sm:text-3xl md:text-4xl lg:text-5xl` (32px → 72px)
- **Section Headings**: `text-xl md:text-2xl lg:text-3xl` (20px → 36px)
- **Body Text**: `text-sm sm:text-base md:text-lg` (14px → 18px)
- **Captions**: `text-xs sm:text-sm` (12px → 14px)

### Spacing & Layout

```css
/* Spacing Scale (Tailwind default) */
--space-0: 0;
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-5: 1.25rem;    /* 20px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
--space-24: 6rem;      /* 96px */

/* Border Radius */
--radius-none: 0;
--radius-sm: 0.25rem;   /* 4px */
--radius-md: 0.5rem;    /* 8px */
--radius-lg: 0.75rem;   /* 12px */
--radius-xl: 1rem;      /* 16px */
--radius-2xl: 1.5rem;   /* 24px */
--radius-full: 9999px;

/* Shadows */
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25);

/* Z-Index Scale */
--z-base: 1;
--z-dropdown: 100;
--z-sticky: 200;
--z-fixed: 300;
--z-modal-backdrop: 9998;
--z-modal: 9999;
--z-popover: 10000;
--z-tooltip: 10001;
```

### Breakpoints

```css
/* Responsive Breakpoints */
--breakpoint-xs: 320px;   /* Extra small phones */
--breakpoint-sm: 375px;   /* Small phones (iPhone SE) */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Small laptops */
--breakpoint-xl: 1280px;   /* Laptops */
--breakpoint-2xl: 1536px; /* Large screens */
--breakpoint-3xl: 1920px;  /* Ultra-wide */
```

**Container Max Widths**:
- Default: `max-w-7xl` (1280px)
- Mobile padding: `1rem` (16px)
- Tablet padding: `1.5rem` (24px)
- Desktop padding: `2rem` (32px)

### Motion

```css
/* Easing Functions */
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Durations */
--duration-75: 75ms;
--duration-100: 100ms;
--duration-200: 200ms;
--duration-300: 300ms;
--duration-500: 500ms;
--duration-700: 700ms;
--duration-1000: 1000ms;

/* Transitions */
--transition-base: all 200ms ease;
--transition-colors: color 200ms ease, background-color 200ms ease, border-color 200ms ease;
--transition-transform: transform 200ms ease;
```

**Animations**:
- `grid-move`: 60s linear infinite (background grid)
- `spotlight`: 25s ease-in-out infinite (ambient light)
- `float`: 3s ease-in-out infinite (floating elements)
- `pulse-slow`: 3s ease-in-out infinite (pulsing badges)

---

## 4. COMPONENT LIBRARY

### Component: Header

**Path**: `/src/lib/components/layout/Header.svelte`

**Purpose**: Main navigation bar with logo, navigation links, search, and account access

**Props**: None (uses SvelteKit `$page` store for active state)

**Styling Specs**:
- **Background**: `rgba(0, 0, 0, 0.8)` with `backdrop-filter: blur(20px)`
- **Height**: `py-2 md:py-3 lg:py-4` (responsive vertical padding)
- **Border**: `border-b border-white/10`
- **Scrolled State**: `background: rgba(0, 0, 0, 0.95)` with `box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3)`
- **Logo**: `w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10` with `bg-primary rounded-md md:rounded-lg`
- **Nav Tabs**: `px-4 py-2 rounded-lg` with active state `bg-white/5`
- **Icon Buttons**: `w-32px h-32px sm:w-36px sm:h-36px md:w-40px md:h-40px` (touch-friendly 44px minimum)

**States**:
- **Default**: Transparent background with blur
- **Scrolled**: Darker background with shadow
- **Active Nav Tab**: `bg-white/5` background

**Responsive**:
- **Mobile (< 1024px)**: Horizontal scroll nav hidden, icon-only buttons
- **Desktop (≥ 1024px)**: Full navigation tabs visible, larger touch targets

**Usage Example**:
```svelte
<Header />
```

**Accessibility**: 
- ARIA labels on icon buttons
- Keyboard navigation support
- Focus management for search modal

**Dependencies**: 
- `SearchModal` component
- `ThemeToggle` component
- `$page` store from SvelteKit

---

### Component: Footer

**Path**: `/src/lib/components/layout/Footer.svelte`

**Purpose**: Site footer with links, trust badges, payment methods, and theme/language controls

**Props**: None

**Styling Specs**:
- **Layout**: `grid grid-cols-1 lg:grid-cols-6 gap-8`
- **Background**: Inherits from body (black)
- **Border**: `border-t border-border`
- **Padding**: `pt-12 pb-6`
- **Brand Section**: `lg:col-span-2` with logo and tagline
- **Link Sections**: 4 columns with `space-y-3` vertical spacing
- **Links**: `text-sm text-text-secondary hover:text-text-primary transition-colors`
- **Featured Links**: `text-primary font-semibold` (e.g., Privacy Levels)

**States**:
- **Default**: All links secondary color
- **Hover**: Links transition to primary color
- **Active**: Current page link highlighted with primary color

**Responsive**:
- **Mobile**: Single column, stacked sections
- **Desktop**: 6-column grid layout

**Usage Example**:
```svelte
<Footer />
```

**Accessibility**:
- Semantic HTML (`<footer>`, `<nav>`, `<ul>`)
- External links marked with `rel="noopener noreferrer"`
- Language selector accessible via keyboard

**Dependencies**:
- `ThemeToggle` component
- `initTranslation` utility
- Translation store

---

### Component: SearchModal

**Path**: `/src/lib/components/search/SearchModal.svelte`

**Purpose**: Full-screen search modal with app filtering and keyboard navigation

**Props**:
```typescript
interface Props {
  isOpen: boolean;        // Modal visibility
  onClose: () => void;   // Close handler function
}
```

**Styling Specs**:
- **Backdrop**: `rgba(0, 0, 0, 0.8)` with `backdrop-filter: blur(8px)`
- **Modal**: `max-w-640px` width, `max-h-80vh` height
- **Border**: `border border-white/10 rounded-16px`
- **Shadow**: `box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5)`
- **Input**: `bg-glass border-2 border-border rounded-12px` with focus `border-primary`
- **Results**: `max-h-50vh overflow-y-auto` with custom scrollbar
- **App Result**: `bg-glass border border-border rounded-12px` with hover `bg-primary/10 border-primary`

**States**:
- **Closed**: `opacity: 0`, `transform: translateY(-50px)`
- **Open**: `opacity: 1`, `transform: translateY(0)`
- **Selected Result**: `bg-primary/10 border-primary transform: translateX(4px)`

**Responsive**:
- **Mobile**: `w-95%`, smaller padding, compact results
- **Desktop**: `w-90% max-w-640px`, full padding

**Usage Example**:
```svelte
<SearchModal isOpen={showSearch} onClose={() => showSearch = false} />
```

**Accessibility**:
- `role="dialog"` with `aria-modal="true"`
- Keyboard navigation (Arrow keys, Enter, Escape)
- Focus trap when open
- Screen reader announcements

**Dependencies**:
- `getAllApps` from `$lib/data/apps`
- Svelte transitions (`fade`, `fly`)

---

### Component: PrivacyShieldBadge

**Path**: `/src/lib/components/privacy/PrivacyShieldBadge.svelte`

**Purpose**: Fixed bottom-left badge showing zero-tracking guarantee with expandable details

**Props**: None

**Styling Specs**:
- **Position**: `fixed bottom-20px left-20px z-999`
- **Badge**: `bg-gradient-to-br from-success/90 to-primary/90` with `border-radius: 30px`
- **Padding**: `px-16px py-10px`
- **Shadow**: `box-shadow: 0 4px 20px rgba(34, 197, 94, 0.3)`
- **Dropdown**: `w-320px` with `bg-gradient-to-br from-black/98 to-blue-900/98`
- **Border**: `border border-success/30 rounded-16px`

**States**:
- **Collapsed**: Badge only, hover shows glow effect
- **Expanded**: Dropdown appears above badge with privacy facts
- **Hover**: `transform: translateY(-2px) scale(1.02)`

**Responsive**:
- **Mobile**: `bottom-70px left-10px`, dropdown `w-calc(100vw - 20px) max-w-320px`

**Usage Example**:
```svelte
<PrivacyShieldBadge />
```

**Accessibility**:
- `aria-label="Privacy Shield - Zero Tracking Guarantee"`
- Keyboard accessible expand/collapse
- High contrast for readability

**Dependencies**: None (self-contained)

---

### Component: ThemeToggle

**Path**: `/src/lib/components/theme/ThemeToggle.svelte`

**Purpose**: Toggle between Modern and Brutalist themes

**Props**:
```typescript
interface Props {
  variant?: 'header' | 'footer';  // Placement context
  showLabel?: boolean;            // Show "Theme" label
}
```

**Styling Specs**: Inherits from context (header/footer)

**States**: Toggles `theme-modern` / `theme-brutalist` classes on `<body>`

**Usage Example**:
```svelte
<ThemeToggle variant="header" showLabel={false} />
```

**Dependencies**:
- `currentTheme` store from `$lib/stores/theme`

---

### Component: GlassCard

**CSS Class**: `.glass-card`

**Purpose**: Reusable glass morphism card component

**Styling Specs**:
- **Background**: `bg-white/5` with `backdrop-blur-sm`
- **Border**: `border border-white/10`
- **Border Radius**: `rounded-16px md:rounded-24px` (responsive)
- **Padding**: Context-dependent (typically `p-4 md:p-6 lg:p-8`)
- **Hover**: `bg-white/10 border-white/20`
- **Transition**: `transition-all duration-200`

**Usage Example**:
```html
<div class="glass-card p-6">
  <!-- Content -->
</div>
```

---

### Component: Button

**CSS Classes**: `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-lg`

**Purpose**: Consistent button styling across the application

**Styling Specs**:
- **Base**: `.btn` - `inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200`
- **Mobile**: `px-4 py-3 text-sm min-h-44px` (touch-friendly)
- **Desktop**: `px-6 py-3 text-base`
- **Primary**: `.btn-primary` - `bg-cyan-400 text-black hover:bg-cyan-600 hover:-translate-y-0.5`
- **Secondary**: `.btn-secondary` - `bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20`
- **Large**: `.btn-lg` - `px-8 py-4 text-lg min-h-48px`

**States**:
- **Default**: Base styling
- **Hover**: Background change, slight transform (`-translate-y-0.5`)
- **Focus**: Outline ring (browser default)
- **Disabled**: `opacity-50 cursor-not-allowed`

**Usage Example**:
```html
<button class="btn btn-primary">Get Started</button>
<button class="btn btn-secondary">Learn More</button>
```

---

## 5. PAGE LAYOUTS

### Page: Homepage (`/`)

**Files**: `+page.svelte`

**Auth**: Public

**Layout Structure**:
```
┌─────────────────────────────────────┐
│ Header (sticky)                     │
├─────────────────────────────────────┤
│ Hero Section                        │
│ - Badge                             │
│ - Heading (text-gradient)           │
│ - Description                       │
│ - Trust Indicators (4 items)        │
├─────────────────────────────────────┤
│ VU Suite Spotlight                  │
│ - Glass Card                        │
│ - Pricing Info                      │
│ - Mini App Grid (3x3)               │
├─────────────────────────────────────┤
│ Privacy Champions (horizontal)    │
│ - Scrollable card row               │
├─────────────────────────────────────┤
│ New & Noteworthy (grid)              │
│ - 2-column grid                     │
├─────────────────────────────────────┤
│ Privacy Levels CTA                  │
│ - Large glass card                  │
│ - Level preview cards (6)           │
├─────────────────────────────────────┤
│ Categories (6-column grid)          │
├─────────────────────────────────────┤
│ Trust Indicators (stats)             │
├─────────────────────────────────────┤
│ Compliance Badges                   │
├─────────────────────────────────────┤
│ Footer                              │
└─────────────────────────────────────┘
```

**Components Used**:
- `Header` - Navigation
- `Footer` - Site footer
- `VuLabsCertified` - Badge component
- `PrivacyShieldBadge` - Privacy indicator
- `AntiCookieBanner` - Cookie notice (hidden, privacy-first)
- `PrivacyInspector` - Privacy verification tool

**Data Flow**:
```typescript
// Data loaded from static file
import { getAllApps, getFeaturedApps, getPrivacyChampions } from '$lib/data/apps';

const featuredApps = getFeaturedApps();        // Top 4 by downloads
const privacyChampions = getPrivacyChampions(); // Top 6 privacy level 5 apps
const newAndNoteworthy = getAllApps()
  .filter(app => app.status === 'available')
  .slice(0, 4);
```

**SEO**:
- Title: "VuAppStore - Privacy-First App Marketplace"
- Description: "Your Apps. Your Data. Your Life. Zero Surveillance."
- Meta tags: Privacy headers (`vu-privacy`, `vu-tracking`, `vu-analytics`)

**States**:
- **Loading**: None (static data)
- **Error**: None (static data)
- **Empty**: Fallback to default apps

---

### Page: Apps Listing (`/apps`)

**Files**: `+page.svelte`

**Auth**: Public

**Layout Structure**:
```
┌─────────────────────────────────────┐
│ Header                              │
├─────────────────────────────────────┤
│ Page Header                         │
│ - Title                             │
│ - Filter/Search Controls           │
├─────────────────────────────────────┤
│ App Grid                            │
│ - Responsive grid (1/2/3/4 cols)    │
│ - App Cards                         │
├─────────────────────────────────────┤
│ Footer                              │
└─────────────────────────────────────┘
```

**Components Used**:
- App cards with icon, name, description, privacy level, pricing

**Data Flow**:
```typescript
import { getAllApps } from '$lib/data/apps';
const apps = getAllApps();
// Filter by category/privacy level from URL params
```

---

### Page: App Detail (`/apps/[slug]`)

**Files**: `[slug]/+page.svelte`

**Auth**: Public

**Layout Structure**:
```
┌─────────────────────────────────────┐
│ Header                              │
├─────────────────────────────────────┤
│ App Hero                            │
│ - Large Icon                        │
│ - Name & Tagline                    │
│ - Privacy Level Badge               │
│ - Pricing Tiers                     │
│ - CTA Buttons                       │
├─────────────────────────────────────┤
│ App Details                         │
│ - Long Description                  │
│ - Features Grid                     │
│ - Tech Stack                        │
│ - Screenshots/Gallery               │
├─────────────────────────────────────┤
│ Related Apps                        │
├─────────────────────────────────────┤
│ Footer                              │
└─────────────────────────────────────┘
```

**Data Flow**:
```typescript
import { getAppById } from '$lib/data/apps';
const app = getAppById(params.slug);
```

---

## 6. NAVIGATION & ROUTING

### Route Tree

```
/                           # Homepage
├── /apps                   # All apps listing
│   └── /apps/[slug]        # Individual app page
├── /pricing                # Pricing page
├── /privacy-levels         # Privacy levels explanation
├── /vu-store              # VU Store marketplace
├── /vutoken               # VU Token information
├── /about                 # About page
│   ├── /about/mission     # Mission statement
│   └── /about/team        # Team page
├── /developers            # Developer portal
│   ├── /developers/api    # API documentation
│   ├── /developers/docs   # Technical docs
│   ├── /developers/contribute  # Contribution guide
│   └── /developers/bug-bounty  # Bug bounty program
├── /resources             # Educational resources
│   ├── /resources/privacy-guide
│   ├── /resources/security-best-practices
│   ├── /resources/comparison
│   ├── /resources/migration
│   └── /resources/educational
├── /support              # Support center
│   ├── /support/contact  # Contact form
│   └── /support/faq      # FAQ
├── /legal                # Legal pages
│   ├── /legal/terms      # Terms of Service
│   ├── /legal/privacy    # Privacy Policy
│   ├── /legal/refund     # Refund Policy
│   ├── /legal/acceptable-use
│   ├── /legal/gdpr       # GDPR Compliance
│   ├── /legal/ccpa       # CCPA Compliance
│   └── /legal/data-processing
├── /account              # User account (protected)
│   ├── /account/subscriptions
│   ├── /account/downloads
│   └── /account/settings
├── /affiliate           # Affiliate program
├── /blog                # Blog
└── /offline             # Offline page (PWA)
```

**Auth Requirements**:
- **Public**: All routes except `/account/*`
- **Protected**: `/account/*` (future JWT auth)

**Layouts**:
- **Root Layout** (`+layout.svelte`): Header, Footer, Privacy components, PWA prompt
- **Legal Layout** (`legal/+layout.svelte`): Specialized layout for legal pages

**Nav Items** (Desktop):
- Discover (`/`)
- All Apps (`/apps`)
- Pricing (`/pricing`)
- Developers (`/developers`)

**Nav Items** (Mobile):
- Icon buttons only (Search, Account)
- Hamburger menu (future implementation)

---

## 7. STATE MANAGEMENT

### Store: Theme

**Path**: `/src/lib/stores/theme.ts`

**Type**: `writable<Theme>`

**Interface**:
```typescript
type Theme = 'modern' | 'brutalist';
```

**Initial State**: `'modern'` (or from localStorage)

**Actions**:
- `toggleTheme()`: Switch between modern and brutalist
- `setTheme(theme: Theme)`: Set specific theme
- `getTheme()`: Get current theme (non-reactive)

**Subscribers**: 
- `ThemeToggle` component
- Body class updates (automatic)

**Persistence**: `localStorage` key `'vu-theme'`

---

### Store: Translations

**Path**: `/src/lib/stores/translations.ts`

**Type**: Static object (not a store)

**Interface**:
```typescript
type Language = 'en' | 'es' | 'fr';
const translations: Record<Language, Record<string, string>>;
```

**Initial State**: English (`'en'`)

**Actions**:
- `t(key: string, lang?: Language)`: Get translation
- `getCurrentLanguage()`: Get saved language
- `setLanguage(lang: Language)`: Set language

**Subscribers**: 
- Components using `data-i18n` attribute
- Footer language selector

**Persistence**: `localStorage` key `'vu-language'`

---

## 8. FORMS & VALIDATION

**Validation Library**: Zod 4.1.12

**Schema Location**: Inline in components or `/src/lib/schemas/` (future)

**Standard Form Structure**:
```svelte
<form on:submit={handleSubmit}>
  <label>
    <span>Label</span>
    <input 
      type="text" 
      bind:value={formData.field}
      class="input"
      aria-invalid={errors.field ? 'true' : 'false'}
    />
    {#if errors.field}
      <span class="error">{errors.field}</span>
    {/if}
  </label>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

**Error Display Pattern**:
- Red text (`text-error`)
- Below input field
- `aria-invalid` attribute for accessibility

**Form Components**:
- Native HTML inputs with Tailwind styling
- Custom styling via `@tailwindcss/forms` plugin

---

## 9. API INTEGRATION

**Client Config**: 
- Base URL: Relative paths (SvelteKit handles routing)
- Headers: `Content-Type: application/json` (default)
- Auth: None currently (public marketplace)
- Error Handling: Try-catch with user-friendly messages

**Endpoints** (Future/Planned):

| Method | Path | Purpose | Auth |
|--------|------|---------|------|
| POST | `/api/subscribe` | Create subscription | JWT |
| GET | `/api/user` | Get user data | JWT |
| POST | `/api/support` | Submit support ticket | JWT |
| GET | `/api/apps` | Get apps (currently static) | Public |

**Implementation Location**: `/src/routes/api/` (future)

**Current State**: All data is static from `/src/lib/data/apps.ts`

---

## 10. AUTH & SECURITY

**Auth Strategy**: Planned JWT authentication (not yet implemented)

**Token Storage**: HttpOnly cookies (planned)

**User Object Structure** (Prisma schema):
```typescript
{
  id: string;
  email: string;
  name?: string;
  tosAcceptedAt?: DateTime;
  gdprConsent: boolean;
  ccpaOptOut: boolean;
  subscriptions: Subscription[];
}
```

**Role Definitions**: Not implemented (single user type planned)

**Security Measures**:
- **CSRF**: SvelteKit built-in protection
- **XSS**: Svelte auto-escaping
- **Rate Limiting**: Not implemented (future)
- **CORS**: SvelteKit handles (same-origin by default)
- **Privacy**: Zero tracking, zero cookies, zero analytics

---

## 11. ERROR HANDLING

**Error Page**: `/src/routes/+error.svelte` (SvelteKit default)

**Error Types Handled**:
- 404: Not found page
- 500: Server error page
- Network errors: User-friendly messages

**Toast/Notification**: Not implemented (privacy-first, no popups)

**Error Logging**: None (privacy-first, no server-side logging)

---

## 12. PERFORMANCE & ACCESSIBILITY

### Performance

**Code Splitting**: 
- SvelteKit automatic route-based splitting
- Dynamic imports for heavy components (future)

**Image Optimization**:
- Static icons in `/static/icons/`
- Lazy loading via `loading="lazy"` (future)

**Caching**:
- Service Worker (`/static/sw.js`) for PWA caching
- Static assets cached by browser

**Bundle Optimization**:
- Vite production build with minification
- Tree-shaking enabled
- Tailwind CSS purging (automatic)

### Accessibility

**WCAG Target**: AA compliance

**Keyboard Navigation**:
- All interactive elements keyboard accessible
- Focus management in modals
- Skip links (future)

**Screen Reader Support**:
- Semantic HTML (`<nav>`, `<main>`, `<footer>`)
- ARIA labels on icon buttons
- Alt text on images (when added)

**Contrast Compliance**:
- Text on black: `#ffffff` (21:1 contrast)
- Primary buttons: `#00d4ff` on black (4.5:1+)
- Secondary text: `#888888` (meets AA for large text)

---

## 13. DEVELOPMENT & DEPLOYMENT

### Local Setup

```bash
# Prerequisites
Node.js 18+
PostgreSQL 14+ (for database)
npm or pnpm

# Installation
cd vuappstore
npm install

# Environment Setup
cp .env.example .env
# Edit .env with your configuration

# Database Setup (if using)
npx prisma generate
npx prisma db push

# Development Server
npm run dev
# Runs on http://localhost:3700
```

### Environment Variables

```env
# Database (optional, currently static data)
DATABASE_URL="postgresql://user:password@localhost:5432/vuappstore"

# Stripe (optional, currently disabled)
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Code Style

**ESLint**: Not configured (SvelteKit default)

**Prettier**: Not configured (manual formatting)

**Pre-commit Hooks**: Not configured

**Conventions**:
- Components: PascalCase (`Header.svelte`)
- Files: kebab-case (`app-card.svelte`)
- Functions: camelCase
- CSS Classes: Tailwind utilities

### Git

**Branch Strategy**: Main branch (no branching strategy defined)

**Commit Convention**: Not enforced

### Build & Deploy

**Build Command**:
```bash
npm run build
```

**Output**: `.svelte-kit/` directory

**Hosting**: 
- Vercel (recommended, adapter-auto)
- Netlify (adapter-auto)
- Any Node.js hosting

**CI/CD**: Not configured

**Deploy Steps**:
1. `npm run build`
2. Deploy `.svelte-kit/` to hosting platform
3. Configure environment variables
4. Set up database (if using)

---

## 14. INTEGRATIONS & BROWSER SUPPORT

### Third-party Services

**Stripe** (Currently disabled):
- Purpose: Payment processing
- Auth Method: API keys
- Implementation: `/src/lib/server/stripe.ts`
- Rate Limits: Stripe API limits

**Google Fonts**:
- Purpose: Inter font family
- Auth Method: None (public CDN)
- Implementation: `<link>` in `app.html`
- Rate Limits: None (public)

**No Analytics**: Privacy-first, zero tracking

### Browser Support

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| Chrome | 90+ | Full support |
| Firefox | 88+ | Full support |
| Safari | 14+ | Full support |
| Edge | 90+ | Full support |
| Mobile Safari | 14+ | Full support |
| Chrome Mobile | 90+ | Full support |

**Features Used**:
- CSS Grid (all browsers)
- Flexbox (all browsers)
- Backdrop Filter (Safari 9+, Chrome 76+)
- CSS Custom Properties (all browsers)
- Service Workers (all browsers)

---

## 15. CONVENTIONS & PATTERNS

### File Naming Conventions

- **Components**: PascalCase (`Header.svelte`, `SearchModal.svelte`)
- **Routes**: kebab-case (`+page.svelte`, `[slug]/+page.svelte`)
- **Utilities**: camelCase (`i18n.ts`, `theme.ts`)
- **Data Files**: camelCase (`apps.ts`)

### Import Order

1. Svelte imports (`import { onMount } from 'svelte'`)
2. SvelteKit imports (`import { page } from '$app/stores'`)
3. External libraries (`import { Search } from 'lucide-svelte'`)
4. Internal absolute imports (`import Header from '$lib/components/layout/Header.svelte'`)
5. Relative imports (`import './styles.css'`)
6. Types (`import type { VuApp } from '$lib/data/apps'`)

### Component Structure Template

```svelte
<script lang="ts">
  // 1. Imports
  import { onMount } from 'svelte';
  
  // 2. Props
  export let prop: type;
  
  // 3. State
  let localState = '';
  
  // 4. Computed
  $: computed = prop + localState;
  
  // 5. Functions
  function handleClick() {
    // ...
  }
  
  // 6. Lifecycle
  onMount(() => {
    // ...
  });
</script>

<!-- Markup -->
<div class="component">
  <!-- Content -->
</div>

<style>
  /* Component styles */
  .component {
    /* ... */
  }
</style>
```

### Common Code Patterns

**Reactive Statements**:
```svelte
$: if (condition) {
  // Reactive code
}
```

**Event Handlers**:
```svelte
<button on:click={handleClick}>Click</button>
```

**Conditional Rendering**:
```svelte
{#if condition}
  <div>Content</div>
{/if}
```

**Loops**:
```svelte
{#each items as item, index}
  <div>{item.name}</div>
{/each}
```

**Slots**:
```svelte
<Component>
  <div slot="name">Slot content</div>
</Component>
```

---

## 16. QUICK REFERENCE

### Commands

```bash
# Development
npm run dev              # Start dev server (port 3700)
npm run build           # Build for production
npm run preview         # Preview production build
npm run check           # Type-check with svelte-check
npm run check:watch     # Watch mode type-checking

# PWA
npm run pwa:generate-icons  # Generate PWA icons
npm run pwa:validate        # Validate PWA setup
npm run pwa:audit           # Lighthouse PWA audit
npm run pwa:test            # Build and preview PWA
```

### Key Paths

- **Config**: `vite.config.ts`, `svelte.config.js`, `tailwind.config.js`, `tsconfig.json`
- **Components**: `/src/lib/components/`
- **Utils**: `/src/lib/utils/`
- **Stores**: `/src/lib/stores/`
- **Styles**: `/src/app.css`, `/src/app.postcss`
- **Data**: `/src/lib/data/apps.ts`
- **Routes**: `/src/routes/`
- **Static**: `/static/`
- **Database**: `/prisma/schema.prisma`

### Known Issues

1. **Stripe Integration**: Currently disabled (placeholder functions)
2. **Authentication**: Not implemented (planned JWT)
3. **Analytics**: Intentionally disabled (privacy-first)
4. **Error Boundaries**: Using SvelteKit defaults
5. **Form Validation**: Basic implementation, needs enhancement

### Workarounds

- **Stripe**: Use crypto payments (planned)
- **Auth**: Public access only (temporary)
- **Analytics**: Manual monitoring only

---

## APPENDIX: BRUTALIST THEME

When `body.theme-brutalist` class is active:

**Color Overrides**:
- Background: `#ffffff` (white)
- Text: `#000000` (black)
- Borders: `3px solid #000000`
- Shadows: Hard shadows (`8px 8px 0 0 #000000`)

**Design Principles**:
- No rounded corners (`border-radius: 0`)
- No transitions (`transition: none`)
- No animations (`animation: none`)
- Thick borders (`3px`)
- Hard shadows (offset, no blur)
- Uppercase text (where applicable)
- High contrast (black on white)

**Component Overrides**:
- `.glass-card`: White background, black border, hard shadow
- `.btn-primary`: Black background, white text, no rounded corners
- `.btn-secondary`: Transparent, black border, inverts on hover
- All rounded elements become square
- Grid background removed

---

**END OF DESIGN SYSTEM**

*This document enables pixel-perfect recreation of any component or page in the VuAppStore application. All values are extracted from the actual codebase and represent the current implementation.*

