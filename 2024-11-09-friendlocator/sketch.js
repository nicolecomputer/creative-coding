class Friend {
  constructor() {
    this.x = 200;
    this.y = 200;
    this.icon = loadImage("/assets/icon.png");
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

let friend = new Friend();
let time = 0;

function setup() {
  createCanvas(400, 400);
}

function keyPressed() {
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

function draw() {
  background("#F8FFE5");
  friend.draw(time);

  time += 1;
}
