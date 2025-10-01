/**
* Mr. Furious
* Pippin Barr
*
* A guy who becomes visibly furious!
*/

"use strict";

// Our friend Mr. Furious
let mrFurious = {
    // Position and size
    x: 200,
    y: 200,
    size: 100,

    // Colour
    fill: {
        r: 255,
        g: 225,
        b: 225
    }
};

//shake
let shake = {
    x: 0,
    y: 0,
}

//sky colour
let sky = {
    r: 160,
    g: 180,
    b: 200
}

//bird color
let bird = {
    r: 255,
    g: 255,
    b: 0,

    //bird size
    tall: 20,
    long: 20,

    //bird position
    x: 0,
    y: 50
}

/**
* Create the canvas
*/
function setup() {
    createCanvas(400, 400);
}

/**
* Draw (and update) Mr. Furious
*/
function draw() {
    //change sky colour
    sky.r = sky.r - 2
    sky.g = sky.g - 2
    sky.b = sky.b - 2
    background(sky.r, sky.g, sky.b);

    // Draw Mr. Furious as a coloured circle
    push();
    shake.x = shake.x + .5
    shake.y = shake.y + .5
    //mrFurious.x = mrFurious.x + random(-shake.x,shake.x)
    //mrFurious.y = mrFurious.y + random(-shake.y,shake.y);
    noStroke();
    mrFurious.fill.g = mrFurious.fill.g - 2
    mrFurious.fill.b = mrFurious.fill.b - 2
    fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
    ellipse(mrFurious.x + random(-shake.x, shake.x), mrFurious.y + random(-shake.y, shake.y), mrFurious.size);
    pop();

    //draw annoying bird
    push();
    fill(bird.r, bird.g, bird.b);
    bird.x = bird.x + 20
    bird.y = bird.y + 5
    rect(bird.x, bird.y, bird.tall, bird.long);
}