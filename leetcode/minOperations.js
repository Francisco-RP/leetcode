const assert = require("node:assert");
const { describe, test: it } = require("node:test");

// URL: https://leetcode.com/problems/minimum-operations-to-make-the-array-increasing/

/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
  if (nums.length <= 1) {
    return 0;
  }

  let result = 0;
  for (let i = 1; i < nums.length; i++) {
    const last = nums[i - 1];
    const current = nums[i];
    if (current <= last) {
      nums[i] = last + 1;
      result += nums[i] - current;
    }
  }

  return result;
};

describe("minOperations", function () {
  it("Test Case 1", function () {
    const actual = minOperations([1, 1, 1]);
    const expected = 3;
    assert.strictEqual(actual, expected);
  });

  it("Test Case 2", function () {
    const actual = minOperations([1, 5, 2, 4, 1]);
    const expected = 14;
    assert.strictEqual(actual, expected);
  });

  it("Test Case 3", function () {
    const actual = minOperations([8]);
    const expected = 0;
    assert.strictEqual(actual, expected);
  });
});
