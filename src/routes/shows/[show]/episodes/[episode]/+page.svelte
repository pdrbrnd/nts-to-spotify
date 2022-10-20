<script lang="ts">
	import { Badge, Button, Divider, Panel } from '$components';
	import Track from '$components/track.svelte';
	import type { Match, SpotifyTrackSearchResult, URI } from '$lib/types';
	import { onDestroy, onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	type Track = {
		artist: string;
		title: string;
		matches: undefined | Match[];
		selectedMatch: URI | null;
		checked: boolean;
	};

	let tracks: Track[] = data.tracks.map(({ artist, title }) => ({
		artist,
		title,
		matches: undefined,
		selectedMatch: null,
		checked: false
	}));

	$: amount = tracks.filter((t) => t.checked).length;

	let interval: NodeJS.Timer;

	const fetchNext = async () => {
		const next = tracks.find((t) => t.matches === undefined);

		if (!next) return clearInterval(interval);

		const res = await fetch(`/api/spotify/search?artist=${next.artist}&title=${next.title}`);
		const result = (await res.json()) as SpotifyTrackSearchResult;
		const matches = result.tracks.items.map((item) => ({
			artist: item.artists[0].name,
			title: item.name,
			uri: item.uri,
			preview: item.preview_url || undefined,
			cover: item.album.images[0].url
		}));
		next.matches = matches;
		if (matches.length > 0) {
			next.checked = true;
			next.selectedMatch = matches[0].uri;
		}

		// trigger reactivity
		tracks = tracks;
	};

	onMount(() => {
		interval = setInterval(fetchNext, 1000);
	});

	onDestroy(() => clearInterval(interval));
</script>

<Panel>
	<article>
		<header>
			<h1 class="font-title">{data.title}</h1>
			<p class="font-base">{data.description}</p>
			{#if data.genres.length > 0}
				<div class="genres">
					{#each data.genres as genre}
						<Badge>{genre}</Badge>
					{/each}
				</div>
			{/if}
			<Divider />
		</header>
		{#if tracks.length > 0}
			<ul>
				{#each tracks as { artist, title, matches, selectedMatch, checked }, i}
					<Track bind:checked bind:selectedMatch original={{ artist, title }} {matches} />
				{/each}
			</ul>
		{:else}
			<p class="font-small-beast">No tracks available</p>
		{/if}
	</article>
	<footer data-theme="dark">
		<p class="font-small-beast">{amount} Selected tracks</p>
		<Button icon="spotify" disabled={tracks.some((t) => t.matches === undefined)}
			>Import to Spotify</Button
		>
	</footer>
</Panel>

<style lang="postcss">
	header {
		padding: 24px;

		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.genres {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	ul {
		display: flex;
		flex-direction: column;

		width: 100%;
	}

	article {
		padding-bottom: calc(44px + 24px);
	}

	footer {
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
	}
</style>
