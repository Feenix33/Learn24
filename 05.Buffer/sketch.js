// 05.Buffer
// Play around with offscreen buffers and tinting
//

function preload() {}

function setup() {
	// log start time
	var now = new Date();
	console.log(
		"Running @" + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds(),
	);

	// create the canvas
	var widthCanvas = 800;
	var heightCanvas = 500;
	createCanvas(widthCanvas, heightCanvas);
	background("ghostwhite");
	// createCanvas(windowWidth, windowHeight);
	
	// create the buffer canvas
	buf = createGraphics(width,height);
	buf.background(color('AliceBlue'));
	// draw some random circles
	for (var n=0; n<180; n++) {
		buf.fill(random(128,255),random(128,255),random(128,255),random(128,255));
		buf.circle(random(width),random(height),random(50,100));
	}
	// image(buf,0,0);
	// other setup
	//colorMode(HSB, 360, 100, 100);
	noLoop();
}


function keyReleased() {
	switch (key) {
		default:
			print("key pressed, value= " + key + " keyCode= " + keyCode);
			break;
	}
}

function mousePressed() {
	//console.log ("mouse (" + mouseX + "," + mouseY + ")");
	loop();
}

function experiment01() {
	// draw rotated buffer
	const sz=50; // tilesize
	var x, y, tile;
	
	stroke(255,0,0);
	noFill();
	for (x=0; x<=width; x+=sz){
		for (y=0; y<=height; y+=sz) {
			tile=buf.get(x,y,sz,sz);
			push();
			translate(x,y);
			rotate(floor(random(4))*(PI/2));
			image(tile,0,0);
			rect(0,0,sz,sz);
			pop();
		}
	}
}

function experiment02() {
	// sample a tile and draw the tile w/the sampled color
	const sz=5; // tilesize
	var x, y, tile;
	
	stroke('blue');
	for (x=0; x<=width; x+=sz){
		for (y=0; y<=height; y+=sz) {
			tile=buf.get(x,y,sz,sz);
			push();
			translate(x,y);
			fill(tile.get(random(sz),random(sz)));
			rect(0,0,sz,sz);
			pop();
		}
	}
}

function experiment03() {
	// sample a tile and draw the tile w/the sampled color
	// try to speed up the 02 version
	// result: didn't seem to work
	const sz=10; // tilesize
	var x, y, tile;
	var offScrn = createGraphics(width,height);
	
	noStroke();
	for (x=0; x<=width; x+=sz){
		for (y=0; y<=height; y+=sz) {
			tile=buf.get(x,y,sz,sz);
			offScrn.push();
			offScrn.translate(x,y);
			offScrn.fill(tile.get(random(sz),random(sz)));
			offScrn.rect(0,0,sz,sz);
			offScrn.pop();
		}
	}
	image(offScrn,0,0);
}

function experiment04() {
	// 04 play with tint
	const sz=50; // tilesize
	var x, y, tile;
	var pix; // a pixel for tinting

	noStroke();
	tint(random(255),random(255),random(255),100);
	for (x=0; x<=width; x+=sz){
		for (y=0; y<=height; y+=sz) {
			tile=buf.get(x,y,sz,sz);
			push();
			translate(x,y);
			pix = tile.get(random(sz),random(sz));
			//tint(red(pix),green(pix),blue(pix),100);
			tint(red(pix),green(pix),blue(pix));
			image(tile,0,0);
			pop();
		}
	}
}
function experiment() {
	// 05 clear background
	const sz=50; // tilesize
	var x, y, tile;
	var offScrn = createGraphics(width,height);

	// create the off screen image
	// draw some random circles
	for (var n=0; n<40; n++) {
		// offScrn.fill(random(128,255),random(128,255),random(128,255),random(128,255));
		offScrn.fill(random(128,255),random(128,255),random(128,255));
		offScrn.circle(random(width),random(height),random(50,100));
		offScrn.square(random(width),random(height),random(50,100));
	}
	
	background('orange');
	noStroke();
	for (x=0; x<=width; x+=sz){
		for (y=0; y<=height; y+=sz) {
			push();
			image(offScrn.get(x,y,sz,sz),x, y);
			pop();
		}
	}
}

function draw() {
	experiment();
	noLoop();
}
