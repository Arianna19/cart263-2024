/**
Final Project PROTOTYPE: //From Ai Jam// Ask me to Draw an Animal! I'll Listen and Draw
Arianna Narita

Overall Idea: 
1. Talk (say an animal in the list)
2. Computer draws what you said 
3. Have fun talking to it by seeing what animals it can draw]
4. Make fun of the doodle library of ml5 in how sometimes the animals dont look right

"use strict";

// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
SketchRNN
=== */

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
let select = "cat";

let loadingImages = true;

// For when SketchRNN is fixed
function preload() {
  // See a list of all supported models: https://github.com/ml5js/ml5-library/blob/master/src/SketchRNN/models.js
  // list of animals ml5 recongnizes (28 animals)
  animal["cat"] = (ml5.sketchRNN('cat'));
  animal["lobster"] = (ml5.sketchRNN('lobster'));
  animal["bird"] = (ml5.sketchRNN('bird'));
  animal["bear"] = (ml5.sketchRNN('bear'));
  animal["catpig"] = (ml5.sketchRNN('catpig'));
  animal["dogbunny"] = (ml5.sketchRNN('dogbunny'));
  animal["crab"] = (ml5.sketchRNN('crab')); 
  animal["spider"] = (ml5.sketchRNN('spider')); //new
  animal["hedgehog"] = (ml5.sketchRNN('hedgehog')); //new
  animal["kangaroo"] = (ml5.sketchRNN('kangaroo')); //new
  animal["lion"] = (ml5.sketchRNN('lion')); //new
  animal["lionsheep"] = (ml5.sketchRNN('lionsheep')); //new 
  animal["tiger"] = (ml5.sketchRNN('tiger')); //new
  animal["swan"] = (ml5.sketchRNN('swan')); //new
  animal["whale"] = (ml5.sketchRNN('whale')); //new
  animal["duck"] = (ml5.sketchRNN('duck')); //new
  animal["rabbit"] = (ml5.sketchRNN('rabbit')); //new
  animal["dolphin"] = (ml5.sketchRNN('dolphin'));
  animal["frog"] = (ml5.sketchRNN('frog'));
  animal["monkey"] = (ml5.sketchRNN('monkey'));
  animal["mermaid"] = (ml5.sketchRNN('mermaid'));
  animal["mosquito"] = (ml5.sketchRNN('mosquito'));
  animal["dog"] = (ml5.sketchRNN('dog'));
  animal["flamingo"] = (ml5.sketchRNN('flamingo'));
  animal["penguin"] = (ml5.sketchRNN('penguin'));
  animal["parrot"] = (ml5.sketchRNN('parrot'));
  animal["squirrel"] = (ml5.sketchRNN('squirrel'));
  animal["pig"] = (ml5.sketchRNN('pig', modelReady));



  speechRecognizer.continuous = true; //listens all the time
  speechRecognizer.onResult = handleVoiceInput; //call this function
  speechRecognizer.start();

}

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
  if (guessedanimal in animal) {
    select = guessedanimal;
    startDrawing()
  }
}

function setup() {
  createCanvas(640, 480);
  background(220);

  // Button to reset drawing
  let button = createButton('DRAW AGAIN');
  button.mousePressed(startDrawing);


}

function modelReady() {
  console.log('model loaded');
  startDrawing();
  loadingImages = false;
}

// Reset the drawing
function startDrawing() {

  //text to show user what the computer is generating 
  background(220);
  push();
  textSize(35);
  fill(164, 39, 186);
  textFont('Georgia');
  text('Drawing a ' + select, 25, 50);
  pop();

  // Start in the middle
  x = width / 2;
  y = height / 2;
  animal[select].reset();
  // Generate the first stroke path
  animal[select].generate(gotStroke);
}

function draw() {

  // If something new to draw
  if (strokePath) {
    // If the pen is down, draw a line
    if (previous_pen == 'down') {
      push();
      stroke(0);
      strokeWeight(3.0);
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
    text('Your canvas is loading please wait...', 320 - 260, 240);
    pop();
  }


}

// A new stroke path
function gotStroke(err, s) { //format ml5 uses to return a result
  strokePath = s;
}
