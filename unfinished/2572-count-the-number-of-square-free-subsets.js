const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/count-the-number-of-square-free-subsets/

// help from this video: https://www.youtube.com/watch?v=cjWnW0hdF1Y

/**
 * @param {number[]} nums 1 <= nums.length <= 1000; 1 <= nums[i] <= 30
 * @return {number}
 */
const squareFreeSubsets = function (nums) {
  // All prime numbers in our constraint range of 1 to 30
  const primes = new Set([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
  // All squared numbers in our constraint range from 1 to 30 (except for the number 1)
  const squares = new Set([4, 9, 16, 25]);

  // build a Set of values that are not divisible by a square number
  const filtered = new Set();
  nums.forEach((n) => {
    // I know Set already handles de-duping, but I'm doing this here
    // to avoid having to go through all of the code below, especially the for-of loop.
    // I'm using Set instead of Array because Set.has is O(1), Array.includes is O(n)
    if (filtered.has(n)) return;

    // prime numbers are easy, don't need to check them, just go ahead and add
    if (primes.has(n)) {
      filtered.add(n);
      return;
    }

    // if number exists in our squares Set, skip it.
    if (squares.has(n)) {
      return;
    }

    // check if current number is divisible by any of our square numbers
    // Skip that number as soon as we hit true
    for (const sq of squares) {
      if ((n / sq) % 1 === 0) {
        return;
      }
    }

    // the number is ok to add
    filtered.add(n);
  });

  const cache = new Array(filtered.size).fill(1);
  let sum = 0;
  for (let i = cache.length - 1; i >= 0; i--) {
    for (let j = cache.length - 1; j >= i + 1; j--) {
      cache[i] += cache[j];
    }
    sum += cache[i];
  }
  console.log("filtered=", filtered);
  console.log("cache", cache);
  console.log("sum=", sum);

  return sum % (Math.pow(10, 9) + 7);
};

describe("squareFreeSubsets", function () {
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
    const nums = [3, 4, 4, 5];
    const actual = squareFreeSubsets(nums);
    const expected = 3;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const nums = [1];
    const actual = squareFreeSubsets(nums);
    const expected = 1;
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const nums = [11, 2, 19, 7, 9, 27];
    const actual = squareFreeSubsets(nums);
    const expected = 15;
    isEqual(actual, expected);
  });

  test("Test Case 4", function () {
    const nums = [26, 6, 4, 27, 6, 18];
    const actual = squareFreeSubsets(nums);
    const expected = 3;
    isEqual(actual, expected);
  });

  test("Test Case 5", function () {
    const nums = [26, 6, 4, 27, 6, 18];
    const actual = squareFreeSubsets(nums);
    const expected = 3;
    isEqual(actual, expected);
  });

  test("Test Case 6", function () {
    const nums = [8, 11, 17, 2, 25, 29, 21, 20, 4, 22];
    const actual = squareFreeSubsets(nums);
    const expected = 39;
    isEqual(actual, expected);
  });
});

/*
[n1         ]  0
[n1,n2      ]  0 - 0,1  === 0 - 1
[n1,   n3   ]  0 - 0,2
[n1,      n4]  0 - 0,3
[n1,n2,n3   ]  0 - 1,2
[n1,n2    n4]  0 - 1,3
[n1,   n3,n4]  0 - 2,3

[   n2      ]  1
[   n2,n3   ]  1 - 1,2
[   n2    n4]  1 - 1,3
[   n2,n3,n4]  1 - 2,3 - missing

[      n3   ]  2
[      n3,n4]  2 - 2,3
[         n4]  3

[n1,n2,n3,n4] - final
*/
