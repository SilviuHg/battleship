const gameboard = () => {
  let board = [];
  let isVertical = false; // default to horizontal

  // creating two-dimensional array
  for (let i = 0; i < 10; i++) {
    board[i] = [];
    for (let j = 0; j < 10; j++) {
      board[i][j] = [null, false];
    }
  }

  function getBoard() {
    return board;
  }

  function getOrientation() {
    return isVertical;
  }

  function toggleOrientation() {
    isVertical = !isVertical;
  }

  function placeShip(startPos, ship, isVertical) {
    const myShip = ship;
    let x = startPos[0];
    let y = startPos[1];

    if (isPlacementPossible(x, y, myShip, isVertical)) {
      for (let i = 0; i < myShip.getLength(); i++) {
        if (isVertical) {
          board[x + i][y][0] = myShip;
        } else {
          board[x][y + i][0] = myShip;
        }
      }
      // if placement successful
      return true;
    }
    //if placement unsuccessful
    return false;
  }

  function randomlyPlaceShip(ship) {
    const myShip = ship;
    const isVertical = Math.random() < 0.5; // true for vertical, false for horizontal

    let randomRow, randomColumn, coordinates;

    do {
      randomRow = Math.floor(Math.random() * 10);
      randomColumn = Math.floor(Math.random() * 10);
      coordinates = [randomRow, randomColumn];
    } while (!isPlacementPossible(randomRow, randomColumn, myShip, isVertical));

    placeShip(coordinates, myShip, isVertical);
    return coordinates;
  }

  // returns true if move is legal, false otherwise
  function isPlacementPossible(row, column, ship, isVertical) {
    const board = getBoard();
    const shipLength = ship.getLength();

    // check if placement is out of board limits
    if (isVertical && row + shipLength > 10) {
      return false;
    }

    if (!isVertical && column + shipLength > 10) {
      return false;
    }

    // check if placement is in a way of other ships
    for (let i = 0; i < shipLength; i++) {
      if (isVertical && board[row + i][column][0] !== null) {
        return false;
      }

      if (!isVertical && board[row][column + i][0] !== null) {
        return false;
      }
    }

    // check if the starting cell is already occupied
    if (board[row][column][0] !== null) {
      return false;
    }

    return true;
  }

  function receiveAttack(coordinates) {
    let x = coordinates[0];
    let y = coordinates[1];
    const board = getBoard();

    if (board[x][y][0] !== null) {
      board[x][y][0].hit();
      board[x][y][1] = true;
    } else {
      board[x][y][1] = true;
    }
  }

  function allShipsSunk() {
    const board = getBoard();

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (board[i][j][0] !== null && !board[i][j][0].getSunk()) {
          return false; // if any ship is not sunk, return false
        }
      }
    }
    return true; // if all ships are sunk
  }

  function resetBoard() {
    const board = getBoard();

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        board[i][j] = [null, false];
      }
    }

    isVertical = false;
  }

  // returns true if move is legal, false otherwise
  function isLegalMove(coordinates) {
    let x = coordinates[0];
    let y = coordinates[1];
    return getBoard()[x][y][1] === false;
  }

  return {
    getBoard,
    getOrientation,
    toggleOrientation,
    placeShip,
    randomlyPlaceShip,
    receiveAttack,
    allShipsSunk,
    isPlacementPossible,
    isLegalMove,
    resetBoard,
  };
};

export default gameboard;
