<script lang="ts">
	import LoginWithSpotify from './login-with-spotify.svelte';
	import Button from './button.svelte';
	import { getContext } from 'svelte';
	import type { User } from '$lib/types';
	import { clickOutside } from '$lib/actions/clickoutside';

	let isLoggingOut = false;

	const me = getContext<User>('me');
</script>

{#if me?.id}
	<div use:clickOutside={() => (isLoggingOut = false)}>
		<Button
			variant="ghost"
			as={isLoggingOut ? 'a' : 'button'}
			on:click={() => {
				if (!isLoggingOut) {
					isLoggingOut = true;
				}
			}}
			href={isLoggingOut ? '/api/auth/logout' : undefined}
		>
			<p class="font-small-beast">{isLoggingOut ? 'Logout' : me.display_name}</p>
			<div class="avatar" style="background-image: url({me.images[0]?.url})" />
		</Button>
	</div>
{:else}
	<LoginWithSpotify variant="ghost" />
{/if}

<style lang="postcss">
	.avatar {
		width: 28px;
		height: 28px;

		border-radius: 100%;

		background-size: cover;
		background-repeat: no-repeat;
		background-position: center center;
	}
</style>
