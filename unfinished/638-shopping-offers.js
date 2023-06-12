const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/shopping-offers/

/**
 * Return the lowest price you have to pay for exactly certain items as given, where you could make
 * optimal use of the special offers. You are not allowed to buy more items than you want, even if
 * that would lower the overall price. You could use any of the special offers as many times as you
 * want.
 *
 * @param {number[]} price an array of items to sell, each item in the array is a price for that unique item. Length is referred to as `n`
 * @param {number[][]} special consists of one or more different kinds of items with a sale price
 * @param {number[]} needs an integer array needs where `needs[i]` is the number of pieces of the `price[i]` item you want to buy.
 * @return {number}
 */
const shoppingOffers = function (price, special, needs) {
  const n = price.length;

  // full price
  const fullPrice = price.reduce((sum, p, i) => {
    return sum + p * needs[i];
  }, 0);

  // const price = [2, 3];
  // const special = [
  //   [1, 0, 1],
  //   [0, 1, 2],
  // ];
  // const needs = [1, 1];

  let total = 0;
  while (needs.some((n) => n > 0)) {
    // find an offer that gets closes to
    for (let i = 0; i < special.length; i++) {
      const offer = special[i];
      const counts = offer.slice(0, n);
      const offerCost = offer[n];
      // if off
    }
  }

  return Math.min(fullPrice, total);
};

describe("shoppingOffers", function () {
  test("Test Case 1", function () {
    const price = [2, 5],
      special = [
        [3, 0, 5],
        [1, 2, 10],
      ],
      needs = [3, 2];
    const actual = shoppingOffers(price, special, needs);
    const expected = 14;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const price = [2, 3, 4],
      special = [
        [1, 1, 0, 4],
        [2, 2, 1, 9],
      ],
      needs = [1, 2, 1];
    const actual = shoppingOffers(price, special, needs);
    const expected = 11;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const price = [9, 9];
    const special = [[1, 1, 1]];
    const needs = [2, 2];
    const actual = shoppingOffers(price, special, needs);
    const expected = 2;
    assert.strictEqual(actual, expected);
  });

  test("Test Case 4", function () {
    const price = [2, 3];
    const special = [
      [1, 0, 1],
      [0, 1, 2],
    ];
    const needs = [1, 1];
    const actual = shoppingOffers(price, special, needs);
    const expected = 3;
    assert.strictEqual(actual, expected);
  });
});
