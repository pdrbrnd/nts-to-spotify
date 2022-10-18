<script lang="ts">
	import '$styles/index.pcss';
	import { page } from '$app/stores';
	import { onMount, setContext } from 'svelte';
	import type { LayoutData } from './$types';
	import { Header, Panel, Logo, LoginWithSpotify, Divider, Button } from '$components';

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

	export let data: LayoutData;

	setContext('me', data.user);
</script>

<svelte:head>
	<title>{$page.data.title || 'NTS to Spotify'}</title>
</svelte:head>

<div class="holder" style={image ? `background-image: url(${$page.data?.cover || image})` : ''}>
	<Header />
	<main>
		{#if data.user}
			<slot />
		{:else}
			<Panel>
				<Logo />
				<h1 class="font-title">NTS to Spotify</h1>

				<p class="font-base">Create Spotify playlists from NTS episodes.</p>

				<ol class="font-base">
					<li>Log in with Spotify so we can create the playlist on your behalf</li>
					<li>Paste the NTS episode URL into the top bar</li>
					<li>Preview and manage your tracklist</li>
					<li>Import to Spotify</li>
				</ol>

				<LoginWithSpotify />

				<Divider />

				<div>
					<p class="support">Support the project</p>
					<Button
						as="a"
						variant="outline"
						icon="coffee"
						href="https://ko-fi.com/pdrbrnd"
						target="_blank"
						rel="noopener noreferrer"
					>
						<span class="coffee">Buy me a coffee</span>
					</Button>
				</div>
			</Panel>
		{/if}
	</main>
</div>

<style lang="postcss">
	.holder {
		background-position: center center;
		background-repeat: no-repeat;
		background-size: cover;

		display: flex;
		flex-direction: column;

		min-height: 100vh;
	}

	main {
		flex: 1;

		display: flex;
		flex-direction: column;
	}

	ol {
		list-style-type: decimal;

		margin-left: 16px;
	}

	.support {
		margin-bottom: 8px;
	}
</style>
