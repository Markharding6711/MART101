function setup() {  
    createCanvas(400, 500);  
    background(200);  
}  

function draw() {  
    background(200);
 
    drawPerson(width / 2, height / 2);  
    displayText();
}  

function drawPerson(x, y) {  
    // Head (circle)  
    fill(255, 220, 185); // Skin color  
    ellipse(x, y - 30, 60, 60); // Head (larger)  

    // Sunglasses (two triangles)  
    fill(0); // Black color for sunglasses  
    triangle(x - 20, y - 35, x - 5, y -30, x - 20, y - 25); // Left sunglass  
    triangle(x + 20, y - 35, x + 5, y -30, x + 20, y - 25); // Right sunglass  

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
    fill(100, 150, 200); // Shirt color  
    rect(x - 30, y + 10, 60, 80); // Body (larger)  
    
    // Left Arm (rectangle)  
    fill(255, 220, 185); // Skin color  
    rect(x - 60, y + 50, 25, 15); // Left arm (wider)  
    // Right Arm (rectangle)  
    rect(x + 35, y + 50, 25, 15); // Right arm (wider)  

    // Legs (rectangles)  
    fill(50, 100, 150); // Pants color  
    rect(x - 30, y + 90, 20, 70); // Left leg (larger)  
    rect(x + 10, y + 90, 20, 70); // Right leg (larger)  

    // Feet (rectangles)  
    fill(0); // Shoe color  
    rect(x - 30, y + 160, 20, 8); // Left foot (larger)  
    rect(x + 10, y + 160, 20, 8); // Right foot (larger)  
}  
function displayText() {  
    fill(0);  
    textSize(40);
    textAlign(LEFT, TOP); 
    text("Mark Harding", 10, 10);
}