/**
Voices Jam : The guessing game
Arianna Narita
**/

//different background images depending on the state user is in
let bgStart;
let bgWin;

//array of images to use for the guessing game and what the user has to say to get the answer right
let movieBlocks = [

    "dora the explorer",
    "the simpsons",
    "the powerpuff girls",
    "spongebob",
    "inside out",
    "adventure time"

];

//array of hints to give user if h is pressed
let hintList = [
    "she explores the world with her monkey", //dora the explorer hint
    "a famous yellow family starting with S", //simpsons hint
    "Blossom, Buttercup and Bubbles are the...", //powerpuff girls hint 
    "his best friend is a starfish", //spongebob hint
    "a disney movie about emotions", //inside out hint
    "same show as Princess Bubblegum" //adventure time hint
];

//array to go through the images of the different shows listed
let img = [];
let index = 0;
let imagePosition;

//array to go through the list of the hints
let currentHint = 0;

//the thing that is being shown at the moment 
let currentAnswer = `What show is this???`;

//get program to say the question once
let sayQuestion = false;

//the show being currently displayed that needs to be guessed
let nowShow = ``;

//The speech synthesizer
const speechSynthesizer = new p5.Speech();

//To recongnize the voice coming through!
const speechRecognizer = new p5.SpeechRec();

const question = 2000;


function preload() {

    //index of images of what the user will guess (colour blocks)
    img[0] = loadImage('assets/images/dora.png');
    img[1] = loadImage('assets/images/simpsons.png');
    img[2] = loadImage('assets/images/powerpuff.png');
    img[3] = loadImage('assets/images/spongebob.png');
    img[4] = loadImage('assets/images/insideout.png');
    img[5] = loadImage('assets/images/adventuretime.png');

    bgStart = loadImage('assets/images/bgshow.png');
    bgWin = loadImage('assets/images/winner.png');

}

function setup() {

    createCanvas(800, 800);

    speechSynthesizer.setPitch(1.4);
    speechSynthesizer.setVoice(`Microsoft Haruka - Japanese (Japan)`);

    speechRecognizer.continuous = true; //listens all the time
    speechRecognizer.onResult = handleVoiceInput; //call this function
    speechRecognizer.start();

}

function draw() {

    background(bgStart, 800, 800);

    mainMenu(); //calling the mainmenu function to start the game when key is down

    if (state === `start`) { //clicking space to start screen
        start();
    } else if (state === `simulation`) {
        simulation();
    } else if (state === `you won`) {
        youWon();
    }
}


//the actual guessing show game time 
//six level difficulty

function simulation() {

    if (index < 6 && state === `simulation`) {

        theAnswer();
        image(img[index], 150, 150, 500, height / 2);
        nowShow = movieBlocks[index];
        hintButton();
        sayHint();

    } else {
        state = `you won`;
    }
}

function handleVoiceInput() {

    let guessedMovie = `What show is this???`;

    if (speechRecognizer.resultValue) {

        let parts = speechRecognizer.resultString.toLowerCase().split(`it's`);
        if (parts.length > 1) {
            guessedMovie = parts[1].trim();
            console.log(speechRecognizer.resultString);

        }
    }
    //lower case
    currentAnswer = guessedMovie;
}

//detecting and displaying the correct answer
function theAnswer() {

    console.log(currentAnswer);
    console.log(nowShow)

    if (currentAnswer == nowShow) {
        background(23, 163, 60); //GREEN IF GUESSED CORRECTLY
        push();
        textSize(45);
        textAlign(CENTER, CENTER)
        textStyle("Georgia");
        text(speechRecognizer.resultString, width / 2, 50); //display the right answer
        pop();

        ///bunch of pretty text things for a fun looking game///
        push();
        textSize(25);
        fill(255, 217, 0);
        textAlign(CENTER)
        textFont('Georgia');
        text('Click Enter for the next show', width / 2, 650);
        pop();

        push();
        textSize(15);
        fill(`black`);
        textAlign(CENTER);
        textFont('Georgia');
        text('Before Haruka drives you insane...', width / 2, 675);
        pop();

        push();
        textSize(30);
        fill(255, 217, 0);
        textAlign(CENTER);
        textStyle(BOLD);
        textFont('Georgia');
        text('AMAZING YOU GOT IT!!! ᕙ(^▿^-ᕙ)', width / 2, 620)
        //speechSynthesizer.speak('AMAZING YOU GOT IT!!!'); //lady haruka driving the user insane by making them understand they got it
        pop();

        push();
        textSize(30);
        fill(255, 217, 0);
        textAlign(CENTER);
        textStyle(BOLD);
        textFont('Georgia');
        text('💪 (`▿´) 👊', 70, 350);
        text('💪 (`▿´) 👊', 740, 350);
        text('(͠≖ ͜ʖ͠≖)👌', 70, height / 2);
        text('(͠≖ ͜ʖ͠≖)👌', 740, height / 2);
        pop();

    } else {
        background(255, 0, 0); //RED IF WRONG
        push();
        textSize(45);
        textAlign(CENTER, CENTER)
        textStyle("Georgia");
        text(speechRecognizer.resultString, width / 2, 50); //display the wrong answer
        pop();
        hintButton();

        push();
        textSize(30);
        fill(255, 217, 0);
        textAlign(CENTER)
        textFont('Georgia');
        text('What is this show?', width / 2, 100);
        speechSynthesizer.speak(' '); //the way I make haruka stop talking for the next show to guess
        pop();

        push();
        textSize(40);
        fill(255, 217, 0);
        textAlign(CENTER)
        textStyle(BOLD);
        textFont('Georgia');
        text("It's...", width / 2, 140)
        speechSynthesizer.speak(' ');
        pop();

        ///bunch of pretty text things for a fun looking game///
        push();
        textSize(30);
        fill(255, 217, 0);
        textAlign(CENTER);
        textStyle(BOLD);
        textFont('Georgia');
        text('( ˘︹˘ )', 70, 180);
        text('(ㆆ_ㆆ)', 70, 550);
        text('O﹏o', 730, height / 2);
        pop();
    }
}

//if h key is pressed give the user one hint and the computer will say it
function sayHint() {

    let dialogueHint = hintList[currentHint]

    if (keyIsDown(72) && currentAnswer != nowShow) { //if enter is down the user is ready for the next blocks of colours to guess the next show

        currentHint = currentHint + 1;
        console.log('hint line')
        speechSynthesizer.speak(dialogueHint);

        if (currentHint === hintList.lenght) {
            currentHint = hintList.length - 1;
        }

    }

}

//the way hint instruction is displayed on screen
function hintButton() {

    push();
    textSize(25);
    fill(255, 217, 0);
    textAlign(CENTER)
    textFont('Georgia');
    text('Need a hint? ( ͡• ͜ʖ ͡•)', width / 2, 750);
    pop();

    push();
    textSize(25);
    fill(255, 217, 0);
    textAlign(CENTER, CENTER)
    textFont('Georgia');
    text('Click "h"', width / 2, 780);
    pop();
}

function nextShow() {

    currentAnswer = '';
}

//change to the next image in the index I gave to the program
function nextImage() {
    index = index + 1;
}

//click enter for the next show to be displayed
function keyPressed() {

    if (keyIsDown(13) && index < 7 && currentAnswer == nowShow) { //if enter is down the user is ready for the next blocks of colours to guess the next show
        index = index + 1;
    }
}

////the following are just the different states the game has////

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

function youWon() {

    background(bgWin, 800, 800);
    push();
    textSize(50);
    textStyle(BOLD);
    fill(0, 229, 255);
    textAlign(CENTER, CENTER);
    textFont('Georgia');
    text('You Guessed Everything!', width / 2, height / 2);
    text('ᕙ(`▿´)ᕗ ᕙ(`▿´)ᕗ', width / 2, 325);
    pop();

    push();
    textSize(20);
    fill(51, 255, 0);
    textAlign(CENTER, CENTER);
    text('~click enter to play again~', width / 2, 450);
    pop();
}

function mainMenu() {

    //how the player starts
    if (keyIsDown(32) && state === 'start') { //if space is down while on the start screen make the game go in the guessing part 
        state = 'simulation';
    }
}

