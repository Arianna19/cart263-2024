/**
Voices Jam : The guessing game
Arianna Narita

This simulation is basically very simple since it's my first time using audio/voice in a project.
The goal: Guess the movie/series based off of the colour blocks being shown 
Speech aspect: The user has to vocally say the movie and the computer will wait until the right answer is said 

Process: (start with 5 levels of difficulty)
1. Create an array of images which will be the colour blocks 
2. Create a detection function of audio 
3. Function that will notice the right answer
4. Change the screen when guessed right

**/

let imgLevelOne; //level one show to guess image


function preload() {

    imgLevelOne = loadImage('assets/images/dora.png'); //level one image

}


/**
Description of setup
*/
function setup() {

    createCanvas(800,800);

}


/**
Description of draw()
*/
function draw() {

    background(125, 51, 181);
    mainMenu(); //calling the mainmenu function to start the game when key is down

    if (state === `start`) { //clicking space to start screen
        start();
    } else if (state === `simulation`) {
        simulation();
    } else if (state === `you died`) {
        youDied();
    }

}

let state = 'start';
//screen for when player starts the game
function start() {

    push();
    textSize(50);
    fill(50, 168, 82);
    textAlign(CENTER, CENTER);
    textFont('Georgia');
    text('Tell Me the Show You See!!!', width / 2, height / 2);
    pop();

    push();
    textSize(25);
    fill(255, 217, 0);
    textAlign(CENTER, CENTER)
    textFont('Georgia');
    text('Click Space to Start', width / 2, 460);
    pop();


}

//the actual guessing show game time 
function simulation() {

    rects.draw(); //calling all the functions in the draw function of the class Rectangle
    rects2.draw();
    rects3.draw();
    kirb.draw();

    //displaying the counter in top corner
    push();
    textSize(40);
    textFont('Georgia');
    fill(224, 188, 4)
    text('Score: ' + Rectangle.points, 35, 50);
    pop();


    if (!kirb.alive) {
        state = 'you died'
    }


}

function mainMenu() {

    //how the player starts
    if (keyIsDown(32) && state === 'start') { //if space is down while on the start screen make the game go in the guessing part 
        state = 'simulation';

    }
}