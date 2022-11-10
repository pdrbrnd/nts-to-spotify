<script lang="ts">
	import '$styles/index.pcss';
	import { page } from '$app/stores';
	import { Header } from '$components';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<svelte:head>
	<title>{$page.data.title || 'NTS to Spotify'}</title>
</svelte:head>

<div class="holder" style={`background-image: url(${$page.data?.cover || data.bgImage})`}>
	<Header />
	<main>
		<slot />
	</main>
</div>

<style lang="postcss">
	.holder {
		background-position: center center;
		background-repeat: no-repeat;
		background-size: cover;

		display: flex;
		flex-direction: column;

		height: 100vh;
	}

	main {
		flex: 1;

		display: flex;
		flex-direction: column;

		overflow-y: auto;
	}
</style>
