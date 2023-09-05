const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/flip-string-to-monotone-increasing/

/**
 * A binary string is monotone increasing if it consists of some number of 0's (possibly
 * none), followed by some number of 1's (also possibly none).
 *
 * Examples of monotone increasing binary strings:
 * - 000111
 * - 011111
 * - 0000
 * - 11111
 * @param {string} s binary string of length 1 to 100,000
 * @return {number} the minimum number of flips to make s monotone increasing.
 */
const minFlipsMonoIncr = function (s) {
  let ones = 0;
  let result = 0;
  for (const bit of s) {
    if (bit === "1") {
      ones += 1;
    } else {
      result = Math.min(ones, result + 1);
    }
  }
  return result;
};

describe("minFlipsMonoIncr", function () {
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
    const actual = minFlipsMonoIncr("00110");
    const expected = 1;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const actual = minFlipsMonoIncr("010110");
    const expected = 2;
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const actual = minFlipsMonoIncr("00011000");
    const expected = 2;
    isEqual(actual, expected);
  });

  test("Test Case 4", function () {
    // length of 41
    const actual = minFlipsMonoIncr("01010010101010101010101010101010101100101");
    const expected = 19;
    isEqual(actual, expected);
  });

  test("Test Case 5", function () {
    const actual = minFlipsMonoIncr("100000");
    const expected = 1;
    isEqual(actual, expected);
  });
});
