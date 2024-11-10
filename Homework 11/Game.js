const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    radius: 15,
    color: 'blue',
    speed: 5
};

const squares = [
    { x: 50, y: 100, width: 30, height: 30, color: 'red', speed: 2 },
    { x: 150, y: 200, width: 40, height: 40, color: 'green', speed: 3 },
    { x: 250, y: 300, width: 50, height: 50, color: 'yellow', speed: 4 },
    { x: 350, y: 400, width: 60, height: 60, color: 'purple', speed: 5 },
    { x: 450, y: 500, width: 70, height: 70, color: 'orange', speed: 6 }
];

let keys = {};
let triangles = [];

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    triangles.push({ x: mouseX, y: mouseY });
});

function movePlayer() {
    if (keys['w'] && player.y > 0) player.y -= player.speed;
    if (keys['s'] && player.y < canvas.height - player.radius) player.y += player.speed;
    if (keys['a'] && player.x > 0) player.x -= player.speed;
    if (keys['d'] && player.x < canvas.width - player.radius) player.x += player.speed;
}

function moveSquares() {
    squares.forEach(square => {
        square.x += square.speed;
        if (square.x > canvas.width || square.x < 0) {
            square.speed *= -1;
        }
    });
}

function checkCollision() {
    squares.forEach(square => {
        const distX = Math.abs(player.x - square.x - square.width / 2);
        const distY = Math.abs(player.y - square.y - square.height / 2);

        if (distX <= (square.width / 2 + player.radius) && distY <= (square.height / 2 + player.radius)) {
            player.x = canvas.width / 2;
            player.y = canvas.height - 30;
        }
    });
}

function checkWin() {
    if (player.y <= 0) {
        alert('You Win!');
        player.x = canvas.width / 2;
        player.y = canvas.height - 30;
    }
}

function drawPlayer() {
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.closePath();
}

function drawSquares() {
    squares.forEach(square => {
        ctx.fillStyle = square.color;
        ctx.fillRect(square.x, square.y, square.width, square.height);
    });
}

function drawTriangles() {
    triangles.forEach(triangle => {
        ctx.beginPath();
        ctx.moveTo(triangle.x, triangle.y);
        ctx.lineTo(triangle.x - 10, triangle.y + 20);
        ctx.lineTo(triangle.x + 10, triangle.y + 20);
        ctx.closePath();
        ctx.fillStyle = 'black';
        ctx.fill();
    });
}

function drawExitText() {
    ctx.font = '30px Arial';
    ctx.fillStyle = 'red';
    ctx.textAlign = 'center';
    ctx.fillText('EXIT', canvas.width / 2, 40);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawSquares();
    drawTriangles();
    drawExitText();
    movePlayer();
    moveSquares();
    checkCollision();
    checkWin();
    requestAnimationFrame(draw);
}

draw();