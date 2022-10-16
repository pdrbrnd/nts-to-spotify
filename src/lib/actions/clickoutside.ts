export function clickOutside(node: HTMLElement, callback: () => void) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleClick = (event: any) => {
		if (node && !node.contains(event.target) && !event.defaultPrevented) {
			callback();
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}
