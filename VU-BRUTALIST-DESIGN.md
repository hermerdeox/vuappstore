# VuSuite Brutalist Design System

**Version:** 1.0.0  
**Last Updated:** October 31, 2024  
**Status:** Production

---

## Table of Contents

1. [Philosophy & Principles](#philosophy--principles)
2. [Design Tokens](#design-tokens)
3. [Components](#components)
4. [Responsive System](#responsive-system)
5. [Dark Mode / Light Mode](#dark-mode--light-mode)
6. [Accessibility](#accessibility)
7. [Implementation](#implementation)

---

## Philosophy & Principles

### Core Principles

1. **Raw Functionality**: Form follows function with no decoration
2. **Brutal Minimalism**: Pure black/white with ONE accent color maximum
3. **Sharp Geometry**: Square corners (0px border-radius) everywhere
4. **Hard Shadows**: Offset shadows with no blur (brutal depth)
5. **Bold Typography**: Monospace or heavy sans-serif for maximum impact
6. **Instant Transitions**: No smooth animations, instant state changes
7. **High Contrast**: Maximum 21:1 contrast for accessibility and boldness

### Design Language

- **Aesthetic**: Raw, exposed, utilitarian digital brutalism
- **Pattern**: Visible structure, hard borders, grid alignment
- **Interaction**: Instant state changes (0ms transitions)
- **Hierarchy**: Bold typography, thick borders, generous whitespace

### Brutalist Manifesto

- **No decoration**: Remove all decorative elements
- **No blur**: No backdrop filters or soft shadows
- **No gradients**: Pure solid colors only
- **No rounded corners**: 0px border-radius everywhere
- **No smooth transitions**: Instant state changes
- **One accent color**: Use ONE pure color sparingly (<10% of UI)
- **Maximum contrast**: Black and white primarily
- **Exposed structure**: Show the bones of the design

---

## Design Tokens

### 1. COLOR SYSTEM

#### Base Colors

```typescript
const baseColors = {
  black: '#000000',           // Pure black - primary background
  white: '#FFFFFF',           // Pure white - primary surface
}
```

**Usage**: 90% of the UI uses only black and white

#### Gray Scale (Limited)

```typescript
const grayScale = {
  900: '#0A0A0A',             // Near black (rarely used)
  800: '#1A1A1A',             // Dark gray (rarely used)
  700: '#2A2A2A',             // Medium dark gray
  500: '#666666',             // Mid gray
  300: '#999999',             // Light gray
  100: '#E5E5E5',             // Very light gray
  50: '#F5F5F5',              // Off-white (for separation)
}
```

**Usage**: Only use when absolutely necessary for subtle differentiation

#### Accent Color (ONE ONLY)

```typescript
const accentColor = {
  // Choose ONE of the following - use SPARINGLY (<10% of UI)
  red: '#FF0000',             // Aggressive, urgent
  green: '#00FF00',           // Positive, tech
  blue: '#0000FF',            // Professional, systematic
  yellow: '#FFFF00',          // Warning, highlight
  // Current VU implementation uses BLACK as accent (inverted)
}
```

**Rule**: Use accent color ONLY for:
- Critical CTAs (maximum 1-2 per page)
- Error states
- Active states (minimal usage)
- Status indicators

#### Text Colors

```typescript
const textColors = {
  primary: '#000000',         // Main text (black on white)
  primaryInverse: '#FFFFFF',  // Main text inverted (white on black)
  secondary: '#4A4A4A',       // Secondary text (use sparingly)
  tertiary: '#666666',        // Tertiary text (rare)
  accent: '#000000',          // Accent text (same as primary in VU)
}
```

#### Background Colors

```typescript
const backgroundColors = {
  base: '#FFFFFF',            // Primary background (white)
  baseInverse: '#000000',     // Primary background inverted (black)
  surface: '#FFFFFF',         // Surface elements
  elevated: '#FFFFFF',        // Modal/dialog backgrounds
}
```

#### Border Colors

```typescript
const borderColors = {
  default: 'rgba(0, 0, 0, 0.2)',    // Standard border
  hover: 'rgba(0, 0, 0, 0.3)',      // Hover border
  active: 'rgba(0, 0, 0, 0.5)',     // Active border
  accent: 'rgba(0, 0, 0, 0.8)',     // Accent border
  thick: '#000000',                  // Heavy border (3px+)
}
```

#### State Colors (Pure RGB)

```typescript
const stateColors = {
  success: {
    default: '#00FF00',       // Pure green
    text: '#000000',          // Black text on green
  },
  error: {
    default: '#FF0000',       // Pure red
    text: '#FFFFFF',          // White text on red
  },
  warning: {
    default: '#FFFF00',       // Pure yellow
    text: '#000000',          // Black text on yellow
  },
  info: {
    default: '#0000FF',       // Pure blue
    text: '#FFFFFF',          // White text on blue
  },
}
```

### 2. TYPOGRAPHY SYSTEM

#### Font Family

```typescript
const fontFamily = {
  // Option 1: Monospace (most brutalist)
  mono: "'IBM Plex Mono', 'Courier New', monospace",
  
  // Option 2: Bold Sans (if not using monospace)
  sans: "'Arial Black', 'Helvetica Neue Bold', sans-serif",
  
  // Option 3: System (current VU implementation)
  system: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  
  // VU Current: Using Inter but with brutalist styling
  body: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  heading: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
}
```

**Current VU Implementation**: Inter font family with brutalist weight/size treatment

#### Font Weights

```typescript
const fontWeight = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  black: 900,                 // Use for maximum impact
}
```

**Usage**: Limit to 3-4 weights: 400, 600, 700, 900

#### Font Sizes (Large Jumps)

```typescript
const fontSize = {
  // Base sizes
  xs: '10px',                 // 0.625rem
  sm: '12px',                 // 0.75rem
  base: '16px',               // 1rem
  md: '18px',                 // 1.125rem
  lg: '24px',                 // 1.5rem
  xl: '32px',                 // 2rem
  
  // Heading sizes (brutalist - large jumps)
  h1: {
    mobile: '24px',           // Mobile headings
    tablet: '32px',
    desktop: '48px',
    large: '64px',
  },
  h2: {
    mobile: '20px',
    tablet: '24px',
    desktop: '32px',
    large: '48px',
  },
  h3: {
    mobile: '18px',
    tablet: '20px',
    desktop: '24px',
    large: '32px',
  },
  
  // Special sizes
  badge: '10px',              // Badge text
  price: '18px',              // Pricing text
  button: {
    small: '12px',
    medium: '14px',
    large: '16px',
  },
}
```

#### Text Transform

```typescript
const textTransform = {
  none: 'none',
  uppercase: 'uppercase',     // Recommended for labels, headings
  lowercase: 'lowercase',
  capitalize: 'capitalize',
}
```

**Usage**: Use UPPERCASE for:
- Button labels
- Badges
- Section headings (optional)
- Navigation labels

#### Line Heights

```typescript
const lineHeight = {
  none: 1,
  tight: 1.2,
  normal: 1.4,                // Default
  relaxed: 1.6,
  loose: 1.8,
}
```

#### Letter Spacing

```typescript
const letterSpacing = {
  tighter: '-0.02em',
  tight: '-0.01em',
  normal: '0',
  wide: '0.05em',             // For uppercase text
  wider: '0.1em',             // For labels
  widest: '0.15em',
  uppercase: '0.05em',        // Standard for uppercase
}
```

### 3. SPACING SYSTEM

**Base Unit**: 4px or 8px (strict multiples)

```typescript
const spacing = {
  0: '0',
  1: '4px',                   // 0.25rem
  2: '8px',                   // 0.5rem
  3: '12px',                  // 0.75rem
  4: '16px',                  // 1rem
  6: '24px',                  // 1.5rem
  8: '32px',                  // 2rem
  12: '48px',                 // 3rem
  16: '64px',                 // 4rem
  24: '96px',                 // 6rem
  32: '128px',                // 8rem
}
```

**Rule**: Use only multiples of 4px or 8px. No fractional values (no 10px, 14px, etc.)

#### Component Spacing

```typescript
const componentSpacing = {
  // Icon wrapper - inside spacing
  iconGap: '10px',
  
  // Button padding (generous)
  button: {
    sm: '8px 16px',
    md: '12px 24px',
    lg: '16px 32px',
  },
  
  // Input padding
  input: {
    sm: '12px 16px',
    md: '14px 20px',
    lg: '16px 24px',
  },
  
  // Card padding (very generous)
  card: {
    sm: '16px 20px',
    md: '24px 32px',
    lg: '32px 48px',
  },
  
  // Grid gaps (generous)
  grid: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
}
```

### 4. BORDER SYSTEM

#### Border Radius

```typescript
const borderRadius = {
  none: '0px',                // ALL elements - no exceptions
  // That's it. No other values.
}
```

**Rule**: All border-radius values are 0px. No exceptions.

#### Border Width

```typescript
const borderWidth = {
  0: '0',
  1: '1px',                   // Thin (rarely used)
  2: '2px',                   // Standard
  3: '3px',                   // Thick (recommended for emphasis)
  4: '4px',                   // Heavy
  8: '8px',                   // Maximum impact
}
```

**Usage**: 
- Standard elements: 2px-3px
- Emphasis/hover: 3px-4px
- Heavy separation: 4px-8px

#### Border Style

```typescript
const borderStyle = {
  solid: 'solid',             // Only solid borders
  // No dashed, dotted, etc.
}
```

#### Border Colors

See [Border Colors](#border-colors) section above.

### 5. SHADOW SYSTEM

**No blur shadows. Only hard offset shadows.**

```typescript
const boxShadow = {
  none: 'none',
  
  // Hard offset shadows (no blur)
  sm: '2px 2px 0 0 #000000',          // Small offset
  md: '4px 4px 0 0 #000000',          // Medium offset
  lg: '8px 8px 0 0 #000000',          // Large offset
  xl: '12px 12px 0 0 #000000',        // Extra large offset
  '2xl': '16px 16px 0 0 #000000',     // Maximum offset
  
  // Double shadow (layered)
  brutal: '4px 4px 0 0 #000000, 8px 8px 0 0 #666666',
  
  // Accent shadow (rare)
  accent: '4px 4px 0 0 [accent-color]',
}
```

**Format**: `offsetX offsetY blur spread color`
- **offsetX**: Horizontal offset (2px - 16px)
- **offsetY**: Vertical offset (2px - 16px)
- **blur**: Always 0
- **spread**: Always 0
- **color**: #000000 or accent color

**Usage**: Use shadows sparingly. Prefer borders for depth.

### 6. OPACITY SYSTEM (Limited)

```typescript
const opacity = {
  0: '0',
  100: '1',
  // Rarely use opacity in brutalist design
  // Prefer solid colors
}
```

**Rule**: Avoid opacity. Use solid colors or grays instead.

### 7. TRANSITION & ANIMATION SYSTEM

#### Duration

```typescript
const duration = {
  none: '0ms',                // Instant - RECOMMENDED
  instant: '0ms',             // Instant
  fast: '50ms',               // Very fast (rare)
  // No other durations
}
```

**Rule**: All transitions should be instant (0ms) or very fast (50ms max).

#### Timing Functions

```typescript
const timingFunctions = {
  linear: 'linear',           // Only linear
  // No ease, ease-in, ease-out, etc.
}
```

#### Transitions

```typescript
const transitions = {
  none: 'none',               // Recommended
  instant: 'all 0ms linear',  // If needed
  fast: 'all 50ms linear',    // Maximum allowed
}
```

**Rule**: Prefer `transition: none` for instant state changes.

#### Keyframe Animations

```typescript
const animations = {
  // NO animations in brutalist design
  // All state changes are instant
  none: 'none',
}
```

**Rule**: Remove all animations. Use instant state changes only.

#### Transform Values

```typescript
const transforms = {
  none: 'none',
  // Minimal transforms, no smooth transitions
  // If used, should be instant
}
```

### 8. Z-INDEX SYSTEM

```typescript
const zIndex = {
  base: 10,                   // Standard content
  header: 10,                 // Header element
  button: 11,                 // Floating buttons
  tabContainer: 100,          // Tab navigation
  modalBackdrop: 1000,        // Modal backdrop
  modal: 1000,                // Modal content
  toast: 10000,               // Toast notifications
}
```

### 9. BACKDROP FILTER

```typescript
const backdropFilter = {
  none: 'none',               // No blur effects
  // Remove all backdrop-filter
}
```

**Rule**: No backdrop blur in brutalist design.

---

## Components

### App Icon Card

**Purpose**: Main app representation with brutalist styling

**Structure**:
```
.icon-container
  â””â”€ .icon-wrapper
     â”œâ”€ .v-letter (main letter)
     â”œâ”€ .ledger-text (bottom text)
  â””â”€ .app-name
  â””â”€ .coming-soon-badge (conditional)
```

**Specs**:

```typescript
const appIconCard = {
  wrapper: {
    aspectRatio: '1:1',
    background: '#FFFFFF',
    backdropFilter: 'none',
    border: '3px solid rgba(0, 0, 0, 0.3)',
    borderRadius: '0px',
    display: 'flex',
    gap: '10px',
    transition: 'none',
    boxShadow: 'none',
  },
  
  // Responsive sizing
  sizes: {
    mobile: 'calc((100vw - 48px) / 2)',
    tablet: 'calc((100vw - 80px) / 3)',
    desktop: 'calc((min(1400px, 100vw) - 160px) / 4)',
    large: 'calc((min(1600px, 100vw) - 200px) / 5)',
    ultra: 'calc((min(2000px, 100vw) - 240px) / 6)',
  },
  
  maxWidth: {
    mobile: '160px',
    tablet: '200px',
    desktop: '240px',
    large: '220px',
    ultra: '260px',
  },
  
  hover: {
    boxShadow: '0 0 0 3px rgba(0, 0, 0, 0.1)',
    // No transform, no scale
  },
  
  active: {
    // No active state animation
  },
}
```

### Coming Soon Badge

**Specs**:

```typescript
const comingSoonBadge = {
  display: 'inline-block',
  marginTop: '8px',
  padding: '4px 8px',
  background: 'transparent',
  border: '2px solid rgba(0, 0, 0, 0.3)',
  borderRadius: '0px',
  color: '#000000',
  fontSize: '10px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  opacity: 1,
  
  // Sizes by breakpoint
  sizes: {
    xs: { fontSize: '8px', padding: '2px 6px' },
    sm: { fontSize: '10px', padding: '3px 8px' },
    md: { fontSize: '11px', padding: '4px 9px' },
    lg: { fontSize: '12px', padding: '4px 10px', marginTop: '10px' },
    xl: { fontSize: '14px', padding: '5px 12px', marginTop: '12px' },
  },
}
```

### Modal System

**Philosophy Modal**:

```typescript
const philosophyModal = {
  backdrop: {
    position: 'fixed',
    background: 'rgba(0, 0, 0, 0.95)',
    backdropFilter: 'none',
    zIndex: 1000,
    // No animation
  },
  
  content: {
    maxWidth: '800px',
    padding: '48px 32px',
    maxHeight: '90vh',
    overflow: 'auto',
    background: '#FFFFFF',
    border: '3px solid #000000',
    borderRadius: '0px',
    // No animation
  },
  
  title: {
    fontSize: '48px',
    fontWeight: 900,
    letterSpacing: '-0.02em',
    marginBottom: '32px',
    color: '#000000',
    textTransform: 'uppercase',
  },
  
  text: {
    fontSize: '16px',
    lineHeight: 1.6,
    marginBottom: '24px',
    color: '#000000',
  },
  
  close: {
    size: '40px',
    background: '#000000',
    border: '2px solid #000000',
    borderRadius: '0px',
    color: '#FFFFFF',
    hover: {
      background: '#FFFFFF',
      color: '#000000',
      // No transform, no rotation
    },
  },
}
```

**Checkout Modal**:

```typescript
const checkoutModal = {
  backdrop: {
    background: 'rgba(0, 0, 0, 0.95)',
    backdropFilter: 'none',
    zIndex: 1000,
  },
  
  content: {
    maxWidth: '1200px',
    width: '95%',
    maxHeight: '90vh',
    background: '#FFFFFF',
    borderRadius: '0px',
    border: '3px solid #000000',
  },
  
  title: {
    fontSize: '32px',
    fontWeight: 900,
    letterSpacing: '-0.01em',
    color: '#000000',
    textTransform: 'uppercase',
  },
  
  subtitle: {
    fontSize: '14px',
    color: '#4A4A4A',
  },
}
```

### Button System

**Philosophy Button**:

```typescript
const philosophyButton = {
  position: 'absolute',
  top: '50%',
  right: '8px',
  transform: 'translateY(-50%)',
  display: 'flex',
  gap: '8px',
  padding: '8px 16px',
  background: '#000000',
  border: '2px solid #FFFFFF',
  borderRadius: '0px',
  fontSize: '10px',
  fontWeight: 700,
  transition: 'none',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: '#FFFFFF',
  
  hover: {
    background: '#FFFFFF',
    color: '#000000',
    // No transform
  },
}
```

**Primary Button**:

```typescript
const primaryButton = {
  base: {
    background: '#000000',
    color: '#FFFFFF',
    border: '3px solid #000000',
    borderRadius: '0px',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    transition: 'none',
    cursor: 'pointer',
  },
  
  hover: {
    background: '#FFFFFF',
    color: '#000000',
    borderColor: '#000000',
    boxShadow: '4px 4px 0 0 #000000',
  },
  
  active: {
    transform: 'translate(2px, 2px)',
    boxShadow: '2px 2px 0 0 #000000',
  },
}
```

**Outline Button**:

```typescript
const outlineButton = {
  base: {
    background: 'transparent',
    color: '#000000',
    border: '3px solid #000000',
    borderRadius: '0px',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    transition: 'none',
    cursor: 'pointer',
  },
  
  hover: {
    background: '#000000',
    color: '#FFFFFF',
  },
}
```

### Tab System

**Specs**:

```typescript
const tabSystem = {
  container: {
    background: '#FFFFFF',
    borderBottom: '3px solid rgba(0, 0, 0, 0.3)',
    backdropFilter: 'none',
    padding: '8px 12px',
    gap: '8px',
  },
  
  tab: {
    padding: '12px 20px',
    background: 'transparent',
    border: '3px solid rgba(0, 0, 0, 0.2)',
    borderRadius: '0px',
    fontSize: '13px',
    fontWeight: 700,
    transition: 'none',
    color: '#000000',
    textTransform: 'uppercase',
    
    hover: {
      background: 'rgba(0, 0, 0, 0.05)',
      borderColor: 'rgba(0, 0, 0, 0.3)',
    },
    
    active: {
      background: 'rgba(0, 0, 0, 0.1)',
      color: '#000000',
      borderColor: 'rgba(0, 0, 0, 0.5)',
    },
  },
}
```

### Grid System

**Specs**:

```typescript
const gridSystem = {
  columns: {
    mobile: 'repeat(2, 1fr)',
    tablet: 'repeat(3, 1fr)',
    desktop: 'repeat(4, 1fr)',
    large: 'repeat(5, 1fr)',
    ultra: 'repeat(6, 1fr)',
  },
  
  gaps: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  
  padding: {
    mobile: '16px 12px',
    tablet: '20px 16px',
    desktop: '24px 40px',
  },
}
```

### Input System

**Specs**:

```typescript
const inputSystem = {
  base: {
    background: '#FFFFFF',
    color: '#000000',
    border: '3px solid rgba(0, 0, 0, 0.2)',
    borderRadius: '0px',
    padding: '14px 20px',
    fontSize: '16px',
    fontFamily: "'Inter', sans-serif",
    transition: 'none',
  },
  
  focus: {
    border: '4px solid #000000',
    outline: 'none',
    boxShadow: 'none',
  },
  
  error: {
    border: '3px solid #FF0000',
    boxShadow: '4px 4px 0 0 #FF0000',
  },
  
  placeholder: {
    color: '#666666',
    fontStyle: 'normal',
  },
}
```

### Card System

**Specs**:

```typescript
const cardSystem = {
  base: {
    background: '#FFFFFF',
    border: '2px solid #000000',
    borderRadius: '0px',
    padding: '32px',
    boxShadow: '8px 8px 0 0 #000000',
  },
  
  hover: {
    boxShadow: '12px 12px 0 0 #000000',
    transform: 'translate(-2px, -2px)',
  },
  
  header: {
    borderBottom: '3px solid #000000',
    paddingBottom: '16px',
    marginBottom: '16px',
    fontSize: '24px',
    fontWeight: 900,
    textTransform: 'uppercase',
  },
  
  footer: {
    borderTop: '3px solid #000000',
    paddingTop: '16px',
    marginTop: '16px',
  },
}
```

---

## Responsive System

### Breakpoints

```typescript
const breakpoints = {
  xs: '320px',                // Very small mobile
  sm: '321px',                // Small mobile
  md: '481px',                // Medium mobile
  lg: '640px',                // Large mobile / Tablet
  xl: '1024px',               // Desktop
  '2xl': '1440px',            // Large desktop
  '3xl': '1920px',            // Ultra-wide
}
```

### Responsive Patterns

#### Icon Sizing (Same as Modern)

```typescript
const responsiveIconSizing = {
  '<=320px': {
    width: 'calc((100vw - 32px) / 2)',
    maxWidth: '130px',
    letter: 'clamp(16px, 6vw, 24px)',
    ledger: 'clamp(4px, 1.4vw, 6px)',
    name: '10px',
  },
  '321-480px': {
    width: 'calc((100vw - 40px) / 2)',
    maxWidth: '140px',
    letter: 'clamp(30px, 11vw, 44px)',
    ledger: 'clamp(7px, 2.4vw, 11px)',
    name: '11px',
  },
  '481-639px': {
    width: 'calc((100vw - 44px) / 2)',
    maxWidth: '150px',
    letter: 'clamp(32px, 12vw, 48px)',
    ledger: 'clamp(8px, 2.5vw, 12px)',
    name: '12px',
  },
  '640-1023px': {
    width: 'calc((100vw - 80px) / 3)',
    maxWidth: '200px',
    letter: 'clamp(38px, 9vw, 56px)',
    ledger: 'clamp(10px, 2.3vw, 14px)',
    name: '13px',
  },
  '1024-1439px': {
    width: 'calc((min(1400px, 100vw) - 160px) / 4)',
    maxWidth: '240px',
    letter: 'clamp(58px, 5.5vw, 76px)',
    ledger: 'clamp(13px, 1.4vw, 18px)',
    name: '18px',
  },
  '1440-1919px': {
    width: 'calc((min(1600px, 100vw) - 200px) / 5)',
    maxWidth: '220px',
    letter: 'clamp(66px, 4.8vw, 80px)',
    ledger: 'clamp(14px, 1.3vw, 19px)',
    name: '19px',
  },
  '>=1920px': {
    width: 'calc((min(2000px, 100vw) - 240px) / 6)',
    maxWidth: '260px',
    letter: 'clamp(76px, 4.5vw, 95px)',
    ledger: 'clamp(16px, 1.1vw, 21px)',
    name: '22px',
  },
}
```

#### Spacing

```typescript
const responsiveSpacing = {
  header: {
    mobile: '8px 50px 6px 10px',
    tablet: '12px 70px 10px 16px',
    desktop: '8px 80px 6px 20px',
  },
  
  grid: {
    mobile: '12px 10px',
    tablet: '20px 16px',
    desktop: '24px 40px',
  },
  
  footer: {
    mobile: '10px 10px 14px',
    tablet: '12px 16px 16px',
    desktop: '8px 20px 10px',
  },
}
```

---

## Dark Mode / Light Mode

**Current Implementation**: Brutalist theme uses **light mode by default** (white background, black text)

**Color Inversions**:

```typescript
const brutalistLightMode = {
  background: '#FFFFFF',
  text: '#000000',
  border: 'rgba(0, 0, 0, 0.2)',
  surface: '#FFFFFF',
}

const brutalistDarkMode = {
  background: '#000000',
  text: '#FFFFFF',
  border: 'rgba(255, 255, 255, 0.2)',
  surface: '#000000',
}
```

**VU Implementation**: Currently uses light mode (white background). Dark mode variant can be implemented by inverting colors.

**Contrast Requirements**:
- Text to background: Minimum 21:1 (black on white or white on black)
- Interactive elements: Maximum contrast
- Borders: Clear visibility (0.2-0.3 opacity minimum)

---

## Accessibility

### Focus States

```typescript
const focusStates = {
  outline: '4px solid #000000',        // Heavy outline
  outlineOffset: '2px',
  // No ring, just heavy outline
}
```

### ARIA Patterns

- All interactive elements have semantic HTML
- Modal dialogs properly trap focus
- Keyboard navigation: Tab, Enter, Space, Escape
- Screen reader text where needed

### Motion

- **No animations**: Instant state changes only
- **Respects `prefers-reduced-motion`**: Already no animations
- **No transitions**: All state changes are instant (0ms)
- **High contrast**: 21:1 ratio for maximum visibility

### Keyboard Navigation

- Clear focus indicators (4px solid black outline)
- Tab order follows visual hierarchy
- All interactive elements keyboard accessible
- Skip links for main content

---

## Implementation

### CSS Variables

```css
:root {
  /* Brutalist Theme Variables */
  --brutal-bg-primary: #ffffff;
  --brutal-bg-surface: #ffffff;
  --brutal-text-primary: #000000;
  --brutal-text-secondary: #4a4a4a;
  --brutal-border: rgba(0, 0, 0, 0.2);
  --brutal-border-thick: rgba(0, 0, 0, 0.8);
  
  /* Spacing */
  --brutal-spacing-1: 4px;
  --brutal-spacing-2: 8px;
  --brutal-spacing-4: 16px;
  --brutal-spacing-8: 32px;
  
  /* Typography */
  --brutal-font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --brutal-font-size-base: 16px;
  --brutal-font-weight-normal: 400;
  --brutal-font-weight-bold: 700;
  --brutal-font-weight-black: 900;
  
  /* Border */
  --brutal-radius: 0px;
  --brutal-border-width: 3px;
  
  /* Shadow */
  --brutal-shadow-sm: 2px 2px 0 0 #000000;
  --brutal-shadow-md: 4px 4px 0 0 #000000;
  --brutal-shadow-lg: 8px 8px 0 0 #000000;
  
  /* Transition */
  --brutal-transition: none;
}
```

### Usage Patterns

#### Brutalist Container

```css
.brutal-container {
  background: #ffffff;
  border: 3px solid #000000;
  border-radius: 0px;
  padding: 32px;
  box-shadow: 8px 8px 0 0 #000000;
  transition: none;
}
```

#### Brutalist Button

```css
.brutal-btn {
  background: #000000;
  color: #ffffff;
  border: 3px solid #000000;
  border-radius: 0px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: none;
  cursor: pointer;
}

.brutal-btn:hover {
  background: #ffffff;
  color: #000000;
  box-shadow: 4px 4px 0 0 #000000;
}

.brutal-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 0 #000000;
}
```

#### Brutalist Input

```css
.brutal-input {
  background: #ffffff;
  color: #000000;
  border: 3px solid rgba(0, 0, 0, 0.2);
  border-radius: 0px;
  padding: 14px 20px;
  font-size: 16px;
  transition: none;
}

.brutal-input:focus {
  border: 4px solid #000000;
  outline: none;
}

.brutal-input::placeholder {
  color: #666666;
}
```

#### Brutalist Card

```css
.brutal-card {
  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 0px;
  padding: 32px;
  box-shadow: 8px 8px 0 0 #000000;
  transition: none;
}

.brutal-card:hover {
  box-shadow: 12px 12px 0 0 #000000;
  transform: translate(-2px, -2px);
}
```

#### App Icon (Brutalist)

```css
.brutal-icon-wrapper {
  aspect-ratio: 1;
  background: #ffffff;
  border: 3px solid rgba(0, 0, 0, 0.3);
  border-radius: 0px;
  display: flex;
  gap: 10px;
  transition: none;
  box-shadow: none;
}

.brutal-icon-wrapper:hover {
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
}
```

### Theme Toggle Implementation

```css
/* Default: Modern theme (glassmorphic) */
body {
  background: #000000;
  color: #ffffff;
  /* ... modern styles ... */
}

/* Brutalist theme activated */
body.theme-minimal {
  --theme-bg-primary: #ffffff;
  --theme-bg-surface: #ffffff;
  --theme-text-primary: #000000;
  --theme-text-secondary: #4a4a4a;
  --theme-border: rgba(0, 0, 0, 0.2);
  --theme-border-accent: rgba(0, 0, 0, 0.3);
  
  /* Remove effects */
  --theme-grid-color: transparent;
  --theme-spotlight: transparent;
  --theme-glass: #ffffff;
  --theme-backdrop: none;
  --theme-shadow-color: transparent;
  
  /* Sharp corners */
  --theme-radius-sm: 0px;
  --theme-radius-md: 0px;
  --theme-radius-lg: 0px;
  
  /* Instant transitions */
  --theme-transition: none;
  
  /* Thick borders */
  --theme-border-width: 3px;
  
  background: var(--theme-bg-primary);
  color: var(--theme-text-primary);
}
```

---

## File Structure

```
VuSuite/
â”œâ”€â”€ css/
â”‚   â”œâ”€â”€ main.css          # Primary styles (modern)
â”‚   â”œâ”€â”€ themes.css        # Theme system (brutalist overrides)
â”‚   â”œâ”€â”€ checkout.css      # Checkout modal styles
â”‚   â””â”€â”€ trial.css         # Trial system styles
â””â”€â”€ js/
    â”œâ”€â”€ app.js            # Main application logic
    â”œâ”€â”€ theme-switcher.js # Theme toggle system
    â”œâ”€â”€ brutalist-transformer.js # Brutalist transformation utility
    â”œâ”€â”€ checkout.js       # Checkout system
    â”œâ”€â”€ vu-license.js     # License management
    â””â”€â”€ vu-trial.js       # Trial system
```

---

## Notes

- **Light Mode Default**: Brutalist theme uses white background with black text
- **No Animations**: All state changes are instant (0ms transitions)
- **Square Corners**: All border-radius values are 0px
- **Hard Shadows**: Offset shadows only, no blur
- **Thick Borders**: 2px-4px borders for emphasis
- **High Contrast**: Maximum contrast (21:1) for accessibility
- **Minimal Color**: Black, white, and minimal grays only
- **Bold Typography**: Heavy font weights (700, 900) for impact
- **Generous Spacing**: Larger padding and gaps for breathing room
- **Uppercase Labels**: Button labels and badges use uppercase

---

## Brutalist vs Modern Comparison

| Feature | Modern | Brutalist |
|---------|--------|-----------|
| Background | Black (#000000) | White (#FFFFFF) |
| Text | White | Black |
| Border Radius | 8px-24px | 0px |
| Shadows | Soft blur | Hard offset only |
| Transitions | 200-300ms | 0ms (instant) |
| Borders | 1px subtle | 3px+ thick |
| Glass Effect | Yes (backdrop blur) | No |
| Grid Overlay | Yes (animated) | No |
| Spotlight | Yes (animated) | No |
| Animations | Yes | No |
| Accent Color | Cyan (#00d4ff) | Black (inverted) |
| Typography | Inter (normal) | Inter (bold weights) |
| Spacing | Standard | Generous |
| Text Transform | None | Uppercase (labels) |

---

## Changelog

### Version 1.0.0 (October 31, 2024)
- Initial brutalist design system documentation
- Complete token extraction from implementation
- Component specifications
- Theme toggle system documented
- Responsive breakpoint definitions
- Accessibility guidelines

---

**Maintained by**: VuSuite Development Team  
**Contact**: dev@cybertouch.co  
**License**: MIT
