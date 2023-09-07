const assert = require("node:assert");
const { describe, test } = require("node:test");
// eslint-disable-next-line no-unused-vars
const { TreeNode, createTree } = require("../lib");

// https://leetcode.com/problems/path-sum/

/**
 * @param {TreeNode | null} root
 * @param {number} targetSum
 * @return {boolean}
 */
const hasPathSum = function (root, targetSum) {
  if (!root) return false;

  const stack = [root];
  while (stack.length) {
    const next = stack.pop();
    if (next && !next.discovered) {
      if (typeof next.sum !== "number") next.sum = next.val;
      next.discovered = true;
      if (next.left) {
        next.left.sum = (next.left.sum ?? next.left.val) + next.sum;
        stack.push(next.left);
      }
      if (next.right) {
        next.right.sum = (next.right.sum ?? next.right.val) + next.sum;
        stack.push(next.right);
      }
      // we've reached the end of a branch
      if (!next.left && !next.right && next.sum === targetSum) {
        return true;
      }
    }
  }

  return false;
};

describe("hasPathSum", function () {
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
    const root = [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1],
      targetSum = 22;
    const actual = hasPathSum(createTree(root), targetSum);
    const expected = true;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const root = [1, 2, 3],
      targetSum = 5;
    const actual = hasPathSum(createTree(root), targetSum);
    const expected = false;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    /**
     * @type {number[]}
     */
    const root = [],
      targetSum = 0;
    const actual = hasPathSum(createTree(root), targetSum);
    const expected = false;
    isEqual(actual, expected);
  });
});
