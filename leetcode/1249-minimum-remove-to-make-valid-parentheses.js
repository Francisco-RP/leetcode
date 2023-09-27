const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/

/**
 * @param {string} s
 * @return {string}
 */
const minRemoveToMakeValid = function (s) {
  /**
   * @type {number[]}
   */
  const stack = [];

  s = s.split("");

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (char === "(") {
      stack.push(i);
    } else if (char === ")") {
      if (stack.length) {
        stack.pop();
      } else {
        s[i] = "";
      }
    }
  }

  for (const i of stack) {
    s[i] = "";
  }

  return s.join("");
};

describe("minRemoveToMakeValid", function () {
  /**
   * @param {unknown} actual
   * @param {unknown} expected
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
    const s = "lee(t(c)o)de)";
    const actual = minRemoveToMakeValid(s);
    const expected = "lee(t(c)o)de";
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const s = "a)b(c)d";
    const actual = minRemoveToMakeValid(s);
    const expected = "ab(c)d";
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const s = "))((";
    const actual = minRemoveToMakeValid(s);
    const expected = "";
    isEqual(actual, expected);
  });

  test("Test Case 4", function () {
    const s = "(a(b(c)d)";
    const actual = minRemoveToMakeValid(s);
    const expected = "a(b(c)d)";
    isEqual(actual, expected);
  });

  test("Test Case 5", function () {
    const s = ")))t((u)";
    const actual = minRemoveToMakeValid(s);
    const expected = "t(u)";
    isEqual(actual, expected);
  });
});

/*
  "(a(b(c)d)"
  ( - bal: false, last: [0]
    ..
  ( - bal: false, last [0,2]
    ..
  ( - bal: false, last [0,2,4]
    ..
  ) - bal: true,  last [0,2]
   ..
  ) - bal: true,  last [0]
*/
