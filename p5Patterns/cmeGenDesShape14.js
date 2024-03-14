const cmeProgram = "cmeGenDesShape14.js"
// Recreations of Generative Design, Creative Coding on the Web
// Shape Chapter
// Based on P.2.1.3.05
//
// draw simulated cones
// mouse
//   x,y: position shift
//   left: random shift
//
// keys
//
// variation
//


// --------------------------------------------------------------------------------
// Globals

// --------------------------------------------------------------------------------
function preload() {
}

function setup() {
  const canvasW = 600; // canvas size
  const canvasH = 600; // canvas size
  console.log(cmeProgram + ' @' + cme.timelog());
  createCanvas(canvasW, canvasH);
}

// --------------------------------------------------------------------------------

function draw() {
  noFill();
  noLoop();

  // var gx = map(mouseX, 0, width, 50, width, true);
  // var gy = map(mouseY, 0, height, 50, height, true);
  var gx = 100;
  var gy = 100;
  //var nLines = 1 + int((mouseX/width)*gLines);
  //var nLines = 3;
  background('white');

  stroke('black');
  strokeWeight(1);
  rectMode(CENTER);
  angleMode(DEGREES);

  // --------------------------------------------------
  // big loops for the tiles
  // --------------------------------------------------
  for (var y=0; y<=height; y+=gy) {
    for (var x=0; x<=width; x+=gx) {
      push()
      translate (x+gx/2, y+gy/2);

      stroke('black');
      rect (0, 0, gx, gx);

      // --------------------------------------------------
      // inner loops - box size is gx,gy but may be offset
      // using -gx/2, -gy/2
      // --------------------------------------------------
      //stroke('red');
      //circle(0,0,2);

      var r=gx;
      var fclr = 255;
      var ix, iy;
      var dir;

      ix = 0; iy = 0;
      dir = int(random(4));

      noStroke();
      var m=1.2;

      for (var n=0; n < 30; n++) {
        fill(fclr);
        switch (dir) {
        case 0: circle(ix, iy-n*m, r); break;
        case 1: circle(ix-n*m, iy, r); break;
        case 2: circle(ix, iy+n*m, r); break;
        case 3: circle(ix+n*m, iy, r); break;
        }
        r *= 0.95;
        fclr *= 0.95;
      }

      pop();
    }
  }
  noLoop();
}


// --------------------------------------------------------------------------------

function keyReleased() {
  if (keyCode == DELETE || keyCode == BACKSPACE) background(0, 0, 255);
  switch (key) {

    case 'm': console.log ("mouse at ["+ mouseX + "," + mouseY + "]");break;
    case 'S': console.log("saving"); saveCanvas(cme.timestring(), 'png'); break;
    default:
      print ("key pressed value = " + key + "  keyCode = " + keyCode);
      break;
  }
}
function mousePressed() {
  console.log ("mouse pressed ["+ mouseX + "," + mouseY + "]");
  loop();
}

