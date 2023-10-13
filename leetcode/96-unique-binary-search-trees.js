const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/unique-binary-search-trees/

/**
 * @param {number} n
 * @return {number}
 */
const numTrees = function (n) {
  const trees = new Array(n + 1).fill(0);
  trees[0] = 1;
  trees[1] = 1;

  for (let i = 2; i <= n; i++) {
    for (let root = 1; root <= i; root++) {
      const left = root - 1;
      const right = i - root;
      trees[i] += trees[left] * trees[right];
    }
  }

  return trees[n];
};

describe("numTrees", function () {
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
    const n = 3;
    const actual = numTrees(n);
    const expected = 5;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const n = 1;
    const actual = numTrees(n);
    const expected = 1;
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const n = 5;
    const actual = numTrees(n);
    const expected = 42;
    isEqual(actual, expected);
  });
});
