document.addEventListener("DOMContentLoaded", function () {
    // start game (once start game button is clicked)
    let gameBoardContainer = document.querySelector("#gameBoardContainer");
    document
        .querySelector("#buttonStartGame")
        .addEventListener("click", startGame);
    let gameBoardHeight = 4;
    let gameBoardWidth = 4;
    let gameCardsAnimals = ["cow", "cow", "duck", "duck", "pig", "pig", "lamb", "lamb", "chicken", "chicken", "llama", "llama", "dog", "dog", "cat", "cat"]

    function startGame() {
        console.log("start1 button clicked");

        // ensure gameBcontainer exists
        if (!gameBoardContainer) {
            console.error("gameBoardContainer element not found!");
            return;
        }

        // clear previous game board if exists
        gameBoardContainer.innerHTML = "";

        // create a matrices array (4x4 - 8unique)
        for (let row = 0; row < gameBoardHeight; row++) {
            const rowDiv = document.createElement("div");
            rowDiv.classList.add("row");

            for (let column = 0; column < gameBoardWidth; column++) {
                const cellDiv = document.createElement("div");
                cellDiv.classList.add("cell");
                rowDiv.appendChild(cellDiv);
            }
            gameBoardContainer.appendChild(rowDiv);
        }
    // randomise allocation of unique card pairs into matrix

    }


    // on click, flip card, remain unless reclicked

    // on second click, flip card, if matching, remain visible

    // once all cards are flipped correctly - game over message - play again - change difficulty
});

// TODO POST 6x6 18unique // TODO POST 8x8 32unique
// TODO different themes
