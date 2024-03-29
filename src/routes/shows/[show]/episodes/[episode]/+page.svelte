<script lang="ts">
	import { Badge, Divider, Panel, ImportToSpotify, Track } from '$components';
	import type { Match, URI } from '$lib/types';
	import type { PageData } from './$types';

	export let data: PageData;

	type Track = {
		artist: string;
		title: string;
		matches: undefined | Match[];
		selectedMatch: URI | null;
		checked: boolean;
	};

	let tracks: Track[] = data.tracks.map(({ artist, title, matches, retry }) => {
		return {
			artist,
			title,
			matches,
			selectedMatch: matches.length > 0 ? matches[0].uri : null,
			checked: matches.length > 0 && !retry
		};
	});

	let selectedTracks: string[];
	$: selectedTracks = tracks
		.filter((t) => t.checked && t.selectedMatch)
		.map((t) => t.selectedMatch as string);
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
			<div class="list">
				{#each tracks as { artist, title, matches, selectedMatch, checked }, i}
					<Track bind:checked bind:selectedMatch original={{ artist, title }} {matches} />
				{/each}
			</div>
		{:else}
			<p class="no-tracks font-small-beast">No tracks found</p>
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

	.no-tracks {
		padding-inline: 24px;

		@media (--md) {
			padding-inline: 40px;
		}
	}

	.list {
		display: flex;
		flex-direction: column;

		width: 100%;
		counter-reset: track;

		& > :global(*) {
			padding-block: 8px;

			transition: background-color var(--transition-appearance);

			@media (hover: hover) {
				&:hover {
					background-color: hsla(var(--color-foreground-hsl) / 0.03);
				}
			}
		}
	}

	article {
		padding-bottom: calc(44px + 40px);
	}
</style>
