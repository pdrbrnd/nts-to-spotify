import { redirect, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { requestTokens } from '$lib/utils/auth.server';
import { setCookies } from '$lib/utils/auth.server';
import { REDIRECT_TO_KEY } from '$lib/constants';

export const GET: RequestHandler = async (event) => {
	const code = event.url.searchParams.get('code');

	if (code) {
		const data = await requestTokens(code);

		setCookies(event, data);

		// check if the user tried to access an episode without authentication
		const path = event.cookies.get(REDIRECT_TO_KEY) || '/';
		// remove the redirect cookie
		event.cookies.set(REDIRECT_TO_KEY, '', { maxAge: -1, path: '/' });
		throw redirect(307, path);
	} else {
		throw error(400, `'code' is required`);
	}
};
