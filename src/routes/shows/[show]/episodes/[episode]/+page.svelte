<script lang="ts">
	import { Badge, Button, Divider, Panel } from '$components';
	import ImportToSpotify from '$components/import-to-spotify.svelte';
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

	let selectedTracks: string[];
	$: selectedTracks = tracks
		.filter((t) => t.checked && t.selectedMatch)
		.map((t) => t.selectedMatch as string);

	let interval: NodeJS.Timer;

	let fetching: number[] = [];

	const fetchNext = async () => {
		const index = tracks.findIndex((t, i) => t.matches === undefined && !fetching.includes(i));

		if (index < 0) return clearInterval(interval);

		const track = tracks[index];
		fetching.push(index);

		try {
			const res = await fetch(`/api/spotify/search?artist=${track.artist}&track=${track.title}`);

			if (!res.ok)
				throw new Error(`Error fetching song details for ${track.artist} - ${track.title}`);

			const result = (await res.json()) as SpotifyTrackSearchResult;

			const matches = result.tracks.items.map((item) => ({
				artist: item.artists[0].name,
				title: item.name,
				uri: item.uri,
				preview: item.preview_url || undefined,
				cover: item.album.images[0].url
			}));

			track.matches = matches;

			if (matches.length > 0) {
				track.checked = true;
				track.selectedMatch = matches[0].uri;
			}

			// trigger reactivity
			tracks = tracks;
		} catch (error) {
			// noop. we'll just try again
		} finally {
			fetching = [...fetching.filter((n) => n !== index)];
		}
	};

	onMount(() => {
		interval = setInterval(fetchNext, 50);
	});

	onDestroy(() => clearInterval(interval));
</script>

<Panel padded={false}>
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
	<ImportToSpotify
		disabled={tracks.some((t) => t.matches === undefined)}
		data={{
			title: data.title,
			description: data.description,
			date: data.date,
			cover: data.cover,
			tracks: selectedTracks
		}}
	/>
</Panel>

<style lang="postcss">
	header {
		padding: 24px;

		@media (--md) {
			padding: 40px;
			padding-bottom: 24px;
		}

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
		padding-bottom: calc(44px + 40px);
	}
</style>
