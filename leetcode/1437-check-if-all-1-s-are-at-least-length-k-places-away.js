const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/check-if-all-1s-are-at-least-length-k-places-away/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var kLengthApart = function (nums, k) {
  if (k === 0) return true;
  let count = 0;
  let firstOne = false;
  for (const n of nums) {
    if (n === 1) {
      if (count < k && firstOne) return false;
      if (!firstOne) firstOne = true;
      count = 0;
    } else {
      count += 1;
    }
  }
  return true;
};

describe("kLengthApart", function () {
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
    const nums = [1, 0, 0, 0, 1, 0, 0, 1],
      k = 2;
    const actual = kLengthApart(nums, k);
    const expected = true;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const nums = [1, 0, 0, 1, 0, 1],
      k = 2;
    const actual = kLengthApart(nums, k);
    const expected = false;
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const actual = kLengthApart([1, 1, 1, 0], 3);
    const expected = false;
    isEqual(actual, expected);
  });

  test("Test Case 4", function () {
    const actual = kLengthApart([0, 1, 0, 0, 1], 2);
    const expected = true;
    isEqual(actual, expected);
  });
});
