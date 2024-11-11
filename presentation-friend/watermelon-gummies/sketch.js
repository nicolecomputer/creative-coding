let gummy;
function setup() {
  createCanvas(490, 550);

  gummy = loadImage("gummy.png");
}

function draw() {
  background("#F8FFE5");
  image(gummy, 200, 200);

  fill("red");
  rect(0, 548, 495, 473);
}
