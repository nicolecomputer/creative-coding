class Explosion {
  constructor(position, maxSize, color) {
    this.position = position;
    this.color = color;

    this.slices = [];

    for (let i = 0; i < 300; i++) {
      let v = p5.Vector.random2D();
      v.mult(random(0, 2000));
      this.slices.push(v);
    }
  }

  update() {}

  draw() {
    for (let time = 0; time < this.slices.length; time++) {
      const v = this.slices[time];

      let [h, s, b] = this.color;

      colorMode(HSB);
      const c = color(h, s, ((b + time) % 50) + 50);
      c.setAlpha(0.3);

      stroke(c);
      strokeWeight(randomGaussian(3, 0.4));
      strokeCap(ROUND);

      line(this.position.x, this.position.y, v.x, v.y);
    }
  }
}

let one;
let two;
let three;
function setup() {
  createCanvas(400, 400);
  one = new Explosion(createVector(200, 200), 2, [346, 70, 94]);
  two = new Explosion(createVector(0, 300), 2, [346, 70, 94]);
  three = new Explosion(createVector(300, 20), 2, [346, 70, 94]);
}

function draw() {
  background("#F8FFE5");
  one.draw();
  two.draw();
  three.draw();

  fill("White");
  stroke("#302D2E");
  strokeWeight(2);
  rect(120, 300, 240, 40);

  fill("black");
  noStroke();
  text(
    "I still think about the day we pretended it was raining",
    130,
    305,
    230
  );

  fill("White");
  stroke("#302D2E");
  strokeWeight(2);
  rect(140, 350, 240, 30);

  fill("black");
  noStroke();
  text("I wonder if we'll ever see each other again", 150, 370);
}
