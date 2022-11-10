import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { startUserSession } from '$lib/utils/auth.server';
import { SPOTIFY_SCOPES } from '$lib/constants';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async (event) => {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');

	if (code) {
		await startUserSession(event, code);

		const path = state && state.startsWith('/') ? state : '/';

		throw redirect(307, path);
	} else {
		throw redirect(
			307,
			`https://accounts.spotify.com/authorize?${new URLSearchParams({
				client_id: env.SPOTIFY_CLIENT_ID || '',
				redirect_uri: `${event.url.origin}/login`,
				scope: SPOTIFY_SCOPES,
				state: event.request.headers.get('referer')?.replace(event.url.origin, '') || '',
				response_type: 'code'
			}).toString()}`
		);
	}
};
