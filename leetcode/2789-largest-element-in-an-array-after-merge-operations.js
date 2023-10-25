const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/largest-element-in-an-array-after-merge-operations/

/**
 * @param {number[]} nums
 * @return {number}
 */
const maxArrayValue = function (nums) {
  if (nums.length === 1) return nums[0];
  let i = nums.length - 1;

  while (i > 0) {
    if (nums[i - 1] <= nums[i]) {
      nums[i] = nums[i - 1] + nums[i];
      nums.splice(i - 1, 1);
    }
    i -= 1;
  }

  return Math.max(...nums);
};

describe("maxArrayValue", function () {
  /**
   * @param {unknown} actual
   * @param {unknown} expected
   */
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
    const nums = [2, 3, 7, 9, 3];
    const actual = maxArrayValue(nums);
    const expected = 21;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const nums = [5, 3, 3];
    const actual = maxArrayValue(nums);
    const expected = 11;
    isEqual(actual, expected);
  });
});
