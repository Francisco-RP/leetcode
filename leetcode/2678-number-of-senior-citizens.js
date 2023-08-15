const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/number-of-senior-citizens/

/**
 * @param {string[]} details
 * @return {number}
 */
const countSeniors = function (details) {
  return details.filter((str) => {
    return parseInt(str.charAt(11) + str.charAt(12), 10) > 60;
  }).length;
};

describe("countSeniors", function () {
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
    const actual = countSeniors(["7868190130M7522", "5303914400F9211", "9273338290F4010"]);
    const expected = 2;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const actual = countSeniors(["1313579440F2036", "2921522980M5644"]);
    const expected = 0;
    isEqual(actual, expected);
  });
});
