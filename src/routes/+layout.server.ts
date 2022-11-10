import type { User } from '$lib/types';
import { getAccessToken } from '$lib/utils/auth.server';
import type { LayoutServerLoad } from './$types';

const images = ['/bg1.jpg', '/bg2.jpg', '/bg3.jpg', '/bg4.jpg', '/bg5.jpg', '/bg6.jpg', '/bg7.jpg'];

export const load: LayoutServerLoad = async (event) => {
	const bgImage = images[Math.floor(Math.random() * 100) % images.length];
	const token = await getAccessToken(event);

	if (!token) return { user: null, bgImage };

	const res = await event.fetch('https://api.spotify.com/v1/me', {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	return {
		user: (await res.json()) as User,
		bgImage
	};
};
