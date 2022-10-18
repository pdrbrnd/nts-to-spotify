<script lang="ts">
	import arrowRight from './icons/arrow-right.svg?raw';
	import coffee from './icons/coffee.svg?raw';
	import replace from './icons/replace.svg?raw';
	import search from './icons/search.svg?raw';
	import spotify from './icons/spotify.svg?raw';

	const icons = {
		['arrow-right']: arrowRight,
		coffee,
		replace,
		search,
		spotify
	};

	export let icon: keyof typeof icons;
</script>

{@html icons[icon]}
