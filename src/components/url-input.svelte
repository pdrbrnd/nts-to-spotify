<script lang="ts">
	import { page } from '$app/stores';
	import { afterNavigate, goto } from '$app/navigation';
	import Button from './button.svelte';
	import Icon from './icon/icon.svelte';
	import { ntsUrlToRouteUrl, routeParamsToNtsUrl } from '$lib/utils/nts';

	const getUrlFromParams = () => {
		return $page.params.show && $page.params.episode
			? routeParamsToNtsUrl($page.params.show, $page.params.episode)
			: '';
	};

	let value = getUrlFromParams();

	afterNavigate(() => {
		value = getUrlFromParams();
	});

	const handleSubmit = () => {
		goto(ntsUrlToRouteUrl(value));
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<label>
		<Icon icon="search" />
		<input bind:value placeholder="Paste NTS episode URL" />
	</label>
	<Button variant="ghost" type="submit" icon="arrow-right" iconPosition="right">Go</Button>
</form>

<style lang="postcss">
	form {
		width: 100%;
		display: flex;
		align-items: center;

		box-shadow: inset 0 0 0 1px var(--color-foreground);
	}

	label {
		flex: 1;
		width: 100%;

		display: flex;
		align-items: center;

		padding-left: 12px;

		border-right: 1px solid var(--color-foreground);

		& > :global(svg) {
			margin-right: 12px;
		}
	}

	input {
		all: unset;

		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		letter-spacing: var(--font-letter-spacing-spaced);
		line-height: var(--font-line-height-sm);
		text-transform: uppercase;

		height: 44px;
		width: 100%;
		margin: 0;

		color: var(--color-foreground);
		background-color: transparent;
	}
</style>
