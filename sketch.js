let font;
let points1 = [];
let points2 = [];
let bounds1, bounds2;

let baseFontSize;
let popInProgress = 0;
let sparkles = [];

function preload() {
  font = loadFont(
    "https://fonts.gstatic.com/s/opensans/v34/mem8YaGs126MiZpBA-U1UpcaXcl0Aw.ttf"
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  baseFontSize = min(windowWidth, windowHeight) * 0.12;

  points1 = font.textToPoints("HAPPY BIRTHDAY", 0, 0, baseFontSize, {
    sampleFactor: 0.22,
  });
  points2 = font.textToPoints("CN F-BOIS", 0, 0, baseFontSize, {
    sampleFactor: 0.22,
  });

  bounds1 = font.textBounds("HAPPY BIRTHDAY", 0, 0, baseFontSize);
  bounds2 = font.textBounds("CN F-BOIS", 0, 0, baseFontSize);

  // Create sparkles
  for (let i = 0; i < 120; i++) {
    sparkles.push(new Sparkle());
  }
}

function draw() {
  background(20);

  // Update pop-in animation (0 → 1)
  popInProgress = min(1, popInProgress + 0.02);

  // Draw sparkles first
  for (let s of sparkles) {
    s.update();
    s.display();
  }

  let lineSpacing = baseFontSize * 1.2;

  drawAnimatedText(points1, bounds1, height / 2 - lineSpacing);
  drawAnimatedText(points2, bounds2, height / 2 + lineSpacing * 0.2);
}

function drawAnimatedText(pts, bounds, centerY) {
  let offsetX = (width - bounds.w) / 2 - bounds.x;
  let offsetY = centerY - bounds.h / 2 - bounds.y;

  for (let i = 0; i < pts.length; i++) {
    let p = pts[i];

    // Floating wobble
    let dx = sin(frameCount * 0.03 + i * 0.1) * 4;
    let dy = cos(frameCount * 0.04 + i * 0.15) * 4;

    // Rainbow gradient (based on index + time)
    let hue = (i * 2 + frameCount * 2) % 360;
    colorMode(HSB, 360, 100, 100);
    fill(hue, 90, 100);
    noStroke();
    colorMode(RGB);

    // Pop-in scale effect
    let size =
      6 * popInProgress * (0.5 + 0.5 * sin(frameCount * 0.05 + i * 0.05));

    rect(p.x + offsetX + dx, p.y + offsetY + dy, 5);
  }
}

// Sparkle class
class Sparkle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(2, 6);
    this.speedY = random(0.2, 1);
    this.alpha = random(200, 300);
    this.hue = random(360);
  }

  update() {
    this.y -= this.speedY;
    if (this.y < -10) {
      this.y = height + random(20);
      this.x = random(width);
    }
  }

  display() {
    colorMode(HSB, 360, 100, 100, 255);
    fill(this.hue, 360, 100, this.alpha);
    noStroke();
    circle(this.x, this.y, this.size);
    colorMode(RGB);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  baseFontSize = min(windowWidth, windowHeight) * 0.12;

  points1 = font.textToPoints("HAPPY BIRTHDAY", 0, 0, baseFontSize, {
    sampleFactor: 0.22,
  });
  points2 = font.textToPoints("CN F-BOIS", 0, 0, baseFontSize, {
    sampleFactor: 0.22,
  });

  bounds1 = font.textBounds("HAPPY BIRTHDAY", 0, 0, baseFontSize);
  bounds2 = font.textBounds("CN F-BOIS", 0, 0, baseFontSize);
}
