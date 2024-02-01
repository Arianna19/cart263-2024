/**
Trying the output exercise
Arianna Narita

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

const speechSynth = new p5.Speech(); //not planning on changing so name it a constant


/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/
function setup() {
    createCanvas(500, 500);

    //thing to make it actually say something
    console.log(speechSynth.listVoices());

    //synth settings    
    speechSynth.setPitch(1.4);
    speechSynth.setRate(2);
    speechSynth.setVoice(`Microsoft Haruka - Japanese (Japan)`);


}


/**
Description of draw()
*/
function draw() {
    background(201,67,9);

}

function mousePressed() {
    speechSynth.speak("2024-01-31");
}