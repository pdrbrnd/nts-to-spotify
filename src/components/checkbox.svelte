<script lang="ts">
	export let disabled: boolean = false;
	export let checked: boolean;
</script>

<label>
	<input bind:checked on:change type="checkbox" {disabled} />
	<span class="checkmark" />
</label>

<style lang="postcss">
	label {
		display: inline-flex;
		align-self: flex-start;

		user-select: none;

		position: relative;

		& input {
			opacity: 0;
			position: absolute;
			visibility: hidden;
			width: 0;
			height: 0;
		}

		& .checkmark {
			cursor: pointer;

			display: inline-flex;
			align-items: center;
			justify-content: center;

			width: 32px;
			height: 32px;

			border: 1px solid var(--color-foreground);

			transition: opacity var(--transition-appearance), box-shadow var(--transition-smooth);

			&:before {
				--checkmark-border-color: var(--color-foreground);
				content: '';
				width: 4px;
				height: 0px;

				border-left: 2px solid var(--checkmark-border-color);
				border-bottom: 2px solid var(--checkmark-border-color);

				transition: width var(--transition-motion), height var(--transition-motion),
					transform var(--transition-motion);
			}
		}

		& input:disabled ~ .checkmark {
			opacity: 0.4;

			pointer-events: none;
		}

		& input::focus-visible ~ .checkmark {
			box-shadow: 0 0 0 2px hsl(var(--color-foreground-hsl) / 0.5);
		}

		& input:checked ~ .checkmark {
			background-color: var(--color-foreground);

			&:before {
				--checkmark-border-color: var(--color-background);
				width: 12px;
				height: 6px;
				transform: rotate(-45deg);
			}
		}
	}
</style>
