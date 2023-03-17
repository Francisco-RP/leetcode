var assert = require("assert");

// URL https://leetcode.com/problems/find-missing-observations/

/**
 * @param {number[]} rolls array of length m where rolls[i] is the value of the `ith` observation
 * @param {number} mean
 * @param {number} n
 * @return {number[]}
 */
var missingRolls = function (rolls, mean, n) {
  // The instructions were a bit confusing. This is clearer for me:
  // `m` is the length of `rolls`
  // `n` is the length of missing rolls
  // rolls.concat(missing_rolls) / n + m === mean
  // find the values in `missing_rolls` (if possible)
  // values in the array can only ever be 1 through 6 (becuase it's a 6-sided dice roll)
  // there could be various solutions, return any (order in the array doesn't matter)

  const sum = rolls.reduce((s, n) => s + n, 0);
  const missingTotal = mean * (rolls.length + n) - sum;

  const minValue = missingTotal / n;

  if (minValue > 6 || minValue < 1) {
    return [];
  }

  if (missingTotal % n === 0) {
    return Array(n).fill(minValue);
  }

  const result = Array(n).fill(Math.floor(minValue));
  let diff = missingTotal - Math.floor(minValue) * n;

  let i = 0;
  while (diff > 0) {
    if (result[i] < 6) {
      result[i] += 1;
      diff -= 1;
    }

    i++;
    if (i > n) {
      i = 0;
    }
  }

  return result;
};

// mean = total / length

describe("missingRolls", function () {
  const numSortAsc = (arr) => arr.sort((a, b) => a - b);

  it("Test Case 1", function () {
    const actual = missingRolls([3, 2, 4, 3], 4, 2);
    const expected = [6, 6];
    assert.deepEqual(numSortAsc(actual), numSortAsc(expected));
  });

  it("Test Case 2", function () {
    const actual = missingRolls([1, 5, 6], 3, 4);
    const expected = [2, 3, 2, 2];
    assert.deepEqual(numSortAsc(actual), numSortAsc(expected));
  });

  it("Test Case 3", function () {
    const actual = missingRolls([1, 2, 3, 4], 6, 4);
    const expected = [];
    assert.deepEqual(numSortAsc(actual), numSortAsc(expected));
  });

  it("Test Case 4", function () {
    const actual = missingRolls([6, 3, 4, 3, 5, 3], 1, 6);
    const expected = [];
    assert.deepEqual(numSortAsc(actual), numSortAsc(expected));
  });

  it("Test Case 5", function () {
    const actual = missingRolls(
      [4, 5, 6, 2, 3, 6, 5, 4, 6, 4, 5, 1, 6, 3, 1, 4, 5, 5, 3, 2, 3, 5, 3, 2, 1, 5, 4, 3, 5, 1, 5],
      4,
      40
    );
    const expected = [
      4, 4, 4, 4, 4, 4, 4, 4, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 4, 5, 4, 4, 4, 4, 5, 4, 5, 4,
      4, 4, 4, 4, 4, 5, 5, 4, 4,
    ];
    assert.deepEqual(numSortAsc(actual), numSortAsc(expected));
  });
});
