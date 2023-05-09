const assert = require("assert");

// https://leetcode.com/problems/replace-all-digits-with-characters/

const alphabet = "abcdefghijklmnopqrstuvwxyz";

/**
 * Returns the xth character after c.
 * For example, shift('a', 5) = 'f' and shift('x', 0) = 'x'.
 * @param {string} c character
 * @param {number} x digit
 * @returns {string} returns the xth character after c.
 */
function shift(c, x) {
  return alphabet.charAt(alphabet.indexOf(c) + x);
}

/**
 * @param {string} s 0-indexed string s that has lowercase English letters in its even indices and digits in its odd indices.
 * @return {string}
 */
const replaceDigits = function (s) {
  // For every odd index i, you want to replace the digit s[i] with shift(s[i-1], s[i]).
  const result = s.split("");
  for (let i = 1; i < result.length; i += 2) {
    result[i] = shift(result[i - 1], Number(result[i]));
  }
  // Return s after replacing all digits. It is guaranteed that shift(s[i-1], s[i]) will never exceed 'z'.
  return result.join("");
};

describe("replaceDigits", function () {
  it("Shift tests", () => {
    assert.strictEqual(shift("a", 1), "b");
    assert.strictEqual(shift("c", 1), "d");
    assert.strictEqual(shift("e", 1), "f");
    assert.strictEqual(shift("c", 3), "f");
    assert.strictEqual(shift("x", 0), "x");
    assert.strictEqual(shift("a", 5), "f");
  });

  it("Test Case 1", function () {
    const actual = replaceDigits("a1c1e1");
    const expected = "abcdef";
    assert.strictEqual(actual, expected);
  });

  it("Test Case 2", function () {
    const actual = replaceDigits("a1b2c3d4e");
    const expected = "abbdcfdhe";
    assert.strictEqual(actual, expected);
  });
});
