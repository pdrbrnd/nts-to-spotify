<script lang="ts">
	import { Badge, Divider, Panel } from '$components';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Panel>
	<h1 class="font-title">{data.title}</h1>
	<p class="font-base">{data.description}</p>
	{#if data.genres.length > 0}
		<div class="genres">
			{#each data.genres as genre}
				<Badge>{genre}</Badge>
			{/each}
		</div>
	{/if}
	<Divider />
</Panel>

<style lang="postcss">
	.genres {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
</style>
