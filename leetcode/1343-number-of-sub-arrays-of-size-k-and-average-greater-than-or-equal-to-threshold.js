const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/description/

/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} threshold
 * @return {number} number of sub-arrays of size `k` and average greater than or equal to `threshold`.
 */
const numOfSubarrays = function (arr, k, threshold) {
  const k2 = k - 1;
  const len = arr.length;
  const target = threshold * k;

  let count = 0;
  let start = 0;
  let sum = 0;
  let i = 0;

  for (i = 0; i < len; i++) {
    sum += arr[i];
    if (i >= k2) {
      if (sum >= target) count += 1;
      sum -= arr[start];
      start += 1;
    }
  }

  return count;
};

describe("numOfSubarrays", function () {
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
    const arr = [2, 2, 2, 2, 5, 5, 5, 8],
      k = 3,
      threshold = 4;
    const actual = numOfSubarrays(arr, k, threshold);
    const expected = 3;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const arr = [11, 13, 17, 23, 29, 31, 7, 5, 2, 3],
      k = 3,
      threshold = 5;
    const actual = numOfSubarrays(arr, k, threshold);
    const expected = 6;
    isEqual(actual, expected);
  });
});
