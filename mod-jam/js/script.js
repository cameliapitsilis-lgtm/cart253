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
//Adding End Game Message
let endMessage = "";
//Game Ends when you reach 10pts
const maxPoints = 1;
// Adding Greed Penalty to Fortune Mode//
// Every time a coin is eaten, it checks how much time passed since the last coin.
let lastCoinCatchTime = 0;

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

// ORACLE MODE FLYING OBJECT
const goldenFly = { x: 0, y: 0, size: 20, speed: 3 };
const purpleFly = { x: 10, y: 10, size: 20, speed: 5 };

//FORTUNE MODE FLYING OBJECT
const coinFly = { x: 0, y: 0, size: 20, speed: 3 };
const coinFly2 = { x: 0, y: 0, size: 20, speed: 4 };
const coinFly3 = { x: 0, y: 0, size: 20, speed: 5 };

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
    } else if (gamemode === "oracle") {
        // Game Components are here
        moveOracleFly();
        drawOracleFly();
        moveFrog();
        moveTongue();
        drawFrog();
        checkOracleTongue();
        drawScore();
    }
    else if (gamemode === "fortune") {
        moveCoinFly();
        drawCoinFly();
        moveFrog();
        moveTongue();
        drawFrog();
        checkFortuneTongue();
        drawScore();
    }
    else if (gamemode === "end") {
        drawEndScreen();
    }
}

// GAME HOME PAGE COMPONENTS
function drawStartScreen() {
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(48);
    text("Frog of Destiny", width / 2, height / 2);
    textSize(24);
    // text ("message", width/2 (horizontal center, height/2 (vertical center)))
    text("Click 'O' for Oracle Frog\nClick 'F' for Fortune Frog", width / 2, height / 2 + 120);
}

//END SCREEN COMPONENTS
function drawEndScreen() {
    background("#000000ff");
    textAlign(CENTER, CENTER);
    textSize(48);
    fill("#ffffffff");
    text(endMessage, width / 2, height / 2);
    textSize(24);
    // text ("message", width/2 (horizontal center, height/2 (vertical center)))
    text("Press 'H' to return home", width / 2, height / 2 + 60);
}

//SCORING SYSTEM COMPONENTS
function drawScore() {
    fill(0);
    textSize(14);
    textAlign(LEFT, TOP);
    if (gamemode === "oracle") {
        // text("what is written:" + variable, x,y))
        text("Wisdom Points: " + wisdomPoints, 30, 30);
    } else if (gamemode === "fortune") {
        text("Fortune Points: " + fortunePoints, 30, 30);
    }
}

// ACTIVATION USING KEYPRESSED
// CHOOSE YOUR GAME MODE
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
    // RETURN TO START SCREEN USING KEYPRESSED
    if (key === 'H' || key === 'h') {
        gamemode = "start";
        wisdomPoints = 0;
        fortunePoints = 0;
        resetFly();
    }
}

//FLYING OBJECTS-------------------------------------->
/**
 * Oracle Mode: Fly moves from left to right
 * Fortune Mode: Fly moves from top to bottom
 * Resets the fly if it gets all the way to the right or to the bottom
 */

//FLYING OBJECT MOVEMENT AND POSITION//
//ORACLE MODE//
function moveOracleFly() {
    // Oracle Mode
    if (gamemode === "oracle") {
        goldenFly.x += goldenFly.speed;
        purpleFly.x += purpleFly.speed;

        // reset if off screen
        if (goldenFly.x > width) resetGoldenFly();
        if (purpleFly.x > width) resetPurpleFly();
    }
}
//FORTUNE MODE
function moveCoinFly() {

    // move first coin
    coinFly.y += coinFly.speed;
    if (coinFly.y > height) resetCoinFly(coinFly);

    // move second coin
    coinFly2.y += coinFly2.speed;
    if (coinFly2.y > height) resetCoinFly(coinFly2);

    // move third coin
    coinFly3.y += coinFly3.speed;
    if (coinFly3.y > height) resetCoinFly(coinFly3);
}


//DRAWING ORACLE MODE FLYING OBJECTS//
function drawOracleFly() {
    push();
    noStroke();
    fill("#FFD700"); // golden orb
    ellipse(goldenFly.x, goldenFly.y, goldenFly.size);
    fill("#800080"); // purple orb
    ellipse(purpleFly.x, purpleFly.y, purpleFly.size);
    pop();
}

//DRAWING FORTUNE MODE FLYING OBJECTS//
function drawCoinFly() {
    push();
    noStroke();
    fill("#FFD700");
    ellipse(coinFly.x, coinFly.y, coinFly.size);
    ellipse(coinFly2.x, coinFly2.y, coinFly2.size);
    ellipse(coinFly3.x, coinFly3.y, coinFly3.size);
    pop();
}

//RESET FLYING OBJECT POSITION//
function resetFly() {
    if (gamemode === "oracle") {
        resetGoldenFly();
        resetPurpleFly();

    } else if (gamemode === "fortune") {
        resetCoinFly();
    }
}

//ORACLE MODE RESET//
function resetGoldenFly() {
    goldenFly.x = 0;
    goldenFly.y = random(0, 300);
}
function resetPurpleFly() {
    purpleFly.x = 0;
    purpleFly.y = random(100, 300);
}

//FORTUNE MODE RESET//
function resetCoinFly() {
    // first coin
    coinFly.x = random(20, width - 20);
    coinFly.y = 0;
    coinFly.speed = random(3, 6);

    // second coin
    coinFly2.x = random(20, width - 20);
    coinFly2.y = 0;
    coinFly2.speed = random(3, 6);

    // third coin
    coinFly3.x = random(20, width - 20);
    coinFly3.y = 0;
    coinFly3.speed = random(3, 6);
}


//FROG-------------------------------------->
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

/* Displays the tongue (tip and line connection) and the frog (body) */
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

//GAME PLAYING COMPONENTS - SCORING SYSTEM AND TONGUE MOVEMENT
/**
 * Handles the tongue overlapping the fly
 */

//ORACLE MODE TONGUE//
function checkOracleTongue() {
    // Get distance from tongue to fly
    const dGold = dist(frog.tongue.x, frog.tongue.y, goldenFly.x, goldenFly.y);
    const dPurple = dist(frog.tongue.x, frog.tongue.y, purpleFly.x, purpleFly.y);

    // Check if it's an overlap
    const eatenGold = dGold < frog.tongue.size / 2 + goldenFly.size / 2;
    const eatenPurple = dPurple < frog.tongue.size / 2 + purpleFly.size / 2;


    if (eatenGold) {
        wisdomPoints++;
        resetFly();
        frog.tongue.state = "inbound";
        if (wisdomPoints >= maxPoints) {
            gamemode = "end";
            endMessage = "Wisdom Becomes You!";
        }
    }

    if (eatenPurple) {
        gamemode = "end";
        endMessage = "Destiny Failed!";
        frog.tongue.state = "inbound";
    }
}

//FORTUNE MODE TONGUE//
function checkFortuneTongue() {

    //first coin
    const d = dist(frog.tongue.x, frog.tongue.y, coinFly.x, coinFly.y);
    const eaten = d < (frog.tongue.size / 2 + coinFly.size / 2);

    if (eaten && frog.tongue.state === "outbound") {
        fortunePoints++;
        resetCoinFly();
        frog.tongue.state = "inbound";

        if (fortunePoints >= maxPoints) {
            gamemode = "end";
            endMessage = "Fortune Favours You!";
        }
    }

    // second coin
    d = dist(frog.tongue.x, frog.tongue.y, coinFly2.x, coinFly2.y);
    if (d < frog.tongue.size / 2 + coinFly2.size / 2 && frog.tongue.state === "outbound") {
        fortunePoints++;
        resetCoinFly(coinFly2);
        frog.tongue.state = "inbound";
        if (fortunePoints >= maxPoints) {
            gamemode = "end";
            endMessage = "Fortune Favours You!";
        }
    }

    // Third coin
    d = dist(frog.tongue.x, frog.tongue.y, coinFly3.x, coinFly3.y);
    if (d < frog.tongue.size / 2 + coinFly3.size / 2 && frog.tongue.state === "outbound") {
        fortunePoints++;
        resetCoinFly(coinFly3);
        frog.tongue.state = "inbound";
        if (fortunePoints >= maxPoints) {
            gamemode = "end";
            endMessage = "Fortune Favours You!";
        }
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