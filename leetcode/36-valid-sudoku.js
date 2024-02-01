const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/valid-sudoku/description/

/**
 * @param {string[][]} board
 * @return {boolean}
 */
const isValidSudoku = function (board) {
  const rowSet = new Set();

  const cols = Array(9)
    .fill(0)
    .map(() => new Set());

  const grid = Array(9)
    .fill(0)
    .map(() => new Set());

  let row = -1;
  for (let i = 0; i < 81; i++) {
    const col = i % 9;
    if (col === 0) {
      row += 1;
      rowSet.clear();
    }

    let n = board[row][col];
    if (n === ".") continue;

    // check row
    if (rowSet.has(n)) return false;
    else rowSet.add(n);

    // check col
    if (cols[col].has(n)) return false;
    else cols[col].add(n);

    let subGrid = Math.floor(col / 3 + row - (row % 3));
    if (grid[subGrid].has(n)) return false;
    else grid[subGrid].add(n);
  }

  return true;
};

describe("isValidSudoku", function () {
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
    const board = [
      ["5", "3", ".", ".", "7", ".", ".", ".", "."],
      ["6", ".", ".", "1", "9", "5", ".", ".", "."],
      [".", "9", "8", ".", ".", ".", ".", "6", "."],
      ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
      ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
      ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
      [".", "6", ".", ".", ".", ".", "2", "8", "."],
      [".", ".", ".", "4", "1", "9", ".", ".", "5"],
      [".", ".", ".", ".", "8", ".", ".", "7", "9"],
    ];
    const actual = isValidSudoku(board);
    const expected = true;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const board = [
      ["8", "3", ".", ".", "7", ".", ".", ".", "."],
      ["6", ".", ".", "1", "9", "5", ".", ".", "."],
      [".", "9", "8", ".", ".", ".", ".", "6", "."],
      ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
      ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
      ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
      [".", "6", ".", ".", ".", ".", "2", "8", "."],
      [".", ".", ".", "4", "1", "9", ".", ".", "5"],
      [".", ".", ".", ".", "8", ".", ".", "7", "9"],
    ];
    const actual = isValidSudoku(board);
    const expected = false;
    isEqual(actual, expected);
  });
});
