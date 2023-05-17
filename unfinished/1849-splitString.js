const assert = require("assert");

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
  const splits = s.split(/0+/g);
  console.log(splits);
};

describe("splitString", function () {
  it("Test Case 1", function () {
    const actual = splitString("1234");
    const expected = false;
    assert.strictEqual(actual, expected);
  });

  it("Test Case 2", function () {
    const actual = splitString("050043");
    const expected = true;
    assert.strictEqual(actual, expected);
  });

  it("Test Case 3", function () {
    const actual = splitString("9080701");
    const expected = false;
    assert.strictEqual(actual, expected);
  });
});
