const assert = require("node:assert");
const { describe, test } = require("node:test");
const { TreeNode, createTree } = require("../lib");

// https://leetcode.com/problems/path-sum-ii/

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
 * @param {number} targetSum
 * @return {number[][]}
 */
const pathSum = function (root, targetSum) {
  if (!root) {
    return [];
  }
  root.path = [root.val];
  root.sum = root.val;

  const stack = [root];

  const results = [];

  while (stack.length) {
    const next = stack.pop();

    if (next.sum === targetSum && !next.left && !next.right) {
      results.push([...next.path]);
    }

    if (next.right) {
      stack.push(next.right);
      next.right.path = [...next.path, next.right.val];
      next.right.sum = next.sum + next.right.val;
    }

    if (next.left) {
      stack.push(next.left);
      next.left.path = [...next.path, next.left.val];
      next.left.sum = next.sum + next.left.val;
    }
  }

  return results;
};

describe("pathSum", function () {
  function isEqual(actual, expected) {
    try {
      assert.deepStrictEqual(actual, expected);
    } catch (e) {
      // only want to console log failing test info
      console.log("actual", actual);
      console.log("expected", expected);
      throw e;
    }
  }

  test("Test Case 1", function () {
    const root = [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1],
      targetSum = 22;
    const actual = pathSum(createTree(root), targetSum);
    const expected = [
      [5, 4, 11, 2],
      [5, 8, 4, 5],
    ];
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const root = [1, 2, 3],
      targetSum = 5;
    const actual = pathSum(createTree(root), targetSum);
    const expected = [];
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const root = [1, 2, 3],
      targetSum = 5;
    const actual = pathSum(createTree(root), targetSum);
    const expected = [];
    isEqual(actual, expected);
  });

  test("Test Case 4", function () {
    const root = [1, 2],
      targetSum = 1;
    const actual = pathSum(createTree(root), targetSum);
    const expected = [];
    isEqual(actual, expected);
  });
});
