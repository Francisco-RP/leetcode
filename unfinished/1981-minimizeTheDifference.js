const assert = require("assert");

// https://leetcode.com/problems/minimize-the-difference-between-target-and-chosen-elements/

/**
 * You are given an `m x n` integer matrix `mat` and an integer `target`.
 *
 * Choose one integer from each row in the matrix such that the absolute difference between `target`
 * and the sum of the chosen elements is minimized.
 *
 * Return the _minimum absolute difference_.
 *
 * The absolute difference between two numbers `a` and `b` is the absolute value of `a - b`.
 *
 * @param {number[][]} mat
 * @param {number} target
 * @return {number}
 */
const minimizeTheDifference = function (mat, target) {
  // handle single row matrix
  if (mat.length === 1) {
    let n = Math.abs(mat[0][0] - target);
    for (let i = 1; i < mat[0].length; i++) {
      const x = Math.abs(mat[0][i] - target);
      if (x === 0) return 0;
      if (x < n) n = x;
    }
    return n;
  }

  // handle single column matrix
  if (mat[0].length === 1) {
    return Math.abs(sum(mat.flat()) - target);
  }

  // handle multi-row and mult-column matrix
  let min;

  const memo = new Array(mat.length).fill([]);

  function check(row, sumSoFar) {
    console.log(row, sumSoFar);
    if (mat[row]) {
      mat[row].forEach((v) => {
        if (!memo[row][sumSoFar]) {
          memo[row][sumSoFar] = 1;
          check(row + 1, sumSoFar + v);
        }
      });
    }
  }
  console.log(memo);
  check(0, 0);

  return min;
};

/**
 * @param {number[]} arr
 */
function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

describe("minimizeTheDifference", function () {
  it.only("Test Case 1", function () {
    const actual = minimizeTheDifference(
      [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
      13
    );
    const expected = 0;
    assert.strictEqual(actual, expected);
  });

  it("Test Case 2", function () {
    const actual = minimizeTheDifference([[1], [2], [3]], 100);
    const expected = 94;
    assert.strictEqual(actual, expected);
  });

  it("Test Case 3", function () {
    const actual = minimizeTheDifference([[1, 2, 9, 8, 7]], 6);
    const expected = 1;
    assert.strictEqual(actual, expected);
  });

  it("Test Case 4", function () {
    const actual = minimizeTheDifference(
      [
        [3, 5],
        [5, 10],
      ],
      47
    );
    const expected = 32;
    assert.strictEqual(actual, expected);
  });
});
