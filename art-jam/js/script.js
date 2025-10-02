/**
 * Cam's Self-Portrait
 * Camelia Pitsilis
 * 
 * ART JAM Project for CART253 A
 */

"use strict";
//VARIABLE THAT CHANGES OVERTIME
//Is it Nightime? true or false
let isNight = false;
//Counts frame
let timer = 0;
//How many frames before colour change
let wait = 120; // Default is 60fps so 120 frames = ~2 seconds at 60fps

//Is the Jewelry On? No.
let hasClicked = false;


function setup() {
    createCanvas(500, 500);
    noStroke();
}

function draw() {
    // Switch sky color based on isNight
    if (isNight) {
        background(38, 29, 117); // Nightime
    } else {
        background(161, 232, 255); // Daytime color
    }

    // Count frames, switch after delay
    timer = timer + 1;
    if (timer > wait) {
        if (isNight) {
            isNight = false;// If it was night, switch to day
        } else {
            isNight = true;// If it was day, switch to night
        }
        timer = 0;
    }

    // Reset timer

    //Self-Portrait//(x,y,w,h)

    //FACE COLOUR
    fill(242, 201, 167);
    rect(90, 100, 350, 400)

    //HAIR//
    fill(0, 0, 0);
    rect(160, 20, 200, 20)
    rect(120, 40, 300, 20)
    rect(100, 60, 320, 20)
    rect(80, 80, 340, 20)
    rect(60, 100, 240, 20)
    rect(320, 100, 100, 20)//RIGHT BANGS
    rect(340, 120, 80, 20)//RIGHT BANGS
    rect(360, 140, 60, 20)//RIGHT BANGS
    rect(420, 100, 20, 60)//RIGHT BANGS
    rect(420, 160, 20, 20)//RIGHT BANGS
    rect(60, 120, 220, 20)
    rect(60, 140, 200, 20)
    rect(60, 160, 120, 20)
    rect(60, 180, 100, 20)
    rect(60, 200, 80, 20)
    rect(60, 200, 20, 280)//LENGHT
    rect(40, 120, 20, 240)
    rect(80, 200, 20, 300)
    rect(100, 300, 40, 200)
    rect(140, 360, 40, 140)
    rect(340, 420, 40, 80)
    rect(380, 400, 20, 100)
    rect(400, 380, 20, 120)
    rect(420, 320, 20, 200)

    //FACE//
    //
    //NOSE//
    fill(186, 146, 112);
    rect(320, 260, 20, 20)
    rect(300, 280, 40, 20)
    //RIGHT//
    rect(420, 180, 20, 40)
    rect(440, 220, 20, 80)
    rect(420, 300, 20, 20)
    rect(400, 320, 20, 60)
    rect(380, 380, 20, 20)
    rect(360, 400, 20, 20)
    //LEFT//
    rect(140, 300, 20, 40)
    rect(140, 340, 20, 20)
    rect(160, 360, 20, 20)
    rect(180, 380, 20, 20)
    rect(200, 400, 20, 20)
    rect(220, 420, 140, 20)//CHIN LINE
    //NECK//
    rect(180, 400, 20, 100)
    rect(320, 420, 20, 80)

    //SHADOWS
    fill(120, 84, 54);
    rect(260, 440, 80, 20)
    rect(280, 460, 60, 20)
    rect(300, 480, 40, 20)

    //EYE LASHES
    fill(0, 0, 0);
    rect(320, 180, 80, 20)
    rect(200, 180, 80, 20)

    //EYE MOVEMENT
    let leftEyeX = constrain(mouseX, 200, 240)
    let rightEyeX = leftEyeX + 120;

    let leftEyeHighlightY = constrain(mouseY, 200, 220)
    let rightEyeHighlightY = leftEyeHighlightY

    // RIGHT EYE
    fill(0, 0, 0);
    rect(rightEyeX, 200, 40, 40)
    // RIGHT EYE HIGHLIGHT
    fill(255, 255, 255);
    rect(rightEyeX, rightEyeHighlightY, 20, 20)

    // LEFT EYE
    fill(0, 0, 0);
    rect(leftEyeX, 200, 40, 40)
    // LEFT EYE HIGHLIGHT
    fill(255, 255, 255);
    rect(leftEyeX, leftEyeHighlightY, 20, 20)

    //MOUTH//
    fill(191, 2, 71);
    rect(260, 320, 80, 20)
    rect(260, 340, 20, 20)
    rect(280, 360, 60, 20)

    //TEETH
    fill(255, 255, 255);
    rect(280, 340, 60, 20)

    //BLUSH
    fill(255, 115, 190);
    rect(200, 260, 40, 20)
    rect(380, 260, 40, 20)

    //EAR//
    fill(186, 146, 112);
    rect(120, 240, 20, 20)

    if (hasClicked) {
        //JEWELRY
        //EARRING
        fill(255, 238, 84);
        rect(120, 280, 20, 40)
        //NECKLACE
        fill(255, 238, 84);
        rect(180, 480, 160, 20)
    } else {
        //NOTHING)
    }
}
//ADDING JEWELRY AT CLICK
function mouseClicked() {
    hasClicked = true
}