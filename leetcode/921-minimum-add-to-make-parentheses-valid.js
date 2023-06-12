const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/

/**
 * @param {string} s
 * @return {number}
 */
const minAddToMakeValid = function (s) {
  if (!s) return 0;

  let open = 0;
  let close = 0;
  for (let i = 0; i < s.length; i++) {
    const char = s.charAt(i);
    if (char === "(") open += 1;
    if (char === ")") {
      if (open > 0) {
        open -= 1;
      } else {
        close += 1;
      }
    }
  }
  return open + close;
};

describe("minAddToMakeValid", function () {
  test("Test Case 1", function () {
    const actual = minAddToMakeValid("())");
    const expected = 1;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const actual = minAddToMakeValid("(((");
    const expected = 3;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const actual = minAddToMakeValid("()))((");
    const expected = 4;
    assert.strictEqual(actual, expected);
  });
});
