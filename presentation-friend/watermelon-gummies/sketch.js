let gummy;
let friend;
let play;
let pause;
let restart;

// {x, y, size}
let gummies = [];
time = 0;
active = false;

let buttons = {
  play: {
    x: 440,
    y: 16,
    width: 30,
    height: 30,
  },
  reset: {
    x: 405,
    y: 16,
    width: 30,
    height: 30,
  },
};

function setup() {
  createCanvas(490, 550);
  angleMode(DEGREES);

  gummy = loadImage("gummy.png");
  friend = loadImage("Friend.png");
  play = loadImage("play.png");
  pause = loadImage("pause.png");
  restart = loadImage("restart.png");
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
  textSize(18);
  text("Deep inner thoughts", 90, 35);

  fill("rgba(255,255,255,0.5)");
  rect(400, 5, 80, 50, 4);

  let statusIcon = pause;
  if (!isActive) {
    statusIcon = play;
  }

  const { play, reset } = buttons;
  image(statusIcon, play.x, play.y, play.width, play.height);

  if (time > 0) {
    image(restart, reset.x, reset.y, reset.width, reset.height);
  }
}

function mouseClicked() {
  const { play, reset } = buttons;
  if (
    mouseX >= play.x &&
    mouseX <= play.x + width &&
    mouseY > play.y &&
    mouseY <= play.y + height
  ) {
    playPause();
  } else if (
    mouseX >= reset.x &&
    mouseX <= reset.x + reset.width &&
    mouseY > reset.y &&
    mouseY <= reset.y + reset.height
  ) {
    reset();
  }
}

function playPause() {
  active = !active;
}

function reset() {
  active = false;
  time = 0;
  gummies = [];
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
