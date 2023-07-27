const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/make-array-zero-by-subtracting-equal-amounts/

/**
 * @param {number[]} nums
 * @return {number}
 */
const minimumOperations = function (nums) {
  const set = new Set(nums);
  return set.has(0) ? set.size - 1 : set.size;
};

describe("minimumOperations", function () {
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
    const actual = minimumOperations([1, 5, 0, 3, 5]);
    const expected = 3;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const actual = minimumOperations([0]);
    const expected = 0;
    isEqual(actual, expected);
  });
});
