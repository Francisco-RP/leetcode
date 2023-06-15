const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/count-sorted-vowel-strings/description/

const countVowelStrings = function (n) {
  let res = 0;

  helper(n, 0);

  function helper(n, startIdx) {
    // base case
    if (n === 0) {
      res++;
      return;
    }

    // recursive case
    for (let i = startIdx; i < 5; i++) {
      helper(n - 1, i);
    }
  }

  return res;
};

describe("solve", function () {
  test("Test Case 1", function () {
    const actual = countVowelStrings(1);
    const expected = 5;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const actual = countVowelStrings(2);
    const expected = 15;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const actual = countVowelStrings(3);
    const expected = 35;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 4", function () {
    const actual = countVowelStrings(4);
    const expected = 70;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 5", function () {
    const actual = countVowelStrings(5);
    const expected = 126;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 6", function () {
    const actual = countVowelStrings(6);
    const expected = 210;
    assert.strictEqual(actual, expected);
  });
});
