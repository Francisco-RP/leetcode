const assert = require("assert");
const { createTree } = require("../lib");

// https://leetcode.com/problems/diameter-of-binary-tree/

/**
 * find longest path of connected edges.  2 connected nodes is 1 edge
 * This path may or may not pass through the root.
 * The length of a path between two nodes is represented by the number of edges between them.
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
  if (root === null) return 0;
  if (root.left === null && root.right === null) return 1;

  preOrder(root);

  let leftEdges = 0;
  let rightEdges = 0;
  const parents = [root];

  while (parents.length) {
    const [node] = parents.splice(0, 1);
    if (node.left) {
      leftEdges += 1;
    }
    if (node.left?.left || node.left?.right) {
      parents.push(node.left);
    }
    if (node.right) {
      rightEdges += 1;
    }
    if (node.righ?.left || node.right?.right) {
      parents.push(node.right);
    }
  }
  console.log(leftEdges, rightEdges);
};

function preOrder(root) {
  if (root) {
    console.log(root.val);
    preOrder(root.left);
    preOrder(root.right);
  }
}

describe("diameterOfBinaryTree", function () {
  it("Test Case 1", function () {
    const actual = diameterOfBinaryTree(createTree([1, 2, 3, 4, 5]));
    const expected = 3;
    assert.strictEqual(actual, expected);
  });

  it("Test Case 2", function () {
    const actual = diameterOfBinaryTree(createTree([1, 2]));
    const expected = 1;
    assert.strictEqual(actual, expected);
  });

  it("Test Case 3", () => {
    const actual = diameterOfBinaryTree(createTree([3, 1, null, null, 2]));
    const expected = 2;
    assert.strictEqual(actual, expected);
  });

  it("Test Case 4", () => {
    const actual = diameterOfBinaryTree(createTree([1, null, 2]));
    const expected = 1;
    assert.strictEqual(actual, expected);
  });
});
