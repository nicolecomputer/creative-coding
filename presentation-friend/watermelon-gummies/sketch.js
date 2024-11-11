let gummy;
function setup() {
  createCanvas(490, 560);

  gummy = loadImage("gummy.png");
}

function draw() {
  background("#F8FFE5");
  image(gummy, 200, 200);

  fill("red");
  rect(0, 558, 495, 473);
}
