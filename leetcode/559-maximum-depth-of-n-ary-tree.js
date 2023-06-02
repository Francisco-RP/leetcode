const assert = require("node:assert");
const { describe, test } = require("node:test");
const { arrToNtree, Node } = require("../lib");

// https://leetcode.com/problems/maximum-depth-of-n-ary-tree/

/**
 * Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number}
 */
const maxDepth = function (root) {
  if (!root) return 0;
  if (!root.children.length) return 1;

  let count = 1;
  const toVisit = root.children;
  let row = [];

  while (toVisit.length) {
    const next = toVisit.shift();
    if (next?.children) {
      row.push(...next.children);
    }
    if (toVisit.length === 0) {
      count += 1;
      toVisit.push(...row);
      row = [];
    }
  }

  return count;
};

describe("maxDepth", function () {
  test("Test Case 1", function () {
    const root = [1, null, 3, 2, 4, null, 5, 6];
    const actual = maxDepth(arrToNtree(root));
    const expected = 3;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const root = [
      1,
      null,
      2,
      3,
      4,
      5,
      null,
      null,
      6,
      7,
      null,
      8,
      null,
      9,
      10,
      null,
      null,
      11,
      null,
      12,
      null,
      13,
      null,
      null,
      14,
    ];
    const actual = maxDepth(arrToNtree(root));
    const expected = 5;
    assert.strictEqual(actual, expected);
  });

  // test("Test Case 3", function () {
  //   const actual = maxDepth();
  //   const expected = true;
  //   assert.strictEqual(actual, expected);
  // });
});
