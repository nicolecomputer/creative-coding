function splatter(color, centeredAt, depth = 150) {
  let splatters = [];
  for (let i = 0; i < depth; i++) {
    const distribution = 80;
    const position = {
      x: randomGaussian(centeredAt.x, distribution),
      y: randomGaussian(centeredAt.y, distribution),
    };

    const distanceFromCenter = Math.sqrt(
      Math.pow(centeredAt.x - position.x, 2) +
        Math.pow(centeredAt.y - position.y, 2)
    );

    splatters.push({
      position: position,
      size: Math.max(80 - distanceFromCenter, 3),
      color: color,
    });
  }
  return splatters;
}

function generateSplatters() {
  return [
    ...splatter(
      "#1B9AAA",
      {
        x: randomGaussian(60, 100),
        y: randomGaussian(223, 80),
      },
      800
    ),
    ...splatter("#EF476F", {
      x: randomGaussian(200, 40),
      y: randomGaussian(200, 19),
    }),
    ...splatter("#06D6A0", {
      x: randomGaussian(30, 90),
      y: randomGaussian(20, 20),
    }),
    ...splatter(
      "#FFC43D",
      {
        x: randomGaussian(300, 100),
        y: randomGaussian(223, 80),
      },
      300
    ),
  ];
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

let droppedSplatters = [];

function setup() {
  createCanvas(400, 400);
  droppedSplatters = generateSplatters();

  let button = createButton("splatter again");
  button.mousePressed(resetSketch);
}

function drawSplatter(splatter) {
  const { x, y } = splatter.position;
  strokeWeight(0);
  fill(splatter.color);
  circle(x, y, splatter.size);
}

function draw() {
  background("#F8FFE5");
  signature();

  droppedSplatters.forEach(drawSplatter);
}

function resetSketch() {
  droppedSplatters = generateSplatters();
}
