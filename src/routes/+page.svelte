<script lang="ts">
	import { Button, Divider, LoginWithSpotify, Logo, Panel } from '$components';
	import type { User } from '$lib/types';
	import { getContext } from 'svelte';

	const me = getContext<User>('me');
</script>

{#if !me?.id}
	<Panel>
		<div class="panel">
			<Logo />
			<h1 class="font-title">NTS to Spotify</h1>

			<p class="font-base">Create Spotify playlists from NTS episodes.</p>

			<ol class="font-base">
				<li>Log in with Spotify</li>
				<li>Paste the NTS episode URL into the top bar</li>
				<li>Preview and manage your tracklist</li>
				<li>Import to Spotify</li>
			</ol>

			<p class="font-base">
				Alternatively, open any NTS episode and change the URL from nts.live to ntstospotify.com to
				start the process!
			</p>

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
		</div>
	</Panel>
{/if}

<style lang="postcss">
	.panel {
		padding: 32px;

		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 24px;
	}

	ol {
		list-style-type: decimal;

		margin-left: 16px;
	}

	.support {
		margin-bottom: 8px;
	}
</style>
