const assert = require("node:assert");
const { describe, test: it } = require("node:test");

// https://leetcode.com/problems/subtract-the-product-and-sum-of-digits-of-an-integer/

/**
 * Given an integer number n, return the difference between the product of its digits
 * and the sum of its digits.
 * @param {number} n
 * @return {number}
 */
const subtractProductAndSum = function (n) {
  let prod = 1;
  let sum = 0;
  while (n > 0) {
    const num = n % 10;
    prod *= num;
    sum += num;
    n = Math.floor(n / 10);
  }

  return prod - sum;
};

describe("subtractProductAndSum", function () {
  it("Test Case 1", function () {
    const actual = subtractProductAndSum(234);
    const expected = 15;
    assert.strictEqual(actual, expected);
  });

  it("Test Case 2", function () {
    const actual = subtractProductAndSum(4421);
    const expected = 21;
    assert.strictEqual(actual, expected);
  });
});
