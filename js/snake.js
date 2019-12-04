
//UI part
var popup = document.querySelector(".modal-content");
var close = popup.querySelector(".btn-exit");
var restartBtn = document.querySelector(".btn-restart");
var start = document.querySelector(".btn-start")

close.addEventListener("click", function(event) {
    event.preventDefault();
    popup.classList.remove("modal-content-show");
});
restartBtn.addEventListener("click", function(event) {
    event.preventDefault();
    popup.classList.remove("modal-content-show");
    restart();
});
start.addEventListener("click", function(event) {
    event.preventDefault();
    restart();
});

var game;
//snake part
const cvs = document.getElementById('snake');
const ctx = cvs.getContext('2d');
let unit = 10;

//creat snake
let snake = [];
snake[0] = {
    x: 9 * unit,
    y: 10 * unit
};

//creat food
let food = {
    x: Math.floor(Math.random() * 58 + 1) * unit,
    y: Math.floor(Math.random() * 56 + 3) * unit
};

//creat score
let score = 0;

//direction variable
let d;


function draw() {


    ctx.fillStyle = "#a4ccff";
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "white";
        ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
    }
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, unit, unit);

    //old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //control the snake
    if (d == "LEFT") {
        snakeX -= unit;
    } else if (d == "RIGHT") {
        snakeX += unit;
    } else if (d == "UP") {
        snakeY -= unit;
    } else {
        snakeY += unit;
    }
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 58 + 1) * unit,
            y: Math.floor(Math.random() * 56 + 3) * unit
        };
        while (true) {
            let j = 0;
            //to avoid food is randomly generated inside the snake body
            for (; j < snake.length; j++) {
                if (snake[j].x == food.x && snake[j].y == food.y) {
                    food = {
                        x: Math.floor(Math.random() * 58 + 1) * unit,
                        y: Math.floor(Math.random() * 56 + 3) * unit
                    };
                    break;
                }
            }
            if (j == snake.length) break;
        }
    } else {
        //if no food, remove tail
        snake.pop();
    }


    //game over: eat itself or hit the wall
    if (snakeX < unit || snakeX > 58 * unit || snakeY < unit || snakeY > 58 * unit || collision(newHead, snake)) {
        clearInterval(game);
        popup.classList.add("modal-content-show");
    }
    // if snake has eaten the food , we do not remove tail, instead, we add a new head
    snake.unshift(newHead);

    //show score
    ctx.fillStyle = "white";
    ctx.font = "25px Changa one";
    ctx.fillText("score: " + score, 1* unit, 2 * unit);

}

//key control
document.addEventListener("keydown", direction);

function direction(event) {
    if (event.keyCode == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (event.keyCode == 38 && d != "DOWN") {
        d = "UP";
    } else if (event.keyCode == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if (event.keyCode == 40 && d != "UP") {
        d = "DOWN";
    }
}
//check if snake eat itself
function collision(head, snake) {
    for (let i = 0; i < snake.length; i++) {
        if (head.x == snake[i].x && head.y == snake[i].y) {
            return true;
        }
    }
    return false;
}
//restart the game
function restart() {
    clearInterval(game);
    snake = [];
    snake[0] = {
        x: 29 * unit,
        y: 28 * unit
    };
    score = 0;
    ctx.fillStyle = "white";
    ctx.font = "25px Changa one";
    ctx.fillText("score: " + score, 1* unit, 2 * unit);
    game = setInterval(draw, 100);
}
//set snake speed and start the game
