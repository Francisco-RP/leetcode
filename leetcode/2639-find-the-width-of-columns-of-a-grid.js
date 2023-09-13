const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/find-the-width-of-columns-of-a-grid/

/**
 * @param {number[][]} grid
 * @return {number[]}
 */
const findColumnWidth = function (grid) {
  /**
   * @type {number[]}
   */
  const result = Array(grid[0].length).fill(0);
  for (const row of grid) {
    for (let i = 0; i < row.length; i++) {
      const col = String(row[i]);
      result[i] = Math.max(col.length, result[i]);
    }
  }
  return result;
};

describe("findColumnWidth", function () {
  /**
   * @param {unknown} actual
   * @param {unknown} expected
   */
  function isEqual(actual, expected) {
    try {
      assert.deepStrictEqual(actual, expected);
    } catch (e) {
      // only want to console log failing test info
      console.log("actual", actual);
      console.log("expected", expected);
      throw e;
    }
  }

  test("Test Case 1", function () {
    const grid = [[1], [22], [333]];
    const actual = findColumnWidth(grid);
    const expected = [3];
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const grid = [
      [-15, 1, 3],
      [15, 7, 12],
      [5, 6, -2],
    ];
    const actual = findColumnWidth(grid);
    const expected = [3, 1, 2];
    isEqual(actual, expected);
  });
});
