let fg, pencil, clearall;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
	noStroke();

	const r = floor(random(256));
	const g = floor(random(256));
	const b = floor(random(256));
	fg = createColorPicker(color(r, g, b));
	fg.position(0, 0);

	pencil = createSlider(1, 100, 10, 1);
	pencil.style('width', '200px');
	pencil.position((width - pencil.width) / 2, 0);


	clearall = createButton('Clear All');
	clearall.position(width - clearall.width, 0);
	clearall.mousePressed(() => background(255));
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	pencil.position((width - pencil.width) / 2, 0);
	clearall.position(width - clearall.width, 0);
}

function mouseDragged() {
	const y = mouseY;
	if (y >= 20) {
		const x = mouseX;
		const s = pencil.value();
		const c = fg.color();
		fill(c);
		circle(mouseX, mouseY, s);

		const data = '{x:' + x + ',y:' + y + ',s:' + s + ',r:' + red(c) + ',g:' + green(c) + ',b:' + blue(c) + '}';
		console.log(data);
	}
}
