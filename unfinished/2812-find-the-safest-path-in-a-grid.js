const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/find-the-safest-path-in-a-grid/description/

/**
 * @param {number[][]} grid
 * @return {number}
 */
const maximumSafenessFactor = function (grid) {
  const n = grid.length;
  if (grid[0][0] === 1 || grid[n - 1][n - 1] === 1) return 0;

  /**
   * cache x,y's closest theif distance
   * @type {Map<string, number>}
   */
  const dist = new Map();

  /**
   * Store location as [x:col,y:row] of all thieves in the grid
   * @type {Array<[x:number,y:number]>}
   */
  const thieves = [];
  let row = 0;
  let col = 0;
  while (row < n) {
    const val = grid[row][col];
    if (val === 1) thieves.push([col, row]);
    col += 1;
    if (col >= n) {
      col = 0;
      row += 1;
    }
  }

  // sort using the manhattan distance to the starting position
  thieves.sort((a, b) => {
    return mDis(0, 0, ...a) - mDis(0, 0, ...b);
  });

  /**
   * Get distance to closest theif by checking the current x,y
   * @param {number} x
   * @param {number} y
   * @returns {number}
   */
  function getDis(x, y) {
    const key = `${x},${y}`;
    let closest = dist.get(key);
    if (typeof closest === "undefined") {
      closest = Math.min(
        ...thieves.map((t) => {
          return mDis(x, y, ...t);
        })
      );
      dist.set(key, closest);
    }
    return closest;
  }

  // default to the farthest possible distance between 2 corners
  let maxSafe = mDis(0, 0, n - 1, n - 1);

  return maxSafe;
};

/**
 * return distance between 2 points using the Manhattan Distance formula
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @returns {number}
 */
function mDis(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

describe("maximumSafenessFactor", function () {
  /**
   * @param {unknown} actual
   * @param {unknown} expected
   */
  function isEqual(actual, expected) {
    try {
      assert.strictEqual(actual, expected);
    } catch (e) {
      // only want to console log failing test info
      console.log("actual", actual);
      console.log("expected", expected);
      throw e;
    }
  }

  test("Test Case 1", function () {
    const grid = [
      [1, 0, 0],
      [0, 0, 0],
      [0, 0, 1],
    ];
    const actual = maximumSafenessFactor(grid);
    const expected = 0;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const grid = [
      [0, 0, 1],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const actual = maximumSafenessFactor(grid);
    const expected = 2;
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const grid = [
      [0, 0, 0, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 0],
    ];
    const actual = maximumSafenessFactor(grid);
    const expected = 2;
    isEqual(actual, expected);
  });

  test("Test Case 4", function () {
    const grid = [
      [0, 1, 0, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 0, 0, 1, 0],
      [1, 0, 0, 1, 0],
      [1, 0, 0, 1, 0],
    ];
    const actual = maximumSafenessFactor(grid);
    const expected = 1;
    isEqual(actual, expected);
  });
});
