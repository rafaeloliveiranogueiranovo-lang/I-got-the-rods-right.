// Canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Tamanho
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Estado do jogo
const GameState = {
MENU: "menu",
AIMING: "aiming",
SHOOTING: "shooting"
};

let gameState = GameState.MENU;

// Pontuação
let score = 0;
let highScore = 0;

// Bola
const ball = {
x: canvas.width / 2,
y: canvas.height - 120,
radius: 15,
vx: 0,
vy: 0
};

// Hastes
const rods = [];
const rodCount = 5;

// Criar hastes
function createRods() {
rods.length = 0;

for (let i = 0; i < rodCount; i++) {
rods.push({
x: Math.random() * (canvas.width - 100),
y: 100 + i * 60,
width: 100,
height: 15,
speed: 2
});
}
}

// Desenhar bola
function drawBall() {
ctx.beginPath();
ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
ctx.fillStyle = "#667eea";
ctx.fill();
}

// Desenhar hastes
function drawRods() {
ctx.fillStyle = "#ff5555";

rods.forEach(rod => {
ctx.fillRect(rod.x, rod.y, rod.width, rod.height);
});
}

// Mover hastes
function updateRods() {
rods.forEach(rod => {
rod.x += rod.speed;

if (rod.x < 0 || rod.x + rod.width > canvas.width) {
rod.speed *= -1;
}
});
}

// Física simples
function updateBall() {
ball.x += ball.vx;
ball.y += ball.vy;

ball.vy += 0.3;

// chão
if (ball.y + ball.radius > canvas.height) {
ball.y = canvas.height - ball.radius;
ball.vy *= -0.6;
}

// paredes
if (ball.x < 0 || ball.x > canvas.width) {
ball.vx *= -1;
}
}

// Colisão
function checkCollision() {
rods.forEach((rod, index) => {

if (
ball.x > rod.x &&
ball.x < rod.x + rod.width &&
ball.y - ball.radius < rod.y + rod.height &&
ball.y + ball.radius > rod.y
) {

rods.splice(index, 1);

score++;

if (score > highScore) {
highScore = score;
}

}
});
}

// Desenhar placar
function drawScore() {

ctx.font = "bold 20px Arial";

ctx.fillStyle = "white";
ctx.textAlign = "left";
ctx.fillText("Score: " + score, 20, 40);

ctx.fillStyle = "gold";
ctx.textAlign = "right";
ctx.fillText("High: " + highScore, canvas.width - 20, 40);

}

// Loop principal
function gameLoop() {

ctx.fillStyle = "#1a1a2e";
ctx.fillRect(0, 0, canvas.width, canvas.height);

if (gameState !== GameState.MENU) {

updateBall();
updateRods();
checkCollision();

drawRods();
drawBall();
drawScore();

}

requestAnimationFrame(gameLoop);

}

// Começar jogo
function startGame() {
score = 0;

ball.x = canvas.width / 2;
ball.y = canvas.height - 120;
ball.vx = 0;
ball.vy = 0;

createRods();

gameState = GameState.AIMING;
}

// Input
canvas.addEventListener("click", () => {

if (gameState === GameState.MENU) {
startGame();
}

});

// iniciar
createRods();
gameLoop();
