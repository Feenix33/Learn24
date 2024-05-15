// Tilings
// Simple
// create a simple tiling that fills totally randomly


function draw_simples() {
    /** simples **/
    make_tileset01(color('blue'), color('yellow'));
    make_tiling();
    /** simples **/
}

function make_tiling() {
    for (let y=0; y < height; y+=CHIPSZ) {
        for (let x=0; x < width; x+=CHIPSZ) {
            let tileID = floor(random(0, 16));
            placeTile(tileID, x,y, CHIPSZ);
        }
    }
}

function make_tileset01(clr1, clr2) {
    rectMode(CORNER);
    ellipseMode(CENTER);

    Tileset = createGraphics(TILE*4, TILE*4);
    Tileset.background(clr1);
    Tileset.noStroke();
    // dots to help
    /***
    Tileset.fill('white');
    for (let y=0; y<=4; y++) {
        for (let x=0; x<=4; x++) {
            Tileset.circle(x*TILE,y*TILE,10);
        }
    }
    ***/
    // Tiles
    Tileset.fill(clr2);
    Tileset.arc(2*TILE,TILE, TILE,TILE, PI,0); // t1 & t2
    Tileset.rect(3*TILE, TILE/2, TILE, TILE/2); // t3
    Tileset.arc(0, TILE, TILE,TILE, 0,PI*1.5); // t4
    // t5
    Tileset.fill(clr2);
    Tileset.rect(TILE, TILE, TILE, TILE);
    Tileset.fill(clr1);
    Tileset.arc(TILE,TILE*2, TILE,TILE, PI/2, 0);
    Tileset.arc(TILE*2,TILE, TILE,TILE, PI*0.5, PI);
    // t6
    Tileset.fill(clr2);
    Tileset.rect(2*TILE, TILE, TILE/2, TILE);
    // t7
    Tileset.fill(clr2);
    Tileset.rect(3*TILE, TILE, TILE, TILE);
    Tileset.fill(clr1);
    Tileset.arc(TILE*4,TILE, TILE,TILE, PI*0.5, PI);
    // t8
    Tileset.fill(clr2);
    Tileset.arc(TILE,TILE*2, TILE,TILE, PI*0.5, PI);
    // t9
    Tileset.rect(TILE*1.5, TILE*2, TILE/2, TILE);
    // t10
    Tileset.fill(clr2);
    Tileset.rect(TILE*2, TILE*2, TILE, TILE);
    Tileset.fill(clr1);
    Tileset.arc(TILE*2,TILE*2, TILE,TILE, 0, PI*0.5);
    Tileset.arc(TILE*3,TILE*3, TILE,TILE, PI, PI*0.5);
    // t11
    Tileset.fill(clr2);
    Tileset.rect(TILE*3, TILE*2, TILE, TILE);
    Tileset.fill(clr1);
    Tileset.arc(TILE*3,TILE*2, TILE,TILE, 0, PI*0.5);
    // t12
    Tileset.fill(clr2);
    Tileset.rect(0,TILE*3, TILE, TILE/2);
    // t13
    Tileset.fill(clr2);
    Tileset.rect(TILE,TILE*3, TILE, TILE);
    Tileset.fill(clr1);
    Tileset.arc(TILE,TILE*4, TILE,TILE, PI*0.5, 0);
    // t14
    Tileset.fill(clr2);
    Tileset.rect(TILE*2,TILE*3, TILE, TILE);
    Tileset.fill(clr1);
    Tileset.arc(TILE*3,TILE*4, TILE,TILE, PI, PI*0.5);
    // t15
    Tileset.fill(clr2);
    Tileset.rect(TILE*3,TILE*3, TILE, TILE);

}

function placeTile(n, x, y, d) {
    // n=tile number, xpos on buffer, ypos, d draw dimension
    let tx = (n % 4) * TILE;
    let ty = floor(n/4) * TILE;
    image(Tileset, x,y, d, d, tx,ty, TILE, TILE);
}

