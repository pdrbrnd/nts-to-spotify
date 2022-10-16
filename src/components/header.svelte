<script>
	import Logo from './logo.svelte';
	import UserAvatar from './user-avatar.svelte';
	import { page } from '$app/stores';

	import { me } from '$lib/stores/me';
	import { afterNavigate, goto } from '$app/navigation';

	const getUrlFromParams = () => {
		return $page.params.url ? decodeURIComponent($page.params.url) : '';
	};

	let input = getUrlFromParams();

	afterNavigate(() => {
		input = getUrlFromParams();
	});

	const handleSubmit = () => {
		goto(`/${encodeURIComponent(input)}`);
	};
</script>

<header>
	<div class="left">
		<a href="/" class="logo">
			<Logo />
		</a>
		{#if $me?.id}
			<form on:submit|preventDefault={handleSubmit}>
				<input bind:value={input} placeholder="Paste here the episode URL and press Enter" />
			</form>
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

		gap: 12px;
	}

	.left {
		flex: 1;
	}

	.logo {
		padding: 8px;
	}

	form {
		width: 100%;
	}

	input {
		all: unset;
		width: 100%;

		padding: 2px 0;
		font-size: var(--font-size-sm);
		letter-spacing: var(--font-letter-spacing-spaced);
		font-weight: var(--font-weight-medium);
		text-transform: uppercase;

		&::placeholder {
			color: var(--color-foreground);
			opacity: 0.4;
		}
	}
</style>
