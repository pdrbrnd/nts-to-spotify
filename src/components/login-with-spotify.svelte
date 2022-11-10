<script lang="ts">
	export let label = 'Login with Spotify';

	import Button from './button.svelte';

	export let variant: Button['$$prop_def']['variant'] = 'solid';
</script>

<Button as="a" {variant} href="/login" icon="spotify">
	{label}
</Button>
