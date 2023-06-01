const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/sum-of-digits-of-string-after-convert/

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const getLucky = function (s, k) {
  let newS = "";
  for (let i = 0; i < s.length; i++) {
    newS += s.charCodeAt(i) - 96; // a is actually 97 but 'a' needs start at 1 for this challenge
  }

  while (k > 0) {
    let sum = 0;
    for (let i = 0; i < newS.length; i++) {
      sum += Number(newS[i]);
    }
    newS = String(sum);
    k--;
  }

  return Number(newS);
};

describe("getLucky", function () {
  test("Test Case 1", function () {
    const s = "iiii",
      k = 1;
    const actual = getLucky(s, k);
    const expected = 36;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const s = "leetcode",
      k = 2;
    const actual = getLucky(s, k);
    const expected = 6;
    assert.strictEqual(actual, expected);
  });

  // test("Test Case 3", function () {
  //   const actual = getLucky();
  //   const expected = true;
  //   assert.strictEqual(actual, expected);
  // });
});
