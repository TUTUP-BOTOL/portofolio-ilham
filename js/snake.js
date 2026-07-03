function snakegame() {
    const canvas = document.getElementById("snake");
    const ctx = canvas.getContext("2d");

    const scoreText = document.getElementById("score");
    const gameOverText = document.getElementById("gameOver");
    const restartBtn = document.getElementById("restart");

    const grid = 20;
    const tile = canvas.width / grid;

    let snake;
    let food;
    let dx;
    let dy;
    let score;
    let game;

    function randomFood() {

        while (true) {

            let x = Math.floor(Math.random() * grid);
            let y = Math.floor(Math.random() * grid);

            let body = snake.some(part => part.x === x && part.y === y);

            if (!body) {
                return { x, y };
            }
        }

    }

    function startGame() {

        snake = [
            { x: 10, y: 10 },
            { x: 9, y: 10 },
            { x: 8, y: 10 }
        ];

        dx = 1;
        dy = 0;

        score = 0;
        scoreText.textContent = score;

        gameOverText.classList.add("hidden");

        food = randomFood();

        clearInterval(game);
        game = setInterval(update, 120);

    }

    function update() {

        const head = {
            x: snake[0].x + dx,
            y: snake[0].y + dy
        };

        // tembus dinding

        if (head.x < 0) head.x = grid - 1;
        if (head.x >= grid) head.x = 0;
        if (head.y < 0) head.y = grid - 1;
        if (head.y >= grid) head.y = 0;

        // tabrak badan

        for (let part of snake) {

            if (head.x === part.x && head.y === part.y) {

                clearInterval(game);
                gameOverText.classList.remove("hidden");
                return;

            }

        }

        snake.unshift(head);

        // makan

        if (head.x === food.x && head.y === food.y) {

            score++;
            scoreText.textContent = score;

            food = randomFood();

        } else {

            snake.pop();

        }

        draw();

    }

    function draw() {

        ctx.fillStyle = "#1f2937";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // makanan

        ctx.fillStyle = "red";

        ctx.beginPath();

        ctx.arc(
            food.x * tile + tile / 2,
            food.y * tile + tile / 2,
            tile / 2.8,
            0,
            Math.PI * 2
        );

        ctx.fill();

        // ular

        snake.forEach((part, index) => {

            ctx.fillStyle = index == 0
                ? "#22c55e"
                : "#4ade80";

            ctx.fillRect(
                part.x * tile + 1,
                part.y * tile + 1,
                tile - 2,
                tile - 2
            );

        });

    }

    document.addEventListener("keydown", e => {

        if (e.key === "ArrowUp" && dy !== 1) {
            dx = 0;
            dy = -1;
        }

        if (e.key === "ArrowDown" && dy !== -1) {
            dx = 0;
            dy = 1;
        }

        if (e.key === "ArrowLeft" && dx !== 1) {
            dx = -1;
            dy = 0;
        }

        if (e.key === "ArrowRight" && dx !== -1) {
            dx = 1;
            dy = 0;
        }

    });

    restartBtn.onclick = startGame;

    startGame();
}