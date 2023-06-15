const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix/

/**
 * @param {number[][]} grid
 * @return {number}
 */
var countNegatives = function (grid) {
  // go backwards through grid and row
  let count = 0;
  for (let i = grid.length - 1; i >= 0; i--) {
    for (let j = grid[i].length - 1; j >= 0; j--) {
      const num = grid[i][j];
      if (num < 0) {
        count++;
      } else {
        break;
      }
    }
  }
  return count;
};

describe("countNegatives", function () {
  test("Test Case 1", function () {
    const grid = [
      [4, 3, 2, -1],
      [3, 2, 1, -1],
      [1, 1, -1, -2],
      [-1, -1, -2, -3],
    ];
    const actual = countNegatives(grid);
    const expected = 8;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const grid = [
      [3, 2],
      [1, 0],
    ];
    const actual = countNegatives(grid);
    const expected = 0;
    assert.strictEqual(actual, expected);
  });
});
