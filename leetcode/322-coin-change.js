const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/coin-change/description/

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
const coinChange = function (coins, amount) {
  if (amount === 0) return 0;
  const dp = Array(amount + 1).fill(amount + 1);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const c of coins) {
      if (a - c >= 0) {
        dp[a] = Math.min(dp[a], 1 + dp[a - c]);
      }
    }
  }

  return dp[amount] !== amount + 1 ? dp[amount] : -1;
};

describe("coinChange", function () {
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
    const coins = [1, 2, 5],
      amount = 11;
    const actual = coinChange(coins, amount);
    const expected = 3;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const coins = [2],
      amount = 3;
    const actual = coinChange(coins, amount);
    const expected = -1;
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const coins = [1],
      amount = 0;
    const actual = coinChange(coins, amount);
    const expected = 0;
    isEqual(actual, expected);
  });

  test("Test Case 4", function () {
    const coins = [1],
      amount = 1;
    const actual = coinChange(coins, amount);
    const expected = 1;
    isEqual(actual, expected);
  });

  test("Test Case 5", function () {
    const coins = [1, 2, 5, 10],
      amount = 18;
    const actual = coinChange(coins, amount);
    const expected = 4;
    isEqual(actual, expected);
  });

  test("Test Case 6", function () {
    const coins = [186, 419, 83, 408],
      amount = 6249;
    const actual = coinChange(coins, amount);
    const expected = 20;
    isEqual(actual, expected);
  });
});
