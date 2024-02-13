import ship from "../ship";
import gameboard from "../gameboard";

test("create gameboard and check the board", () => {
  const myGameBoard = gameboard();
  let testArray = [];

  for (let i = 0; i < 10; i++) {
    testArray[i] = [];
    for (let j = 0; j < 10; j++) {
      testArray[i][j] = [null, false];
    }
  }
  expect(myGameBoard.getBoard()).toEqual(testArray);
});

test("placing a ship", () => {
  const myGameBoard = gameboard();
  const myShip = ship(3);
  let testArray = [];

  for (let i = 0; i < 10; i++) {
    testArray[i] = [];
    for (let j = 0; j < 10; j++) {
      testArray[i][j] = [null, false];
    }
  }

  myGameBoard.placeShip([0, 1], myShip, false);

  testArray[0][1][0] = myShip;
  testArray[0][2][0] = myShip;
  testArray[0][3][0] = myShip;

  expect(myGameBoard.getBoard()).toEqual(testArray);
});

test("randomly placing a ship", () => {
  const myGameBoard = gameboard();
  const myShip = ship(3);
  const board = myGameBoard.getBoard();

  myGameBoard.randomlyPlaceShip(myShip);

  function checkShips() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (board[i][j][0] === myShip) {
          return true; // if myShip was placed, return true
        }
      }
    }
  }

  expect(checkShips()).toBe(true);
});

test("prevents ship placement outside board", () => {
  const myGameBoard = gameboard();
  const myShip = ship(3);

  expect(myGameBoard.isPlacementPossible(0, 8, myShip, false)).toBe(false);
  expect(myGameBoard.isPlacementPossible(9, 9, myShip, false)).toBe(false);
});

test("prevents ship placement on a taken square", () => {
  const myGameBoard = gameboard();
  const myShip = ship(3);

  myGameBoard.placeShip([0, 0], myShip, false);

  expect(myGameBoard.isPlacementPossible(0, 0, myShip, false)).toBe(false);
  expect(myGameBoard.isPlacementPossible(0, 1, myShip, false)).toBe(false);
  expect(myGameBoard.isPlacementPossible(0, 2, myShip, false)).toBe(false);
});

test("prevents ship placement in the way of taken fields", () => {
  const myGameBoard = gameboard();
  const myShip = ship(3);

  myGameBoard.placeShip([1, 1], myShip, true);

  expect(myGameBoard.isPlacementPossible(1, 0, myShip, false)).toBe(false);
  expect(myGameBoard.isPlacementPossible(2, 0, myShip, false)).toBe(false);
  expect(myGameBoard.isPlacementPossible(5, 2, myShip, true)).toBe(true);
});

test("receive an attack", () => {
  const myGameBoard = gameboard();
  const myShip = ship(3);
  const board = myGameBoard.getBoard();

  myGameBoard.placeShip([1, 1], myShip, false);
  myGameBoard.receiveAttack([1, 1]);
  myGameBoard.receiveAttack([1, 2]);

  expect(board[1][1][0].getHits()).toEqual(2);
});

test("keep track of missed shots", () => {
  const myGameBoard = gameboard();
  const myShip = ship(3);
  const board = myGameBoard.getBoard();

  myGameBoard.placeShip([1, 1], myShip, false);
  myGameBoard.receiveAttack([1, 4]);

  expect(board[1][4][1]).toEqual(true);
});

test("all ships are sunk", () => {
  const myGameBoard = gameboard();
  const myShip = ship(3);

  myGameBoard.placeShip([5, 1], myShip, false);
  expect(myGameBoard.allShipsSunk()).toBe(false);

  myGameBoard.receiveAttack([5, 1]);
  myGameBoard.receiveAttack([5, 2]);
  myGameBoard.receiveAttack([5, 3]);

  myGameBoard.placeShip([2, 1], myShip, true);
  myGameBoard.receiveAttack([3, 1]);
  myGameBoard.receiveAttack([4, 1]);
  myGameBoard.receiveAttack([5, 1]);

  expect(myGameBoard.allShipsSunk()).toBe(true);
});

test("reset board", () => {
  const myGameBoard = gameboard();
  const myShip = ship(3);
  let testArray = [];

  for (let i = 0; i < 10; i++) {
    testArray[i] = [];
    for (let j = 0; j < 10; j++) {
      testArray[i][j] = [null, false];
    }
  }

  myGameBoard.placeShip([5, 1], myShip, false);
  myGameBoard.placeShip([7, 1], myShip, false);
  myGameBoard.receiveAttack([4, 1]);
  myGameBoard.receiveAttack([5, 1]);
  myGameBoard.resetBoard();

  expect(myGameBoard.getBoard()).toEqual(testArray);
});
