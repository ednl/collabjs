let col, pencil, clear, save, socket;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
	noStroke();

	const r = floor(random(256));
	const g = floor(random(256));
	const b = floor(random(256));
	col = createColorPicker(color(r, g, b));
	pencil = createSlider(1, 100, 10, 1);
	pencil.style('width', '200px');
	clear = createButton('Wissen');
	clear.mousePressed(() => background(255));
	save = createButton('Bewaren');
	save.mousePressed(() => saveCanvas('tekening', 'jpg'));
	posUI();

	socket = io.connect('http://localhost:3000');
	socket.on('mouse', data => plot(data));
}

function posUI() {
	col.position(0, 0);
	pencil.position((width - pencil.width) / 2, 0);
	clear.position(width - clear.width, 0);
	save.position(width - clear.width - save.width - 5, 0);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	background(255);
	posUI();
}

function plot(data) {
	fill(data.r, data.g, data.b);
	const scalex = width / data.w;
	const scaley = height / data.h;
	circle(data.x * scalex, data.y * scaley, data.s * scalex);
}

function mouseDragged() {
	const x = mouseX;
	const y = mouseY;
	if (x >= 0 && x < width && y >= 20 && y < width) {
		const c = col.color();
		const data = {
			x: x,
			y: y,
			s: pencil.value(),
			r: red(c),
			g: green(c),
			b: blue(c),
			w: width,
			h: height
		};
		plot(data);
		socket.emit('mouse', data);
	}
}
