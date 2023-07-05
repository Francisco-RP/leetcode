const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/longest-even-odd-subarray-with-threshold/

/**
 * @param {number[]} nums
 * @param {number} threshold
 * @return {number}
 */
const longestAlternatingSubarray = function (nums, threshold) {
  let largest = 0;

  for (let i = 0; i < nums.length; i++) {
    let current = 0;

    if (nums[i] > threshold || nums[i] % 2 !== 0) continue;
    current = 1;

    for (let n = i + 1; n < nums.length; n++) {
      if (nums[n] <= threshold && nums[n] % 2 !== nums[n - 1] % 2) {
        current += 1;
      } else {
        break;
      }
    }
    largest = Math.max(current, largest);
  }
  return largest;
};

describe("longestAlternatingSubarray", function () {
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
    const nums = [3, 2, 5, 4],
      threshold = 5;
    const actual = longestAlternatingSubarray(nums, threshold);
    const expected = 3;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const nums = [1, 2],
      threshold = 2;
    const actual = longestAlternatingSubarray(nums, threshold);
    const expected = 1;
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const nums = [2, 3, 4, 5],
      threshold = 4;
    const actual = longestAlternatingSubarray(nums, threshold);
    const expected = 3;
    isEqual(actual, expected);
  });

  test("Test Case 4", function () {
    const nums = [1],
      threshold = 1;
    const actual = longestAlternatingSubarray(nums, threshold);
    const expected = 0;
    isEqual(actual, expected);
  });

  test("Test Case 5", function () {
    const nums = [2, 2],
      threshold = 18;
    const actual = longestAlternatingSubarray(nums, threshold);
    const expected = 1;
    isEqual(actual, expected);
  });
});
