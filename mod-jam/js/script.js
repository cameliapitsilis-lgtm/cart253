/**
 * Frog of Destiny
 * Camélia Pitsilis
 
 * Frog of Destiny is a myth-inspired, frog tongue catching game where the player controls a
   mystical frog that seeks either wisdom or fortune.

 There are two modes: Greek Oracle Frog and Chinese Fortune Frog.

 In Ancient Greek mythology, frogs were often associated with prophecy. So in the game Greek Oracle Frog Game,
 there will be two types of flying prophetical orbs: Golden Truthful Prophecies and Purple False Prophecies.
 The Frog will have to eat the Golden Truthful Prophecies to gain as many Wisdom Points before the time ends.
 If the Frog eats the Purple False Prophecies, the frog dies.
 
 In Chinese Mythology, Chan Chu (蟾蜍) is the Three-Legged Mythical Frog that brings fortune.
 So in the Chinese Fortune Frog Game, the frog will have to catch as many Golden Coins as possible
 before the time runs out. However, if the frog catches the Golden Coins too quickly, he will lose
 Fortune Points because of greed.
 
 Instructions:
 - Move the frog with your mouse
 - Click to launch the tongue
 - Catch object
 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// Game Home Page with Title and Instructions
let gamemode = "start";

// Adding Scoring System
let wisdomPoints = 0;
let fortunePoints = 0;
//Game Ends when you reach 10pts
const maxPoints = 10;

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3
};

//SETUP -------------------------------//
/* Creates the canvas and initializes the fly */

function setup() {
    createCanvas(640, 480);

    // Give the fly its first random position
    resetFly();
}

//MAIN DRAW FUNCTION ------------------//
function draw() {
    background("#87ceeb");

    //Show a different screen depending on the game mode

    if (gamemode === "start") {
        drawStartScreen();
    } else if (gamemode === "oracle" || gamemode === "fortune") {
        // Game Components are here
        moveFly();
        drawFly();
        moveFrog();
        moveTongue();
        drawFrog();
        checkTongueFlyOverlap();
        drawScore();
    } else if (gamemode === "end") {
        drawEndScreen();
    }
}

// GAME HOME PAGE COMPONENTS
function drawStartScreen() {
    fill(0);
    textAlign(CENTER);
    textSize(48);
    text("Frog of Destiny", width / 2, 150);
    textSize(24);
    text("Click 'O' for Oracle Frog\nClick 'F' for Fortune Frog", width / 2, 250);
}

//SCORING SYSTEM COMPONENTS
function drawScore() {
    fill(0);
    textSize(24);
    textAlign(LEFT, TOP);
    if (gamemode === "oracle") {

        // text("what is written:" + variable, x,y))

        text("Wisdom Points: " + wisdomPoints, 10, 10);
    } else if (gamemode === "fortune") {
        text("Fortune Points: " + fortunePoints, 10, 10);
    }
}

// ACTIVATION OF DIFFERENT GAME MODES USING KEYPRESSED
function keyPressed() {
    if (gamemode === "start") {
        if (key === 'O' || key === 'o') {
            gamemode = "oracle";
            resetFly();
        } else if (key === 'F' || key === 'f') {
            gamemode = "fortune";
            resetFly();
        }
    }
}
/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + fly.size / 2);
    if (eaten) {
        // Reset the fly
        resetFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
}