<script lang="ts">
	import Header from '$components/header.svelte';
	import '$styles/index.pcss';
	import { page } from '$app/stores';

	const images = [
		'https://unsplash.com/photos/YDf2T-Uyq7U/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjY1OTM3MzM4&force=true&w=1600',
		'https://unsplash.com/photos/pTeZKi29EYE/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mnx8dmlueWwlMjBzdG9yZXxlbnwwfHx8fDE2NjU5MzU1MjQ&force=true&w=1600',
		'https://unsplash.com/photos/sFjSUUfF_2Y/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjY1OTU0MDMw&force=true&w=1600',
		'https://unsplash.com/photos/RqASow2Y6Os/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Nnx8dmlueWwlMjBzdG9yZXxlbnwwfHx8fDE2NjU5MzU1MjQ&force=true&w=1600',
		'https://unsplash.com/photos/z-qxSYHXrh4/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTJ8fHZpbnlsJTIwc3RvcmV8ZW58MHx8fHwxNjY1OTM1NTI0&force=true&w=1600',
		'https://unsplash.com/photos/W8BRzoUTHNA/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTN8fHZpbnlsJTIwc3RvcmV8ZW58MHx8fHwxNjY1OTM1NTI0&force=true&w=1600',
		'https://unsplash.com/photos/7W5BWwc36A8/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTd8fHZpbnlsJTIwc3RvcmV8ZW58MHx8fHwxNjY1OTM1NTI0&force=true&w=1600'
	];

	const image = images[Math.floor(Math.random() * 100) % images.length];
</script>

<div style="background-image: url({$page.data?.cover || image})">
	<Header />
	<main>
		<slot />
	</main>
</div>

<style>
	div {
		background-position: center center;
		background-repeat: no-repeat;
		background-size: cover;

		display: flex;
		flex-direction: column;

		min-height: 100vh;
	}

	main {
		flex: 1;
	}
</style>
