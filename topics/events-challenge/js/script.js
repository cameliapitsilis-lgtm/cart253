/**
 * The Only Move Is Not To Play
 * Pippin Barr
 *
 * A game where your score increases so long as you do nothing.
 */

"use strict";

// Current score
let score = 0;

// Is the game over?
let gameOver = false;

/**
 * Create the canvas
 */
function setup() {
    createCanvas(400, 400);
}

/**
 * Update the score and display the UI
 */
function draw() {
    background("#87ceeb");

    // Only increase the score if the game is not over
    if (!gameOver) {
        // Score increases relatively slowly
        score += 0.05;
    }
    displayUI();
}

/**
 * Show the game over message if needed, and the current score
 */
function displayUI() {
    if (gameOver) {
        push();
        textSize(48);
        textStyle(BOLD);
        textAlign(CENTER, CENTER);
        text("You lose!", width / 2, height / 3);
        pop();
    }
    displayScore();
}

/**
 * Display the score
 */
function displayScore() {
    push();
    textSize(48);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(floor(score), width / 2, height / 2);
    pop();
}

//LOSE FUNCTION
function lose() {
    gameOver = true
}

//STEP 3
function keyPressed() {
    lose()
}
function keyIsDown() {
    lose()
}
function keyReleased() {
    lose()
}
function keyTyped() {
    lose()
}

//STEP 4
function mousePressed() {
    lose()
}
function mouseClicked() {
    lose()
}
function mouseMoved() {
    lose()
}
function mouseReleased() {
    lose()
}
function mouseWheel() {
    lose()
}
//STEP 4 - MOBILE
function touchPressed() {
    lose()
}
function touchMoved() {
    lose()
}
function touchStarted() {
    lose()
}

//STEP 5
window.addEventListener("offline", lose);
window.addEventListener("online", lose);

//STEP 6
window.addEventListener("visibilitychange", lose);



