const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/minimum-score-by-changing-two-elements/

/**
 * @param {number[]} nums min length of 3, max length of 10**5
 * @return {number}
 */
const minimizeSum = function (nums) {
  nums.sort((a, b) => a - b);

  // example: [1, 4, 7, 8, 5];
  // |7 - 1| = 6
  const one = nums.at(-3) - nums[0];

  // |8 - 4| = 4
  const two = nums.at(-2) - nums[1];

  // |5 - 7| = 3
  const three = nums.at(-1) - nums[2];
  return Math.min(one, two, three);
};

describe("minimizeSum", function () {
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
    const nums = [1, 4, 3];
    const actual = minimizeSum(nums);
    const expected = 0;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const nums = [1, 4, 7, 8, 5];
    const actual = minimizeSum(nums);
    const expected = 3;
    isEqual(actual, expected);
  });
});
