// 15 Nature of Code 
//  4 Particle Systems
// Experiments and exercises from Dan Shipman's Nature of Code
// 4.1 particle class
// 4.2 add the emitter
// 4.2a fireworks
// 4.2b raybursts


/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

class Rayburst {
    constructor (x,y) {
        this.pos = createVector(x,y);
        this.c = [128+floor(random(128)), 128+floor(random(128)), 128+floor(random(128))];
        this.n = floor(random(6,40));
        this.len = floor(random(50,500));
        this.rays = [];
        let inc = TWO_PI/this.n;
        let v = random(0.5,5);
        for (let j=0; j < this.n; j++) {
            this.rays.push(new Ray(this.pos, j*inc, this.c, this.len, v));
        }
        this.life = floor(random(200,500));
    }
    update() {
        this.life -= 2;
        for (let ray of this.rays) {
            ray.update();
        }
    }
    show() {
        if (this.life > 0) {
            if (this.life < 255) {
                stroke(this.c[0], this.c[1], this.c[2], this.life);
                fill(this.c[0], this.c[1], this.c[2], this.life);
            }
            else {
                fill(this.c);
                stroke(this.c);
            }
            strokeWeight(1);
            circle(this.pos.x, this.pos.y, 10);
            strokeWeight(3);
            for (let ray of this.rays) {
                ray.show();
            }
        }
    }

}

class Ray {
    constructor (pos, head, c, l, v) {
        this.bgn = createVector(pos.x, pos.y);
        this.end = createVector(pos.x, pos.y);
        this.c = c;
        this.vel = createVector(pos.x, pos.y);
        this.vel.setMag(v);
        this.vel.setHeading(head);
        this.len = l;
        this.done = false;
    }
    update() {
        this.bgn.add (this.vel);
        if (!this.done) {
            this.done = dist(this.bgn.x,this.bgn.y, this.end.x, this.end.y) >= this.len;
        }
        else {
            this.end.add (this.vel);
        }
    }
    show() {
        //strokeWeight(3);
        //stroke(this.c);
        line(this.bgn.x,this.bgn.y, this.end.x, this.end.y); 
    }
}


/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/


let bursts = [];
let delay;

function mousePressed() {
    bursts.push( new Rayburst(mouseX, mouseY)); 
}

function setup() {
    createCanvas(800, windowHeight);
    bursts.push( new Rayburst(width/2, height/2)); 
    delay = 0;
}

function draw() {
    background(0);

    for (let burst of bursts) {
        burst.show();
        burst.update();
    }
    bursts = bursts.filter(b => b.life > 0); // filter dead rockets

    delay--;
    if (delay <= 0) {
        delay = floor(random(10, 100));
        bursts.push( new Rayburst(random(width), random(height))); 
    }

    stroke(255);
    strokeWeight(1);
    fill(255);
    textSize(30);
    let count = bursts.length;
    text(count, 10, 40);
}

