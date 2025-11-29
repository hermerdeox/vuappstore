import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { verifySessionToken, extractToken, extractTokenFromCookie } from '$lib/server/auth';

// Routes that require authentication
const PROTECTED_ROUTES = ['/api/user', '/api/subscriptions'];

// Routes that prefer authentication but don't require it
// Used for future middleware enhancements
const _AUTH_PREFERRED_ROUTES = ['/account'];

/**
 * Security Headers Handler
 * Implements Content Security Policy and other security headers
 */
const securityHeaders: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	// Content Security Policy - strict but functional for SvelteKit
	const csp = [
		"default-src 'self'",
		"script-src 'self' 'unsafe-inline'", // Need unsafe-inline for SvelteKit hydration
		"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
		"font-src 'self' https://fonts.gstatic.com",
		"img-src 'self' data: blob:",
		"connect-src 'self'",
		"frame-ancestors 'none'",
		"form-action 'self'",
		"base-uri 'self'",
		'upgrade-insecure-requests'
	].join('; ');

	response.headers.set('Content-Security-Policy', csp);
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('X-XSS-Protection', '1; mode=block');
	response.headers.set(
		'Permissions-Policy',
		'camera=(), microphone=(), geolocation=(), interest-cohort=()'
	);

	// HSTS (only in production)
	if (process.env.NODE_ENV === 'production') {
		response.headers.set(
			'Strict-Transport-Security',
			'max-age=31536000; includeSubDomains; preload'
		);
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
 * Verifies VU Sovereign Identity tokens
 */
const auth: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;

	// Try to extract token from header or cookie
	const authHeader = event.request.headers.get('Authorization');
	const cookieHeader = event.request.headers.get('Cookie');

	const tokenString = extractToken(authHeader) || extractTokenFromCookie(cookieHeader);

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
 * Order: Security Headers → Rate Limiting → Authentication
 */
export const handle = sequence(securityHeaders, rateLimit, auth);
