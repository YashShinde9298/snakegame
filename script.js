const grid = document.querySelector('.grid');
const startBtn = document.querySelector('.start-btn');
const scoreCard = document.querySelector('.score');
const width = 10;
const numCells = width * width;
let currentSnake = [2, 1, 0];
let snakeColor = Math.floor(Math.random() * 360);
let snakeColorInc = 30;
const fruitEmojis = ["🍎", "🍏", "🍌", "🍇", "🍓", "🍊", "🍋", "🥝", "🍈", "🥥"];
let score = 0;
let fruitPosition;
console.log(fruitEmojis);

let direction = 1;
let intervalTime = 150;
let interval = 0;

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
        direction = -10;
    }
    else if (event.key === "ArrowDown") {
        direction = 10;
    }
    else if (event.key === "ArrowLeft") {
        direction = -1;
    }
    else if (event.key === "ArrowRight") {
        direction = 1;
    }
})


grid.style.width = `${width * 10 * 2}px`;
grid.style.height = `${width * 10 * 2}px`;

for (let i = 0; i < width * width; i++) {
    const cell = document.createElement("div");
    cell.style.width = `${width * 2}px`;
    cell.style.height = `${width * 2}px`;
    grid.appendChild(cell);
}

const cells = document.querySelectorAll(".grid div");

function clearFruit() {
    if (fruitPosition) {
        cells[fruitPosition].classList.remove("fruit");
        cells[fruitPosition].innerText = "";
    }
}

function generateFruit() {
    fruitPosition = Math.floor(Math.random() * 100);
    if (currentSnake.includes(fruitPosition)) {
        generateFruit();
    }
    else {
        let currentFruitEmoji = fruitEmojis[Math.floor(Math.random() * fruitEmojis.length)];
        console.log(currentFruitEmoji)
        cells[fruitPosition].classList.add("fruit");
        cells[fruitPosition].innerText = currentFruitEmoji;
    }
}

function startGame() {
    currentSnake.forEach((i) => {
        cells[i].style.background = "none";
        cells[i].classList.remove("snake");
        cells[i].innerText = "";
    })
    clearInterval(interval);
    direction = 1;
    clearFruit();
    generateFruit();

    currentSnake = [2, 1, 0];
    currentSnake.forEach((i) => {
        snakeColor += snakeColorInc % 360;
        cells[i].style.background = `hsl(${snakeColor}, 100%, 50%)`;
        cells[i].classList.add("snake");
    })
    interval = setInterval(gameLoop, intervalTime);
}

function gameLoop() {
    if (currentSnake[0] + direction >= 0 && currentSnake[0] + direction < numCells) {
        cells[currentSnake[0]].innerText = "";
        const tail = currentSnake.pop();
        cells[tail].classList.remove("snake");
        cells[tail].style.background = "none";
        currentSnake.unshift(currentSnake[0] + direction);
        console.log(currentSnake);
        cells[currentSnake[0]].classList.add("snake");
        cells[currentSnake[0]].innerText = "👀";
        snakeColor += snakeColorInc % 360;
        cells[currentSnake[0]].style.background = `hsl(${snakeColor},100%,50%)`;
        if (currentSnake[0] === fruitPosition) {
            score += 1;
            scoreCard.innerText = score;
            generateFruit();
            let newSnake = [...currentSnake, tail];
            currentSnake = [...newSnake];
        }
        else {
            grid.classList.add('shake');
        }
    }
}

startBtn.addEventListener("click", startGame)