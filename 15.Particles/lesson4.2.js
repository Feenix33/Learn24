// 15 Nature of Code 
//  4 Particle Systems
// Experiments and exercises from Dan Shipman's Nature of Code
// 4.1 particle class
// 4.2 add the emitter


/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
//function keyReleased() { print("key pressed, value= " + key + " keyCode= " + keyCode); }
//function mousePressed() { console.log ("mouse (" + mouseX + "," + mouseY + ")"); loop(); }

let particles = [];

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

class Emitter {
    constructor (x, y) {
        this.position = createVector(x,y);
        this.particles = [];
        this.c = [128+floor(random(128)), 128+floor(random(128)), 128+floor(random(128))];
    }
    emit (num) {
        for (let i=0; i < num; i++) {
            this.particles.push(
                new Particle(this.position.x, this.position.y, this.c, SHAPES.SQUARE));
        }
    }
    update() {
        for (let particle of this.particles) {
            let gravity = createVector(0, 0.2);
            particle.applyForce(gravity);
            particle.update();
        }
        for (let i = this.particles.length-1; i >= 0; i--) {
            if (this.particles[i].finished()) {
                this.particles.splice(i, 1);
            }
        }
    }

    show() {
        for (let particle of this.particles) {
            particle.show();
        }
    }
}

const SHAPES = {
        CIRCLE: 0,
        SQUARE: 1,
        DIAMOND: 2,
};

class Particle {
    constructor(x,y, c=null, shape=null ) {
        this.pos = createVector(x,y);
        this.vel = p5.Vector.random2D();
        this.vel.mult(random(0.05, 2));
        this.acc = createVector(0, 0);
        this.r = random(1,8);
        this.lifetime = 255;
        this.shape = shape ? shape : random(SHAPES);
        this.c = c ? c : [floor(random(255)), floor(random(255)), floor(random(255))];
        this.decay = random(0.5, 3);
    }

    finished() { return this.lifetime < 0; }
       
    applyForce(force) { this.acc.add(force); }

    edges() {
        if (this.pos.y >= height-this.r) {
            this.pos.y = height - this.r;
            this.vel.y *- -1;
        }
        if (this.pos.x >= width - this.r) {
            this.pos.x = width-this.r;
            this.vel.x *= -1;
        }
        else if (this.pos <= this.r) {
            this.pos.x = this.r;
            this.vel.x *= -1;
        }
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.set(0,0);
        this.lifetime -= this.decay;
    }

    show() {
        stroke(255, floor(this.lifetime));
        stroke(this.c[0],this.c[1],this.c[2], this.lifetime);
        strokeWeight(2);
        fill(this.c[0],this.c[1],this.c[2], floor(this.lifetime));
        switch (this.shape) {
            case SHAPES.SQUARE:
                square(this.pos.x, this.pos.y, this.r*2);
                break;
            case SHAPES.DIAMOND:
                push();
                translate (this.pos.x, this.pos.y);
                rotate(PI/4);
                square(0, 0, this.r*2);
                pop();
                break;
            default:
                circle(this.pos.x, this.pos.y, this.r*2);
        }
    }
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

let emitters = [];

function mousePressed() {
    emitters.push(new Emitter(mouseX, mouseY));
}

function setup() {
    createCanvas(800, windowHeight);
}

function draw() {
    background(0);
    let count = 0;

    for (let emitter of emitters) {
        emitter.emit(2);
        emitter.show();
        emitter.update();
        count += emitter.particles.length;
    }

    stroke(255);
    strokeWeight(1);
    fill(255);
    textSize(30);
    count = floor(count /10);
    text(count, 10, 40);
}

