# Changelog

All notable changes to @vu/privacy-checker will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-01

### Added

#### Core Features
- **VuPrivacyChecker** class for route-based privacy level management
  - Register routes with privacy configurations
  - Pattern matching for wildcards and dynamic segments
  - Automatic fallback to parent routes and defaults
  - Event system for privacy level changes
  - HTML badge generation
  - CSS variables generation

- **VuPrivacyAnalyzer** class for brutally honest privacy assessments
  - Comprehensive privacy scoring (0-100)
  - Multi-category breakdown analysis
  - Red flag detection with severity levels (critical, high, medium, low)
  - Green flag recognition for privacy-positive features
  - Automatic recommendations generation
  - Comparison between two assessments
  - Brutal summary generation

#### Privacy Levels
- **Level 4** (Basic Privacy) - Minimum VU standard with encrypted transit
- **Level 3** (Enhanced Privacy) - End-to-end encryption
- **Level 2** (Privacy First) - Zero data need design
- **Level 1** (Local-First) - Data never leaves device
- **Level 0** (Zero-Knowledge) - True privacy achieved
- **SubZero** - Beyond zero-knowledge, counter-surveillance

#### Constants & Configuration
- Level colors with RGB values for CSS
- Level names, taglines, and descriptions
- User control, can't see, and server sees details
- Tradeoffs and example apps for each level
- Quality labels and CSS classes
- Scoring weights and penalty/bonus definitions

#### Svelte Components
- **VuPrivacyBadge** - Interactive privacy level badge
  - Multiple sizes (sm, md, lg)
  - Fixed and inline positioning
  - Expandable modal with detailed information
  - Full accessibility support (ARIA labels, keyboard navigation)
  - Custom event dispatching
  - SubZero special effects

#### Utilities
- Level formatting and display functions
- Level comparison and scoring
- CSS generation utilities
- Validation and parsing functions
- Assessment creation helpers

#### Documentation
- Comprehensive README with API reference
- Integration guide for various frameworks
- Vanilla HTML example
- SvelteKit example

### Technical Details

- Framework-agnostic TypeScript core
- Zero external dependencies for core functionality
- Optional Svelte peer dependency for components
- Full TypeScript type definitions
- ES Module and CommonJS support
- Tree-shakeable exports

---

## Privacy Philosophy

This package embodies the VU commitment to:
- **Transparency** - Users know exactly what privacy level they're getting
- **Honesty** - No privacy theater, only verifiable claims
- **Education** - Help users understand privacy tradeoffs
- **Verification** - Privacy levels are based on real architecture, not marketing

---

## Future Roadmap

### [1.1.0] - Planned
- React components
- Vue components
- Web Component (custom elements)
- Privacy badge CSS-only variant
- Internationalization support

### [1.2.0] - Planned
- Automated privacy scanning
- CI/CD integration for privacy checks
- Privacy score badges for README
- GitHub Action for privacy validation

---

**Built with 🛡️ by VU Labs**

