<script lang="ts" context="module">
	let current: HTMLAudioElement;
</script>

<script lang="ts">
	import Button from './button.svelte';

	export let src: string | undefined;

	let audio: HTMLAudioElement;
	let paused: boolean = true;

	function stopOthers() {
		if (current && current !== audio) current.pause();
		current = audio;
	}
</script>

<div>
	{#if src}
		<audio bind:this={audio} bind:paused on:play={stopOthers} {src} />
	{/if}
	<Button
		size="sm"
		icon={paused ? 'play' : 'stop'}
		variant="ghost"
		disabled={!src}
		on:click={() => {
			if (paused) {
				audio.play();
			} else {
				audio.pause();
				audio.currentTime = 0;
			}
		}}
	/>
</div>

<style lang="postcss">
	div {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
