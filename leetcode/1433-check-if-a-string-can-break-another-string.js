const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/check-if-a-string-can-break-another-string/

/**
 * s1 and s2 have same length
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
const checkIfCanBreak = function (s1, s2) {
  s1 = s1.split("").sort().join("");
  s2 = s2.split("").sort().join("");
  const len = s1.length;

  let x = s1;
  let y = s2;
  let firstFailed = false;
  for (let i = 0; i < len; i++) {
    if (x[i] < y[i]) {
      firstFailed = true;
      break;
    }
  }

  if (!firstFailed) return true;

  x = s2;
  y = s1;
  for (let i = 0; i < len; i++) {
    if (x[i] < y[i]) {
      return false;
    }
  }
  return true;
};

describe("checkIfCanBreak", function () {
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
    /*
      "ayx" is a permutation of s2="xya" which can break to string "abc" which is a permutation of s1="abc".
    */
    const s1 = "abc",
      s2 = "xya";
    const actual = checkIfCanBreak(s1, s2);
    const expected = true;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    /*
      All permutations for s1="abe" are: 
      "abe"
      "aeb"
      "bae"
      "bea"
      "eab"
      "eba" 
      
      and all permutation for s2="acd" are: 
      "acd", 
      "adc", 
      "cad", 
      "cda", 
      "dac" 
      "dca"

      x: "abe" 
      y: "acd"
      a >= a = true
      b >= c = false, stop
      
      x: "acd"
      y: "abe" 
      a >= a = true
      c >= b = true
      d >= e = false
    */
    const s1 = "abe",
      s2 = "acd";
    const actual = checkIfCanBreak(s1, s2);
    const expected = false;
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    /*
       s1 sort: cdeeeelot
       s2 sort: eeiinrtvw
    */
    const s1 = "leetcodee",
      s2 = "interview";
    const actual = checkIfCanBreak(s1, s2);
    const expected = true;
    isEqual(actual, expected);
  });

  test("Test Case 4", function () {
    /*
      s1 sorted = syz
      s1 sorted = cdi

      x: syz
      y: cdi
      s >= c = true
      y >= d = true
      z >= i
    */
    const s1 = "szy",
      s2 = "cid";
    const actual = checkIfCanBreak(s1, s2);
    const expected = true;
    isEqual(actual, expected);
  });
});
