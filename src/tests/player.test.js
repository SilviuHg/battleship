import ship from "../ship";
import player from "../player";

test("test attacks", () => {
  const playerOne = player();
  const playerTwo = player();
  const myShip = ship(3);

  playerTwo.getGameBoard().placeShip([0, 1], myShip, false);
  playerOne.attack([0, 1], playerTwo.getGameBoard());
  playerOne.attack([0, 2], playerTwo.getGameBoard());
  playerOne.attack([0, 3], playerTwo.getGameBoard());

  expect(playerTwo.getGameBoard().allShipsSunk()).toBe(true);
});

test("test random attack", () => {
  const playerOne = player();
  const playerTwo = player();
  const myShip = ship(3);
  const playerTwoBoard = playerTwo.getGameBoard().getBoard();

  playerTwo.getGameBoard().placeShip([0, 1], myShip, false);
  playerOne.randomAttack(playerTwo.getGameBoard());

  function checkHits() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (playerTwoBoard[i][j][1] === true) {
          return true; // if a cell was hit, return true
        }
      }
    }
  }
  expect(checkHits()).toBe(true);
});
