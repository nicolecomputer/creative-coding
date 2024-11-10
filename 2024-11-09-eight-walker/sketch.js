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
    if (time % 5 !== 0) {
      return;
    }
    const availableMoves = this.canMove(width, height);
    const nextMove = random(availableMoves);

    this.move(nextMove);
  }
}

let friend;
let time = 0;
let dimensions = {
  width: 400,
  height: 400,
};

function setup() {
  createCanvas(dimensions.width, dimensions.height);

  const img = loadImage("./assets/icon.png");
  friend = new Friend(img);
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

function update() {
  friend.update(dimensions.width, dimensions.height, time);
  time += 1;
}

function draw() {
  background("#F8FFE5");
  signature();

  friend.draw(time);

  update();
}
