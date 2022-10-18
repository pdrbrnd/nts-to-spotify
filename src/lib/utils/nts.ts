export const routeParamsToNtsUrl = (show: string, episode: string) => {
	return `https://nts.live/shows/${show}/episodes/${episode}`;
};

export const ntsUrlToParams = (url: string) => {
	if (
		!(url.startsWith('https://www.nts.live/shows/') || url.startsWith('https://nts.live/shows/'))
	) {
		throw new Error(`Expecting an NTS episode. Received: ${url}`);
	}

	const reg = /^.+\/shows\/(.+)\/episodes\/(.+)$/gim;
	const [_, show, episode] = reg.exec(url) || [];

	if (!show || !episode) throw new Error(`Invalid NTS url. Can't find the show and episode`);

	return { show, episode };
};

export const ntsUrlToRouteUrl = (url: string) => {
	try {
		const { show, episode } = ntsUrlToParams(url);

		return `/shows/${show}/episodes/${episode}`;
	} catch (error) {
		return '/404';
	}
};
