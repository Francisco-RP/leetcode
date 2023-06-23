const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/substrings-of-size-three-with-distinct-characters/

/**
 * @param {string} s
 * @return {number}
 */
var countGoodSubstrings = function (s) {
  const result = [];

  for (let i = 0; i < s.length - 2; i++) {
    const sub = s.substring(i, i + 3);
    // only add substrings that dont contain repeated chars
    if (![...sub].some((char, i) => sub.lastIndexOf(char) !== i)) {
      result.push(sub);
    }
  }
  return result.length;
};

describe("countGoodSubstrings", function () {
  function isEqual(actual, expected) {
    assert.strictEqual(actual, expected);
  }

  test("Test Case 1", function () {
    const actual = countGoodSubstrings("xyzzaz");
    const expected = 1;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const actual = countGoodSubstrings("aababcabc");
    const expected = 4;
    isEqual(actual, expected);
  });

  // test("Test Case 3", function () {
  //   const actual = countGoodSubstrings();
  //   const expected = true;
  //   isEqual(actual, expected);
  // });
});
