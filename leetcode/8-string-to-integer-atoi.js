const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/string-to-integer-atoi/

const MIN = Math.pow(-2, 31);
const MAX = Math.pow(2, 31) - 1;

function clamp(n) {
  if (n < MIN) return MIN;
  if (n > MAX) return MAX;
  return n;
}

/**
 * @param {string} s 0 to 200 length, consists of English letters (lower-case and upper-case),
 * digits (0-9), ' ', '+', '-', and '.'.
 * @return {number}
 */
const myAtoi = function (s) {
  return clamp(parseInt(s, 10) || 0);
};

describe("myAtoi", function () {
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
    const actual = myAtoi("42");
    const expected = 42;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const actual = myAtoi("   -42");
    const expected = -42;
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const actual = myAtoi("4193 with words");
    const expected = 4193;
    isEqual(actual, expected);
  });

  test("Test Case 4", function () {
    const actual = myAtoi("words and 987");
    const expected = 0;
    isEqual(actual, expected);
  });

  test("Test Case 5", function () {
    const actual = myAtoi("21474836460");
    const expected = 2147483647;
    isEqual(actual, expected);
  });

  test("Test Case 6", function () {
    const actual = myAtoi("   -115579378e25");
    const expected = -115579378;
    isEqual(actual, expected);
  });

  test("Test Case 7", function () {
    const actual = myAtoi("+1");
    const expected = 1;
    isEqual(actual, expected);
  });
});
