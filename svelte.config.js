import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		postcss: true,
		// remove whitespace https://github.com/sveltejs/svelte/issues/189
		replace: [
			[/(>)[\s]*([<{])/g, '$1$2'],
			[/({[/:][a-z]+})[\s]*([<{])/g, '$1$2'],
			[/({[#:][a-z]+ .+?})[\s]*([<{])/g, '$1$2'],
			[/([>}])[\s]+(<|{[/#:][a-z][^}]*})/g, '$1$2']
		]
	}),

	kit: {
		adapter: adapter(),
		alias: {
			$components: './src/components',
			$styles: './src/styles'
		}
	}
};

export default config;
