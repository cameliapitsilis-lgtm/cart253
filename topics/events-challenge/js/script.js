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

//STEP 2
function lose() {
    gameOver = true
}

//STEP 3
window.addEventListener('keypress', lose);
window.addEventListener('keydown', lose);
window.addEventListener('keyup', lose);

//STEP 4
window.addEventListener('mousedown', lose);
window.addEventListener('click', lose);
window.addEventListener('mousemove', lose);
window.addEventListener('mouseup', lose);
window.addEventListener('wheel', lose);

//STEP 4 - MOBILE
window.addEventListener('touchstart', lose);
window.addEventListener('touchend', lose);
window.addEventListener('touchmove', lose);
window.addEventListener('touchcancel', lose);


//STEP 5
window.addEventListener("offline", lose);
window.addEventListener("online", lose);

//STEP 6
window.addEventListener("visibilitychange", lose);



