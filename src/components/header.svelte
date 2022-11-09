<script lang="ts">
	import Logo from './logo.svelte';
	import UserAvatar from './user-avatar.svelte';

	import Button from './button.svelte';
	import UrlInput from './url-input.svelte';
	import { page } from '$app/stores';

	const me = $page.data.user;
</script>

<header>
	<div class="inner">
		<div class="left">
			<a href="/" class="logo">
				<Logo />
			</a>
		</div>
		<div class="right">
			<UserAvatar />
		</div>
	</div>
	{#if me?.id}
		<div class="sub">
			<UrlInput />
			<Button
				as="a"
				icon="coffee"
				href="https://ko-fi.com/pdrbrnd"
				target="_blank"
				rel="noopener noreferrer"
			>
				<span class="coffee">Buy me a coffee</span>
			</Button>
		</div>
	{/if}
</header>

<style lang="postcss">
	header,
	.sub {
		background-color: var(--color-background);
	}

	.inner,
	.left,
	.sub {
		display: flex;
		align-items: center;
		justify-content: space-between;

		gap: 12px;
	}

	.sub {
		gap: 0px;
	}

	.coffee {
		display: none;

		@media (--md) {
			display: block;
		}
	}

	.left {
		flex: 1;
	}

	.logo {
		padding: 8px;
	}
</style>
