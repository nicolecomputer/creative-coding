class Robot {
  constructor(x, mainColor) {
    this.x = x;
    this.startingX = x;
    this.time = 0;
    this.xRange = random(25, 70);
    this.jitter = randomGaussian(7, 0.3);

    this.lightColor = ["white", "white", "white"];
    this.mainColor = mainColor;

    this.update();
  }

  update() {
    this.time += 1;

    const x = map(
      sin(this.time / this.jitter),
      -1,
      1,
      -this.xRange,
      this.xRange
    );
    this.x = this.startingX + x;

    if (this.time % 10 == 0) {
      colorMode(RGB);
      const lightColor = ["#5AA9E6", "#FF6392", "#7FC8F8", "#FFE45E"];
      this.lightColor[0] = random(lightColor);
      this.lightColor[1] = random(lightColor);
      this.lightColor[2] = random(lightColor);
    }
  }

  draw() {
    let { x } = this;
    noStroke();

    // antenna
    colorMode(HSL);
    fill(this.mainColor);
    rect(x + 20, 190, 30, 10);

    // head
    fill(this.mainColor[0], this.mainColor[1], this.mainColor[2] + 30);
    rect(x, 200, 70, 55, 8);

    // eyes
    fill(334, 100, 50);
    circle(x + 20, 220, 20);
    circle(x + 50, 220, 20);

    // inner eyes
    fill("White");
    circle(x + 20, 220, 8);
    circle(x + 50, 220, 8);

    // mouth
    rect(x + 16, 238, 40, 10, 3);

    // neck
    fill(this.mainColor[0], this.mainColor[1], this.mainColor[2] + 20);
    rect(x + 16, 255, 40, 15);

    // body
    fill(this.mainColor);
    rect(x - 15, 265, 100, 80, 4);

    // light

    fill(color(this.lightColor[0]));
    circle(x, 280, 10);
    fill(color(this.lightColor[1]));
    circle(x + 15, 280, 10);
    fill(color(this.lightColor[2]));
    circle(x + 30, 280, 10);

    fill("white");
    // Feet
    fill(this.mainColor[0], this.mainColor[1], this.mainColor[2] - 30);
    rect(x - 5, 345, 30, 30);
    rect(x + 45, 345, 30, 30);
  }
}

class Spotlights {
  constructor(canvas) {
    this.balls = [];
    this.canvas = canvas;

    const colors = ["#06D6A0", "#1B9AAA", "#EF476F", "#FFC43D"];
    for (let i = 0; i < 25; i++) {
      let size = randomGaussian(60, 20);
      this.balls.push({
        position: createVector(
          random(size, canvas.width - size),
          random(size, canvas.height - size)
        ),
        speed: createVector(randomGaussian(2, 2), randomGaussian(2, 2)),
        size: size,
        color: colors[i % colors.length],
      });
    }
  }

  update() {
    for (const ball of this.balls) {
      ball.position.add(ball.speed);

      if (
        ball.position.x + ball.size / 2 > this.canvas.width ||
        ball.position.x - ball.size / 2 < 0
      ) {
        ball.speed.mult(createVector(-1, 1));
      }
      if (
        ball.position.y + ball.size / 2 > this.canvas.height ||
        ball.position.y - +ball.size / 2 < 0
      ) {
        ball.speed.mult(createVector(1, -1));
      }
    }
  }

  draw() {
    for (const ball of this.balls) {
      noStroke();
      const targetColor = color(ball.color);
      targetColor.setAlpha(140);
      fill(targetColor);
      circle(ball.position.x, ball.position.y, ball.size);
    }
  }
}

let robots;
let spotlights;

function setup() {
  let canvas = {
    width: 500,
    height: 400,
  };

  createCanvas(canvas.width, canvas.height);
  spotlights = new Spotlights(canvas);
  robots = [
    new Robot(20, [19, 97, 51]),
    new Robot(170, [265, 83, 57]),
    new Robot(280, [44, 100, 52]),
    new Robot(360, [334, 100, 50]),
  ];
}

function update() {
  spotlights.update();
  for (const robot of robots) {
    robot.update();
  }
}

function draw() {
  update();
  colorMode(RGB);
  background("#edede9");

  spotlights.draw();
  for (const robot of robots) {
    robot.draw();
  }

  fill("#264653");
  rect(0, 370, 500, 600);
}
