const ITERATION_LIMIT = 120;

let iterators = 0;

function setup() {
  createCanvas(400, 400);

  background("#f8edeb");
}

function draw() {
  // Play with these values:
  // 200 is the center of the distribution and 40 is the standard deviation
  const x = randomGaussian(200, 40);

  if (iterators < ITERATION_LIMIT) {
    const c = color("#90BE6D");
    c.setAlpha(20);
    noStroke();
    fill(c);
    circle(x, 200, 40);
  }
  iterators += 1;
}
