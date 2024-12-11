function setup() {
  createCanvas(400, 400);
}

function draw() {
  let jitter = randomGaussian(10, 2);
  background(220);

  fill(100, 200, 150);
  noStroke();

  beginShape();
  curveVertex(100 + randomGaussian(20, 5), 200 + randomGaussian(20, 5)); // Starting point
  curveVertex(150 + randomGaussian(20, 5), 150 + randomGaussian(20, 5));
  curveVertex(200 + randomGaussian(20, 5), 180 + randomGaussian(20, 5));
  curveVertex(250 + randomGaussian(20, 5), 150 - randomGaussian(6, 5));
  curveVertex(300 + randomGaussian(20, 5), 200 + randomGaussian(20, 5));
  curveVertex(250 + randomGaussian(20, 5), 250 + randomGaussian(20, 5));
  curveVertex(200 + randomGaussian(20, 5), 220 + randomGaussian(20, 5));
  curveVertex(150 + randomGaussian(20, 5), 250 + randomGaussian(20, 5));
  curveVertex(100 + randomGaussian(20, 5), 200 + randomGaussian(20, 5)); // Ending point
  endShape(CLOSE);
}
