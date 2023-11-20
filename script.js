const grid = document.querySelector(".grid");
const scoreCard = document.querySelector(".score");
const controls = document.querySelectorAll(".keys button");
const startBtn = document.querySelector(".start-btn");
const highScoreCard = document.querySelector(".high-score");

let crash = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let directionX = 0, directionY = 0;
let setIntervalId;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
highScore.innerText = `HighScore : ${highScore}`;

const changeDirection = (event) => {
    if (event.key === "ArrowUp" && directionY != 1) {
        directionX = 0;
        directionY = -1;
    }
    else if (event.key === "ArrowDown" && directionY != -1) {
        directionX = 0;
        directionY = 1;
    }
    else if (event.key === "ArrowLeft" && directionX != 1) {
        directionX = -1;
        directionY = 0;
    }
    else if (event.key === "ArrowRight" && directionX != -1) {
        directionX = 1;
        directionY = 0;
    }
}

controls.forEach(key => {
    key.addEventListener("click", () => changeDirection({ key: key.dataset.key }));
})


const gameOver = () => {
    clearInterval(setIntervalId);
    startBtn.addEventListener("click", () => { location.reload(); })
}


const foodPostion = () => {
    foodX = Math.floor(Math.random() * 40) + 1;
    foodY = Math.floor(Math.random() * 40) + 1;
}


const startGame = () => {
    if (crash) return gameOver();
    let htmlMark = `<div class="food" style="grid-area:${foodY}/${foodX}"></div>`;
    if (snakeX === foodX && snakeY === foodY) {
        foodPostion();
        snakeBody.push([foodX, foodY]);
        score++;
        scoreCard.innerText = `Score : ${score}`;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("highScore", highScore);
        highScoreCard.innerText = `HighScore : ${highScore}`;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

    snakeX += directionX;
    snakeY += directionY;

    if (snakeX <= 0 || snakeX > 40 || snakeY <= 0 || snakeY > 40) {
        crash = true;
        grid.classList.add('shake');
    }

    for (let i = 0; i < snakeBody.length; i++) {
        htmlMark += `<div class="head" style="grid-area : ${snakeBody[i][1]}/ ${snakeBody[i][0]}"></div>`;
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            crash = true;
            grid.classList.add('shake');
        }
    }
    grid.innerHTML = htmlMark;
}

foodPostion();

setIntervalId = setInterval(startGame, 125);
document.addEventListener('keydown', changeDirection);

