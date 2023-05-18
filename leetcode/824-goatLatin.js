const assert = require("node:assert");
const { describe, test: it } = require("node:test");

// https://leetcode.com/problems/goat-latin/

/**
 * @param {string} sentence
 * @return {string}
 */
const toGoatLatin = function (sentence) {
  const words = sentence.split(" ");
  const vowels = "aeiouAEIOU";

  let result = "";
  let a = "";

  // outer loop O(n)
  for (let i = 0; i < words.length; i++) {
    let w = words[i];
    a += "a";

    // includes accessor method is O(n)
    if (vowels.includes(w[0])) {
      w += "ma";
    } else {
      w = w.substring(1) + w[0] + "ma";
    }

    result += w + a;
    if (i < words.length - 1) {
      result += " ";
    }
  }

  return result;
};

describe("toGoatLatin", function () {
  it("Test Case 1", function () {
    const actual = toGoatLatin("I speak Goat Latin");
    const expected = "Imaa peaksmaaa oatGmaaaa atinLmaaaaa";
    assert.strictEqual(actual, expected);
  });

  it("Test Case 2", function () {
    const actual = toGoatLatin("The quick brown fox jumped over the lazy dog");
    const expected =
      "heTmaa uickqmaaa rownbmaaaa oxfmaaaaa umpedjmaaaaaa overmaaaaaaa hetmaaaaaaaa azylmaaaaaaaaa ogdmaaaaaaaaaa";
    assert.strictEqual(actual, expected);
  });

  // it("Test Case 3", function () {
  //   const actual = toGoatLatin();
  //   const expected = true;
  //   assert.strictEqual(actual, expected);
  // });
});
