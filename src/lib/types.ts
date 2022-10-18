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
