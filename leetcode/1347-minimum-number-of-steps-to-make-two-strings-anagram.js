const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/minimum-number-of-steps-to-make-two-strings-anagram/

/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
const minSteps = function (s, t) {
  const s_count = Array(26).fill(0);
  const t_count = Array(26).fill(0);

  for (const char of s) {
    const index = char.charCodeAt(0) - 97;
    s_count[index] += 1;
  }
  for (const char of t) {
    const index = char.charCodeAt(0) - 97;
    t_count[index] += 1;
  }

  let steps = 0;
  for (let i = 0; i < t_count.length; i++) {
    const s_charCount = s_count[i];
    const t_charCount = t_count[i];
    if (t_charCount < s_charCount) {
      steps += t_charCount - s_charCount;
    }
  }

  return Math.abs(steps);
};

describe("minSteps", function () {
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
    const s = "bab",
      t = "aba";
    const actual = minSteps(s, t);
    const expected = 1;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const s = "leetcode",
      t = "practice";
    const actual = minSteps(s, t);
    const expected = 5;
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const s = "anagram",
      t = "mangaar";
    const actual = minSteps(s, t);
    const expected = 0;
    isEqual(actual, expected);
  });
});
