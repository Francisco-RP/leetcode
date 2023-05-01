const assert = require("assert");

// https://leetcode.com/problems/shortest-distance-to-a-character/

/**
 * @param {string} s
 * @param {character} c
 * @return {number[]}
 */
const shortestToChar = function (s, c) {
  const long = 10 ** 5;

  const results = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === c) {
      results.push(0);
      continue;
    }

    // find nearest index of c before and after current character
    let before = s.substring(0, i).lastIndexOf(c);
    if (before < 0) before = long;

    let after = s.substring(i + 1).indexOf(c);
    if (after < 0) after = long;
    else {
      after += i + 1;
    }

    const bDiff = Math.abs(i - before);
    const aDiff = Math.abs(i - after);
    if (bDiff < aDiff) {
      results.push(bDiff);
    } else {
      results.push(aDiff);
    }
  }

  return results;
};

describe("shortestToChar", function () {
  it("Test Case 1", function () {
    const actual = shortestToChar("loveleetcode", "e");
    const expected = [3, 2, 1, 0, 1, 0, 0, 1, 2, 2, 1, 0];
    assert.deepStrictEqual(actual, expected);
  });

  it("Test Case 2", function () {
    const actual = shortestToChar("aaab", "b");
    const expected = [3, 2, 1, 0];
    assert.deepStrictEqual(actual, expected);
  });

  it("Test Case 3", function () {
    const actual = shortestToChar("abaa", "b");
    const expected = [1, 0, 1, 2];
    assert.deepStrictEqual(actual, expected);
  });
});
