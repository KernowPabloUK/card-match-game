document.addEventListener("DOMContentLoaded", function () {
    // start game (once start game button is clicked)
    let gameBoardContainer = document.querySelector("#gameBoardContainer");
    document
        .querySelector("#buttonStartGame")
        .addEventListener("click", startGame);
    let gameBoardHeight = 4;
    let gameBoardWidth = 4;
    let gameCardsAnimals = [
        "cow",
        "duck",
        "pig",
        "lamb",
        "chicken",
        "llama",
        "dog",
        "cat",
    ];

    function startGame() {
        // ensure gameBcontainer exists
        if (!gameBoardContainer) {
            console.error("gameBoardContainer element not found!");
            return;
        }

        // clear previous game board if exists
        gameBoardContainer.innerHTML = "";

        //randomise cards
        let randomCardArray = assignGameCardsAtRandom(gameCardsAnimals);
        let randomCardArrayIndex = 0;

        // create a matrices array (4x4 - 8unique)
        for (let row = 0; row < gameBoardHeight; row++) {
            const rowDiv = document.createElement("div");
            rowDiv.classList.add("row");

            for (let column = 0; column < gameBoardWidth; column++) {
                const cellDiv = document.createElement("div");
                cellDiv.classList.add("cell");
                cellDiv.classList.add(randomCardArray[randomCardArrayIndex]);
                randomCardArrayIndex++;
                rowDiv.appendChild(cellDiv);
            }
            gameBoardContainer.appendChild(rowDiv);
        }

    // on click, flip card, remain unless reclicked
        let cells = document.querySelectorAll(".cell");
        for (let cell of cells) {
            cell.innerHTML = "";
            cell.classList.add("HIDDEN");
            cell.addEventListener("click", function () {
                if (cell.classList.contains("UNHIDDEN")) hideCardFace(cell);
                else showCardFace(cell);
            });
        }
    }

    function assignGameCardsAtRandom(gameCards) {
        // randomise allocation of unique card pairs into matrix (Fisher-Yates alg)
        let doubledGameCards = [...gameCards, ...gameCards];

        for (let i = doubledGameCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [doubledGameCards[i], doubledGameCards[j]] = [
                doubledGameCards[j],
                doubledGameCards[i],
            ];
        }

        return doubledGameCards;
    }

    function showCardFace(currentCell) {
        currentCell.innerHTML = `<p>${currentCell.classList[1]}</p>`;
        currentCell.classList.add("UNHIDDEN");
        currentCell.classList.remove("HIDDEN");
    }

        function hideCardFace(currentCell) {
        currentCell.innerHTML = "";
        currentCell.classList.add("HIDDEN");
        currentCell.classList.remove("UNHIDDEN");
    }

    // on second click, flip second card, if matching, remain visible otherwise hide both cards

    // once all cards are flipped correctly - game over message - play again - change difficulty
});

// TODO POST 6x6 18unique // TODO POST 8x8 32unique
// TODO different themes
