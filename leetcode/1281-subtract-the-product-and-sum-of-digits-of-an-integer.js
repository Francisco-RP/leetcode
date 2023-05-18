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
  const digits = String(n);
  let product = 1;
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    const num = Number(digits.charAt(i));
    product *= num;
    sum += num;
  }

  return product - sum;
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
