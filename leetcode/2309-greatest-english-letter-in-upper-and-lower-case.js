const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/greatest-english-letter-in-upper-and-lower-case/

/**
 * @param {string} s
 * @return {string}
 */
const greatestLetter = function (s) {
  // "A" = 65
  // "Z" = 90
  // "a" = 97
  // "z" = 122
  // diff = 32
  const lowers = new Set();
  const uppers = [];
  for (const char of s) {
    if (char.charCodeAt(0) <= 90) {
      uppers.push(char);
    } else {
      lowers.add(char);
    }
  }
  uppers.sort();
  for (let i = uppers.length - 1; i >= 0; i--) {
    if (lowers.has(uppers[i].toLowerCase())) {
      return uppers[i];
    }
  }

  return "";
};

describe("greatestLetter", function () {
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
    const actual = greatestLetter("lEeTcOdE");
    const expected = "E";
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const actual = greatestLetter("arRAzFif");
    const expected = "R";
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const actual = greatestLetter("AbCdEfGhIjK");
    const expected = "";
    isEqual(actual, expected);
  });
  test("Test Case 4", function () {
    const actual = greatestLetter("nzmguNAEtJHkQaWDVSKxRCUivXpGLBcsjeobYPFwTZqrhlyOIfdM");
    const expected = "Z";
    isEqual(actual, expected);
  });
});
