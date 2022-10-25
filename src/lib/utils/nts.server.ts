import { load } from 'cheerio';
import type { CheerioAPI } from 'cheerio';
import { error } from '@sveltejs/kit';

export const getCheerioDocument = async (url: string) => {
	const res = await fetch(url);

	if (!res.ok) {
		throw error(404, `Unable to load document from url: ${url}`);
	}

	return load(await res.text());
};

export const getNTSData = ($: CheerioAPI) => {
	const title = $('h1').first().text();

	// Description
	const description = $('.description h3').first().text();

	// Show date
	const date = $('#episode-broadcast-date').text().replace(',', '').replaceAll('.', '-').trim();

	// Cover image
	const cover = $('meta[property="og:image"]').attr('content') || '';

	// Genres
	const genres: string[] = [];
	$('.episode-genres a').each((_i, el) => {
		genres.push($(el).text());
	});

	// Tracks
	const tracks: { artist: string; title: string }[] = [];

	$('ul.tracks li.track').each((_i, el) => {
		const artist = $(el).find('.track__artist:not(.track__artist--mobile)').text();
		const title = $(el).find('.track__title').text();

		tracks.push({ artist, title });
	});

	return { title, description, date, genres, cover, tracks };
};
