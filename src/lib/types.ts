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
} | null;

type SpotifyAlbum = {
	album_type: string;
	total_tracks: number;
	available_markets: string[];
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	images: {
		url: string;
		height: number;
		width: number;
	}[];
	name: string;
	release_date: string;
	release_date_precision: 'year' | 'month' | 'day';
	restrictions?: {
		reason?: 'market' | 'product' | 'explicit';
	};
	type: 'album';
	uri: string;
	album_group?: 'album' | 'single' | 'compilation' | 'appears_on';
	artists: SpotifyArtist[];
};

type SpotifyArtist = {
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	name: string;
	type: 'artist';
	uri: string;
};

type SpotifyTrack = {
	album: SpotifyAlbum;
	artists: SpotifyArtist[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_ids: Record<string, string>;
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	restrictions?: {
		reason?: 'market' | 'product' | 'explicit';
	};
	name: string;
	popularity: number;
	preview_url: string | null;
	track_number: number;
	type: 'track';
	uri: string;
	is_local: boolean;
};

export type SpotifyTrackSearchResult = {
	tracks: {
		href: string;
		limit: number;
		offset: number;
		total: number;
		next: string;
		previous: string;
		items: SpotifyTrack[];
	};
};

export type URI = string;

export type BasicTrack = {
	artist: string;
	title: string;
};

export type Match = {
	uri: URI;
	artist: string;
	title: string;
	cover?: string;
	preview?: string;
	href: string;
};
