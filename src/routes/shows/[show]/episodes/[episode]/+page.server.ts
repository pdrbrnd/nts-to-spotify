import { getAccessToken } from '$lib/utils/auth.server';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getCheerioDocument, getNTSData } from '$lib/utils/nts.server';
import { routeParamsToNtsUrl } from '$lib/utils/nts';

export const load: PageServerLoad = async (event) => {
	const {
		params: { show, episode }
	} = event;

	const url = routeParamsToNtsUrl(show, episode);

	const token = await getAccessToken(event);

	if (!token) throw redirect(307, '/');

	const document = await getCheerioDocument(url);
	const data = await getNTSData(document);

	return data;
};
