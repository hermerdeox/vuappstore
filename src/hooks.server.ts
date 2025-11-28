import type { Handle } from '@sveltejs/kit';
import { verifySessionToken, extractToken, extractTokenFromCookie } from '$lib/server/auth';

// Routes that require authentication
const PROTECTED_ROUTES = ['/api/user', '/api/subscriptions'];

// Routes that prefer authentication but don't require it
const AUTH_PREFERRED_ROUTES = ['/account'];

export const handle: Handle = async ({ event, resolve }) => {
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

