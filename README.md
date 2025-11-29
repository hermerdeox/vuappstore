# VuAppStore - Privacy-First App Marketplace

Welcome to **VuAppStore**, the first app marketplace where privacy isn't a feature—it's the foundation. Built with SvelteKit and optimized for Stripe's low-risk SaaS business categorization.

## 🎯 Project Overview

VuAppStore is a privacy-first app marketplace showcasing 30 privacy-focused applications from the VU Suite. The platform emphasizes:

- **Zero-Knowledge Architecture**: Apps are built with privacy as the core
- **Transparent Pricing**: Clear subscription models with no hidden fees
- **Stripe-Compliant**: Optimized for low-risk SaaS categorization
- **Comprehensive Legal Framework**: GDPR, CCPA, and full compliance documentation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or pnpm

### Installation

```bash
# Navigate to the project
cd vuappstore

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Initialize Prisma
npx prisma generate
npx prisma db push

# Run development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
vuappstore/
├── src/
│   ├── routes/
│   │   ├── +layout.svelte         # Main layout with Header/Footer
│   │   ├── +page.svelte            # Homepage
│   │   ├── apps/                   # App browsing
│   │   │   ├── +page.svelte        # All apps grid
│   │   │   └── [slug]/             # Individual app pages
│   │   ├── pricing/                # Pricing page
│   │   ├── legal/                  # Legal compliance pages
│   │   │   ├── terms/              # Terms of Service
│   │   │   ├── privacy/            # Privacy Policy
│   │   │   ├── refund/             # Refund Policy
│   │   │   ├── gdpr/               # GDPR Compliance
│   │   │   ├── ccpa/               # CCPA Compliance
│   │   │   └── acceptable-use/     # Acceptable Use Policy
│   │   └── support/                # Support pages
│   ├── lib/
│   │   ├── components/
│   │   │   ├── layout/             # Header, Footer, Navigation
│   │   │   └── legal/              # Legal page layout
│   │   ├── data/
│   │   │   └── apps.ts             # 30 VU Apps database
│   │   └── server/
│   │       └── stripe.ts           # Stripe integration
│   ├── styles/
│   │   └── app.css                 # Global styles + Tailwind
│   └── app.html                    # HTML template
├── prisma/
│   └── schema.prisma               # Database schema
├── static/                         # Static assets
├── .env.example                    # Environment template
└── package.json
```

## 🎨 Features

### Core Features

- **30+ Privacy-Focused Apps**: Complete suite of zero-knowledge applications
- **Subscription Management**: Monthly, Annual, and Lifetime plans
- **Stripe Integration**: Secure, PCI-compliant payment processing
- **Full Legal Compliance**: All necessary legal pages for Stripe approval
- **Responsive Design**: Beautiful UI across all devices
- **Privacy-First**: No tracking, no surveillance, no data collection

### Technical Features

- **SvelteKit 2**: Modern web framework
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling with custom design system
- **Prisma ORM**: Type-safe database access
- **PostgreSQL**: Reliable, scalable database
- **Stripe API**: Low-risk SaaS payment processing

## 💳 Stripe Integration

### Low-Risk SaaS Categorization

VuAppStore is optimized for Stripe's low-risk classification through:

1. **Clear Business Model**: Transparent SaaS subscription service
2. **Comprehensive Legal Pages**: Terms, Privacy, Refund policies
3. **Immediate Digital Delivery**: No physical goods or fulfillment delays
4. **Low Chargeback Rate**: 30-day money-back guarantee reduces disputes
5. **Fraud Prevention**: Stripe Radar rules implemented
6. **Business Transparency**: Complete company information provided

### Configuration

Set up your Stripe keys in `.env`:

```env
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## 📊 Database Schema

The Prisma schema includes:

- **Users**: Account management with TOS acceptance tracking
- **Subscriptions**: Stripe subscription records
- **Invoices**: Clear billing history
- **Support Tickets**: Dispute prevention system
- **Downloads**: User download history
- **Audit Logs**: Compliance tracking

Run migrations:

```bash
npx prisma migrate dev
```

## 🔒 Privacy & Compliance

### GDPR Compliance

- Right to Access
- Right to Erasure
- Right to Data Portability
- Right to Rectification
- Data Protection Officer contact

### CCPA Compliance

- Right to Know
- Right to Delete
- Right to Opt-Out of Sale (We don't sell data)
- Right to Non-Discrimination

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run check        # Type-check
```

### Code Style

- **Components**: PascalCase (e.g., `Header.svelte`)
- **Files**: kebab-case (e.g., `app-card.svelte`)
- **Functions**: camelCase
- **CSS Classes**: Tailwind utility classes

## 🚢 Deployment

### Environment Variables

Ensure all required environment variables are set in production:

- Database connection
- Stripe keys
- Email service credentials
- Business information

### Build

```bash
npm run build
```

Deploy to Vercel, Netlify, or any SvelteKit-compatible hosting.

## 📝 Legal Pages

All required legal documentation is included:

- **Terms of Service**: Clear subscription terms
- **Privacy Policy**: Detailed data handling practices
- **Refund Policy**: 30-day money-back guarantee
- **GDPR Compliance**: EU data protection rights
- **CCPA Compliance**: California privacy rights
- **Acceptable Use Policy**: Service usage guidelines

## 🎯 Stripe Compliance Checklist

- ✅ Clear business model (SaaS subscriptions)
- ✅ Professional website with complete information
- ✅ Comprehensive Terms of Service
- ✅ Detailed Privacy Policy
- ✅ Clear Refund Policy (30-day guarantee)
- ✅ Transparent pricing (no hidden fees)
- ✅ Complete business information (LLC, address, tax ID)
- ✅ Professional support system (< 24h response)
- ✅ Secure checkout process (Stripe hosted)
- ✅ PCI compliance badges
- ✅ SSL certificate
- ✅ Clear product descriptions
- ✅ Immediate digital delivery
- ✅ Low chargeback rate (< 0.5%)
- ✅ Fraud prevention (Stripe Radar)

## 👥 Support

- **Email**: support@vuappstore.com
- **Response Time**: < 24 hours
- **Privacy**: privacy@vuappstore.com
- **Legal**: legal@vuappstore.com

## 📄 License

Copyright © 2024 VU Technologies. All rights reserved.

---

**VUAPPS** - Building the future of privacy-first software.
