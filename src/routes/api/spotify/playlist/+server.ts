import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getAccessToken } from '$lib/utils/auth.server';

export const POST: RequestHandler = async (event) => {
	const { user, cover, name, description, tracks } = (await event.request.json()) as {
		user: string;
		name: string;
		description: string;
		cover: string;
		tracks: string[];
	};

	if ([user, name, description, cover, tracks].some((field) => !field)) {
		throw error(400, `User, name, description, cover and tracks are required`);
	}

	const token = await getAccessToken(event);
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`
	};

	try {
		const createPlaylist = await event.fetch(`https://api.spotify.com/v1/users/${user}/playlists`, {
			method: 'POST',
			body: JSON.stringify({ name, description }),
			headers
		});
		const { id: playlistId } = await createPlaylist.json();

		// cover
		await event.fetch(`https://api.spotify.com/v1/playlists/${playlistId}/images`, {
			method: 'PUT',
			body: cover.replace('data:image/jpeg;base64,', '').replaceAll('\n', ''),
			headers: {
				...headers,
				'Content-Type': 'image/jpeg'
			}
		});

		// add tracks
		await event.fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
			method: 'POST',
			body: JSON.stringify({ uris: tracks }),
			headers
		});

		return json('ok');
	} catch (err) {
		throw error(500, 'Error importing');
	}
};
