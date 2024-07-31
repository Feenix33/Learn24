// 14 Nature of Code Angles
// Experiments and exercises from Dan Shipman's Nature of Code
// 3.2 grab the spinning rect
// 3.3 draw waves that sum
// 3.4 pendulums


/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
//function keyReleased() { print("key pressed, value= " + key + " keyCode= " + keyCode); }
//function mousePressed() { console.log ("mouse (" + mouseX + "," + mouseY + ")"); loop(); }

let penduls = [];
let spacing = 100;
let gravity =  0.15;

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

class Pendulum {

    constructor(x, y, r, bobR) {
        this.origin = createVector(x, y);
        this.position = createVector();
        this.r = r;
        this.angle = PI/2;

        this.aVelocity = 0.0;
        this.aAcceleration = 0.0;
        this.damping = 0.999;
        this.ballr = bobR;

        this.position.set(this.r * sin(this.angle), this.r*cos(this.angle), 0);
        this.position.add(this.origin);
    }

    update() {
        this.aAcceleration = (-1 * gravity / this.r) * sin(this.angle)
        this.aVelocity += this.aAcceleration;
        this.aVelocity *= this.damping;
        this.angle += this.aVelocity;
    }

    move_origin(x, y) {
        this.origin.x = x;
        this.origin.y = y;
    }

    show() {
        this.position.set(this.r * sin(this.angle), this.r*cos(this.angle), 0);
        this.position.add(this.origin);
        stroke(252, 238, 33);
        strokeWeight(1);
        line(this.origin.x, this.origin.y, this.position.x, this.position.y);
        ellipseMode(CENTER);
        ellipse(this.position.x, this.position.y, this.ballr*2);
    }
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

function preload() {}

function setup() {
    createCanvas(800, windowHeight);
    let total = floor(height / spacing);
    penduls[0] = new Pendulum(width/3, 100, 200, 5);
    penduls[1] = new Pendulum(width*2/3, 100, random(20,300), 5);
    penduls[2] = new Pendulum(penduls[1].position.x, penduls[1].position.y, random(20,150), 5);
    penduls[3] = new Pendulum(penduls[2].position.x, penduls[2].position.y, random(20,150), 5);
    /***
    for (let i = 0; i < total; i++) {
        penduls[i] = new Pendulum(width/2, 0, spacing+i*spacing, 5);
    }
    ***/
}


function draw() {
    background(112, 50, 126, 10);
    for (let pendul of penduls) {
        pendul.update();
    }
    penduls[2].origin.x = penduls[1].position.x;
    penduls[2].origin.y = penduls[1].position.y;
    penduls[3].origin.x = penduls[2].position.x;
    penduls[3].origin.y = penduls[2].position.y;

    for (let pendul of penduls) {
        pendul.show();
    }
}

