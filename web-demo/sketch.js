let face, palette, gui_head;
let renderer;

function setup() {
  renderer = createCanvas(windowWidth, windowHeight, SVG);
  face = new Face();
  palette = new Colors();
  createGUI();
}

// Resizes the canvas responsively
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  button.position(windowWidth / 2 - 100, windowHeight / 2 + 250);
}

function draw() {
  renderer.drawingContext.__clearCanvas();
  background(palette.backgroundColor);
  drawFace();
}

function drawFace() {
  strokeWeight(palette.strokeWeight);
  stroke(0);
  fill(palette.hairColor);
  for (i = face.bunSize; i > 0; i = i - face.hairstr) {
    ellipse(width / 2 - face.hsx - face.bunx,
      height / 2 - face.buny,
      i * i, i * i);
    ellipse(width / 2 + face.hsx + face.bunx,
      height / 2 - face.buny,
      i * i, i * i);
  }

  fill(palette.skinColor);
  bezier(width / 2 - face.hsx, height / 2 + face.hsy,
    width / 2 - face.hcp1x / 10, height / 2 - height / 7,
    width / 2 + face.hcp1x / 10, height / 2 - height / 7,
    width / 2 + face.hsx, height / 2 + face.hsy);

  bezier(width / 2 - face.hsx, height / 2 + face.hsy,
    width / 2 - face.hcp1x, height / 2 + face.hcp1y,
    width / 2 + face.hcp1x, height / 2 + face.hcp1y,
    width / 2 + face.hsx, height / 2 + face.hsy);


  fill(palette.cheeksColor);
  ellipse(width / 2 - face.hsx + face.chSpacing, height / 2 + face.chYpos, face.ch, face.ch);
  ellipse(width / 2 + face.hsx - face.chSpacing, height / 2 + face.chYpos, face.ch, face.ch);

  fill(255);
  ellipse(width / 2 - face.espac, height / 2 + face.eypos, face.ew, face.eh);
  ellipse(width / 2 + face.espac, height / 2 + face.eypos, face.ew, face.eh);

  fill(palette.eyeColor);
  ellipse(width / 2 - face.espac, height / 2 + face.eypos, face.p, face.p);
  ellipse(width / 2 + face.espac, height / 2 + face.eypos, face.p, face.p);

  makeHair();

  noFill();
  if (palette.strokeWeight <= 5) {
    strokeWeight(5);
  }
  stroke((palette.skinColor[0] - 45), (palette.skinColor[1] - 45), (palette.skinColor[2] - 45));
  bezier(width / 2 - face.mouthX, height / 2 + face.mouthY,
    width / 2 - face.mouthCx, height / 2 + face.mouthCy,
    width / 2 + face.mouthCx, height / 2 + face.mouthCy,
    width / 2 + face.mouthX, height / 2 + face.mouthY);

  bezier(width / 2 - face.noseX, height / 2 + face.noseY,
    width / 2 - face.noseCx, height / 2 + face.noseCy,
    width / 2 + face.noseCx, height / 2 + face.noseCy,
    width / 2 + face.noseX, height / 2 + face.noseY);

  stroke(0);
  strokeWeight(palette.strokeWeight);
  bezier(width / 2 - face.mouthX, height / 2 + face.mouthY,
    width / 2 - face.mouthCx, height / 2 + face.mouthCy,
    width / 2 + face.mouthCx, height / 2 + face.mouthCy,
    width / 2 + face.mouthX, height / 2 + face.mouthY);

  bezier(width / 2 - face.noseX, height / 2 + face.noseY,
    width / 2 - face.noseCx, height / 2 + face.noseCy,
    width / 2 + face.noseCx, height / 2 + face.noseCy,
    width / 2 + face.noseX, height / 2 + face.noseY);
}

function makeHair() {
  noFill();
  for (i = 0; i <= face.hairk; i = i + face.hairstr) {
    fill(palette.hairColor);
    if (i >= face.hairk - 1) {
      noFill();
    }
    bezier(width / 2 - face.hsx, height / 2 + i * face.hairl, width / 2 - face.hsx, height / 4 + i * i, width / 2, height / 2.5, width / 2, height / 2 - height / 8 + face.hairln);
    bezier(width / 2 + face.hsx, height / 2 + i * face.hairl, width / 2 + face.hsx, height / 4 + i * i, width / 2, height / 2.5, width / 2, height / 2 - height / 8 + face.hairln);
  }
}

function Face() {
  this.hsx = 150; // Bezier control point x1 
  this.hsy = 0; // Bezier control point y2 
  this.hcp1x = 120; // Bezier control point x2
  this.hcp1y = 250; // Bezier control point y2

  this.bunx = 0; // Buns x-position
  this.buny = 50; // Buns y-position
  this.bunSize = 10; // Bun height/width

  this.hairk = 15;
  this.hairstr = 1;
  this.hairl = 2;
  this.hairln = 14;

  this.espac = 50;
  this.eypos = 40;
  this.ew = 60;
  this.eh = 30;

  this.p = 30;

  this.chSpacing = 60;
  this.chYpos = 100;
  this.ch = 50;

  this.mouthX = 40;
  this.mouthY = 125;
  this.mouthCx = 250 / 4;
  this.mouthCy = 150;

  this.noseX = 20;
  this.noseY = 105;
  this.noseCx = 25;
  this.noseCy = 80;
}

function Colors() {
  this.backgroundColor = [190, 153, 153];
  this.hairColor = [41, 47, 58];
  this.skinColor = [217, 191, 143];
  this.eyeColor = [10, 20, 20];
  this.cheeksColor = [245, 42, 105];
  this.strokeWeight = 0;
}

function createGUI() {
  let gui = new dat.GUI();


  let colorsMenu = gui.addFolder('Colors');
  colorsMenu.addColor(palette, 'backgroundColor').name("Background");
  colorsMenu.addColor(palette, 'skinColor').name("Skin Color");
  colorsMenu.addColor(palette, 'hairColor').name("Hair Color");
  colorsMenu.addColor(palette, 'eyeColor').name("Eye Color");
  colorsMenu.addColor(palette, 'cheeksColor').name("Cheeks Color");
  colorsMenu.add(palette, 'strokeWeight', 0, 10).step(1);

  let faceMenu = gui.addFolder('Face Shape');
  faceMenu.add(face, 'hsx', 0, 500).name("Forehead Width");
  faceMenu.add(face, 'hcp1x', 0, 500).name("Chin Width");
  faceMenu.add(face, 'hcp1y', -500, 500).name("Chin Height");

  let bunsMenu = gui.addFolder('Hair Buns');
  bunsMenu.add(face, 'bunx', -500, 500).name("Bun Spacing");
  bunsMenu.add(face, 'buny', -500, 500).name("Bun Y-Position");
  bunsMenu.add(face, 'bunSize', 0, 20).name("Bun Size");

  let hairMenu = gui.addFolder('Hair');
  hairMenu.add(face, 'hairk', 0, 25).name("Hair Fullness");
  hairMenu.add(face, 'hairstr', 0.1, 5).name("Strand Thickness");
  hairMenu.add(face, 'hairl', -500, 500).name("Hair Length");
  hairMenu.add(face, 'hairln', -500, 500).name("Hairline");

  let eyesMenu = gui.addFolder('Eyes');
  eyesMenu.add(face, 'espac', -500, 500).name("Eye Spacing");
  eyesMenu.add(face, 'eypos', -500, 500).name("Eyes Y-Position");
  eyesMenu.add(face, 'ew', 0, 100).name("Eye Width");
  eyesMenu.add(face, 'eh', 0, 100).name("Eye Height");
  eyesMenu.add(face, 'p', 0, 100).name("Pupils Size");

  let mouthMenu = gui.addFolder('Mouth');
  mouthMenu.add(face, 'mouthX', -500, 500).name("Mouth Width");
  mouthMenu.add(face, 'mouthY', -500, 500).name("Mouth Y-Position");
  mouthMenu.add(face, 'mouthCx', -500, 500).name("Cheekiness");
  mouthMenu.add(face, 'mouthCy', -500, 500).name("Smile Intensity");

  let noseMenu = gui.addFolder('Nose');
  noseMenu.add(face, 'noseX', 0, 250).name("Nose Base Width");
  noseMenu.add(face, 'noseY', -250, 250).name("Nose Y-Position");
  noseMenu.add(face, 'noseCx', 0, 250).name("Nose Width");
  noseMenu.add(face, 'noseCy', -250, 250).name("Nose Length");

  let cheeksMenu = gui.addFolder('Cheeks');
  cheeksMenu.add(face, 'chSpacing', 0, 500).name("Cheeks Spacing");
  cheeksMenu.add(face, 'chYpos', -500, 500).name("Cheeks Y-Position");
  cheeksMenu.add(face, 'ch', 0, 500).name("Cheeks Size");
}

function keyPressed() {
  if (key === 's') {
    save("mySVG.svg");
    print("saved svg");
  }
}