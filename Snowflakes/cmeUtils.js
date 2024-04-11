// version 2

// draw a N side polygon of radius=radius
function polygon(x, y, radius, npts) { 
    let angle = TWO_PI / npts;
    let angState = angleMode(); // get the state to restore at end
    angleMode(RADIANS);
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = x + cos(a) * radius;
        let sy = y + sin(a) * radius;
        vertex (sx, sy);
    }
    endShape(CLOSE);
    angleMode(angState); // return the state
}

// draw half a polygon of side n
// draws on the bottom
// rotate=spin goes clockwise 
// units of spin in the calling mode
function half_polygon(x, y, radius, npts, spin=0) { 
    let angle = TWO_PI / npts;
    let angState = angleMode();
    push();
    rotate(spin);
    angleMode(RADIANS);
    beginShape();
    for (let j=0, a=0; j < floor((npts/2) +1); j++, a+=angle) {
        let sx = x + cos(a) * radius;
        let sy = y + sin(a) * radius;
        vertex (sx, sy);
    }
    endShape(CLOSE);
    angleMode(angState); // return the state
    pop();
}
