const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/smallest-index-with-equal-value/

/**
 * Given a 0-indexed integer array `nums`, return the smallest index `i` of `nums` such that
 * `i mod 10 == nums[i]`,
 * or
 * `-1` if such index does not exist.
 * @param {number[]} nums 1 <= nums.length <= 100, 0 <= nums[i] <= 9
 * @return {number}
 */
const smallestEqual = function (nums) {
  let result = -1; // 1 <= nums.length <= 100
  nums.every((n, i) => {
    if (i % 10 === n) {
      result = i;
      return false;
    }
    return true;
  });
  return result;
};

describe("smallestEqual", function () {
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
    const nums = [0, 1, 2];
    const actual = smallestEqual(nums);
    const expected = 0;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const nums = [4, 3, 2, 1];
    const actual = smallestEqual(nums);
    const expected = 2;
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const actual = smallestEqual(nums);
    const expected = -1;
    isEqual(actual, expected);
  });
});
