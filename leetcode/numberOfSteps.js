/**
 * Given an integer num, return the number of steps to reduce it to zero.
 *
 * In one step, if the current number is even, you have to divide it by 2, otherwise, you have to
 * subtract 1 from it.
 * @param {number} num 0 <= num <= 106
 * @return {number}
 */
var numberOfSteps = function (num) {
  if (!num) return 0;
  var steps = 0;
  while (num > 0) {
    steps += 1;
    if (num % 2 === 0) num = num / 2;
    else num = num - 1;
  }
  return steps;
};

// ------------------------------------------------------------
// https://leetcode.com/problems/number-of-steps-to-reduce-a-number-to-zero/
var assert = require("assert");

describe("numberOfSteps", function () {
  it("num = 14", function () {
    const actual = numberOfSteps(14);
    const expected = 6;
    assert.strictEqual(actual, expected);
  });

  it("num = 8", function () {
    const actual = numberOfSteps(8);
    const expected = 4;
    assert.strictEqual(actual, expected);
  });
});
