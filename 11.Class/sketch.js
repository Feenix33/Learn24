// 11 Class
// Class experiments and practice
//
//for (pt of pts) { }
//pts.forEach((pt)=> { });
// ternary operator: let r = (x > b) ? t : f
// eg = [1, 2, 3...]; res=eg.filter(x => x<99);

//import cmeHelpers;

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
class Bubble {
    constructor(x,y,r=30,c='red') {
        this.x = x;
        this.y = y;
        this.r = int(r);
        this.c = c;
        this.kill = false; // mark for kill
        this.vx = int(random(1,3)) * (random() > 0.5 ? 1 : -1);
        this.vy = int(random(1,3)) * (random() > 0.5 ? 1 : -1);
        this.f = true; // hovering
    }
    show() {
        this.f ? fill(this.c) : noFill();
        circle(this.x,this.y, this.r);
    }
    move() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x > width) { this.x = 0; }
        else if (this.x < 0) { this.x = width; }
        if (this.y > height) { this.y = 0; }
        else if (this.y < 0) { this.y = height; }
    }
    isInside(x,y) {
        let d = dist(x, y, this.x, this.y);
        return (d < this.r);
    }
    changeColor() {
        this.c = color(int(random(360)),100,100, 50);
    }
    hovered(x,y) {
        let d = dist(x, y, this.x, this.y);
        this.f = (d < this.r) ? false : true;
    }
    setKill(v=true) { this.kill = v; }
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

    colorMode(HSB,360,100,100,100);
    rectMode(CENTER)
    ellipseMode(CENTER)
    clrBack = color(int(random(360)),10, 80);

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
            color(int(random(360)),100,100, 50)
        ));
    }
}


function keyReleased() {
    switch (key) {
        default:
            print("key pressed, value= " + key + " keyCode= " + keyCode);
            break;
    }
}

function mousePressed() {
    //console.log ("mouse (" + mouseX + "," + mouseY + ")"); loop();
    var trip = false;
    bubbles.forEach((pt)=> {
        if(pt.isInside(mouseX, mouseY)) { pt.changeColor(); }
        if(pt.isInside(mouseX, mouseY)) { pt.setKill(); }
        trip = true;
    });
    if (trip) {
        bubbles = bubbles.filter( function (pt) { return pt.kill == false; } );
    }
}

function draw() {
    background(clrBack);
    strokeWeight(1);
    stroke('black');
    /**
    for (pt of bubbles) { 
        pt.show();
        pt.move();
    }
    **/
    bubbles.forEach((pt)=> {
        pt.hovered(mouseX, mouseY);
        pt.show();
        pt.move();
    });
    //noLoop();
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

