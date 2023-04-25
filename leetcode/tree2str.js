const assert = require("assert");
const { createTree, TreeNode } = require("../lib");

// https://leetcode.com/problems/construct-string-from-binary-tree/

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
 * @return {string}
 */
const tree2str = function (root) {
  function renderNode(node) {
    let left = "";
    let right = "";
    if (node.left) {
      left = renderNode(node.left);
    }
    if (node.right) {
      right = renderNode(node.right);
    }
    if (!left && !right) {
      return `${node.val}`;
    }
    if (!left && right) {
      return `${node.val}()(${right})`;
    }
    if (left && !right) {
      return `${node.val}(${left})`;
    }
    // left && !right
    return `${node.val}(${left})(${right})`;
  }

  return renderNode(root);
};

describe("tree2str", function () {
  it("Test Case 1", function () {
    const actual = tree2str(createTree([1, 2, 3, 4]));
    const expected = "1(2(4))(3)";
    assert.strictEqual(actual, expected);
  });

  it("Test Case 2", function () {
    const actual = tree2str(createTree([1, 2, 3, null, 4]));
    const expected = "1(2()(4))(3)";
    assert.strictEqual(actual, expected);
  });

  // it("Test Case 3", function () {
  //   const actual = tree2str();
  //   const expected = true;
  //   assert.strictEqual(actual, expected);
  // });
});
