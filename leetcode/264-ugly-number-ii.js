const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/ugly-number-ii/

/**
 * @param {number} n
 * @return {number}
 */
const nthUglyNumber = function (n) {
  if (!n) return 0;

  let i2 = 0;
  let i3 = 0;
  let i5 = 0;
  let out = [1];

  while (!out[n - 1]) {
    let c2 = out[i2] * 2;
    let c3 = out[i3] * 3;
    let c5 = out[i5] * 5;
    let next = Math.min(Math.min(c2, c3), c5);
    out.push(next);

    if (next === c2) i2 += 1;
    if (next === c3) i3 += 1;
    if (next === c5) i5 += 1;
  }

  return out[n - 1];
};

describe("nthUglyNumber", function () {
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
    const n = 10;
    const actual = nthUglyNumber(n);
    const expected = 12;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const n = 1;
    const actual = nthUglyNumber(n);
    const expected = 1;
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const n = 500;
    const actual = nthUglyNumber(n);
    const expected = 937500;
    isEqual(actual, expected);
  });

  test("Test Case 4", function () {
    const n = 1407;
    const actual = nthUglyNumber(n);
    const expected = 536870912;
    isEqual(actual, expected);
  });
});
