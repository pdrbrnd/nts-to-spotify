<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$components';
	import { drawCover, CANVAS_SIZE } from '$lib/utils/canvas';
	import { onDestroy } from 'svelte';

	export let disabled: boolean = false;
	export let data: {
		title: string;
		description: string;
		date: string;
		cover: string;
		tracks: string[];
	};

	let showCover: boolean = false;
	let canvas: HTMLCanvasElement;

	$: {
		const ctx = canvas?.getContext('2d');

		if (ctx) drawCover(ctx, data);
	}

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
					cover: canvas.toDataURL('image/jpeg'),
					tracks: data.tracks
				})
			});
			success = true;
			successTimeout = setTimeout(() => (success = false), 5000);
		} catch (error) {
			// noop for now
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
		<Button
			as="button"
			href="asdfads"
			icon="spotify"
			disabled={disabled || creating}
			loading={creating}
			on:click={handleClick}
			on:mouseenter={() => (showCover = true)}
			on:mouseleave={() => (showCover = false)}>Import to Spotify</Button
		>
	</div>
	{#if showCover}
		<canvas bind:this={canvas} width={CANVAS_SIZE} height={CANVAS_SIZE} />
	{/if}
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

	canvas {
		position: absolute;
		width: min(400px, 90%);
		aspect-ratio: 1 / 1;
		right: 2px;
		bottom: calc(100% + 2px);
		border: 1px solid var(--color-foreground);
	}
</style>
