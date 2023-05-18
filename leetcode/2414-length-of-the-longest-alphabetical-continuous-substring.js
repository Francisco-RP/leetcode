const assert = require("node:assert");
const { describe, test: it } = require("node:test");

// https://leetcode.com/problems/length-of-the-longest-alphabetical-continuous-substring/

/**
 * @param {string} s
 * @return {number}
 */
const longestContinuousSubstring = function (s) {
  let longest = 1;
  let last = s.charCodeAt(0);
  let length = 1;

  for (let i = 1; i < s.length; i++) {
    const code = s.charCodeAt(i);

    // check is char is in order by comparing it to last one
    if (code === last + 1) {
      length += 1;
      if (length > longest) {
        longest = length;
      }
    } else {
      // reset
      length = 1;
    }

    last = code;
  }

  return longest;
};

describe("longestContinuousSubstring", function () {
  it("Test Case 1", function () {
    const actual = longestContinuousSubstring("abacaba");
    const expected = 2;
    assert.strictEqual(actual, expected);
  });

  it("Test Case 2", function () {
    const actual = longestContinuousSubstring("abcde");
    const expected = 5;
    assert.strictEqual(actual, expected);
  });

  it("Test Case 3", function () {
    const actual = longestContinuousSubstring("yrpjofyzubfsiypfre");
    const expected = 2; // "yz"
    assert.strictEqual(actual, expected);
  });
});
