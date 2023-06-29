const assert = require("node:assert");
const { describe, test } = require("node:test");
const { createTree, TreeNode } = require("../lib");

// https://leetcode.com/problems/maximum-depth-of-binary-tree/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
const maxDepth = function (root) {
  if (!root) return 0;

  let depth = 1;
  root.depth = 1;

  // iterative DFS approach
  const stack = [root];

  while (stack.length) {
    const node = stack.pop();
    depth = Math.max(depth, node.depth);

    if (node.left) {
      node.left.depth = node.depth + 1;
      stack.push(node.left);
    }

    if (node.right) {
      node.right.depth = node.depth + 1;
      stack.push(node.right);
    }
  }

  return depth;
};

describe("maxDepth", function () {
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
    const root = [3, 9, 20, null, null, 15, 7];
    const actual = maxDepth(createTree(root));
    const expected = 3;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const root = [1, null, 2];
    const actual = maxDepth(createTree(root));
    const expected = 2;
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const root = [];
    const actual = maxDepth(createTree(root));
    const expected = 0;
    isEqual(actual, expected);
  });

  test("Test Case 4", function () {
    const root = [1, 2, 3, 4, null, null, 5];
    const actual = maxDepth(createTree(root));
    const expected = 3;
    isEqual(actual, expected);
  });
});
