const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/powx-n/

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
const myPow = function (x, n) {
  if (x === 0) return 0;
  if (n === 0) return 1;
  if (x === 1) return 1;
  if (x === -1) {
    return n < 0 ? 1 : -1;
  }

  let product = 1;

  if (n > 0) {
    while (n > 0) {
      product *= x;
      n -= 1;
    }
    return product;
  } else {
    while (n < 0) {
      product *= x;
      n += 1;
    }
    return 1 / product;
  }

  // better solution that's not mine
  // if (n === 0) return 1;
  // const pow = Math.abs(n);
  // const result = pow % 2 === 0 ? myPow(x * x, pow / 2) : myPow(x * x, (pow - 1) / 2) * x;
  // return n < 0 ? 1 / result : result;
};

describe("myPow", function () {
  /**
   * handles precision here because leetcode accounts for it on their end
   * @param {number} x
   * @returns {number}
   */
  function pre(x) {
    return Number(x.toFixed(5));
  }

  test("Test Case 1", function () {
    // prettier-ignore
    const actual = myPow(2.00000, 10);
    // prettier-ignore
    const expected = 1024.00000;
    assert.strictEqual(pre(actual), expected);
  });

  test("Test Case 2", function () {
    // prettier-ignore
    const actual = myPow(2.10000, 3);
    // prettier-ignore
    const expected = 9.26100;
    assert.strictEqual(pre(actual), expected);
  });

  test("Test Case 3", function () {
    // prettier-ignore
    const actual = myPow(2.00000, -2);
    // prettier-ignore
    const expected = 0.25000;
    assert.strictEqual(pre(actual), expected);
  });

  test("Test Case 4", function () {
    // prettier-ignore
    const actual = myPow(1.00000, 2147483647);
    // prettier-ignore
    const expected = 1.00000;
    assert.strictEqual(pre(actual), expected);
  });

  test("Test Case 5", function () {
    // prettier-ignore
    const actual = myPow(-1.00000, 2147483647);
    // prettier-ignore
    const expected = -1.00000;
    assert.strictEqual(pre(actual), expected);
  });

  test("Test Case 6", function () {
    // prettier-ignore
    const actual = myPow(-1.00000, -2147483648);
    // prettier-ignore
    const expected = 1.00000;
    assert.strictEqual(pre(actual), expected);
  });

  test("Test Case 7", function () {
    // prettier-ignore
    const actual = myPow(1.00000, -2147483648);
    // prettier-ignore
    const expected = 1.00000;
    assert.strictEqual(pre(actual), expected);
  });
});
