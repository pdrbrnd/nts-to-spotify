<script lang="ts">
	import { page } from '$app/stores';
	import { Button, Divider, LoginWithSpotify, Logo, Panel } from '$components';

	const me = $page.data.user;
</script>

<Panel>
	<div class="panel">
		<Logo />
		<h1 class="font-title">NTS to Spotify</h1>

		<p class="font-base">Create Spotify playlists from NTS episodes.</p>

		<div class="disclaimer font-small-beast">
			<h4 class="font-base">Disclaimer</h4>
			<p class="font-base">
				This is a community-created app to create Spotify Playlists from NTS episodes. We're not
				affiliated with NTS in any way.
			</p>
			<p class="font-base">
				<a href="https://nts.live" target="_blank" rel="noopener noreferrer">
					Click here to go to NTS.live
				</a>
			</p>
		</div>

		<ol class="font-base">
			<li>Paste the NTS episode URL into the top bar</li>
			<li>Preview and manage your tracklist</li>
			<li>Login with Spotify to be able to import the playlist</li>
		</ol>

		<p class="font-base">
			<a href="/shows/the-breakfast-show-flo/episodes/the-breakfast-show-flo-30th-november-2022"
				>See example</a
			>
		</p>

		{#if !me}
			<LoginWithSpotify />
		{/if}

		<Divider />

		<div>
			<p class="support font-base">Support the project</p>
			<div class="buttons">
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
				<Button
					as="a"
					variant="outline"
					icon="github"
					href="https://github.com/pdrbrnd/nts-to-spotify"
					target="_blank"
					rel="noopener noreferrer"
				>
					<span>View on GitHub</span>
				</Button>
			</div>
		</div>
	</div>
</Panel>

<style lang="postcss">
	.panel {
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

	.disclaimer {
		background-color: lightgoldenrodyellow;
		border: 1px solid var(--color-foreground);
		padding: 8px;

		& h4,
		& a {
			font-weight: var(--font-weight-medium);
		}

		& h4,
		& p:not(:last-child) {
			margin-bottom: 8px;
		}
	}

	a {
		text-decoration: underline;
	}

	.buttons {
		display: flex;
		align-items: center;
		gap: 8px;
	}
</style>
