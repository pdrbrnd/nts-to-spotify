import { redirect, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { startUserSession } from '$lib/utils/auth.server';

export const GET: RequestHandler = async (event) => {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');

	if (code) {
		await startUserSession(event, code);

		const path = state && state.startsWith('/') ? state : '/';

		throw redirect(307, path);
	} else {
		throw error(400, `'code' is required`);
	}
};
