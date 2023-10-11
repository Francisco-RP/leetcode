const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/number-of-valid-words-in-a-sentence/

/**
 * @param {string} sentence
 * @return {number}
 */
// const countValidWords = function (sentence) {
//   const re = /^([^0-9!.,-]?[a-z]+(-?[a-z]+)?[^0-9!.,-]?)?[!.,]?$/;
//   return sentence
//     .trim()
//     .split(/\s+/)
//     .reduce((sum, token) => {
//       if (re.test(token)) {
//         sum += 1;
//       }
//       return sum;
//     }, 0);
// };

const countValidWords = function (sentence) {
  const puncs = /[!,.]/;
  const numRe = /[0-9]/;
  const hyphen = /[a-z]-[a-z]/;
  /**
   * @param {string} token
   * @returns {boolean}
   */
  function canSum(token) {
    let hyphenCount = 0;
    for (let i = 0; i < token.length; i++) {
      const char = token[i];
      if (numRe.test(char)) return false;
      if (i === 0 && char === "-") return false;
      if (char === "-") {
        hyphenCount += 1;
        if (hyphenCount > 1) return false;
        else if (!hyphen.test(token)) return false;
      }
      if (i < token.length - 1 && puncs.test(char)) {
        // punctuations only allowed at the end
        return false;
      }
    }
    return true;
  }

  return sentence
    .trim()
    .split(/\s+/)
    .reduce((sum, token) => {
      if (canSum(token)) {
        sum += 1;
      }
      return sum;
    }, 0);
};

describe("countValidWords", function () {
  /**
   * @param {unknown} actual
   * @param {unknown} expected
   */
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
    const sentence = "cat and  dog";
    const actual = countValidWords(sentence);
    const expected = 3;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const sentence = "!this  1-s b8d!";
    const actual = countValidWords(sentence);
    const expected = 0;
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const sentence = "alice and  bob are playing stone-game10";
    const actual = countValidWords(sentence);
    const expected = 5;
    isEqual(actual, expected);
  });

  test("Test Case 4", function () {
    const sentence = "he bought 2 pencils, 3 erasers, and 1  pencil-sharpener.";
    const actual = countValidWords(sentence);
    const expected = 6;
    isEqual(actual, expected);
  });

  test("Test Case 5", function () {
    const sentence = "-";
    const actual = countValidWords(sentence);
    const expected = 0;
    isEqual(actual, expected);
  });

  test("Test Case 6", function () {
    const sentence = "a";
    const actual = countValidWords(sentence);
    const expected = 1;
    isEqual(actual, expected);
  });

  test("Test Case 7", function () {
    const sentence = "!";
    const actual = countValidWords(sentence);
    const expected = 1;
    isEqual(actual, expected);
  });

  test("Test Case 8", function () {
    const sentence = "!g 3 !sy ";
    const actual = countValidWords(sentence);
    const expected = 0;
    isEqual(actual, expected);
  });

  test("Test Case 9", function () {
    const sentence = "a-b-c";
    const actual = countValidWords(sentence);
    const expected = 0;
    isEqual(actual, expected);
  });
});
