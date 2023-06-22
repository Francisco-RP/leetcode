const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/find-lucky-integer-in-an-array/

/**
 * Given an array of integers arr, a lucky integer is an integer that has a frequency in the array
 * equal to its value.
 *
 * Return the largest lucky integer in the array.
 *
 * If there is no lucky integer return -1.
 *
 * @param {number[]} arr
 * @return {number}
 */
var findLucky = function (arr) {
  const count = arr.reduce((obj, n) => {
    obj[n] = (obj[n] || 0) + 1;
    return obj;
  }, {});

  let found = -1;
  for (let key in count) {
    const n = Number(key);
    if (n === count[key] && n > found) {
      found = n;
    }
  }
  return found;
};

describe("findLucky", function () {
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
    const actual = findLucky([2, 2, 3, 4]);
    const expected = 2;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const actual = findLucky([1, 2, 2, 3, 3, 3]);
    const expected = 3;
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const actual = findLucky([2, 2, 2, 3, 3]);
    const expected = -1;
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const actual = findLucky([
      3, 19, 18, 2, 9, 4, 7, 11, 15, 7, 14, 10, 11, 9, 8, 5, 4, 14, 11, 4, 16, 3, 13, 14, 14, 15, 8,
      19, 3, 5, 20, 15, 14, 10, 16, 11, 17, 20, 11, 20, 15, 3, 20, 5, 12, 2, 15, 12, 14, 16, 20, 17,
      15, 8, 18, 9, 8, 5, 12, 3, 5, 15, 14, 10, 2, 20, 20, 3, 13, 9, 1, 3, 16, 18, 14, 16, 13, 9,
      18, 13, 9, 3, 5, 19,
    ]);
    const expected = 1;
    isEqual(actual, expected);
  });
});
