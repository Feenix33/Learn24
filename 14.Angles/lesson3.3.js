// 14 Nature of Code Angles
// Experiments and exercises from Dan Shipman's Nature of Code
// 3.2 grab the spinning rect
// 3.3 draw waves that sum


/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
//function keyReleased() { print("key pressed, value= " + key + " keyCode= " + keyCode); }
//function mousePressed() { console.log ("mouse (" + mouseX + "," + mouseY + ")"); loop(); }
/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
class Wave {
    constructor(amp, period, phase) {
        this.amp = amp;
        this.period = period;
       
        this.phase = int(phase * width/TWO_PI);
    }
    evaluate(x) {
        //return sin(this.phase + (TWO_PI * x) / this.period) * this.amp;
        return this.amp * sin(TWO_PI * (x + this.phase) / this.period);
    }
    update() {
        this.phase += (1.0 / this.period);
    }
}

let waves= [];

function preload() {}

function setup() {
    createCanvas(800, 500);
    for (let i=0; i < 5; i++) {
        waves[i] = new Wave(random(20,80), random(100, 800), random(TWO_PI));
    }
}

let t = 0;

function draw() {
    background(0);
    translate(0, height/2);

    for (let x=0; x < width; x+= 5) {
        let y=0;
        for (let wave of waves) {
            let wy = wave.evaluate(x+t);
            y += wy;
            stroke('yellow');
            noFill();
            circle(x, wy, 10);
        }
        noStroke();
        fill(255);
        // ellipse(x, y+height/2, 10);
        ellipse(x, y, 10);
    }
    for (let wave of waves) {
        wave.update();
    }
    t+=1;
}

