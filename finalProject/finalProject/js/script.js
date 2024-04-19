/**
Final Project: Ask me to Draw an Animal! I'll Listen and Draw
Arianna Narita

Overall Idea: 
1. Talk (say an animal in the list)
2. Computer draws what you said 
3. Have fun talking to it by seeing what animals it can draw
4. Make fun of the doodle library of ml5 in how sometimes the animals dont look right



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
  animal[4] = (ml5.sketchRNN('catpig'));
  animal[5] = (ml5.sketchRNN('dogbunny'));
  animal[6] = (ml5.sketchRNN('crab')); 
  animal[7] = (ml5.sketchRNN('spider')); //new
  animal[8] = (ml5.sketchRNN('hedgehog')); //new
  animal[9] = (ml5.sketchRNN('kangaroo')); //new
  animal[10] = (ml5.sketchRNN('lion')); //new
  animal[11] = (ml5.sketchRNN('lionsheep')); //new 
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
  animal[27] = (ml5.sketchRNN('pig',modelReady)); 
  

  animalz[0] = 'cat'
  animalz[1] = 'lobster'
  animalz[2] = 'bird'
  animalz[3] = 'bear'
  animalz[4] = 'catpig'
  animalz[5] = 'dogbunny'
  animalz[6] = 'crab'
  animalz[7] = 'spider'
  animalz[8] = 'hedgehog'
  animalz[9] = 'kangaroo'
  animalz[10] ='lion'
  animalz[11] ='lionsheep'
  animalz[12] ='tiger'
  animalz[13] ='swan'
  animalz[14] ='whale'
  animalz[15] ='duck'
  animalz[16] ='rabbit'
  animalz[17] ='dolphin'
  animalz[18] ='frog'
  animalz[19] ='monkey'
  animalz[20] ='mermaid'
  animalz[21] ='mosquito'
  animalz[22] ='dog'
  animalz[23] ='flamingo'
  animalz[24] ='penguin'
  animalz[25] ='parrot'
  animalz[26] ='squirrel'
  animalz[27] ='pig'


  speechRecognizer.continuous = true; //listens all the time
  speechRecognizer.onResult = handleVoiceInput; //call this function
  speechRecognizer.start(); 


}
let body = new Body()

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

  for (var x = 0 ; x<animal.length;x++){
    if(!loadingImages)
    if(animal[x].model.info.name == guessedanimal )
    {
      console.log("found a bicth")
      select = x
      startDrawing()
    }   
  }
}

function setup() {
  createCanvas(Body.canvasW, Body.canvasH); 
  push()
  fill("#c7b7b7")
  rect(0, 175, Body.canvasW - 150, Body.canvasH - 175);  
  pop()
}

function modelReady() {
  console.log('model loaded');
  startDrawing();
  loadingImages = false;
}

// Reset the drawing
function startDrawing() {
  console.log("I have been caleed")
  //text to show user what the computer is generating 

  //background
  push()
  fill("#c7b7b7")
  rect(0, 175, Body.canvasW - 150, Body.canvasH - 175);  
  pop()


  // Start in the middle
  x = width / 2;
  y = height / 2;
  animal[select].reset();
  // Generate the first stroke path
  animal[select].generate(gotStroke);
}

function draw() {
  restart()
  body.draw()
  if(!loadingImages){
  push();
  textSize(35);
  fill(164, 39, 186);
  textFont('Georgia');
  text('Drawing a ' + animal[select].model.info.name, 25, 250);
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
    text('Your canvas is loading please wait...', 320 - 260, 240);
    pop();
  }


}

// A new stroke path
function gotStroke(err, s) { //format ml5 uses to return a result
  strokePath = s;
}



function restart(){
  if(mouseIsPressed) {
    //console.log("lol")
    if(mouseX > 0 && mouseX < Body.canvasW - 150 && mouseY < Body.canvasH && mouseY > Body.canvasH - 70) {
      startDrawing()
    }
  } 
  push()
  rect(0,Body.canvasH - 70,Body.canvasW - 150,70)
  stroke(0);
  strokeWeight(1);
  textSize(20);
  textAlign(CENTER);
  text("REDRAW",(Body.canvasW - 150)/2,Body.canvasH - 25 );
  pop()
}
