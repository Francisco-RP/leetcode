/**
 * Given an integer n, return a string array answer (1-indexed) where:
 * - answer[i] == "FizzBuzz" if i is divisible by 3 and 5.
 * - answer[i] == "Fizz" if i is divisible by 3.
 * - answer[i] == "Buzz" if i is divisible by 5.
 * - answer[i] == i (as a string) if none of the above conditions are true.
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function (n) {
  var i = 1;
  var result = [];
  for (; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      result.push("FizzBuzz");
      continue;
    }
    if (i % 3 === 0) {
      result.push("Fizz");
      continue;
    }
    if (i % 5 === 0) {
      result.push("Buzz");
      continue;
    }
    result.push(i+'');
  }
  return result;
};

// ------------------------------------------------------------
// https://leetcode.com/problems/fizz-buzz/
var assert = require("assert");

describe("fizzBuzz", function () {
  it("n = 3", function () {
    const actual = fizzBuzz(3);
    const expected = ["1", "2", "Fizz"];
    assert.deepStrictEqual(actual, expected);
  });

  it("n = 5", function () {
    const actual = fizzBuzz(5);
    const expected = ["1", "2", "Fizz", "4", "Buzz"];
    assert.deepStrictEqual(actual, expected);
  });

  it("n = 15", function () {
    const actual = fizzBuzz(15);
    // prettier-ignore
    const expected = ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"];
    assert.deepStrictEqual(actual, expected);
  });
});
