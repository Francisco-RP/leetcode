/**
 * Given two strings `ransomNote` and `magazine`, return `true` if `ransomNote` can be constructed
 * by using the letters from `magazine` and `false` otherwise. Each letter in `magazine` can only be
 * used once in `ransomNote`.
 * @param {string} ransomNote 1 <= ransomNote.length <= 105
 * @param {string} magazine 1 <= magazine.length <= 105
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
  var rLen = ransomNote.length;
  var char;
  var loc;

  for (var i = 0; i < rLen; i++) {
    char = ransomNote.charAt(i);
    loc = magazine.indexOf(char);
    if (loc < 0) return false;
    magazine = magazine.substring(0, loc) + magazine.substring(loc + 1);
  }

  return true;
};

// ------------------------------------------------------------
// https://leetcode.com/problems/ransom-note/
const assert = require("node:assert");
const { describe, test: it } = require("node:test");

describe("canConstruct", function () {
  it(`ransomNote = "a", magazine = "b"`, function () {
    const actual = canConstruct("a", "b");
    const expected = false;
    assert.strictEqual(actual, expected);
  });

  it(`ransomNote = "aa", magazine = "ab"`, function () {
    const actual = canConstruct("aa", "ab");
    const expected = false;
    assert.strictEqual(actual, expected);
  });

  it(`ransomNote = "aa", magazine = "aab"`, function () {
    const actual = canConstruct("aa", "aab");
    const expected = true;
    assert.strictEqual(actual, expected);
  });

  it(`ransomNote = "aab", magazine = "baa"`, function () {
    const actual = canConstruct("aab", "baa");
    const expected = true;
    assert.strictEqual(actual, expected);
  });
});
