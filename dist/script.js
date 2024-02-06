//genuary2024 - grow a seed;
//leveraged some of my circle packing from my -mossy dismalites for this one.
//press space to randomize
let n = 10; //ncircles
let nf = 0.1;
let nf2 = 4000;
let d;
let nArray = [];
let cArray = [];
let t = 0;
let cnt;
let cBool = true;
function setup() {
  rectMode(CENTER);
  nf = randomGaussian(0.0001, 15);
  nf2 = random(10, 100);
  console.log(nf,nf2)
  rs = random(30,100)
  gs = random(30,100)
  bs = random(30,100)
  cBool = true;
  cArray = [];
  nArray = [];
  t = 0;
  cnt = 0;
  cBool = true;
  frameCount = 0;
  nRot = int(random(6,10))
  cnt = 0;
  c = min(windowWidth, windowHeight) * 0.8;
  cnv = createCanvas(c, c);
  cArray[0] = []; //x
  cArray[1] = []; //y
  cArray[2] = []; //d
  background(255);
  d = c * 0.8;
  i = 0;
  while (cnt <= n) {
    addCircle(i);
    i++;
  }
}
function draw() {
  translate(width / 2, height / 2);
  push();
  strokeWeight(1 +0.8*cos(t/5));
  if (frameCount < 200) {
    for (let i = 0; i <= n; i++) {
      for (let j = 0; j < 2; j++) {
        nArray[i].move();
      }
    }
  }
  pop();
  border();
}

function addCircle(s) {
  x = random(-d / 3, d / 3); //random x and y
  y = random(-d / 2, d / 2);
  c = 0;
  a = dist(x, y, 0, 0); //distance to center
  b = 10000000;
  if (a <= d / 2) {
    b = (d / 2 - a) * 2; //diameter to touch outer circle
    if (cnt === 0) {
      cBool = true; //first circle
    } else {
      for (let i = 0; i < cnt; i++) {
        cR = cArray[2][i] / 2; //tmp radius
        k = dist(cArray[0][i], cArray[1][i], x, y);
        c = 2 * (k - cArray[2][i] / 2);
        b = min(b, c);
        if (k - cR < 0) {
          cBool = false;
        }
      }
    }
  } else if (a > d / 2) {
    cBool = false;
  }
  if (cBool) {
    cArray[0][cnt] = x;
    cArray[1][cnt] = y;
    cArray[2][cnt] = b;
    nArray.push(new noiseCircle(b / 2, x, y));
    cnt++;
  }
  cBool = true;
}

class noiseCircle {
  constructor(r, x, y) {
    this.x = x;
    this.y = y;
    this.p = [];
    this.r = r;
    this.n = 0;
    this.t = 0;
    this.np = int(r * 2);
    for (let i = 0; i < this.np; i++) {
      let theta = random(0, TWO_PI);
      this.p[i] = createVector(this.r * sin(theta), this.r * cos(theta));
    }
  }
  move() {
    // strokeWeight(this.r / 300);
    push();

    this.t++;
    for (let i = 0; i < this.np; i++) {
      this.n = noise(nf * this.p[i].x, nf * this.p[i].y) * nf2;
      this.p[i].add(
        cos(this.n) * sin(this.n / 3),
        sin(this.n) * cos(this.n / 3)
      );
      let distF = dist(0, 0, this.x, this.y);
      stroke(
        150 + 55 * sin(this.t / rs - distF/TAU),
        150 + 55 * sin(this.t / gs - distF/TAU),
        200 + 55 * sin(this.t / bs - distF/TAU),
        10
      );
      for (let k = 0; k < nRot; k++) {
        push();
        rotate((TAU / nRot) * k);
        translate(this.x, this.y);
        point(this.p[i].x, this.p[i].y);
        pop();
      }
    }
    pop();
  }
}

function keyPressed() {
  if (keyCode === 32) {
    cArray = [];
    nArray = [];
    t = 0;
    cnt = 0;
    cBool = true;
    frameCount = 0;
    setup();
    loop();
    draw();
  }
}

function border() {
  push();
  noFill();
  stroke(150, 150, 200);
  strokeWeight(4);
  rect(0, 0, width - 20, height - 20);
  pop();
}

function mousePressed() {
  cArray = [];
    nArray = [];
    t = 0;
    cnt = 0;
    cBool = true;
    frameCount = 0;
    setup();
    loop();
    draw();
}