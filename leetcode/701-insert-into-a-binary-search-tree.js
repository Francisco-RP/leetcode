const { TreeNode, createTree, bstToArray } = require("../lib");

// https://leetcode.com/problems/insert-into-a-binary-search-tree/

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
 * @param {number} val
 * @return {TreeNode}
 */
const insertIntoBST = function (root, val) {
  if (!root) {
    return new TreeNode(val);
  }

  function findSpot(node) {
    if (val > node.val) {
      if (node.right) {
        findSpot(node.right);
      } else {
        node.right = new TreeNode(val);
        return;
      }
    } else if (val < node.val) {
      if (node.left) {
        findSpot(node.left);
      } else {
        node.left = new TreeNode(val);
        return;
      }
    }
  }

  findSpot(root);
  return root;
};
