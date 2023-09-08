const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/maximum-product-of-the-length-of-two-palindromic-subsequences/

/**
 *
 * @param {string} str
 * @returns {string}
 */
function reverseString(str) {
  let reversed = "";
  for (const character of str) {
    reversed = character + reversed;
  }
  return reversed;
}

/**
 * @param {string} s max length 12
 * @return {number}
 */
const maxProduct = function (s) {
  const N = s.length;
  /**
   * @type {Map<number, number>}
   */
  const pali = new Map();

  const len = 1 << N; // same as Math.pow(2, N)
  for (let i = 1; i < len; i++) {
    let sub = "";
    for (let j = 0; j < N; j++) {
      if (i & (1 << j)) {
        sub += s[j];
      }
    }
    if (sub === reverseString(sub)) {
      pali.set(i, sub.length);
    }
  }

  let res = 0;
  const keys = Array.from(pali.keys());
  for (const m1 of keys) {
    for (const m2 of keys) {
      if ((m1 & m2) === 0) {
        res = Math.max(res, pali.get(m1) * pali.get(m2));
      }
    }
  }

  return res;
};

describe("maxProduct", function () {
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
    const actual = maxProduct("leetcodecom");
    const expected = 9;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const actual = maxProduct("bb");
    const expected = 1;
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const actual = maxProduct("accbcaxxcxx");
    const expected = 25;
    isEqual(actual, expected);
  });
});
