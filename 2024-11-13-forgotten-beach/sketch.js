let circles = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 30; i++) {
    circles.push({
      jitter: floor(random(1, 400)),
      y: 250,
      color: "#1B9AAA",
    });
  }

  for (let i = 0; i < 50; i++) {
    circles.push({
      jitter: floor(random(1, 200)),
      y: 150,
      color: "#EF476F",
    });
  }

  for (let i = 0; i < 50; i++) {
    circles.push({
      jitter: floor(random(100, 900)),
      y: 100,
      color: "#EF476F",
    });
  }

  for (let i = 0; i < 50; i++) {
    circles.push({
      jitter: floor(random(100, 900)),
      y: 80,
      color: "#EF476F",
      maxSize: 120,
    });
  }

  for (let i = 0; i < 50; i++) {
    circles.push({
      jitter: floor(random(1200, 1400)),
      y: 20,
      color: "#EF476F",
      maxSize: 200,
    });
  }

  for (let i = 0; i < 90; i++) {
    circles.push({
      jitter: floor(random(1, 400)),
      y: 200,
      color: "#FFC43D",
    });
  }
  for (let i = 0; i < 90; i++) {
    circles.push({
      jitter: floor(random(1, 400)),
      y: 290,
      color: "#1B9AAA",
      maxSize: 20,
    });
  }
  for (let i = 0; i < 90; i++) {
    circles.push({
      jitter: floor(random(1, 400)),
      y: 300,
      color: "#1B9AAA",
      maxSize: 50,
    });
  }
  for (let i = 0; i < 90; i++) {
    circles.push({
      jitter: floor(random(1, 400)),
      y: 350,
      color: "#1B9AAA",
      maxSize: randomGaussian(80, 10),
    });
  }
}

let globalTime = 0;

function draw() {
  background("#F8FFE5");

  for (const c of circles) {
    const time = globalTime + c.jitter;

    let offset = map(sin(time / 40), -1, 1, 0, 400);
    let offsetY = c.y;
    let size = map(
      sin(time / 24),
      0,
      1,
      c.maxSize || 60,
      noise((globalTime * 0.1 * c.jitter) / 80) * 40
    );
    strokeWeight(size);

    const blobColor = color(c.color);
    blobColor.setAlpha(map(size, 60, 80, 40, 20));
    stroke(blobColor);
    point(offset, offsetY);
  }

  globalTime += 0.2;
}
