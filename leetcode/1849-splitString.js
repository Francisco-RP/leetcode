const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/splitting-a-string-into-descending-consecutive-values/

/**
 * Check if we can split s into two or more non-empty substrings such that the numerical values of
 * the substrings are in descending order and the difference between numerical values of every two
 * adjacent substrings is equal to 1.
 *
 * @param {string} s consists of only digits.
 * @return {boolean}
 */
const splitString = function (s) {
  if (!s) return false;

  // remove any leading zeros because they are useless
  s = s.replace(/^0+/, "");
  if (s.length === 1) return false;

  function backtrack(index, prev) {
    if (index === s.length) return true;
    for (let j = index; j < s.length; j++) {
      const val = Number(s.substring(index, j + 1));
      if (val + 1 === prev && backtrack(j + 1, val)) {
        return true;
      }
    }
  }

  for (let i = 0; i < s.length - 1; i++) {
    const val = Number(s.substring(0, i + 1));
    if (backtrack(i + 1, val)) return true;
  }

  return false;
};

describe("splitString", function () {
  test("Test Case 0", function () {
    const actual = splitString("0090089");
    const expected = true;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 0a", function () {
    const actual = splitString("001");
    const expected = false;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 1", function () {
    const actual = splitString("1234");
    const expected = false;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const actual = splitString("050043");
    const expected = true;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const actual = splitString("9080701");
    const expected = false;
    assert.strictEqual(actual, expected);
  });
});
