const assert = require("node:assert");
const { describe, test } = require("node:test");
const { TreeNode } = require("../lib");

// https://leetcode.com/problems/create-binary-tree-from-descriptions/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[][]} descriptions
 * @return {TreeNode}
 */
const createBinaryTree = function (descriptions) {
  const map = new Map();
  const childNums = [];
  const parents = [];

  for (const [parent, child, isLeft] of descriptions) {
    const node = map.get(parent) || new TreeNode(parent);
    let childNode = map.get(child);

    if (!childNode) {
      childNode = new TreeNode(child);
      map.set(child, childNode);
    }

    if (isLeft) {
      node.left = childNode;
    } else {
      node.right = childNode;
    }

    parents.push(parent);
    childNums.push(child);

    map.set(parent, node);
  }

  const rootNum = parents.filter((n) => !childNums.includes(n))[0];

  return map.get(rootNum);
};

describe("createBinaryTree", function () {
  function isEqual(actual, expected) {
    try {
      assert.deepStrictEqual(actual.toArray(), expected);
    } catch (e) {
      // only want to console log failing test info
      console.log("actual", actual.toArray());
      console.log("expected", expected);
      throw e;
    }
  }

  test("Test Case 1", function () {
    const descriptions = [
      [20, 15, 1],
      [20, 17, 0],
      [50, 20, 1],
      [50, 80, 0],
      [80, 19, 1],
    ];
    const actual = createBinaryTree(descriptions);
    const expected = [50, 20, 80, 15, 17, 19];
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const descriptions = [
      [1, 2, 1],
      [2, 3, 0],
      [3, 4, 1],
    ];
    const actual = createBinaryTree(descriptions);
    const expected = [1, 2, null, null, 3, 4];
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const descriptions = [
      [39, 70, 1],
      [13, 39, 1],
      [85, 74, 1],
      [74, 13, 1],
      [38, 82, 1],
      [82, 85, 1],
    ];
    const actual = createBinaryTree(descriptions);
    const expected = [38, 82, null, 85, null, 74, null, 13, null, 39, null, 70];
    isEqual(actual, expected);
  });

  test("Test Case 4", function () {
    const descriptions = [
      [85, 74, 0],
      [38, 82, 0],
      [39, 70, 0],
      [82, 85, 0],
      [74, 13, 0],
      [13, 39, 0],
    ];
    const actual = createBinaryTree(descriptions);
    const expected = [38, null, 82, null, 85, null, 74, null, 13, null, 39, null, 70];
    isEqual(actual, expected);
  });
});

/*
39
[74, 82, 70, 85, 13, 39]

85
38
39
82
74
13

*/
