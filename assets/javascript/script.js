document.addEventListener("DOMContentLoaded", function () {
    // start game (once start game button is clicked)
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

    let gameCardsBinary = [
        "0001",
        "0010",
        "0011",
        "0100",
        "0101",
        "0110",
        "0111",
        "1000",
    ];
    let cardTheme = null;
    let gameBoardHeight = 4;
    let gameBoardWidth = 4;

    let gameBoardContainer = document.querySelector("#gameBoardContainer");
    let cardThemeSelector = document.querySelector("#cardTheme");
    let buttonStartGame = document.querySelector("#buttonStartGame");
    buttonStartGame.addEventListener("click", startGame);

    function startGame() {
        if (cardThemeSelector.value === "animals") cardTheme = gameCardsAnimals;
        else if (cardThemeSelector.value === "binary")
            cardTheme = gameCardsBinary;
        else cardTheme = gameCardsAnimals;

        // ensure gameBcontainer exists
        if (!gameBoardContainer) {
            console.error("gameBoardContainer element not found!");
            return;
        }

        // clear previous game board if exists
        gameBoardContainer.innerHTML = "";
        buttonStartGame.innerHTML = "Restart the game?";

        //randomise cards
        let randomCardArray = assignGameCardsAtRandom(cardTheme);
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
        let firstCard = null;
        let secondCard = null;
        let lockBoard = false;

        for (let cell of cells) {
            cell.innerHTML = "";
            cell.classList.add("HIDDEN");

            cell.addEventListener("click", function () {
                if (lockBoard || cell.classList.contains("UNHIDDEN")) return;
                showCardFace(cell);
                if (!firstCard) {
                    firstCard = cell;
                    return;
                }
                secondCard = cell;
                lockBoard = true;
                // on second click, flip second card, if matching, remain visible otherwise hide both cards
                if (firstCard.classList[1] === secondCard.classList[1]) {
                    firstCard.classList.add("MATCHED");
                    secondCard.classList.add("MATCHED");
                    firstCard = null;
                    secondCard = null;
                    lockBoard = false;
                    checkGameOver();
                } else {
                    firstCard.classList.add("UNMATCHED");
                    secondCard.classList.add("UNMATCHED");
                    setTimeout(() => {
                        hideCardFace(firstCard);
                        hideCardFace(secondCard);
                        firstCard.classList.remove("UNMATCHED");
                        secondCard.classList.remove("UNMATCHED");
                        firstCard = null;
                        secondCard = null;
                        lockBoard = false;
                    }, 700);
                }
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

    // once all cards are flipped correctly - game over message - play again - change difficulty

    function checkGameOver() {
        const allCards = document.querySelectorAll(".cell");
        const allMatched = Array.from(allCards).every((card) =>
            card.classList.contains("MATCHED")
        );
        if (allMatched) {
            setTimeout(() => {
                if (
                    confirm(
                        "Congratulations! You matched all cards! Play again?"
                    )
                ) {
                    startGame();
                }
            }, 300);
        }
    }
});

// TODO POST 6x6 18unique // TODO POST 8x8 32unique
// TODO different themes
