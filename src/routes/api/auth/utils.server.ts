import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import { error, type RequestEvent } from '@sveltejs/kit';
import { ACCESS_TOKEN_KEY, SPOTIFY_REDIRECT_URI } from '$lib/constants';

type AccessTokenResponse = {
	access_token: string;
	token_type: string;
	scope: string;
	expires_in: number;
};

type RefreshTokenResponse = AccessTokenResponse & {
	refresh_token: string;
};

export const getRefreshToken = async (code: string) => {
	const res = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		body: new URLSearchParams({
			grant_type: 'authorization_code',
			code,
			redirect_uri: SPOTIFY_REDIRECT_URI
		}),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${Buffer.from(
				`${publicEnv.PUBLIC_SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`
			).toString('base64')}`
		}
	});

	if (!res.ok) throw error(401, 'Not authorized');

	return (await res.json()) as RefreshTokenResponse;
};

export const getAccessToken = async (refreshToken: string) => {
	const res = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: refreshToken
		}),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${Buffer.from(
				`${publicEnv.PUBLIC_SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`
			).toString('base64')}`
		}
	});

	if (!res.ok) throw error(401, 'Not authorized');

	return (await res.json()) as AccessTokenResponse;
};

export const refreshAccessToken = async (refreshToken: string, event: RequestEvent) => {
	const { access_token, expires_in } = await getAccessToken(refreshToken);

	event.cookies.set(ACCESS_TOKEN_KEY, access_token, {
		httpOnly: true,
		maxAge: expires_in
	});

	return access_token;
};
