import { browser } from '$app/environment';
import { readable } from 'svelte/store';

export type User = {
	id: string;
	display_name: string;
	email: string;
	href?: string | null;
	images: {
		width?: number | null;
		height?: number | null;
		url?: string;
	}[];
};

export const me = readable<User | null | undefined>(undefined, function start(set) {
	if (!browser) return;

	const fetchUser = async () => {
		const res = await fetch('/api/auth');
		set((await res.json()) as User | null);
	};

	// Fetch once initially
	fetchUser();

	// Fetch every 30 seconds
	const interval = setInterval(fetchUser, 30000);

	// Fetch whenever the tab gains focus
	const onVisibilityChange = () => {
		if (document.visibilityState === 'visible') {
			fetchUser();
		}
	};
	document.addEventListener('visibilitychange', onVisibilityChange);

	return () => {
		clearInterval(interval);
		document.removeEventListener('visibilitychange', onVisibilityChange);
	};
});
