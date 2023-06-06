const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/smallest-range-i/

/**
 * Return the minimum score of nums after applying the mentioned operation at most once for each index in it.
 * @param {number[]} nums 1 <= nums.length <= 10,000, 0 <= nums[i] <= 10,000
 * @param {number} k 0 <= k <= 10,000
 * @return {number}
 */
const smallestRangeI = function (nums, k) {
  if (nums.length === 1) return 0;

  const max = Math.max(...nums);
  const min = Math.min(...nums);

  if (max - min <= 2 * k) return 0;
  return max - min - 2 * k;
};

describe("smallestRangeI", function () {
  test("Test Case 1", function () {
    const nums = [1],
      k = 0;
    const actual = smallestRangeI(nums, k);
    const expected = 0;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const nums = [0, 10],
      k = 2;
    const actual = smallestRangeI(nums, k);
    const expected = 6;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const nums = [1, 3, 6],
      k = 3;
    const actual = smallestRangeI(nums, k);
    const expected = 0;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 4", function () {
    const nums = [2, 7, 2],
      k = 1;
    const actual = smallestRangeI(nums, k);
    const expected = 3;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 5", function () {
    const nums = [9, 9, 2, 8, 7],
      k = 4;
    const actual = smallestRangeI(nums, k);
    const expected = 0;
    assert.strictEqual(actual, expected);
  });
});
