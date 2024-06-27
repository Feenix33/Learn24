// 11 Class
// Class experiments and practice
//
//for (pt of pts) { }
//pts.forEach((pt)=> { });
// ternary operator: let r = (x > b) ? t : f

//import cmeHelpers;

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
class Bubble {
    constructor(x,y,r,c) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.c = c;
    }
    show() {
        fill(this.c);
        circle(this.x,this.y, this.r);
    }
    move() {
        this.x += random(-1,1);
        this.y += random(-1,1);
    }
}


/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
clrBack = null;
bubbles = [];
const numBubbles = 10;

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
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
    rectMode(CENTER)
    ellipseMode(CENTER)
    clrBack = random(['MistyRose', 'AliceBlue', 'GhostWhite', 'WhiteSmoke', 'SeaShell', 'Beige', 'OldLace', 'FloralWhite', 'Ivory', 'AntiqueWhite']);

    bubbles = [];
    const marg = 100;
    for (var n=0; n < numBubbles; n++) {
        /**
        bubbles.push(new Bubble((n+2)*marg,(n+2)*marg,50,
            random(cmeHelpers.crayons8
        **/
        bubbles.push(new Bubble(
            marg+random(width-(2*marg)), 
            marg+random(height-(2*marg)), 
            random(20, 80),
            random(cmeHelpers.crayons24)));
    }

    /**
    for (var n=0; n < numBubbles; n++) {
        print (n, bubbles[n].x, bubbles[n].y, bubbles[n].r, bubbles[n].c);
    }
    **/
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
    background(clrBack);
    strokeWeight(1);
    stroke('black');
    //fill('blue');
    //for (var n=0; n < numBubbles; n++) {
    for (pt of bubbles) { 
        pt.show();
        pt.move();
    }
    //noLoop();
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

