<script lang="ts">
	import arrowRight from './icons/arrow-right.svg?raw';
	import coffee from './icons/coffee.svg?raw';
	import play from './icons/play.svg?raw';
	import replace from './icons/replace.svg?raw';
	import search from './icons/search.svg?raw';
	import spotify from './icons/spotify.svg?raw';
	import stop from './icons/stop.svg?raw';
	import github from './icons/github.svg?raw';

	const icons = {
		['arrow-right']: arrowRight,
		coffee,
		play,
		replace,
		search,
		spotify,
		stop,
		github
	};

	export let icon: keyof typeof icons;
</script>

{@html icons[icon]}
