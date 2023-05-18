/**
 * You are given an m x n binary matrix mat of 1's (representing soldiers) and 0's (representing
 * civilians). The soldiers are positioned in front of the civilians. That is, all the 1's will
 * appear to the left of all the 0's in each row.
 *
 * A row i is weaker than a row j if one of the following is true:
 * - The number of soldiers in row i is less than the number of soldiers in row j.
 * - Both rows have the same number of soldiers and i < j.
 *
 * Return the indices of the k weakest rows in the matrix ordered from weakest to strongest.
 * @param {number[][]} mat m == mat.length, n == mat[i].length, 2 <= n, m <= 100, matrix[i][j] is either 0 or 1.
 * @param {number} k 1 <= k <= m
 * @return {number[]}
 */
var kWeakestRows = function (mat, k) {
  var i = 0,
    j,
    sum1,
    sum2,
    temp,
    pos1,
    pos2,
    matLen = mat.length;

  var summed = mat.map((m, i) => ({ pos: i, total: m.reduce((a, x) => a + x) }));

  for (; i < matLen - 1; i++) {
    for (j = i + 1; j < matLen; j++) {
      sum1 = summed[i].total;
      sum2 = summed[j].total;
      if (sum1 > sum2) {
        temp = summed[i];
        summed[i] = summed[j];
        summed[j] = temp;
        continue;
      }
      pos1 = summed[i].pos;
      pos2 = summed[j].pos;
      if (sum1 === sum2 && pos1 > pos2) {
        temp = summed[j];
        summed[j] = summed[i];
        summed[i] = temp;
      }
    }
  }

  return summed.map((s) => s.pos).slice(0, k);
};

// ------------------------------------------------------------
// https://leetcode.com/problems/the-k-weakest-rows-in-a-matrix/
const assert = require("node:assert");
const { describe, test: it } = require("node:test");

describe("kWeakestRows", function () {
  it("example 1", function () {
    const mat = [
      [1, 1, 0, 0, 0],
      [1, 1, 1, 1, 0],
      [1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 1, 1, 1, 1],
    ];
    const actual = kWeakestRows(mat, 3);
    const expected = [2, 0, 3];
    assert.deepStrictEqual(actual, expected);
  });

  it("example 2", function () {
    const mat = [
      [1, 0, 0, 0],
      [1, 1, 1, 1],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
    ];
    const actual = kWeakestRows(mat, 2);
    const expected = [0, 2];
    assert.deepStrictEqual(actual, expected);
  });

  it("failed test 1", function () {
    const mat = [
      [1, 1, 0],
      [1, 0, 0],
      [1, 0, 0],
      [1, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ];
    const actual = kWeakestRows(mat, 4);
    const expected = [5, 1, 2, 0];
    assert.deepStrictEqual(actual, expected);
  });
});
