const title = "A Normal Day";

class Friend {
  constructor(icon, x, y) {
    this.x = x;
    this.y = y;
    this.icon = icon;
  }

  move(direction) {
    const moveSpeed = 8;
    if (direction === "UP") {
      this.y -= moveSpeed;
    } else if (direction === "DOWN") {
      this.y += moveSpeed;
    } else if (direction === "RIGHT") {
      this.x += moveSpeed;
    } else if (direction === "LEFT") {
      this.x -= moveSpeed;
    } else if (direction === "UP-RIGHT") {
      this.y -= moveSpeed;
      this.x += moveSpeed;
    } else if (direction === "UP-LEFT") {
      this.y -= moveSpeed;
      this.x -= moveSpeed;
    } else if (direction === "DOWN-RIGHT") {
      this.y += moveSpeed;
      this.x += moveSpeed;
    } else if (direction === "DOWN-LEFT") {
      this.y += moveSpeed;
      this.x -= moveSpeed;
    }
  }

  draw(time) {
    const fillColor = color("#1B9AAA");
    fillColor.setAlpha(100);

    const strobeColor = color("#1B9AAA");

    const haloColor = color("#FFFFFF");
    const shadowColor = color("black");
    shadowColor.setAlpha(10);

    noStroke();
    fill(shadowColor);
    circle(this.x, this.y, 45);

    strokeWeight(3);
    strobeColor.setAlpha(40 - (time % 40));
    stroke(strobeColor);
    noFill();
    circle(this.x, this.y, 40 + (time % 40));

    noStroke();
    fill(haloColor);
    circle(this.x, this.y, 30);

    noStroke();
    fill(fillColor);
    circle(this.x, this.y, 20);

    image(this.icon, this.x - 10, this.y - 10, 20, 20);
  }

  canMove(width, height) {
    let moves = [];

    if (this.y > 20) {
      moves.push("UP");
    }
    if (this.y < height - 20) {
      moves.push("DOWN");
    }
    if (this.x < width - 20) {
      moves.push("RIGHT");
    }
    if (this.x > 20) {
      moves.push("LEFT");
    }

    if (moves.includes("UP")) {
      if (moves.includes("RIGHT")) {
        moves.push("UP-RIGHT");
      }
      if (moves.includes("LEFT")) {
        moves.push("UP-LEFT");
      }
    }

    if (moves.includes("DOWN")) {
      if (moves.includes("RIGHT")) {
        moves.push("DOWN-RIGHT");
      }
      if (moves.includes("LEFT")) {
        moves.push("DOWN-LEFT");
      }
    }

    return moves;
  }

  update(width, height, time) {
    if (time % 6 !== 0) {
      return;
    }
    const availableMoves = this.canMove(width, height);
    const nextMove = random(availableMoves);

    this.move(nextMove);
  }
}

let explorer;

let gummy;
let friend;
let play;
let pause;
let restart;
let friendIcon;

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

let dimensions = {
  width: 490,
  height: 550,
};

function setup() {
  gummy = loadImage("gummy.png");
  friend = loadImage("Friend.png");
  play = loadImage("play.png");
  pause = loadImage("pause.png");
  restart = loadImage("restart.png");
  friendIcon = loadImage("./assets/icon.png");

  createCanvas(dimensions.width, dimensions.height);
  explorer = new Friend(
    friendIcon,
    dimensions.width / 2,
    dimensions.height / 2
  );
}

function update() {
  if (!active) {
    return;
  }

  explorer.update(dimensions.width, dimensions.height, time);

  time += 1;
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
  text(title, 90, 35);

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
  time = 0;

  explorer = new Friend(
    friendIcon,
    dimensions.width / 2,
    dimensions.height / 2
  );
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

  signature();

  explorer.draw(time);

  drawUI(active);
}
