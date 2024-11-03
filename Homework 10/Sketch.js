let leftLegSpeed, rightLegSpeed, leftArmSpeed, rightArmSpeed;
let leftLegX, rightLegX, leftArmY, rightArmY;
let sunglassesX, sunglassesY;
let sunglassesSpeedX, sunglassesSpeedY;
let titleSize = 40;
let titleDirection = 1;
let titleCounter = 0;
let headSize = 60;
let headDirection = 1;
let headCounter = 0;
let textX, textY;
let textSpeedX, textSpeedY;
let headColor, sunglassesColor, shirtColor, pantsColor, shoeColor, skinColor;

function setup() {
    createCanvas(400, 500);
    background(200);
    leftLegSpeed = random(1, 3);
    rightLegSpeed = random(1, 3);
    leftArmSpeed = random(1, 3);
    rightArmSpeed = random(1, 3);
    leftLegX = -30;
    rightLegX = 10;
    leftArmY = 50;
    rightArmY = 50;
    sunglassesX = 0;
    sunglassesY = 0;
    sunglassesSpeedX = random(1, 3);
    sunglassesSpeedY = random(1, 3);
    textX = width / 1.3;
    textY = height / 2 + 130;
    textSpeedX = 1;
    textSpeedY = 0;
    headColor = color(255, 220, 185);
    sunglassesColor = color(0);
    shirtColor = color(100, 150, 200);
    pantsColor = color(50, 100, 150);
    shoeColor = color(0);
    skinColor = color(255, 220, 185);
}

function draw() {
    background(200);
    drawPerson(width / 2, height / 2);
    displayText();
    moveLimbs();
    moveSunglasses();
    animateTitle();
    moveText();
    animateHead();
}

function drawPerson(x, y) {
    // Head (circle)
    fill(headColor); // Skin color
    ellipse(x, y - 30, headSize, headSize); // Head (larger)

    // Sunglasses (two triangles)
    fill(sunglassesColor); // Black color for sunglasses
    triangle(x - 20 + sunglassesX, y - 35 + sunglassesY, x - 5 + sunglassesX, y - 30 + sunglassesY, x - 20 + sunglassesX, y - 25 + sunglassesY); // Left sunglass
    triangle(x + 20 + sunglassesX, y - 35 + sunglassesY, x + 5 + sunglassesX, y - 30 + sunglassesY, x + 20 + sunglassesX, y - 25 + sunglassesY); // Right sunglass

    // Smirk (arc)
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(x, y - 20, 25, 25, 0, PI); // Smirk (larger)
    // Nose (Point)
    point(200, 230)
    fill(255, 150, 150);
    // Hair (lines)
    stroke(0); // Black color for hair
    strokeWeight(5);

    line(x - 10, y - 50, x - 5, y - 60); // Hair strand left
    line(x + 10, y - 50, x + 5, y - 60); // Hair strand right

    // Body (rectangle)
    fill(shirtColor); // Shirt color
    rect(x - 30, y + 10, 60, 80); // Body (larger)

    // Left Arm (rectangle)
    fill(skinColor); // Skin color
    rect(x - 60, y + leftArmY, 25, 15); // Left arm (wider)
    // Right Arm (rectangle)
    rect(x + 35, y + rightArmY, 25, 15); // Right arm (wider)

    // Legs (rectangles)
    fill(pantsColor); // Pants color
    rect(x + leftLegX, y + 90, 20, 70); // Left leg (larger)
    rect(x + rightLegX, y + 90, 20, 70); // Right leg (larger)

    // Feet (rectangles)
    fill(shoeColor); // Shoe color
    rect(x + leftLegX, y + 160, 20, 8); // Left foot (larger)
    rect(x + rightLegX, y + 160, 20, 8); // Right foot (larger)
}

function displayText() {
    fill(0);
    textSize(titleSize);
    textAlign(LEFT, TOP);
    text("Self Portrait", 10, 10);

    textSize(25);
    textAlign(CENTER, CENTER);
    text("- Mark Harding", textX, textY);
}

function moveLimbs() {
    leftLegX += leftLegSpeed;
    rightLegX -= rightLegSpeed;
    leftArmY += leftArmSpeed;
    rightArmY -= rightArmSpeed;

    if (leftLegX > 30 || leftLegX < -30) {
        leftLegSpeed *= -1;
        changeColors();
    }
    if (rightLegX > 30 || rightLegX < -30) {
        rightLegSpeed *= -1;
        changeColors();
    }
    if (leftArmY > 70 || leftArmY < 50) {
        leftArmSpeed *= -1;
        changeColors();
    }
    if (rightArmY > 70 || rightArmY < 50) {
        rightArmSpeed *= -1;
        changeColors();
    }
}

function moveSunglasses() {
    sunglassesX += sunglassesSpeedX;
    sunglassesY += sunglassesSpeedY;

    if (sunglassesX > 20 || sunglassesX < -20) {
        sunglassesSpeedX *= -1;
        changeColors();
    }
    if (sunglassesY > 20 || sunglassesY < -20) {
        sunglassesSpeedY *= -1;
        changeColors();
    }
}

function animateTitle() {
    titleSize += titleDirection;
    if (titleSize > 50 || titleSize < 40) {
        titleDirection *= -1;
        titleCounter++;
    }
    if (titleCounter >= 10) {
        titleCounter = 0;
        titleDirection *= -1;
    }
}

function moveText() {
    textX += textSpeedX;
    textY += textSpeedY;

    if (textX > width - 50) {
        textSpeedX = 0;
        textSpeedY = 1;
    } else if (textY > height - 50) {
        textSpeedX = -1;
        textSpeedY = 0;
    } else if (textX < 50) {
        textSpeedX = 0;
        textSpeedY = -1;
    } else if (textY < height / 2 + 130) {
        textSpeedX = 1;
        textSpeedY = 0;
    }
}

function animateHead() {
    headSize += headDirection;
    if (headSize > 70 || headSize < 50) {
        headDirection *= -1;
        headCounter++;
    }
    if (headCounter >= 10) {
        headCounter = 0;
        headDirection *= -1;
    }
}

function changeColors() {
    sunglassesColor = color(random(255), random(255), random(255));
    shirtColor = color(random(255), random(255), random(255));
    pantsColor = color(random(255), random(255), random(255));
    shoeColor = color(random(255), random(255), random(255));
   
}

