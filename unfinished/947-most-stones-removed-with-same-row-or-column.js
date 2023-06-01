const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/

/**
 * @param {number[][]} stones
 * @return {number}
 */
const removeStones = function (stones) {
  drawGrid(makeGrid(stones));

  if (stones.length <= 1) return 0;

  const parents = {};

  for (const stone of stones) {
    const [x, y] = stone;
    const keys = findParent(x, y, parents);
    parents[`${x},${y}`] = 0;
    if (keys.length) {
      keys.forEach((key) => {
        parents[key] = parents[key] + 1;
      });
    }
  }
  console.log("parents", parents);
};

/**
 *
 * @param {number} x
 * @param {number} y
 * @param {{[key: string]: number}} parents
 */
function findParent(x, y, parents) {
  const found = [];
  for (const key in parents) {
    const [pX, pY] = key.split(",").map(Number);
    if (x === pX || y === pY) {
      found.push(key);
    }
  }
  console.log("found keyts", found);
  return found;
}

/**
 *
 * @param {number[][]} stones
 */
function makeGrid(stones) {
  // get size of grid by finding largest x and y
  const [columns] = structuredClone(stones)
    .sort((a, b) => {
      return a[0] - b[0];
    })
    .pop();
  const [, rows] = structuredClone(stones)
    .sort((a, b) => {
      return a[1] - b[1];
    })
    .pop();

  console.log(stones);

  const grid = new Array(rows + 1).fill(0).map(() => new Array(columns + 1).fill(0));

  // plot items on grid
  for (const stone of stones) {
    const [col, row] = stone;
    grid[row][col] = 1;
  }

  return grid;
}

function drawGrid(grid) {
  console.log(
    JSON.stringify(grid).replaceAll("],", "],\n").replaceAll("[[", "[\n[").replaceAll("]]", "]\n]")
  );
}

describe("removeStones", function () {
  test("Test Case 1", function () {
    const stones = [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 2],
      [2, 1],
      [2, 2],
    ];
    const actual = removeStones(stones);
    const expected = 5;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const stones = [
      [0, 0],
      [0, 2],
      [1, 1],
      [2, 0],
      [2, 2],
    ];
    const actual = removeStones(stones);
    const expected = 3;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const stones = [[0, 0]];
    const actual = removeStones(stones);
    const expected = 0;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 4", function () {
    const stones = [
      [0, 1],
      [1, 2],
      [1, 3],
      [3, 3],
      [2, 3],
      [0, 2],
    ];
    const actual = removeStones(stones);
    const expected = 5;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 5", function () {
    const stones = [
      [0, 1],
      [0, 2],
      [4, 3],
      [2, 4],
      [0, 3],
      [1, 1],
    ];
    const actual = removeStones(stones);
    const expected = 4;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 6", function () {
    const stones = [
      [0, 1],
      [1, 0],
      [1, 1],
    ];
    const actual = removeStones(stones);
    const expected = 2;
    assert.strictEqual(actual, expected);
  });
});
