import type { User } from '$lib/types';
import { getAccessToken } from '$lib/utils/auth.server';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const token = await getAccessToken(event);

	if (!token) return { user: null };

	const res = await event.fetch('https://api.spotify.com/v1/me', {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	return {
		user: (await res.json()) as User
	};
};
