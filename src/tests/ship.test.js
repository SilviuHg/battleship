import ship from "../ship";

test("create ship and check it's length", () => {
  expect(ship(3).getLength()).toEqual(3);
});

test("check ship being hit", () => {
  const myShip = ship(3);
  myShip.hit();
  expect(myShip.getHits()).toEqual(1);
});

test("check ship being sunk", () => {
  const myShip = ship(3);
  myShip.hit();
  myShip.hit();
  myShip.hit();
  expect(myShip.getSunk()).toBe(true);
});
