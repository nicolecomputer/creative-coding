let triangles = [];
let time = 0;

function getRandomInt(min, max) {
  return min + Math.floor(Math.random() * max);
}

function getRandomFloat(min, max) {
  return min + Math.random() * max;
}

function setup() {
  createCanvas(800, 400);

  for (let i = 0; i < 140; i++) {
    triangles.push(generateTriangle());
  }
}

function triangleCenteredAt(x, y, size, alpha) {
  let fillColor = color(151, 157, 172);
  fillColor.setAlpha(alpha);

  let strokeColor = color("#5F5B6B");
  strokeColor.setAlpha(alpha);

  fill(fillColor);
  stroke(strokeColor);
  strokeWeight(1);

  triangle(
    -0.866 * size + x,
    -0.5 * size + y,
    0.866 * size + x,
    -0.5 * size + y,
    0 * size + x,
    1 * size + y
  );
}

function generateTriangle() {
  return {
    location: {
      x: getRandomInt(1, 15) * 25,
      y: getRandomInt(1, 400),
    },
    speed: getRandomFloat(0.5, 2.1),
    size: 10,
  };
}

function draw() {
  background("#EDEBE9");

  for (const triangle of triangles) {
    let opacity = 100 * triangle.speed;

    if (
      triangle.location.y > 220 &&
      triangle.location.y < 340 &&
      triangle.location.x > 120
    ) {
      opacity = 200 - triangle.location.y;
    }

    triangleCenteredAt(
      triangle.location.x,
      triangle.location.y,
      triangle.size,
      opacity
    );
  }

  // Box

  fill("#FFE5D9");
  stroke("#F4ACB7");
  strokeWeight(2.5);
  rect(120, 270, 240, 50, 0);

  // Wave
  for (let x = 110; x < 380; x += 6) {
    fill("#FFCB1F");
    strokeWeight(0);
    circle(x, sin(x + time + 0.4) * 40 + 295, 6);

    fill("#F54E00");
    strokeWeight(0);
    circle(x, sin(x + time) * 40 + 295, 3);
  }

  // Text
  textSize(17);

  fill(127, 121, 121);
  text("Take me home she pleaded", 420, 50);
  text("against a grey blue sky", 450, 70);
  text('"To where their eyes are softer"', 480, 90);

  fill("#A25757");
  text("Let me break from this shape", 420, 150);
  text("and become the slow fall of", 450, 170);
  text("summer tears to winter flame", 480, 190);

  fill("#D36627");
  text("Skin to skin", 420, 250);
  text("Heart beat to slow", 450, 270);
  text("Where you will always be somone", 480, 290);

  fill("#F15E09");
  text("Home", 420, 350);

  update();
}

function update() {
  // Move each triangle
  for (const triangle of triangles) {
    triangle.location.y = triangle.location.y + triangle.speed;
  }

  // Push ones up that have gone too far
  for (const triangle of triangles) {
    if (triangle.location.y > 400) {
      triangle.location.y = -10;
    }
  }

  time += 0.01;
}
