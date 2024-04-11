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
