let gummy;
function setup() {
  createCanvas(420, 473);

  gummy = loadImage("gummy.png");
}

function draw() {
  background("#F8FFE5");
  image(gummy, 200, 200);

  fill("red");
  rect(0, 470, 422, 473);
}
