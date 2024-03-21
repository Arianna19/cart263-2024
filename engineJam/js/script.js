/**
Game Engine Jam 
Arianna

Making first project and last minute project using phaser 3
Hoping its something somewhat presentable 

Overall idea:



*/

"use strict";


function preload() {

}



function setup() {

}



function draw() {

    

    if (state === `start`) { //clicking space to start screen
        start();
    } else if (state === `simulation`) {
        simulation();
    } else if (state === `you won`) {
        youWon();
    }
    else

}