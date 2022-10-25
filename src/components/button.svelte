<script lang="ts">
	import Icon from './icon/icon.svelte';

	export let as: 'button' | 'a' = 'button';
	export let variant: 'solid' | 'ghost' | 'outline' = 'solid';
	export let size: 'md' | 'sm' = 'md';
	export let icon: Icon['$$prop_def']['icon'] | undefined = undefined;
	export let iconPosition: 'left' | 'right' | undefined = undefined;
	export let disabled: boolean = false;
	export let loading: boolean = false;
</script>

<svelte:element
	this={as}
	on:click
	on:mouseenter
	on:mouseleave
	class={variant}
	class:small={size === 'sm'}
	aria-disabled={disabled}
	class:disabled
	class:icon-right={iconPosition === 'right'}
	class:loading
	class:only-icon={!$$slots.default}
	{...$$restProps}
>
	<span>
		{#if icon}
			<Icon {icon} />
		{/if}
		<slot />
	</span>
	{#if loading}
		<div class="spinner" />
	{/if}
</svelte:element>

<style lang="postcss">
	a,
	button {
		all: unset;

		position: relative;

		display: inline-flex;
		align-items: center;
		justify-content: center;

		& span {
			display: inline-flex;
			align-items: center;
			gap: 8px;
		}

		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		letter-spacing: var(--font-letter-spacing-spaced);
		line-height: var(--font-line-height-sm);
		text-transform: uppercase;

		white-space: nowrap;
		cursor: pointer;
		user-select: none;

		padding: 0px 10px;
		height: 44px;
		box-sizing: border-box;

		transition: opacity var(--transition-appearance), box-shadow var(--transition-smooth);

		@media (hover: hover) {
			&:hover {
				opacity: 0.8;
			}
		}

		&:focus-visible {
			box-shadow: 0 0 0 2px hsl(var(--color-foreground-hsl) / 0.5);
		}

		&:disabled,
		&.disabled,
		&[aria-disabled='true'] {
			opacity: 0.5;

			pointer-events: none;
		}

		&:active {
			opacity: 0.6;
		}

		color: var(--button-color);
		background-color: var(--button-bg-color);

		&.solid {
			--button-color: var(--color-background);
			--button-bg-color: var(--color-foreground);
		}

		&.ghost {
			--button-color: var(--color-foreground);
			--button-bg-color: transparent;
		}

		&.outline {
			--button-color: var(--color-foreground);
			--button-bg-color: transparent;
			border: 1px solid var(--button-color);
		}

		&.small {
			padding: 0px 6px;
			height: 32px;
		}

		&.icon-right {
			flex-direction: row-reverse;
		}

		&.only-icon {
			aspect-ratio: 1 / 1;
		}

		&.loading {
			& > span {
				opacity: 0;
			}

			& > .spinner {
				display: block;
				position: absolute;
				width: 14px;
				height: 14px;
				border-radius: 100%;
				border-width: 2px;
				border-style: solid;
				border-color: var(--button-color);
				border-bottom-color: transparent;
				animation: rotate360 1s linear infinite;
			}
		}
	}
</style>
