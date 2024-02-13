import gameboard from "./gameboard";

const player = () => {
  const playerGameBoard = gameboard();

  function getGameBoard() {
    return playerGameBoard;
  }

  function attack(coordinates, gameboard) {
    let x = coordinates[0];
    let y = coordinates[1];
    let board = gameboard.getBoard();

    if (board[x][y][1] === true) return;
    gameboard.receiveAttack(coordinates);
  }

  function randomAttack(gameboard) {
    let randomRow, randomColumn, coordinates;

    // while move is not legal, get random coordinates
    do {
      randomRow = Math.floor(Math.random() * 10);
      randomColumn = Math.floor(Math.random() * 10);
      coordinates = [randomRow, randomColumn];
    } while (!isLegalMove(randomRow, randomColumn, gameboard));

    gameboard.receiveAttack(coordinates);
  }

  // returns true if move is legal, false otherwise
  function isLegalMove(row, column, gameboard) {
    return gameboard.getBoard()[row][column][1] === false;
  }

  return { getGameBoard, attack, randomAttack };
};

export default player;
