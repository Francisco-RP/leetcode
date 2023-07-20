const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/number-of-ways-to-split-array/

/**
 * @param {number[]} nums
 * @return {number}
 */
const waysToSplitArray = function (nums) {
  let result = 0;
  let leftSum = nums[0];
  let rightSum = nums.slice(1).reduce((sum, n) => sum + n, 0);

  if (leftSum >= rightSum) result += 1;

  let i = 1;
  while (i < nums.length - 1) {
    leftSum += nums[i];
    rightSum -= nums[i];
    if (leftSum >= rightSum) result += 1;
    i += 1;
  }

  return result;
};

describe("waysToSplitArray", function () {
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
    const nums = [10, 4, -8, 7];
    const actual = waysToSplitArray(nums);
    const expected = 2;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const nums = [2, 3, 1, 0];
    const actual = waysToSplitArray(nums);
    const expected = 2;
    isEqual(actual, expected);
  });
});
