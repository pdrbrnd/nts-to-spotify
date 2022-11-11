<script lang="ts">
	import type { BasicTrack, Match, URI } from '$lib/types';
	import { slide } from 'svelte/transition';
	import Badge from './badge.svelte';
	import Button from './button.svelte';
	import Checkbox from './checkbox.svelte';
	import Song from './song.svelte';

	export let original: BasicTrack;
	export let matches: undefined | Match[] = undefined;
	export let selectedMatch: URI | null = null;
	export let checked: boolean = false;

	let expanded: boolean = false;

	$: match = matches?.find((match) => match.uri === selectedMatch);
	$: hasNoMatch = matches && matches.length === 0;
</script>

<div class="root">
	<div class="original font-tiny">
		{original.artist} - {original.title}
	</div>
	<div class="row" class:no-action={matches === undefined || hasNoMatch}>
		<div>
			<Song
				artist={match?.artist || original.artist}
				title={match?.title || original.title}
				preview={match?.preview}
				cover={match ? { type: 'spotify', src: match.cover } : { type: 'nts' }}
				loading={matches === undefined}
				disabled={!!hasNoMatch}
			/>
		</div>
		<div class="right">
			{#if matches && matches.length > 1}
				<Button
					size="sm"
					variant={expanded ? 'solid' : 'outline'}
					on:click={() => (expanded = !expanded)}
					icon="replace"
				/>
			{/if}
			<Checkbox bind:checked on:change disabled={matches === undefined || hasNoMatch} />
		</div>
	</div>
	{#if expanded}
		<div class="matches" transition:slide={{ duration: 300 }} data-theme="dark">
			{#each matches || [] as match}
				<div class="row">
					<Song
						artist={match.artist}
						title={match.title}
						preview={match?.preview}
						cover={{ type: 'spotify', src: match.cover }}
					/>
					<div class="right">
						{#if selectedMatch === match.uri}
							<Button disabled>Selected</Button>
						{:else}
							<Button variant="outline" on:click={() => (selectedMatch = match.uri)}>Select</Button>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="postcss">
	.row,
	.original {
		padding: 12px 24px;

		@media (--md) {
			padding: 12px 40px;
		}
	}

	.original {
		padding-bottom: 8px;
		counter-increment: track;
		opacity: 0.5;

		&::before {
			content: counter(track) '. ';
		}
	}

	.row {
		display: flex;
		align-items: center;

		width: 100%;
		justify-content: space-between;
		gap: 16px;

		&.no-action {
			pointer-events: none;
		}
	}

	.right {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.matches {
		padding: 16px 0;
	}
</style>
