const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/k-diff-pairs-in-an-array/

/**
 * Given an array of integers `nums` and an integer `k`, return the number of unique k-diff pairs in the array.
 * A k-diff pair is an integer pair (`nums[i]`, `nums[j]`), where the following are true:
 * - `0 <= i, j < nums.length`
 * - `i != j`
 * - `|nums[i] - nums[j]| == k`
 *
 * Notice that `|val|` denotes the absolute value of val.
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const findPairs = function (nums, k) {
  if (!nums.length || k < 0) return 0;

  const map = new Map();

  for (const num of nums) {
    map.set(num, map.get(num) + 1 || 1);
  }

  let count = 0;
  for (const [key, value] of map) {
    if (k === 0) {
      // count how many duplicate numbers we have because only those
      // minus each other can produce 0
      if (value > 1) count++;
    } else {
      // check if Map contains another key that is sum of key+k because that would produce the
      // difference that equals k
      if (map.has(key + k)) count++;
    }
  }

  return count;
};

describe("findPairs", function () {
  test("Test Case 1", function () {
    const actual = findPairs([3, 1, 4, 1, 5], 2);
    const expected = 2;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const actual = findPairs([1, 2, 3, 4, 5], 1);
    const expected = 4;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const actual = findPairs([1, 3, 1, 5, 4], 0);
    const expected = 1;
    assert.strictEqual(actual, expected);
  });
});
