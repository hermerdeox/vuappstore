# 🚀 VUAPPSTORE PRODUCTION READINESS DIRECTIVE

**Project**: VuAppStore - Privacy-First App Marketplace  
**Generated**: December 19, 2025  
**Target**: Complete Production Deployment  
**Philosophy**: The VU Way - Privacy Without Compromise

---

## 📋 EXECUTIVE SUMMARY

This directive provides **complete implementation specifications** for bringing VuAppStore to full production readiness. The platform frontend is 100% complete with 32 functional routes, but critical backend systems, database integration, payment processing, and testing infrastructure require full implementation.

### Current Status Overview

| Component | Status | Completion | Action Required |
|-----------|--------|------------|-----------------|
| **Frontend** | ✅ Complete | 100% | Maintain & optimize |
| **Backend API** | ❌ Missing | 0% | Full implementation |
| **Database** | ❌ Not configured | 0% | Setup & migrate |
| **Crypto Payments** | 📚 Documented | 10% | Complete backend |
| **Authentication** | 🔶 Partial | 40% | Complete integration |
| **Testing** | ❌ None | 0% | Full test suite |
| **Translation** | 🔶 Partial | 6% | 27 pages remaining |
| **CI/CD** | ❌ None | 0% | Setup pipeline |
| **Documentation** | ✅ Excellent | 100% | Keep updated |

---

## 🎯 CORE PRINCIPLES - NON-NEGOTIABLE

### 1. Zero Mock Data Policy
- **NO** placeholder data in production code
- **NO** hardcoded user objects
- **NO** fake API responses
- **ALL** data must flow from real database or APIs
- **ALL** user interactions must persist to database

### 2. Complete Error Handling
- **EVERY** async function must have try-catch blocks
- **EVERY** API endpoint must return proper HTTP status codes
- **EVERY** database query must handle connection failures
- **EVERY** user-facing error must show meaningful messages
- **ALL** errors must be logged with context (timestamp, user, action)

### 3. Type Safety Everywhere
- **NO** `any` types in production code
- **ALL** function parameters must be typed
- **ALL** API responses must have TypeScript interfaces
- **ALL** database models must have proper types
- **USE** Zod schemas for runtime validation at API boundaries

### 4. Production-Grade Security
- **ALL** passwords hashed with Argon2id (memory-hard, side-channel resistant)
- **ALL** API routes must validate authentication
- **ALL** sensitive data must be encrypted at rest
- **ALL** connections must use HTTPS/TLS
- **NO** secrets in code (use environment variables only)
- **ALL** user inputs must be sanitized and validated

### 5. VU Philosophy Compliance
- **ONLY** @username identities (no real names)
- **ONLY** @vumail.app email addresses
- **NO** phone number collection anywhere
- **NO** payment method storage
- **MINIMAL** data collection (4 fields: @username, @vumail.app, subscription status, billing dates)
- **CRYPTO-ONLY** payments (Monero/Lightning/BTC/ETH)
- **ZERO** tracking, analytics, or fingerprinting

### 6. Preserve Existing Styles
- **DO NOT** modify CSS classes without explicit approval
- **DO NOT** change Tailwind configurations
- **DO NOT** alter color schemes or design tokens
- **DO NOT** modify component styling
- **MAINTAIN** glassmorphism design consistency

---

## 🔴 CRITICAL PATH IMPLEMENTATION

### Phase 1: Database Infrastructure (Week 1)

#### Task 1.1: PostgreSQL Database Setup
**Priority**: P0 (Blocking)  
**Estimated Time**: 2 days

**Implementation Requirements**:

1. **Environment Configuration**
```typescript
// .env.example - CREATE THIS FILE
DATABASE_URL="postgresql://username:password@localhost:5432/vuappstore"
DATABASE_POOL_SIZE=20
DATABASE_TIMEOUT=30000
NODE_ENV=development
PORT=3000

# Future crypto payment variables (documented but not required yet)
# MONERO_WALLET_RPC_URL=
# MONERO_DAEMON_URL=
# LIGHTNING_NODE_URL=
# BITCOIN_RPC_URL=
```

2. **Prisma Migration Strategy**
```bash
# Commands to execute in order:
npx prisma generate
npx prisma db push --skip-generate
npx prisma studio # Verify schema
```

3. **Database Connection Service**
```typescript
// src/lib/server/database.ts - CREATE THIS FILE
import { PrismaClient } from '@prisma/client';
import { env } from '$env/dynamic/private';

// Singleton pattern for Prisma client
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    errorFormat: 'pretty',
  });

if (env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Connection health check
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

// Graceful shutdown
export async function disconnectDatabase(): Promise<void> {
  await prisma.$disconnect();
}
```

4. **Database Error Handling**
```typescript
// src/lib/utils/database-errors.ts - CREATE THIS FILE
import { Prisma } from '@prisma/client';

export class DatabaseError extends Error {
  constructor(
    message: string,
    public code: string,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export function handlePrismaError(error: unknown): DatabaseError {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return new DatabaseError(
          'A record with this unique field already exists',
          'UNIQUE_CONSTRAINT_VIOLATION',
          error
        );
      case 'P2025':
        return new DatabaseError(
          'Record not found',
          'RECORD_NOT_FOUND',
          error
        );
      case 'P2003':
        return new DatabaseError(
          'Foreign key constraint failed',
          'FOREIGN_KEY_VIOLATION',
          error
        );
      default:
        return new DatabaseError(
          'Database operation failed',
          error.code,
          error
        );
    }
  }
  
  if (error instanceof Prisma.PrismaClientValidationError) {
    return new DatabaseError(
      'Invalid data provided to database',
      'VALIDATION_ERROR',
      error
    );
  }
  
  return new DatabaseError(
    'Unknown database error',
    'UNKNOWN_ERROR',
    error
  );
}
```

**Acceptance Criteria**:
- ✅ PostgreSQL database created and accessible
- ✅ All Prisma migrations applied successfully
- ✅ Connection service returns true for health check
- ✅ Error handling catches and logs all database failures
- ✅ Prisma Studio shows all 8 tables (User, Subscription, Invoice, SupportTicket, TicketMessage, Download, Refund, PrivacyRequest, AuditLog)

---

#### Task 1.2: Update Prisma Schema for VU Philosophy
**Priority**: P0 (Blocking)  
**Estimated Time**: 1 day

**Current schema uses traditional fields (name, email). Must update to VU standards.**

```prisma
// prisma/schema.prisma - UPDATE THIS FILE

model User {
  id        String   @id @default(cuid())
  
  // VU Philosophy: @username instead of real names
  username  String   @unique // Format: @privacy_champion
  
  // VU Philosophy: @vumail.app only
  vumailAddress String @unique // Format: privacy_champion@vumail.app
  
  // Security
  passwordHash String // Argon2id hashed
  
  // VU Philosophy: Minimal data collection
  privacyLevel Int @default(2) // 0-4 privacy rating
  
  // Account status
  status    String   @default("active") // active, suspended, deleted
  
  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  deletedAt DateTime?
  
  // Relations
  subscriptions Subscription[]
  supportTickets SupportTicket[]
  downloads Download[]
  sessions Session[]
  auditLogs AuditLog[]
  
  // Compliance - NO personal data
  tosAcceptedAt DateTime?
  tosVersion    String?
  gdprConsent   Boolean   @default(true) // Default ON for VU
  
  @@index([username])
  @@index([vumailAddress])
  @@index([status])
}

model Session {
  id        String   @id @default(cuid())
  userId    String
  token     String   @unique
  
  // Session data
  expiresAt DateTime
  lastActiveAt DateTime @default(now())
  
  // Security (NO fingerprinting per VU philosophy)
  createdAt DateTime @default(now())
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
  @@index([token])
  @@index([expiresAt])
}

model Subscription {
  id               String   @id @default(cuid())
  userId           String
  
  // VU Philosophy: Crypto payments only (NO Stripe)
  paymentMethod    String   // monero, lightning, bitcoin, ethereum
  transactionHash  String?  @unique // Blockchain transaction reference
  
  // Subscription details
  plan             String   // single_app, complete_suite, lifetime
  appId            String?  // For single app subscriptions
  status           String   // active, cancelled, expired
  
  // Pricing ($2.56 per app)
  amountCents      Int      // Amount in cents (256 for single app)
  currency         String   @default("usd")
  
  // Billing cycle
  currentPeriodStart DateTime
  currentPeriodEnd   DateTime?
  cancelledAt        DateTime?
  
  // Audit trail
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
  @@index([status])
  @@index([paymentMethod])
}

// Remove Stripe-related fields from Invoice model
model Invoice {
  id                String   @id @default(cuid())
  subscriptionId    String?
  userId            String
  
  // Crypto payment details
  paymentMethod     String   // monero, lightning, bitcoin, ethereum
  cryptoAddress     String   // Payment address generated
  cryptoAmount      String   // Amount in crypto
  transactionHash   String?  @unique // Blockchain confirmation
  confirmations     Int      @default(0)
  
  // Invoice details
  amountCents       Int      // Amount in cents
  currency          String   @default("usd")
  status            String   // pending, paid, expired, refunded
  
  // Payment tracking (NO personal data stored)
  paidAt            DateTime?
  expiresAt         DateTime? // Payment window expiration
  
  // Billing period
  periodStart       DateTime
  periodEnd         DateTime
  
  // Audit trail
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@index([userId])
  @@index([status])
  @@index([transactionHash])
}

// Continue with other models...
```

**Acceptance Criteria**:
- ✅ All Stripe references removed from schema
- ✅ User model uses @username and @vumail.app fields
- ✅ Subscription model supports crypto payments
- ✅ NO personal data fields (name, phone, address)
- ✅ Session model for authentication (no fingerprinting)
- ✅ All models have proper indexes for performance
- ✅ Migration runs without errors

---

### Phase 2: Authentication System (Week 1-2)

#### Task 2.1: VU Sovereign Identity Implementation
**Priority**: P0 (Blocking)  
**Estimated Time**: 3 days

**Current Status**: Partial implementation in `src/lib/auth/` but not fully integrated.

**Required Files**:

1. **Authentication Service** (Complete Implementation)
```typescript
// src/lib/server/auth/auth-service.ts - CREATE THIS FILE
import { prisma } from '$lib/server/database';
import { hash, verify } from '@node-rs/argon2';
import { randomBytes } from 'crypto';
import { handlePrismaError } from '$lib/utils/database-errors';

// Argon2id configuration (OWASP recommended)
const ARGON2_CONFIG = {
  memoryCost: 19456, // 19 MiB
  timeCost: 2,
  parallelism: 1,
};

export interface CreateUserInput {
  username: string; // Must start with @
  vumailAddress: string; // Must end with @vumail.app
  password: string; // Min 12 chars, complex
}

export interface AuthResult {
  success: boolean;
  userId?: string;
  sessionToken?: string;
  error?: string;
}

export class AuthService {
  /**
   * Register a new user with VU Sovereign Identity
   * NO real names, NO phone numbers, ONLY @username and @vumail.app
   */
  async registerUser(input: CreateUserInput): Promise<AuthResult> {
    try {
      // Validate VU Philosophy compliance
      if (!input.username.startsWith('@')) {
        return { success: false, error: 'Username must start with @' };
      }
      
      if (!input.vumailAddress.endsWith('@vumail.app')) {
        return { success: false, error: 'Must use @vumail.app email address' };
      }
      
      // Validate password strength
      if (input.password.length < 12) {
        return { success: false, error: 'Password must be at least 12 characters' };
      }
      
      // Hash password with Argon2id
      const passwordHash = await hash(input.password, ARGON2_CONFIG);
      
      // Create user in database
      const user = await prisma.user.create({
        data: {
          username: input.username,
          vumailAddress: input.vumailAddress,
          passwordHash,
          status: 'active',
          tosAcceptedAt: new Date(),
          tosVersion: '1.0',
        },
      });
      
      // Create session
      const sessionToken = await this.createSession(user.id);
      
      // Audit log
      await this.logAuditEvent(user.id, 'user.registered', 'User', user.id);
      
      return {
        success: true,
        userId: user.id,
        sessionToken,
      };
    } catch (error) {
      const dbError = handlePrismaError(error);
      
      if (dbError.code === 'UNIQUE_CONSTRAINT_VIOLATION') {
        return { success: false, error: 'Username or email already exists' };
      }
      
      console.error('Registration error:', dbError);
      return { success: false, error: 'Registration failed' };
    }
  }

  /**
   * Authenticate user with @username and password
   */
  async authenticateUser(username: string, password: string): Promise<AuthResult> {
    try {
      // Find user by username
      const user = await prisma.user.findUnique({
        where: { username },
      });
      
      if (!user) {
        return { success: false, error: 'Invalid credentials' };
      }
      
      if (user.status !== 'active') {
        return { success: false, error: 'Account is not active' };
      }
      
      // Verify password
      const isValid = await verify(user.passwordHash, password, ARGON2_CONFIG);
      
      if (!isValid) {
        return { success: false, error: 'Invalid credentials' };
      }
      
      // Create session
      const sessionToken = await this.createSession(user.id);
      
      // Audit log
      await this.logAuditEvent(user.id, 'user.login', 'User', user.id);
      
      return {
        success: true,
        userId: user.id,
        sessionToken,
      };
    } catch (error) {
      console.error('Authentication error:', error);
      return { success: false, error: 'Authentication failed' };
    }
  }

  /**
   * Create a session token (7 days expiration per VU standard)
   */
  private async createSession(userId: string): Promise<string> {
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days
    
    await prisma.session.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    });
    
    return token;
  }

  /**
   * Validate session token and return user
   */
  async validateSession(token: string): Promise<{ userId: string } | null> {
    try {
      const session = await prisma.session.findUnique({
        where: { token },
        include: { user: true },
      });
      
      if (!session) {
        return null;
      }
      
      // Check expiration
      if (session.expiresAt < new Date()) {
        await prisma.session.delete({ where: { id: session.id } });
        return null;
      }
      
      // Update last active
      await prisma.session.update({
        where: { id: session.id },
        data: { lastActiveAt: new Date() },
      });
      
      return { userId: session.userId };
    } catch (error) {
      console.error('Session validation error:', error);
      return null;
    }
  }

  /**
   * Logout user by deleting session
   */
  async logout(token: string): Promise<boolean> {
    try {
      await prisma.session.delete({
        where: { token },
      });
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  }

  /**
   * Audit logging for security events only (VU Philosophy: minimal logging)
   */
  private async logAuditEvent(
    userId: string,
    action: string,
    resource: string,
    resourceId: string
  ): Promise<void> {
    try {
      await prisma.auditLog.create({
        data: {
          userId,
          action,
          resource,
          resourceId,
          metadata: {
            timestamp: new Date().toISOString(),
          },
        },
      });
    } catch (error) {
      // Don't fail the main operation if audit logging fails
      console.error('Audit log error:', error);
    }
  }

  /**
   * Get user by session token
   */
  async getUserFromSession(token: string) {
    const session = await this.validateSession(token);
    
    if (!session) {
      return null;
    }
    
    return await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        username: true,
        vumailAddress: true,
        privacyLevel: true,
        status: true,
        createdAt: true,
        // NO sensitive data exposed
      },
    });
  }
}

export const authService = new AuthService();
```

2. **API Endpoints** (Full Implementation)
```typescript
// src/routes/api/auth/register/+server.ts - CREATE THIS FILE
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { authService } from '$lib/server/auth/auth-service';
import { z } from 'zod';

const registerSchema = z.object({
  username: z.string().regex(/^@[a-zA-Z0-9_]{3,30}$/, 'Username must start with @ and be 3-30 characters'),
  vumailAddress: z.string().email().endsWith('@vumail.app', 'Must use @vumail.app address'),
  password: z.string().min(12, 'Password must be at least 12 characters'),
});

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const body = await request.json();
    
    // Validate input
    const validation = registerSchema.safeParse(body);
    
    if (!validation.success) {
      return json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    
    const { username, vumailAddress, password } = validation.data;
    
    // Register user
    const result = await authService.registerUser({
      username,
      vumailAddress,
      password,
    });
    
    if (!result.success) {
      return json({ error: result.error }, { status: 400 });
    }
    
    // Set session cookie (HttpOnly, Secure, SameSite)
    cookies.set('session_token', result.sessionToken!, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    
    return json({
      success: true,
      userId: result.userId,
    });
  } catch (error) {
    console.error('Registration endpoint error:', error);
    return json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
};
```

```typescript
// src/routes/api/auth/login/+server.ts - CREATE THIS FILE
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { authService } from '$lib/server/auth/auth-service';
import { z } from 'zod';

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const body = await request.json();
    
    const validation = loginSchema.safeParse(body);
    
    if (!validation.success) {
      return json(
        { error: 'Invalid input' },
        { status: 400 }
      );
    }
    
    const { username, password } = validation.data;
    
    // Authenticate
    const result = await authService.authenticateUser(username, password);
    
    if (!result.success) {
      return json({ error: result.error }, { status: 401 });
    }
    
    // Set session cookie
    cookies.set('session_token', result.sessionToken!, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    
    return json({
      success: true,
      userId: result.userId,
    });
  } catch (error) {
    console.error('Login endpoint error:', error);
    return json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
};
```

```typescript
// src/routes/api/auth/logout/+server.ts - CREATE THIS FILE
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { authService } from '$lib/server/auth/auth-service';

export const POST: RequestHandler = async ({ cookies }) => {
  try {
    const token = cookies.get('session_token');
    
    if (token) {
      await authService.logout(token);
    }
    
    // Clear cookie
    cookies.delete('session_token', { path: '/' });
    
    return json({ success: true });
  } catch (error) {
    console.error('Logout endpoint error:', error);
    return json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
};
```

```typescript
// src/routes/api/auth/me/+server.ts - CREATE THIS FILE
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { authService } from '$lib/server/auth/auth-service';

export const GET: RequestHandler = async ({ cookies }) => {
  try {
    const token = cookies.get('session_token');
    
    if (!token) {
      return json({ error: 'Not authenticated' }, { status: 401 });
    }
    
    const user = await authService.getUserFromSession(token);
    
    if (!user) {
      return json({ error: 'Invalid session' }, { status: 401 });
    }
    
    return json({ user });
  } catch (error) {
    console.error('Get user endpoint error:', error);
    return json(
      { error: 'Failed to get user' },
      { status: 500 }
    );
  }
};
```

3. **Hooks for Server-Side Authentication**
```typescript
// src/hooks.server.ts - UPDATE THIS FILE
import { authService } from '$lib/server/auth/auth-service';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  // Get session token from cookie
  const token = event.cookies.get('session_token');
  
  if (token) {
    // Validate session and attach user to event.locals
    const user = await authService.getUserFromSession(token);
    
    if (user) {
      event.locals.user = user;
    }
  }
  
  // Continue with the request
  const response = await resolve(event);
  
  return response;
};
```

4. **App Types for Locals**
```typescript
// src/app.d.ts - UPDATE THIS FILE
declare global {
  namespace App {
    interface Locals {
      user?: {
        id: string;
        username: string;
        vumailAddress: string;
        privacyLevel: number;
        status: string;
        createdAt: Date;
      };
    }
  }
}

export {};
```

**Acceptance Criteria**:
- ✅ Users can register with @username and @vumail.app
- ✅ NO real name or phone number fields anywhere
- ✅ Passwords hashed with Argon2id
- ✅ Session tokens stored in HttpOnly cookies
- ✅ Sessions expire after 7 days
- ✅ Authentication works on all protected routes
- ✅ Audit logs created for security events only
- ✅ Error messages don't leak security information

---

### Phase 3: API Endpoints for Account Management (Week 2)

#### Task 3.1: User Profile API
**Priority**: P1  
**Estimated Time**: 1 day

```typescript
// src/routes/api/user/profile/+server.ts - CREATE THIS FILE
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/database';

export const GET: RequestHandler = async ({ locals }) => {
  if (!locals.user) {
    return json({ error: 'Not authenticated' }, { status: 401 });
  }
  
  try {
    const user = await prisma.user.findUnique({
      where: { id: locals.user.id },
      select: {
        id: true,
        username: true,
        vumailAddress: true,
        privacyLevel: true,
        status: true,
        createdAt: true,
        subscriptions: {
          where: { status: 'active' },
          select: {
            id: true,
            plan: true,
            appId: true,
            status: true,
            currentPeriodEnd: true,
            paymentMethod: true,
          },
        },
        downloads: {
          orderBy: { downloadedAt: 'desc' },
          take: 5,
          select: {
            id: true,
            appId: true,
            platform: true,
            version: true,
            downloadedAt: true,
          },
        },
      },
    });
    
    if (!user) {
      return json({ error: 'User not found' }, { status: 404 });
    }
    
    return json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    return json({ error: 'Failed to get profile' }, { status: 500 });
  }
};

export const PATCH: RequestHandler = async ({ request, locals }) => {
  if (!locals.user) {
    return json({ error: 'Not authenticated' }, { status: 401 });
  }
  
  try {
    const body = await request.json();
    const { username } = body;
    
    // Validate username format
    if (username && !/^@[a-zA-Z0-9_]{3,30}$/.test(username)) {
      return json({ error: 'Invalid username format' }, { status: 400 });
    }
    
    // Update user
    const user = await prisma.user.update({
      where: { id: locals.user.id },
      data: { username },
      select: {
        id: true,
        username: true,
        vumailAddress: true,
        privacyLevel: true,
        updatedAt: true,
      },
    });
    
    return json({ user });
  } catch (error) {
    console.error('Update profile error:', error);
    return json({ error: 'Failed to update profile' }, { status: 500 });
  }
};
```

#### Task 3.2: Subscription Management API
**Priority**: P1  
**Estimated Time**: 2 days

```typescript
// src/routes/api/subscriptions/+server.ts - CREATE THIS FILE
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/database';

export const GET: RequestHandler = async ({ locals }) => {
  if (!locals.user) {
    return json({ error: 'Not authenticated' }, { status: 401 });
  }
  
  try {
    const subscriptions = await prisma.subscription.findMany({
      where: { userId: locals.user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            // Count related records if needed
          },
        },
      },
    });
    
    return json({ subscriptions });
  } catch (error) {
    console.error('Get subscriptions error:', error);
    return json({ error: 'Failed to get subscriptions' }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request, locals }) => {
  if (!locals.user) {
    return json({ error: 'Not authenticated' }, { status: 401 });
  }
  
  try {
    const body = await request.json();
    const { plan, appId, paymentMethod } = body;
    
    // Validate plan
    if (!['single_app', 'complete_suite', 'lifetime'].includes(plan)) {
      return json({ error: 'Invalid plan' }, { status: 400 });
    }
    
    // Calculate amount (in cents)
    let amountCents: number;
    switch (plan) {
      case 'single_app':
        amountCents = 256; // $2.56
        break;
      case 'complete_suite':
        amountCents = 7680; // $76.80 (30 × $2.56)
        break;
      case 'lifetime':
        amountCents = 256000; // $2,560
        break;
    }
    
    // Create subscription (pending payment)
    const subscription = await prisma.subscription.create({
      data: {
        userId: locals.user.id,
        plan,
        appId,
        paymentMethod,
        amountCents,
        status: 'pending',
        currentPeriodStart: new Date(),
        currentPeriodEnd: plan === 'lifetime' ? null : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });
    
    return json({ subscription }, { status: 201 });
  } catch (error) {
    console.error('Create subscription error:', error);
    return json({ error: 'Failed to create subscription' }, { status: 500 });
  }
};
```

#### Task 3.3: Downloads API
**Priority**: P1  
**Estimated Time**: 1 day

```typescript
// src/routes/api/downloads/+server.ts - CREATE THIS FILE
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/database';

export const GET: RequestHandler = async ({ locals }) => {
  if (!locals.user) {
    return json({ error: 'Not authenticated' }, { status: 401 });
  }
  
  try {
    const downloads = await prisma.download.findMany({
      where: { userId: locals.user.id },
      orderBy: { downloadedAt: 'desc' },
      select: {
        id: true,
        appId: true,
        platform: true,
        version: true,
        downloadedAt: true,
      },
    });
    
    // VU Philosophy: We don't track download counts or usage patterns
    // This data is for user convenience only (re-download access)
    
    return json({ downloads });
  } catch (error) {
    console.error('Get downloads error:', error);
    return json({ error: 'Failed to get downloads' }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request, locals }) => {
  if (!locals.user) {
    return json({ error: 'Not authenticated' }, { status: 401 });
  }
  
  try {
    const body = await request.json();
    const { appId, platform, version } = body;
    
    // Verify user has active subscription for this app
    const hasAccess = await prisma.subscription.findFirst({
      where: {
        userId: locals.user.id,
        status: 'active',
        OR: [
          { plan: 'complete_suite' },
          { plan: 'lifetime' },
          { appId, plan: 'single_app' },
        ],
      },
    });
    
    if (!hasAccess) {
      return json({ error: 'No active subscription for this app' }, { status: 403 });
    }
    
    // Record download (for user's reference, NOT tracking)
    const download = await prisma.download.create({
      data: {
        userId: locals.user.id,
        appId,
        platform,
        version,
      },
    });
    
    // In production, generate signed download URL here
    // For now, return success
    
    return json({
      download,
      message: 'Download access granted',
    });
  } catch (error) {
    console.error('Record download error:', error);
    return json({ error: 'Failed to record download' }, { status: 500 });
  }
};
```

**Acceptance Criteria**:
- ✅ All APIs require authentication
- ✅ Proper HTTP status codes (200, 201, 400, 401, 403, 500)
- ✅ Type-safe request/response handling
- ✅ Database errors handled gracefully
- ✅ NO unnecessary data collection (VU Philosophy)
- ✅ All responses follow consistent format

---

### Phase 4: Crypto Payment Backend (Week 3-10)

#### Task 4.1: Payment Service Architecture
**Priority**: P0  
**Estimated Time**: 2 weeks

**Note**: This is the most complex implementation. Follow the architecture documented in `CRYPTO_PAYMENT_IMPLEMENTATION_GUIDE.md`.

**Required Components**:

1. **Payment API Server** (Separate Node.js/Express service)
```typescript
// payment-backend/src/server.ts - CREATE THIS FILE
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { PaymentService } from './services/PaymentService';
import { PriceService } from './services/PriceService';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors());
app.use(express.json());

const paymentService = new PaymentService();
const priceService = new PriceService();

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get crypto prices
app.get('/api/prices', async (req, res) => {
  try {
    const prices = await priceService.getCurrentPrices();
    res.json(prices);
  } catch (error) {
    console.error('Price fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch prices' });
  }
});

// Create payment invoice
app.post('/api/payments/create', async (req, res) => {
  try {
    const { amountUSD, paymentMethod, userId, subscriptionId } = req.body;
    
    if (!['monero', 'lightning', 'bitcoin', 'ethereum'].includes(paymentMethod)) {
      return res.status(400).json({ error: 'Invalid payment method' });
    }
    
    const invoice = await paymentService.createInvoice({
      amountUSD,
      paymentMethod,
      userId,
      subscriptionId,
    });
    
    res.json(invoice);
  } catch (error) {
    console.error('Create payment error:', error);
    res.status(500).json({ error: 'Failed to create payment' });
  }
});

// Check payment status
app.get('/api/payments/:invoiceId/status', async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const status = await paymentService.getPaymentStatus(invoiceId);
    
    res.json(status);
  } catch (error) {
    console.error('Payment status error:', error);
    res.status(500).json({ error: 'Failed to get payment status' });
  }
});

// WebSocket for real-time payment updates
wss.on('connection', (ws) => {
  console.log('WebSocket client connected');
  
  ws.on('message', async (message) => {
    try {
      const data = JSON.parse(message.toString());
      
      if (data.type === 'subscribe' && data.invoiceId) {
        // Subscribe client to payment updates
        paymentService.subscribeToPayment(data.invoiceId, (update) => {
          ws.send(JSON.stringify(update));
        });
      }
    } catch (error) {
      console.error('WebSocket message error:', error);
    }
  });
  
  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Payment API server running on port ${PORT}`);
});
```

2. **Monero Payment Service**
```typescript
// payment-backend/src/services/MoneroService.ts - CREATE THIS FILE
import axios from 'axios';

export interface MoneroInvoice {
  address: string;
  amount: string;
  integratedAddress?: string;
  paymentId?: string;
}

export interface MoneroPaymentStatus {
  confirmed: boolean;
  confirmations: number;
  amount: string;
  txHash?: string;
}

export class MoneroService {
  private walletRpcUrl: string;
  private daemonUrl: string;
  
  constructor() {
    this.walletRpcUrl = process.env.MONERO_WALLET_RPC_URL || 'http://localhost:18082/json_rpc';
    this.daemonUrl = process.env.MONERO_DAEMON_URL || 'http://localhost:18081/json_rpc';
  }
  
  async createInvoice(amountXMR: string): Promise<MoneroInvoice> {
    try {
      // Create integrated address for payment tracking
      const response = await axios.post(this.walletRpcUrl, {
        jsonrpc: '2.0',
        id: '0',
        method: 'make_integrated_address',
      });
      
      if (response.data.error) {
        throw new Error(`Monero RPC error: ${response.data.error.message}`);
      }
      
      const { integrated_address, payment_id } = response.data.result;
      
      return {
        address: integrated_address,
        amount: amountXMR,
        paymentId: payment_id,
      };
    } catch (error) {
      console.error('Monero invoice creation error:', error);
      throw new Error('Failed to create Monero invoice');
    }
  }
  
  async checkPayment(paymentId: string, expectedAmount: string): Promise<MoneroPaymentStatus> {
    try {
      // Get payments by payment ID
      const response = await axios.post(this.walletRpcUrl, {
        jsonrpc: '2.0',
        id: '0',
        method: 'get_payments',
        params: {
          payment_id: paymentId,
        },
      });
      
      if (response.data.error) {
        return {
          confirmed: false,
          confirmations: 0,
          amount: '0',
        };
      }
      
      const payments = response.data.result.payments || [];
      
      if (payments.length === 0) {
        return {
          confirmed: false,
          confirmations: 0,
          amount: '0',
        };
      }
      
      // Find payment matching expected amount
      const payment = payments.find((p: any) => {
        const receivedXMR = (p.amount / 1e12).toString();
        return receivedXMR === expectedAmount;
      });
      
      if (!payment) {
        return {
          confirmed: false,
          confirmations: 0,
          amount: '0',
        };
      }
      
      // Monero requires 10 confirmations for safety
      const confirmed = payment.confirmations >= 10;
      
      return {
        confirmed,
        confirmations: payment.confirmations,
        amount: (payment.amount / 1e12).toString(),
        txHash: payment.tx_hash,
      };
    } catch (error) {
      console.error('Monero payment check error:', error);
      throw new Error('Failed to check Monero payment');
    }
  }
  
  async getBalance(): Promise<{ balance: string; unlocked: string }> {
    try {
      const response = await axios.post(this.walletRpcUrl, {
        jsonrpc: '2.0',
        id: '0',
        method: 'get_balance',
      });
      
      if (response.data.error) {
        throw new Error(`Monero RPC error: ${response.data.error.message}`);
      }
      
      const { balance, unlocked_balance } = response.data.result;
      
      return {
        balance: (balance / 1e12).toString(),
        unlocked: (unlocked_balance / 1e12).toString(),
      };
    } catch (error) {
      console.error('Monero balance check error:', error);
      throw new Error('Failed to get Monero balance');
    }
  }
}
```

3. **Docker Compose for Crypto Nodes**
```yaml
# docker-compose.yml - CREATE THIS FILE
version: '3.8'

services:
  # PostgreSQL database
  postgres:
    image: postgres:15-alpine
    container_name: vuappstore_db
    environment:
      POSTGRES_DB: vuappstore
      POSTGRES_USER: vuuser
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U vuuser"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Monero daemon
  monero-daemon:
    image: sethsimmons/simple-monerod:latest
    container_name: vuappstore_monero_daemon
    volumes:
      - monero_data:/home/monero/.bitmonero
    ports:
      - "18080:18080" # P2P
      - "18081:18081" # RPC
    command: >
      --rpc-bind-ip=0.0.0.0
      --confirm-external-bind
      --restricted-rpc
      --rpc-bind-port=18081
    restart: unless-stopped

  # Monero wallet RPC
  monero-wallet-rpc:
    image: sethsimmons/simple-monero-wallet-rpc:latest
    container_name: vuappstore_monero_wallet
    depends_on:
      - monero-daemon
    volumes:
      - monero_wallet:/home/monero/wallet
    ports:
      - "18082:18082"
    environment:
      DAEMON_HOST: monero-daemon
      DAEMON_PORT: 18081
      RPC_BIND_PORT: 18082
      RPC_BIND_IP: 0.0.0.0
      WALLET_NAME: vuappstore_wallet
      WALLET_PASSWORD: ${MONERO_WALLET_PASSWORD}
    restart: unless-stopped

  # Payment API backend
  payment-api:
    build: ./payment-backend
    container_name: vuappstore_payment_api
    depends_on:
      - postgres
      - monero-daemon
      - monero-wallet-rpc
    ports:
      - "3001:3001"
    environment:
      DATABASE_URL: postgresql://vuuser:${DB_PASSWORD}@postgres:5432/vuappstore
      MONERO_WALLET_RPC_URL: http://monero-wallet-rpc:18082/json_rpc
      MONERO_DAEMON_URL: http://monero-daemon:18081/json_rpc
      NODE_ENV: production
    restart: unless-stopped

volumes:
  postgres_data:
  monero_data:
  monero_wallet:
```

**Implementation Timeline**:
- Week 3-4: Monero integration
- Week 5-6: Lightning Network integration
- Week 7-8: Bitcoin/Ethereum integration
- Week 9: Payment monitoring system
- Week 10: Testing and refinement

**Acceptance Criteria**:
- ✅ Users can pay with Monero (Level 0)
- ✅ Users can pay with Lightning (Level 1)
- ✅ Users can pay with Bitcoin/Ethereum (Level 2)
- ✅ Real-time payment status updates via WebSocket
- ✅ Automatic subscription activation on payment confirmation
- ✅ Payment expiration handling (24-hour window)
- ✅ NO payment data stored (only transaction hashes)
- ✅ All crypto nodes running in Docker
- ✅ Full error handling and logging

---

### Phase 5: Testing Infrastructure (Week 2-3)

#### Task 5.1: Unit Tests Setup
**Priority**: P0  
**Estimated Time**: 1 day

```typescript
// vitest.config.ts - UPDATE THIS FILE
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/tests/',
        '**/*.test.ts',
        '**/*.spec.ts',
      ],
    },
    include: ['src/**/*.{test,spec}.ts'],
  },
});
```

```typescript
// src/tests/setup.ts - UPDATE THIS FILE
import { beforeAll, afterAll, afterEach } from 'vitest';
import { prisma } from '$lib/server/database';

// Setup before all tests
beforeAll(async () => {
  // Connect to test database
  // Optionally seed test data
});

// Cleanup after each test
afterEach(async () => {
  // Clear test data
  await prisma.user.deleteMany();
  await prisma.session.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.download.deleteMany();
  await prisma.auditLog.deleteMany();
});

// Cleanup after all tests
afterAll(async () => {
  await prisma.$disconnect();
});
```

#### Task 5.2: Authentication Tests
**Priority**: P0  
**Estimated Time**: 2 days

```typescript
// src/lib/server/auth/auth-service.test.ts - CREATE THIS FILE
import { describe, it, expect, beforeEach } from 'vitest';
import { authService } from './auth-service';
import { prisma } from '$lib/server/database';

describe('AuthService', () => {
  beforeEach(async () => {
    // Clean database
    await prisma.user.deleteMany();
    await prisma.session.deleteMany();
  });

  describe('registerUser', () => {
    it('should register a new user with valid VU identity', async () => {
      const result = await authService.registerUser({
        username: '@testuser',
        vumailAddress: 'testuser@vumail.app',
        password: 'SecurePassword123!',
      });

      expect(result.success).toBe(true);
      expect(result.userId).toBeDefined();
      expect(result.sessionToken).toBeDefined();

      // Verify user in database
      const user = await prisma.user.findUnique({
        where: { username: '@testuser' },
      });

      expect(user).toBeDefined();
      expect(user!.vumailAddress).toBe('testuser@vumail.app');
    });

    it('should reject username without @ prefix', async () => {
      const result = await authService.registerUser({
        username: 'testuser', // Missing @
        vumailAddress: 'testuser@vumail.app',
        password: 'SecurePassword123!',
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain('must start with @');
    });

    it('should reject non-vumail.app email addresses', async () => {
      const result = await authService.registerUser({
        username: '@testuser',
        vumailAddress: 'testuser@gmail.com', // Not @vumail.app
        password: 'SecurePassword123!',
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain('@vumail.app');
    });

    it('should reject weak passwords', async () => {
      const result = await authService.registerUser({
        username: '@testuser',
        vumailAddress: 'testuser@vumail.app',
        password: '12345', // Too short
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain('at least 12 characters');
    });

    it('should reject duplicate usernames', async () => {
      // Create first user
      await authService.registerUser({
        username: '@testuser',
        vumailAddress: 'testuser1@vumail.app',
        password: 'SecurePassword123!',
      });

      // Try to create duplicate
      const result = await authService.registerUser({
        username: '@testuser', // Duplicate
        vumailAddress: 'testuser2@vumail.app',
        password: 'SecurePassword123!',
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain('already exists');
    });
  });

  describe('authenticateUser', () => {
    it('should authenticate with correct credentials', async () => {
      // Register user
      await authService.registerUser({
        username: '@testuser',
        vumailAddress: 'testuser@vumail.app',
        password: 'SecurePassword123!',
      });

      // Authenticate
      const result = await authService.authenticateUser(
        '@testuser',
        'SecurePassword123!'
      );

      expect(result.success).toBe(true);
      expect(result.userId).toBeDefined();
      expect(result.sessionToken).toBeDefined();
    });

    it('should reject wrong password', async () => {
      await authService.registerUser({
        username: '@testuser',
        vumailAddress: 'testuser@vumail.app',
        password: 'SecurePassword123!',
      });

      const result = await authService.authenticateUser(
        '@testuser',
        'WrongPassword456!'
      );

      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid credentials');
    });

    it('should reject non-existent user', async () => {
      const result = await authService.authenticateUser(
        '@nonexistent',
        'AnyPassword123!'
      );

      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid credentials');
    });
  });

  describe('validateSession', () => {
    it('should validate active session', async () => {
      // Register and get token
      const { sessionToken, userId } = await authService.registerUser({
        username: '@testuser',
        vumailAddress: 'testuser@vumail.app',
        password: 'SecurePassword123!',
      });

      // Validate session
      const session = await authService.validateSession(sessionToken!);

      expect(session).toBeDefined();
      expect(session!.userId).toBe(userId);
    });

    it('should reject invalid token', async () => {
      const session = await authService.validateSession('invalid-token');

      expect(session).toBeNull();
    });

    it('should reject expired session', async () => {
      // This test would require mocking time
      // or creating a session with past expiration
    });
  });

  describe('logout', () => {
    it('should delete session on logout', async () => {
      const { sessionToken } = await authService.registerUser({
        username: '@testuser',
        vumailAddress: 'testuser@vumail.app',
        password: 'SecurePassword123!',
      });

      // Logout
      const result = await authService.logout(sessionToken!);
      expect(result).toBe(true);

      // Verify session deleted
      const session = await authService.validateSession(sessionToken!);
      expect(session).toBeNull();
    });
  });
});
```

#### Task 5.3: API Endpoint Tests
**Priority**: P1  
**Estimated Time**: 2 days

```typescript
// src/routes/api/auth/register/+server.test.ts - CREATE THIS FILE
import { describe, it, expect, beforeEach } from 'vitest';
import { POST } from './+server';
import { prisma } from '$lib/server/database';

describe('POST /api/auth/register', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  it('should register user and set session cookie', async () => {
    const cookies = new Map();
    
    const response = await POST({
      request: new Request('http://localhost/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: '@newuser',
          vumailAddress: 'newuser@vumail.app',
          password: 'SecurePassword123!',
        }),
      }),
      cookies: {
        set: (name: string, value: string) => cookies.set(name, value),
        get: (name: string) => cookies.get(name),
        delete: (name: string) => cookies.delete(name),
      } as any,
    } as any);

    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.userId).toBeDefined();
    expect(cookies.has('session_token')).toBe(true);
  });

  it('should return 400 for invalid username', async () => {
    const response = await POST({
      request: new Request('http://localhost/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'noatsign', // Invalid
          vumailAddress: 'test@vumail.app',
          password: 'SecurePassword123!',
        }),
      }),
      cookies: {
        set: () => {},
        get: () => undefined,
        delete: () => {},
      } as any,
    } as any);

    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBeDefined();
  });
});
```

#### Task 5.4: E2E Tests with Playwright
**Priority**: P1  
**Estimated Time**: 3 days

```typescript
// e2e/authentication.test.ts - CREATE THIS FILE
import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should register new user', async ({ page }) => {
    await page.goto('/');
    
    // Click sign up
    await page.click('text=Sign Up');
    
    // Fill registration form
    await page.fill('input[name="username"]', '@testuser');
    await page.fill('input[name="vumailAddress"]', 'testuser@vumail.app');
    await page.fill('input[name="password"]', 'SecurePassword123!');
    
    // Submit
    await page.click('button[type="submit"]');
    
    // Should redirect to account page
    await expect(page).toHaveURL('/account');
    await expect(page.locator('h1')).toContainText('@testuser');
  });

  test('should login existing user', async ({ page }) => {
    // First register a user
    // ... registration code ...
    
    // Logout
    await page.click('text=Logout');
    
    // Login
    await page.click('text=Sign In');
    await page.fill('input[name="username"]', '@testuser');
    await page.fill('input[name="password"]', 'SecurePassword123!');
    await page.click('button[type="submit"]');
    
    // Should be logged in
    await expect(page).toHaveURL('/account');
  });

  test('should reject invalid credentials', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Sign In');
    
    await page.fill('input[name="username"]', '@nonexistent');
    await page.fill('input[name="password"]', 'WrongPassword123!');
    await page.click('button[type="submit"]');
    
    // Should show error
    await expect(page.locator('.error')).toContainText('Invalid credentials');
  });
});
```

**Test Coverage Goals**:
- ✅ Unit tests: 80% coverage
- ✅ API tests: 100% coverage
- ✅ E2E tests: Critical paths covered
- ✅ Authentication: 100% coverage
- ✅ Database operations: 100% coverage

---

### Phase 6: Translation Completion (Week 4-5)

#### Task 6.1: Complete Translation System
**Priority**: P2  
**Estimated Time**: 2 weeks

**Current Status**: 2/32 pages translated (Footer, VuChat)

**Remaining Pages** (27):
1. Homepage (`/+page.svelte`)
2. All Apps (`/apps/+page.svelte`)
3. Pricing (`/pricing/+page.svelte`)
4. Privacy Levels (`/privacy-levels/+page.svelte`)
5. Account Overview (`/account/+page.svelte`)
6. Downloads (`/account/downloads/+page.svelte`)
7. Subscriptions (`/account/subscriptions/+page.svelte`)
8. Settings (`/account/settings/+page.svelte`)
9-15. Legal pages (7 pages)
16-20. Developer pages (5 pages)
21-25. Resources (5 pages)
26-28. About (3 pages)
29-30. Support (2 pages)
31. Affiliate
32. Blog

**Translation Process** (per page):

1. Extract all user-facing text
2. Add to `src/lib/stores/translations.ts`
3. Update component with `data-i18n` attributes
4. Test language switching
5. Verify no hardcoded text remains

**Example**:
```typescript
// src/lib/stores/translations.ts - UPDATE THIS FILE
export const translations = {
  en: {
    // ... existing translations ...
    pricing: {
      title: 'Honest Pricing',
      subtitle: 'Pay for what you use. No hidden fees.',
      singleApp: 'Single App',
      completeSuite: 'Complete Suite',
      lifetime: 'Lifetime Access',
      perMonth: 'per month',
      selectPlan: 'Select Plan',
    },
  },
  es: {
    pricing: {
      title: 'Precios Honestos',
      subtitle: 'Paga por lo que usas. Sin tarifas ocultas.',
      singleApp: 'Aplicación Individual',
      completeSuite: 'Suite Completa',
      lifetime: 'Acceso de por Vida',
      perMonth: 'por mes',
      selectPlan: 'Seleccionar Plan',
    },
  },
  fr: {
    pricing: {
      title: 'Tarification Honnête',
      subtitle: 'Payez ce que vous utilisez. Aucun frais caché.',
      singleApp: 'Application Unique',
      completeSuite: 'Suite Complète',
      lifetime: 'Accès à Vie',
      perMonth: 'par mois',
      selectPlan: 'Sélectionner le Plan',
    },
  },
};
```

**Acceptance Criteria**:
- ✅ All 32 pages have complete translations (EN/ES/FR)
- ✅ Language switcher in header works on all pages
- ✅ Selected language persists in localStorage
- ✅ NO hardcoded text visible to users
- ✅ German language infrastructure added (ready for content)
- ✅ Translation system documented for future languages

---

### Phase 7: Production Optimization (Week 5-6)

#### Task 7.1: Remove Stripe Dependencies
**Priority**: P1  
**Estimated Time**: 2 hours

```bash
# Remove Stripe packages
npm uninstall stripe @stripe/stripe-js

# Remove Stripe server file
rm src/lib/server/stripe.ts

# Update package.json scripts if needed
```

#### Task 7.2: Security Hardening
**Priority**: P0  
**Estimated Time**: 1 day

```typescript
// src/hooks.server.ts - ADD SECURITY HEADERS
export const handle: Handle = async ({ event, resolve }) => {
  // Authentication (existing code)
  const token = event.cookies.get('session_token');
  if (token) {
    const user = await authService.getUserFromSession(token);
    if (user) {
      event.locals.user = user;
    }
  }
  
  const response = await resolve(event);
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'no-referrer');
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
  );
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );
  
  return response;
};
```

#### Task 7.3: Rate Limiting
**Priority**: P1  
**Estimated Time**: 1 day

```typescript
// src/lib/server/rate-limit.ts - CREATE THIS FILE
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(key);
  
  if (!entry || entry.resetAt < now) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });
    return true;
  }
  
  if (entry.count >= max) {
    return false;
  }
  
  entry.count++;
  return true;
}

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt < now) {
      rateLimitStore.delete(key);
    }
  }
}, 60000); // Every minute
```

```typescript
// Apply rate limiting to auth endpoints
// src/routes/api/auth/login/+server.ts - UPDATE
export const POST: RequestHandler = async ({ request, cookies, getClientAddress }) => {
  const ip = getClientAddress();
  
  // Rate limit: 5 login attempts per 15 minutes
  if (!rateLimit(`login:${ip}`, 5, 15 * 60 * 1000)) {
    return json({ error: 'Too many login attempts' }, { status: 429 });
  }
  
  // ... rest of login logic ...
};
```

#### Task 7.4: Performance Optimization
**Priority**: P2  
**Estimated Time**: 2 days

1. **Bundle Size Optimization**
```typescript
// vite.config.ts - UPDATE BUILD OPTIONS
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'svelte': ['svelte'],
          'vendor': ['lucide-svelte', 'clsx', 'tailwind-merge'],
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
});
```

2. **Image Optimization**
- Compress all PWA icons
- Use modern formats (WebP, AVIF)
- Implement lazy loading for app icons

3. **Database Query Optimization**
- Add indexes for frequently queried fields
- Use connection pooling
- Implement caching for static data (app catalog)

**Acceptance Criteria**:
- ✅ Lighthouse score > 90 (Performance, Accessibility, Best Practices, SEO)
- ✅ Bundle size < 500KB (gzipped)
- ✅ Time to Interactive < 3 seconds
- ✅ First Contentful Paint < 1.5 seconds

---

### Phase 8: CI/CD Pipeline (Week 6)

#### Task 8.1: GitHub Actions Workflow
**Priority**: P1  
**Estimated Time**: 1 day

```yaml
# .github/workflows/ci.yml - CREATE THIS FILE
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:15-alpine
        env:
          POSTGRES_DB: vuappstore_test
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Generate Prisma Client
        run: npx prisma generate
      
      - name: Run linter
        run: npm run lint
      
      - name: Type check
        run: npm run check
      
      - name: Run unit tests
        run: npm run test:run
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/vuappstore_test
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json

  build:
    runs-on: ubuntu-latest
    needs: test
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build application
        run: npm run build
      
      - name: Check bundle size
        run: |
          SIZE=$(du -sb build | cut -f1)
          MAX_SIZE=524288000 # 500MB
          if [ $SIZE -gt $MAX_SIZE ]; then
            echo "Bundle size exceeds 500MB"
            exit 1
          fi

  deploy:
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to production
        run: |
          echo "Deploy to Vercel/production server"
          # Add actual deployment commands
```

**Acceptance Criteria**:
- ✅ All tests run on every commit
- ✅ Build fails if tests fail
- ✅ Lint and type checking enforced
- ✅ Code coverage tracked
- ✅ Automatic deployment on main branch

---

## 📝 IMPLEMENTATION CHECKLIST

### Week 1: Foundation
- [ ] PostgreSQL database setup and configuration
- [ ] Update Prisma schema for VU philosophy
- [ ] Run migrations
- [ ] Implement database connection service
- [ ] Complete authentication system (register, login, logout)
- [ ] Create authentication API endpoints
- [ ] Update hooks.server.ts for session management

### Week 2: APIs & Testing
- [ ] User profile API (GET, PATCH)
- [ ] Subscription management API
- [ ] Downloads API
- [ ] Unit tests for authentication (80%+ coverage)
- [ ] API endpoint tests (100% coverage)
- [ ] Set up Playwright for E2E tests

### Week 3-4: Crypto Payments (Initial)
- [ ] Payment API server setup
- [ ] Monero service implementation
- [ ] Docker compose for crypto nodes
- [ ] Create payment invoice endpoint
- [ ] Payment status checking endpoint
- [ ] WebSocket for real-time updates

### Week 5: Translation & Optimization
- [ ] Complete translation for all 32 pages (EN/ES/FR)
- [ ] Remove Stripe dependencies
- [ ] Add security headers
- [ ] Implement rate limiting
- [ ] Performance optimization

### Week 6: Production Readiness
- [ ] Set up CI/CD pipeline
- [ ] E2E test suite completion
- [ ] Production environment configuration
- [ ] Monitoring and logging setup
- [ ] Security audit

### Week 7-10: Crypto Payments (Complete)
- [ ] Lightning Network integration
- [ ] Bitcoin/Ethereum integration
- [ ] Payment monitoring system
- [ ] Automated subscription activation
- [ ] Order fulfillment system
- [ ] Complete testing

---

## 🚨 CRITICAL RULES - MUST FOLLOW

### Code Quality Standards

1. **NO Placeholder Code**
   - NO `// TODO` comments in production
   - NO `console.log` statements (use proper logging)
   - NO commented-out code
   - NO mock data or fake responses

2. **Error Handling Requirements**
   ```typescript
   // ✅ GOOD
   try {
     const result = await someOperation();
     return { success: true, data: result };
   } catch (error) {
     console.error('Operation failed:', error);
     return { success: false, error: 'User-friendly message' };
   }
   
   // ❌ BAD
   const result = await someOperation(); // No error handling
   return result;
   ```

3. **Type Safety Requirements**
   ```typescript
   // ✅ GOOD
   interface CreateUserResponse {
     success: boolean;
     userId?: string;
     error?: string;
   }
   
   async function createUser(data: CreateUserInput): Promise<CreateUserResponse> {
     // ...
   }
   
   // ❌ BAD
   async function createUser(data: any): Promise<any> {
     // ...
   }
   ```

4. **VU Philosophy Enforcement**
   ```typescript
   // ✅ GOOD - VU Philosophy compliant
   interface User {
     username: string; // @username format
     vumailAddress: string; // @vumail.app only
     privacyLevel: number; // 0-4
   }
   
   // ❌ BAD - Violates VU Philosophy
   interface User {
     firstName: string; // NO real names
     lastName: string; // NO real names
     email: string; // Not restricted to @vumail.app
     phone: string; // NO phone numbers
   }
   ```

5. **Database Query Standards**
   ```typescript
   // ✅ GOOD - Full error handling
   try {
     const user = await prisma.user.findUnique({
       where: { id },
       select: {
         // Only select needed fields
         id: true,
         username: true,
         vumailAddress: true,
       },
     });
     
     if (!user) {
       return { error: 'User not found', status: 404 };
     }
     
     return { data: user, status: 200 };
   } catch (error) {
     const dbError = handlePrismaError(error);
     return { error: dbError.message, status: 500 };
   }
   
   // ❌ BAD - No error handling, selecting all fields
   const user = await prisma.user.findUnique({ where: { id } });
   return user;
   ```

---

## 📊 ACCEPTANCE CRITERIA FOR PRODUCTION

### Functionality Requirements
- ✅ Users can register with @username and @vumail.app
- ✅ Users can login and maintain sessions (7 days)
- ✅ Users can view their account information
- ✅ Users can view their subscriptions
- ✅ Users can view their download history
- ✅ Users can create subscriptions (pending payment)
- ✅ Payment processing works for all 3 crypto methods
- ✅ All 32 pages render without errors
- ✅ All pages are translated (EN/ES/FR)
- ✅ Mobile responsive on all pages
- ✅ PWA installable and works offline

### Security Requirements
- ✅ All passwords hashed with Argon2id
- ✅ All sessions use HttpOnly, Secure cookies
- ✅ All API endpoints validate authentication
- ✅ Rate limiting on sensitive endpoints (auth)
- ✅ Security headers configured
- ✅ NO secrets in code (environment variables only)
- ✅ Input validation with Zod on all endpoints

### Performance Requirements
- ✅ Lighthouse Performance score > 90
- ✅ Time to Interactive < 3 seconds
- ✅ First Contentful Paint < 1.5 seconds
- ✅ Bundle size < 500KB gzipped
- ✅ Database queries optimized with indexes

### Testing Requirements
- ✅ Unit test coverage > 80%
- ✅ API endpoint test coverage = 100%
- ✅ E2E tests cover critical user journeys
- ✅ All tests pass in CI/CD pipeline
- ✅ No linter errors
- ✅ No TypeScript errors

### VU Philosophy Compliance
- ✅ ONLY @username identities (no real names)
- ✅ ONLY @vumail.app addresses (enforced)
- ✅ NO phone numbers anywhere
- ✅ NO payment method storage
- ✅ Minimal data collection (4 fields only)
- ✅ Crypto-only payments
- ✅ Zero tracking or analytics

### Documentation Requirements
- ✅ API documentation complete
- ✅ Database schema documented
- ✅ Environment variables documented (.env.example)
- ✅ Setup instructions in README
- ✅ Deployment guide created
- ✅ User guide for crypto payments

---

## 🎯 SUCCESS METRICS

### Technical Metrics
- **Uptime**: 99.9% target
- **Response Time**: API < 200ms, Pages < 2s
- **Error Rate**: < 0.1%
- **Test Coverage**: > 80%
- **Security Incidents**: 0

### Business Metrics
- **User Registration**: Working
- **Subscription Creation**: Working
- **Payment Processing**: All 3 methods functional
- **Download Delivery**: Automated
- **Support Tickets**: < 1% of users

### VU Philosophy Metrics
- **Personal Data Collection**: 0 (only username, email, subscription, dates)
- **Tracking Scripts**: 0
- **Analytics**: 0
- **Third-party Services**: 0 (except crypto payment verification)
- **Privacy Violations**: 0

---

## 📞 DEPLOYMENT CHECKLIST

### Pre-Deployment
- [ ] All tests passing (unit, integration, E2E)
- [ ] No linter errors
- [ ] No TypeScript errors
- [ ] No `console.log` statements
- [ ] No TODO comments in production code
- [ ] Environment variables documented
- [ ] Database migrations ready
- [ ] Backup strategy in place

### Infrastructure
- [ ] PostgreSQL database provisioned
- [ ] Database backups configured
- [ ] Redis for caching (optional)
- [ ] CDN for static assets
- [ ] SSL/TLS certificates
- [ ] DNS configuration
- [ ] Monitoring tools (error tracking, uptime)
- [ ] Log aggregation

### Security
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Secrets in environment (not code)
- [ ] Database access restricted
- [ ] API endpoints protected
- [ ] Audit logging enabled

### Post-Deployment
- [ ] Smoke tests pass
- [ ] User registration works
- [ ] Login/logout works
- [ ] Database connectivity verified
- [ ] Monitoring alerts configured
- [ ] Backup verification
- [ ] SSL certificate valid
- [ ] Performance baseline established

---

## 🚀 FINAL NOTES

### Development Workflow
1. **Create feature branch** from `develop`
2. **Write tests first** (TDD approach)
3. **Implement feature** with full error handling
4. **Run all tests** locally
5. **Lint and type-check**
6. **Create PR** with description
7. **Code review** by team
8. **Merge to develop** after approval
9. **Deploy to staging** automatically
10. **Test on staging**
11. **Merge to main** for production
12. **Deploy to production** automatically

### Code Review Checklist
- [ ] Tests written and passing
- [ ] NO `any` types
- [ ] Full error handling
- [ ] VU Philosophy compliant
- [ ] NO hardcoded values
- [ ] Type-safe throughout
- [ ] NO console.log
- [ ] Comments for complex logic
- [ ] Performance considered
- [ ] Security validated

### Emergency Procedures
1. **Database Failure**: Automatic failover to replica
2. **Payment Service Down**: Queue payments, retry automatically
3. **High Traffic**: Auto-scaling configured
4. **Security Breach**: Incident response plan documented
5. **Data Loss**: Restore from latest backup (< 1 hour RPO)

---

## 📚 REFERENCE DOCUMENTATION

### Existing Documentation (DO NOT MODIFY)
- `COMPLETE_PLATFORM_STATUS.md` - Current platform status
- `PROJECT-PROGRESS.md` - Detailed progress tracking
- `VU_PHILOSOPHY_IMPLEMENTATION_SUMMARY.md` - VU Philosophy details
- `CRYPTO_PAYMENT_IMPLEMENTATION_GUIDE.md` - Payment implementation guide
- `TRANSLATION_IMPLEMENTATION_GUIDE.md` - Translation system guide
- `VU_DEVELOPER_GUIDELINES.md` - Developer reference

### New Documentation (TO CREATE)
- `DEPLOYMENT_GUIDE.md` - Production deployment instructions
- `API_DOCUMENTATION.md` - Complete API reference
- `DATABASE_SCHEMA.md` - Database design and relationships
- `TESTING_GUIDE.md` - How to write and run tests
- `CRYPTO_PAYMENT_USER_GUIDE.md` - User instructions for crypto payments

---

## ✅ COMPLETION DEFINITION

**VuAppStore is production-ready when:**

1. ✅ All users can register, login, and manage accounts
2. ✅ All database operations work reliably
3. ✅ All 3 crypto payment methods process successfully
4. ✅ All 32 pages render correctly in 3 languages
5. ✅ All tests pass with > 80% coverage
6. ✅ Security audit shows no critical vulnerabilities
7. ✅ Performance meets Lighthouse > 90 target
8. ✅ VU Philosophy 100% compliance maintained
9. ✅ CI/CD pipeline deploys automatically
10. ✅ Monitoring and logging operational
11. ✅ Documentation complete and up-to-date
12. ✅ Zero technical debt or placeholder code

---

**Generated**: December 19, 2025  
**Version**: 1.0  
**Status**: ACTIVE DIRECTIVE  
**Target Completion**: 10-12 weeks  
**Philosophy**: The VU Way - Privacy Without Compromise

🛡️ **VuAppStore Production Readiness Directive - END**

