import { env } from '$env/dynamic/private';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getCheerioDocument, getNTSData } from './utils.server';

export const GET: RequestHandler = async (event) => {
	const url = event.url.searchParams.get('url');

	if (!url) throw error(400, `'url' is required`);

	if (
		!(url.startsWith('https://www.nts.live/shows/') || url.startsWith('https://nts.live/shows/'))
	) {
		throw error(400, `Expecting an NTS episode. Received: ${url}`);
	}

	const document = await getCheerioDocument(url);
	const data = await getNTSData(document);

	return json({ clientId: env.SPOTIFY_CLIENT_ID, clientSecret: env.SPOTIFY_CLIENT_SECRET });
};
