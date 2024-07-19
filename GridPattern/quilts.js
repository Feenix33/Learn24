// quilt functions

function dice_quilt() {
    // setup
    rectMode(CENTER);
    ellipseMode(CENTER);
    colorMode(HSB,360,100,100);
    noLoop();

    let iPal = floor(random(MAX_PALETTE));
    let sz2 = CHIPSZ/2;
    let sz4 = CHIPSZ/4;
    // loop the quilt
    for (let y=CHIPSZ/2; y < height-CHIPSZ; y+=CHIPSZ) {
        for (let x=CHIPSZ/2; x < width-CHIPSZ; x+=CHIPSZ) {
            push();
            translate(x, y);
            rotate(PI/2 * floor(random(4)));
            fill( get_color(iPal, floor(random(5))) );
            rect(0, 0, CHIPSZ, CHIPSZ);

            // pips
            fill( get_color(iPal, floor(random(5))) );
            let roll=floor(random(6))+1;
            if (roll!=1) circle(-sz4, -sz4, sz4);
            if (roll>=4) circle(-sz4,  sz4, sz4);
            if (roll==1 || roll==3 || roll==5) circle(   0,    0, sz4);
            if (roll!=1) circle( sz4,  sz4, sz4);
            if (roll>=4) circle( sz4, -sz4, sz4);
            if (roll==6) {circle( sz4,    0, sz4);
                circle(-sz4,    0, sz4);
            }
            pop();
        }
    }
}

function quilt() {
    // setup
    rectMode(CENTER);
    ellipseMode(CENTER);
    colorMode(HSB,360,100,100);
    noLoop();

    let iPal = floor(random(MAX_PALETTE));
    // loop the quilt
    for (let y=CHIPSZ/2; y < height-CHIPSZ; y+=CHIPSZ) {
        for (let x=CHIPSZ/2; x < width-CHIPSZ; x+=CHIPSZ) {
            push();
            translate(x, y);
            rotate(PI/2 * floor(random(4)));
            fill( get_color(iPal, floor(random(5))) );
            rect(0, 0, CHIPSZ, CHIPSZ);
            fill( get_color(iPal, floor(random(5))) );
            circle(-CHIPSZ/4, -CHIPSZ/4, CHIPSZ/4);
            pop();
        }
    }
}
