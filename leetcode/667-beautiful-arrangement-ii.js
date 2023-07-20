const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/beautiful-arrangement-ii/

/**
 * 1 <= k < n <= 10,000
 * @param {number} n
 * @param {number} k
 * @return {number[]}
 */
const constructArray = function (n, k) {
  let ans = new Array(n);

  let start = 1;
  let end = k + 1;

  // zigzag fill array with [a=1, z=k+1, a+1, z-1, a+2, z-2, ....]
  for (let i = 0; i <= k; i++) {
    if (i % 2 === 0) {
      ans[i] = start;
      start += 1;
    } else {
      ans[i] = end;
      end -= 1;
    }
  }

  // fill in remainder of array because the above array will be filled with a range of
  // 1 .. k+1, so we just need k+2 ... n
  for (let i = k + 1; i < n; i++) {
    ans[i] = i + 1;
  }

  return ans;
};

describe("constructArray", function () {
  function isEqual(actual, expected) {
    try {
      assert.deepStrictEqual(actual, expected);
    } catch (e) {
      // only want to console log failing test info
      console.log("actual", actual);
      console.log("expected", expected);
      throw e;
    }
  }

  test("Test Case 1", function () {
    const actual = constructArray(3, 1);
    const expected = [1, 2, 3];
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const actual = constructArray(3, 2);
    const expected = [1, 3, 2];
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const actual = constructArray(5, 4);
    const expected = [1, 5, 2, 4, 3];
    isEqual(actual, expected);
  });

  test("Test Case 4", function () {
    const actual = constructArray(5, 2);
    const expected = [1, 3, 2, 4, 5];
    isEqual(actual, expected);
  });

  test("Test Case 5", function () {
    const actual = constructArray(50, 10);
    const expected = [
      1,
      11, // 10
      2, //  9
      10, //  8
      3, //  7
      9, //  6
      4, //  5
      8, //  4
      5, //  3
      7, //  2
      6, //   1
      12, //  6
      // the rest is a diff of 1
      13, //  1
      14, //  1
      15, //  1
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33,
      34,
      35,
      36,
      37,
      38,
      39,
      40,
      41,
      42,
      43,
      44,
      45,
      46,
      47,
      48,
      49,
      50,
    ];
    isEqual(actual, expected);
  });
});
