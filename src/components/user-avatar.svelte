<script>
	import { me } from '$lib/stores/me';
	import { env } from '$env/dynamic/public';
	import { SPOTIFY_REDIRECT_URI, SPOTIFY_SCOPES } from '$lib/constants';
	import { clickOutside } from '$lib/actions/clickoutside';

	let visible = false;
</script>

{#if $me === undefined}
	<div />
{:else if $me === null}
	<a
		class="font-upper"
		href={`https://accounts.spotify.com/authorize?${new URLSearchParams({
			client_id: env.PUBLIC_SPOTIFY_CLIENT_ID,
			redirect_uri: SPOTIFY_REDIRECT_URI,
			scope: SPOTIFY_SCOPES,
			response_type: 'code'
		}).toString()}`}>Login with spotify</a
	>
{:else}
	<div class="user">
		<button on:click={() => (visible = !visible)}>
			<p class="font-upper">{$me.display_name}</p>
			<div class="avatar" style="background-image: url({$me?.images[0]?.url})" />
		</button>
		<div
			class="popover"
			data-theme="light"
			style="top: {visible ? '100%' : '0'}"
			use:clickOutside={() => (visible = false)}
		>
			<a class="font-upper" href="/api/auth/logout">
				<!-- TODO: icon here -->
				<i class="i-logout" />

				<span>Logout</span>
			</a>
		</div>
	</div>
{/if}

<style lang="postcss">
	.user {
		position: relative;
	}

	a {
		background-color: var(--color-background);
		padding: 8px;

		display: block;

		transition: opacity var(--transition-appearance);

		@media (hover: hover) {
			&:hover {
				opacity: 0.6;
			}
		}
	}

	button {
		all: unset;

		position: relative;
		z-index: 2;

		background-color: var(--color-background);
		padding: 8px;

		cursor: pointer;
		user-select: none;

		display: flex;
		align-items: center;

		gap: 8px;

		transition: opacity var(--transition-appearance);

		@media (hover: hover) {
			&:hover > * {
				opacity: 0.6;
			}
		}
	}

	.avatar {
		width: 28px;
		height: 28px;

		border-radius: 100%;

		background-size: cover;
		background-repeat: no-repeat;
		background-position: center center;
	}

	.popover {
		position: absolute;
		z-index: 1;

		left: 0;
		right: 0;

		transition: top var(--transition-motion);

		& a {
			width: 100%;
			display: inline-flex;
			align-items: center;
			justify-content: space-between;
		}
	}
</style>
