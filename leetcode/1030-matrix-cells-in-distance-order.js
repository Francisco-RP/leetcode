const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/matrix-cells-in-distance-order/

/**
 * @param {number} rows
 * @param {number} cols
 * @param {number} rCenter
 * @param {number} cCenter
 * @return {number[][]}
 */
var allCellsDistOrder = function (rows, cols, rCenter, cCenter) {
  // Return the coordinates of all cells in the matrix, sorted by their distance from (rCenter, cCenter)
  // from the smallest distance to the largest distance.
  // You may return the answer in any order that satisfies this condition.
  // The distance between two cells (r1, c1) and (r2, c2)
  // is |r1 - r2| + |c1 - c2|.

  // so basically what this means is the returned array always has a special order
  // index 0 is always [rCenter, cCenter]
  // followed by any [y,x] coords that are distance 1 away in any order
  // followed by any [y,x] coords that are distance 2 away in any order
  // etc..
  // so coords with the same distance can be in any order while remaining in their distance order

  /**
   * @type {Map<number, number[]>}
   */
  const map = new Map();
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const distance = Math.abs(row - rCenter) + Math.abs(col - cCenter);
      if (map.has(distance)) {
        map.get(distance).push([row, col]);
      } else {
        map.set(distance, [[row, col]]);
      }
    }
  }
  let key = 0;
  let arr = map.get(key);
  const result = [];
  while (arr) {
    result.push(...arr);
    key += 1;
    arr = map.get(key);
  }

  return result;
};

describe("allCellsDistOrder", function () {
  /**
   * @param {number[][]} arr1
   * @param {number[][]} arr2
   */
  function areMatricesEqual(arr1, arr2) {
    assert.deepStrictEqual(arr1, arr2);
  }

  test("Test Case 1", function () {
    const rows = 1,
      cols = 2,
      rCenter = 0,
      cCenter = 0;
    const actual = allCellsDistOrder(rows, cols, rCenter, cCenter);
    const expected = [
      [0, 0],
      [0, 1],
    ];
    areMatricesEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const rows = 2,
      cols = 2,
      rCenter = 0,
      cCenter = 1;
    /*
     0 , c 
     0 , 0
    */
    const actual = allCellsDistOrder(rows, cols, rCenter, cCenter);
    const expected = [
      [0, 1],
      [0, 0],
      [1, 1],
      [1, 0],
    ];
    areMatricesEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const rows = 2,
      cols = 3,
      rCenter = 1,
      cCenter = 2;
    const actual = allCellsDistOrder(rows, cols, rCenter, cCenter);
    /*
      0, 0, 0
      0, 0, c
    */
    const expected = [
      [1, 2],
      [0, 2],
      [1, 1],
      [0, 1],
      [1, 0],
      [0, 0],
    ];
    areMatricesEqual(actual, expected);
  });
});
