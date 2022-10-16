<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main>
	<div data-theme="light">
		<h1>{data.title}</h1>
		<p>{data.description}</p>
	</div>
</main>
