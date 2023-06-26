const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/number-of-different-integers-in-a-string/

/**
 * @param {string} word
 * @return {number}
 */
const numDifferentIntegers = function (word) {
  // You will replace every non-digit character with a space.
  // For example, "a123bc34d8ef34" will become " 123  34 8  34"
  // Notice that you are left with some integers that are separated by at least one space: "123", "34", "8", and "34".
  // Return the number of different integers after performing the replacement operations on word.
  let nums = word.match(/(\d+)/g);
  if (!nums) return 0;
  return new Set(nums.map(BigInt)).size;
};

describe("numDifferentIntegers", function () {
  function isEqual(actual, expected) {
    try {
      assert.strictEqual(actual, expected);
    } catch (e) {
      // only want to console log failing test info
      console.log("actual", actual);
      console.log("expected", expected);
      throw e;
    }
  }

  test("Test Case 1", function () {
    const actual = numDifferentIntegers("a123bc34d8ef34");
    const expected = 3;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const actual = numDifferentIntegers("leet1234code234");
    const expected = 2;
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const actual = numDifferentIntegers("a1b01c001");
    const expected = 1;
    isEqual(actual, expected);
  });
  test("Test Case 4", function () {
    const actual = numDifferentIntegers("u");
    const expected = 0;
    isEqual(actual, expected);
  });

  test("Test Case 5", function () {
    const actual = numDifferentIntegers(
      "2393706880236110407059624696967828762752651982730115221690437821508229419410771541532394006597463715513741725852432559057224478815116557380260390432211227579663571046845842281704281749571110076974264971989893607137140456254346955633455446057823738757323149856858154529105301197388177242583658641529908583934918768953462557716z97438020429952944646288084173334701047574188936201324845149110176716130267041674438237608038734431519439828191344238609567530399189316846359766256507371240530620697102864238792350289978450509162697068948604722646739174590530336510475061521094503850598453536706982695212493902968251702853203929616930291257062173c79487281900662343830648295410"
    );
    const expected = 3;
    isEqual(actual, expected);
  });
});
