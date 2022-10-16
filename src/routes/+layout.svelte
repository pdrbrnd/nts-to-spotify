<script>
	import Header from '$components/header.svelte';
	import '$styles/index.pcss';
</script>

<div
	style="background-image: url(https://unsplash.com/photos/YDf2T-Uyq7U/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjY1OTM3MzM4&force=true&w=2400)"
>
	<Header />
	<slot />
</div>

<style>
	div {
		background-position: center center;
		background-repeat: no-repeat;
		background-size: cover;

		height: 100%;
	}
</style>
