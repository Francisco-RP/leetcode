const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/find-right-interval/

/**
 * @param {number[][]} intervals
 * @return {number[]}
 */
var findRightInterval = function (intervals) {
  const results = [];
  const len = intervals.length;

  for (let i = 0; i < len; i++) {
    const endI = intervals[i][1];
    let index = -1;
    let smallestStart = 20000; // 1 <= intervals.length <= 2 * (10**4)
    for (let j = 0; j < len; j++) {
      const startJ = intervals[j][0];
      if (startJ >= endI && startJ < smallestStart) {
        index = j;
        smallestStart = startJ;
      }
    }
    results.push(index);
  }

  return results;
};

describe("findRightInterval", function () {
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
    const actual = findRightInterval([[1, 2]]);
    const expected = [-1];
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const actual = findRightInterval([
      [3, 4],
      [2, 3],
      [1, 2],
    ]);
    const expected = [-1, 0, 1];
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const actual = findRightInterval([
      [1, 4],
      [2, 3],
      [3, 4],
    ]);
    const expected = [-1, 2, -1];
    isEqual(actual, expected);
  });

  test("Test Case 4", function () {
    const actual = findRightInterval([
      [1, 2],
      [2, 3],
      [0, 1],
      [3, 4],
    ]);
    const expected = [1, 3, 0, -1];
    isEqual(actual, expected);
  });

  test("Test Case 5", function () {
    const actual = findRightInterval([
      [1, 1],
      [3, 4],
    ]);
    const expected = [0, -1];
    isEqual(actual, expected);
  });

  test("Test Case 6", function () {
    const actual = findRightInterval([[4, 4]]);
    const expected = [0];
    isEqual(actual, expected);
  });
});
