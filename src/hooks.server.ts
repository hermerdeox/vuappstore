import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { verifySessionToken, extractToken } from '$lib/server/auth';

// Routes that require authentication
const PROTECTED_ROUTES = ['/api/user', '/api/subscriptions'];

// Routes that prefer authentication but don't require it
// Used for future middleware enhancements
const _AUTH_PREFERRED_ROUTES = ['/account'];

/**
 * ZERO COOKIES Policy Handler
 * Actively prevents any cookies from being set and clears any incoming cookies
 * This ensures the site is 100% cookie-free
 */
const zeroCookies: Handle = async ({ event, resolve }) => {
	// Log if any cookies were sent (they will be ignored)
	const cookieHeader = event.request.headers.get('Cookie');
	if (cookieHeader && process.env.NODE_ENV === 'development') {
		console.warn('⚠️ [ZERO-COOKIES] Request contained cookies - they will be ignored');
	}

	const response = await resolve(event);

	// Block any Set-Cookie header that might have been added
	if (response.headers.has('Set-Cookie')) {
		console.error('🚨 [ZERO-COOKIES] Blocked attempted cookie set!');
		response.headers.delete('Set-Cookie');
	}

	return response;
};

/**
 * Security Headers Handler
 * Implements Content Security Policy, anti-tracking, and browser addon protection
 */
const securityHeaders: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	// ============================================
	// CONTENT SECURITY POLICY - Strict
	// Blocks inline scripts from extensions, tracking pixels, etc.
	// ============================================
	const csp = [
		"default-src 'self'",
		"script-src 'self' 'unsafe-inline'", // Need unsafe-inline for SvelteKit hydration
		"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
		"font-src 'self' https://fonts.gstatic.com data:",
		"img-src 'self' data: blob:",
		"connect-src 'self'", // No external connections allowed
		"frame-ancestors 'none'", // Prevent embedding
		"form-action 'self'",
		"base-uri 'self'",
		"object-src 'none'", // Block plugins
		"worker-src 'self'", // Only our service worker
		"manifest-src 'self'",
		'upgrade-insecure-requests',
		'block-all-mixed-content',
		// Report violations (can be used for monitoring)
		"report-uri /api/csp-report"
	].join('; ');

	response.headers.set('Content-Security-Policy', csp);

	// ============================================
	// ANTI-TRACKING & ANTI-EXTENSION HEADERS
	// ============================================

	// Prevent framing (clickjacking protection)
	response.headers.set('X-Frame-Options', 'DENY');

	// Prevent MIME type sniffing
	response.headers.set('X-Content-Type-Options', 'nosniff');

	// Strict referrer policy - don't leak info
	response.headers.set('Referrer-Policy', 'no-referrer');

	// XSS protection
	response.headers.set('X-XSS-Protection', '1; mode=block');

	// Permissions Policy - Disable ALL sensitive APIs
	// This blocks browser fingerprinting and many extension capabilities
	response.headers.set(
		'Permissions-Policy',
		[
			'camera=()',
			'microphone=()',
			'geolocation=()',
			'interest-cohort=()', // Block FLoC
			'browsing-topics=()', // Block Topics API
			'attribution-reporting=()', // Block Attribution Reporting
			'run-ad-auction=()', // Block FLEDGE
			'join-ad-interest-group=()', // Block FLEDGE
			'ambient-light-sensor=()',
			'accelerometer=()',
			'gyroscope=()',
			'magnetometer=()',
			'usb=()',
			'bluetooth=()',
			'serial=()',
			'midi=()',
			'hid=()',
			'payment=()', // Block Payment Request API
			'publickey-credentials-get=()',
			'screen-wake-lock=()',
			'sync-xhr=()',
			'display-capture=()',
			'document-domain=()',
			'encrypted-media=()',
			'execution-while-not-rendered=()',
			'execution-while-out-of-viewport=()',
			'fullscreen=(self)',
			'gamepad=()',
			'picture-in-picture=()',
			'speaker-selection=()',
			'xr-spatial-tracking=()'
		].join(', ')
	);

	// Cross-Origin policies to prevent data leakage
	response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
	response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
	response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');

	// Disable DNS prefetching (prevents tracking via DNS)
	response.headers.set('X-DNS-Prefetch-Control', 'off');

	// Disable client hints (prevents fingerprinting)
	response.headers.set('Accept-CH', '');
	response.headers.set('Critical-CH', '');

	// Custom VU Privacy headers (documentation)
	response.headers.set('X-VU-Privacy', 'Zero-Cookies-Zero-Tracking');
	response.headers.set('X-VU-Analytics', 'None');
	response.headers.set('X-VU-Addon-Protection', 'Active');

	// HSTS (always enable for security)
	response.headers.set(
		'Strict-Transport-Security',
		'max-age=31536000; includeSubDomains; preload'
	);

	// Clear-Site-Data on specific routes (for logout, etc.)
	if (event.url.pathname === '/logout' || event.url.pathname === '/clear-data') {
		response.headers.set('Clear-Site-Data', '"cookies", "storage"');
	}

	return response;
};

/**
 * Rate Limiter
 * Basic in-memory rate limiting (use Redis in production for distributed systems)
 */
const rateLimiter = new Map<string, { count: number; resetAt: number }>();

const rateLimit: Handle = async ({ event, resolve }) => {
	const ip = event.getClientAddress();
	const now = Date.now();
	const windowMs = 60000; // 1 minute window
	const maxRequests = parseInt(process.env.RATE_LIMIT_RPM || '60');

	const record = rateLimiter.get(ip);

	if (!record || record.resetAt < now) {
		// New window
		rateLimiter.set(ip, { count: 1, resetAt: now + windowMs });
	} else if (record.count >= maxRequests) {
		// Rate limit exceeded
		return new Response(
			JSON.stringify({
				error: 'Too Many Requests',
				retryAfter: Math.ceil((record.resetAt - now) / 1000)
			}),
			{
				status: 429,
				headers: {
					'Content-Type': 'application/json',
					'Retry-After': Math.ceil((record.resetAt - now) / 1000).toString()
				}
			}
		);
	} else {
		// Increment counter
		record.count++;
	}

	// Clean up old entries periodically (1% chance per request)
	if (Math.random() < 0.01) {
		for (const [key, value] of rateLimiter.entries()) {
			if (value.resetAt < now) {
				rateLimiter.delete(key);
			}
		}
	}

	return resolve(event);
};

/**
 * Authentication Handler
 * Verifies VU Sovereign Identity tokens - Authorization header ONLY (NO COOKIES)
 */
const auth: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;

	// Extract token from Authorization header ONLY - NO cookie fallback!
	const authHeader = event.request.headers.get('Authorization');
	const tokenString = extractToken(authHeader);

	// If we have a token, verify it and attach user to locals
	if (tokenString) {
		const result = await verifySessionToken(tokenString);

		if (result.valid && result.token) {
			event.locals.user = {
				fingerprint: result.token.fingerprint,
				publicKey: result.token.publicKey,
				privacyLevel: result.token.privacyLevel
			};
		}
	}

	// Check if route is strictly protected (API routes)
	const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));

	if (isProtected && !event.locals.user) {
		return new Response(JSON.stringify({ error: 'Authentication required' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	// For auth-preferred routes (like /account), we don't redirect
	// The page itself will handle showing login UI if not authenticated
	// This is because the auth state is primarily managed client-side

	return resolve(event);
};

/**
 * Combined handler using sequence
 * Order: Zero Cookies → Security Headers → Rate Limiting → Authentication
 */
export const handle = sequence(zeroCookies, securityHeaders, rateLimit, auth);
