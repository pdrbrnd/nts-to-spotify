import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '$lib/constants';
import { refreshAccessToken } from '../utils.server';
import type { User } from '$lib/stores/me';

export const GET: RequestHandler = async (event) => {
	const refresh = event.cookies.get(REFRESH_TOKEN_KEY);

	if (!refresh) return json(null);

	const access = event.cookies.get(ACCESS_TOKEN_KEY) || (await refreshAccessToken(refresh, event));

	const res = await fetch('https://api.spotify.com/v1/me', {
		headers: {
			Authorization: `Bearer ${access}`
		}
	});

	return json((await res.json()) as User);
};
