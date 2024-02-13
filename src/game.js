import ship from "./ship";
import player from "./player";

const gameController = () => {
  const playerOne = player();
  const playerTwo = player();
  const playerOneGameboard = playerOne.getGameBoard();
  const playerTwoGameboard = playerTwo.getGameBoard();
  let isOver = false;
  let gameResult;

  const reset = () => {
    playerOneGameboard.resetBoard();
    playerTwoGameboard.resetBoard();
    isOver = false;
  };

  const getIsOver = () => {
    return isOver;
  };

  const getResult = () => {
    return gameResult;
  };

  function placeRandomShips() {
    playerTwoGameboard.randomlyPlaceShip(ship(5));
    playerTwoGameboard.randomlyPlaceShip(ship(4));
    playerTwoGameboard.randomlyPlaceShip(ship(3));
    playerTwoGameboard.randomlyPlaceShip(ship(3));
    playerTwoGameboard.randomlyPlaceShip(ship(2));
  }

  function playRound(coordinates) {
    if (playerTwoGameboard.isLegalMove(coordinates) === false || getIsOver())
      return;
    playerOne.attack(coordinates, playerTwoGameboard);
    playerTwo.randomAttack(playerOneGameboard);
    checkWinner();
  }

  function checkWinner() {
    if (playerOneGameboard.allShipsSunk() === true) {
      isOver = true;
      gameResult = "You lost!";
    }
    if (playerTwoGameboard.allShipsSunk() === true) {
      isOver = true;
      gameResult = "You won!";
    }
  }

  return {
    playerOne,
    playerTwo,
    playerOneGameboard,
    playerTwoGameboard,
    playRound,
    checkWinner,
    placeRandomShips,
    reset,
    getIsOver,
    getResult,
  };
};

export default gameController;
