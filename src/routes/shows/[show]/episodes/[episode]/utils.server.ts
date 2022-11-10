import { env } from '$env/dynamic/private';
import type { CheerioAPI } from 'cheerio';

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getClientCredentials = async () => {
	try {
		const res = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			body: new URLSearchParams({
				grant_type: 'client_credentials'
			}),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${Buffer.from(
					`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`
				).toString('base64')}`
			}
		});

		const data: { access_token: string } = await res.json();

		return data.access_token;
	} catch (error) {
		return null;
	}
};

export function getNTSData(cheerio: CheerioAPI) {
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
