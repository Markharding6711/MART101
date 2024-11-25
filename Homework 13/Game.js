var characterX = 100;  
var characterY = 100;  
var characterSize = 25; // Start size of the character  
var mouseShapeX = 0;  
var mouseShapeY = 0;  
var w = 87;   
var s = 83;  
var a = 65;  
var d = 68;  

var shapes = [  
    { x: 0, y: 0, size: 10, color: [255, 0, 0], xSpeed: 0, ySpeed: 0 },  
    { x: 0, y: 0, size: 15, color: [0, 255, 0], xSpeed: 0, ySpeed: 0 },  
    { x: 0, y: 0, size: 20, color: [0, 0, 255], xSpeed: 0, ySpeed: 0 },  
    { x: 0, y: 0, size: 25, color: [255, 255, 0], xSpeed: 0, ySpeed: 0 },  
    { x: 0, y: 0, size: 30, color: [0, 255, 255], xSpeed: 0, ySpeed: 0 }  
];  

function setup() {  
    createCanvas(500, 600);  
    shapes.forEach(shape => {  
        shape.x = Math.floor(Math.random() * (width - shape.size));  
        shape.y = Math.floor(Math.random() * (height - shape.size));  
        shape.xSpeed = Math.floor(Math.random() * 5) + 1;  
        shape.ySpeed = Math.floor(Math.random() * 5) + 1;  
        if (Math.random() > 0.5) shape.xSpeed *= -1;  
        if (Math.random() > 0.5) shape.ySpeed *= -1;  
    });  
    createCharacter(200, 350);  
}  

function draw() {  
    background(200);  
    stroke(0);  
    fill(0);  
    createBorders(10);  
    textSize(16);  
    text("EXIT", width - 50, height - 50);  
    drawCharacter();  
    characterMovement();  
    moveAndDrawShapes();  
    checkWinCondition();  
    fill(120, 130, 140);  
    circle(mouseShapeX, mouseShapeY, 25);  
}  

function characterMovement() {  
    if (keyIsDown(w) && characterY > 0) {  
        characterY -= 10;   
    }  
    if (keyIsDown(s) && characterY < height) {  
        characterY += 10;   
    }  
    if (keyIsDown(a) && characterX > 0) {  
        characterX -= 10;   
    }  
    if (keyIsDown(d) && characterX < width) {  
        characterX += 10;   
    }  
}  

function createCharacter(x, y) {  
    characterX = x;  
    characterY = y;  
}  

function drawCharacter() {  
    fill(23, 40, 123);  
    circle(characterX, characterY, characterSize);  
}  

function createBorders(thickness) {  
    rect(0, 0, width, thickness); // top border  
    rect(0, 0, thickness, height); // left border  
    rect(0, height - thickness, width, thickness); // bottom border  
    rect(width - thickness, 0, thickness, height - 50); // right border  
}  

function moveAndDrawShapes() {  
    for (let i = shapes.length - 1; i >= 0; i--) {  
        let shape = shapes[i];  
        fill(shape.color);  
        rect(shape.x, shape.y, shape.size, shape.size);  
        shape.x += shape.xSpeed;  
        shape.y += shape.ySpeed;  

        // Check for collision with the character  
        if (collides(characterX, characterY, characterSize, shape.x, shape.y, shape.size)) {  
            // Remove the shape if it's the smallest  
            if (shape.size === 10) {  
                shapes.splice(i, 1); // Remove the shape  
                characterSize += 20; // Increase character size  
            }  
        }  

        // Wrap around the screen  
        if (shape.x > width) shape.x = 0;  
        if (shape.x < 0) shape.x = width;  
        if (shape.y > height) shape.y = 0;  
        if (shape.y < 0) shape.y = height;  
    }  
}  

function collides(cx, cy, cSize, sx, sy, sSize) {  
    // Check for collision between character and square  
    return (  
        cx < sx + sSize &&  
        cx + cSize > sx &&  
        cy < sy + sSize &&  
        cy + cSize > sy  
    );  
}  

function checkWinCondition() {  
    if (characterX > width - 50 && characterY > height - 50) {  
        fill(0);  
        stroke(5);  
        textSize(26);  
        text("You Win!", width / 2 - 50, height / 2 - 50);  
    }  
}  

function mouseClicked() {  
    // Create a new shape at the mouse click position  
    let newSize = Math.floor(Math.random() * 20) + 10; // Random size between 10 and 30  
    let newColor = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)]; // Random RGB color  
    let newShape = {  
        x: mouseX,  
        y: mouseY,  
        size: newSize,  
        color: newColor,  
        xSpeed: Math.floor(Math.random() * 5) + 1 * (Math.random() > 0.5 ? 1 : -1), // Random speed and direction  
        ySpeed: Math.floor(Math.random() * 5) + 1 * (Math.random() > 0.5 ? 1 : -1), // Random speed and direction  
    };  
    shapes.push(newShape); // Add the new shape to the array  
}  
function moveAndDrawShapes() {  
    for (let i = shapes.length - 1; i >= 0; i--) {  
        let shape = shapes[i];  
        fill(shape.color);  
        rect(shape.x, shape.y, shape.size, shape.size);  
        shape.x += shape.xSpeed;  
        shape.y += shape.ySpeed;  

        // Check for collision with the character  
        if (collides(characterX, characterY, characterSize, shape.x, shape.y, shape.size)) {  
            // Remove the shape if it's the smallest  
            if (shape.size === 10) {  
                shapes.splice(i, 1); // Remove the shape  
                characterSize += 20; // Increase character size  
            }  
        }  

        // Wrap around the screen  
        if (shape.x > width) shape.x = 0;  
        if (shape.x < 0) shape.x = width;  
        if (shape.y > height) shape.y = 0;  
        if (shape.y < 0) shape.y = height;  
    } 
}