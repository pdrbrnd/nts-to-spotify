<script lang="ts">
	import { page } from '$app/stores';
	import { env } from '$env/dynamic/public';
	import { SPOTIFY_SCOPES } from '$lib/constants';

	export let label = 'Login with Spotify';

	import Button from './button.svelte';

	export let variant: Button['$$prop_def']['variant'] = 'solid';
</script>

<Button
	as="a"
	{variant}
	href={`https://accounts.spotify.com/authorize?${new URLSearchParams({
		client_id: env.PUBLIC_SPOTIFY_CLIENT_ID,
		redirect_uri: env.PUBLIC_SPOTIFY_REDIRECT_URI,
		scope: SPOTIFY_SCOPES,
		state: $page.url.pathname,
		response_type: 'code'
	}).toString()}`}
	icon="spotify"
>
	{label}
</Button>
