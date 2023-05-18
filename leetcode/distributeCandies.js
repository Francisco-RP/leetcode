const assert = require("node:assert");
const { describe, test: it } = require("node:test");

// URL https://leetcode.com/problems/distribute-candies/

/**
 * @param {number[]} candyType
 * @return {number}
 */
var distributeCandies = function (candyType) {
  // The doctor advised Alice to only eat n / 2 of the candies she has
  // (n is always even).
  // she wants to eat the maximum number of different types of candies while still following the doctor's advice.
  return Math.min(candyType.length / 2, new Set(candyType).size);
};

describe("distributeCandies", function () {
  it("Test Case 1", function () {
    const actual = distributeCandies([1, 1, 2, 2, 3, 3]);
    const expected = 3;
    assert.strictEqual(actual, expected);
  });

  it("Test Case 2", function () {
    const actual = distributeCandies([1, 1, 2, 3]);
    const expected = 2;
    assert.strictEqual(actual, expected);
  });

  it("Test Case 3", function () {
    const actual = distributeCandies([6, 6, 6, 6]);
    const expected = 1;
    assert.strictEqual(actual, expected);
  });
});
