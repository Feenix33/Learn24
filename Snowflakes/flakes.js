// flakes.js
// the layers of the snowflake

class Flake {
    constructor() {
        this.diam = FLAKE_SIZE;
        this.crayons = CRAYONS;
    }
}

class HexFlake extends Flake {
    constructor() {
        super();
    }
    render() {
        noFill();
        strokeWeight(floor(random(1,5)));

        let n = floor(random(1, 10));
        let delta = this.diam / n / 2;
        stroke( random (this.crayons) );
        for (let j=1; j <= n; j++) {
            polygon(0, 0, j*delta, 6);
        }
    }
}

class SpokeFlake extends Flake {
    constructor() {
        super();
    }
    render() {
        stroke(random (this.crayons));
        strokeWeight( floor (random(1, 6)));
        let xPos = random(0.05,0.5) * this.diam;
        push(); {
            for (let n=0; n < 6; n++) {
                line (0, 0, xPos, 0);
                rotate(60);
            }
        } pop();
    }
}

class CenterShapeFlake extends Flake {
    constructor() {
        super();
    }
    render() {
        let radius = this.diam / 2;
        noStroke();
        fill(random (this.crayons));
        radius = this.diam * random(0.5, 0.40);
        if (random() < 0.5) circle (0, 0, radius);
        else polygon(0, 0, radius, 6);
    }
}

class CirclesFlake extends Flake {
    constructor() {
        super();
    }
    render() {
        let n = floor(random(1, 10));
        let delta = this.diam / n;
        stroke( random (this.crayons) );
        noFill();
        for (let j=1; j <= n; j++) {
            circle(0, 0, j*delta);
        }
    }
}

class SpokeShapeFlake extends Flake {
    constructor() {
        super();
    }
    render() {
        // draw shapes on the spoke
        console.log ("spoke shape"); // DEBUG
        noStroke();
        fill(random (this.crayons));
        let shape = random();
        let radius = random(0.03, 0.16) * this.diam;
        let spoke = this.diam * random (0.2, 0.4);
        push(); {
            for (let n=0; n < 6; n++) {
                if (shape < 0.25) { circle(spoke, 0, radius*2);
                    } else if (shape < 0.5) { polygon(spoke, 0, radius, 6);
                    } else if (shape < 0.75) { polygon(spoke, 0, radius, 4);
                    } else {polygon(spoke, 0, radius, 3);
                }
                rotate (60);
            }
        }
        pop();
    }
}

