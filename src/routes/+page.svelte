<script lang="ts">
	import { Button, Divider, LoginWithSpotify, Logo, Panel } from '$components';
</script>

<Panel>
	<div class="panel">
		<Logo />
		<h1 class="font-title">NTS to Spotify</h1>

		<p class="font-base">Create Spotify playlists from NTS episodes.</p>

		<div class="disclaimer font-small-beast">
			<h4>Disclaimer</h4>
			<p>
				This is a community-created app to create Spotify Playlists from NTS episodes. We're not
				affiliated with NTS in any way.
			</p>
			<p>
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
		background-color: palegoldenrod;
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

		& a {
			text-decoration: underline;
		}
	}
</style>
