<script lang="ts">
	import { page } from '$app/stores';
</script>

<div data-theme="dark">
	<h1>{$page.status}</h1>
</div>

<style lang="postcss">
	div {
		flex: 1;

		display: flex;
		align-items: center;
		justify-content: center;

		background-color: transparent;
	}

	h1 {
		font-size: 60vh;
		line-height: 1;
		font-weight: var(--font-weight-bold);
		color: var(--color-foreground);
	}
</style>
