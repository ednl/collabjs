// As seen on The Coding Train by Dan Shiffman
// Video https://youtu.be/i6eP1Lw4gZk from 13 Apr 2016
// Code https://github.com/CodingTrain/website/tree/master/Node/sockets
//
// Extras: scaling, colour picker, pen size, clear, save
// TODO: group parts of the drawing by ClientID, selectively clear

let col, pen, clear, save, socket;

function setup() {
	// createCanvas(1000, 1000);  // How to leave room for zooming?
	createCanvas(windowWidth, windowHeight);
	background(255);
	noStroke();

	const r = floor(random(256));
	const g = floor(random(256));
	const b = floor(random(256));
	col = createColorPicker(color(r, g, b));
	pen = createSlider(1, 100, 10, 1);
	pen.style('width', '200px');
	clear = createButton('Clear');
	clear.mousePressed(() => background(255));
	save = createButton('Save');
	save.mousePressed(() => saveCanvas('drawing', 'jpg'));
	posUI();

	socket = io.connect('http://rainbow:3000');  // change to public server address when applicable
	socket.on('draw', data => plot(data));
}

function posUI() {
	col.position(0, 0);
	pen.position((width - pen.width) / 2, 0);
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
	if (x >= 0 && x < width && y >= 30 && y < width) {
		const c = col.color();
		const data = {
			x: x,
			y: y,
			s: pen.value(),
			r: red(c),
			g: green(c),
			b: blue(c),
			w: width,
			h: height
		};
		plot(data);
		socket.emit('draw', data);
		return false;  // to prevent dragging the page/canvas on touch devices
	}
}
