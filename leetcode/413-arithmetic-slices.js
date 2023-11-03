const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/arithmetic-slices/

/**
 * @param {number[]} nums
 * @return {number}
 */
const numberOfArithmeticSlices = function (nums) {
  if (nums.length < 3) return 0;

  // nums = [1,2,3,4]
  // dp   = [0,0,0,0]
  const dp = Array(nums.length).fill(0);
  let count = 0;

  // we know we need at least 3 matches so we start at index 2
  for (let i = 2; i <= dp.length - 1; i++) {
    // if nums[2] - nums[1] === nums[1] - nums[0]
    // if nums[3] - nums[2] === nums[2] - nums[2]
    if (nums[i] - nums[i - 1] === nums[i - 1] - nums[i - 2]) {
      dp[i] = 1 + dp[i - 1];
      // index: 2  dp   = [0,0,1,0]
      // index: 3  dp   = [0,0,1,2]
      count += dp[i];
    }
  }

  return count;
};

describe("numberOfArithmeticSlices", function () {
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
    const nums = [1, 2, 3, 4];
    const actual = numberOfArithmeticSlices(nums);
    const expected = 3;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const nums = [1];
    const actual = numberOfArithmeticSlices(nums);
    const expected = 0;
    isEqual(actual, expected);
  });
});
