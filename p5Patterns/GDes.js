const cmeProgram = "cmeGenDes020306.js";
// Recreations of Generative Design, Creative Coding on the Web
// Based on P.2.3.06
//
// mouse
//
// keys
//
// variation
//


// --------------------------------------------------------------------------------
// Globals
var modules;
var tiles = [];
var gDebug = 1;
var maxX, maxY, xyDim;

// --------------------------------------------------------------------------------
function preload() {
  modules = [];

  modules[ 0] = loadImage('../assets/00.svg');
  modules[ 1] = loadImage('../assets/01.svg');
  modules[ 2] = loadImage('../assets/02.svg');
  modules[ 3] = loadImage('../assets/03.svg');
  modules[ 4] = loadImage('../assets/04.svg');
  modules[ 5] = loadImage('../assets/05.svg');
  modules[ 6] = loadImage('../assets/06.svg');
  modules[ 7] = loadImage('../assets/07.svg');
  modules[ 8] = loadImage('../assets/08.svg');
  modules[ 9] = loadImage('../assets/09.svg');
  modules[10] = loadImage('../assets/10.svg');
  modules[11] = loadImage('../assets/11.svg');
  modules[12] = loadImage('../assets/12.svg');
  modules[13] = loadImage('../assets/13.svg');
  modules[14] = loadImage('../assets/14.svg');
  modules[15] = loadImage('../assets/15.svg');
}

function setup() {
  const canvasW = 900; // canvas size
  const canvasH = 600; // canvas size
  maxX = 10;
  maxY = 8;
  xyDim = min(int(canvasW / maxX), int(canvasH / maxY));

  console.log(cmeProgram + ' @' + cme.timelog());
  createCanvas(canvasW, canvasH);
  document.addEventListener('contextmenu', event => event.preventDefault());

  initTiles();
  //console.log("tiles[0][-1]=",tiles[0][-1]);
  //console.log("str(tiles[0][-1])=",str(tiles[0][-1]));
  //for (var j=0; j < 10; j++) { console.log(int(random(2))); }
}

function initTiles() {
  tiles = [];
  for (var x=0; x < maxX; x++) {
    tiles[x] = [];
    for (var y=0; y < maxY; y++) {
      tiles[x][y] = int(random(2));
    }
  }
  //tiles[2][1] = 1;
  //tiles[2][2] = 1;
}

// --------------------------------------------------------------------------------

function draw() {
  noFill();
  //noLoop();

  background('white');

  stroke('blue');
  strokeWeight(1);
  //fill('yellow');

  // --------------------------------------------------
  // test the mouse
  // --------------------------------------------------
  if (mouseIsPressed) {
    var ix, iy;
    ix = int(mouseX / xyDim);
    iy = int(mouseY / xyDim);
    if (ix >= 0 && ix < maxX && iy >= 0 && iy < maxY) {
      if (mouseButton == LEFT) tiles[ix][iy] = 1;
      if (mouseButton == RIGHT) tiles[ix][iy] = 0;
    }
  }

  // --------------------------------------------------
  // big loops for the tiles
  // --------------------------------------------------
  var n = 0;
  var xPos, yPos;
  for (var x=0; x < maxX; x++) {
    xPos = x* xyDim;
    for (var y=0; y < maxY; y++) {
      yPos = y*xyDim;
      switch (gDebug) {
        case 1:
          if (tiles[x][y] > 0) {
            var dex = computeNeighbors(x,y);
            image(modules[dex], xPos, yPos, xyDim, xyDim);
          }
          else {
            noFill();
            stroke('green');
            rect(xPos, yPos, xyDim, xyDim);
          }
          break;

        case 2:
          if (tiles[x][y] == 0) {fill('white');}
          else if (tiles[x][y] == 1) {fill('blue');}
          else fill ('red');
          rect (xPos, yPos, xyDim, xyDim);
          break;

        case 3:
          noFill();
          var dex = computeNeighbors(x,y);
          var s = x + "," + y + "=" + dex;
          text(s, xPos+40, yPos+40);
          //if (x==5) { console.log (tiles[x][y], dex, x, y); }
          break;

        case 0:
          var dex = (x+y) % 16;
          imaßge(modules[dex], xPos, yPos, xyDim, xyDim);
          break;
      }
    }
  }
}

function computeNeighbors(x,y,dbg=false) {
  var nbr = 0;
  if (tiles[x][y] > 0) {
    if (y > 0 && tiles[x  ][y-1]) nbr += 8;
    if (x > 0 && tiles[x-1][y  ]) nbr += 4;
    if (y < (maxY-1) && tiles[x  ][y+1]) nbr += 2;
    if (x < (maxX-1) && tiles[x+1][y  ]) nbr += 1;
  }
  if (dbg) { console.log (x, y,
    tiles[x  ][y  ],
    tiles[x  ][y-1],
    tiles[x-1][y  ],
    tiles[x  ][y+1],
    tiles[x+1][y  ]);
  }
  return nbr;
}

// --------------------------------------------------------------------------------

function keyReleased() {
  if (keyCode == DELETE || keyCode == BACKSPACE) background(0, 0, 255);
  switch (key) {

    case '0': gDebug = 0;  break;
    case '1': gDebug = 1;  break;
    case '2': gDebug = 2;  break;
    case '3': gDebug = 3;  break;
    case 'r': initTiles();  break;
    case 'm': console.log ("mouse at ["+ mouseX + "," + mouseY + "]");break;
    case 'S': console.log("saving"); saveCanvas(cme.timestring(), 'png'); break;
    case '+': xyDim = int (xyDim/2);
      if (xyDim < 10) xyDim = 10;
      maxX = int(width  / xyDim);
      maxY = int(height  / xyDim);
      initTiles();
      break;
    case '-': 
      xyDim *= 2;
      if (xyDim > 200) xyDim = 200;
      maxX = int(width  / xyDim);
      maxY = int(height  / xyDim);
      initTiles();
      break;
    default:
      print ("key pressed value = " + key + "  keyCode = " + keyCode);
      break;
  }
  loop();
}
/***
function mousePressed() {
  //console.log ("mouse pressed ["+ mouseX + "," + mouseY + "]");
  var ix, iy;
  ix = int(mouseX / xyDim);
  iy = int(mouseY / xyDim);
  if (ix >= 0 && ix < maxX && iy >= 0 && iy < maxY) {
    tiles[ix][iy] = ! tiles[ix][iy];
  }
  loop();
}
***/

