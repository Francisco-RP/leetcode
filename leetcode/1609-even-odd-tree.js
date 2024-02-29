const assert = require("node:assert");
const { describe, test } = require("node:test");
const { createTree } = require("../lib");

// https://leetcode.com/problems/even-odd-tree/

/**
 * @typedef {import('../lib').TreeNode} TreeNode
 */

/**
 * For every even-indexed level, all nodes at the level have odd integer values in strictly increasing order (from left to right).
 *
 * For every odd-indexed level, all nodes at the level have even integer values in strictly decreasing order (from left to right).
 * @param {TreeNode} root
 * @return {boolean}
 */
var isEvenOddTree = function (root) {
  /**
   * BFS approach
   * keeping track of level
   */

  // root node is an even level so the value needs to be odd
  if (root.val % 2 === 0) return false;
  if (!root.left && !root.right) return true;

  root.level = 0;
  let currentLevel = 0;
  let val = root.val;
  const nodes = [root];

  while (nodes.length) {
    const next = nodes.shift();
    if (!next) continue;

    if (next.level !== currentLevel) {
      // a new level has been encountered
      // reset
      val = next.val;
      currentLevel = next.level;
      if (currentLevel % 2 === 0 && val % 2 === 0) return false;
      if (currentLevel % 2 !== 0 && val % 2 !== 0) return false;
    } else if (next.level !== 0) {
      if (currentLevel % 2 === 0) {
        // every even-indexed level,
        if (next.val % 2 !== 0 && val < next.val) {
          // all nodes at the level have ODD integer values in strictly INCREASING order (from left to right).
          val = next.val;
        } else {
          return false;
        }
      } else {
        // every odd-indexed level
        if (next.val % 2 === 0 && val > next.val) {
          // all nodes at the level have EVEN integer values in strictly DECREASING order (from left to right).
          val = next.val;
        } else {
          return false;
        }
      }
    }

    if (next.left) {
      next.left.level = next.level + 1;
      nodes.push(next.left);
    }

    if (next.right) {
      next.right.level = next.level + 1;
      nodes.push(next.right);
    }
  }

  return true;
};

describe("isEvenOddTree", function () {
  /**
   * @param {boolean} actual
   * @param {boolean} expected
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
    const root = [1, 10, 4, 3, null, 7, 9, 12, 8, 6, null, null, 2];
    // @ts-ignore
    const actual = isEvenOddTree(createTree(root));
    const expected = true;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const root = [5, 4, 2, 3, 3, 7];
    // @ts-ignore
    const actual = isEvenOddTree(createTree(root));
    const expected = false;
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const root = [5, 9, 1, 3, 5, 7];
    // @ts-ignore
    const actual = isEvenOddTree(createTree(root));
    const expected = false;
    isEqual(actual, expected);
  });
});
