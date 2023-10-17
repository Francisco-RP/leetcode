const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/frequency-of-the-most-frequent-element/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const maxFrequency = function (nums, k) {
  nums.sort((a, b) => a - b);

  let l = 0;
  let r = 0;
  let res = 0;
  let total = 0;
  while (r < nums.length) {
    total += nums[r];
    while (nums[r] * (r - l + 1) > total + k) {
      total -= nums[l];
      l += 1;
    }
    res = Math.max(res, r - l + 1);
    r += 1;
  }

  return res;
};

describe("maxFrequency", function () {
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
    const nums = [1, 2, 4],
      k = 5;
    const actual = maxFrequency(nums, k);
    const expected = 3;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const nums = [1, 4, 8, 13],
      k = 5;
    const actual = maxFrequency(nums, k);
    const expected = 2;
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const nums = [3, 9, 6],
      k = 2;
    const actual = maxFrequency(nums, k);
    const expected = 1;
    isEqual(actual, expected);
  });

  test("Test Case 4", function () {
    const nums = [
        9940, 9995, 9944, 9937, 9941, 9952, 9907, 9952, 9987, 9964, 9940, 9914, 9941,
        9933, 9912, 9934, 9980, 9907, 9980, 9944, 9910, 9997,
      ],
      k = 7925;
    const actual = maxFrequency(nums, k);
    const expected = 22;
    isEqual(actual, expected);
  });

  test("Test Case 5", function () {
    const nums = [
        9930, 9923, 9983, 9997, 9934, 9952, 9945, 9914, 9985, 9982, 9970, 9932, 9985,
        9902, 9975, 9990, 9922, 9990, 9994, 9937, 9996, 9964, 9943, 9963, 9911, 9925,
        9935, 9945, 9933, 9916, 9930, 9938, 10000, 9916, 9911, 9959, 9957, 9907, 9913,
        9916, 9993, 9930, 9975, 9924, 9988, 9923, 9910, 9925, 9977, 9981, 9927, 9930,
        9927, 9925, 9923, 9904, 9928, 9928, 9986, 9903, 9985, 9954, 9938, 9911, 9952,
        9974, 9926, 9920, 9972, 9983, 9973, 9917, 9995, 9973, 9977, 9947, 9936, 9975,
        9954, 9932, 9964, 9972, 9935, 9946, 9966,
      ],
      k = 3056;
    const actual = maxFrequency(nums, k);
    const expected = 73;
    isEqual(actual, expected);
  });
});
