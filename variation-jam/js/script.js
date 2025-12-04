/**
 * Frog of Destiny
 * Camélia Pitsilis
 
 * Frog of Destiny is a myth-inspired, frog tongue catching game where the player controls a
   mystical frog that seeks either wisdom or fortune.

There are 4 modes:

In Ancient Greek mythology, frogs were often associated with prophecy. So in the game Greek Oracle Game,
there will be two types of flying prophetical orbs: Golden Truthful Prophecies and Purple False Prophecies.
The Frog will have to eat the Golden Truthful Prophecies to gain as many Wisdom Points before the time ends.
If the Frog eats the Purple False Prophecies, the frog dies.

In Chinese Mythology, Chan Chu (蟾蜍) is the Three-Legged Mythical Frog that brings fortune.
So in the Chinese Fortune Game, the frog will have to catch as many Golden Coins as possible
before the time runs out. However, if the frog catches the Golden Coins too quickly, he will
lose Fortune Points because of greed.

In Ancient Egyptian mythology, frogs symbolized rebirth and renewal through the goddess Heqet, 
who breathes life into the newly born. In the Egyptian Rebirth Game, the frog must catch glowing 
Nile Blessings, which represent the life-giving floodwaters that sustained Egypt. Each blessing 
strengthens the frog’s Vitality Score. But the frog must avoid the sacred Rebirth Sigils, mystical 
ankh symbols of resurrection. If the frog touches a Rebirth Sigil, it is instantly pulled back into
the eternal cycle of life and reborn, forcing the game to restart.

In classic Western fairytales, frogs are often enchanted beings cursed in frog form waiting to be 
released by true love's kiss. In the Western Fairy Tale Game, the player decides their destiny:
either catch True Love’s Kiss to gain Love Points and follow the path of romance and virtue, or catch 
Crowns of Power to gain Power Points and pursue wealth and dominion over the land. The frog must focus 
carefully, because catching the wrong symbols or mixing them up slows progress and can prevent the player
from reaching their goal before time runs out. Each choice shapes the outcome of the story, revealing a
different ending based on the frog’s priorities.
 
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
let instructionPage = 0; // 0 = first page, 1 = second page
// Adding Scoring System
let wisdomPoints = 0;
let fortunePoints = 0;
//Adding End Game Message
let endMessage = "";
//Game Ends when you reach 10pts
const maxPoints = 10;
// Adding Greed Penalty to Fortune Mode//
// Every time a coin is eaten, it checks how much time passed since the last coin.
let lastCoinCatchTime = 0;
let greedMessage = "";
let greedMessageTimer = 0;

//GAME VISUAL DESIGN
let startBg;
let oracleBg;
let fortuneBg;
let frogImg;
let goldenFlyImg;
let purpleFlyImg;
let coinImg;
let instructionsImg;
let instructionsImg2;
let pixelFont;

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 435,
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
const goldenFly = { x: 0, y: 0, size: 40, speed: 6 };
const purpleFly = { x: 10, y: 10, size: 40, speed: 9 };

//FORTUNE MODE FLYING OBJECT
const coinFly = { x: 0, y: 0, size: 20, speed: 3 };
const coinFly2 = { x: 0, y: 0, size: 20, speed: 4 };
const coinFly3 = { x: 0, y: 0, size: 20, speed: 5 };

//SETUP -------------------------------------------------------------------------------------------------------------//
/* Creates the canvas and initializes the fly */
// Game Visual Design Images
function preload() {
    //Game Font
    pixelFont = loadFont('assets/font/PressStart2P-Regular.ttf');
    //Game Background
    startBg = loadImage("assets/images/startscreen.png");
    oracleBg = loadImage("assets/images/oraclemode.png");
    fortuneBg = loadImage("assets/images/fortunemode.png");
    egyptBg = loadImage("assets/images/rebirthmode.png");
    instructionsImg = loadImage("assets/images/instructions.png");
    instructionsImg2 = loadImage("assets/images/instructions2.png")
    //Game Components
    // Frog
    frogImg = loadImage("assets/images/frog.png");
    // Oracle Mode
    goldenFlyImg = loadImage("assets/images/goldorb.png");
    purpleFlyImg = loadImage("assets/images/purpleorb.png");
    // Fortune Mode
    coinImg = loadImage("assets/images/coins.png");
    // Rebirth Mode
    nileBlessingImg = loadImage("assets/images/blessings.png");
    rebirthSigilImg = loadImage("assets/images/ankh.png");
}

function setup() {
    createCanvas(640, 480);
    textFont(pixelFont);
    // Give the fly its first random position
    resetFly();
}

//MAIN DRAW FUNCTION -----------------------------------------------------------------------------------------------//
function draw() {
    background("#26005cff");

    //Show a different screen depending on the game mode

    if (gamemode === "start") {
        drawStartScreen();

        //Oracle Mode
    } else if (gamemode === "oracle") {
        // Background 
        if (oracleBg) {
            image(oracleBg, 0, 0, width, height);
        } else {
            background("#26005cff");
        }
        // Game Components Here
        moveOracleFly();
        drawOracleFly();
        moveFrog();
        moveTongue();
        drawFrog();
        checkOracleTongue();
        drawScore();
    }
    //Fortune Mode
    else if (gamemode === "fortune") {
        // Background
        if (fortuneBg) {
            image(fortuneBg, 0, 0, width, height);
        } else {
            background("#26005cff");
        }
        //Game Components Here
        moveCoinFly();
        drawCoinFly();
        moveFrog();
        moveTongue();
        drawFrog();
        checkFortuneTongue();
        drawScore();
    }

    // Rebirth Mode
    else if (gamemode === "egypt") {
        if (egyptBg) {
            image(egyptBg, 0, 0, width, height);
        } else {
            background("#26005cff");
        }
        //Game Components Here
        moveCoinFly();
        drawCoinFly();
        moveFrog();
        moveTongue();
        drawFrog();
        checkFortuneTongue();
        drawScore();
    }

    //Instruction Mode
    else if (gamemode === "instructions") {
        if (instructionPage === 0) {
            if (instructionsImg) {
                image(instructionsImg, 0, 0, width, height);
            } else {
                background("#26005cff");
            }

            // Draw "Next" arrow button
            fill("#ffffffff");
            noStroke();
            triangle(width - 25, height - 30, width - 45, height - 40, width - 45, height - 20); //(x1, y1, x2, y2, x3, y3)
            textSize(12);
            text("NEXT", width / 2 + 245, height / 2 + 211);

            //DRAW ESC TO RETURN
            text("Press ESC to return", width / 2 - 180, height / 2 + 211);
        }
        else if (instructionPage === 1) {
            if (instructionsImg2) {
                image(instructionsImg2, 0, 0, width, height);
            } else {
                background("#26005cff");
            }

            // Draw "Back" arrow button
            fill("#ffffffff");
            noStroke();
            triangle(25, height - 30, 45, height - 40, 45, height - 20);
            textSize(12);
            text("PREVIOUS", width / 2 - 220, height / 2 + 211);
        }
    }
    // Choose your destiny screen
    else if (gamemode === "chooseDestiny") {
        drawChooseDestinyScreen();
    }
    // End Screen
    else if (gamemode === "end") {
        drawEndScreen();
    }
}

// DRAWING GAME START SCREEN COMPONENTS-----------------------------------------------------------------------------//
function drawStartScreen() {
    if (startBg) {
        image(startBg, 0, 0, width, height); // draw background
    } else {
        background("#26005cff"); // fallback color
    }
    fill("#ffffffff");
    textAlign(CENTER, CENTER);
    textSize(30);
    text("FROG OF DESTINY", width / 2, height / 2);
    //Different Options
    noStroke();
    fill("#00eeffff");
    //rect(x,y,w,h)
    rect(width / 2 - 150, height / 2 + 80, 300, 40); // Choose your destiny
    fill("#ff00e1ff");
    rect(width / 2 - 150, height / 2 + 140, 300, 40); // Instructions button
    textSize(14);
    fill("#280085ff");
    text("CHOOSE YOUR DESTINY", width / 2, height / 2 + 100);
    text("INSTRUCTIONS", width / 2, height / 2 + 160);
}

//DRAWING END SCREEN COMPONENTS-------------------------------------------------------------------------------------//
function drawEndScreen() {
    background("#000000ff");
    textAlign(CENTER, CENTER);
    textSize(30);
    fill("#ffffffff");
    text(endMessage, width / 2, height / 2);
    textSize(12);
    // text ("message", width/2 (horizontal center, height/2 (vertical center)))
    text("Press 'esc' to return to start screen", width / 2, height / 2 + 60);
}

//DRAWING CHOOSE YOUR DESTINY SCREEN
function drawChooseDestinyScreen() {
    background("rgba(38, 0, 92, 1)");
    fill("#ffffffff");
    textAlign(CENTER, CENTER);
    textSize(30);
    text("CHOOSE YOUR DESTINY", width / 2, 70);
    textSize(14);
    text("Press ESC to return to home screen", width / 2, 425);

    // Modes
    const modes = ["Greek Oracle", "Chinese Fortune", "Egyptian Rebirth", "Western Fairy Tale"];
    const modeColors = ["#00eeffff", "#ff0000ff", "#ddff00ff", "#ff00e1ff"];
    textSize(14);
    for (let i = 0; i < modes.length; i++) {
        fill(modeColors[i]); // set color for this mode
        rect(width / 2 - 150, 120 + i * 70, 300, 40); // (X,Y, Spacing, Button Width, Button Height)
        fill("#26005cff");
        text(modes[i], width / 2, 140 + i * 70);
    }
}

//DRAWING SCORING SYSTEM COMPONENTS---------------------------------------------------------------------------------//
function drawScore() {
    let barWidth = 150;
    let barHeight = 20;
    let fillWidth;
    let currentPoints;

    if (gamemode === "oracle") {
        fillWidth = map(wisdomPoints, 0, maxPoints, 0, barWidth);
        currentPoints = wisdomPoints;
    } else {
        fillWidth = map(fortunePoints, 0, maxPoints, 0, barWidth);
        currentPoints = fortunePoints;
    }

    //Drawing Score Bar
    fill("#12db59ff");
    rect(30, 30, fillWidth, barHeight);
    noFill();
    stroke("#000000ff");
    strokeWeight(2);
    rect(30, 30, barWidth, barHeight);

    //Drawing Score Number
    fill("#ffffffff");
    textSize(14);
    textAlign(LEFT, CENTER);
    strokeWeight(3);
    text(currentPoints + " / " + maxPoints, 30 + barWidth + 10, 30 + barHeight / 2);


    //FORTUNE MODE GREED PENALTY MESSAGE
    // Show "Too Greedy!" message
    if (greedMessageTimer > 0) {
        fill("#ffffffff");
        textSize(20);
        textAlign(CENTER, CENTER);
        text(greedMessage, width / 2, height / 2);
        greedMessageTimer--;
    }
}

//FLYING OBJECTS----------------------------------------------------------------------------------------------------//
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
//FORTUNE MODE FLY//
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

//DRAWING FLYING OBJECTS//
//ORACLE MODE//
function drawOracleFly() {
    push();
    imageMode(CENTER);
    image(goldenFlyImg, goldenFly.x, goldenFly.y, goldenFly.size, goldenFly.size);
    image(purpleFlyImg, purpleFly.x, purpleFly.y, purpleFly.size, purpleFly.size);
    pop();
}

//FORTUNE MODE//
function drawCoinFly() {
    push();
    imageMode(CENTER);
    image(coinImg, coinFly.x, coinFly.y, coinFly.size, coinFly.size);
    image(coinImg, coinFly2.x, coinFly2.y, coinFly2.size, coinFly2.size);
    image(coinImg, coinFly3.x, coinFly3.y, coinFly3.size, coinFly3.size);
    pop();
}

//RESET FLYING OBJECT POSITION//
function resetFly() {
    if (gamemode === "oracle") {
        resetGoldenFly();
        resetPurpleFly();

    } else if (gamemode === "fortune") {
        resetCoinFly(coinFly);
        resetCoinFly(coinFly2);
        resetCoinFly(coinFly3);
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
function resetCoinFly(coin) {
    coin.x = random(20, width - 20);
    coin.y = 0;
    coin.speed = random(3, 6);
}

//FROG---------------------------------------------------------------------------------------------------------------//
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
    fill("#ffffffff");
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
    imageMode(CENTER);
    image(frogImg, frog.body.x, frog.body.y, frogImg.width / 3, frogImg.height / 3);
    pop();
}

//SCORING SYSTEM AND TONGUE MOVEMENT--------------------------------------------------------------------------------//
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
        resetGoldenFly();
        frog.tongue.state = "inbound";
        if (wisdomPoints >= maxPoints) {
            gamemode = "end";
            endMessage = "PROPHECY ACHIEVED!";
        }
    }

    if (eatenPurple) {
        gamemode = "end";
        endMessage = "DESTINY FAILED!";
        frog.tongue.state = "inbound";
    }
}

//FORTUNE MODE TONGUE//
function checkFortuneTongue() {
    let now = millis(); //time component for the greed penalty

    // check first coin
    const d1 = dist(frog.tongue.x, frog.tongue.y, coinFly.x, coinFly.y);
    const eaten1 = d1 < (frog.tongue.size / 2 + coinFly.size / 2);
    if (eaten1 && frog.tongue.state === "outbound") {
        let timeSinceLast = now - lastCoinCatchTime;
        if (timeSinceLast < 2000) {
            // too greedy!
            fortunePoints = max(0, fortunePoints - 1);
            greedMessage = "TOO GREEDY! -1pts";
            greedMessageTimer = 60; // show ~1 second
        } else {
            fortunePoints++;
            greedMessage = "";
        }
        lastCoinCatchTime = now;
        resetCoinFly(coinFly);
        frog.tongue.state = "inbound";
        if (fortunePoints >= maxPoints) {
            gamemode = "end";
            endMessage = "FORTUNE FAVOURS YOU!";
        }
    }

    // check second coin
    const d2 = dist(frog.tongue.x, frog.tongue.y, coinFly2.x, coinFly2.y);
    const eaten2 = d2 < (frog.tongue.size / 2 + coinFly2.size / 2);
    if (eaten2 && frog.tongue.state === "outbound") {
        let timeSinceLast = now - lastCoinCatchTime;
        if (timeSinceLast < 2000) {
            fortunePoints = max(0, fortunePoints - 1);
            greedMessage = "TOO GREEDY! -1pts";
            greedMessageTimer = 60;
        } else {
            fortunePoints++;
            greedMessage = "";
        }
        lastCoinCatchTime = now;
        resetCoinFly(coinFly2);
        frog.tongue.state = "inbound";
        if (fortunePoints >= maxPoints) {
            gamemode = "end";
            endMessage = "FORTUNE FAVOURS YOU!";
        }
    }

    // check third coin
    const d3 = dist(frog.tongue.x, frog.tongue.y, coinFly3.x, coinFly3.y);
    const eaten3 = d3 < (frog.tongue.size / 2 + coinFly3.size / 2);
    if (eaten3 && frog.tongue.state === "outbound") {
        let timeSinceLast = now - lastCoinCatchTime;
        if (timeSinceLast < 2000) {
            fortunePoints = max(0, fortunePoints - 1);
            greedMessage = "TOO GREEDY! -1pts";
            greedMessageTimer = 60;
        } else {
            fortunePoints++;
            greedMessage = "";
        }
        lastCoinCatchTime = now;
        resetCoinFly(coinFly3);
        frog.tongue.state = "inbound";
        if (fortunePoints >= maxPoints) {
            gamemode = "end";
            endMessage = "FORTUNE FAVOURS YOU!";
        }
    }
}

//MOUSE ACTIVATION---------------------------------------------------------------------------------------------------//
/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    // Home Screen Selection
    if (gamemode === "start") {
        // Choose your destiny button
        if (mouseX > width / 2 - 150 && mouseX < width / 2 + 150 &&
            mouseY > height / 2 + 90 && mouseY < height / 2 + 140) {
            gamemode = "chooseDestiny";
        }
        // Instructions button
        else if (mouseX > width / 2 - 150 && mouseX < width / 2 + 150 &&
            mouseY > height / 2 + 120 && mouseY < height / 2 + 180) {
            gamemode = "instructions";
        }
    }
    // Game Mode Selection
    else if (gamemode === "chooseDestiny") {
        const modes = ["oracle", "fortune", "rebirth", "fairy"]; // internal gamemode names
        for (let i = 0; i < modes.length; i++) {
            if (mouseX > width / 2 - 150 && mouseX < width / 2 + 150 &&
                mouseY > 120 + i * 60 && mouseY < 160 + i * 60) {
                gamemode = modes[i]; // set actual game mode
                resetFly(); // reset positions
            }
        }
    }
    //Instruction Page Change
    else if (gamemode === "instructions") {
        // Next page arrow (bottom-right)
        if (instructionPage === 0 &&
            mouseX > width - 100 && mouseX < width - 20 &&
            mouseY > height - 60 && mouseY < height - 20) {
            instructionPage = 1;
        }
        // Back page arrow (bottom-left)
        else if (instructionPage === 1 &&
            mouseX > 20 && mouseX < 150 &&
            mouseY > height - 60 && mouseY < height - 20) {
            instructionPage = 0;
        }
    }
    // Frog Tongue Control
    else if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
}

//ACTIVATION USING KEYPRESSED---------------------------------------------------------------------------------------//
function keyPressed() {
    // RETURN TO START SCREEN USING KEYPRESSED
    if (keyCode === ESCAPE) {
        gamemode = "start";
        instructionPage = 0;
        wisdomPoints = 0;
        fortunePoints = 0;
        resetFly();
    }
}
