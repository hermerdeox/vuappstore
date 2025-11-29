import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createChallenge } from '$lib/server/auth';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const { fingerprint } = body;

		if (!fingerprint) {
			return json({ error: 'Fingerprint required' }, { status: 400 });
		}

		const challenge = createChallenge(fingerprint);

		return json({
			nonce: challenge.nonce,
			expiresAt: challenge.expiresAt
		});
	} catch (error) {
		return json({ error: 'Invalid request' }, { status: 400 });
	}
};
