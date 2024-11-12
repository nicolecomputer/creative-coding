const title = "A little memory";

class Friend {
  constructor(icon, x, y) {
    this.x = x;
    this.y = y;
    this.icon = icon;
    this.memory = [];
    this.moveSpeed = 8;
  }

  move(direction) {
    const next = this.locationOfMove(direction);
    this.x = next.x;
    this.y = next.y;
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

  locationOfMove(direction) {
    if (direction === "UP") {
      return {
        x: this.x,
        y: this.y - this.moveSpeed,
      };
    } else if (direction === "DOWN") {
      return {
        x: this.x,
        y: this.y + this.moveSpeed,
      };
    } else if (direction === "RIGHT") {
      return {
        x: this.x + this.moveSpeed,
        y: this.y,
      };
    } else if (direction === "LEFT") {
      return {
        x: this.x - this.moveSpeed,
        y: this.y,
      };
    } else if (direction === "UP-RIGHT") {
      return {
        x: this.x - this.moveSpeed,
        y: this.y + this.moveSpeed,
      };
    } else if (direction === "UP-LEFT") {
      return {
        x: this.x - this.moveSpeed,
        y: this.y - this.moveSpeed,
      };
    } else if (direction === "DOWN-RIGHT") {
      return {
        x: this.x + this.moveSpeed,
        y: this.y + this.moveSpeed,
      };
    } else if (direction === "DOWN-LEFT") {
      return {
        x: this.x - this.moveSpeed,
        y: this.y + this.moveSpeed,
      };
    }
  }

  canMove(width, height, history) {
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

    // Check if any of the proposed moved are in the visited places
    moves = moves.filter((move) => {
      const location = this.locationOfMove(move);
      const proposedLocation = `${location.x},${location.y}`;

      const shouldInclude = !history
        .map((m) => `${m.x},${m.y}`)
        .includes(proposedLocation);

      return shouldInclude;
    });

    return moves;
  }

  update(width, height, time) {
    if (time % 6 !== 0) {
      return;
    }

    if (this.memory.length > 2) {
      this.memory = this.memory.slice(1);
    }

    this.memory.push({ x: this.x, y: this.y });

    let availableMoves = this.canMove(width, height, this.memory);
    if (availableMoves.length === 0) {
      availableMoves = this.canMove(width, height, []);
    }

    const nextMove = random(availableMoves);
    this.move(nextMove);
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
      noStroke();
      fill(historyColor);
      circle(h.x, h.y, 8);
    }

    noStroke();
    textSize(14);
    fill("#393B35");
    text(`${this.spotsExplored} spots explored`, 5, this.worldHeight - 10);
  }
}

let explorer;
let historian;

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

const startingLocation = {
  x: dimensions.width / 2,
  y: dimensions.height / 2,
};

function setup() {
  gummy = loadImage("gummy.png");
  friend = loadImage("Friend.png");
  play = loadImage("play.png");
  pause = loadImage("pause.png");
  restart = loadImage("restart.png");
  friendIcon = loadImage("./assets/icon.png");

  createCanvas(dimensions.width, dimensions.height);
  explorer = new Friend(friendIcon, startingLocation.x, startingLocation.y);
  historian = new Historian(dimensions.width, dimensions.height, 8);
}

function update() {
  if (!active) {
    return;
  }

  if (time > 400) {
    return;
  }

  historian.record(explorer);
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

  explorer = new Friend(friendIcon, startingLocation.x, startingLocation.y);

  historian = new Historian(dimensions.width, dimensions.height, 8);
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

  historian.draw();
  explorer.draw(time);

  drawUI(active);
}
