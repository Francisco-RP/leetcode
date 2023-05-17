const assert = require("assert");

// https://leetcode.com/problems/buddy-strings/

/**
 * Given two strings `s` and `goal`, return `true` if you can swap two letters in `s` so the result
 * is equal to goal, otherwise, return `false`.
 *
 * Swapping letters is defined as taking two indices `i` and `j` (0-indexed) such that `i != j` and
 * swapping the characters at `s[i]` and `s[j]`.
 *
 * For example, swapping at indices `0` and `2` in "abcd" results in "cbad".
 *
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
const buddyStrings = function (s, goal) {
  if (s.length !== goal.length) {
    return false;
  }
  if (!checkStringEquality(s, goal)) {
    return false;
  }

  /*
    initial thought was to find xor of strings and check if length === 2
    ["a", "b", "c", "d"]
    ["c", "b", "a", "d"]
    [ 1,   0,   1,   0] => sum === 2
    but this fails test case 3 because of the repeating letters
  */
  let result = 0;
  for (let i = 0; i < s.length; i++) {
    const char1 = s[i];
    const char2 = goal[i];
    if (char1 !== char2) result += 1;
  }

  return result === 2;
};

/**
 *
 * @param {string} s1
 * @param {string} s2
 * @returns {boolean}
 */
function checkStringEquality(s1, s2) {
  return s1.split("").sort().join("") === s2.split("").sort().join("");
}

describe("buddyStrings", function () {
  it("Test Case example", function () {
    const actual = buddyStrings("abcd", "cbad");
    const expected = true;
    assert.strictEqual(actual, expected);
  });

  it("Test Case 1", function () {
    const actual = buddyStrings("ab", "ba");
    const expected = true;
    assert.strictEqual(actual, expected);
  });

  it("Test Case 2", function () {
    const actual = buddyStrings("ab", "ab");
    const expected = false;
    assert.strictEqual(actual, expected);
  });

  it("Test Case 3", function () {
    const actual = buddyStrings("aa", "aa");
    const expected = true;
    assert.strictEqual(actual, expected);
  });

  it("Test Case - repeating letters amongst other letters", function () {
    const actual = buddyStrings("baadop", "baadop");
    const expected = true;
    assert.strictEqual(actual, expected);
  });

  it("Test Case 4", function () {
    const actual = buddyStrings("ababa", "ababa");
    const expected = true;
    assert.strictEqual(actual, expected);
  });

  it("Test - strings must contain same letters", function () {
    const actual = buddyStrings("abcd", "defg");
    const expected = false;
    assert.strictEqual(actual, expected);
  });
});
