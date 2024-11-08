class Walker {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.x = floor(random(width - 10));
    this.y = floor(random(height - 10));
    this.active = true;
    this.numSteps = 0;
    this.color = color;
  }

  update() {
    if (!this.active) {
      return;
    }

    // move
    let choice = floor(random(4));

    if (choice === 0) {
      this.x += 6;
    } else if (choice === 1) {
      this.x -= 6;
    } else if (choice === 2) {
      this.y += 6;
    } else {
      this.y -= 6;
    }

    // Stay in bounds
    if (this.x > this.width) {
      this.x = width;
    }
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.y > this.height) {
      this.height = height;
    }
    if (this.y < 0) {
      this.y = 0;
    }

    this.numSteps += 1;

    // if (this.numSteps > 1800) {
    //   this.active = false;
    // }
  }

  draw() {
    const c = color(this.color);
    c.setAlpha(80);
    fill(c);
    strokeWeight(0);
    circle(this.x, this.y, 5.5);
  }
}

let walkers = [];

function setup() {
  createCanvas(400, 400);
  resetSketch();

  let button = createButton("reset sketch");
  button.mousePressed(resetSketch);
}

function draw() {
  for (const walker of walkers) {
    walker.update();
    walker.draw();
  }
}

function resetSketch() {
  background("#F8FFE5");

  walkers = [
    new Walker(400, 400, "#06D6A0"),
    new Walker(400, 400, "#EF476F"),
    new Walker(400, 400, "#1B9AAA"),
    new Walker(400, 400, "#FFC43D"),
  ];
}
