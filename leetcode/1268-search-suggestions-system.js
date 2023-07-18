const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/search-suggestions-system/

/**
 * @param {string[]} products
 * @param {string} searchWord
 * @return {string[][]}
 */
const suggestedProducts = function (products, searchWord) {
  const results = [];

  // sort products in lexicographical minimum order
  let matches = products.sort();

  let typed = "";
  for (const char of searchWord) {
    typed += char;
    matches = matches.filter((word) => word.startsWith(typed));
    results.push(matches.slice(0, 3));
  }

  return results;
};

describe("suggestedProducts", function () {
  function isEqual(actual, expected) {
    try {
      assert.deepStrictEqual(actual, expected);
    } catch (e) {
      // only want to console log failing test info
      console.log("actual", actual);
      console.log("expected", expected);
      throw e;
    }
  }

  test("Test Case 1", function () {
    const products = ["mobile", "mouse", "moneypot", "monitor", "mousepad"],
      searchWord = "mouse";
    const actual = suggestedProducts(products, searchWord);
    const expected = [
      ["mobile", "moneypot", "monitor"],
      ["mobile", "moneypot", "monitor"],
      ["mouse", "mousepad"],
      ["mouse", "mousepad"],
      ["mouse", "mousepad"],
    ];
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const products = ["havana"],
      searchWord = "havana";
    const actual = suggestedProducts(products, searchWord);
    const expected = [["havana"], ["havana"], ["havana"], ["havana"], ["havana"], ["havana"]];
    isEqual(actual, expected);
  });
});
