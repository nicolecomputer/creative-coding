let gummy;
let friend;
let play;
let pause;
let restart;

// {x, y, size}
let circles = [];
time = 0;
active = false;
let friendOffset = 0;

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

  if ((time > 120) & (time % 3 === 0) && time < 400) {
    const colors = [
      "#669900",
      "#99CC33",
      "#CCEE66",
      "#006699",
      "#3399CC",
      "#990066",
      "#CC3399",
      "#FF6600",
      "#FF9900",
      "#FFCC00",
    ];
    circles.push({
      x: width / 2,
      y: height / 2,
      radius: (time - 100) * 4,
      color: random(colors),
    });
  }

  if (friendOffset < 100) {
    friendOffset += 1;
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
  text("Happiness", 90, 35);

  fill("rgba(255,255,255,0.5)");
  rect(400, 5, 80, 50, 4);

  let statusIcon = pause;
  if (!isActive) {
    statusIcon = play;
  }

  const { reset } = buttons;
  image(
    statusIcon,
    buttons.play.x,
    buttons.play.y,
    buttons.play.width,
    buttons.play.height
  );

  if (time > 0) {
    image(restart, reset.x, reset.y, reset.width, reset.height);
  }
}

function playPause() {
  active = !active;
}

function resetSketch() {
  active = false;
  circles = [];
  time = 0;
  friendOffset = 0;
}

function mouseClicked() {
  const { play, reset } = buttons;
  if (
    mouseX >= play.x &&
    mouseX <= play.x + play.width &&
    mouseY > play.y &&
    mouseY <= play.y + play.height
  ) {
    playPause();
  } else if (
    mouseX >= reset.x &&
    mouseX <= reset.x + reset.width &&
    mouseY > reset.y &&
    mouseY <= reset.y + reset.height
  ) {
    resetSketch();
  }
}

function signature() {
  fill("#EEF2E4");

  const textColor = color("red");
  textColor.setAlpha(80);
  strokeWeight(2);
  stroke(textColor);
  text("NW", 450, 540);
}

function draw() {
  update();
  background("#F8FFE5");

  for (let i = circles.length - 1; i > 0; i--) {
    const c = circles[i];
    fill(c.color);
    noStroke();
    circle(c.x, c.y, c.radius);
    circle(c.x, c.y, c.radius + 4);
  }

  image(friend, width / 2 - 200 + friendOffset, height / 2 - 40, 80, 80);
  image(gummy, width / 2 - 25, height / 2 - 25, 50, 50);

  signature();

  drawUI(active);
}
