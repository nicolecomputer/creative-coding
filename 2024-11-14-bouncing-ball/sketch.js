let balls = [];
let canvas = {
  width: 500,
  height: 400,
};

function setup() {
  createCanvas(canvas.width, canvas.height);

  const colors = ["#06D6A0", "#1B9AAA", "#EF476F", "#FFC43D"];
  for (let i = 0; i < 12; i++) {
    let size = randomGaussian(60, 20);
    balls.push({
      x: random(size, canvas.width - size),
      y: random(size, canvas.height - size),
      speedX: randomGaussian(2, 2),
      speedY: randomGaussian(2, 2),
      size: size,
      color: colors[i % colors.length],
    });
  }
}

function update() {
  for (const ball of balls) {
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    if (ball.x + ball.size / 2 > canvas.width) {
      ball.speedX = ball.speedX * -1;
    }
    if (ball.y + ball.size / 2 > canvas.height) {
      ball.speedY = ball.speedY * -1;
    }
    if (ball.x - ball.size / 2 < 0) {
      ball.speedX = ball.speedX * -1;
    }
    if (ball.y - +ball.size / 2 < 0) {
      ball.speedY = ball.speedY * -1;
    }
  }
}

function draw() {
  update();

  background("#F8FFE5");

  for (const ball of balls) {
    noStroke();
    fill(ball.color);
    circle(ball.x, ball.y, ball.size);
  }
}
