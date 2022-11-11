export const CANVAS_SIZE = 800;
const PADDING = 50;

const drawLogo = (ctx: CanvasRenderingContext2D) => {
	const logo = new Image();
	logo.src = '/cover-logo.png';
	logo.onload = () => {
		const grad = ctx.createLinearGradient(
			CANVAS_SIZE,
			CANVAS_SIZE / 2,
			CANVAS_SIZE / 1.5,
			CANVAS_SIZE
		);
		grad.addColorStop(0, 'rgba(0,0,0,0)');
		grad.addColorStop(1, 'rgba(0,0,0,0.2)');
		ctx.fillStyle = grad;
		ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
		ctx.drawImage(logo, PADDING, CANVAS_SIZE - PADDING - logo.height, logo.width, logo.height);
	};
};

export const drawCover = (
	ctx: CanvasRenderingContext2D,
	data: { cover: string; title: string; date: string }
) => {
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
	drawLogo(ctx);

	const img = new Image();
	img.onload = () => {
		const multiplier = CANVAS_SIZE / Math.min(img.width, img.height);
		const width = img.width * multiplier;
		const height = img.height * multiplier;
		ctx.drawImage(img, (CANVAS_SIZE - width) / 2, (CANVAS_SIZE - height) / 2, width, height);

		drawLogo(ctx);
	};
	img.src = `/cover?url=${data.cover}`;
};
