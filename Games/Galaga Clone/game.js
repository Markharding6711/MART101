let player;
let bullets = [];
let enemies = [];
let enemyBullets = [];
let playerLives = 3;
let score = 0;
let level = 1;
let gameState = "start";
const gameWidth = 800;
const gameHeight = 600;
const playerSpeed = 5;
const bulletSpeed = 5;
let enemyBulletSpeed = 2;
let enemySpeed = 2;
let enemyFireRate = 0.005;

const rows = 5;
const cols = 10;
let activeFiringRows = [];

function setup() {
  createCanvas(gameWidth, gameHeight);
  player = new Player();
  initializeEnemies();
}

function draw() {
  background(0);

  if (gameState === "start") {
    displayStartScreen();
    return;
  }

  if (gameState === "playing") {
    player.update();
    player.show();

    fill(255);
    textSize(18);
    textAlign(LEFT, TOP);
    text("Lives: " + playerLives, 10, 10);

    textAlign(RIGHT, TOP);
    text("Score: " + score, gameWidth - 10, 10);

    textAlign(CENTER, TOP);
    textSize(18);
    text("Level: " + level, gameWidth / 2, 10);

    for (let i = bullets.length - 1; i >= 0; i--) {
      bullets[i].update();
      bullets[i].show();
      if (bullets[i].offScreen()) {
        bullets.splice(i, 1);
      } else {
        for (let j = enemies.length - 1; j >= 0; j--) {
          if (bullets[i].hits(enemies[j])) {
            score += 100;
            enemies.splice(j, 1);
            bullets.splice(i, 1);
            break;
          }
        }
      }
    }

    for (let i = enemyBullets.length - 1; i >= 0; i--) {
      enemyBullets[i].update();
      enemyBullets[i].show();
      if (enemyBullets[i].offScreen()) {
        enemyBullets.splice(i, 1);
      } else if (enemyBullets[i].hits(player)) {
        playerLives--;
        enemyBullets.splice(i, 1);

        if (playerLives <= 0) {
          gameState = "gameover";
        } else {
          player.x = width / 2;
          player.y = height - 60;
        }
      }
    }

    moveEnemies();
    enemies.forEach(enemy => enemy.show());

    if (enemies.length === 0) {
      level++;
      enemyFireRate *= 0.8;
      enemySpeed += 0.3;
      enemyBulletSpeed += 0.3;
      initializeEnemies();
    }
  }

  if (gameState === "gameover") {
    displayGameOverScreen();
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    player.setDirection(-1);
  } else if (keyCode === RIGHT_ARROW) {
    player.setDirection(1);
  }
  if (keyCode === 32) {
    bullets.push(new Bullet(player.x + player.width / 2, player.y));
  }
  if (keyCode === ENTER) {
    if (gameState === "start") {
      gameState = "playing";
    } else if (gameState === "gameover") {
      resetGame();
    }
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    player.setDirection(0);
  }
}

class Player {
  constructor() {
    this.x = width / 2;
    this.y = height - 60;
    this.width = 40;
    this.height = 30;
    this.xSpeed = 0;
  }

  update() {
    this.x += this.xSpeed * playerSpeed;
    this.x = constrain(this.x, 0, width - this.width);
  }

  setDirection(dir) {
    this.xSpeed = dir;
  }

  show() {
    fill(128, 0, 0);
    rect(this.x, this.y, this.width, this.height);
  }
}

class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 7;
    this.height = 14;
  }

  update() {
    this.y -= bulletSpeed;
  }

  show() {
    fill(255);
    rect(this.x - this.width / 2, this.y, this.width, this.height);
  }

  offScreen() {
    return this.y < 0;
  }

  hits(enemy) {
    return (this.x > enemy.x && this.x < enemy.x + enemy.width && this.y < enemy.y + enemy.height && this.y > enemy.y);
  }
}

class Enemy {
  constructor(x, y, row, speed, direction) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.row = row;
    this.direction = direction;
    this.speed = speed;
    this.lastFiredTime = 0;
    this.canFire = false;
  }

  show() {
    if (this.row % 2 === 0) {
      fill(0, 0, 255);
    } else {
      fill(255, 255, 0);
    }
    rect(this.x, this.y, this.width, this.height);
  }

  fire() {
    let currentTime = millis();

    if (this.canFire && currentTime - this.lastFiredTime >= 2000) {
      if (random() < 0.1) {
        this.lastFiredTime = currentTime;
        enemyBullets.push(new EnemyBullet(this.x + this.width / 2, this.y + this.height));
      }
    }
  }
}

class EnemyBullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 7;
    this.height = 14;
  }

  update() {
    this.y += enemyBulletSpeed;
  }

  show() {
    fill(255, 0, 0);
    rect(this.x - this.width / 2, this.y, this.width, this.height);
  }

  offScreen() {
    return this.y > height;
  }

  hits(player) {
    return (this.x > player.x && this.x < player.x + player.width && this.y < player.y + player.height && this.y > player.y);
  }
}

function moveEnemies() {
  let edgeReached = false;

  for (let enemy of enemies) {
    if (enemy.x <= 0 || enemy.x + enemy.width >= width) {
      edgeReached = true;
    }
  }

  if (edgeReached) {
    for (let enemy of enemies) {
      enemy.direction *= -1;
      enemy.y += 10;
    }
  }

  for (let enemy of enemies) {
    enemy.x += enemy.direction * enemy.speed;
  }

  for (let enemy of enemies) {
    if (activeFiringRows.includes(enemy.row)) {
      enemy.fire();
    }
  }
}

function initializeEnemies() {
  const startX = (gameWidth - (cols * 40)) / 2;
  const startY = 30;

  enemies = [];
  activeFiringRows = [];

  while (activeFiringRows.length < 2) {
    let row = floor(random(rows));
    if (!activeFiringRows.includes(row)) {
      activeFiringRows.push(row);
    }
  }

  for (let row = 0; row < rows; row++) {
    const rowSpeed = random(0.5, 1.5);
    const rowDirection = random() > 0.5 ? 1 : -1;
    for (let col = 0; col < cols; col++) {
      const xPos = startX + col * 40;
      const yPos = startY + row * 40;
      const enemy = new Enemy(xPos, yPos, row, rowSpeed, rowDirection);
      if (activeFiringRows.includes(row)) {
        enemy.canFire = true;
      }
      enemies.push(enemy);
    }
  }
}

function displayStartScreen() {
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text("Galaga Clone", gameWidth / 2, gameHeight / 3);
  textSize(18);
  text("Press ENTER to Start", gameWidth / 2, gameHeight / 2);
}

function displayGameOverScreen() {
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255, 0, 0);
  text("Game Over", gameWidth / 2, gameHeight / 2);
  textSize(18);
  text("Press ENTER to Restart", gameWidth / 2, gameHeight / 2 + 40);
}

function resetGame() {
  playerLives = 3;
  score = 0;
  level = 1;
  enemySpeed = 2;
  enemyBulletSpeed = 2;
  enemyFireRate = 0.005;
  enemies = [];
  bullets = [];
  enemyBullets = [];
  player = new Player();
  initializeEnemies();
  gameState = "playing";
}
