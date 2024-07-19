// 12 Nature of Code
// Experiments and exercises from Dan Shipman's Nature of Code
//
//for (pt of pts) { }
//pts.forEach((pt)=> { });
// ternary operator: let r = (x > b) ? t : f
// eg = [1, 2, 3...]; res=eg.filter(x => x<99);

//import cmeHelpers;

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
let walker;
let movers = [];
let mu=0.05;

const  colors = [
  {r: 156, g:   0, b:  24},
  {r: 252, g: 122, b:   0},
  {r:  37, g:   7, b:  95},
  {r:   9, g:  60, b:  64},
  {r: 244, g:   5, b:   9},
  {r: 254, g: 208, b:   1},
  {r:   3, g:   0, b: 213},
  {r:   0, g:   0, b:   0},
]; 


/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function preload() {}

function setup() {
    cmeLogTime("Started @"); // log start time

    // create the canvas
    createCanvas(800, 500);
    for (var j=0; j < colors.length; j++) {
        movers[j] = new Mover(random(width), random(height), 4, colors[j]);
    }
}


function keyReleased() {
    switch (key) {
        default:
            print("key pressed, value= " + key + " keyCode= " + keyCode);
            break;
    }
}

/***
function mousePressed() {
    console.log ("mouse (" + mouseX + "," + mouseY + ")"); loop();
    //print (walker.pos.x, walker.pos.y);
}
***/

function draw() {
    background(39,119,20);
    //for (let mover of movers) {
    movers.forEach((mover)=> {
        mover.friction();
        mover.update();
        mover.edges();
        mover.show();
    });
}

