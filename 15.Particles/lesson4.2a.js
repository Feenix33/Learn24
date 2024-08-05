// 15 Nature of Code 
//  4 Particle Systems
// Experiments and exercises from Dan Shipman's Nature of Code
// 4.1 particle class
// 4.2 add the emitter
// 4.2a fireworks


/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

let particles = [];

let gravity = 0.01;

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

class Rocket {
    constructor (x) {
        this.pos = createVector(x,height);
        this.vel = createVector(random(-4,4), -random(4,8));
        this.acc = createVector(0, gravity);
        this.life = 100;
        this.particles = [];
        this.c = [128+floor(random(128)), 128+floor(random(128)), 128+floor(random(128))];
    }
    update() {
        //this.life -= 1;
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        if (this.life >= 0 && this.pos.y < height/4) {
            this.life = -1;
            let num = 20;
            let ivel = p5.Vector.random2D();
            ivel.mult(random(4));

            for (let i=0; i < num; i++) {
                this.particles.push(
                    new Particle(this.pos.x, this.pos.y, this.c, ivel, TWO_PI/num*i));
            }
        }
        for (let particle of this.particles) {
            let gravity = createVector(0, 0.05);
            particle.applyForce(gravity);
            particle.update();
        }
        this.particles = this.particles.filter(r => r.lifetime > 0); // filter dead rockets
    }
    show() {
        if (this.life > 0) {
            fill(255,0,0,168);
            circle(this.pos.x, this.pos.y, 6);
        }
        for (let particle of this.particles) {
            particle.show();
        }
    }
}


class Particle {
    constructor(x,y, c=null, vel=null, head=null) {
        this.pos = createVector(x,y);
        if (vel == null) {
            this.vel = p5.Vector.random2D();
            this.vel.mult(random(0.05, 2));
        }
        else {
            this.vel = vel;
        }
        if (head) {
            this.vel.setHeading (head); 
        }
        this.acc = createVector(0, 0);
        this.r = random(1,8);
        this.lifetime = 255;
        this.c = c ? c : [floor(random(255)), floor(random(255)), floor(random(255))];
        this.decay = random(0.5, 3);
    }

    finished() { return this.lifetime < 0; }
       
    applyForce(force) { this.acc.add(force); }

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
        circle(this.pos.x, this.pos.y, this.r*2);
    }
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

let rockets = [];

function mousePressed() {
    rockets.push( new Rocket(random(width)));
}

function setup() {
    createCanvas(800, windowHeight);
    rockets[0] = new Rocket(width/3);
}

function draw() {
    background(0);

    for (let rocket of rockets) {
        rocket.show();
        rocket.update();
    }
    //rockets = rockets.filter(r => r.life > 0); // filter dead rockets

    stroke(255);
    strokeWeight(1);
    fill(255);
    textSize(30);
    let count = rockets.length;
    //text(count, 10, 40);
    if (count > 0) {
        //text(floor(rockets[0].pos.y/10), 10, 40);
    }
}

