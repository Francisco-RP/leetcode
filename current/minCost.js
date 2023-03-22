var assert = require("assert");

// https://leetcode.com/problems/minimum-time-to-make-rope-colorful/
/*
Alice has n balloons arranged on a rope. 
You are given a 0-indexed string colors where colors[i] is the color of the ith balloon.

Alice wants the rope to be colorful. 
SHE DOES NOT WANT TWO CONSECUTIVE BALLOONS TO BE OF THE SAME COLOR, 
so she asks Bob for help. Bob can remove some balloons from the rope to make it colorful. 

You are given a 0-indexed integer array `neededTime` where `neededTime[i]` is the time (in seconds) that Bob needs to remove the ith balloon from the rope.


Return the minimum time Bob needs to make the rope colorful.
*/

/**
 * @param {string} colors
 * @param {number[]} neededTime
 * @return {number}
 */
var minCost = function (colors, neededTime) {
  let time = 0;

  let repeats = [];

  for (let i = 0; i < colors.length; i++) {
    if (colors[i] === colors[i - 1]) {
      repeats.push(neededTime[i]);
    } else {
      if (repeats.length > 1) {
        time += repeats
          .sort((a, b) => a - b)
          .slice(0, -1)
          .reduce((sum, n) => sum + n, 0);
      }
      repeats = [neededTime[i]];
    }
    if (i === colors.length - 1 && repeats.length > 1) {
      time += repeats
        .sort((a, b) => a - b)
        .slice(0, -1)
        .reduce((sum, n) => sum + n, 0);
    }
  }

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
