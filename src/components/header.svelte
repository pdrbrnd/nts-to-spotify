<script>
	import Logo from './logo.svelte';
	import UserAvatar from './user-avatar.svelte';

	import { me } from '$lib/stores/me';
</script>

<header>
	<div class="left">
		<div class="logo">
			<Logo />
		</div>
		{#if $me?.id}
			<input placeholder="Paste here the episode URL and press Enter" />
		{/if}
	</div>
	<div class="right">
		<UserAvatar />
	</div>
</header>

<style lang="postcss">
	header {
		background-color: var(--color-background);
	}

	header,
	.left {
		display: flex;
		align-items: center;
		justify-content: space-between;

		flex: 1;
		gap: 12px;
	}

	.logo {
		padding: 8px;
	}

	input {
		all: unset;
		width: 100%;

		padding: 2px 0;
		font-size: var(--font-size-sm);
		letter-spacing: var(--font-letter-spacing-spaced);
		font-weight: var(--font-weight-bold);
		text-transform: uppercase;

		&::placeholder {
			color: var(--color-foreground);
			opacity: 0.4;
		}
	}
</style>
