import { redirect, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '$lib/constants';
import { getRefreshToken, refreshAccessToken } from './utils.server';
import type { User } from '$lib/stores/me';

export const GET: RequestHandler = async (event) => {
	const code = event.url.searchParams.get('code');

	// starting authentication flow
	if (code) {
		const { access_token, expires_in, refresh_token } = await getRefreshToken(code);

		event.cookies.set(ACCESS_TOKEN_KEY, access_token, {
			httpOnly: true,
			maxAge: expires_in
		});
		event.cookies.set(REFRESH_TOKEN_KEY, refresh_token, {
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 30
		});

		throw redirect(307, '/');
	}

	// refresh token flow
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
