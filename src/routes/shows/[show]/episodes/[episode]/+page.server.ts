import type { PageServerLoad } from './$types';
import { routeParamsToNtsUrl } from '$lib/utils/nts';
import { load as cheerioLoad, type CheerioAPI } from 'cheerio';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const { show, episode } = params;

	try {
		// load NTS episode
		const res = await fetch(routeParamsToNtsUrl(show, episode));

		if (!res.ok) throw new Error();

		const cheerio = cheerioLoad(await res.text());

		return getNTSData(cheerio);
	} catch (err) {
		console.error(err);
		throw error(500, `Unable to load document from url: ${routeParamsToNtsUrl(show, episode)}`);
	}
};

function getNTSData(cheerio: CheerioAPI) {
	const title = cheerio('h1').first().text();

	// Description
	const description = cheerio('.description h3').first().text();

	// Show date
	const date = cheerio('#episode-broadcast-date')
		.text()
		.replace(',', '')
		.replaceAll('.', '-')
		.trim();

	// Cover image
	const cover = cheerio('meta[property="og:image"]').attr('content') || '';

	// Genres
	const genres: string[] = [];
	cheerio('.episode-genres a').each((_i, el) => {
		genres.push(cheerio(el).text());
	});

	// Tracks
	const tracks: { artist: string; title: string }[] = [];

	cheerio('ul.tracks li.track').each((_i, el) => {
		const artist = cheerio(el).find('.track__artist:not(.track__artist--mobile)').text();
		const title = cheerio(el).find('.track__title').text();

		tracks.push({ artist, title });
	});

	return { title, description, date, genres, cover, tracks };
}
