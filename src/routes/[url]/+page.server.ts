import { getAccessToken } from '$lib/utils/auth.server';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getCheerioDocument, getNTSData } from '$lib/utils/nts.server';

export const load: PageServerLoad = async (event) => {
	const {
		params: { url }
	} = event;

	const token = await getAccessToken(event);

	if (!token) throw redirect(307, '/');

	if (
		!(url.startsWith('https://www.nts.live/shows/') || url.startsWith('https://nts.live/shows/'))
	) {
		throw error(400, `Expecting an NTS episode. Received: ${url}`);
	}

	const document = await getCheerioDocument(url);
	const data = await getNTSData(document);

	return data;
};
