import type { PageServerLoad } from './$types';
import { routeParamsToNtsUrl } from '$lib/utils/nts';
import { load as cheerioLoad } from 'cheerio';
import { error } from '@sveltejs/kit';
import type { Match, SpotifyTrackSearchResult } from '$lib/types';
import { getClientCredentials, getNTSData, sleep } from './utils.server';

const fetchNext = async (
	token: string,
	artist: string,
	title: string
): Promise<{ artist: string; title: string; matches: Match[] }> => {
	const res = await fetch(
		`https://api.spotify.com/v1/search?type=track&q=artist:${artist} track:${title}`,
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		}
	);

	if (res.status === 429) {
		await sleep(Number(res.headers.get('Retry-After') || 1) * 1000);
		return fetchNext(token, artist, title);
	}

	const result = (await res.json()) as SpotifyTrackSearchResult;

	const matches = (result.tracks?.items || []).map((item) => ({
		artist: item.artists[0].name,
		title: item.name,
		uri: item.uri,
		preview: item.preview_url || undefined,
		cover: item.album.images[0].url
	}));

	return { artist, title, matches };
};

export const load: PageServerLoad = async ({ params, fetch }) => {
	const { show, episode } = params;

	try {
		// load NTS episode
		const res = await fetch(routeParamsToNtsUrl(show, episode));

		if (!res.ok) throw new Error();

		const cheerio = cheerioLoad(await res.text());

		const data = getNTSData(cheerio);

		const token = await getClientCredentials();

		if (!token) throw error(401, 'Not authorized');

		const tracks = await Promise.all(
			data.tracks.map(({ artist, title }) => fetchNext(token, artist, title))
		);

		return {
			...data,
			tracks
		};
	} catch (err) {
		console.error(err);
		throw error(500, `Unable to load document from url: ${routeParamsToNtsUrl(show, episode)}`);
	}
};
