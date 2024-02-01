/**
Testing Sounds 
Arianna Narita

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let recongnizer = new p5.SpeechRec();

/**
Description of preload
*/
function preload() {

}


/**
Description of setupSD
*/
function setup() {

recongnizer.onResult = handleResult;
recongnizer.start();

}


/**
Description of draw()
*/
function draw() {

}

function mousePressed() {
    //voice.speak('I love boyfriend chan very much');
}

function handleResult() {
    console.log(recongnizer.resultString);


}