class Snowflake {
    constructor (xPos, yPos) {
        this.x = xPos;
        this.y = yPos;
        this.flakes = [];

        if (random() < 0.5) this.flakes.push (new CenterShapeFlake());
        if (random() < 0.5) this.flakes.push (new HexFlake());
        if (random() < 0.5) this.flakes.push (new SpokeFlake());
        if (random() < 0.5) this.flakes.push (new CirclesFlake());
        if (random() < 0.5) this.flakes.push (new SpokeShapeFlake());
    }
    render () {
        push();
        translate (this.x, this.y);
        this.flakes.forEach(flake => {
            flake.render();
        });
        pop();
        console.log (this.flakes);
    }
}