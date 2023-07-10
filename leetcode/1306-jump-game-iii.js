const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/jump-game-iii/

/**
 * Given an array of non-negative integers `arr`, you are initially positioned at `start` index of
 * the array. When you are at index `i`, you can jump to `i + arr[i]` or `i - arr[i]`, check if you
 * can reach to any index with value 0.
 *
 * Notice that you can not jump outside of the array at any time.
 *
 * Constraints:
 * - 1 <= arr.length <= 50,000
 * - 0 <= arr[i] < arr.length
 * - 0 <= start < arr.length
 *
 * @param {number[]} arr
 * @param {number} start
 * @return {boolean}
 */
const canReach = function (arr, start) {
  // this is basically a binary tree
  // you have a start node, left branch is backwards, right branch is forwards
  // so we do a BFS search until we hit a zero or the initial start

  const visited = new Map();
  const nodes = [start];

  let leftIndex, rightIndex, current;

  while (nodes.length) {
    current = nodes.pop();

    if (arr[current] === 0) {
      return true;
    }

    if (visited.has(current)) {
      continue;
    }

    visited.set(current, true);

    leftIndex = current - arr[current];
    rightIndex = current + arr[current];

    if (leftIndex >= 0 && !visited.has(leftIndex)) {
      nodes.push(leftIndex);
    }

    if (rightIndex < arr.length && !visited.has(rightIndex)) {
      nodes.push(rightIndex);
    }
  }

  return false;
};

describe("canReach", function () {
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
    const arr = [4, 2, 3, 0, 3, 1, 2],
      start = 5;
    const actual = canReach(arr, start);
    const expected = true;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const arr = [4, 2, 3, 0, 3, 1, 2],
      start = 0;
    const actual = canReach(arr, start);
    const expected = true;
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const arr = [3, 0, 2, 1, 2],
      start = 2;
    const actual = canReach(arr, start);
    const expected = false;
    isEqual(actual, expected);
  });

  test("Test Case 4", function () {
    const arr = [
        58, 48, 64, 36, 19, 19, 67, 13, 32, 2, 59, 50, 29, 68, 50, 0, 69, 31, 54, 20, 22, 43, 30, 9,
        68, 71, 20, 22, 48, 74, 2, 65, 27, 54, 30, 5, 66, 24, 64, 68, 9, 31, 50, 59, 15, 72, 6, 49,
        11, 71, 12, 61, 5, 66, 30, 1, 2, 39, 59, 35, 53, 21, 76, 17, 71, 40, 68, 57, 64, 53, 70, 21,
        50, 49, 25, 63, 35,
      ],
      start = 46;
    const actual = canReach(arr, start);
    const expected = false;
    isEqual(actual, expected);
  });

  test("Test Case 5", function () {
    const arr = [3, 0, 1, 2],
      start = 0;
    const actual = canReach(arr, start);
    const expected = true;
    isEqual(actual, expected);
  });
});
