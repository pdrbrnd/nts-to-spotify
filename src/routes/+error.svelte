<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/button.svelte';
	import Panel from '$components/panel.svelte';
</script>

<Panel>
	<div>
		<h1 class="font-title">{$page.status}</h1>

		{#if $page.error?.message}
			<p class="font-small-beast">{$page.error.message}</p>
		{/if}

		<Button as="a" href="/">Take me home, John Denver</Button>
	</div>
</Panel>

<style lang="postcss">
	div {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 24px;
	}
</style>
