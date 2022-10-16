<script lang="ts">
	import Header from '$components/header.svelte';
	import '$styles/index.pcss';
	import { page } from '$app/stores';
</script>

<div
	style="background-image: url({$page.data?.cover ||
		'https://unsplash.com/photos/YDf2T-Uyq7U/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjY1OTM3MzM4&force=true&w=2400'})"
>
	<Header />
	<main>
		<slot />
	</main>
</div>

<style>
	div {
		background-position: center center;
		background-repeat: no-repeat;
		background-size: cover;

		display: flex;
		flex-direction: column;

		min-height: 100vh;
	}

	main {
		flex: 1;
	}
</style>
