const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/product-of-array-except-self/description/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
const productExceptSelf = function (nums) {
  const n = nums.length;
  const result = Array(n).fill(1);
  let prefix = 1;
  let postfix = 1;

  for (let i = 0; i < n; i++) {
    result[i] = prefix;
    prefix = prefix * nums[i] || 0;
  }

  for (let i = n - 1; i >= 0; i--) {
    result[i] = result[i] * postfix || 0;
    postfix = postfix * nums[i] || 0;
  }

  return result;
};

describe("productExceptSelf", function () {
  /**
   * @param {unknown} actual
   * @param {unknown} expected
   */
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
    const nums = [1, 2, 3, 4];
    const actual = productExceptSelf(nums);
    const expected = [24, 12, 8, 6];
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const nums = [-1, 1, 0, -3, 3];
    const actual = productExceptSelf(nums);
    const expected = [0, 0, 9, 0, 0];
    isEqual(actual, expected);
  });
});
