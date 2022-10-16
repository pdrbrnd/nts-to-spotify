import { redirect, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { requestTokens } from '$lib/utils/auth.server';
import { setCookies } from '$lib/utils/auth.server';

export const GET: RequestHandler = async (event) => {
	const code = event.url.searchParams.get('code');

	if (code) {
		const data = await requestTokens(code);

		setCookies(event, data);

		throw redirect(307, '/');
	} else {
		throw error(400, `'code' is required`);
	}
};
