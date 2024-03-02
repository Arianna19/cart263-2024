/**
Ai Jam: Ask me to Draw an Animal! I'll Listen and Draw
Arianna Narita

Making my first AI project using ml5.js
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
// For when SketchRNN is fixed
function preload() {
  // See a list of all supported models: https://github.com/ml5js/ml5-library/blob/master/src/SketchRNN/models.js
  // list of animals ml5 recongnizes
  animal["cat"] = (ml5.sketchRNN('cat'));
  animal["lobster"] = (ml5.sketchRNN('lobster'));
  animal["bird"] = (ml5.sketchRNN('bird'));
  animal["bear"] = (ml5.sketchRNN('bear'));
  animal["catpig"] = (ml5.sketchRNN('catpig'));
  animal["dogbunny"] = (ml5.sketchRNN('dogbunny'));
  animal["crab"] = (ml5.sketchRNN('crab'));
  animal["dolphin"] = (ml5.sketchRNN('dolphin'));
  animal["frog"] = (ml5.sketchRNN('frog'));
  animal["monkey"] = (ml5.sketchRNN('monkey'));
  animal["mermaid"] = (ml5.sketchRNN('mermaid'));
  animal["mosquito"] = (ml5.sketchRNN('mosquito'));
  animal["dog"] = (ml5.sketchRNN('dog'));
  animal["flamingo"] = (ml5.sketchRNN('flamingo'));
  animal["penguin"] = (ml5.sketchRNN('penguin'));
  animal["parrot"] = (ml5.sketchRNN('parrot'));
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
  if (guessedanimal in animal)
    select = guessedanimal;
}

function setup() {
  createCanvas(640, 480);
  background(220);

  // Button to reset drawing
  let button = createButton('draw next');
  button.mousePressed(startDrawing);


}

function modelReady() {
  console.log('model loaded');
  startDrawing();
}

// Reset the drawing
function startDrawing() {
  background(220);
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
      stroke(0);
      strokeWeight(3.0);
      line(x, y, x + strokePath.dx, y + strokePath.dy);
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
}

// A new stroke path
function gotStroke(err, s) { //format ml5 uses to return a result
  strokePath = s;
}
