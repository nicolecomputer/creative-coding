const friendConfig = {
  moveSpeed: 8,
  chanceToMoveOn: 0.05,
};

class Friend {
  constructor(icon) {
    this.x = 200;
    this.y = 200;
    this.icon = icon;
    this.state = {
      type: "explore",
    };
  }

  move(direction) {
    const { moveSpeed } = friendConfig;
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
    fill("#495C54");
    noStroke();
    text(`Friend's state is: ${this.state.type}`, 5, 375);

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

    if (this.y > 16) {
      moves.push("UP");
    }
    if (this.y < height - 16) {
      moves.push("DOWN");
    }
    if (this.x < width - 16) {
      moves.push("RIGHT");
    }
    if (this.x > 16) {
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

  moveRandomly() {
    const availableMoves = this.canMove(width, height);
    const nextMove = random(availableMoves);

    this.move(nextMove);
  }

  moveOn() {
    if (this.canMove().includes(this.state.direction)) {
      this.move(this.state.direction);
      this.state.timeRemaining = this.state.timeRemaining - 1;
    } else {
      this.state = { type: "explore" };
      this.moveRandomly();
    }
  }

  update(width, height, time) {
    if (time % 8 !== 0) {
      return;
    }

    if (this.state.type === "move-on") {
      if (this.state.timeRemaining > 0) {
        this.moveOn();
        return;
      } else {
        this.state = { type: "explore" };
      }
    }
    const shouldMoveOn = random();
    if (shouldMoveOn < friendConfig.chanceToMoveOn) {
      this.state = {
        type: "move-on",
        timeRemaining: 8,
        direction: random(["UP", "DOWN", "LEFT", "RIGHT"]),
      };
      return;
    }
    this.moveRandomly();
  }
}

class Historian {
  constructor(width, height, moveSize) {
    this.worldWidth = width;
    this.worldHeight = height;
    this.moveSize = moveSize;

    this.history = [];

    this.spotsExplored = 0;
  }

  record(mover) {
    this.history.push({
      x: mover.x,
      y: mover.y,
    });

    const asCoords = this.history.map((l) => `${l.x},${l.y}`);
    this.spotsExplored = new Set(asCoords).size;
  }

  draw() {
    const historyColor = color("#EF476F");
    historyColor.setAlpha(10);

    for (const h of this.history) {
      fill(historyColor);
      circle(h.x, h.y, 8);
    }

    fill("#393B35");
    text(`${this.spotsExplored} spots explored`, 5, 389);
  }
}

let friend;
let historian;
let time = 0;
let dimensions = {
  width: 400,
  height: 400,
};

function setup() {
  createCanvas(dimensions.width, dimensions.height);
  const moveSize = 8;

  const img = loadImage("./assets/icon.png");
  friend = new Friend(img);
  historian = new Historian(dimensions.width, dimensions.height, moveSize);
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
  historian.record(friend);
  friend.update(dimensions.width, dimensions.height, time);
  time += 1;
}

function draw() {
  update();

  background("#F8FFE5");
  signature();

  friend.draw(time);
  historian.draw();
}
