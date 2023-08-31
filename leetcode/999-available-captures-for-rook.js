const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/available-captures-for-rook/

/**
 * @typedef {'R' | 'B' | 'p' | '.'} character
 */

/**
 * @param {character[][]} board
 * @return {number}
 */
const numRookCaptures = function (board) {
  let count = 0;

  /**
   * @type {[x:number, y:number]}
   */
  let rook = [-1, -1];
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      const char = board[y][x];
      if (char === "R") {
        rook = [x, y];
        break;
      }
    }
  }

  let rookUp = [...rook];
  let rookDown = [...rook];
  let rookLeft = [...rook];
  let rookRight = [...rook];

  /**
   *
   * @param {number[]} coord
   * @param {number} index
   * @param {-1 | 1} dir
   */
  function check(coord, index, dir) {
    if (!coord.length) return [];

    let [x, y] = coord;
    const nextX = index === 0 ? x + dir : x;
    const nextY = index === 1 ? y + dir : y;

    const nextChar = board[nextY]?.[nextX];
    if (!nextChar) return [];
    if (nextChar === "p") {
      count += 1;
      return [];
    }
    if (nextChar === "B") {
      return [];
    }
    return [nextX, nextY];
  }

  while (rookUp.length || rookDown.length || rookLeft.length || rookRight.length) {
    rookUp = check(rookUp, 1, -1);
    rookDown = check(rookDown, 1, 1);
    rookLeft = check(rookLeft, 0, -1);
    rookRight = check(rookRight, 0, 1);
  }

  return count;
};

describe("numRookCaptures", function () {
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
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", "p", ".", ".", ".", "."],
      [".", ".", ".", "R", ".", ".", ".", "p"],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", "p", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];
    const actual = numRookCaptures(board);
    const expected = 3;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const board = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", "p", "p", "p", "p", "p", ".", "."],
      [".", "p", "p", "B", "p", "p", ".", "."],
      [".", "p", "B", "R", "B", "p", ".", "."],
      [".", "p", "p", "B", "p", "p", ".", "."],
      [".", "p", "p", "p", "p", "p", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];
    const actual = numRookCaptures(board);
    const expected = 0;
    isEqual(actual, expected);
  });
});
