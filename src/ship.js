const ship = (shipLength) => {
  const length = shipLength;
  let hits = 0;
  let isSunk = false;

  function getLength() {
    return length;
  }

  function getHits() {
    return hits;
  }

  function getSunk() {
    return isSunk;
  }

  function hit() {
    hits += 1;
    if (hits === length) sunk();
  }

  function sunk() {
    isSunk = true;
  }

  return { hit, sunk, getLength, getHits, getSunk };
};

export default ship;
