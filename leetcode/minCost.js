var assert = require("assert");

// https://leetcode.com/problems/minimum-time-to-make-rope-colorful/

/**
 * @param {string} colors
 * @param {number[]} neededTime
 * @return {number}
 */
var minCost = function (colors, neededTime) {
  let max = 0;
  let time = 0;
  let left = 0;
  let right = 0;

  while (right < colors.length) {
    if (left === right) {
      time += neededTime[left];
      max = neededTime[left];
      right++;
      continue;
    }

    if (colors[right] === colors[left]) {
      time += neededTime[right];
      max = Math.max(max, neededTime[right]);
      right++;
      continue;
    }

    // need to reset
    left = right;
    time -= max;
    max = 0;
  }

  time -= max;

  return time;
};

describe("minCost", function () {
  it("Test Case 1", function () {
    const actual = minCost("abaac", [1, 2, 3, 4, 5]);
    const expected = 3;
    assert.strictEqual(actual, expected);
  });

  it("Test Case 2", function () {
    const actual = minCost("abc", [1, 2, 3]);
    const expected = 0;
    assert.strictEqual(actual, expected);
  });

  it("Test Case 3", function () {
    const actual = minCost("aabaa", [1, 2, 3, 4, 1]);
    const expected = 2;
    assert.strictEqual(actual, expected);
  });

  it("Test Case 4", function () {
    const actual = minCost("aaabbbabbbb", [3, 5, 10, 7, 5, 3, 5, 5, 4, 8, 1]);
    const expected = 26;
    assert.strictEqual(actual, expected);
  });
});
/*
aaa 3 5 10  
bbb 7 5 3
a 5
bbbb 5, 4, 8, 1

3 + 5 + 5 + 3 + 5 + 4 + 1

*/
