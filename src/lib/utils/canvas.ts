export const CANVAS_SIZE = 800;
const FONT_SIZE = 70;
const LINE_HEIGHT = FONT_SIZE * 1.15;
const PADDING = 40;

const appendWord = (current: string, word: string) => {
	return current ? `${current} ${word}` : word;
};

const haveSpace = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number) => {
	const { width } = ctx.measureText(text);
	return width < maxWidth;
};

const wrapWords = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number) => {
	const words = text.split(' ');
	const lines: string[] = [];

	let curr = '';

	words.forEach((word, i) => {
		// TODO: if a single word is bigger than the maxWidth

		// new line
		if (!haveSpace(ctx, appendWord(curr, word), maxWidth)) {
			// new line
			lines.push(curr);
			curr = word;

			return;
		}

		// we still have space
		curr = appendWord(curr, word);

		// last word and we still have space, let's push what we have
		if (i === words.length - 1) {
			lines.push(curr);
		}
	});

	return lines;
};

const drawInfo = (
	ctx: CanvasRenderingContext2D,
	data: { cover: string; title: string; date: string }
) => {
	// title
	let y = 0;
	ctx.font = `600 ${FONT_SIZE}px Oswald`;
	const lines = wrapWords(ctx, data.title.toUpperCase(), CANVAS_SIZE - PADDING * 2);
	[...lines, data.date].forEach((line, i) => {
		y = PADDING + LINE_HEIGHT * (i + 1);
		ctx.fillStyle = i === lines.length ? 'rgba(255,255,255,0.6)' : 'white';
		ctx.fillText(line, PADDING, y);
	});

	// logo
	const logo = new Image();
	logo.src = '/cover-logo.png';
	logo.onload = () => {
		ctx.drawImage(logo, PADDING, CANVAS_SIZE - PADDING - logo.height, logo.width, logo.height);
	};
};

export const drawCover = (
	ctx: CanvasRenderingContext2D,
	data: { cover: string; title: string; date: string }
) => {
	const img = new Image();
	img.crossOrigin = 'anonymous';
	img.onload = () => {
		const multiplier = CANVAS_SIZE / Math.min(img.width, img.height);
		const width = img.width * multiplier;
		const height = img.height * multiplier;
		ctx.drawImage(img, (CANVAS_SIZE - width) / 2, (CANVAS_SIZE - height) / 2, width, height);

		// overlay
		ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
		ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

		drawInfo(ctx, data);
	};
	img.onerror = () => {
		ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
		drawInfo(ctx, data);
	};
	img.src = data.cover;
};
