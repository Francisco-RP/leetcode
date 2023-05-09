const assert = require("assert");

// https://leetcode.com/problems/sum-of-unique-elements/

/**
 * @param {number[]} nums
 * @return {number}
 */
const sumOfUnique = function (nums) {
  const arr = new Array(101);
  let i = 0;
  const len = nums.length;
  while (i < len) {
    const n = nums[i];
    arr[n] = typeof arr[n] === "number" ? 2 : 1;
    i++;
  }

  let j = 0,
    sum = 0;
  while (j < 101) {
    if (arr[j] === 1) {
      sum += j;
    }
    j++;
  }
  return sum;
};

describe("sumOfUnique", function () {
  it("Test Case 1", function () {
    const actual = sumOfUnique([1, 2, 3, 2]);
    const expected = 4;
    assert.strictEqual(actual, expected);
  });

  it("Test Case 2", function () {
    const actual = sumOfUnique([1, 1, 1, 1, 1]);
    const expected = 0;
    assert.strictEqual(actual, expected);
  });

  it("Test Case 3", function () {
    const actual = sumOfUnique([1, 2, 3, 4, 5]);
    const expected = 15;
    assert.strictEqual(actual, expected);
  });

  it("Test Case 3", function () {
    const actual = sumOfUnique([
      14, 83, 63, 42, 15, 87, 61, 37, 30, 95, 99, 100, 45, 30, 5, 2, 29, 65, 15, 71, 12, 17, 61, 81,
    ]);
    const expected = 947;
    assert.strictEqual(actual, expected);
  });
});
