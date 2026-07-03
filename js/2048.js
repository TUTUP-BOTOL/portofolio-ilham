function DuaRibuEmpatLapan() {
    const board = document.getElementById("board");
    const restart = document.getElementById("restart");

    let grid = [];

    const colors = {
        0: "bg-[#cdc1b4]",
        2: "bg-[#eee4da]",
        4: "bg-[#ede0c8]",
        8: "bg-[#f2b179]",
        16: "bg-[#f59563]",
        32: "bg-[#f67c5f]",
        64: "bg-[#f65e3b]",
        128: "bg-[#edcf72]",
        256: "bg-[#edcc61]",
        512: "bg-[#edc850]",
        1024: "bg-[#edc53f]",
        2048: "bg-[#edc22e]"
    };

    function init() {

        grid = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];

        addNumber();
        addNumber();
        draw();

    }

    function draw() {

        board.innerHTML = "";

        grid.forEach(row => {

            row.forEach(value => {

                const cell = document.createElement("div");

                cell.className = `
                w-20
                h-20
                rounded-lg
                flex
                justify-center
                items-center
                text-2xl
                font-bold
                ${colors[value] || "bg-yellow-400"}
                ${value <= 4 ? "text-gray-700" : "text-white"}
            `;

                cell.textContent = value === 0 ? "" : value;

                board.appendChild(cell);

            });

        });

    }

    function addNumber() {

        let empty = [];

        for (let r = 0; r < 4; r++) {

            for (let c = 0; c < 4; c++) {

                if (grid[r][c] == 0) {

                    empty.push({ r, c });

                }

            }

        }

        if (empty.length == 0) return;

        const random = empty[Math.floor(Math.random() * empty.length)];

        grid[random.r][random.c] = Math.random() < 0.9 ? 2 : 4;

    }

    function slide(row) {

        row = row.filter(v => v);

        for (let i = 0; i < row.length - 1; i++) {

            if (row[i] == row[i + 1]) {

                row[i] *= 2;
                row[i + 1] = 0;

            }

        }

        row = row.filter(v => v);

        while (row.length < 4) {

            row.push(0);

        }

        return row;

    }

    function rotate() {

        let newGrid = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];

        for (let r = 0; r < 4; r++) {

            for (let c = 0; c < 4; c++) {

                newGrid[r][c] = grid[3 - c][r];

            }

        }

        grid = newGrid;

    }

    function moveLeft() {

        let before = JSON.stringify(grid);

        for (let i = 0; i < 4; i++) {

            grid[i] = slide(grid[i]);

        }

        if (before != JSON.stringify(grid)) {

            addNumber();

        }

    }

    function moveRight() {

        let before = JSON.stringify(grid);

        for (let i = 0; i < 4; i++) {

            grid[i].reverse();
            grid[i] = slide(grid[i]);
            grid[i].reverse();

        }

        if (before != JSON.stringify(grid)) {

            addNumber();

        }

    }

    function moveUp() {

        rotate();
        rotate();
        rotate();

        moveRight();

        rotate();

    }

    function moveDown() {

        rotate();
        rotate();
        rotate();

        moveLeft();

        rotate();

    }

    document.addEventListener("keydown", (e) => {

        switch (e.key) {

            case "ArrowLeft":
                moveLeft();
                break;

            case "ArrowRight":
                moveRight();
                break;

            case "ArrowUp":
                moveUp();
                break;

            case "ArrowDown":
                moveDown();
                break;

            default:
                return;

        }

        draw();

    });

    restart.onclick = init;

    init();
}