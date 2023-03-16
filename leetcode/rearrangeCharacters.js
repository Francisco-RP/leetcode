var assert = require("assert");

// ------------------------------------------------------------
// URL https://leetcode.com/problems/rearrange-characters-to-make-target-string/

/**
 * @param {string} s
 * @param {string} target
 * @return {number}
 */
var rearrangeCharacters = function (s, target) {
  const chars = {};

  let final = s.length;
  for (let i = 0; i < target.length; i++) {
    const char = target[i];
    chars[char] = (chars[char] || 0) + 1;
    const count = Math.floor(s.replace(new RegExp(`[^${char}]`, "g"), "").length / chars[char]);
    if (count < final) {
      final = count;
    }
  }

  return final;
};

describe("rearrangeCharacters", function () {
  it("test case 1", function () {
    const actual = rearrangeCharacters("ilovecodingonleetcode", "code");
    const expected = 2;
    assert.strictEqual(actual, expected);
  });

  it("test case 2", function () {
    const actual = rearrangeCharacters("abcba", "abc");
    const expected = 1;
    assert.strictEqual(actual, expected);
  });

  it("test case 3", function () {
    const actual = rearrangeCharacters("abbaccaddaeea", "aaaaa");
    const expected = 1;
    assert.strictEqual(actual, expected);
  });

  it("time exceeded 1", function () {
    const actual = rearrangeCharacters(
      "lrnvlcqukanpdnluowenfxquitzryponxsikhciohyostvmkapkfpglzikitwiraqgchxnpryhwpuwpozacjhmwhjvslprqlnxrk",
      "woijih"
    );
    const expected = 2;
    assert.strictEqual(actual, expected);
  });

  it("test case 5", function () {
    const actual = rearrangeCharacters("aaaaaaaaaaaaaaaaaaaaaaaaaa", "aaaaaaaaa");
    const expected = 2;
    assert.strictEqual(actual, expected);
  });
});
