let lights = [];
let sleep = 0;

function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < 22; i++) {
    lights.push({
      position: createVector(random(0, 400), random(0, 220)),
      offset: createVector(random(-0.3, -0.6), random(0, 0.8)),
      life: random(0, 200),
      size: randomGaussian(70, 14),
      color: random([
        "#FFF4D9",
        "#FFF4D9",
        "#FFF4D9",
        "#FFF4D9",
        "#FFF4D9",
        "#FFF4D9",
        "#FFF4D9",
        "#FFF4D9",
        "#FFF4D9",
        "#FFF4D9",
        "#FFF4D9",
        "#FF0000",
        "#FF0000",
        "#FF0000",
        "#7CFFAE",
      ]),
    });
  }
}

function update() {
  for (const light of lights) {
    light.life -= randomGaussian(0.4, 0.4);
    light.position = light.position.add(
      createVector(randomGaussian(light.offset.x, 0.2), light.offset.y)
    );

    if (light.position.x < 0) {
      light.position.x = 400;
    }
    if (light.position.y > height) {
      light.position.y = random(0, 80);
    }
  }

  sleep += 0.02;
}

function signature() {
  const fillColor = color("#EEF2E4");
  fillColor.setAlpha(80);
  fill(fillColor);

  const textColor = color("red");
  textColor.setAlpha(80);
  strokeWeight(2);
  stroke(textColor);
  text("NW", 370, 390);
}

function draw() {
  update();

  background("black");

  for (const light of lights) {
    const c = color(light.color);
    c.setAlpha(map(cos(light.life / 20), 0, 1, 40, 220));

    fill(c);
    noStroke();
    circle(light.position.x, light.position.y, light.size);
  }

  stroke("white");
  strokeWeight(2);

  fill("rgba(0,0,0,0.7)");
  rect(20, 280, 360, 80);

  fill("white");
  noStroke();
  textSize(14);

  textStyle("bold");
  text("oh my love,", 150, 310);

  textStyle("normal");
  text("heartbroken and sleepy it won't be long", 60, 330);

  const sleepColor = color("white");
  sleepColor.setAlpha(map(sin(sleep), -1, 1, 40, 240));
  fill(sleepColor);
  text("go back to sleep.", 140, 350);

  signature();
}
