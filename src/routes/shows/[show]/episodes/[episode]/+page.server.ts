import type { PageServerLoad } from './$types';
import { routeParamsToNtsUrl } from '$lib/utils/nts';
import { load as cheerioLoad } from 'cheerio';
import { error } from '@sveltejs/kit';
import type { Match, SpotifyTrackSearchResult } from '$lib/types';
import { getClientCredentials, getNTSData, sleep } from './utils.server';

const fetchNext = async ({
	token,
	artist,
	title,
	retry
}: {
	token: string;
	artist: string;
	title: string;
	retry?: boolean;
}): Promise<{ artist: string; title: string; matches: Match[]; retry?: boolean }> => {
	let url = `https://api.spotify.com/v1/search?type=track&q=track:${encodeURIComponent(title)}`;

	// if it's the first attempt, let's try to fetch with the artist name (might make it too specific though)
	if (!retry) {
		url += `%20artist:${encodeURIComponent(artist)}`;
	}

	const res = await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	});

	if (res.status === 429) {
		await sleep(Number(res.headers.get('Retry-After') || 1) * 1000);
		return fetchNext({ token, artist, title });
	}

	const result = (await res.json()) as SpotifyTrackSearchResult;

	if ((result.tracks?.items || []).length === 0 && !retry) {
		return fetchNext({ token, artist, title, retry: true });
	}

	const matches = (result.tracks?.items || []).map((item) => ({
		artist: item.artists[0].name,
		title: item.name,
		uri: item.uri,
		preview: item.preview_url || undefined,
		cover: item.album.images[0]?.url,
		href: item.external_urls.spotify
	}));

	return { artist, title, matches, retry };
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
			data.tracks.map(({ artist, title }) => fetchNext({ token, title, artist }))
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
