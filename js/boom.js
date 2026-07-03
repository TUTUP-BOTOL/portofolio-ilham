
function boomgame() {
    const boardBoom = document.getElementById("boardBoom");
    const message = document.getElementById("message");
    const restartBoom = document.getElementById("restartBoom");

    const totalCard = 16;

    let bombIndex;
    let gameOver;

    function startGame() {

        boardBoom.innerHTML = "";
        message.textContent = "";
        gameOver = false;

        // Acak posisi bom
        bombIndex = Math.floor(Math.random() * totalCard);

        for (let i = 0; i < totalCard; i++) {

            const card = document.createElement("button");

            card.className =
                "w-20 h-20 bg-blue-600 rounded-xl text-3xl font-bold hover:bg-blue-500 transition";

            card.dataset.index = i;
            card.dataset.open = "false";

            card.innerHTML = "❓";

            card.addEventListener("click", openCard);

            boardBoom.appendChild(card);

        }

    }

    function openCard() {

        if (gameOver) return;

        if (this.dataset.open === "true") return;

        this.dataset.open = "true";

        const index = Number(this.dataset.index);

        if (index === bombIndex) {

            this.innerHTML = "💣";
            this.className =
                "w-20 h-20 bg-red-600 rounded-xl text-3xl";

            gameOver = true;

            message.textContent = "💥 Kamu Kalah!";

            revealBomb();

            return;

        }

        this.innerHTML = "⭐";
        this.className =
            "w-20 h-20 bg-green-500 rounded-xl text-3xl";

        checkWin();

    }

    function revealBomb() {

        const cards = document.querySelectorAll("#boardBoom button");

        cards.forEach(card => {

            if (Number(card.dataset.index) === bombIndex) {

                card.innerHTML = "💣";
                card.className =
                    "w-20 h-20 bg-red-600 rounded-xl text-3xl";

            }

        });

    }

    function checkWin() {

        const opened =
            document.querySelectorAll('[data-open="true"]').length;

        if (opened === totalCard - 1) {

            gameOver = true;

            message.textContent = "🎉 Selamat Kamu Menang!";

            revealBomb();

        }

    }

    console.log("Boom dijalankan");
    console.log(restartBoom);
    restartBoom.addEventListener("click", startGame);

    startGame();
}


