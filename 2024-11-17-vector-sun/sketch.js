function setup() {
  createCanvas(400, 400);
  background("#F8FFE5");
}

const baseColor = [346, 70, 94];
let time = 0;

function draw() {
  time += 1;

  translate(200, 200);

  v = p5.Vector.random2D();

  let [h, s, b] = baseColor;

  v.mult(random(50, 250));
  colorMode(HSB);
  const c = color(h, s, ((b + time) % 50) + 50);
  c.setAlpha(30);

  stroke(c);
  strokeWeight(randomGaussian(2, 3));
  strokeCap(ROUND);

  line(0, 0, v.x, v.y);
}
