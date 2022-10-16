import { redirect, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '$lib/constants';
import { getRefreshToken } from '../utils.server';

export const GET: RequestHandler = async (event) => {
	const code = event.url.searchParams.get('code');

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
	} else {
		throw error(400, `'code' is required`);
	}
};
