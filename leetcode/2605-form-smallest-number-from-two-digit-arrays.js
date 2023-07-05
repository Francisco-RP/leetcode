const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/form-smallest-number-from-two-digit-arrays/

/**
 * Given two arrays of unique digits `nums1` and `nums2`, return the smallest number that contains
 * at least one digit from each array.
 *
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const minNumber = function (nums1, nums2) {
  const merged = [];

  nums1.forEach((n) => {
    nums2.forEach((x) => {
      if (n === x) merged.push(x);

      const joined = Number(`${n}${x}`);
      const joinedReversed = Number(`${x}${n}`);
      merged.push(joined, joinedReversed);
    });
  });

  merged.sort((a, b) => b - a);
  return merged.pop();
};

describe("minNumber", function () {
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
    const nums1 = [4, 1, 3],
      nums2 = [5, 7];
    const actual = minNumber(nums1, nums2);
    const expected = 15;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const nums1 = [3, 5, 2, 6],
      nums2 = [3, 1, 7];
    const actual = minNumber(nums1, nums2);
    const expected = 3;
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const nums1 = [7, 5, 6],
      nums2 = [1, 4];
    const actual = minNumber(nums1, nums2);
    const expected = 15;
    isEqual(actual, expected);
  });
});
