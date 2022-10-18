<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/button.svelte';
	import Divider from '$components/divider.svelte';
	import Panel from '$components/panel.svelte';
</script>

<Panel>
	<h1 class="font-title">{$page.status}</h1>
	<p class="font-base">Nothing to see here</p>

	<Divider />

	<Button as="a" href="/">Take me home, country roads</Button>
</Panel>
