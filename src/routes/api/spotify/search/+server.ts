import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { SpotifyTrackSearchResult } from '$lib/types';

const getClientCredentials = async () => {
	try {
		const res = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			body: new URLSearchParams({
				grant_type: 'client_credentials'
			}),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${Buffer.from(
					`${publicEnv.PUBLIC_SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`
				).toString('base64')}`
			}
		});

		const data: { access_token: string } = await res.json();

		return data.access_token;
	} catch (error) {
		return null;
	}
};

export const GET: RequestHandler = async (event) => {
	const artist = event.url.searchParams.get('artist');
	const track = event.url.searchParams.get('track');

	if (!artist || !track) throw error(400, `Song 'artist' and 'track' are required`);

	const accessToken = await getClientCredentials();

	if (!accessToken) throw error(401, 'Not autorized');

	try {
		const res = await event.fetch(
			`https://api.spotify.com/v1/search?type=track&q=artist:${artist} track:${track}`,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`
				}
			}
		);

		const data: SpotifyTrackSearchResult = await res.json();

		return json(data);
	} catch (err) {
		throw error(404, `Track not found`);
	}
};
