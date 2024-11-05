function setup() {
  createCanvas(400, 400);
}

let orb = {
  x: 200,
  y: 200,
  size: 100,
};

let speed = 2;

function draw() {
  update();

  background("#8338ec");
  fill("#ff006e");

  strokeWeight(3);
  stroke("#ffbe0b");
  circle(orb.x, orb.y, orb.size);
}

function update() {
  orb.x = orb.x + speed;

  if (orb.x <= 50 || orb.x >= 350) {
    speed = -speed;
  }
}
