import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { verifyAuthProof, consumeChallenge } from '$lib/server/auth';
import type { AuthProof } from '$lib/auth/identity';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const proof: AuthProof = await request.json();

		// Get and consume challenge
		const challenge = consumeChallenge(proof.fingerprint);
		if (!challenge) {
			return json({ error: 'Invalid or expired challenge' }, { status: 401 });
		}

		// Verify proof
		const result = await verifyAuthProof(proof, challenge.nonce);

		if (!result.valid) {
			return json({ error: result.error }, { status: 401 });
		}

		// Here you would typically:
		// 1. Look up or create user in database by fingerprint
		// 2. Return user data or subscription status

		return json({
			authenticated: true,
			fingerprint: proof.fingerprint
		});
	} catch (error) {
		return json({ error: 'Invalid request' }, { status: 400 });
	}
};
