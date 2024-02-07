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
//image names for the blocks of colours of the shows to guess
let imgDora;


//array of images to use for the guessing game
let movieBlocks = [

    "dora",
    "cat"

];

let img = [];
let index = 0;
let imagePosition;


let currentAnswer = 'Click Enter to Begin';

//the show being currently displayed 
let nowShow = ``;

//The speech synthesizer
const speechSynthesizer = new p5.Speech();

//To recongnize the voice coming through!
const speechRecognizer = new p5.SpeechRec();

const question = 2000;


function preload() {

    img[0] = loadImage('assets/images/dora.png');
    img[1] = loadImage('assets/images/simpsons.png');


}

function setup() {

    createCanvas(800, 800);

    speechRecognizer.continuous = true;
    speechRecognizer.onResult = handleVoiceInput;
    speechRecognizer.start();
}

function draw() {

    background(125, 51, 181);

    mainMenu(); //calling the mainmenu function to start the game when key is down


    if (state === `start`) { //clicking space to start screen
        start();
    } else if (state === `simulation`) {
        simulation();
    } else if (state === `you won`) {
        youWon();
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
//five level difficulty
function simulation() {

    theAnswer();

    image(img[index], 20, 20, width / 2, height / 2);
}

//detecting and displaying the correct answer
function theAnswer() {

    if (currentAnswer === nowShow) {
        background(255, 0, 234);

    } else {
        background(255, 0, 0)
    }
    text(currentAnswer, width / 2, height / 2);
}

function handleVoiceInput() {


    let guessedMovie = `What show is this???`;


    if (speechRecognizer.resultValue) {

        let parts = speechRecognizer.resultString.toLowerCase().split(`it is `);
        if (parts.length > 1) {
            guessedMovie = parts[1];
        }
    }
    //lower case
    currentAnswer = guessedMovie;
}

function nextShow() {

    currentAnswer = '';
    nowShow = random(movieBlocks); //go back to the image array and get another show to guess
}

function nextImage() {
    index = index + 1; //change to the next image in the index I gave to the program
}

//click enter for the next show to be displayed
function keyPressed() {

    if (keyIsDown(32)) {
        nextShow();
        console.log("rec voice");
    }

    if (keyIsDown(13)) { //if enter is down the u ser is ready for the next blocks of colours to guess the next show
        index = index + 1;
        if (index == img.length) {
            index = index - img.length;
        }
    }
}

function mainMenu() {

    //how the player starts
    if (keyIsDown(32) && state === 'start') { //if space is down while on the start screen make the game go in the guessing part 
        state = 'simulation';
    }
}