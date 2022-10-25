<script lang="ts">
	export let padded: boolean = true;
</script>

<div>
	<section class:padded data-theme="light">
		<slot />
	</section>
</div>

<style lang="postcss">
	div {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-end;

		flex: 1;
	}

	section {
		margin-top: 30vh;

		width: min(100%, 550px);
	}

	.padded {
		padding: 24px;

		@media (--md) {
			padding: 40px;
			padding-bottom: 24px;
		}
	}
</style>
