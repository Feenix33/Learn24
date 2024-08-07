function setup() {
  createCanvas(512, 512);
  pixelDensity(1);
  background(0);
  loadPixels();
  const cx = width / 2;
  const cy = height / 2;
  const maxD = width / 2;
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const d = dist(cx, cy, i, j);
      const b = map(d, 0, maxD, 255, 0);
      let index = (i + j * width) * 4;
      pixels[index] = 255;
      pixels[index + 1] = 255;
      pixels[index + 2] = 255;
      pixels[index + 3] = b;
    }
  }
  updatePixels();
  save("texture.png");
}

