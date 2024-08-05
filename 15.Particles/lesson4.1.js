// 15 Nature of Code 
//  4 Particle Systems
// Experiments and exercises from Dan Shipman's Nature of Code


/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
//function keyReleased() { print("key pressed, value= " + key + " keyCode= " + keyCode); }
//function mousePressed() { console.log ("mouse (" + mouseX + "," + mouseY + ")"); loop(); }

let particles = [];

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

const SHAPES = {
        CIRCLE: 0,
        SQUARE: 1,
        DIAMOND: 2,
};

class Particle {
    constructor(x,y) {
        this.pos = createVector(x,y);
        this.vel = p5.Vector.random2D();
        this.vel.mult(random(0.05, 2));
        this.acc = createVector(0, 0);
        this.r = random(1,8);
        this.lifetime = 255;
        this.shape = random(SHAPES);
        this.c = [floor(random(255)), floor(random(255)), floor(random(255))];
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

function preload() {}

function setup() {
    createCanvas(800, windowHeight);
    for (let i=0; i < 3; i++) {
        particles.push(new Particle(width/2, 20));
    }
}


function draw() {
    background(0);
    for (let i=0; i < 3; i++) {
        particles.push(new Particle(width/2, 20));
    }

    for (let p of particles) {
        //let gravity = createVector(0, 0.2);
        //let gravity = createVector(0, 0.05);
        let gravity = createVector(0, 0.0005);
        p.applyForce(gravity);
        p.update();
        p.show();
    }

    /****
    for (let i = particles.length - 1; i > 0; i--) {
        if (particles[i].finished()) {
            particles.splice(i, 1);
        }
    }
    ****/
    particles = particles.filter((p) =>  {
        return p.lifetime > 0; 
    });
}

