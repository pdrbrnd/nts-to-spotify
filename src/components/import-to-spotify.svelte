<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$components';
	import { onDestroy } from 'svelte';
	import LoginWithSpotify from './login-with-spotify.svelte';

	export let disabled: boolean = false;
	export let data: {
		title: string;
		description: string;
		date: string;
		cover: string;
		tracks: string[];
	};

	const me = $page.data.user;

	let creating: boolean;
	let success: boolean;
	let successTimeout: NodeJS.Timeout;

	const handleClick = async () => {
		if (!me) return;

		creating = true;

		try {
			await fetch('/api/spotify/playlist', {
				method: 'POST',
				body: JSON.stringify({
					user: me.id,
					name: data.title,
					description: data.description,
					tracks: data.tracks
				})
			});
			success = true;
			successTimeout = setTimeout(() => (success = false), 5000);
		} catch (error) {
			// noop for now
			console.error(error);
		} finally {
			creating = false;
		}
	};

	onDestroy(() => {
		if (successTimeout) clearTimeout(successTimeout);
	});
</script>

<footer data-theme="dark">
	<p class="font-small-beast">{data.tracks.length} Selected tracks</p>
	<div>
		{#if success}
			<p class="font-small-beast">Imported!</p>
		{/if}
		{#if me?.id}
			<Button
				as="button"
				href="asdfads"
				icon="spotify"
				disabled={disabled || creating}
				loading={creating}
				on:click={handleClick}>Import to Spotify</Button
			>
		{:else}
			<LoginWithSpotify label="Login to import" />
		{/if}
	</div>
</footer>

<style lang="postcss">
	footer {
		position: relative;

		display: flex;
		align-items: center;
		justify-content: space-between;

		height: 44px;

		border: 1px solid var(--color-background);
		box-sizing: content-box;

		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;

		background-color: var(--color-background);

		& p {
			padding: 8px;
		}

		& div {
			display: flex;
			align-items: center;
			gap: 8px;
		}
	}
</style>
