import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getAccessToken } from '$lib/utils/auth.server';
import type { SpotifyTrackSearchResult } from '$lib/types';

export const GET: RequestHandler = async (event) => {
	const artist = event.url.searchParams.get('artist');
	const title = event.url.searchParams.get('title');

	if (!artist || !title) throw error(400, `Song 'artist' and 'title' are required`);

	const token = await getAccessToken(event);

	const res = await fetch(
		`https://api.spotify.com/v1/search?type=track&q=artist:${artist} track:${title}`,
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		}
	);

	return json((await res.json()) as SpotifyTrackSearchResult);
};
