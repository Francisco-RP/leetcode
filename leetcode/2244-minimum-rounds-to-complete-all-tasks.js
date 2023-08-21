const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/minimum-rounds-to-complete-all-tasks/

/**
 * @param {number[]} tasks
 * @return {number}
 */
const minimumRounds = function (tasks) {
  const map = new Map();
  for (const num of tasks) {
    map.set(num, (map.get(num) || 0) + 1);
  }
  let count = 0;
  for (const total of map.values()) {
    if (total < 2) return -1;
    count += Math.ceil(total / 3);
  }
  return count;
};

describe("minimumRounds", function () {
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
    const tasks = [2, 2, 3, 3, 2, 4, 4, 4, 4, 4];
    const actual = minimumRounds(tasks);
    const expected = 4;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const tasks = [2, 3, 3];
    const actual = minimumRounds(tasks);
    const expected = -1;
    isEqual(actual, expected);
  });
});
