const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/masking-personal-information/

/**
 * @param {string} s
 * @return {string}
 */
const maskPII = function (s) {
  const i = s.indexOf("@");
  if (i >= 0) {
    s = s.toLowerCase();
    return s[0] + "*****" + s[i - 1] + s.substring(i);
  }

  s = s.replaceAll(/[^0-9]/g, "");
  const local4 = s.slice(-4);
  switch (s.length) {
    case 10:
      return `***-***-${local4}`;
    case 11:
      return `+*-***-***-${local4}`;
    case 12:
      return `+**-***-***-${local4}`;
    case 13:
      return `+***-***-***-${local4}`;
  }

  return s;
};

describe("maskPII", function () {
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
    const actual = maskPII("LeetCode@LeetCode.com");
    const expected = "l*****e@leetcode.com";
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const actual = maskPII("AB@qq.com");
    const expected = "a*****b@qq.com";
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const actual = maskPII("1(234)567-890");
    const expected = "***-***-7890";
    isEqual(actual, expected);
  });

  test("Test Case 4", function () {
    // 86-101-234-5678
    const actual = maskPII("86-(10)12345678");
    const expected = "+**-***-***-5678";
    isEqual(actual, expected);
  });
});
