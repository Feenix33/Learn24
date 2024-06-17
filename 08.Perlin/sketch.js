// 08 Perlin
// Play around with noise
//
//for (pt of pts) { }
//pts.forEach((pt)=> { });

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

    //colorMode (HSB, 360, 100, 100, 255);
    
    // other setup
    //randomSeed(20240607);
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
    console.log ("mouse (" + mouseX + "," + mouseY + ")");
    loop();
}

function draw() {
    experiment();
    noLoop();
}

/***** ***** ***** ***** EXPERIMENTS ***** ***** ***** *****/

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function experiment01() {
    // 01 sin with noise

    // draw everything
    background(random(['MistyRose', 'AliceBlue', 'GhostWhite', 'WhiteSmoke', 'SeaShell', 'Beige', 'OldLace', 'FloralWhite', 'Ivory', 'AntiqueWhite']));

    push();
    translate (0, height/2);
    noFill();

    strokeWeight(4);

    // line
    let x, y, x1, y1;
    const inc = 1;
    x1 = x = y = y1 = 0
    while (x <= width){
        x += inc;
        y = sin((x/width*4*PI)) * 150 * noise(x/width);
        stroke('red');
        line (x, y, x1, y1);
        stroke('blue');
        point(x, sin((x/width*4*PI)) * 150);
        x1 = x;
        y1 = y;
    }

    pop();
    noLoop();
}
/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function experiment02() {
    // 01 sin with noise
    // 02 2d noise

    // line
    let x, y, x1, y1, n;
    let z = 1000;
    noStroke();
    let rez = 0.03;
    let rez2 = 0.003;
    rez2 = random()/100;
    x1 = x = y = y1 = 0
    for (y=0; y < height; y+= 3) {
        for (x=0; x < width; x+= 3) {
            n = noise(x*rez2, y*rez2, z*rez2) + 0.033;
            n = map(n, 0.2, 0.8, 0, 1);
            //if (n>0.5) {n=1;} else {n=0;}
            fill(255*n, 10, 0);
            rect (x, y, 3);
            z+=0.00015;
        }
    }
    noLoop();
}
/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function experiment03() {
    // 01 sin with noise
    // 02 2d noise
    // 03 plateau noise

    let rez = 0.03;
    let x, y, n, n1;
    let z = 1000;
    let col;

    noStroke();

    for (x=0; x < width; x+= 3) {
        for (y=0; y < height; y+= 3) {
            n = noise(x*rez, y*rez, z*rez) + 0.033;
            n = map(n, 0.3, 0.7, 0, 1);
            if (n < 0) { n += 1; }
            if (n > 1) { n -= 1; }

            if (n < 0.2) { col = 36 } // orange
            else if (n < 0.4) { col = 108; } // yellow
            else if (n < 0.6) { col = 180; } // light blue
            else if (n < 0.8) { col = 252; } // grape
            else { col = 324 } // rose

            fill(col, 100, 100, 100);
            rect (x, y, 3);
        }
    }
    noLoop();
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function experiment04() {
    // 04 basic movement, debugging why 1-3 aren't random
    background (200);
    let x = 100 * noise (0.005 * frameCount);
    let y = 100 * noise (0.005 * frameCount+10000);
    strokeWeight(5);
    stroke(0);
    point(x, y);
    loop();
}
/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function experiment05() {
    // 05 basic 2d
    let noiseLevel = 255;
    let noiseScale = 0.01;
    background (200);

    let x, y, nx, ny, c;

    z = random();
    noStroke();
    for (x=0; x < width; x+= 3) {
        for (y=0; y < height; y+= 3) {
            nx = noiseScale * x;
            ny = noiseScale * y;

            c = noiseLevel * noise(nx, ny, z);

            fill(c);
            rect(x,y,3);
        }
    }
    //loop();
    noLoop(); // print ("looped");
}
/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function experiment() {
    // 06 a flow field
  background(150);
  strokeWeight(0.6);
  noiseSeed(random()*10000);
  frame = 0;
  // noprotect
  numAcross = 70;
  numAcross = 10;
  size1 = (width - frame * 2) / numAcross;
  rez3 = 0.003;
  len = size1 * 0.3;
  len = size1/10;
  stroke(0, 200);
  for (x = frame; x < width - frame + 1; x += size1) {
    for (y = frame; y < height - frame + 1; y += size1) {
      stroke(0, 200);
      // Added the following two lines later to make it look more natural.  Try commenting them out.
      //x += width * random(-0.001, 0.001);
      //y += width * random(-0.001, 0.001);
      oldX = x;
      oldY = y;
      for (i = 0; i < 20; i++) {
        (i == 2) ? stroke('yellow') : stroke (0,200);
        n3 = noise(oldX * rez3, oldY * rez3) + 0.033;
        ang = map(n3, 0.3, 0.7, 0, PI * 2);
        ang = PI/6;
        // Below 2 lines are for limiting the angles
        // ang = floor(map(n3, 0.3, 0.7, 0, 8));
        // ang = ang*PI*0.25;

        newX = cos(ang) * len + oldX;
        newY = sin(ang) * len + oldY;
        line(oldX, oldY, newX, newY);
        oldX = newX;
        oldY = newY;
      }
      stroke('red');
      strokeWeight(8);
      point (x, y);
      strokeWeight(0.6);
    }
  }
    noLoop();
}
