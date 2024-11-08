class Walker {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.x = 200;
    this.y = 200;
    this.color = color;

    this.history = [];
  }

  update(towards) {
    this.history.push({ x: this.x, y: this.y });
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

    const maxHistory = 100;
    var arrLength = this.history.length;
    if (arrLength > maxHistory) {
      this.history.splice(0, arrLength - maxHistory);
    }
  }

  draw() {
    const c = color(this.color);
    c.setAlpha(250);
    fill(c);
    strokeWeight(0);
    circle(this.x, this.y, 5.5);

    for (let i = 0; i < this.history.length; i++) {
      c.setAlpha(80 - (i / this.history.length) * i);
      fill(c);

      const h = this.history[this.history.length - i - 1];
      const { x, y } = h;
      circle(x, y, 5.5);
    }
  }
}

function signature() {
  fill("#F8FFE5");
  noStroke();
  rect(360, 360, 30);

  const textColor = color("red");
  textColor.setAlpha(120);
  strokeWeight(2);
  stroke(textColor);
  text("NW", 365, 380);
}

let walker;
function setup() {
  walker = new Walker(400, 400, "#06D6A0");
  createCanvas(400, 400);
  noCursor();
}

function update() {
  walker.update({ x: mouseX, y: mouseY });
}

function draw() {
  update();
  background("#F8FFE5");
  signature();

  const watermelon = color("#EF476F");

  noStroke();

  watermelon.setAlpha(10);
  fill(watermelon);
  circle(mouseX, mouseY, 300);

  watermelon.setAlpha(20);
  fill(watermelon);
  circle(mouseX, mouseY, 200);

  watermelon.setAlpha(60);
  fill(watermelon);
  circle(mouseX, mouseY, 150);

  watermelon.setAlpha(80);
  fill(watermelon);
  circle(mouseX, mouseY, 80);
  // update

  walker.draw();
}
