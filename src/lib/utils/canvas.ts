export const CANVAS_SIZE = 800;

export const drawCover = (
	ctx: CanvasRenderingContext2D,
	data: { cover: string; title: string; date: string }
) => {
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

	const img = new Image();
	img.onload = () => {
		const multiplier = CANVAS_SIZE / Math.min(img.width, img.height);
		const width = img.width * multiplier;
		const height = img.height * multiplier;
		ctx.drawImage(img, (CANVAS_SIZE - width) / 2, (CANVAS_SIZE - height) / 2, width, height);
	};

	img.src = `/cover?url=${data.cover}`;
};
