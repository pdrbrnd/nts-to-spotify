<script lang="ts">
	import Login from '$components/Login.svelte';

	import { me } from '$lib/stores/me';
</script>

{#if $me === undefined}
	<p>Loading...</p>
{:else if $me === null}
	<Login />
{:else}
	<p>{$me?.display_name}</p>
{/if}
