import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '$lib/constants';

export const GET: RequestHandler = async (event) => {
	event.cookies.set(ACCESS_TOKEN_KEY, '', {
		maxAge: -1
	});
	event.cookies.set(REFRESH_TOKEN_KEY, '', {
		maxAge: -1
	});

	throw redirect(307, '/');
};
