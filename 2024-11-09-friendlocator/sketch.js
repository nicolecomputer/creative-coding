class Friend {
  constructor(icon) {
    this.x = 200;
    this.y = 200;
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
}

let friend;
let time = 0;

function setup() {
  createCanvas(400, 400);

  const img = loadImage("./assets/icon.png");
  friend = new Friend(img);
}

function keyPressed() {
  if (friend === null) {
    return;
  }
  if (keyCode === UP_ARROW) {
    friend.move("UP");
  } else if (keyCode === DOWN_ARROW) {
    friend.move("DOWN");
  } else if (keyCode === RIGHT_ARROW) {
    friend.move("RIGHT");
  } else if (keyCode === LEFT_ARROW) {
    friend.move("LEFT");
  }
}

function signature() {
  fill("#EEF2E4");
  noStroke();
  rect(360, 360, 30);

  const textColor = color("red");
  textColor.setAlpha(120);
  strokeWeight(2);
  stroke(textColor);
  text("NW", 365, 380);
}

function draw() {
  background("#F8FFE5");
  signature();

  friend.draw(time);

  time += 1;
}
