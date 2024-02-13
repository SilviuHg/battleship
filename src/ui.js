import gameController from "./game";
import ship from "./ship";
const boardOne = document.querySelector(".boardOne");
const boardTwo = document.querySelector(".boardTwo");
const boardThree = document.querySelector(".boardThree");
const background = document.querySelector(".waitShips");
const gameStart = document.querySelector(".game-start");
const gameEnd = document.querySelector(".game-end");
const resultMessage = document.querySelector(".game-result");
let controllerInstance = gameController();

function createGrid(board) {
  for (let i = 0; i < 100; i++) {
    const row = Math.floor(i / 10); // calculate row index
    const col = i % 10; // calculate column index
    const divs = document.createElement("div");
    divs.className = "grid-div";
    divs.dataset.row = row;
    divs.dataset.col = col;
    board.appendChild(divs);
  }
}

function renderBoard(parent, gameBoard) {
  const cellElements = parent.querySelectorAll(".grid-div"); // selects all cells from one board
  const board = gameBoard.getBoard();
  for (let i = 0; i < cellElements.length; i++) {
    const row = Math.floor(i / 10);
    const col = i % 10;

    if (board[row][col][0] !== null && board[row][col][1] === true) {
      // check if cell contains a ship and has been hit
      cellElements[i].style.backgroundColor = "#f87171";
    } else if (board[row][col][0] !== null) {
      // check if cell contains a ship
      cellElements[i].style.backgroundColor = "#52525b";
    } else if (board[row][col][0] === null && board[row][col][1] === true) {
      // check if cell doesn't contain a ship and has been hit
      cellElements[i].style.backgroundColor = "#86efac";
    } else {
      // reset the color if the cell is empty and hasn't been hit
      cellElements[i].style.backgroundColor = "";
    }
  }
}

function renderComputerBoard() {
  const cellElements = boardTwo.querySelectorAll(".grid-div");
  const board = controllerInstance.playerTwoGameboard.getBoard();
  for (let i = 0; i < cellElements.length; i++) {
    const row = Math.floor(i / 10);
    const col = i % 10;

    if (board[row][col][0] !== null && board[row][col][1] === true) {
      // check if cell contains a ship and has been hit
      cellElements[i].style.backgroundColor = "#f87171";
    } else if (board[row][col][0] === null && board[row][col][1] === true) {
      // check if cell doesn't contain a ship and has been hit
      cellElements[i].style.backgroundColor = "#86efac";
    } else {
      // reset the color if the cell doesn't contain a ship
      cellElements[i].style.backgroundColor = "";
    }
  }
}

function displayController() {
  const cellElements = boardTwo.querySelectorAll(".grid-div");

  cellElements.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      controllerInstance.playRound([
        parseInt(e.target.dataset.row),
        parseInt(e.target.dataset.col),
      ]);
      renderBoard(boardOne, controllerInstance.playerOneGameboard); // update boards after each hit
      renderComputerBoard();

      // if game is over set result and add game end section
      setGameResult();
      if (controllerInstance.getIsOver()) {
        gameEnd.classList.remove("not-active");
        background.classList.remove("not-active");
      }
    });
  });
}

function shipPlacement() {
  const cellElements = boardThree.querySelectorAll(".grid-div");
  let shipLengths = [5, 4, 3, 3, 2];

  cellElements.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      // proceed only if there are still ships to be placed
      if (shipLengths.length > 0) {
        const currentShipLength = shipLengths[0];
        const placementSucces = controllerInstance.playerOneGameboard.placeShip(
          [parseInt(e.target.dataset.row), parseInt(e.target.dataset.col)],
          ship(currentShipLength),
          controllerInstance.playerOneGameboard.getOrientation()
        );

        if (placementSucces) {
          renderBoard(boardThree, controllerInstance.playerOneGameboard);
          renderBoard(boardOne, controllerInstance.playerOneGameboard);

          // shift the shipLength only if placement was successful
          shipLengths.shift();
        }
      }

      if (shipLengths.length === 0) {
        background.classList.add("not-active");
        gameStart.classList.add("not-active");
      }
    });
  });
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function restartGame() {
  controllerInstance.reset();
  removeAllChildNodes(boardOne);
  removeAllChildNodes(boardTwo);
  removeAllChildNodes(boardThree);
  createGrid(boardOne);
  createGrid(boardTwo);
  createGrid(boardThree);
  controllerInstance.placeRandomShips();
  renderBoard(boardOne, controllerInstance.playerOneGameboard);
  renderBoard(boardThree, controllerInstance.playerOneGameboard);
  displayController();
  shipPlacement();
  background.classList.remove("not-active");
  gameStart.classList.remove("not-active");
  gameEnd.classList.add("not-active");
}

function setGameResult() {
  if (controllerInstance.getResult() === "You won!") {
    resultMessage.textContent = "You won!";
  }
  if (controllerInstance.getResult() === "You lost!") {
    resultMessage.textContent = "You lost!";
  }
}

const uiLoad = function () {
  const rotateBtn = document.querySelector("#rotate");
  const restartBtn = document.querySelector("#restart");

  createGrid(boardOne);
  createGrid(boardTwo);
  createGrid(boardThree);
  controllerInstance.placeRandomShips();
  displayController();
  shipPlacement();

  rotateBtn.addEventListener("click", () => {
    controllerInstance.playerOneGameboard.toggleOrientation();
  });

  restartBtn.addEventListener("click", () => {
    restartGame();
  });
};

export default uiLoad;
