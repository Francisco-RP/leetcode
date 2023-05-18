const assert = require("node:assert");
const { describe, test: it } = require("node:test");

// URL https://leetcode.com/problems/insert-interval/

/**
 * Insert newInterval into intervals such that:
 * - intervals is still sorted in ascending order by `start[i]`
 * - and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).
 * Return intervals after the insertion.
 * @param {Array<[start:number, end:number]>} intervals non-overlapping intervals where intervals[i] represent the start and the end of the ith interval and intervals is sorted in ascending order by start.
 * @param {[start:number, end:number]} newInterval represents the start and end of another interval.
 * @return {Array<[start:number, end:number]>}
 */
var insert = function (intervals, newInterval) {
  if (!intervals.length) {
    return [newInterval];
  }
  const result = [];

  let start;
  let end;
  let overlapped = false;

  for (let i = 0; i < intervals.length; i++) {
    const pair = intervals[i];
    if (hasOverlap(pair, newInterval)) {
      if (!overlapped) {
        start = Math.min(pair[0], newInterval[0]);
        end = Math.max(pair[1], newInterval[1]);
        result.push([start, end]);
        overlapped = true;
      } else {
        start = Math.min(pair[0], newInterval[0], result.at(-1)[0]);
        end = Math.max(pair[1], newInterval[1], result.at(-1)[1]);
        result[result.length - 1] = [start, end];
      }
    } else if (!overlapped && newInterval[0] < pair[0]) {
      result.push(newInterval);
      result.push(pair);
      overlapped = true;
    } else {
      result.push(pair);
    }
  }

  if (!overlapped) {
    if (newInterval[0] < intervals[0][0]) {
      result.unshift(newInterval);
    } else {
      result.push(newInterval);
    }
  }

  return result;
};

/**
 * Can't take credit for this function, it was in the "Editorial" tab of the leetcode page
 * @param {[number, number]} arr1
 * @param {[number, number]} arr2
 * @returns {boolean}
 */
function hasOverlap([a1, b1], [a2, b2]) {
  return Math.min(b1, b2) - Math.max(a1, a2) >= 0;
}

describe("insert", function () {
  it("Test Case 1", function () {
    const actual = insert(
      [
        [1, 3],
        [6, 9],
      ],
      [2, 5]
    );
    const expected = [
      [1, 5],
      [6, 9],
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it("Test Case 2", function () {
    const actual = insert(
      [
        [1, 2],
        [3, 5],
        [6, 7],
        [8, 10],
        [12, 16],
      ],
      [4, 8]
    );
    const expected = [
      [1, 2],
      [3, 10],
      [12, 16],
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it("Test Case 3", function () {
    const actual = insert([], [5, 7]);
    const expected = [[5, 7]];
    assert.deepStrictEqual(actual, expected);
  });

  it("Test Case 4", function () {
    const actual = insert([[1, 5]], [6, 8]);
    const expected = [
      [1, 5],
      [6, 8],
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it("Test Case 5", function () {
    const actual = insert([[1, 5]], [0, 0]);
    const expected = [
      [0, 0],
      [1, 5],
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it("Test Case 6", function () {
    const actual = insert(
      [
        [3, 5],
        [12, 15],
      ],
      [6, 6]
    );
    const expected = [
      [3, 5],
      [6, 6],
      [12, 15],
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it("Test Case 7", function () {
    const actual = insert(
      [
        [0, 10],
        [14, 14],
        [15, 20],
      ],
      [11, 11]
    );
    const expected = [
      [0, 10],
      [11, 11],
      [14, 14],
      [15, 20],
    ];
    assert.deepStrictEqual(actual, expected);
  });
});
