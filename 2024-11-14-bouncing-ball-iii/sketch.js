let balls = [];
let canvas = {
  width: 500,
  height: 400,
  depth: 600,
};

function setup() {
  createCanvas(canvas.width, canvas.height);

  const colors = ["#06D6A0", "#1B9AAA", "#EF476F", "#FFC43D"];
  for (let i = 0; i < 4; i++) {
    let size = 120;
    balls.push({
      position: createVector(
        random(size, canvas.width - size),
        random(size, canvas.height - size),
        random(size, canvas.depth - size)
      ),
      speed: createVector(
        randomGaussian(2, 2),
        randomGaussian(2, 2),
        randomGaussian(2, 2)
      ),
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
      ball.speed.mult(createVector(-1, 1, 1));
    }
    if (
      ball.position.y + ball.size / 2 > canvas.height ||
      ball.position.y - +ball.size / 2 < 0
    ) {
      ball.speed.mult(createVector(1, -1, 1));
    }
    if (
      ball.position.z + ball.size / 2 > canvas.depth ||
      ball.position.z - +ball.size / 2 < 0
    ) {
      ball.speed.mult(createVector(1, 1, -1));
    }
  }
}

function draw() {
  update();

  background("#F8FFE5");

  const sortedBalls = balls.sort((a, b) => a.position.z - b.position.z);
  for (const ball of sortedBalls) {
    noStroke();
    const targetColor = color(ball.color);

    let colorScale = map(ball.position.z, 0, canvas.depth, 1, 0.4);
    targetColor.setRed(red(targetColor) * colorScale);
    targetColor.setGreen(green(targetColor) * colorScale);
    targetColor.setBlue(blue(targetColor) * colorScale);

    const scaleFactor = map(ball.position.z, 0, canvas.depth, 1, 0.1);
    fill(targetColor);
    circle(ball.position.x, ball.position.y, ball.size * scaleFactor);
  }
}
