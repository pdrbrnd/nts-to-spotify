<script lang="ts">
	import '$styles/index.pcss';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { Header } from '$components';

	const images = [
		'/bg1.jpg',
		'/bg2.jpg',
		'/bg3.jpg',
		'/bg4.jpg',
		'/bg5.jpg',
		'/bg6.jpg',
		'/bg7.jpg'
	];

	let image = '';

	onMount(() => {
		image = images[Math.floor(Math.random() * 100) % images.length];
	});
</script>

<svelte:head>
	<title>{$page.data.title || 'NTS to Spotify'}</title>
</svelte:head>

<div class="holder" style={image ? `background-image: url(${$page.data?.cover || image})` : ''}>
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
