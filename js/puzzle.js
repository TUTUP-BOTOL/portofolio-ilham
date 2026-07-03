function puzzlegame() {
    const images = [
            "img/puzzle.jpg",
            "img/puzzle2.jpg",
            "img/puzzle3.jpg",
            "img/puzzle4.jpg",
            "img/puzzle5.jpg",
            "img/puzzle6.jpg"
        ];

        let currentImage = images[0];

        const boardPuzzle = document.getElementById("boardPuzzle");
        const shuffleBtn = document.getElementById("shuffleBtn");
        const resetBtn = document.getElementById("resetBtn");
        const popup = document.getElementById("winPopup");
        const playAgain = document.getElementById("playAgain");

        const size = 4;
        const total = size * size;

        let pieces = [];
        let selected = null;

        randomImage.addEventListener("click", () => {

            let randomIndex;

            do {
                randomIndex = Math.floor(Math.random() * images.length);
            } while (images[randomIndex] === currentImage);

            currentImage = images[randomIndex];

            createPuzzle();

        });

        // Membuat puzzle
        function createPuzzle() {

            boardPuzzle.innerHTML = "";
            pieces = [];

            for (let i = 0; i < total; i++) {

                const piece = document.createElement("div");

                piece.className = "piece";

                piece.dataset.correct = i;
                piece.dataset.current = i;

                piece.style.backgroundImage = `url('${currentImage}')`;
                piece.style.backgroundSize = `${size * 100}%`;

                const x = i % size;
                const y = Math.floor(i / size);

                piece.style.backgroundPosition =
                    `${(x / (size - 1)) * 100}% ${(y / (size - 1)) * 100}%`;

                piece.addEventListener("click", () => selectPiece(piece));

                pieces.push(piece);
                boardPuzzle.appendChild(piece);
            }
        }

        // Klik potongan
        function selectPiece(piece) {

            if (selected === null) {

                selected = piece;
                piece.classList.add("selected");

            } else {

                if (selected === piece) {

                    selected.classList.remove("selected");
                    selected = null;
                    return;

                }

                swapPieces(selected, piece);

                selected.classList.remove("selected");
                selected = null;

                checkWin();

            }

        }

        // Tukar posisi
        function swapPieces(a, b) {

            const parent = boardPuzzle;

            const nextA = a.nextSibling === b ? a : a.nextSibling;
            const nextB = b.nextSibling === a ? b : b.nextSibling;

            parent.insertBefore(a, nextB);
            parent.insertBefore(b, nextA);

            const temp = a.dataset.current;
            a.dataset.current = b.dataset.current;
            b.dataset.current = temp;

        }

        // Acak puzzle
        function shufflePuzzle() {

            for (let i = pieces.length - 1; i > 0; i--) {

                const j = Math.floor(Math.random() * (i + 1));

                boardPuzzle.appendChild(pieces[j]);

                pieces.splice(j, 1);

            }

            pieces = [...boardPuzzle.children];

            pieces.forEach((piece, index) => {
                piece.dataset.current = index;
            });

        }

        // Reset puzzle
        function resetPuzzle() {

            pieces.sort((a, b) => {

                return Number(a.dataset.correct) - Number(b.dataset.correct);

            });

            boardPuzzle.innerHTML = "";

            pieces.forEach((piece, index) => {

                piece.dataset.current = index;
                boardPuzzle.appendChild(piece);

            });

        }

        // Cek menang
        function checkWin() {

            const currentPieces = [...boardPuzzle.children];

            let win = true;

            currentPieces.forEach((piece, index) => {

                if (Number(piece.dataset.correct) !== index) {

                    win = false;

                }

            });

            if (win) {

                popup.classList.remove("hidden");

            }

        }

        // Event
        shuffleBtn.addEventListener("click", shufflePuzzle);

        resetBtn.addEventListener("click", resetPuzzle);

        playAgain.addEventListener("click", () => {

            popup.classList.add("hidden");
            shufflePuzzle();

        });

        // Jalankan
        createPuzzle(); 
}



