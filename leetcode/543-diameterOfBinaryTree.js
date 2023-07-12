const assert = require("node:assert");
const { describe, test } = require("node:test");
const { createTree } = require("../lib");

// https://leetcode.com/problems/diameter-of-binary-tree/

/*
Given the root of a binary tree, return the length of the diameter of the tree.

The diameter of a binary tree is the length of the longest path between any two nodes in a tree.
This path may or may not pass through the root.

The length of a path between two nodes is represented by the number of edges between them.
*/

/**
 * find longest path of connected edges.  2 connected nodes is 1 edge
 * This path may or may not pass through the root.
 * The length of a path between two nodes is represented by the number of edges between them.
 * @param {TreeNode} root
 * @return {number}
 */
const diameterOfBinaryTree = function (root) {
  let max = 0;

  function dfs(r) {
    if (!r) return -1;
    const left = dfs(r.left);
    const right = dfs(r.right);
    max = Math.max(max, 2 + left + right);
    return 1 + Math.max(left, right);
  }

  dfs(root);
  return max;
};

describe("diameterOfBinaryTree", function () {
  test("Test Case 1", function () {
    const actual = diameterOfBinaryTree(createTree([1, 2, 3, 4, 5]));
    const expected = 3;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const actual = diameterOfBinaryTree(createTree([1, 2]));
    const expected = 1;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 3", () => {
    const actual = diameterOfBinaryTree(createTree([3, 1, null, null, 2]));
    const expected = 2;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 4", () => {
    const actual = diameterOfBinaryTree(createTree([1, null, 2]));
    const expected = 1;
    assert.strictEqual(actual, expected);
  });
});
