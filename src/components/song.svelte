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
	</div>
</div>

<style lang="postcss">
	.root {
		display: flex;
		align-items: center;
		gap: 8px;

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
</style>
