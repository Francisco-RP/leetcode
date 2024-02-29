const assert = require("node:assert");
const { describe, test } = require("node:test");
const { createTree } = require("../lib");

// https://leetcode.com/problems/find-bottom-left-tree-value/

/**
 * @typedef {import('../lib').TreeNode} TreeNode
 */

/**
 * Given the root of a binary tree, return the leftmost value in the last row of the tree.
 * Find the deepest level of the tree and for all nodes at that level, return the leftmost
 * value
 * @param {TreeNode} root
 * @return {number}
 */
var findBottomLeftValue = function (root) {
  let val = root.val;
  const nodes = [root];

  while (nodes.length) {
    const next = nodes.shift();
    if (!next) continue;

    val = next.val;

    if (next.right) {
      nodes.push(next.right);
    }
    if (next.left) {
      nodes.push(next.left);
    }
  }

  return val;
};

describe("findBottomLeftValue", function () {
  /**
   * @param {number} actual
   * @param {number} expected
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
    const root = [2, 1, 3];
    // @ts-ignore
    const actual = findBottomLeftValue(createTree(root));
    const expected = 1;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const root = [1, 2, 3, 4, null, 5, 6, null, null, 7];
    // @ts-ignore
    const actual = findBottomLeftValue(createTree(root));
    const expected = 7;
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const root = [0];
    // @ts-ignore
    const actual = findBottomLeftValue(createTree(root));
    const expected = 0;
    isEqual(actual, expected);
  });

  test("Test Case 4", function () {
    const root = [0, null, -1];
    // @ts-ignore
    const actual = findBottomLeftValue(createTree(root));
    const expected = -1;
    isEqual(actual, expected);
  });

  test("Test Case 5", function () {
    const root = [3, 1, 5, 0, 2, 4, 6];
    // @ts-ignore
    const actual = findBottomLeftValue(createTree(root));
    const expected = 0;
    isEqual(actual, expected);
  });
});
