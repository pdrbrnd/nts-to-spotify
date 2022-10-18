<div>
	<section data-theme="light">
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

		padding: 24px;
		width: min(100%, 530px);

		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 24px;
	}
</style>
