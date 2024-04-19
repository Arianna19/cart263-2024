/**
Final Project: Ask me to Draw an Animal! I'll Listen and Draw
Arianna Narita

Overall Idea: 
1. Talk (say an animal in the list)
2. Computer draws what you said 
3. Have fun talking to it by seeing what animals it can draw
4. Make fun of the doodle library of ml5 in how sometimes the animals dont look right
5. Personalize the weird looking animal by choosing its colours and the width of the paint brush 



// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
SketchRNN
=== */
"use strict";
//let bgImage;

//The speech synthesizer
const speechSynthesizer = new p5.Speech();

//To recongnize the voice coming through!
const speechRecognizer = new p5.SpeechRec();

// The SketchRNN model
let model;
// Start by drawing
let previous_pen = 'down';
// Current location of drawing
let x, y;
// The current "stroke" of the drawing
let strokePath;

let animal = [];
let animalz = []
let select = 0;
let sizeStroke = 15
let loadingImages = true;

// For when SketchRNN is fixed
function preload() {
  // See a list of all supported models: https://github.com/ml5js/ml5-library/blob/master/src/SketchRNN/models.js
  // list of animals ml5 recongnizes (28 animals)
  animal[0] = (ml5.sketchRNN('cat'));
  animal[1] = (ml5.sketchRNN('lobster'));
  animal[2] = (ml5.sketchRNN('bird'));
  animal[3] = (ml5.sketchRNN('bear'));
  animal[4] = (ml5.sketchRNN('scorpion'));
  animal[5] = (ml5.sketchRNN('butterfly'));
  animal[6] = (ml5.sketchRNN('crab'));
  animal[7] = (ml5.sketchRNN('spider')); //new
  animal[8] = (ml5.sketchRNN('hedgehog')); //new
  animal[9] = (ml5.sketchRNN('kangaroo')); //new
  animal[10] = (ml5.sketchRNN('lion')); //new
  animal[11] = (ml5.sketchRNN('snail')); //new 
  animal[12] = (ml5.sketchRNN('tiger')); //new
  animal[13] = (ml5.sketchRNN('swan')); //new
  animal[14] = (ml5.sketchRNN('whale')); //new
  animal[15] = (ml5.sketchRNN('duck')); //new
  animal[16] = (ml5.sketchRNN('rabbit')); //new
  animal[17] = (ml5.sketchRNN('dolphin'));
  animal[18] = (ml5.sketchRNN('frog'));
  animal[19] = (ml5.sketchRNN('monkey'));
  animal[20] = (ml5.sketchRNN('mermaid'));
  animal[21] = (ml5.sketchRNN('mosquito'));
  animal[22] = (ml5.sketchRNN('dog'));
  animal[23] = (ml5.sketchRNN('flamingo'));
  animal[24] = (ml5.sketchRNN('penguin'));
  animal[25] = (ml5.sketchRNN('parrot'));
  animal[26] = (ml5.sketchRNN('squirrel'));
  animal[27] = (ml5.sketchRNN('pig', modelReady));


  //following is the just an array for the list grid at the top of the screen 
  animalz[0] = 'Cat';
  animalz[1] = 'Lobster';
  animalz[2] = 'Bird';
  animalz[3] = 'Bear';
  animalz[4] = 'Scorpion';
  animalz[5] = 'Butterfly';
  animalz[6] = 'Crab';
  animalz[7] = 'Spider';
  animalz[8] = 'Hedgehog';
  animalz[9] = 'Kangaroo';
  animalz[10] = 'Lion';
  animalz[11] = 'Snail';
  animalz[12] = 'Tiger';
  animalz[13] = 'Swan';
  animalz[14] = 'Whale';
  animalz[15] = 'Duck';
  animalz[16] = 'Rabbit';
  animalz[17] = 'Dolphin';
  animalz[18] = 'Frog';
  animalz[19] = 'Monkey';
  animalz[20] = 'Mermaid';
  animalz[21] = 'Mosquito';
  animalz[22] = 'Dog';
  animalz[23] = 'Flamingo';
  animalz[24] = 'Penguin';
  animalz[25] = 'Parrot';
  animalz[26] = 'Squirrel';
  animalz[27] = 'Pig';

  speechRecognizer.continuous = true; //listens all the time
  speechRecognizer.onResult = handleVoiceInput; //call this function
  speechRecognizer.start();

}
let body = new Body();

//function that handles the voice being inputed by user and prints it out and reads it in console
function handleVoiceInput() {
  let guessedanimal;
  if (speechRecognizer.resultValue) {
    let parts = speechRecognizer.resultString.toLowerCase().split(`draw a`);
    if (parts.length > 1) {
      guessedanimal = parts[1].trim();
      console.log(speechRecognizer.resultString);
    }
  }
  //lower case

  for (var x = 0; x < animal.length; x++) {
    if (!loadingImages);
    if (animal[x].model.info.name == guessedanimal) {
      select = x;
      startDrawing();
    }
  }
}

function setup() {
  createCanvas(Body.canvasW, Body.canvasH);
  push();
  fill("#c7b7b7"); //colour of the main background canvas where computer draws 
  rect(0, 175, Body.canvasW - 150, Body.canvasH - 175);
  pop();
}

function modelReady() {
  console.log('model loaded');
  startDrawing();
  loadingImages = false;
}

// Reset the drawing
function startDrawing() {
  console.log("I have been called")
  //text to show user what the computer is generating 

  //background
  push()
  fill("#c7b7b7"); //recalling and creating the background when new animal is asked
  rect(0, 175, Body.canvasW - 150, Body.canvasH - 175); //kind of easy way of erasing the canvas before
  pop()


  //Start in the middle
  x = width / 2;
  y = height / 2;
  animal[select].reset();
  //Generate the first stroke path
  animal[select].generate(gotStroke);
}

function draw() {
  restart(); //calling restart function
  body.draw();
  if (!loadingImages) {
    push();
    textSize(35);
    fill(164, 39, 186);
    textFont('Georgia');
    text('Drawing a ' + animal[select].model.info.name, 25, 250); //text in the corner telling user what ml5 is trying to draw
    pop();
  }

  // If something new to draw
  if (strokePath) {

    // If the pen is down, draw a line
    if (previous_pen == 'down') {
      push();
      stroke(ColorNsize.color); //where the stroke changes colour 
      strokeWeight(sizeStroke);
      line(x, y, x + strokePath.dx, y + strokePath.dy);
      pop();
    }

    // Move the pen
    x += strokePath.dx;
    y += strokePath.dy;
    // The pen state actually refers to the next stroke
    previous_pen = strokePath.pen;

    // If the drawing is complete
    if (strokePath.pen !== 'end') {
      strokePath = null;
      animal[select].generate(gotStroke);
    }
  }

  if (loadingImages) {
    push();
    fill(252, 186, 3);
    textSize(25);
    textFont('Lucida Handwriting');
    text('Your animal farm is loading please wait...', 320 - 260, 240);
    pop();
  }

}

// A new stroke path
function gotStroke(err, s) { //format ml5 uses to return a result
  strokePath = s;
}

//funtion for the redraw button
function restart() {
  if (mouseIsPressed) {
    //console.log("lol")
    if (mouseX > 0 && mouseX < Body.canvasW - 150 && mouseY < Body.canvasH && mouseY > Body.canvasH - 70) {
      startDrawing();
    }
  }
  push()
  rect(0, Body.canvasH - 70, Body.canvasW - 150, 70)
  stroke(0);
  strokeWeight(1);
  textSize(20);
  textAlign(CENTER);
  text("REDRAW", (Body.canvasW - 150) / 2, Body.canvasH - 25);
  pop()
}
