let balls = [];
let canvas = {
  width: 500,
  height: 400,
};

function setup() {
  createCanvas(canvas.width, canvas.height);

  const colors = ["#06D6A0", "#1B9AAA", "#EF476F", "#FFC43D"];
  for (let i = 0; i < 25; i++) {
    let size = randomGaussian(60, 20);
    balls.push({
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

function update() {
  for (const ball of balls) {
    ball.position.add(ball.speed);

    if (
      ball.position.x + ball.size / 2 > canvas.width ||
      ball.position.x - ball.size / 2 < 0
    ) {
      ball.speed.mult(createVector(-1, 1));
    }
    if (
      ball.position.y + ball.size / 2 > canvas.height ||
      ball.position.y - +ball.size / 2 < 0
    ) {
      ball.speed.mult(createVector(1, -1));
    }
  }
}

function draw() {
  update();

  background("#F8FFE5");

  for (const ball of balls) {
    noStroke();
    const targetColor = color(ball.color);
    targetColor.setAlpha(140);
    fill(targetColor);
    circle(ball.position.x, ball.position.y, ball.size);
  }
}
