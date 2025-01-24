const paddleLeft = document.getElementById('paddle-left');
const paddleRight = document.getElementById('paddle-right');
const ball = document.getElementById('ball');
const playerScore = document.getElementById('player-score');
const computerScore = document.getElementById('computer-score');

let ballX = 392.5;
let ballY = 192.5;
let ballSpeedX = 4;
let ballSpeedY = 4;
let paddleLeftY = 160;
let paddleRightY = 160;
const paddleSpeed = 10;
const paddleHeight = 80;
const gameHeight = 400;
const gameWidth = 800;

function update() {
    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom walls
    if (ballY <= 0 || ballY >= 385) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (
        ballX <= 20 && ballY >= paddleLeftY && ballY <= paddleLeftY + paddleHeight ||
        ballX >= 765 && ballY >= paddleRightY && ballY <= paddleRightY + paddleHeight
    ) {
        ballSpeedX = -ballSpeedX;
    }

    // Ball out of bounds (score)
    if (ballX <= 0) {
        computerScore.textContent = parseInt(computerScore.textContent) + 1;
        resetBall();
    }
    if (ballX >= 785) {
        playerScore.textContent = parseInt(playerScore.textContent) + 1;
        resetBall();
    }

    // Computer paddle movement
    if (paddleRightY + paddleHeight / 2 < ballY) {
        paddleRightY += paddleSpeed;
    } else {
        paddleRightY -= paddleSpeed;
    }

    // Update positions
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
    paddleLeft.style.top = paddleLeftY + 'px';
    paddleRight.style.top = paddleRightY + 'px';

    requestAnimationFrame(update);
}

function resetBall() {
    ballX = 392.5;
    ballY = 192.5;
    ballSpeedX = -ballSpeedX;
}

// Player paddle movement
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && paddleLeftY > 0) {
        paddleLeftY -= paddleSpeed;
    }
    if (e.key === 'ArrowDown' && paddleLeftY < gameHeight - paddleHeight) {
        paddleLeftY += paddleSpeed;
    }
});

update();
