import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { User } from '$lib/stores/me';
import { getAccessToken } from '$lib/utils/auth.server';

export const GET: RequestHandler = async (event) => {
	const token = await getAccessToken(event);

	if (!token) return json(null);

	const res = await fetch('https://api.spotify.com/v1/me', {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	return json((await res.json()) as User);
};
