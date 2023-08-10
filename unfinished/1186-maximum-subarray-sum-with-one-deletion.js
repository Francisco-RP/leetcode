const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/maximum-subarray-sum-with-one-deletion/

/**
 * @param {number[]} arr
 * @return {number}
 */
const maximumSum = function (arr) {
  /*
Given an array of integers, 

return the maximum sum for a non-empty subarray (contiguous elements)
with at most one element deletion. 

In other words, you want to choose a subarray and optionally
delete one element from it so that there is still at least one element left and the sum of the
remaining elements is maximum possible.

Note that the subarray needs to be non-empty after deleting one element
  */
  let n = arr.length;
  let local_max = 0;
  let global_max = -1 * Math.pow(10, 4);
  for (let i = 0; i < n; i++) {
    local_max = Math.max(arr[i], arr[i] + local_max);
    if (local_max > global_max) {
      global_max = local_max;
    }
  }
  return global_max;
};

describe("maximumSum", function () {
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
    const actual = maximumSum([1, -2, 0, 3]);
    const expected = 4;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const actual = maximumSum([1, -2, -2, 3]);
    const expected = 3;
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const actual = maximumSum([-1, -1, -1, -1]);
    const expected = -1;
    isEqual(actual, expected);
  });
});
