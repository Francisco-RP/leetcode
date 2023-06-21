const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/delete-columns-to-make-sorted/

/**
 * You are given an array of `n` strings `strs`, all of the same length.
 * The strings can be arranged such that there is one on each line, making a grid.
 *
 * @example
 * const strs = ["abc", "bce", "cae"] // can be arranged as follows:
 * abc
 * bce
 * cae
 *
 * You want to delete the columns that are not sorted lexicographically.
 * In the above example (0-indexed), columns 0 ('a', 'b', 'c') and 2 ('c', 'e', 'e') are sorted,
 * while column 1 ('b', 'c', 'a') is not, so you would delete column 1.
 *
 * Return the number of columns that you will delete.
 * @param {string[]} strs
 * @return {number}
 */
var minDeletionSize = function (strs) {
  const len = strs[0].length;
  const colsChecked = {};
  let result = 0;

  // store the last letter code for each column via index
  const map = [];

  for (let row = 0; row < strs.length; row++) {
    for (let col = 0; col < len; col++) {
      // if this column has already been found to be out of order, skip it
      if (colsChecked[col]) continue;

      // compare the last letter to the current letter via their char codes
      const last = map[col];
      const current = strs[row].charCodeAt(col);

      if (!last) {
        map[col] = current;
      } else {
        if (current < last && !colsChecked[col]) {
          colsChecked[col] = 1;
          result += 1;
        }
        map[col] = current;
      }
    }
  }

  return result;
};

describe("minDeletionSize", function () {
  function isEqual(actual, expected) {
    assert.strictEqual(actual, expected);
  }

  test("Test Case 1", function () {
    const strs = ["cba", "daf", "ghi"];
    const actual = minDeletionSize(strs);
    const expected = 1;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const strs = ["a", "b"];
    const actual = minDeletionSize(strs);
    const expected = 0;
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const strs = ["zyx", "wvu", "tsr"];
    const actual = minDeletionSize(strs);
    const expected = 3;
    isEqual(actual, expected);
  });
});
