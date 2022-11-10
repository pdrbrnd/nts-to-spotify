import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const imageUrl = url.searchParams.get('url');

	if (!imageUrl) throw error(404, 'Not found');

	const res = await fetch(imageUrl);
	const blob = await res.blob();

	return new Response(blob);
};
