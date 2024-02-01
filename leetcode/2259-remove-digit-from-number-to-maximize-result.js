const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/remove-digit-from-number-to-maximize-result/

/**
 * @param {string} number
 * @param {string} digit
 * @return {string}
 */
const removeDigit = function (number, digit) {
  /**
   * @type {bigint}
   */
  let max = BigInt(0);

  for (let i = 0; i < number.length; i++) {
    if (number[i] === digit) {
      const newStr = number.slice(0, i) + number.slice(i + 1);
      const num = BigInt(newStr);
      if (num > max) {
        max = num;
      }
    }
  }
  return String(max);
};

describe("removeDigit", function () {
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
    const number = "123",
      digit = "3";
    const actual = removeDigit(number, digit);
    const expected = "12";
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const number = "1231",
      digit = "1";
    const actual = removeDigit(number, digit);
    const expected = "231";
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const number = "551",
      digit = "5";
    const actual = removeDigit(number, digit);
    const expected = "51";
    isEqual(actual, expected);
  });

  test("Failed case 1", function () {
    const number =
        "2998589353917872714814599237991174513476623756395992135212546127959342974628712329595771672911914471",
      digit = "3";
    const actual = removeDigit(number, digit);
    const expected =
      "299858953917872714814599237991174513476623756395992135212546127959342974628712329595771672911914471";
    isEqual(actual, expected);
  });

  test("Failed case 2", function () {
    const number =
        "2918247756338836829948259212259612948986573547572133445495998236287245768816987491842618661",
      digit = "9";
    const actual = removeDigit(number, digit);
    const expected =
      "291824775633883682994825921225961294898657354757213344549599823628724576881698741842618661";
    isEqual(actual, expected);
  });
});
