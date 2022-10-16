<script>
	import { env } from '$env/dynamic/public';
	import { SPOTIFY_REDIRECT_URI, SPOTIFY_SCOPES } from '$lib/constants';
</script>

<a
	href={`https://accounts.spotify.com/authorize?${new URLSearchParams({
		client_id: env.PUBLIC_SPOTIFY_CLIENT_ID,
		redirect_uri: SPOTIFY_REDIRECT_URI,
		scope: SPOTIFY_SCOPES,
		response_type: 'code'
	}).toString()}`}>Start authorization</a
>
