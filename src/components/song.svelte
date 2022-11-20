<script lang="ts">
	import Cover from './cover.svelte';
	import Player from './player.svelte';
	import Spinner from './spinner.svelte';

	export let artist: string;
	export let title: string;
	export let loading: boolean = false;
	export let disabled: boolean = false;
	export let preview: string | undefined = undefined;
	export let cover: Cover['$$prop_def']['src'] = { type: 'nts' };
	export let href: string | undefined;
</script>

<div class="root" class:disabled>
	<div class="player">
		{#if loading}
			<Spinner />
		{:else}
			<Player src={preview} />
		{/if}
	</div>
	<Cover src={cover} />
	<div>
		<h3 class="font-small-beast">{artist}</h3>
		<p class="font-small">{title}</p>
		{#if href}
			<a class="font-tiny" {href} target="_blank" rel="noopener noreferrer">
				<svg
					width="17"
					height="17"
					viewBox="0 0 17 17"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M8.54786 16.25C12.9661 16.25 16.5479 12.6683 16.5479 8.25C16.5479 3.83172 12.9661 0.25 8.54786 0.25C4.12958 0.25 0.547852 3.83172 0.547852 8.25C0.547852 12.6683 4.12958 16.25 8.54786 16.25ZM4.55715 10.9836C7.15428 10.3984 9.39318 10.6685 11.1395 11.7488C11.6321 12.0189 12.1246 11.2537 11.6321 10.9386C9.66185 9.72314 7.24383 9.40803 4.37803 10.0833C3.8407 10.1733 3.93025 11.0736 4.55715 10.9836ZM4.42281 8.82283C6.79605 8.10258 9.88574 8.46271 11.9008 9.72314C12.5277 10.1283 13.1545 9.13794 12.5277 8.7328C10.1992 7.2923 6.84083 6.88716 4.10937 7.69744C3.39292 7.8775 3.66158 9.04791 4.42281 8.82283ZM3.66158 5.17657C2.8108 5.49168 3.30336 6.79713 4.06459 6.52704C6.34827 5.80679 10.3783 5.94184 12.7963 7.38233C13.6023 7.83249 14.3188 6.57205 13.5575 6.16691C10.7813 4.50134 6.30349 4.36629 3.66158 5.17657Z"
						fill="currentColor"
					/>
				</svg>
				<span>Play on Spotify</span>
			</a>
		{/if}
	</div>
</div>

<style lang="postcss">
	.root {
		display: flex;
		align-items: center;
		gap: 12px;

		&.disabled {
			opacity: 0.4;
			text-decoration: line-through;
		}
	}

	.player {
		width: 32px;
		height: 32px;

		display: flex;
		align-items: center;
		justify-content: center;

		flex-shrink: 0;
	}

	h3 {
		margin-bottom: 2px;
	}

	a {
		display: inline-flex;
		margin-top: 4px;
		align-items: center;
		gap: 4px;

		transition: opacity var(--transition-appearance);

		@media (hover: hover) {
			&:hover {
				opacity: 0.5;
			}
		}
	}
</style>
