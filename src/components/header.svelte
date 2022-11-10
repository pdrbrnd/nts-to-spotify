<script lang="ts">
	import Logo from './logo.svelte';
	import UserAvatar from './user-avatar.svelte';

	import Button from './button.svelte';
	import UrlInput from './url-input.svelte';
	import { afterNavigate, beforeNavigate } from '$app/navigation';

	let navigating = false;

	beforeNavigate(() => (navigating = true));
	afterNavigate(() => (navigating = false));
</script>

<header>
	<div class="inner">
		<div class="left">
			<a href="/" class="logo">
				<Logo />
			</a>
			{#if navigating}
				<div class="spinner" />
			{/if}
		</div>
		<div class="right">
			<UserAvatar />
		</div>
	</div>
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
</header>

<style lang="postcss">
	.spinner {
		display: block;
		width: 14px;
		height: 14px;
		border-radius: 100%;
		border-width: 2px;
		border-style: solid;
		border-color: var(--button-color);
		border-bottom-color: transparent;
		animation: rotate360 1s linear infinite;
	}

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

	.logo {
		padding: 8px;
	}
</style>
