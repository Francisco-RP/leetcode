const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/increment-submatrices-by-one/

/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[][]}
 */
const rangeAddQueries = function (n, queries) {
  const mat = Array(n)
    .fill()
    .map(() => Array(n).fill(0));

  for (let [r1, c1, r2, c2] of queries) {
    for (let row = r1; row < r2 + 1; row++) {
      mat[row][c1] += 1; // fills in first column
      if (c2 < n - 1) {
        mat[row][c2 + 1] -= 1;
      }
    }
  }
  for (let row = 0; row < n; row++) {
    for (let col = 1; col < n; col++) {
      mat[row][col] += mat[row][col - 1];
    }
  }

  return mat;
};

describe("rangeAddQueries", function () {
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
    const n = 3,
      queries = [
        [1, 1, 2, 2],
        [0, 0, 1, 1],
      ];
    const actual = rangeAddQueries(n, queries);
    const expected = [
      [1, 1, 0],
      [1, 2, 1],
      [0, 1, 1],
    ];
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const n = 2,
      queries = [[0, 0, 1, 1]];
    const actual = rangeAddQueries(n, queries);
    const expected = [
      [1, 1],
      [1, 1],
    ];
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const n = 13,
      queries = [
        [3, 1, 7, 3],
        [7, 5, 7, 8],
        [4, 12, 6, 12],
        [2, 8, 6, 11],
        [9, 11, 10, 11],
        [9, 3, 11, 11],
        [0, 12, 10, 12],
        [10, 5, 11, 12],
        [4, 7, 6, 12],
        [0, 2, 9, 6],
        [12, 7, 12, 11],
        [2, 7, 3, 8],
        [2, 9, 6, 12],
        [10, 7, 10, 12],
        [11, 6, 11, 7],
        [3, 2, 12, 9],
      ];
    const actual = rangeAddQueries(n, queries);
    const expected = [
      [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
      [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
      [0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
      [0, 1, 3, 3, 2, 2, 2, 2, 3, 3, 2, 2, 2],
      [0, 1, 3, 3, 2, 2, 2, 2, 3, 4, 3, 3, 4],
      [0, 1, 3, 3, 2, 2, 2, 2, 3, 4, 3, 3, 4],
      [0, 1, 3, 3, 2, 2, 2, 2, 3, 4, 3, 3, 4],
      [0, 1, 3, 3, 2, 3, 3, 2, 2, 1, 0, 0, 1],
      [0, 0, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0, 1],
      [0, 0, 2, 3, 3, 3, 3, 2, 2, 2, 1, 2, 1],
      [0, 0, 1, 2, 2, 3, 3, 4, 4, 4, 3, 4, 3],
      [0, 0, 1, 2, 2, 3, 4, 4, 3, 3, 2, 2, 1],
      [0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 0],
    ];
    isEqual(actual, expected);
  });
});
