let gummy;
let friend;
let play;
let pause;

// {x, y, size}
let gummies = [];
time = 0;
active = false;

function setup() {
  createCanvas(490, 550);
  angleMode(DEGREES);

  gummy = loadImage("gummy.png");
  friend = loadImage("Friend.png");
  play = loadImage("play.png");
  pause = loadImage("pause.png");
}

function update() {
  if (!active) {
    return;
  }
  time += 1;

  if (time < 30 || time % 3 === 0) {
    gummies.push({
      x: random(0, 490),
      y: random(65, 550),
      size: randomGaussian(60, 30),
      rotation: random(0, 350),
    });
  }
}

function drawUI(isActive) {
  fill("rgba(0,0,0,0.2)");
  noStroke();
  rect(0, 0, 490, 62);

  fill("#EF476F");
  noStroke();
  rect(0, 0, 490, 60);

  fill("#FFC43D");
  circle(40, 30, 35);

  image(friend, 10, 0, 60, 60);

  fill("white");
  textStyle(BOLD);
  textSize(16);
  text("Inside Friend's mind", 90, 24);

  fill("rgba(255,255,255,0.5)");
  rect(400, 5, 80, 50, 4);

  let statusIcon = pause;
  if (!isActive) {
    statusIcon = play;
  }

  image(statusIcon, 423, 10, 40, 40);
}

function mouseClicked() {
  active = !active;
}

function draw() {
  update();
  background("#F8FFE5");

  for (const g of gummies) {
    push();
    translate(g.x, g.y);
    imageMode(CENTER);
    rotate(g.rotation);
    image(gummy, 0, 0, g.size, g.size);
    pop();
  }

  drawUI(active);
}
