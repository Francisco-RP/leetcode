/**
 * A string s is called good if there are no two different characters in s that have the same
 * frequency.
 *
 * Given a string s, return the minimum number of characters you need to delete to make s good.
 *
 * The frequency of a character in a string is the number of times it appears in the string. For
 * example, in the string "aab", the frequency of 'a' is 2, while the frequency of 'b' is 1.
 * @param {string} s 1 <= s.length <= 10^5, s contains only lowercase English letters.
 * @return {number}
 */
var minDeletions = function (s) {
  if (s.length === 1) return 0;

  var i = 0;
  var len = s.length;

  // create an array with the count of each letter in the alphabet
  var freq = Array(26).fill(0);

  for (; i < len; i++) {
    // ASCII codes for a-z are in sequetial order from 97 - 122. So if we subtract 97 from the
    // current char code we get our 0-indexed array location for each character
    freq[s[i].charCodeAt(0) - 97]++;
  }

  // sort the array in descending order so we can put all of the zeros at the end
  freq.sort((a, b) => b - a);

  // storing our deletion count
  var dels = 0;

  // compare current letter count with the last letter count
  // this works because we sorted the array descending
  for (i = 1; i < 26; i++) {
    while (freq[i] && freq[i] >= freq[i - 1]) {
      freq[i]--;
      dels++;
    }
  }

  return dels;
};

/*
solution 1:
Runtime: 248 ms, faster than 38.67% of JavaScript online submissions for Minimum Deletions to Make Character Frequencies Unique.
Memory Usage: 46 MB, less than 99.20% of JavaScript online submissions for Minimum Deletions to Make Character Frequencies Unique.

solution 2:
Runtime: 122 ms, faster than 88.00% of JavaScript online submissions for Minimum Deletions to Make Character Frequencies Unique.
Memory Usage: 46.1 MB, less than 99.20% of JavaScript online submissions for Minimum Deletions to Make Character Frequencies Unique.

solution 3:
Runtime: 123 ms, faster than 87.47% of JavaScript online submissions for Minimum Deletions to Make Character Frequencies Unique.
Memory Usage: 46.3 MB, less than 97.33% of JavaScript online submissions for Minimum Deletions to Make Character Frequencies Unique.

 */

// ------------------------------------------------------------
// https://leetcode.com/problems/minimum-deletions-to-make-character-frequencies-unique/
const assert = require("node:assert");
const { describe, test: it } = require("node:test");

describe("minDeletions", function () {
  it('s = "aab"', function () {
    const actual = minDeletions("aab");
    const expected = 0;
    assert.strictEqual(actual, expected);
  });
  it('s = "aaabbbcc"', function () {
    const actual = minDeletions("aaabbbcc");
    const expected = 2;
    assert.strictEqual(actual, expected);
  });
  it('s = "ceabaacb"', function () {
    const actual = minDeletions("ceabaacb");
    const expected = 2;
    assert.strictEqual(actual, expected);
  });

  it('s = "a"', function () {
    const actual = minDeletions("a");
    const expected = 0;
    assert.strictEqual(actual, expected);
  });
});
