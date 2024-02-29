/**
Ai Jam: Draw for Me in Thin Air
Arianna Narita

Making my first AI project using ml5.js
The idea is to make the user draw an image and make the computer guess it 
See if the computer is able to accurately guess whats happening while user is drawing something
1. User will have to use their camera
2. Use the ml5.js classifying and drawing components 
*/

"use strict";

//creating an erase all button variable 
//clears all previous strokes 
let eraseAll;

let backgroundCanvas;


function preload() {



}

function setup() {

//setting up the background where user can draw
    backgroundCanvas = createCanvas(400, 400); 
    background('white');

//setting up the button 
    eraseAll = createButton('clear');
//if mouse is down on the button erase everything previously drawn by calling eraseCanvas function
    eraseAll.mousePressed(eraseCanvas);

}

function draw() {
    if (mouseIsPressed) {
        strokeWeight(10);
        line(mouseX, mouseY, pmouseX, pmouseY);
    }

}

//funtion that allows everything to be erased when button is clicked
function eraseCanvas() {

//reset everything to just being white
    backgroundCanvas('white');
}