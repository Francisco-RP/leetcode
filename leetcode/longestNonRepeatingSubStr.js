/**
 * @param {string} s 0 <= s.length <= 5 * 10^4;
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  var len = s.length;
  if (len < 2) return len;

  var seq = "",
    longest = 0,
    char;

  for (var i = 0; i < len; i++) {
    for (var j = i; i < len; j++) {
      char = s.charAt(j);

      if (seq.includes(char)) {
        longest = seq.length > longest ? seq.length : longest;
        seq = "";
        break;
      }

      seq += char;
    }
  }

  longest = seq.length > longest ? seq.length : longest;

  return longest;
};

// ------------------------------------------------------------
// https://leetcode.com/problems/longest-substring-without-repeating-characters/
var assert = require("assert");

describe("lengthOfLongestSubstring", function () {
  it("Example 1", function () {
    const actual = lengthOfLongestSubstring("abcabcbb");
    const expected = 3;
    assert.strictEqual(actual, expected);
  });
  it("Example 2", function () {
    const actual = lengthOfLongestSubstring("bbbbb");
    const expected = 1;
    assert.strictEqual(actual, expected);
  });
  it("Example 3", function () {
    const actual = lengthOfLongestSubstring("pwwkew");
    const expected = 3;
    assert.strictEqual(actual, expected);
  });
  it("test fail 1", function () {
    const actual = lengthOfLongestSubstring(" ");
    const expected = 1;
    assert.strictEqual(actual, expected);
  });

  it("test fail 2", function () {
    const actual = lengthOfLongestSubstring("au");
    const expected = 2;
    assert.strictEqual(actual, expected);
  });
  it("test fail 3", function () {
    const actual = lengthOfLongestSubstring("aab");
    const expected = 2;
    assert.strictEqual(actual, expected);
  });
  it("test fail 4", function () {
    const actual = lengthOfLongestSubstring("dvdf");
    const expected = 3;
    assert.strictEqual(actual, expected);
  });
});
